import {body,json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {qboCompanyRequest,qboQuery} from '../lib/qbo.js';

function clean(value){return String(value??'').trim();}
function invoiceLink(id){return `https://app.qbo.intuit.com/app/invoice?txnId=${encodeURIComponent(id)}`;}
function estimateNumber(value){return clean(value).replace(/^WO[-\s]*/i,'');}
function validReference(value){return /^[A-Za-z0-9-]{1,40}$/.test(value);}
function salesLines(estimate){
  return (estimate.Line||[])
    .filter(line=>line?.DetailType==='SalesItemLineDetail'&&line?.SalesItemLineDetail?.ItemRef?.value&&Number(line.Amount)>=0)
    .map(line=>{
      const detail=line.SalesItemLineDetail||{};
      const salesDetail={ItemRef:detail.ItemRef};
      if(detail.Qty!==undefined)salesDetail.Qty=detail.Qty;
      if(detail.UnitPrice!==undefined)salesDetail.UnitPrice=detail.UnitPrice;
      if(detail.TaxCodeRef)salesDetail.TaxCodeRef=detail.TaxCodeRef;
      if(detail.ServiceDate)salesDetail.ServiceDate=detail.ServiceDate;
      return {
        DetailType:'SalesItemLineDetail',
        Amount:Number(line.Amount)||0,
        Description:clean(line.Description),
        SalesItemLineDetail:salesDetail
      };
    });
}
function linkedToEstimate(invoice,estimateId,recordId){
  const linked=(invoice.LinkedTxn||[]).some(item=>String(item.TxnId||'')===String(estimateId||'')&&String(item.TxnType||'').toLowerCase()==='estimate');
  const note=clean(invoice.PrivateNote).toLowerCase();
  return linked||note.includes(`completed job ${clean(recordId).toLowerCase()}`);
}
async function locateEstimate(reference){
  const response=await qboQuery(`select * from Estimate where DocNumber = '${reference}' maxresults 1`);
  return (response.Estimate||[])[0]||null;
}
async function locateExistingInvoice(estimate,recordId){
  const customerId=estimate?.CustomerRef?.value;
  if(!customerId)return null;
  const response=await qboQuery(`select * from Invoice where CustomerRef = '${customerId}' maxresults 1000`);
  return (response.Invoice||[]).find(invoice=>linkedToEstimate(invoice,estimate.Id,recordId))||null;
}
async function createInvoice(payload){
  const recordId=clean(payload.id);
  const reference=estimateNumber(payload.estimateNumber||recordId);
  if(!recordId){const error=new Error('The completed job ID is required');error.status=400;throw error;}
  if(!validReference(reference)){
    const error=new Error('This job does not have a QuickBooks estimate number that Arborwise OS can safely match. Review it in QuickBooks.');
    error.status=409;
    throw error;
  }

  const estimate=await locateEstimate(reference);
  if(!estimate){
    const error=new Error(`No QuickBooks estimate ${reference} was found. The job is completed, but the invoice must be reviewed in QuickBooks before creation.`);
    error.status=409;
    throw error;
  }

  const existing=await locateExistingInvoice(estimate,recordId);
  if(existing){
    const email=clean(existing.BillEmail?.Address||estimate.BillEmail?.Address||payload.email);
    return {
      created:false,
      existing:true,
      invoiceId:String(existing.Id),
      reference:String(existing.DocNumber||existing.Id),
      customer:clean(existing.CustomerRef?.name||estimate.CustomerRef?.name||payload.name),
      email,
      total:Number(existing.TotalAmt)||0,
      url:invoiceLink(existing.Id),
      message:'A linked QuickBooks invoice already exists. Review it before sending.'
    };
  }

  const lines=salesLines(estimate);
  if(!lines.length){
    const error=new Error(`QuickBooks estimate ${reference} has no invoice-ready service lines. Review it in QuickBooks.`);
    error.status=409;
    throw error;
  }

  const invoice={
    CustomerRef:estimate.CustomerRef,
    Line:lines,
    TxnDate:new Date().toISOString().slice(0,10),
    LinkedTxn:[{TxnId:String(estimate.Id),TxnType:'Estimate'}],
    PrivateNote:`Created by Arborwise OS after completed job ${recordId}. Review before sending.`
  };
  if(estimate.BillEmail)invoice.BillEmail=estimate.BillEmail;
  if(estimate.BillAddr)invoice.BillAddr=estimate.BillAddr;
  if(estimate.ShipAddr)invoice.ShipAddr=estimate.ShipAddr;
  if(estimate.CustomerMemo)invoice.CustomerMemo=estimate.CustomerMemo;

  const response=await qboCompanyRequest('invoice',{method:'POST',body:invoice});
  const created=response.Invoice;
  if(!created?.Id)throw new Error('QuickBooks did not return the new invoice ID');
  const email=clean(created.BillEmail?.Address||estimate.BillEmail?.Address||payload.email);
  return {
    created:true,
    existing:false,
    invoiceId:String(created.Id),
    reference:String(created.DocNumber||created.Id),
    customer:clean(created.CustomerRef?.name||estimate.CustomerRef?.name||payload.name),
    email,
    total:Number(created.TotalAmt)||Number(estimate.TotalAmt)||0,
    url:invoiceLink(created.Id),
    message:'Invoice created in QuickBooks for review. It has not been sent.'
  };
}
async function sendInvoice(payload){
  const invoiceId=clean(payload.invoiceId);
  const email=clean(payload.email);
  const customer=clean(payload.customer);
  if(!invoiceId){const error=new Error('Invoice ID is required');error.status=400;throw error;}
  if(!/^\S+@\S+\.\S+$/.test(email)){
    const error=new Error('A valid customer email is required before sending this invoice.');
    error.status=409;
    throw error;
  }
  const response=await qboCompanyRequest(`invoice/${encodeURIComponent(invoiceId)}/send?sendTo=${encodeURIComponent(email)}`,{method:'POST'});
  const sent=response.Invoice||{};
  return {
    sent:true,
    invoiceId,
    reference:String(sent.DocNumber||payload.reference||invoiceId),
    customer:customer||clean(sent.CustomerRef?.name),
    email,
    url:invoiceLink(invoiceId),
    message:`Invoice sent to ${email}.`
  };
}

export default async function handler(req,res){
  try{
    method(req,['POST']);
    requireSession(req);
    const payload=await body(req);
    const action=clean(payload.action||'create').toLowerCase();
    const result=action==='send'?await sendInvoice(payload):await createInvoice(payload);
    res.setHeader('Cache-Control','private, no-store, max-age=0, must-revalidate');
    json(res,200,{ok:true,...result});
  }catch(error){fail(res,error);}
}