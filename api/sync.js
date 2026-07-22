import {json,fail,method} from '../lib/http.js';
import {requireCronOrSession} from '../lib/auth.js';
import {runSync} from '../lib/sync.js';

export default async function handler(req,res){
  try{
    method(req,['GET','POST']);
    requireCronOrSession(req);
    const trigger=String(req.query?.scheduled||'').trim();
    const summary=await runSync(trigger?`scheduled:${trigger}`:'manual');
    json(res,200,{ok:true,summary,syncedAt:new Date().toISOString()});
  }catch(e){fail(res,e);}
}
