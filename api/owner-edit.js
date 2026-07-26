import {google} from 'googleapis';
import {body,json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {googleClient} from '../lib/google.js';

const SHEET_ID=process.env.GOOGLE_SHEET_ID||'17XTUBhP7zC01qc6aNavMYCoFBEsnE9wUvmMmd-5lt1w';
const TABS=['Jobs','Master Estimates',"Today's Estimates"];

function clean(value){return String(value??'').trim();}
function normalized(value){return clean(value).toLowerCase().replace(/[^a-z0-9]+/g,'');}
function recordKey(value){return normalized(clean(value).replace(/^WO[-\s]*/i,''));}
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
function orderedTabs(source,type){
  const text=clean(source).toLowerCase();
  if(text.includes("today's estimates"))return ["Today's Estimates",'Master Estimates','Jobs'];
  if(text.includes('master estimates'))return ['Master Estimates',"Today's Estimates",'Jobs'];
  if(text.includes('jobs'))return ['Jobs','Master Estimates',"Today's Estimates"];
  return type==='est'?['Master Estimates',"Today's Estimates",'Jobs']:TABS;
}
async function findRecord(sheets,tabs,id){
  const target=recordKey(id);
  for(const tab of tabs){
    const response=await sheets.spreadsheets.values.get({
      spreadsheetId:SHEET_ID,
      range:`${quoted(tab)}!A:AZ`,
      valueRenderOption:'FORMATTED_VALUE',
      dateTimeRenderOption:'FORMATTED_STRING'
    });
    const values=response.data.values||[];
    const headers=values[0]||[];
    const idIndex=headerIndex(headers,tab==='Jobs'
      ? ['Job ID','Job #','Job Number','Work Order','Work Order #','Record #','ID']
      : ['Estimate #','Estimate Number','Estimate ID','Record #','ID']);
    if(idIndex<0)continue;
    const rowOffset=values.slice(1).findIndex(row=>recordKey(row[idIndex])===target);
    if(rowOffset>=0)return {tab,headers,row:values[rowOffset+1]||[],rowNumber:rowOffset+2};
  }
  return null;
}
function addUpdate(updates,tab,headers,rowNumber,value,names){
  const index=headerIndex(headers,names);
  if(index<0)return false;
  updates.push({range:`${quoted(tab)}!${columnLetter(index)}${rowNumber}`,values:[[value??'']]});
  return true;
}

export default async function handler(req,res){
  try{
    method(req,['PATCH']);
    requireSession(req);
    const payload=await body(req);
    const id=clean(payload.id);
    if(!id){const error=new Error('Record ID is required');error.status=400;throw error;}

    const auth=await googleClient();
    const sheets=google.sheets({version:'v4',auth});
    const found=await findRecord(sheets,orderedTabs(payload.source,payload.type),id);
    if(!found){const error=new Error(`${id} was not found in the live Arborwise sheets`);error.status=404;throw error;}

    const {tab,headers,row,rowNumber}=found;
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
    json(res,200,{ok:true,id,tab,rowNumber,updatedFields:updates.length,updatedAt:new Date().toISOString()});
  }catch(error){fail(res,error);}
}
