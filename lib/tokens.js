import {encrypt,decrypt} from './crypto.js';
import {getToken,upsertToken} from './db.js';
export async function saveProviderToken(provider,t){await upsertToken(provider,{access_token:encrypt(t.access_token||''),refresh_token:t.refresh_token?encrypt(t.refresh_token):'',expires_at:t.expires_at||null,metadata:t.metadata||{}});}
export async function loadProviderToken(provider){const t=await getToken(provider);if(!t)return null;return {...t,access_token:decrypt(t.access_token),refresh_token:decrypt(t.refresh_token)};}
