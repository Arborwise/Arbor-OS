import {google} from 'googleapis';
import {body,json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {googleClient} from '../lib/google.js';

const SHEET_ID=process.env.GOOGLE_SHEET_ID||'17XTUBhP7zC01qc6aNavMYCoFBEsnE9wUvmMmd-5lt1w';
const TABS=['Jobs','Master Estimates',"Today's Estimates"];

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

export default async function handler(req,res){
  try{
    method(req,['PATCH']);
    requireSession(req);
    const payload=await body(req);
    const id=clean(payload.id);
    if(!id){const error=new Error('Record ID is required');error.status=400;throw error;}

    const auth=await googleClient();
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