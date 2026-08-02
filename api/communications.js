import {body,json,fail,method} from '../lib/http.js';
import {requireCronOrSession,requireSession} from '../lib/auth.js';
import {listCommunicationQueue,processCommunicationTransitions} from '../lib/communications.js';

export const maxDuration=60;

export default async function handler(req,res){
  try{
    method(req,['GET','POST']);
    if(req.method==='GET'){
      requireSession(req);
      const items=await listCommunicationQueue(req.query?.limit);
      res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
      json(res,200,{ok:true,items});
      return;
    }
    await requireCronOrSession(req);
    const payload=await body(req);
    const summary=await processCommunicationTransitions(String(payload?.trigger||'manual-communications'));
    res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
    json(res,200,{ok:true,summary});
  }catch(error){fail(res,error);}
}
