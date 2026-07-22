import {json,fail} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {initDb,getToken} from '../lib/db.js';
import {qboConfigured} from '../lib/qbo.js';
import {googleConfigured} from '../lib/google.js';

export default async function handler(req,res){
  try{
    requireSession(req);
    await initDb();
    const [qbo,google]=await Promise.all([getToken('quickbooks'),getToken('google')]);
    json(res,200,{
      ok:true,
      quickbooks:{
        configured:qboConfigured(),
        authorized:Boolean(qbo),
        realmId:qbo?.metadata?.realmId||null,
        updatedAt:qbo?.updated_at||null,
        connectUrl:qboConfigured()?'/api/oauth/quickbooks/start':null,
        missing:qboConfigured()?[]:['QBO_CLIENT_ID','QBO_CLIENT_SECRET']
      },
      google:{
        configured:googleConfigured(),
        authorized:Boolean(google),
        email:google?.metadata?.email||null,
        updatedAt:google?.updated_at||null,
        connectUrl:googleConfigured()?'/api/oauth/google/start':null,
        missing:googleConfigured()?[]:['GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET']
      }
    });
  }catch(e){fail(res,e);}
}
