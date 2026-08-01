import {db,initDb} from './db.js';

function clean(value=''){return String(value??'').trim();}
function money(value){const number=Number(value||0);return Number.isFinite(number)?number:0;}
function paidInvoiceNote(invoice){
  const reference=clean(invoice.DocNumber||invoice.Id);
  return reference?`QuickBooks invoice ${reference} paid in full`:'QuickBooks invoice paid in full';
}
function linkedEstimateIds(invoice){
  return [...new Set((invoice.LinkedTxn||[])
    .filter(link=>/estimate/i.test(clean(link?.TxnType)))
    .map(link=>clean(link?.TxnId))
    .filter(Boolean))];
}

export async function applyPaidInvoiceStatuses(){
  await initDb();
  const result=await db().query(
    `select id,raw
       from records
      where id like 'INV-%'
        and status='Paid'
        and raw is not null`
  );

  let paidInvoices=0;
  let linkedPaidInvoices=0;
  let recordsMarkedPaid=0;
  const unmatched=[];

  for(const row of result.rows){
    const invoice=row.raw||{};
    if(money(invoice.TotalAmt)<=0||money(invoice.Balance)>0||/void/i.test(clean(invoice.TxnStatus)))continue;
    paidInvoices++;

    const estimateIds=linkedEstimateIds(invoice);
    if(!estimateIds.length){
      unmatched.push(clean(invoice.DocNumber||invoice.Id||row.id));
      continue;
    }

    linkedPaidInvoices++;
    let invoiceMatched=false;
    for(const estimateId of estimateIds){
      const note=paidInvoiceNote(invoice);
      const paymentRaw=JSON.stringify({
        quickbooksPaidInvoice:{
          id:clean(invoice.Id),
          docNumber:clean(invoice.DocNumber),
          total:money(invoice.TotalAmt),
          balance:money(invoice.Balance),
          txnDate:clean(invoice.TxnDate),
          linkedEstimateId:estimateId
        }
      });
      const updated=await db().query(
        `update records
            set kind='job',
                status='Paid',
                closed=true,
                follow_up_date=null,
                notes=case
                  when coalesce(notes,'') ilike ('%'||$2||'%') then notes
                  else concat_ws(' • ',nullif(notes,''),$2)
                end,
                raw=coalesce(raw,'{}'::jsonb)||$3::jsonb,
                updated_at=now()
          where id not like 'INV-%'
            and (
              source_id=$1
              or raw->>'Id'=$1
              or raw->>'estimateId'=$1
            )`,
        [estimateId,note,paymentRaw]
      );
      if(updated.rowCount){
        invoiceMatched=true;
        recordsMarkedPaid+=updated.rowCount;
      }
    }
    if(!invoiceMatched)unmatched.push(clean(invoice.DocNumber||invoice.Id||row.id));
  }

  return {paidInvoices,linkedPaidInvoices,recordsMarkedPaid,unmatched};
}
