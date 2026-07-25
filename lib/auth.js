import {safeEqual,sign} from './crypto.js';
const COOKIE='arborwise_session';
function parseCookies(req){const result={};for(const part of String(req.headers.cookie||'').split(';')){const text=part.trim();if(!text)continue;const index=text.indexOf('=');if(index<=0)continue;try{result[decodeURIComponent(text.slice(0,index))]=decodeURIComponent(text.slice(index+1));}catch{}}return result;}
export function makeSession(){const expiresAt=Date.now()+1000*60*60*24*30;const payload=Buffer.from(JSON.stringify({exp:expiresAt})).toString('base64url');return `${payload}.${sign(payload)}`;}
export function validSession(req){const value=parseCookies(req)[COOKIE];if(!value)return false;const [payload,signature]=value.split('.');if(!payload||!signature||!safeEqual(signature,sign(payload)))return false;try{const decoded=JSON.parse(Buffer.from(payload,'base64url'));return Number(decoded.exp)>Date.now();}catch{return false;}}
export function setSession(res){res.setHeader('Set-Cookie',`${COOKIE}=${makeSession()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`);}
export function clearSession(res){res.setHeader('Set-Cookie',`${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);}
export function requireSession(req){if(!validSession(req)){const error=new Error('Login required');error.status=401;throw error;}}
export function requireCronOrSession(req){const bearer=String(req.headers.authorization||'').replace(/^Bearer\s+/i,'');if(process.env.CRON_SECRET&&safeEqual(bearer,process.env.CRON_SECRET))return;requireSession(req);}
