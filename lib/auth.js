import {createPublicKey,verify as verifySignature} from 'node:crypto';
import {safeEqual,sign} from './crypto.js';

const COOKIE='arborwise_session';
const GITHUB_OIDC_ISSUER='https://token.actions.githubusercontent.com';
const GITHUB_OIDC_AUDIENCE='arborwise-os';
const GITHUB_REPOSITORY='Arborwise/Arbor-OS';
const GITHUB_REF='refs/heads/main';
const ALLOWED_GITHUB_EVENTS=new Set(['schedule','workflow_dispatch','push']);
let cachedJwks=null;
let cachedJwksAt=0;

function parseCookies(req){
  const result={};
  for(const part of String(req.headers.cookie||'').split(';')){
    const text=part.trim();
    if(!text)continue;
    const index=text.indexOf('=');
    if(index<=0)continue;
    try{result[decodeURIComponent(text.slice(0,index))]=decodeURIComponent(text.slice(index+1));}catch{}
  }
  return result;
}
function decodeJwtPart(value){
  return JSON.parse(Buffer.from(String(value||''),'base64url').toString('utf8'));
}
function audienceMatches(audience){
  return Array.isArray(audience)?audience.includes(GITHUB_OIDC_AUDIENCE):audience===GITHUB_OIDC_AUDIENCE;
}
async function githubJwks(){
  if(cachedJwks&&Date.now()-cachedJwksAt<10*60*1000)return cachedJwks;
  const response=await fetch(`${GITHUB_OIDC_ISSUER}/.well-known/jwks`,{
    headers:{Accept:'application/json'},
    signal:AbortSignal.timeout(10000)
  });
  if(!response.ok)throw new Error(`GitHub OIDC keys request failed ${response.status}`);
  const payload=await response.json();
  if(!Array.isArray(payload.keys))throw new Error('GitHub OIDC keys response was invalid');
  cachedJwks=payload.keys;
  cachedJwksAt=Date.now();
  return cachedJwks;
}
async function validGithubActionsToken(token){
  try{
    const [encodedHeader,encodedPayload,encodedSignature,...rest]=String(token||'').split('.');
    if(rest.length||!encodedHeader||!encodedPayload||!encodedSignature)return false;
    const header=decodeJwtPart(encodedHeader);
    const claims=decodeJwtPart(encodedPayload);
    const now=Math.floor(Date.now()/1000);
    if(header.alg!=='RS256'||!header.kid)return false;
    if(claims.iss!==GITHUB_OIDC_ISSUER||!audienceMatches(claims.aud))return false;
    if(Number(claims.exp||0)<now-30||Number(claims.nbf||0)>now+30)return false;
    if(claims.repository!==GITHUB_REPOSITORY||claims.ref!==GITHUB_REF)return false;
    if(!ALLOWED_GITHUB_EVENTS.has(String(claims.event_name||'')))return false;
    if(String(claims.repository_owner||'').toLowerCase()!=='arborwise')return false;
    const keys=await githubJwks();
    const jwk=keys.find(item=>item.kid===header.kid);
    if(!jwk)return false;
    const key=createPublicKey({key:jwk,format:'jwk'});
    return verifySignature(
      'RSA-SHA256',
      Buffer.from(`${encodedHeader}.${encodedPayload}`),
      key,
      Buffer.from(encodedSignature,'base64url')
    );
  }catch{return false;}
}

export function makeSession(){
  const expiresAt=Date.now()+1000*60*60*24*30;
  const payload=Buffer.from(JSON.stringify({exp:expiresAt})).toString('base64url');
  return `${payload}.${sign(payload)}`;
}
export function validSession(req){
  const value=parseCookies(req)[COOKIE];
  if(!value)return false;
  const [payload,signature]=value.split('.');
  if(!payload||!signature||!safeEqual(signature,sign(payload)))return false;
  try{
    const decoded=JSON.parse(Buffer.from(payload,'base64url'));
    return Number(decoded.exp)>Date.now();
  }catch{return false;}
}
export function setSession(res){res.setHeader('Set-Cookie',`${COOKIE}=${makeSession()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`);}
export function clearSession(res){res.setHeader('Set-Cookie',`${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);}
export function requireSession(req){
  if(!validSession(req)){
    const error=new Error('Login required');
    error.status=401;
    throw error;
  }
}
export async function requireCronOrSession(req){
  const bearer=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
  if(process.env.CRON_SECRET&&safeEqual(bearer,process.env.CRON_SECRET))return;
  if(bearer&&await validGithubActionsToken(bearer))return;
  requireSession(req);
}
