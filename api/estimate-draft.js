import {google} from 'googleapis';
import {body,json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {googleClient} from '../lib/google.js';

const SHEET_ID=process.env.GOOGLE_SHEET_ID||'17XTUBhP7zC01qc6aNavMYCoFBEsnE9wUvmMmd-5lt1w';
const TAB='Master Estimates';
const TIME_ZONE='America/Chicago';

function clean(value,max=10000){return String(value??'').trim().slice(0,max);}
function centralParts(date=new Date()){
  const parts=new Intl.DateTimeFormat('en-US',{
    timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false
  }).formatToParts(date);
  return Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
}
function draftId(){
  const p=centralParts();
  return `VOICE-${p.year}${p.month}${p.day}-${p.hour}${p.minute}${p.second}`;
}
function addedDate(){
  const p=centralParts();
  return `${Number(p.month)}/${Number(p.day)}/${p.year}`;
}
function moneyText(value){
  const amount=Number(String(value??'').replace(/[$,]/g,''));
  return Number.isFinite(amount)&&amount>0?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(amount):'';
}

export default async function handler(req,res){
  try{
    method(req,['POST']);
    requireSession(req);
    const payload=await body(req);
    const customer=clean(payload.customer,160);
    const scope=clean(payload.scope,12000);
    if(!customer){const error=new Error('Customer name is required');error.status=400;throw error;}
    if(!scope){const error=new Error('Estimate scope is required');error.status=400;throw error;}

    const id=draftId();
    const price=moneyText(payload.price);
    const service=clean(payload.service,300)||'Personalized Tree Care';
    const exclusions=clean(payload.exclusions,3000);
    const notes=clean(payload.notes,4000);
    const raw=clean(payload.rawDictation,12000);
    const guide=clean(payload.guide,500);
    const combinedScope=[scope,exclusions?`Exclusions / Clarifications:\n${exclusions}`:''].filter(Boolean).join('\n\n');
    const estimatorNotes=[
      'Created from Brandon field dictation. Draft only — review every detail before creating or sending a QuickBooks estimate.',
      price?`Dictated price: ${price}.`:'Price still needs confirmation.',
      guide?`Recommended Arborwise educational guide: ${guide}.`:'',
      notes
    ].filter(Boolean).join(' ');

    const row=[
      id,
      customer,
      clean(payload.address,300),
      clean(payload.city,120),
      clean(payload.state,40)||'TX',
      clean(payload.zip,20),
      clean(payload.phone,80),
      clean(payload.email,180),
      service,
      combinedScope,
      '',
      '',
      '',
      '',
      'Review dictated scope, confirm price, then create a Pending QuickBooks estimate.',
      'Brandon',
      'Review Required',
      'Draft — Review Required',
      '',
      '',
      'No',
      'Voice Dictation',
      estimatorNotes,
      'TRUE',
      raw,
      '',
      addedDate()
    ];

    const auth=await googleClient();
    const sheets=google.sheets({version:'v4',auth});
    await sheets.spreadsheets.values.append({
      spreadsheetId:SHEET_ID,
      range:`'${TAB}'!A:AA`,
      valueInputOption:'USER_ENTERED',
      insertDataOption:'INSERT_ROWS',
      requestBody:{values:[row]}
    });

    json(res,201,{ok:true,draft:{id,customer,service,price,status:'Draft — Review Required'}});
  }catch(error){fail(res,error);}
}
