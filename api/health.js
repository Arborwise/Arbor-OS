import {json} from '../lib/http.js';
import {qboConfigured} from '../lib/qbo.js';
import {googleConfigured} from '../lib/google.js';

const qboClientId=String(process.env.QBO_CLIENT_ID||'');
export default async function handler(req,res){
  json(res,200,{
    ok:true,
    service:'Arborwise OS',
    databaseConfigured:Boolean(process.env.DATABASE_URL),
    quickbooksConfigured:qboConfigured(),
    quickbooksEnvironment:process.env.QBO_ENVIRONMENT||'production',
    quickbooksClientIdSuffix:qboClientId? qboClientId.slice(-8):null,
    quickbooksRedirectUri:'https://arborwise-os.vercel.app/api/oauth/quickbooks/callback',
    googleConfigured:googleConfigured()
  });
}
