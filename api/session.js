import {json,fail,method} from '../lib/http.js';
import {validSession} from '../lib/auth.js';

export default async function handler(req,res){
  try{
    method(req,['GET']);
    res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
    json(res,200,{ok:true,authenticated:validSession(req)});
  }catch(error){
    fail(res,error);
  }
}
