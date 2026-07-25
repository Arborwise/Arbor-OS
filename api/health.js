import {json} from '../lib/http.js';
import {qboAuthUrl,qboConfigured,qboRedirectUri} from '../lib/qbo.js';
import {googleConfigured} from '../lib/google.js';

const qboClientId=String(process.env.QBO_CLIENT_ID||'').trim();

export default async function handler(req,res){
  let effectiveQuickBooksRedirect=null;
  let authorizeRedirectUri=null;
  let authorizeClientIdSuffix=null;
  let authorizeUrlError=null;
  try{effectiveQuickBooksRedirect=qboRedirectUri();}catch(error){authorizeUrlError=String(error?.message||error);}
  if(qboConfigured()&&!authorizeUrlError){
    try{
      const authorizeUrl=new URL(qboAuthUrl('diagnostic-state'));
      authorizeRedirectUri=authorizeUrl.searchParams.get('redirect_uri');
      const authorizeClientId=authorizeUrl.searchParams.get('client_id')||'';
      authorizeClientIdSuffix=authorizeClientId?authorizeClientId.slice(-8):null;
    }catch(error){authorizeUrlError=String(error?.message||error);}
  }
  json(res,200,{
    ok:true,
    service:'Arborwise OS',
    boardVersion:56,
    databaseConfigured:Boolean(process.env.DATABASE_URL),
    sessionConfigured:Boolean(process.env.APP_PIN&&process.env.SESSION_SECRET),
    encryptionConfigured:Boolean(process.env.ENCRYPTION_KEY),
    quickbooksConfigured:qboConfigured(),
    quickbooksEnvironment:String(process.env.QBO_ENVIRONMENT||'production').trim().toLowerCase(),
    quickbooksClientIdSuffix:qboClientId?qboClientId.slice(-8):null,
    quickbooksRedirectUri:effectiveQuickBooksRedirect,
    quickbooksRedirectSource:process.env.QBO_REDIRECT_URI?'QBO_REDIRECT_URI':'default',
    quickbooksAuthorizeClientIdSuffix:authorizeClientIdSuffix,
    quickbooksAuthorizeRedirectUri:authorizeRedirectUri,
    quickbooksAuthorizeRedirectMatches:authorizeRedirectUri===effectiveQuickBooksRedirect,
    quickbooksAuthorizeUrlError:authorizeUrlError,
    googleConfigured:googleConfigured(),
    googleSheetConfigured:Boolean(process.env.GOOGLE_SHEET_ID||'17XTUBhP7zC01qc6aNavMYCoFBEsnE9wUvmMmd-5lt1w')
  });
}
