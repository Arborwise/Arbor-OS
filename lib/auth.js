import {safeEqual,sign} from './crypto.js';
const COOKIE='arborwise_session';
function parseCookies(req){return Object.fromEntries(String(req.headers.cookie||'').split(';').map(x=>x.trim()).filter(Boolean).map(x=>{const i=x.indexOf('=');return [decodeURIComponent(x.slice(0,i)),decodeURIComponent(x.slice(i+1))]}));}
export function makeSession(){const exp=Date.now()+1000*60*60*24*30;const payload=Buffer.from(JSON.stringify({exp})).toString('base64url');return `${payload}.${sign(payload)}`;}
export function validSession(req){const v=parseCookies(req)[COOKIE];if(!v)return false;const [p,s]=v.split('.');if(!p||!s||!safeEqual(s,sign(p)))return false;try{return JSON.parse(Buffer.from(p,'base64url')).exp>Date.now();}catch{return false;}}
export function setSession(res){res.setHeader('Set-Cookie',`${COOKIE}=${makeSession()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`);}
export function clearSession(res){res.setHeader('Set-Cookie',`${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);}
export function requireSession(req){if(!validSession(req)){const e=new Error('Login required');e.status=401;throw e;}}
export function requireCronOrSession(req){const bearer=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');if(process.env.CRON_SECRET&&safeEqual(bearer,process.env.CRON_SECRET))return;requireSession(req);}
