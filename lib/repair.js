import {db} from './db.js';

const TREE_ESTIMATE_IDS=['2010','2011','2012','2013','2014','2015'];
const MOW_ESTIMATE_IDS=['2016','2017','2018','2019'];
const ESTIMATE_IDS=[...TREE_ESTIMATE_IDS,...MOW_ESTIMATE_IDS];
const WORK_ORDER_IDS=ESTIMATE_IDS.map(id=>`WO-${id}`);

export async function repairSeededQuickBooksRows(){
  const client=db();
  await client.query('begin');
  try{
    await client.query(`
      update records
      set status='Approved', category='KW', assigned_to='KW Landscaping',
          work_date='2026-07-24', work_time='', follow_up_date=null, closed=false,
          notes='Approved mowing assigned to KW Landscaping for Friday, July 24, 2026.',
          updated_at=now()
      where kind='est' and id=any($1::text[])
    `,[MOW_ESTIMATE_IDS]);
    await client.query(`
      update records
      set status='Approved', category='SBB', assigned_to='Greg',
          work_date=null, work_time='', follow_up_date=null, closed=false,
          notes='Approved tree work; not scheduled yet.',
          updated_at=now()
      where kind='est' and id=any($1::text[])
    `,[TREE_ESTIMATE_IDS]);
    await client.query(`delete from records where kind='job' and id=any($1::text[])`,[WORK_ORDER_IDS]);
    await client.query('commit');
  }catch(error){
    await client.query('rollback');
    throw error;
  }
}
