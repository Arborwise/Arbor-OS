import {db,initDb} from './db.js';

function clean(value,max=500){return String(value??'').trim().slice(0,max);}
function emailKey(value){return clean(value).toLowerCase().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)?.[0]||'';}

export async function applyAllCustomerReplyStops(){
  await initDb();
  const records=await db().query(
    `select id,email
     from records
     where coalesce(email,'')<>''`
  );
  const recordIdsByEmail=new Map();
  for(const record of records.rows){
    const email=emailKey(record.email);
    if(!email)continue;
    if(!recordIdsByEmail.has(email))recordIdsByEmail.set(email,new Set());
    recordIdsByEmail.get(email).add(record.id);
  }

  const messages=await db().query(
    `select sender,occurred_at
     from inbox_items
     where source='gmail'
       and occurred_at>=now()-interval '14 days'`
  );

  let cancelled=0;
  for(const message of messages.rows){
    const ids=recordIdsByEmail.get(emailKey(message.sender));
    if(!ids?.size)continue;
    for(const recordId of ids){
      const result=await db().query(
        `update communication_events
         set status='cancelled',stop_reason='Customer replied by email',updated_at=now()
         where record_id=$1
           and communication_type='estimate_three_day_followup'
           and status in ('planned','due')
           and created_at<=coalesce($2,now())
         returning id`,
        [recordId,message.occurred_at||null]
      );
      cancelled+=result.rowCount;
    }
  }
  return {cancelled};
}
