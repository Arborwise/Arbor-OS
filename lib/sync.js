import {db,initDb,getToken} from './db.js';
import {qboSyncData,qboConfigured} from './qbo.js';
import {googleSyncData,googleConfigured} from './google.js';
import {classify,isClosed} from './classify.js';
function money(n){const v=Number(n||0);return Number.isFinite(v)?v:0;}
function addr(a){if(!a)return '';return [a.Line1,a.Line2,a.City,a.CountrySubDivisionCode,a.PostalCode].filter(Boolean).join(', ');}
function operationalEstimateStatus(e){const raw=String(e.TxnStatus||e.EmailStatus||'Pending');return /accepted|approved/i.test(raw)?'Approved':raw;}
function estimateRecord(e){const desc=(e.Line||[]).map(x=>x.Description||x.SalesItemLineDetail?.ItemRef?.name||'').filter(Boolean).join('; ');const customer=e.CustomerRef?.name||'';const email=e.BillEmail?.Address||'';const text=[customer,email,desc,e.PrivateNote].filter(Boolean).join(' ');const status=operationalEstimateStatus(e);return {id:String(e.DocNumber||`QBE-${e.Id}`),source:'quickbooks',sourceId:String(e.Id),kind:'est',category:classify(text),name:customer,phone:'',email,address:addr(e.ShipAddr||e.BillAddr),service:desc,description:e.CustomerMemo?.value||'',amount:money(e.TotalAmt),status,assigned:'Greg',date:e.TxnDate||null,time:'',followUp:null,notes:e.PrivateNote||'',closed:isClosed(status),raw:e};}
function invoiceRecord(i){const desc=(i.Line||[]).map(x=>x.Description||x.SalesItemLineDetail?.ItemRef?.name||'').filter(Boolean).join('; ');const status=Number(i.Balance||0)>0?(i.DueDate&&i.DueDate<new Date().toISOString().slice(0,10)?'Overdue':'Invoiced'):'Paid';return {id:`INV-${i.DocNumber||i.Id}`,source:'quickbooks',sourceId:`invoice:${i.Id}`,kind:'job',category:classify([i.CustomerRef?.name,i.BillEmail?.Address,desc].join(' ')),name:i.CustomerRef?.name||'',phone:'',email:i.BillEmail?.Address||'',address:addr(i.ShipAddr||i.BillAddr),service:desc,description:'',amount:money(i.TotalAmt),status,assigned:'Greg',date:i.TxnDate||null,time:'',followUp:i.DueDate||null,notes:`Balance $${money(i.Balance).toFixed(2)}`,closed:status==='Paid',raw:i};}
function pick(row,names){for(const n of names)if(row[n]!==undefined&&row[n]!=='')return row[n];return '';}
function sheetRecord(row,kind){const id=String(pick(row,['Estimate #','Job #','Record #','ID'])||'').trim();if(!id)return null;const status=String(pick(row,['Status'])||'').trim();const name=pick(row,['Customer Name','Customer','Name']);const service=pick(row,['Service Needed','Work To Do','Work Description','Description']);const notes=pick(row,['Customer Description / Notes','Notes','Estimator Notes']);const email=pick(row,['Email','Customer Email']);const text=[name,email,service,notes].join(' ');return {id,source:'sheet',sourceId:`${kind}:${id}`,kind,category:classify(text),name,phone:pick(row,['Phone Number','Phone']),email,address:[pick(row,['Street Address','Address']),pick(row,['City']),pick(row,['State']),pick(row,['ZIP'])].filter(Boolean).join(', '),service,description:notes,amount:money(String(pick(row,['Amount','Total','Estimate Total'])).replace(/[$,]/g,'')),status,assigned:pick(row,['Assigned To','Assigned'])||'Greg',date:pick(row,['Appointment Date','Job Date','Date'])||null,time:pick(row,['Appointment Time','Time'])||'',followUp:pick(row,['Next Follow-Up Date','Follow-Up Date'])||null,notes:pick(row,['Estimator Notes','Internal Notes']),closed:isClosed(status),raw:row};}
async function upsert(r){await db().query(`insert into records(id,source,source_id,kind,category,customer_name,phone,email,address,service,description,amount,status,assigned_to,work_date,work_time,follow_up_date,notes,closed,raw,updated_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,now()) on conflict(id) do update set source=excluded.source,source_id=excluded.source_id,kind=excluded.kind,category=excluded.category,customer_name=coalesce(nullif(excluded.customer_name,''),records.customer_name),phone=coalesce(nullif(excluded.phone,''),records.phone),email=coalesce(nullif(excluded.email,''),records.email),address=coalesce(nullif(excluded.address,''),records.address),service=coalesce(nullif(excluded.service,''),records.service),description=coalesce(nullif(excluded.description,''),records.description),amount=case when excluded.amount=0 then records.amount else excluded.amount end,status=coalesce(nullif(excluded.status,''),records.status),assigned_to=coalesce(nullif(excluded.assigned_to,''),records.assigned_to),work_date=coalesce(excluded.work_date,records.work_date),work_time=coalesce(nullif(excluded.work_time,''),records.work_time),follow_up_date=coalesce(excluded.follow_up_date,records.follow_up_date),notes=coalesce(nullif(excluded.notes,''),records.notes),closed=excluded.closed,raw=records.raw||excluded.raw,updated_at=now()`,[r.id,r.source,r.sourceId,r.kind,r.category,r.name,r.phone,r.email,r.address,r.service,r.description,r.amount,r.status,r.assigned,r.date||null,r.time,r.followUp||null,r.notes,r.closed,r.raw]);}
function relevantMessage(m){return /estimate|approved|approval|work order|tree|prun|remov|stump|sbb|goodwin|kanam|invoice|payment/i.test(`${m.from} ${m.subject} ${m.snippet}`);}
export async function runSync(trigger='manual'){
  await initDb();
  const start=await db().query('insert into sync_runs(trigger) values($1) returning id',[trigger]);
  const runId=start.rows[0].id;
  const summary={quickbooks:{status:'not_connected',estimates:0,invoices:0},google:{status:'not_connected',sheetRecords:0,gmailItems:0,calendarEvents:0}};
  const errors=[];
  try{
    const qboToken=await getToken('quickbooks');
    if(qboConfigured()&&qboToken){
      try{
        const q=await qboSyncData();
        for(const r of [...q.estimates.map(estimateRecord),...q.invoices.map(invoiceRecord)])await upsert(r);
        summary.quickbooks={status:'success',estimates:q.estimates.length,invoices:q.invoices.length};
      }catch(e){summary.quickbooks={status:'error',estimates:0,invoices:0,error:e.message};errors.push(`QuickBooks: ${e.message}`);}
    }
    const googleToken=await getToken('google');
    if(googleConfigured()&&googleToken){
      try{
        const g=await googleSyncData();
        const records=[...g.master.map(x=>sheetRecord(x,'est')).filter(Boolean),...g.today.map(x=>sheetRecord(x,'est')).filter(Boolean),...g.jobs.map(x=>sheetRecord(x,'job')).filter(Boolean)];
        for(const r of records)await upsert(r);
        let inbox=0;
        for(const m of g.messages.filter(relevantMessage)){await db().query(`insert into inbox_items(id,source,subject,sender,snippet,status,raw,occurred_at,updated_at) values($1,'gmail',$2,$3,$4,'open',$5,$6,now()) on conflict(id) do update set subject=excluded.subject,sender=excluded.sender,snippet=excluded.snippet,raw=excluded.raw,updated_at=now()`,[`gmail:${m.id}`,m.subject,m.from,m.snippet,m,m.date?new Date(m.date):null]);inbox++;}
        summary.google={status:'success',sheetRecords:records.length,gmailItems:inbox,calendarEvents:g.events.length};
      }catch(e){summary.google={status:'error',sheetRecords:0,gmailItems:0,calendarEvents:0,error:e.message};errors.push(`Google: ${e.message}`);}
    }
    const successes=[summary.quickbooks.status,summary.google.status].filter(x=>x==='success').length;
    const status=successes?'success':(errors.length?'failed':'needs_connection');
    await db().query('update sync_runs set finished_at=now(),status=$1,summary=$2,error=$3 where id=$4',[status,summary,errors.join(' | ')||null,runId]);
    return summary;
  }catch(e){await db().query('update sync_runs set finished_at=now(),status=$1,error=$2 where id=$3',['failed',String(e.stack||e),runId]);throw e;}
}
