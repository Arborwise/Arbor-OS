import {db} from './db.js';

const TREE_ESTIMATE_IDS=['2010','2011','2012','2013','2014','2015'];
const MOW_ESTIMATE_IDS=['2016','2017','2018','2019'];
const ESTIMATE_IDS=[...TREE_ESTIMATE_IDS,...MOW_ESTIMATE_IDS];
const WORK_ORDER_IDS=ESTIMATE_IDS.map(id=>`WO-${id}`);
const SNAPSHOT_VERSION='2026-07-22-v1';

const snapshotRecords=[
  {
    id:'TASK-20260722-REVIEW',kind:'job',category:'GREG',name:'Arborwise Operations',address:'',
    service:'Review today’s open follow-ups, approved work, crew assignments, and plant-health opportunities.',
    amount:0,status:'Due Today',assigned:'Greg',workDate:'2026-07-22',workTime:'8:00 AM – 8:20 AM',followUp:null,
    notes:'Google Calendar: Arborwise Daily Follow-Up Review.'
  },
  {
    id:'TASK-20260723-REVIEW',kind:'job',category:'GREG',name:'Arborwise Operations',address:'',
    service:'Review overdue calls, estimates waiting for decisions, approved unscheduled work, and Friday crew readiness.',
    amount:0,status:'Scheduled',assigned:'Greg',workDate:'2026-07-23',workTime:'8:00 AM – 8:20 AM',followUp:null,
    notes:'Google Calendar: Arborwise Daily Follow-Up Review.'
  },
  {
    id:'TASK-20260724-REVIEW',kind:'job',category:'GREG',name:'Arborwise Operations',address:'',
    service:'Friday operations review: confirm KW mowing route, open follow-ups, and Saturday crew readiness.',
    amount:0,status:'Scheduled',assigned:'Greg',workDate:'2026-07-24',workTime:'8:00 AM – 8:20 AM',followUp:null,
    notes:'Google Calendar: Arborwise Daily Follow-Up Review.'
  },
  {
    id:'2002',kind:'est',category:'SBB',name:'SBB Management',address:'407 Walnut Drive, Murphy, TX',
    service:'Remove mature live oak by controlled rigging; grind stump and surface roots; haul off debris.',
    amount:4113.50,status:'Follow-Up Due',assigned:'Greg',workDate:null,workTime:'',followUp:'2026-07-22',
    notes:'QuickBooks Estimate 2002. Follow-up was scheduled for July 20 and remains open.'
  },
  {
    id:'2004',kind:'est',category:'ARBORWISE',name:'Jessica Farias',address:'236 Creekview Dr, Anna, TX 75409',
    service:'Prune two live oaks: interior cleanout, deadwood removal, canopy balance/elevation, and structure clearance.',
    amount:757.75,status:'Follow-Up Due',assigned:'Greg',workDate:null,workTime:'',followUp:'2026-07-22',
    notes:'QuickBooks Estimate 2004. Follow-up was scheduled for July 20 and remains open.'
  },
  {
    id:'2007',kind:'est',category:'ARBORWISE',name:'Deborah Stock',address:'',
    service:'Remove dead front-yard tree, cut stump flush, apply stump treatment, clean up and haul off debris.',
    amount:703.63,status:'Approved',assigned:'Greg',workDate:null,workTime:'',followUp:null,
    notes:'Accepted July 20. Approved work; not scheduled yet.'
  },
  {
    id:'2008',kind:'est',category:'ARBORWISE',name:'Susan Garrison',address:'',
    service:'NutriRoot soil treatments for three oak trees as an ongoing plant-health-care program.',
    amount:1136.63,status:'Estimate Sent',assigned:'Greg',workDate:null,workTime:'',followUp:'2026-07-23',
    notes:'QuickBooks Estimate 2008 is pending. Follow up Thursday, July 23.'
  },
  {
    id:'WO-1977',kind:'job',category:'ARBORWISE',name:'Dana & Tom Pierson',address:'9905 County Road 626, Blue Ridge, TX 75424',
    service:'Full-day personalized tree care, hackberry removal, live oak clearance, pruning, balance and elevation.',
    amount:2706.25,status:'Approved',assigned:'Brandon',workDate:null,workTime:'',followUp:null,
    notes:'Accepted July 20. Scheduling pending.'
  },
  {
    id:'WO-GTC-0005',kind:'job',category:'ARBORWISE',name:'Rick Lanicek',address:'379 John Douglas Drive, Van Alstyne, TX',
    service:'Mulberry removal, broken hackberry leader, fence-line reduction, structural pruning, elevation, clearance and oak canker work.',
    amount:2200,status:'Scheduled',assigned:'Brandon',workDate:'2026-07-25',workTime:'8:00 AM – 12:00 PM',followUp:null,
    notes:'Google Calendar job. Three-person crew; haul-off included.'
  },
  {
    id:'WO-GTC-0009',kind:'job',category:'ARBORWISE',name:'Johanna Friedel',address:'1103 Hyde Park Dr, McKinney, TX 75069',
    service:'Remove lower visible red-oak deadwood over the roof and rear fence; climb and rig as needed; clean up debris.',
    amount:650,status:'Scheduled',assigned:'Dallas 3-man crew',workDate:'2026-07-25',workTime:'1:00 PM – 5:00 PM',followUp:null,
    notes:'Google Calendar job. Approved at $650.'
  }
];

async function upsertSnapshotRecord(client,r){
  const raw={snapshotVersion:SNAPSHOT_VERSION,snapshotAsOf:'2026-07-22',source:'QuickBooks + Google Calendar'};
  await client.query(`
    insert into records(
      id,source,source_id,kind,category,customer_name,address,service,description,amount,status,
      assigned_to,work_date,work_time,follow_up_date,notes,closed,raw,updated_at
    ) values($1,'snapshot',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,false,$16,now())
    on conflict(id) do update set
      source=excluded.source,source_id=excluded.source_id,kind=excluded.kind,category=excluded.category,
      customer_name=excluded.customer_name,address=excluded.address,service=excluded.service,
      description=excluded.description,amount=excluded.amount,status=excluded.status,assigned_to=excluded.assigned_to,
      work_date=excluded.work_date,work_time=excluded.work_time,follow_up_date=excluded.follow_up_date,
      notes=excluded.notes,closed=false,raw=records.raw||excluded.raw,updated_at=now()
    where coalesce(records.raw->>'snapshotVersion','')<>$17
  `,[r.id,`snapshot:${r.id}`,r.kind,r.category,r.name,r.address,r.service,r.service,r.amount,r.status,r.assigned,r.workDate,r.workTime,r.followUp,r.notes,raw,SNAPSHOT_VERSION]);
}

export async function repairSeededQuickBooksRows(){
  const client=db();
  await client.query('begin');
  try{
    const snapshotRaw={snapshotVersion:SNAPSHOT_VERSION,snapshotAsOf:'2026-07-22',source:'QuickBooks snapshot'};
    await client.query(`
      update records
      set status='Approved', category='KW', assigned_to='KW Landscaping',
          work_date='2026-07-24', work_time='', follow_up_date=null, closed=false,
          notes='Approved mowing assigned to KW Landscaping for Friday, July 24, 2026.',
          raw=records.raw||$2::jsonb, updated_at=now()
      where kind='est' and id=any($1::text[])
        and coalesce(raw->>'snapshotVersion','')<>$3
    `,[MOW_ESTIMATE_IDS,JSON.stringify(snapshotRaw),SNAPSHOT_VERSION]);
    await client.query(`
      update records
      set status='Approved', category='SBB', assigned_to='Greg',
          work_date=null, work_time='', follow_up_date=null, closed=false,
          notes='Approved tree work; not scheduled yet.',
          raw=records.raw||$2::jsonb, updated_at=now()
      where kind='est' and id=any($1::text[])
        and coalesce(raw->>'snapshotVersion','')<>$3
    `,[TREE_ESTIMATE_IDS,JSON.stringify(snapshotRaw),SNAPSHOT_VERSION]);
    await client.query(`delete from records where kind='job' and id=any($1::text[])`,[WORK_ORDER_IDS]);
    for(const record of snapshotRecords)await upsertSnapshotRecord(client,record);
    await client.query('commit');
  }catch(error){
    await client.query('rollback');
    throw error;
  }
}