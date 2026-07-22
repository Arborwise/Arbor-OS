import crypto from 'node:crypto';
function key(){
  const raw=process.env.ENCRYPTION_KEY||'';
  const b=Buffer.from(raw,'base64');
  if(b.length!==32) throw new Error('ENCRYPTION_KEY must be a base64 32-byte key');
  return b;
}
export function encrypt(value){
  const iv=crypto.randomBytes(12); const cipher=crypto.createCipheriv('aes-256-gcm',key(),iv);
  const enc=Buffer.concat([cipher.update(String(value),'utf8'),cipher.final()]);
  return [iv.toString('base64'),cipher.getAuthTag().toString('base64'),enc.toString('base64')].join('.');
}
export function decrypt(value){
  if(!value) return ''; const [i,t,d]=value.split('.');
  const decipher=crypto.createDecipheriv('aes-256-gcm',key(),Buffer.from(i,'base64'));
  decipher.setAuthTag(Buffer.from(t,'base64'));
  return Buffer.concat([decipher.update(Buffer.from(d,'base64')),decipher.final()]).toString('utf8');
}
export function randomState(){return crypto.randomBytes(24).toString('base64url');}
export function sign(text){return crypto.createHmac('sha256',process.env.SESSION_SECRET||'').update(text).digest('base64url');}
export function safeEqual(a,b){const A=Buffer.from(String(a));const B=Buffer.from(String(b));return A.length===B.length&&crypto.timingSafeEqual(A,B);}
