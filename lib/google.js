import {google} from 'googleapis';
import {loadProviderToken,saveProviderToken} from './tokens.js';

const SCOPES=[
  'openid',
  'email',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/calendar'
];
const VERIFIED_GOOGLE_CLIENT_ID='153786397550-ocpjjuj534v3s10ukl41tqtp0q80fmbv.apps.googleusercontent.com';
const DEFAULT_GOOGLE_REDIRECT_URI='https://arborwise-os.vercel.app/api/oauth/google/callback';

function clientId(){return VERIFIED_GOOGLE_CLIENT_ID;}
function clientSecret(){return String(process.env.GOOGLE_CLIENT_SECRET||'').trim();}

export function googleRedirectUri(){
  const value=String(process.env.GOOGLE_REDIRECT_URI||DEFAULT_GOOGLE_REDIRECT_URI).trim();
  if(!/^https:\/\//i.test(value)){
    const error=new Error('GOOGLE_REDIRECT_URI must be a complete HTTPS URL');
    error.status=409;
    throw error;
  }
  return value;
}
export function googleConfigured(){return Boolean(clientId()&&clientSecret());}
function assertConfigured(){
  if(!googleConfigured()){
    const error=new Error('Google needs GOOGLE_CLIENT_SECRET in Vercel Environment Variables');
    error.status=409;
    throw error;
  }
  googleRedirectUri();
}
function oauth(){
  assertConfigured();
  return new google.auth.OAuth2(clientId(),clientSecret(),googleRedirectUri());
}
export function googleAuthUrl(state){
  const allowed=(process.env.GOOGLE_ALLOWED_EMAIL||'greg@arborwisetreecare.com').toLowerCase().trim();
  return oauth().generateAuthUrl({
    access_type:'offline',
    prompt:'select_account consent',
    login_hint:allowed,
    include_granted_scopes:true,
    scope:SCOPES,
    state
  });
}
export async function googleExchange(code){
  if(!code){
    const error=new Error('Google did not return an authorization code');
    error.status=400;
    throw error;
  }
  const client=oauth();
  const {tokens}=await client.getToken(code);
  client.setCredentials(tokens);
  const info=await google.oauth2({version:'v2',auth:client}).userinfo.get();
  const allowed=(process.env.GOOGLE_ALLOWED_EMAIL||'greg@arborwisetreecare.com').toLowerCase().trim();
  if(allowed&&String(info.data.email||'').toLowerCase()!==allowed){
    const error=new Error('This Google account is not authorized for Arborwise OS');
    error.status=403;
    throw error;
  }
  return {
    access_token:tokens.access_token,
    refresh_token:tokens.refresh_token,
    expires_at:tokens.expiry_date?new Date(tokens.expiry_date):null,
    metadata:{email:info.data.email}
  };
}
export async function googleClient(){
  const stored=await loadProviderToken('google');
  if(!stored){
    const error=new Error('Google is not authorized yet. Open Connections and tap Connect Google.');
    error.status=409;
    throw error;
  }
  const client=oauth();
  client.setCredentials({
    access_token:stored.access_token,
    refresh_token:stored.refresh_token,
    expiry_date:stored.expires_at?new Date(stored.expires_at).getTime():undefined
  });
  client.on('tokens',tokens=>{
    if(tokens.access_token||tokens.refresh_token){
      saveProviderToken('google',{
        access_token:tokens.access_token||stored.access_token,
        refresh_token:tokens.refresh_token||stored.refresh_token,
        expires_at:tokens.expiry_date?new Date(tokens.expiry_date):stored.expires_at,
        metadata:stored.metadata||{}
      }).catch(error=>console.error('Google token save failed',error));
    }
  });
  return client;
}
function rowsToObjects(values=[]){
  const [headers=[], ...rows]=values;
  return rows
    .filter(row=>row.some(value=>String(value??'').trim()!==''))
    .map(row=>Object.fromEntries(headers.map((header,index)=>[String(header||'').trim(),row[index]??''])));
}
async function sheetRowsWithAuth(auth,tab,range='A:AA'){
  const sheets=google.sheets({version:'v4',auth});
  const response=await sheets.spreadsheets.values.get({
    spreadsheetId:process.env.GOOGLE_SHEET_ID||'17XTUBhP7zC01qc6aNavMYCoFBEsnE9wUvmMmd-5lt1w',
    range:`'${tab}'!${range}`,
    valueRenderOption:'FORMATTED_VALUE',
    dateTimeRenderOption:'FORMATTED_STRING'
  });
  return rowsToObjects(response.data.values||[]);
}
export async function sheetRows(tab,range='A:AA'){
  const auth=await googleClient();
  return sheetRowsWithAuth(auth,tab,range);
}
async function gmailMessages(auth){
  const gmail=google.gmail({version:'v1',auth});
  const list=await gmail.users.messages.list({
    userId:'me',
    q:'newer_than:3d -category:promotions',
    maxResults:30
  });
  const ids=(list.data.messages||[]).slice(0,20);
  return Promise.all(ids.map(async message=>{
    const result=await gmail.users.messages.get({
      userId:'me',
      id:message.id,
      format:'metadata',
      metadataHeaders:['From','Subject','Date']
    });
    const headers=Object.fromEntries((result.data.payload?.headers||[]).map(header=>[header.name,header.value]));
    return {
      id:message.id,
      threadId:result.data.threadId,
      from:headers.From||'',
      subject:headers.Subject||'',
      date:headers.Date||'',
      snippet:result.data.snippet||'',
      labelIds:result.data.labelIds||[]
    };
  }));
}
async function calendarEvents(auth){
  const calendar=google.calendar({version:'v3',auth});
  return (await calendar.events.list({
    calendarId:'primary',
    timeMin:new Date().toISOString(),
    timeMax:new Date(Date.now()+14*86400000).toISOString(),
    singleEvents:true,
    orderBy:'startTime',
    maxResults:250
  })).data.items||[];
}
export async function googleSyncData({includeGmail=true}={}){
  const auth=await googleClient();
  const sheetRequests=[
    sheetRowsWithAuth(auth,'Master Estimates','A:AZ'),
    sheetRowsWithAuth(auth,'Jobs','A:AZ'),
    sheetRowsWithAuth(auth,"Today's Estimates",'A:AZ')
  ];
  const [master,jobs,today]=await Promise.all(sheetRequests);

  const warnings=[];
  let messages=[];
  let events=[];
  const optionalRequests=[
    includeGmail?gmailMessages(auth):Promise.resolve([]),
    calendarEvents(auth)
  ];
  const [gmailResult,calendarResult]=await Promise.allSettled(optionalRequests);
  if(gmailResult.status==='fulfilled')messages=gmailResult.value;
  else warnings.push(`Gmail: ${gmailResult.reason?.message||'unavailable'}`);
  if(calendarResult.status==='fulfilled')events=calendarResult.value;
  else warnings.push(`Calendar: ${calendarResult.reason?.message||'unavailable'}`);

  return {master,jobs,today,messages,events,warnings};
}
