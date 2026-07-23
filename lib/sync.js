import {db,initDb,getToken} from './db.js';
import {qboSyncData,qboConfigured} from './qbo.js';
import {googleSyncData,googleConfigured} from './google.js';
import {classify,isClosed} from './classify.js';
import {repairSeededQuickBooksRows} from './repair.js';

function money(n){const value=Number(n||0);return Number.isFinite(value)?value:0;}
function addr(a){if(!a)return '';return [a.Line1,a.Line2,a.City,a.CountrySubDivisionCode,a.PostalCode].filter(Boolean).join(', ');}
function clean(value=''){return String(value||'').replace(/&#124;/gi,'|').replace(/&#40;/gi,'(').replace(/&#41;/gi,')').replace(/&amp;/gi,'&').trim();}
function qboDescription(transaction){return (transaction.Line||[]).map(line=>line.Description||line.SalesItemLineDetail?.ItemRef?.name||'').filter(Boolean).join('; ');}
function operationalEstimateStatus(estimate){
  const raw=String(estimate.TxnStatus||estimate.EmailStatus||'Pending').trim();
  if(/accepted|approved/i.test(raw))return 'Approved - Scheduling Needed';
  if(/converted/i.test(raw))return 'Converted';
  if(/rejected|declined/i.test(raw))return 'Rejected';
  return raw;
}
function estimateRecord(estimate){
  const description=qboDescription(estimate);
  const customer=estimate.CustomerRef?.name||'';
  const email=estimate.BillEmail?.Address||'';
  const text=[customer,email,description,estimate.PrivateNote].filter(Boolean).join(' ');
  const status=operationalEstimateStatus(estimate);
  const accepted=/approved|accepted/i.test(status);
  return {
    id:String(estimate.DocNumber||`QBE-${estimate.Id}`),source:'quickbooks',sourceId:String(estimate.Id),kind:accepted?'job':'est',category:classify(text),
    name:customer,phone:'',email,address:addr(estimate.ShipAddr||estimate.BillAddr),service:description,description:estimate.CustomerMemo?.value||'',
    amount:money(estimate.TotalAmt),status,assigned:'Greg',date:null,time:'',followUp:null,notes:estimate.PrivateNote||'',closed:isClosed(status),raw:estimate
  };
}
function invoiceRecord(invoice){
  const description=qboDescription(invoice);
  const balance=money(invoice.Balance);
  const today=new Date().toISOString().slice(0,10);
  const status=balance>0?(invoice.DueDate&&invoice.DueDate<today?'Overdue':'Invoiced'):'Paid';
  return {
    id:`INV-${invoice.DocNumber||invoice.Id}`,source:'quickbooks',sourceId:`invoice:${invoice.Id}`,kind:'job',
    category:classify([invoice.CustomerRef?.name,invoice.BillEmail?.Address,description].join(' ')),name:invoice.CustomerRef?.name||'',phone:'',
    email:invoice.BillEmail?.Address||'',address:addr(invoice.ShipAddr||invoice.BillAddr),service:description,description:'',amount:money(invoice.TotalAmt),
    status,assigned:'Greg',date:invoice.TxnDate||null,time:'',followUp:balance>0?(invoice.DueDate||null):null,notes:`Balance $${balance.toFixed(2)}`,closed:status==='Paid',raw:invoice
  };
}
function pick(row,names){for(const name of names)if(row[name]!==undefined&&row[name]!=='')return row[name];return '';}
function sheetRecord(row,kind){
  const id=String(pick(row,['Estimate #','Job #','Record #','ID'])||'').trim();if(!id)return null;
  const status=String(pick(row,['Status'])||'').trim();const name=pick(row,['Customer Name','Customer','Name']);
  const service=pick(row,['Service Needed','Work To Do','Work Description','Description']);const notes=pick(row,['Customer Description / Notes','Notes','Estimator Notes']);
  const email=pick(row,['Email','Customer Email']);const text=[name,email,service,notes].join(' ');
  return {id,source:'sheet',sourceId:`${kind}:${id}`,kind,category:classify(text),name,phone:pick(row,['Phone Number','Phone']),email,
    address:[pick(row,['Street Address','Address']),pick(row,['City']),pick(row,['State']),pick(row,['ZIP'])].filter(Boolean).join(', '),service,description:notes,
    amount:money(String(pick(row,['Amount','Total','Estimate Total'])).replace(/[$,]/g,'')),status,assigned:pick(row,['Assigned To','Assigned'])||'Greg',
    date:pick(row,['Appointment Date','Job Date','Date'])||null,time:pick(row,['Appointment Time','Time'])||'',followUp:pick(row,['Next Follow-Up Date','Follow-Up Date'])||null,
    notes:pick(row,['Estimator Notes','Internal Notes']),closed:isClosed(status),raw:row};
}
function eventDate(event){const value=event.start?.dateTime||event.start?.date||'';return value?String(value).slice(0,10):null;}
function eventTime(event){
  if(!event.start?.dateTime)return event.start?.date?'All day':'';
  const format=value=>new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',hour:'numeric',minute:'2-digit'}).format(new Date(value));
  const start=format(event.start.dateTime);const end=event.end?.dateTime?format(event.end.dateTime):'';return end?`${start}-${end}`:start;
}
function eventAssignee(text){if(/\btoby\b/i.test(text))return 'Toby';if(/kw landscaping/i.test(text))return 'KW Landscaping';if(/dallas/i.test(text))return 'Dallas crew';if(/\bbrandon\b/i.test(text))return 'Brandon';return 'Greg';}
function calendarBase(event,id){
  const summary=clean(event.summary||'Scheduled Arborwise work');const description=clean(event.description||'');const combined=`${summary} ${description}`;
  const route=/\b\d+\s+approved\b/i.test(summary);const name=route?summary:summary.split('|')[0].trim();
  const phone=(description.match(/(?:Phone\s*:\s*)?(\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})/i)||[])[1]||'';
  const email=(description.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)||[])[0]||'';
  return {id,source:'calendar',sourceId:`calendar:${event.id}:${id}`,kind:'job',category:classify(combined),name,phone,email,address:clean(event.location||''),
    service:description||summary,description:'',amount:0,status:'Scheduled',assigned:eventAssignee(combined),date:eventDate(event),time:eventTime(event),followUp:null,
    notes:`Google Calendar: ${summary}${description?` — ${description}`:''}`,closed:false,raw:event};
}
function calendarRecords(event){
  if(!event||event.status==='cancelled')return [];
  const summary=clean(event.summary||'');const description=clean(event.description||'');
  if(/Arborwise Daily Follow-Up Review/i.test(summary))return [];
  if(/6 Approved Tree Replacements/i.test(summary))return ['2010','2011','2012','2013','2014','2015'].map(id=>({...calendarBase(event,id),name:'',phone:'',email:'',address:'',service:'',category:'SBB',assigned:'Toby'}));
  const estimateIds=[...description.matchAll(/\bEstimate\s+(\d{4,})\b/gi)].map(match=>match[1]);
  if(estimateIds.length>1)return [...new Set(estimateIds)].map(id=>({...calendarBase(event,id),name:'',phone:'',email:'',address:'',service:'',assigned:eventAssignee(`${summary} ${description}`)}));
  const quickBooksId=(description.match(/QuickBooks\s+Estimate\s*:?\s*(\d+)/i)||[])[1];
  if(quickBooksId)return [calendarBase(event,quickBooksId)];
  const arborId=(description.match(/Arbor(?:OS|wise)\s+Record(?:\s+ID)?\s*:?\s*([A-Z0-9-]+)/i)||[])[1];
  if(arborId){const id=/^GTC-/i.test(arborId)?`WO-${arborId}`:arborId;return [calendarBase(event,id)];}
  return [calendarBase(event,`CAL-${event.id}`)];
}
async function upsert(record){
  await db().query(`insert into records(id,source,source_id,kind,category,customer_name,phone,email,address,service,description,amount,status,assigned_to,work_date,work_time,follow_up_date,notes,closed,raw,updated_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,now()) on conflict(id) do update set source=excluded.source,source_id=excluded.source_id,kind=excluded.kind,category=excluded.category,customer_name=coalesce(nullif(excluded.customer_name,''),records.customer_name),phone=coalesce(nullif(excluded.phone,''),records.phone),email=coalesce(nullif(excluded.email,''),records.email),address=coalesce(nullif(excluded.address,''),records.address),service=coalesce(nullif(excluded.service,''),records.service),description=coalesce(nullif(excluded.description,''),records.description),amount=case when excluded.amount=0 then records.amount else excluded.amount end,status=coalesce(nullif(excluded.status,''),records.status),assigned_to=coalesce(nullif(excluded.assigned_to,''),records.assigned_to),work_date=coalesce(excluded.work_date,records.work_date),work_time=coalesce(nullif(excluded.work_time,''),records.work_time),follow_up_date=coalesce(excluded.follow_up_date,records.follow_up_date),notes=coalesce(nullif(excluded.notes,''),records.notes),closed=excluded.closed,raw=coalesce(records.raw,'{}'::jsonb)||excluded.raw,updated_at=now()`,[record.id,record.source,record.sourceId,record.kind,record.category,record.name,record.phone,record.email,record.address,record.service,record.description,record.amount,record.status,record.assigned,record.date||null,record.time,record.followUp||null,record.notes,record.closed,record.raw]);
}
function relevantMessage(message){return /estimate|approved|approval|work order|tree|prun|remov|stump|sbb|goodwin|kanam|invoice|payment/i.test(`${message.from} ${message.subject} ${message.snippet}`);}

export async function runSync(trigger='manual'){
  await initDb();
  const start=await db().query('insert into sync_runs(trigger) values($1) returning id',[trigger]);const runId=start.rows[0].id;
  const summary={quickbooks:{status:'not_connected',estimates:0,invoices:0},google:{status:'not_connected',sheetRecords:0,gmailItems:0,calendarEvents:0,calendarRecords:0}};const errors=[];
  try{
    const qboToken=await getToken('quickbooks');
    if(qboConfigured()&&qboToken){try{const q=await qboSyncData();for(const record of [...q.estimates.map(estimateRecord),...q.invoices.map(invoiceRecord)])await upsert(record);summary.quickbooks={status:'success',estimates:q.estimates.length,invoices:q.invoices.length};}catch(error){summary.quickbooks={status:'error',estimates:0,invoices:0,error:error.message};errors.push(`QuickBooks: ${error.message}`);}}
    const googleToken=await getToken('google');
    if(googleConfigured()&&googleToken){try{
      const googleData=await googleSyncData();
      const sheetRecords=[...googleData.master.map(row=>sheetRecord(row,'est')).filter(Boolean),...googleData.today.map(row=>sheetRecord(row,'est')).filter(Boolean),...googleData.jobs.map(row=>sheetRecord(row,'job')).filter(Boolean)];
      for(const record of sheetRecords)await upsert(record);
      const scheduled=googleData.events.flatMap(calendarRecords);for(const record of scheduled)await upsert(record);
      let inbox=0;for(const message of googleData.messages.filter(relevantMessage)){await db().query(`insert into inbox_items(id,source,subject,sender,snippet,status,raw,occurred_at,updated_at) values($1,'gmail',$2,$3,$4,'open',$5,$6,now()) on conflict(id) do update set subject=excluded.subject,sender=excluded.sender,snippet=excluded.snippet,raw=excluded.raw,updated_at=now()`,[`gmail:${message.id}`,message.subject,message.from,message.snippet,message,message.date?new Date(message.date):null]);inbox++;}
      summary.google={status:'success',sheetRecords:sheetRecords.length,gmailItems:inbox,calendarEvents:googleData.events.length,calendarRecords:scheduled.length};
    }catch(error){summary.google={status:'error',sheetRecords:0,gmailItems:0,calendarEvents:0,calendarRecords:0,error:error.message};errors.push(`Google: ${error.message}`);}}
    await repairSeededQuickBooksRows();
    const successes=[summary.quickbooks.status,summary.google.status].filter(status=>status==='success').length;const status=successes?'success':(errors.length?'failed':'needs_connection');
    await db().query('update sync_runs set finished_at=now(),status=$1,summary=$2,error=$3 where id=$4',[status,summary,errors.join(' | ')||null,runId]);return summary;
  }catch(error){await db().query('update sync_runs set finished_at=now(),status=$1,error=$2 where id=$3',['failed',String(error.stack||error),runId]);throw error;}
}
