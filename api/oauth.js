import {requireSession} from '../lib/auth.js';
import {randomState,safeEqual,sign} from '../lib/crypto.js';
import {googleAuthUrl,googleExchange} from '../lib/google.js';
import {baseUrl,fail,method} from '../lib/http.js';
import {qboAuthUrl,qboExchange} from '../lib/qbo.js';
import {saveProviderToken} from '../lib/tokens.js';

const PROVIDERS=new Set(['google','quickbooks']);
const ACTIONS=new Set(['start','callback']);
function error(message,status=400){const e=new Error(message);e.status=status;return e;}
function cookieName(provider){return provider==='google'?'google_state':'qbo_state';}
function parseCookies(req){
  return Object.fromEntries(String(req.headers.cookie||'').split(';').map(x=>x.trim()).filter(Boolean).map(x=>{
    const i=x.indexOf('=');
    return i<0?[decodeURIComponent(x),'']:[decodeURIComponent(x.slice(0,i)),decodeURIComponent(x.slice(i+1))];
  }));
}
function verifyState(req,provider){
  const [state,sig]=String(parseCookies(req)[cookieName(provider)]||'').split('.');
  if(!state||!sig||!safeEqual(sig,sign(state))||state!==String(req.query?.state||''))throw error(`${provider==='google'?'Google':'QuickBooks'} OAuth state check failed`,401);
}
async function start(req,res,provider){
  requireSession(req);
  const state=randomState();
  res.setHeader('Set-Cookie',`${cookieName(provider)}=${state}.${sign(state)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
  return res.redirect(302,provider==='google'?googleAuthUrl(state):qboAuthUrl(state));
}
async function callback(req,res,provider){
  verifyState(req,provider);
  if(provider==='google'){
    const token=await googleExchange(req.query?.code);
    await saveProviderToken('google',token);
    return res.redirect(302,'/?connected=google');
  }
  const callbackUrl=new URL('/api/oauth/quickbooks/callback',baseUrl(req));
  for(const key of ['code','state','realmId'])if(req.query?.[key]!==undefined)callbackUrl.searchParams.set(key,String(req.query[key]));
  const token=await qboExchange(callbackUrl.toString());
  token.metadata={...(token.metadata||{}),realmId:req.query?.realmId};
  await saveProviderToken('quickbooks',token);
  return res.redirect(302,'/?connected=quickbooks');
}
export default async function handler(req,res){
  try{
    method(req,['GET']);
    const provider=String(req.query?.provider||'').toLowerCase();
    const action=String(req.query?.action||'').toLowerCase();
    if(!PROVIDERS.has(provider)||!ACTIONS.has(action))throw error('OAuth route not found',404);
    return action==='start'?await start(req,res,provider):await callback(req,res,provider);
  }catch(e){fail(res,e);}
}
