import OAuthClient from 'intuit-oauth';
import {loadProviderToken,saveProviderToken} from './tokens.js';

export function qboConfigured(){
  return Boolean(process.env.QBO_CLIENT_ID&&process.env.QBO_CLIENT_SECRET);
}
function redirectUri(){
  return process.env.QBO_REDIRECT_URI||`${process.env.APP_URL||''}/api/oauth/quickbooks/callback`;
}
function assertConfigured(){
  if(!qboConfigured()){
    const e=new Error('QuickBooks needs QBO_CLIENT_ID and QBO_CLIENT_SECRET in Vercel Environment Variables');
    e.status=409;throw e;
  }
  if(!redirectUri().startsWith('https://')){
    const e=new Error('QuickBooks redirect URL is not configured');e.status=409;throw e;
  }
}
function client(){
  assertConfigured();
  return new OAuthClient({
    clientId:process.env.QBO_CLIENT_ID,
    clientSecret:process.env.QBO_CLIENT_SECRET,
    environment:process.env.QBO_ENVIRONMENT||'production',
    redirectUri:redirectUri()
  });
}
export function qboAuthUrl(state){return client().authorizeUri({scope:[OAuthClient.scopes.Accounting],state});}
export async function qboExchange(url){const c=client();const response=await c.createToken(url);return normalize(response.getJson());}
function normalize(j,metadata={}){return {access_token:j.access_token,refresh_token:j.refresh_token,expires_at:new Date(Date.now()+(Number(j.expires_in)||3600)*1000),metadata:{...metadata,x_refresh_token_expires_in:j.x_refresh_token_expires_in}};}
export async function qboAccess(){
  assertConfigured();
  const stored=await loadProviderToken('quickbooks');
  if(!stored){const e=new Error('QuickBooks is not authorized yet. Open Connections and tap Connect QuickBooks.');e.status=409;throw e;}
  let access=stored.access_token;
  const expires=stored.expires_at?new Date(stored.expires_at).getTime():0;
  if(expires<Date.now()+120000){
    const c=client();const r=await c.refreshUsingToken(stored.refresh_token);
    const n=normalize(r.getJson(),stored.metadata||{});await saveProviderToken('quickbooks',n);access=n.access_token;
  }
  return {access,realmId:stored.metadata?.realmId};
}
export async function qboQuery(query){
  const {access,realmId}=await qboAccess();
  if(!realmId)throw new Error('QuickBooks company ID is missing. Reconnect QuickBooks.');
  const sandbox=(process.env.QBO_ENVIRONMENT||'production')==='sandbox';
  const host=sandbox?'https://sandbox-quickbooks.api.intuit.com':'https://quickbooks.api.intuit.com';
  const url=`${host}/v3/company/${encodeURIComponent(realmId)}/query?query=${encodeURIComponent(query)}&minorversion=75`;
  const r=await fetch(url,{headers:{Authorization:`Bearer ${access}`,Accept:'application/json'}});
  const text=await r.text();
  if(!r.ok)throw new Error(`QuickBooks ${r.status}: ${text.slice(0,500)}`);
  return JSON.parse(text).QueryResponse||{};
}
export async function qboSyncData(){
  const since=new Date(Date.now()-1000*60*60*24*180).toISOString().slice(0,10);
  const estimates=await qboQuery(`select * from Estimate where TxnDate >= '${since}' maxresults 1000`);
  const invoices=await qboQuery(`select * from Invoice where Balance > '0' maxresults 1000`);
  return {estimates:estimates.Estimate||[],invoices:invoices.Invoice||[]};
}
