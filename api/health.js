import {json} from '../lib/http.js';
import {qboAuthUrl,qboConfigured,qboRedirectUri} from '../lib/qbo.js';
import {googleAuthUrl,googleConfigured,googleRedirectUri} from '../lib/google.js';

const qboClientId=String(process.env.QBO_CLIENT_ID||'').trim();

function oauthDiagnostics(configured,redirect,authorize){
  let redirectUri=null;
  let authorizeRedirectUri=null;
  let clientIdSuffix=null;
  let error=null;
  try{redirectUri=redirect();}
  catch(cause){error=String(cause?.message||cause);}
  if(configured&&!error){
    try{
      const url=new URL(authorize('diagnostic-state'));
      authorizeRedirectUri=url.searchParams.get('redirect_uri');
      const clientId=url.searchParams.get('client_id')||'';
      clientIdSuffix=clientId?clientId.slice(-8):null;
    }catch(cause){
      error=String(cause?.message||cause);
    }
  }
  return {
    redirectUri,
    authorizeRedirectUri,
    authorizeRedirectMatches:Boolean(redirectUri&&authorizeRedirectUri===redirectUri),
    authorizeClientIdSuffix:clientIdSuffix,
    authorizeUrlError:error
  };
}

export default async function handler(req,res){
  const quickbooks=oauthDiagnostics(qboConfigured(),qboRedirectUri,qboAuthUrl);
  const google=oauthDiagnostics(googleConfigured(),googleRedirectUri,googleAuthUrl);
  json(res,200,{
    ok:true,
    service:'Arborwise OS',
    boardVersion:58,
    databaseConfigured:Boolean(process.env.DATABASE_URL),
    sessionConfigured:Boolean(process.env.APP_PIN&&process.env.SESSION_SECRET),
    encryptionConfigured:Boolean(process.env.ENCRYPTION_KEY),
    quickbooksConfigured:qboConfigured(),
    quickbooksEnvironment:String(process.env.QBO_ENVIRONMENT||'production').trim().toLowerCase(),
    quickbooksClientIdSuffix:qboClientId?qboClientId.slice(-8):null,
    quickbooksRedirectSource:process.env.QBO_REDIRECT_URI?'QBO_REDIRECT_URI':'default',
    quickbooksRedirectUri:quickbooks.redirectUri,
    quickbooksAuthorizeClientIdSuffix:quickbooks.authorizeClientIdSuffix,
    quickbooksAuthorizeRedirectUri:quickbooks.authorizeRedirectUri,
    quickbooksAuthorizeRedirectMatches:quickbooks.authorizeRedirectMatches,
    quickbooksAuthorizeUrlError:quickbooks.authorizeUrlError,
    googleConfigured:googleConfigured(),
    googleSheetConfigured:Boolean(process.env.GOOGLE_SHEET_ID||'17XTUBhP7zC01qc6aNavMYCoFBEsnE9wUvmMmd-5lt1w'),
    googleRedirectSource:process.env.GOOGLE_REDIRECT_URI?'GOOGLE_REDIRECT_URI':'default',
    googleRedirectUri:google.redirectUri,
    googleAuthorizeClientIdSuffix:google.authorizeClientIdSuffix,
    googleAuthorizeRedirectUri:google.authorizeRedirectUri,
    googleAuthorizeRedirectMatches:google.authorizeRedirectMatches,
    googleAuthorizeUrlError:google.authorizeUrlError
  });
}
