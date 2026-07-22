import {db} from './db.js';

const ESTIMATE_IDS=Array.from({length:10},(_,i)=>String(2010+i));
const WORK_ORDER_IDS=ESTIMATE_IDS.map(id=>`WO-${id}`);

export async function repairSeededQuickBooksRows(){
  const client=db();
  await client.query('begin');
  try{
    await client.query(`
      update records
      set status='Estimate Sent', assigned_to='Greg', work_date=null,
          follow_up_date='2026-07-24', closed=false,
          notes=case
            when notes is null or notes='' or notes ilike '%Created from approved estimate%'
              then 'QuickBooks estimate was pending as of July 21, 2026. Follow up before creating a work order.'
            else notes
          end,
          updated_at=now()
      where source='seed' and kind='est' and id=any($1::text[])
    `,[ESTIMATE_IDS]);
    await client.query(`delete from records where source='seed' and kind='job' and id=any($1::text[])`,[WORK_ORDER_IDS]);
    await client.query('commit');
  }catch(error){
    await client.query('rollback');
    throw error;
  }
}
