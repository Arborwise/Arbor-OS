'use strict';
(() => {
  const VERSION='72';
  const main=document.getElementById('main');
  const veil=document.getElementById('veil');
  const sheet=document.getElementById('sheet');
  const toastEl=document.getElementById('toast');
  if(!main||!veil||!sheet||!toastEl)return;

  const style=document.createElement('style');
  style.id=`arborwise-owner-edit-${VERSION}`;
  style.textContent=`
    .ownerEditButton{display:flex;align-items:center;justify-content:center;width:100%;min-height:45px;margin-top:10px;border:0;border-radius:11px;background:#17402b;color:#fff;font-weight:950;letter-spacing:.04em;box-shadow:0 2px 6px rgba(23,64,43,.18)}
    .ownerEditButton:active{transform:scale(.98)}
    .ownerAccessNote{font-size:12px;color:#285f3d;margin-top:8px;font-weight:850}
    .ownerSource{font-size:12px;color:#687068;margin:0 0 12px;line-height:1.4}
    .ownerCurrentNotes{margin:0 0 12px;padding:10px 11px;border-radius:10px;background:#ecebe3;color:#4d574f;font-size:12px;line-height:1.4}
    .ownerSaveStatus{min-height:20px;margin-top:8px;color:#17402b;font-size:13px;font-weight:850}
    .invoiceChoice72{margin:4px 0 13px;padding:13px;border:2px solid #78927a;border-radius:13px;background:#e1e8de;color:#263d2c;line-height:1.45}
    .invoiceChoice72 strong{display:block;margin-bottom:5px;font-size:17px}
    .invoiceFact72{margin:9px 0;padding:10px;border-radius:10px;background:#fff;font-size:13px;line-height:1.4}
    .invoiceWarning72{background:#fff0d7;color:#704100;border:1px solid #d7a442}
    .invoiceAction72{display:flex;align-items:center;justify-content:center;min-height:48px;border:0;border-radius:11px;padding:11px;font-weight:950;text-decoration:none}
    .invoiceAction72.primary{background:#17402b;color:#fff}
    .invoiceAction72.orange{background:#e4590c;color:#fff}
    .invoiceAction72.secondary{background:#dfded6;color:#18231c}
    .invoiceButtons72{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:13px}
    .invoiceButtons72.one{grid-template-columns:1fr}
  `;
  if(!document.getElementById(style.id))document.head.appendChild(style);

  function esc(value=''){
    return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function money(value){return Number(value)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value)):'';}
  function toast(message){
    toastEl.textContent=message;
    toastEl.hidden=false;
    clearTimeout(toast._timer);
    toast._timer=setTimeout(()=>{toastEl.hidden=true;},5200);
  }
  function close(){veil.hidden=true;sheet.innerHTML='';}
  function finish(){location.reload();}
  function records(){return window.ARBORWISE_CURRENT_OPERATIONS?.records||[];}
  function findRecord(id){return records().find(record=>String(record.id||'').trim()===String(id||'').trim());}
  function field(id,label,value='',type='text'){
    return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${esc(value)}"></div>`;
  }
  function statusOptions(current,type){
    const common=type==='est'
      ? ['Open','Estimate Sent','Follow Up','Approved','Scheduling','Scheduled','Hold','Declined','Cancelled','Completed']
      : ['Open','Scheduling','Scheduled','In Progress','Hold','Completed','Cancelled'];
    const values=[...new Set([current||'Open',...common])];
    return values.map(value=>`<option value="${esc(value)}" ${value===current?'selected':''}>${esc(value)}</option>`).join('');
  }
  async function request(path,payload){
    const response=await fetch(path,{
      method:'POST',credentials:'same-origin',cache:'no-store',
      headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(data.error||`Request failed ${response.status}`);
    return data;
  }
  function openQbo(url){
    if(url)window.open(url,'_blank','noopener');
    else window.open('https://app.qbo.intuit.com/app/invoices','_blank','noopener');
  }

  function showInvoiceProblem(record,error){
    sheet.innerHTML=`
      <h2>Job completed</h2>
      <div class="invoiceChoice72 invoiceWarning72"><strong>QuickBooks review needed</strong>${esc(error.message||'The invoice could not be created automatically.')}</div>
      <p class="ownerSource"><strong>${esc(record.id)}</strong> • ${esc(record.name||'')}</p>
      <div class="invoiceButtons72"><button class="invoiceAction72 secondary" id="invoiceFinish" type="button">CLOSE & REFRESH</button><button class="invoiceAction72 primary" id="invoiceOpenQbo" type="button">OPEN QUICKBOOKS</button></div>`;
    document.getElementById('invoiceFinish').onclick=finish;
    document.getElementById('invoiceOpenQbo').onclick=()=>openQbo();
  }

  function showSent(record,data){
    sheet.innerHTML=`
      <h2>Invoice sent</h2>
      <div class="invoiceChoice72"><strong>✓ SENT</strong>Invoice ${esc(data.reference||'')} was sent to ${esc(data.email||'the customer')}.</div>
      <p class="ownerSource"><strong>${esc(record.id)}</strong> • ${esc(record.name||'')}</p>
      <div class="invoiceButtons72"><button class="invoiceAction72 secondary" id="invoiceFinish" type="button">CLOSE & REFRESH</button><button class="invoiceAction72 primary" id="invoiceOpenQbo" type="button">OPEN IN QUICKBOOKS</button></div>`;
    document.getElementById('invoiceFinish').onclick=finish;
    document.getElementById('invoiceOpenQbo').onclick=()=>openQbo(data.url);
  }

  function confirmSend(record,data){
    sheet.innerHTML=`
      <h2>Send invoice?</h2>
      <div class="invoiceChoice72"><strong>Final confirmation</strong>Send invoice ${esc(data.reference||'')} for ${esc(money(data.total)||'the completed work')} to <strong>${esc(data.email)}</strong>?</div>
      <p class="ownerSource">Nothing is sent until you tap <strong>SEND NOW</strong>.</p>
      <div id="ownerSaveStatus" class="ownerSaveStatus" aria-live="polite"></div>
      <div class="invoiceButtons72"><button class="invoiceAction72 secondary" id="invoiceBack" type="button">BACK</button><button class="invoiceAction72 orange" id="invoiceSendNow" type="button">SEND NOW</button></div>`;
    document.getElementById('invoiceBack').onclick=()=>showInvoiceReady(record,data);
    document.getElementById('invoiceSendNow').onclick=async()=>{
      const button=document.getElementById('invoiceSendNow');
      const message=document.getElementById('ownerSaveStatus');
      button.disabled=true;
      message.textContent='Sending through QuickBooks...';
      try{
        const sent=await request('/api/invoice-draft',{
          action:'send',invoiceId:data.invoiceId,reference:data.reference,
          customer:data.customer||record.name,email:data.email
        });
        toast(`Invoice ${sent.reference||''} sent`);
        showSent(record,sent);
      }catch(error){message.textContent=error.message;button.disabled=false;}
    };
  }

  function showInvoiceReady(record,data){
    const email=data.email||record.email||'';
    sheet.innerHTML=`
      <h2>Invoice ready</h2>
      <div class="invoiceChoice72"><strong>✓ IN QUICKBOOKS — NOT SENT</strong>${esc(data.message||'The invoice is ready for review.')}</div>
      <div class="invoiceFact72"><strong>${esc(data.customer||record.name||'Customer')}</strong><br>Invoice ${esc(data.reference||'')} ${money(data.total)?`• ${esc(money(data.total))}`:''}${email?`<br>${esc(email)}`:''}</div>
      ${email?'':'<div class="invoiceFact72 invoiceWarning72">No customer email is available on this record, so Arborwise OS will not offer to send it.</div>'}
      <div class="invoiceButtons72 ${email?'':'one'}"><button class="invoiceAction72 primary" id="invoiceOpenQbo" type="button">REVIEW IN QUICKBOOKS</button>${email?'<button class="invoiceAction72 orange" id="invoiceSend" type="button">SEND INVOICE</button>':''}</div>
      <div class="invoiceButtons72 one"><button class="invoiceAction72 secondary" id="invoiceFinish" type="button">CLOSE & REFRESH</button></div>`;
    document.getElementById('invoiceOpenQbo').onclick=()=>openQbo(data.url);
    document.getElementById('invoiceFinish').onclick=finish;
    if(email)document.getElementById('invoiceSend').onclick=()=>confirmSend(record,{...data,email});
  }

  function showCompletionChoice(record){
    sheet.innerHTML=`
      <h2>Job completed</h2>
      <div class="invoiceChoice72"><strong>✓ ${esc(record.name||'Job')} is marked completed</strong>Would you like me to put this invoice in QuickBooks for your review and sending?</div>
      <p class="ownerSource">Arborwise OS will match the job to its QuickBooks estimate, copy the approved line items, check for an existing invoice, and create a draft. It will not send anything yet.</p>
      <div id="ownerSaveStatus" class="ownerSaveStatus" aria-live="polite"></div>
      <div class="invoiceButtons72"><button class="invoiceAction72 secondary" id="invoiceLater" type="button">NOT NOW</button><button class="invoiceAction72 primary" id="invoiceCreate" type="button">CREATE FOR REVIEW</button></div>`;
    document.getElementById('invoiceLater').onclick=finish;
    document.getElementById('invoiceCreate').onclick=async()=>{
      const button=document.getElementById('invoiceCreate');
      const message=document.getElementById('ownerSaveStatus');
      button.disabled=true;
      message.textContent='Matching the job to QuickBooks and checking for duplicates...';
      try{
        const data=await request('/api/invoice-draft',{
          action:'create',id:record.id,name:record.name,email:record.email,
          amount:record.amount,service:record.service
        });
        toast(data.existing?'Existing QuickBooks invoice found':'QuickBooks invoice created for review');
        showInvoiceReady(record,data);
      }catch(error){showInvoiceProblem(record,error);}
    };
  }

  function openEditor(record){
    const source=record.source||'Google Sheets';
    const estimateSource=/estimates/i.test(source);
    const notesBlock=estimateSource
      ? `${record.notes?`<div class="ownerCurrentNotes"><strong>CURRENT RECORD NOTES</strong><br>${esc(record.notes)}</div>`:''}<div class="field"><label for="ownerNotes">Add internal note</label><textarea id="ownerNotes" placeholder="Add a new internal note without replacing the existing record"></textarea></div>`
      : `<div class="field"><label for="ownerNotes">Notes</label><textarea id="ownerNotes">${esc(record.notes||'')}</textarea></div>`;
    sheet.innerHTML=`
      <h2>Edit ${record.type==='est'?'estimate':'job'}</h2>
      <p class="ownerSource"><strong>${esc(record.id)}</strong> • ${esc(record.name||'')}<br>Changes save directly to ${esc(source)}.</p>
      <div class="field"><label for="ownerStatus">Status</label><select id="ownerStatus">${statusOptions(record.status,record.type)}</select></div>
      <div class="row">${field('ownerDate','Scheduled date',record.workDate||'','date')}${field('ownerTime','Arrival window',record.workTime||'')}</div>
      ${field('ownerCrew','Crew or assigned to',record.who==='Unassigned'?'':record.who||'')}
      ${notesBlock}
      <div id="ownerSaveStatus" class="ownerSaveStatus" aria-live="polite"></div>
      <div class="buttons"><button class="secondary" id="ownerCancel" type="button">CANCEL</button><button class="primary" id="ownerSave" type="button">SAVE TO ARBORWISE</button></div>`;
    veil.hidden=false;
    document.getElementById('ownerCancel').onclick=close;
    document.getElementById('ownerSave').onclick=async()=>{
      const save=document.getElementById('ownerSave');
      const message=document.getElementById('ownerSaveStatus');
      const selectedStatus=document.getElementById('ownerStatus').value;
      const newlyCompleted=record.type==='job'&&selectedStatus==='Completed'&&String(record.status||'')!=='Completed';
      save.disabled=true;
      message.textContent='Saving to the live Arborwise sheet...';
      try{
        const response=await fetch('/api/owner-edit',{
          method:'PATCH',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:record.id,type:record.type,source:record.source,status:selectedStatus,
            date:document.getElementById('ownerDate').value,
            time:document.getElementById('ownerTime').value.trim(),
            who:document.getElementById('ownerCrew').value.trim(),
            notes:document.getElementById('ownerNotes').value.trim(),appendNotes:estimateSource
          })
        });
        const data=await response.json().catch(()=>({}));
        if(!response.ok)throw new Error(data.error||`Save failed ${response.status}`);
        toast(`${record.id} saved to ${data.tab}`);
        if(newlyCompleted)showCompletionChoice({...record,status:'Completed'});
        else{message.textContent=`Saved to ${data.tab}. Reloading the live board...`;setTimeout(finish,650);}
      }catch(error){message.textContent=error.message||'Could not save this record.';save.disabled=false;}
    };
  }

  function improveCard(card){
    if(card.dataset.ownerEdit===VERSION)return;
    const id=card.querySelector('.recordId')?.textContent?.trim();
    const record=findRecord(id);
    if(!record)return;
    card.dataset.ownerEdit=VERSION;
    const oldNote=card.querySelector('.readonlyNote');
    const button=document.createElement('button');
    button.type='button';
    button.className='ownerEditButton';
    button.textContent=`EDIT ${record.type==='est'?'ESTIMATE':'JOB'}`;
    button.onclick=event=>{event.preventDefault();event.stopPropagation();openEditor(record);};
    if(oldNote){
      oldNote.classList.add('ownerAccessNote');
      oldNote.textContent=`OWNER ACCESS • Source: ${record.source||'Google Sheets'}`;
      oldNote.before(button);
    }else card.appendChild(button);
  }
  function improve(){main.querySelectorAll('.card').forEach(improveCard);}

  veil.addEventListener('click',event=>{if(event.target===veil)close();});
  const observer=new MutationObserver(improve);
  observer.observe(main,{childList:true,subtree:true});
  window.addEventListener('arborwise:data-ready',()=>setTimeout(improve,0));
  improve();
  window.ARBORWISE_OWNER_EDIT_VERSION=VERSION;
})();