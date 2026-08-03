import {google} from 'googleapis';
import {body,json,fail,method} from '../lib/http.js';
import {validSession} from '../lib/auth.js';
import {googleClient} from '../lib/google.js';

const ACCESS_KEY='QtOouTBmW_kEg4WcuG5HdR2k7JX8yy72';
const SHEET_ID=process.env.GOOGLE_SHEET_ID||'17XTUBhP7zC01qc6aNavMYCoFBEsnE9wUvmMmd-5lt1w';
const TAB='Jobs';

function clean(value){return String(value??'').trim();}
function normalized(value){return clean(value).toLowerCase().replace(/[^a-z0-9]+/g,'');}
function queryAccess(req){
  const url=new URL(req.url||'',`https://${req.headers.host||'arborwise-os.vercel.app'}`);
  return clean(url.searchParams.get('access'));
}
function assertAccess(req){
  if(validSession(req))return;
  if(queryAccess(req)!==ACCESS_KEY){
    const error=new Error('Crew link is invalid or expired');
    error.status=403;
    throw error;
  }
}
function headerIndex(headers,names){
  const wanted=new Set(names.map(normalized));
  return headers.findIndex(value=>wanted.has(normalized(value)));
}
function cell(row,index){return index>=0?clean(row[index]):'';}
function safeService(value){
  return clean(value)
    .replace(/(?:,?\s*)\b(?:invoice|estimate)\s*#?\s*\d+\b/gi,'')
    .replace(/\s+,/g,',')
    .replace(/\s{2,}/g,' ')
    .trim();
}
function safeCrewNotes(value){
  const text=clean(value);
  if(!text)return '';
  return text
    .split(/\n+|(?<=[.!?])\s+/)
    .map(part=>part.trim())
    .filter(Boolean)
    .filter(part=>!/(?:\$|\b(?:invoice|estimate amount|total|balance|paid|payment|revenue|labor cost|other cost|gross profit|gratuity|tax)\b)/i.test(part))
    .join(' ')
    .replace(/\s{2,}/g,' ')
    .trim();
}
function isoDate(value){
  const text=clean(value);
  if(!text)return '';
  const direct=text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(direct)return `${direct[1]}-${direct[2]}-${direct[3]}`;
  const us=text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if(!us)return '';
  const year=us[3].length===2?`20${us[3]}`:us[3];
  return `${year}-${us[1].padStart(2,'0')}-${us[2].padStart(2,'0')}`;
}
function statusValue(value){
  const text=clean(value);
  const lower=text.toLowerCase();
  if(/complete|paid|done/.test(lower))return 'Completed';
  if(/cancel|declin|reject/.test(lower))return 'Cancelled';
  if(/hold|paused|verify/.test(lower))return 'Hold';
  if(/in progress|working|started/.test(lower))return 'In Progress';
  if(/scheduled|service/.test(lower))return 'Scheduled';
  return text||'Open';
}

async function readRows(){
  const auth=await googleClient();
  const sheets=google.sheets({version:'v4',auth});
  const response=await sheets.spreadsheets.values.get({
    spreadsheetId:SHEET_ID,
    range:`'${TAB}'!A:V`,
    valueRenderOption:'FORMATTED_VALUE',
    dateTimeRenderOption:'FORMATTED_STRING'
  });
  return {sheets,values:response.data.values||[]};
}
function indexes(headers){
  return {
    id:headerIndex(headers,['Job ID','Job #','Job Number','Work Order','Work Order #','ID']),
    customer:headerIndex(headers,['Customer','Customer Name','Name']),
    address:headerIndex(headers,['Address','Street Address','Job Address','Service Address']),
    city:headerIndex(headers,['City']),
    phone:headerIndex(headers,['Phone','Phone Number','Customer Phone']),
    equipment:headerIndex(headers,['Equipment Needed','Equipment']),
    service:headerIndex(headers,['Service','Service Needed','Work To Do','Work Description','Description']),
    date:headerIndex(headers,['Scheduled Date','Job Date','Work Date','Date']),
    time:headerIndex(headers,['Arrival Window','Appointment Time','Time','Time Window']),
    crew:headerIndex(headers,['Crew Lead','Assigned To','Assigned','Crew']),
    status:headerIndex(headers,['Status','Job Status']),
    notes:headerIndex(headers,['Crew Notes'])
  };
}
function crewRecords(values){
  const [headers=[], ...rows]=values;
  const idx=indexes(headers);
  if(idx.id<0)throw new Error('Jobs sheet is missing its Job ID column');
  return rows.map((row,offset)=>({
    rowNumber:offset+2,
    id:cell(row,idx.id),
    customer:cell(row,idx.customer),
    address:[cell(row,idx.address),cell(row,idx.city)].filter(Boolean).join(', '),
    phone:cell(row,idx.phone),
    equipment:cell(row,idx.equipment),
    service:safeService(cell(row,idx.service)),
    workDate:isoDate(cell(row,idx.date)),
    workTime:cell(row,idx.time),
    crew:cell(row,idx.crew)||'Unassigned',
    status:statusValue(cell(row,idx.status)),
    notes:safeCrewNotes(cell(row,idx.notes))
  })).filter(record=>record.id&&record.status!=='Cancelled');
}

async function updateNotes(req){
  const payload=await body(req);
  const id=clean(payload.id);
  const notes=clean(payload.notes);
  if(!id){const error=new Error('Job ID is required');error.status=400;throw error;}
  if(notes.length>2000){const error=new Error('Notes must be 2,000 characters or fewer');error.status=400;throw error;}

  const {sheets,values}=await readRows();
  const [headers=[], ...rows]=values;
  const idx=indexes(headers);
  if(idx.id<0||idx.notes<0)throw new Error('Jobs sheet is missing Job ID or Crew Notes');
  const offset=rows.findIndex(row=>normalized(cell(row,idx.id))===normalized(id));
  if(offset<0){const error=new Error(`Job ${id} was not found`);error.status=404;throw error;}
  const rowNumber=offset+2;
  const columnNumber=idx.notes+1;
  let column='';
  let number=columnNumber;
  while(number>0){number--;column=String.fromCharCode(65+(number%26))+column;number=Math.floor(number/26);}
  await sheets.spreadsheets.values.update({
    spreadsheetId:SHEET_ID,
    range:`'${TAB}'!${column}${rowNumber}`,
    valueInputOption:'USER_ENTERED',
    requestBody:{values:[[notes]]}
  });
  return {id,notes,updatedAt:new Date().toISOString()};
}

export default async function handler(req,res){
  try{
    method(req,['GET','POST']);
    assertAccess(req);
    res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
    if(req.method==='POST'){
      const updated=await updateNotes(req);
      json(res,200,{ok:true,updated});
      return;
    }
    const {values}=await readRows();
    json(res,200,{ok:true,readAt:new Date().toISOString(),items:crewRecords(values)});
  }catch(error){fail(res,error);}
}
