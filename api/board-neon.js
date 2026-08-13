import {createHash} from 'node:crypto';
import {json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {db,initDb} from '../lib/db.js';

function clean(value){return String(value??'').trim();}
function money(value){const number=Number(value||0);return Number.isFinite(number)?number:0;}
function statusForJob(raw){
  const value=clean(raw),lower=value.toLowerCase();
  if(/hold|paused|waiting verification|verify before/.test(lower))return 'Hold';
  if(/cancel|declin|reject/.test(lower))return 'Cancelled';
  if(/complete|paid|done/.test(lower))return 'Completed';
  if(/in progress|working|started/.test(lower))return 'In Progress';
  if(/scheduled|service/.test(lower))return 'Scheduled';
  if(/approved|accepted|scheduling/.test(lower))return 'Scheduling';
  return value||'Open';
}
function completionType(status,notes,crew){
  if(status!=='Completed')return null;
  const text=`${notes} ${crew}`.toLowerCase();
  if(text.includes('homeowner'))return 'homeowner';
  if(/kw landscaping|dallas crew|subcontract/.test(text))return 'subcontractor';
  return 'arborwise';
}
function dateOnly(value){return value?String(value).slice(0,10):'';}
function originLabel(source=''){
  const labels={app:'Arborwise OS',sheet:'Legacy Google Sheets',calendar:'Google Calendar',quickbooks:'QuickBooks',manual:'Manual',snapshot:'Snapshot'};
  return [...new Set(clean(source).split('+').map(part=>part.trim().toLowerCase()).filter(Boolean))]
    .map(part=>labels[part]||part).join(' + ');
}
function databaseRecord(row){
  const type=row.kind==='job'?'job':'est';
  const derived=type==='job'?statusForJob(row.status):clean(row.status)||'Open';
  const status=Boolean(row.closed)&&derived!=='Cancelled'?'Completed':derived;
  const who=clean(row.assigned_to)||'Unassigned';
  const notes=clean(row.notes)||clean(row.description);
  const raw=row.raw&&typeof row.raw==='object'?row.raw:{};
  return {
    id:clean(row.id),type,name:clean(row.customer_name),address:clean(row.address),city:clean(row.city),
    phone:clean(row.phone),email:clean(row.email),service:clean(row.service),equipment:clean(row.equipment_needed),
    amount:money(row.actual_revenue)||money(row.amount)||money(row.estimate_amount),
    laborCost:money(row.labor_cost),otherCost:money(row.other_cost),grossProfit:money(row.gross_profit),
    category:clean(row.category)||'RESIDENTIAL',who,status,rawStatus:clean(row.status),
    workDate:dateOnly(row.work_date),workTime:clean(row.work_time),followUp:dateOnly(row.follow_up_date),
    dateAdded:dateOnly(raw['Date Added']||raw.dateAdded||row.updated_at),notes,
    beforePhotos:clean(row.before_photos),afterPhotos:clean(row.after_photos)||clean(row.photos),crewNotes:clean(row.crew_notes),
    closed:Boolean(row.closed)||status==='Completed'||status==='Cancelled',
    completionType:completionType(status,notes,who),source:'Arborwise OS • Neon',originSource:originLabel(row.source),
    priority:clean(row.priority),important:Boolean(row.important),leadSource:clean(row.lead_source),phcDiscussed:clean(row.phc_discussed)
  };
}
function stableVersion(items){
  const stable=items.map(item=>[
    item.id,item.type,item.status,item.workDate,item.workTime,item.followUp,item.who,item.phone,item.email,
    item.address,item.service,item.notes,item.amount,item.laborCost,item.otherCost,item.closed
  ]);
  return createHash('sha256').update(JSON.stringify(stable)).digest('hex').slice(0,20);
}

export default async function handler(req,res){
  try{
    method(req,['GET']);
    requireSession(req);
    res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
    await initDb();
    const result=await db().query("select * from records where source not in ('seed','snapshot') and id not like 'TASK-%' order by updated_at desc");
    const items=result.rows.map(databaseRecord).filter(item=>item.id&&item.name);
    const sourceCounts={'Neon':items.length};
    json(res,200,{
      ok:true,items,dataVersion:stableVersion(items),readAt:new Date().toISOString(),
      warnings:[],sourceCounts,staleSources:[],sourceOfTruth:'Neon Postgres'
    });
  }catch(error){fail(res,error);}
}
