import {json,fail} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {initDb,db} from '../lib/db.js';
import {repairSeededQuickBooksRows} from '../lib/repair.js';

const empty={items:[],inbox:[],mileage:[],hours:[],notes:[],equipment:[],maintenance:[],lastSync:null,setupRequired:false};

export default async function handler(req,res){
  try{
    requireSession(req);
    if(!process.env.DATABASE_URL)return json(res,200,{ok:true,localMode:true,...empty});
    await initDb();
    await repairSeededQuickBooksRows();

    const [records,inbox,mileage,hours,notes,equipment,maintenance,sync]=await Promise.all([
      db().query('select * from records order by closed asc,coalesce(work_date,follow_up_date) asc nulls last,updated_at desc'),
      db().query("select * from inbox_items where status='open' order by occurred_at desc nulls last limit 100"),
      db().query('select * from mileage order by trip_date desc,id desc limit 500'),
      db().query('select * from hours_entries order by work_date desc,id desc limit 1000'),
      db().query('select * from notes order by created_at asc'),
      db().query('select * from equipment where active=true order by group_name,name'),
      db().query('select * from maintenance order by week_of desc,equipment_id'),
      db().query('select * from sync_runs order by id desc limit 1')
    ]);

    const items=records.rows.map(r=>{
      const raw=r.raw&&typeof r.raw==='object'?r.raw:{};
      return {
        id:r.id,
        type:r.kind,
        name:r.customer_name||'',
        addr:r.address||'',
        phone:r.phone||'',
        email:r.email||'',
        service:r.service||'',
        desc:r.description||'',
        date:r.work_date?String(r.work_date).slice(0,10):'',
        time:r.work_time||'',
        fuDate:r.follow_up_date?String(r.follow_up_date).slice(0,10):'',
        fuWhy:r.follow_up_date?'Follow up':'',
        who:r.assigned_to||'',
        status:r.status||'',
        notes:r.notes||'',
        money:r.amount?`$${Number(r.amount).toFixed(2)}`:'',
        closed:r.closed,
        category:r.category,
        sentDate:raw.sentDate||'',
        secondFollowUp:raw.secondFollowUp||'',
        sharedVersion:Number(raw.sharedVersion||0)||0,
        updatedAt:r.updated_at?new Date(r.updated_at).toISOString():null
      };
    });

    json(res,200,{
      ok:true,
      localMode:false,
      items,
      inbox:inbox.rows,
      mileage:mileage.rows,
      hours:hours.rows,
      notes:notes.rows,
      equipment:equipment.rows,
      maintenance:maintenance.rows,
      lastSync:sync.rows[0]||null,
      setupRequired:equipment.rows.length===0||records.rows.length===0
    });
  }catch(e){
    fail(res,e);
  }
}
