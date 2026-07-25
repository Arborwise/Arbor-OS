import crypto from 'node:crypto';
function encryptionKey(){const raw=String(process.env.ENCRYPTION_KEY||'').trim();const key=Buffer.from(raw,'base64');if(key.length!==32)throw new Error('ENCRYPTION_KEY must be a base64 32-byte key');return key;}
function sessionSecret(){const secret=String(process.env.SESSION_SECRET||'');if(secret.length<32)throw new Error('SESSION_SECRET must be at least 32 characters');return secret;}
export function encrypt(value){const iv=crypto.randomBytes(12);const cipher=crypto.createCipheriv('aes-256-gcm',encryptionKey(),iv);const encrypted=Buffer.concat([cipher.update(String(value),'utf8'),cipher.final()]);return [iv.toString('base64'),cipher.getAuthTag().toString('base64'),encrypted.toString('base64')].join('.');}
export function decrypt(value){if(!value)return '';const parts=String(value).split('.');if(parts.length!==3)throw new Error('Encrypted token format is invalid');const [iv,tag,data]=parts;const decipher=crypto.createDecipheriv('aes-256-gcm',encryptionKey(),Buffer.from(iv,'base64'));decipher.setAuthTag(Buffer.from(tag,'base64'));return Buffer.concat([decipher.update(Buffer.from(data,'base64')),decipher.final()]).toString('utf8');}
export function randomState(){return crypto.randomBytes(24).toString('base64url');}
export function sign(text){return crypto.createHmac('sha256',sessionSecret()).update(String(text)).digest('base64url');}
export function safeEqual(a,b){const left=Buffer.from(String(a));const right=Buffer.from(String(b));return left.length===right.length&&crypto.timingSafeEqual(left,right);}
