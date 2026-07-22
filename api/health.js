import {json} from '../lib/http.js';
import {qboAuthUrl,qboConfigured} from '../lib/qbo.js';
import {googleConfigured} from '../lib/google.js';

const EXPECTED_QBO_REDIRECT='https://arborwise-os.vercel.app/api/oauth/quickbooks/callback';
const qboClientId=String(process.env.QBO_CLIENT_ID||'');

export default async function handler(req,res){
  let authorizeRedirectUri=null;
  let authorizeClientIdSuffix=null;
  let authorizeUrlError=null;
  if(qboConfigured()){
    try{
      const authorizeUrl=new URL(qboAuthUrl('diagnostic-state'));
      authorizeRedirectUri=authorizeUrl.searchParams.get('redirect_uri');
      const authorizeClientId=authorizeUrl.searchParams.get('client_id')||'';
      authorizeClientIdSuffix=authorizeClientId?authorizeClientId.slice(-8):null;
    }catch(error){
      authorizeUrlError=String(error?.message||error);
    }
  }
  json(res,200,{
    ok:true,
    service:'Arborwise OS',
    databaseConfigured:Boolean(process.env.DATABASE_URL),
    quickbooksConfigured:qboConfigured(),
    quickbooksEnvironment:process.env.QBO_ENVIRONMENT||'production',
    quickbooksClientIdSuffix:qboClientId?qboClientId.slice(-8):null,
    quickbooksRedirectUri:EXPECTED_QBO_REDIRECT,
    quickbooksAuthorizeClientIdSuffix:authorizeClientIdSuffix,
    quickbooksAuthorizeRedirectUri:authorizeRedirectUri,
    quickbooksAuthorizeRedirectMatches:authorizeRedirectUri===EXPECTED_QBO_REDIRECT,
    quickbooksAuthorizeUrlError:authorizeUrlError,
    googleConfigured:googleConfigured()
  });
}
