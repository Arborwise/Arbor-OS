import OAuthClient from 'intuit-oauth';
import {loadProviderToken,saveProviderToken} from './tokens.js';

const QUICKBOOKS_REDIRECT_URI='https://arborwise-os.vercel.app/api/oauth/quickbooks/callback';
const QUICKBOOKS_AUTHORIZE_URL='https://appcenter.intuit.com/connect/oauth2';
const QUICKBOOKS_SCOPE='com.intuit.quickbooks.accounting';

function clientId(){return String(process.env.QBO_CLIENT_ID||'').trim();}
function clientSecret(){return String(process.env.QBO_CLIENT_SECRET||'').trim();}
function environment(){return String(process.env.QBO_ENVIRONMENT||'production').trim().toLowerCase();}

export function qboRedirectUri(){return QUICKBOOKS_REDIRECT_URI;}
export function qboConfigured(){return Boolean(clientId()&&clientSecret());}
function assertConfigured(){
  if(!qboConfigured()){
    const error=new Error('QuickBooks needs QBO_CLIENT_ID and QBO_CLIENT_SECRET in Vercel Environment Variables');
    error.status=409;
    throw error;
  }
}
function client(){
  assertConfigured();
  return new OAuthClient({
    clientId:clientId(),
    clientSecret:clientSecret(),
    environment:environment(),
    redirectUri:QUICKBOOKS_REDIRECT_URI
  });
}
export function qboAuthUrl(state){
  assertConfigured();
  const url=new URL(QUICKBOOKS_AUTHORIZE_URL);
  url.searchParams.set('client_id',clientId());
  url.searchParams.set('redirect_uri',QUICKBOOKS_REDIRECT_URI);
  url.searchParams.set('response_type','code');
  url.searchParams.set('scope',QUICKBOOKS_SCOPE);
  url.searchParams.set('state',String(state||''));
  return url.toString();
}
export async function qboExchange(url){
  if(!url){
    const error=new Error('QuickBooks did not return an authorization URL');
    error.status=400;
    throw error;
  }
  const oauthClient=client();
  const response=await oauthClient.createToken(url);
  return normalize(response.getJson());
}
function normalize(json,metadata={}){
  return {
    access_token:json.access_token,
    refresh_token:json.refresh_token,
    expires_at:new Date(Date.now()+(Number(json.expires_in)||3600)*1000),
    metadata:{...metadata,x_refresh_token_expires_in:json.x_refresh_token_expires_in}
  };
}
export async function qboAccess(){
  assertConfigured();
  const stored=await loadProviderToken('quickbooks');
  if(!stored){
    const error=new Error('QuickBooks is not authorized yet. Open Connections and tap Connect QuickBooks.');
    error.status=409;
    throw error;
  }
  let access=stored.access_token;
  let metadata=stored.metadata||{};
  const expires=stored.expires_at?new Date(stored.expires_at).getTime():0;
  if(expires<Date.now()+120000){
    if(!stored.refresh_token){
      const error=new Error('QuickBooks authorization expired. Reconnect QuickBooks.');
      error.status=409;
      throw error;
    }
    const oauthClient=client();
    const response=await oauthClient.refreshUsingToken(stored.refresh_token);
    const refreshed=normalize(response.getJson(),metadata);
    await saveProviderToken('quickbooks',refreshed);
    access=refreshed.access_token;
    metadata=refreshed.metadata||metadata;
  }
  return {access,realmId:metadata.realmId};
}
function apiHost(){return environment()==='sandbox'?'https://sandbox-quickbooks.api.intuit.com':'https://quickbooks.api.intuit.com';}
async function queryWithAccess(query,{access,realmId}){
  if(!realmId){
    const error=new Error('QuickBooks company ID is missing. Reconnect QuickBooks.');
    error.status=409;
    throw error;
  }
  const url=`${apiHost()}/v3/company/${encodeURIComponent(realmId)}/query?query=${encodeURIComponent(query)}&minorversion=75`;
  const response=await fetch(url,{headers:{Authorization:`Bearer ${access}`,Accept:'application/json'}});
  const text=await response.text();
  if(!response.ok)throw new Error(`QuickBooks ${response.status}: ${text.slice(0,500)}`);
  try{return JSON.parse(text).QueryResponse||{};}
  catch{throw new Error('QuickBooks returned an unreadable response');}
}
export async function qboQuery(query){
  const access=await qboAccess();
  return queryWithAccess(query,access);
}
export async function qboSyncData(){
  const since=new Date(Date.now()-1000*60*60*24*180).toISOString().slice(0,10);
  const access=await qboAccess();
  const [estimates,invoices]=await Promise.all([
    queryWithAccess(`select * from Estimate where TxnDate >= '${since}' maxresults 1000`,access),
    queryWithAccess(`select * from Invoice where TxnDate >= '${since}' maxresults 1000`,access)
  ]);
  return {estimates:estimates.Estimate||[],invoices:invoices.Invoice||[]};
}
