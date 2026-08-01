import {json,fail,method} from '../lib/http.js';
import {requireCronOrSession} from '../lib/auth.js';
import {runSync} from '../lib/sync.js';
import {applyPaidInvoiceStatuses} from '../lib/paid-invoices.js';

export const maxDuration=60;

export default async function handler(req,res){
  try{
    method(req,['GET','POST']);
    await requireCronOrSession(req);
    const trigger=String(req.query?.scheduled||'').trim();
    const summary=await runSync(trigger?`scheduled:${trigger}`:'manual');

    if(summary.quickbooks?.status==='success'){
      try{
        const paid=await applyPaidInvoiceStatuses();
        summary.quickbooks={...summary.quickbooks,paidCheck:{status:'success',...paid}};
      }catch(error){
        summary.quickbooks={...summary.quickbooks,paidCheck:{status:'error',error:error.message}};
      }
    }else{
      summary.quickbooks={...summary.quickbooks,paidCheck:{status:'skipped'}};
    }

    json(res,200,{ok:true,summary,syncedAt:new Date().toISOString()});
  }catch(e){fail(res,e);}
}
