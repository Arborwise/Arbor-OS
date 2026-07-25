import {json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {initDb,getToken} from '../lib/db.js';
import {qboConfigured} from '../lib/qbo.js';
import {googleConfigured} from '../lib/google.js';

export default async function handler(req,res){
  try{
    method(req,['GET']);
    requireSession(req);
    res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
    const database=Boolean(process.env.DATABASE_URL);
    let quickBooksToken=null,googleToken=null;
    if(database){await initDb();[quickBooksToken,googleToken]=await Promise.all([getToken('quickbooks'),getToken('google')]);}
    const quickBooksRealm=quickBooksToken?.metadata?.realmId||null;
    const quickBooksAuthorized=Boolean(quickBooksToken?.refresh_token&&quickBooksRealm);
    const googleAuthorized=Boolean(googleToken?.refresh_token||googleToken?.access_token);
    json(res,200,{ok:true,database,localMode:!database,
      quickbooks:{configured:qboConfigured(),authorized:quickBooksAuthorized,realmId:quickBooksRealm,updatedAt:quickBooksToken?.updated_at||null,connectUrl:qboConfigured()?'/api/oauth/quickbooks/start':null,missing:qboConfigured()?[]:['QBO_CLIENT_ID','QBO_CLIENT_SECRET']},
      google:{configured:googleConfigured(),authorized:googleAuthorized,email:googleToken?.metadata?.email||null,updatedAt:googleToken?.updated_at||null,connectUrl:googleConfigured()?'/api/oauth/google/start':null,missing:googleConfigured()?[]:['GOOGLE_CLIENT_SECRET']}
    });
  }catch(error){fail(res,error);}
}
