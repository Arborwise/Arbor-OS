import {createHash} from 'node:crypto';
import {json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {sheetRows} from '../lib/google.js';

const TIME_ZONE='America/Chicago';

function clean(value){return String(value??'').trim();}
function money(value){
  const parsed=Number(clean(value).replace(/[$,]/g,''));
  return Number.isFinite(parsed)?parsed:0;
}
function isoDate(value){
  const text=clean(value);
  if(!text)return '';
  const iso=text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(iso)return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const us=text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if(!us)return '';
  const month=Number(us[1]),day=Number(us[2]),year=Number(us[3]);
  const check=new Date(Date.UTC(year,month-1,day));
  if(check.getUTCFullYear()!==year||check.getUTCMonth()!==month-1||check.getUTCDate()!==day)return '';
  return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}
function statusForJob(raw){
  const value=clean(raw);
  const lower=value.toLowerCase();
  if(/hold|paused|waiting verification/.test(lower))return 'Hold';
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
function categoryFor(name,crew,email,notes=''){
  const text=`${name} ${crew} ${email} ${notes}`.toLowerCase();
  if(text.includes('kw landscaping'))return 'KW';
  if(text.includes('sbbmanagement')||text.includes('sicily laguna')||text.includes('venetian hoa'))return 'SBB';
  if(text.includes('goodwin'))return 'GOODWIN';
  if(text.includes('kanam'))return 'KANAM';
  return 'RESIDENTIAL';
}
function normalizedId(value){return clean(value).replace(/^WO-/i,'');}
function jobRecord(row,warnings,seen){
  const id=clean(row['Job ID']);
  if(!id)return null;
  if(seen.has(id)){warnings.push(`Duplicate Jobs ID: ${id}`);return null;}
  seen.add(id);
  const rawStatus=clean(row.Status);
  const status=statusForJob(rawStatus);
  const date=isoDate(row['Scheduled Date']);
  const crew=clean(row['Crew Lead']);
  const notes=clean(row.Notes);
  if((status==='Scheduled'||status==='In Progress')&&!date)warnings.push(`${id} is ${status} without a scheduled date`);
  if(status==='Hold'&&(date||crew))warnings.push(`${id} is on Hold but still has a date or crew assignment`);
  const completion=completionType(status,notes,crew);
  if(status==='Completed'&&!completion)warnings.push(`${id} is completed without a completion type`);
  return {
    id,
    type:'job',
    name:clean(row.Customer),
    address:clean(row.Address),
    city:clean(row.City),
    phone:clean(row.Phone),
    email:'',
    service:clean(row.Service),
    equipment:clean(row['Equipment Needed']),
    amount:money(row['Actual Revenue'])||money(row['Estimate Amount']),
    laborCost:money(row['Labor Cost']),
    otherCost:money(row['Other Cost']),
    category:categoryFor(row.Customer,crew,'',notes),
    who:crew||'Unassigned',
    status,
    rawStatus,
    workDate:date,
    workTime:clean(row['Arrival Window']),
    followUp:'',
    notes,
    beforePhotos:clean(row['Before Photos']),
    afterPhotos:clean(row['After Photos']),
    closed:status==='Completed'||status==='Cancelled',
    completionType:completion,
    source:'Jobs'
  };
}
function estimateRecord(row,warnings,jobKeys,seen){
  const id=clean(row['Estimate #']);
  if(!id||!clean(row['Customer Name']))return null;
  if(jobKeys.has(normalizedId(id)))return null;
  const key=`EST-${id}`;
  if(seen.has(key)){warnings.push(`Duplicate estimate ID: ${id}`);return null;}
  seen.add(key);
  const street=clean(row['Street Address']);
  const city=clean(row.City),state=clean(row.State),zip=clean(row.ZIP);
  const locality=[city,state,zip].filter(Boolean).join(', ').replace(', ,',',');
  const address=[street,locality].filter(Boolean).join(', ');
  const rawStatus=clean(row.Status)||'Open';
  const lower=rawStatus.toLowerCase();
  const closed=/declin|reject|cancel|converted|closed/.test(lower);
  const date=isoDate(row['Appointment Date']);
  const followUp=isoDate(row['Next Follow-Up Date']);
  const assigned=clean(row['Assigned To'])||'Unassigned';
  const notes=[clean(row['Customer Description / Notes']),clean(row['Estimator Notes']),clean(row['Follow-Up Reason'])].filter(Boolean).join(' ');
  return {
    id,
    type:'est',
    name:clean(row['Customer Name']),
    address,
    city,
    phone:clean(row['Phone Number']),
    email:clean(row.Email),
    service:clean(row['Service Needed']),
    equipment:'',
    amount:0,
    laborCost:0,
    otherCost:0,
    category:categoryFor(row['Customer Name'],assigned,row.Email,notes),
    who:assigned,
    status:rawStatus,
    rawStatus,
    workDate:date,
    workTime:clean(row['Appointment Time']),
    followUp,
    notes,
    beforePhotos:'',
    afterPhotos:clean(row.Photos),
    closed,
    completionType:null,
    source:'Master Estimates'
  };
}
function stableVersion(items){
  const stable=items.map(item=>[item.id,item.type,item.status,item.workDate,item.workTime,item.who,item.notes,item.amount,item.laborCost,item.otherCost,item.closed,item.completionType]);
  return createHash('sha256').update(JSON.stringify(stable)).digest('hex').slice(0,20);
}

export default async function handler(req,res){
  try{
    method(req,['GET']);
    requireSession(req);
    res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
    const [jobs,estimates]=await Promise.all([
      sheetRows('Jobs','A:U'),
      sheetRows('Master Estimates','A:AA')
    ]);
    const warnings=[];
    const seen=new Set();
    const jobItems=jobs.map(row=>jobRecord(row,warnings,seen)).filter(Boolean);
    const jobKeys=new Set(jobItems.map(item=>normalizedId(item.id)));
    const estimateItems=estimates.map(row=>estimateRecord(row,warnings,jobKeys,seen)).filter(Boolean);
    const items=[...jobItems,...estimateItems];
    json(res,200,{
      ok:true,
      source:'Google Sheets — Jobs + Master Estimates',
      readAt:new Date().toISOString(),
      timeZone:TIME_ZONE,
      dataVersion:stableVersion(items),
      warnings,
      items
    });
  }catch(error){fail(res,error);}
}
