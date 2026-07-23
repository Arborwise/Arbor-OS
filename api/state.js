import {body,json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {initDb,db} from '../lib/db.js';

export default async function handler(req,res){
  try{
    method(req,['POST']);
    requireSession(req);
    await initDb();
    const b=await body(req);
    let result;

    if(b.action==='mileage'){
      result=await db().query(
        'insert into mileage(trip_date,origin,destination,miles,purpose) values($1,$2,$3,$4,$5) returning id,created_at',
        [b.date,b.from,b.to,Number(b.miles),b.why||'']
      );
    }else if(b.action==='hours'){
      result=await db().query(
        'insert into hours_entries(work_date,employee,job_ref,start_time,end_time,break_minutes,hours_worked,notes,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id,created_at',
        [b.date,b.employee,b.job||'',b.start,b.end,Number(b.breakMinutes||0),Number(b.hours||0),b.notes||'',b.status||'Submitted']
      );
    }else if(b.action==='note'){
      result=await db().query(
        'insert into notes(lane,body,author) values($1,$2,$3) returning id,created_at',
        [b.lane||'general',b.body,b.author||'']
      );
    }else if(b.action==='maintenance'){
      result=await db().query(
        `insert into maintenance(equipment_id,week_of,crew_checked,verified,photo_data,updated_at)
         values($1,$2,$3,$4,$5,now())
         on conflict(equipment_id,week_of) do update set
           crew_checked=excluded.crew_checked,
           verified=excluded.verified,
           photo_data=coalesce(excluded.photo_data,maintenance.photo_data),
           updated_at=now()
         returning equipment_id as id,updated_at as created_at`,
        [b.equipmentId,b.weekOf,Boolean(b.checked),Boolean(b.verified),b.photo||null]
      );
    }else{
      throw new Error('Unknown state action');
    }

    const row=result.rows[0]||{};
    json(res,200,{ok:true,id:row.id||null,createdAt:row.created_at||null});
  }catch(e){
    fail(res,e);
  }
}
