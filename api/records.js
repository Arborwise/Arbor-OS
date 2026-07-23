import {body,json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {initDb,db} from '../lib/db.js';

export default async function handler(req,res){
  try{
    method(req,['POST','PATCH','DELETE']);
    requireSession(req);
    await initDb();
    const b=await body(req);

    if(req.method==='DELETE'){
      if(!b.id)throw new Error('Record ID required');
      await db().query('delete from records where id=$1',[b.id]);
      return json(res,200,{ok:true,id:b.id});
    }

    if(!b.id)throw new Error('Record ID required');
    const raw={
      ...(b.raw&&typeof b.raw==='object'?b.raw:{}),
      sentDate:b.sentDate||b.raw?.sentDate||'',
      secondFollowUp:b.secondFollowUp||b.raw?.secondFollowUp||'',
      sharedVersion:Number(b.sharedVersion||b.raw?.sharedVersion||0)||0
    };

    await db().query(
      `insert into records(
        id,source,kind,category,customer_name,phone,email,address,service,description,
        amount,status,assigned_to,work_date,work_time,follow_up_date,notes,closed,raw,updated_at
      ) values(
        $1,'app',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,now()
      ) on conflict(id) do update set
        kind=excluded.kind,
        category=excluded.category,
        customer_name=excluded.customer_name,
        phone=excluded.phone,
        email=excluded.email,
        address=excluded.address,
        service=excluded.service,
        description=excluded.description,
        amount=excluded.amount,
        status=excluded.status,
        assigned_to=excluded.assigned_to,
        work_date=excluded.work_date,
        work_time=excluded.work_time,
        follow_up_date=excluded.follow_up_date,
        notes=excluded.notes,
        closed=excluded.closed,
        raw=coalesce(records.raw,'{}'::jsonb)||excluded.raw,
        updated_at=now()`,
      [
        b.id,b.type||'est',b.category||'ARBORWISE',b.name||'',b.phone||'',b.email||'',
        b.addr||'',b.service||'',b.desc||'',Number(String(b.money||'').replace(/[$,]/g,''))||0,
        b.status||'',b.who||'',b.date||null,b.time||'',b.fuDate||null,b.notes||'',
        Boolean(b.closed),raw
      ]
    );
    json(res,200,{ok:true,id:b.id,updatedAt:new Date().toISOString()});
  }catch(e){
    fail(res,e);
  }
}
