import {google} from 'googleapis';
import {body,json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {googleClient} from '../lib/google.js';
import {db,initDb} from '../lib/db.js';

const SHEET_ID=process.env.GOOGLE_SHEET_ID||'17XTUBhP7zC01qc6aNavMYCoFBEsnE9wUvmMmd-5lt1w';
const TABS=['Jobs','Master Estimates',"Today's Estimates"];
const TIME_ZONE='America/Chicago';
const CALENDAR_MARKER_START='<!-- ARBORWISE_OWNER_EDIT_START -->';
const CALENDAR_MARKER_END='<!-- ARBORWISE_OWNER_EDIT_END -->';

function clean(value){return String(value??'').trim();}
function normalized(value){return clean(value).toLowerCase().replace(/[^a-z0-9]+/g,'');}
function recordKey(value){
  return normalized(clean(value).replace(/^(?:WO|INV|FU|QBE|EST)[-\s]*/i,''));
}
function phoneKey(value){return clean(value).replace(/\D+/g,'').slice(-10);}
function quoted(tab){return `'${String(tab).replace(/'/g,"''")}'`;}
function columnLetter(index){
  let number=index+1;
  let result='';
  while(number>0){number--;result=String.fromCharCode(65+(number%26))+result;number=Math.floor(number/26);}
  return result;
}
function headerIndex(headers,names){
  const wanted=new Set(names.map(normalized));
  return headers.findIndex(header=>wanted.has(normalized(header)));
}
function rowValue(row,headers,names){
  const index=headerIndex(headers,names);
  return index<0?'':clean(row[index]);
}
function orderedTabs(source,type){
  const text=clean(source).toLowerCase();
  if(text.includes("today's estimates"))return ["Today's Estimates",'Master Estimates','Jobs'];
  if(text.includes('master estimates'))return ['Master Estimates',"Today's Estimates",'Jobs'];
  if(text.includes('jobs'))return ['Jobs','Master Estimates',"Today's Estimates"];
  return type==='est'?['Master Estimates',"Today's Estimates",'Jobs']:TABS;
}
function serviceSimilarity(left,right){
  const tokens=value=>new Set(clean(value).toLowerCase().split(/[^a-z0-9]+/).filter(token=>token.length>=4));
  const a=tokens(left),b=tokens(right);
  if(!a.size||!b.size)return 0;
  let overlap=0;
  for(const token of a)if(b.has(token))overlap++;
  return overlap/Math.min(a.size,b.size);
}
function identityScore(payload,tab,headers,row){
  const rowName=rowValue(row,headers,['Customer','Customer Name','Name']);
  const rowPhone=rowValue(row,headers,['Phone','Phone Number','Customer Phone']);
  const rowAddress=[
    rowValue(row,headers,['Street Address','Address','Job Address','Service Address']),
    rowValue(row,headers,['City']),rowValue(row,headers,['State']),rowValue(row,headers,['ZIP','Zip','Postal Code'])
  ].filter(Boolean).join(' ');
  const rowService=rowValue(row,headers,tab==='Jobs'
    ? ['Service','Service Needed','Work To Do','Work Description','Description']
    : ['Service Needed','Service','Work To Do','Work Description','Description']);

  let score=0;
  const targetName=normalized(payload.name);
  const targetPhone=phoneKey(payload.phone);
  const targetAddress=normalized(payload.address);
  if(targetName&&normalized(rowName)===targetName)score+=4;
  if(targetPhone.length>=7&&phoneKey(rowPhone)===targetPhone)score+=4;
  if(targetAddress){
    const candidateAddress=normalized(rowAddress);
    if(candidateAddress===targetAddress)score+=3;
    else if(candidateAddress&&(
      candidateAddress.includes(targetAddress)||targetAddress.includes(candidateAddress)
    ))score+=2;
  }
  const similarity=serviceSimilarity(payload.service,rowService);
  if(similarity>=0.6)score+=3;
  else if(similarity>=0.3)score+=2;
  return score;
}
async function readTab(sheets,tab){
  const response=await sheets.spreadsheets.values.get({
    spreadsheetId:SHEET_ID,
    range:`${quoted(tab)}!A:AZ`,
    valueRenderOption:'FORMATTED_VALUE',
    dateTimeRenderOption:'FORMATTED_STRING'
  });
  const values=response.data.values||[];
  return {tab,headers:values[0]||[],rows:values.slice(1)};
}
async function findRecord(sheets,tabs,payload){
  const target=recordKey(payload.id);
  const loaded=[];
  for(const tab of tabs){
    const current=await readTab(sheets,tab);
    loaded.push(current);
    const idIndex=headerIndex(current.headers,tab==='Jobs'
      ? ['Job ID','Job #','Job Number','Work Order','Work Order #','Record #','ID']
      : ['Estimate #','Estimate Number','Estimate ID','Record #','ID']);
    if(idIndex<0)continue;
    const rowOffset=current.rows.findIndex(row=>recordKey(row[idIndex])===target);
    if(rowOffset>=0)return {tab,headers:current.headers,row:current.rows[rowOffset]||[],rowNumber:rowOffset+2,matchedBy:'id'};
  }

  const candidates=[];
  for(const current of loaded){
    current.rows.forEach((row,rowOffset)=>{
      const score=identityScore(payload,current.tab,current.headers,row);
      if(score>=8)candidates.push({
        tab:current.tab,headers:current.headers,row,rowNumber:rowOffset+2,score,matchedBy:'customer details'
      });
    });
  }
  candidates.sort((a,b)=>b.score-a.score);
  if(candidates.length===1)return candidates[0];
  if(candidates.length>1&&candidates[0].score-candidates[1].score>=2)return candidates[0];
  return null;
}
function addUpdate(updates,tab,headers,rowNumber,value,names){
  const index=headerIndex(headers,names);
  if(index<0)return false;
  updates.push({range:`${quoted(tab)}!${columnLetter(index)}${rowNumber}`,values:[[value??'']]});
  return true;
}
function htmlEscape(value){
  return clean(value).replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[char]));
}
function isCalendarOnly(id,source){
  const text=clean(source).toLowerCase();
  return /^CAL-/i.test(id)||(text.includes('calendar')&&!text.includes('sheet'));
}
function calendarEventId(payload,id){
  return clean(payload.calendarEventId||payload.eventId||id.replace(/^CAL-/i,''));
}
function removeCalendarBlock(description){
  const escapedStart=CALENDAR_MARKER_START.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const escapedEnd=CALENDAR_MARKER_END.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return clean(description).replace(new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}`,'gi'),'').trim();
}
function calendarDescription(existing,payload){
  const base=removeCalendarBlock(existing);
  const rows=[
    payload.status?`Status: ${htmlEscape(payload.status)}`:'',
    payload.who?`Assigned to: ${htmlEscape(payload.who)}`:'',
    payload.time?`Arrival window: ${htmlEscape(payload.time)}`:'',
    payload.notes?`Notes: ${htmlEscape(payload.notes)}`:''
  ].filter(Boolean);
  const block=`${CALENDAR_MARKER_START}<p><strong>Arborwise OS</strong><br>${rows.join('<br>')}</p>${CALENDAR_MARKER_END}`;
  return [base,block].filter(Boolean).join('\n');
}
function parseClock(value){
  const match=clean(value).match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if(!match)return null;
  let hour=Number(match[1]);
  const minute=Number(match[2]||0);
  const meridiem=match[3].toUpperCase();
  if(hour<1||hour>12||minute<0||minute>59)return null;
  if(hour===12)hour=0;
  if(meridiem==='PM')hour+=12;
  return {hour,minute};
}
function parseWindow(value){
  const parts=clean(value).split(/\s*(?:-|–|—|to)\s*/i).filter(Boolean);
  if(parts.length!==2)return null;
  const start=parseClock(parts[0]);
  const end=parseClock(parts[1]);
  return start&&end?{start,end}:null;
}
function localDateTime(date,clock){
  return `${date}T${String(clock.hour).padStart(2,'0')}:${String(clock.minute).padStart(2,'0')}:00`;
}
function nextIsoDate(date){
  const [year,month,day]=date.split('-').map(Number);
  const value=new Date(Date.UTC(year,month-1,day+1,12));
  return `${value.getUTCFullYear()}-${String(value.getUTCMonth()+1).padStart(2,'0')}-${String(value.getUTCDate()).padStart(2,'0')}`;
}
function eventDate(event){
  return clean(event?.start?.dateTime||event?.start?.date).slice(0,10);
}
function calendarTimingPatch(event,payload){
  const suppliedDate=clean(payload.date);
  const suppliedTime=clean(payload.time);
  const date=suppliedDate||eventDate(event);
  if(!date)return {};
  if(!suppliedDate&&!suppliedTime)return {};
  const window=parseWindow(suppliedTime);
  if(window){
    return {
      start:{dateTime:localDateTime(date,window.start),timeZone:TIME_ZONE},
      end:{dateTime:localDateTime(date,window.end),timeZone:TIME_ZONE}
    };
  }
  if(/^all\s*day$/i.test(suppliedTime)||(!suppliedTime&&suppliedDate)){
    return {start:{date},end:{date:nextIsoDate(date)}};
  }
  return {};
}
function isClosedStatus(status){
  return /^(completed|cancelled|declined|paid)$/i.test(clean(status));
}
async function saveCalendarOnly(auth,payload,id){
  const eventId=calendarEventId(payload,id);
  if(!eventId){const error=new Error('Google Calendar event ID is missing');error.status=400;throw error;}
  const calendar=google.calendar({version:'v3',auth});
  const currentResponse=await calendar.events.get({calendarId:'primary',eventId});
  const current=currentResponse.data||{};
  const patch={
    description:calendarDescription(current.description||'',payload),
    ...calendarTimingPatch(current,payload)
  };
  const updatedResponse=await calendar.events.patch({
    calendarId:'primary',
    eventId,
    sendUpdates:'none',
    requestBody:patch
  });
  const updated=updatedResponse.data||current;

  await initDb();
  const status=clean(payload.status);
  const who=clean(payload.who);
  const date=clean(payload.date);
  const time=clean(payload.time);
  const notes=clean(payload.notes);
  await db().query(
    `update records set
      status=case when $2<>'' then $2 else status end,
      assigned_to=case when $3<>'' then $3 else assigned_to end,
      work_date=case when $4<>'' then $4::date else work_date end,
      work_time=case when $5<>'' then $5 else work_time end,
      notes=case when $6<>'' then $6 else notes end,
      closed=case when $2<>'' then $7 else closed end,
      raw=coalesce(raw,'{}'::jsonb)||$8::jsonb,
      updated_at=now()
    where id=$1`,
    [id,status,who,date,time,notes,isClosedStatus(status),JSON.stringify(updated)]
  );

  return {
    ok:true,id,tab:'Google Calendar',eventId,matchedBy:'calendar event',
    updatedFields:Object.keys(patch).length,updatedAt:new Date().toISOString()
  };
}

export default async function handler(req,res){
  try{
    method(req,['PATCH']);
    requireSession(req);
    const payload=await body(req);
    const id=clean(payload.id);
    if(!id){const error=new Error('Record ID is required');error.status=400;throw error;}

    const auth=await googleClient();
    if(isCalendarOnly(id,payload.source)){
      const result=await saveCalendarOnly(auth,payload,id);
      res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
      json(res,200,result);
      return;
    }

    const sheets=google.sheets({version:'v4',auth});
    const found=await findRecord(sheets,orderedTabs(payload.source,payload.type),{...payload,id});
    if(!found){
      const error=new Error(`${id} could not be matched safely to one live Arborwise sheet row. Refresh the board and try again.`);
      error.status=404;
      throw error;
    }

    const {tab,headers,row,rowNumber,matchedBy}=found;
    const updates=[];
    const isJobs=tab==='Jobs';
    const has=key=>Object.prototype.hasOwnProperty.call(payload,key);

    if(has('status'))addUpdate(updates,tab,headers,rowNumber,clean(payload.status),isJobs?['Status','Job Status']:['Status','Estimate Status']);
    if(has('date'))addUpdate(updates,tab,headers,rowNumber,clean(payload.date),isJobs?['Scheduled Date','Job Date','Work Date','Date']:['Appointment Date','Scheduled Date','Date']);
    if(has('time'))addUpdate(updates,tab,headers,rowNumber,clean(payload.time),isJobs?['Arrival Window','Appointment Time','Time','Time Window']:['Appointment Time','Arrival Window','Time']);
    if(has('who'))addUpdate(updates,tab,headers,rowNumber,clean(payload.who),isJobs?['Crew Lead','Assigned To','Assigned','Crew']:['Assigned To','Assigned','Estimator','Crew Lead']);
    if(has('notes')){
      if(isJobs){
        addUpdate(updates,tab,headers,rowNumber,clean(payload.notes),['Notes','Internal Notes','Job Notes','Customer Description / Notes']);
      }else{
        const noteIndex=headerIndex(headers,['Estimator Notes','Internal Notes','Notes']);
        const newNote=clean(payload.notes);
        if(noteIndex>=0&&newNote){
          const existing=clean(row[noteIndex]);
          const value=payload.appendNotes?[existing,newNote].filter(Boolean).join(' | '):newNote;
          updates.push({range:`${quoted(tab)}!${columnLetter(noteIndex)}${rowNumber}`,values:[[value]]});
        }
      }
    }

    if(!updates.length){const error=new Error('No editable fields were supplied');error.status=400;throw error;}

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId:SHEET_ID,
      requestBody:{valueInputOption:'USER_ENTERED',data:updates}
    });

    res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
    json(res,200,{ok:true,id,tab,rowNumber,matchedBy,updatedFields:updates.length,updatedAt:new Date().toISOString()});
  }catch(error){fail(res,error);}
}
