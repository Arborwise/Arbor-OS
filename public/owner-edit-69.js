'use strict';
(() => {
  const VERSION='69';
  const main=document.getElementById('main');
  const veil=document.getElementById('veil');
  const sheet=document.getElementById('sheet');
  const toastEl=document.getElementById('toast');
  if(!main||!veil||!sheet||!toastEl)return;

  const style=document.createElement('style');
  style.id=`arborwise-owner-edit-${VERSION}`;
  style.textContent=`
    .ownerEditButton{
      display:flex;
      align-items:center;
      justify-content:center;
      width:100%;
      min-height:45px;
      margin-top:10px;
      border:0;
      border-radius:11px;
      background:#17402b;
      color:#fff;
      font-weight:950;
      letter-spacing:.04em;
      box-shadow:0 2px 6px rgba(23,64,43,.18);
    }
    .ownerEditButton:active{transform:scale(.98)}
    .ownerAccessNote{font-size:12px;color:#285f3d;margin-top:8px;font-weight:850}
    .ownerSource{font-size:12px;color:#687068;margin:0 0 12px;line-height:1.4}
    .ownerSaveStatus{min-height:20px;margin-top:8px;color:#17402b;font-size:13px;font-weight:850}
  `;
  if(!document.getElementById(style.id))document.head.appendChild(style);

  function esc(value=''){
    return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function toast(message){
    toastEl.textContent=message;
    toastEl.hidden=false;
    clearTimeout(toast._timer);
    toast._timer=setTimeout(()=>{toastEl.hidden=true;},5200);
  }
  function close(){veil.hidden=true;sheet.innerHTML='';}
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
  function openEditor(record){
    const source=record.source||'Google Sheets';
    sheet.innerHTML=`
      <h2>Edit ${record.type==='est'?'estimate':'job'}</h2>
      <p class="ownerSource"><strong>${esc(record.id)}</strong> • ${esc(record.name||'')}<br>Changes save directly to ${esc(source)}.</p>
      <div class="field"><label for="ownerStatus">Status</label><select id="ownerStatus">${statusOptions(record.status,record.type)}</select></div>
      <div class="row">
        ${field('ownerDate','Scheduled date',record.workDate||'','date')}
        ${field('ownerTime','Arrival window',record.workTime||'')}
      </div>
      ${field('ownerCrew','Crew or assigned to',record.who==='Unassigned'?'':record.who||'')}
      <div class="field"><label for="ownerNotes">Notes</label><textarea id="ownerNotes">${esc(record.notes||'')}</textarea></div>
      <div id="ownerSaveStatus" class="ownerSaveStatus" aria-live="polite"></div>
      <div class="buttons"><button class="secondary" id="ownerCancel" type="button">CANCEL</button><button class="primary" id="ownerSave" type="button">SAVE TO ARBORWISE</button></div>`;
    veil.hidden=false;
    document.getElementById('ownerCancel').onclick=close;
    document.getElementById('ownerSave').onclick=async()=>{
      const save=document.getElementById('ownerSave');
      const message=document.getElementById('ownerSaveStatus');
      save.disabled=true;
      message.textContent='Saving to the live Arborwise sheet...';
      try{
        const response=await fetch('/api/owner-edit',{
          method:'PATCH',
          credentials:'same-origin',
          cache:'no-store',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:record.id,
            type:record.type,
            source:record.source,
            status:document.getElementById('ownerStatus').value,
            date:document.getElementById('ownerDate').value,
            time:document.getElementById('ownerTime').value.trim(),
            who:document.getElementById('ownerCrew').value.trim(),
            notes:document.getElementById('ownerNotes').value.trim()
          })
        });
        const data=await response.json().catch(()=>({}));
        if(!response.ok)throw new Error(data.error||`Save failed ${response.status}`);
        message.textContent=`Saved to ${data.tab}. Reloading the live board...`;
        toast(`${record.id} saved to ${data.tab}`);
        setTimeout(()=>location.reload(),650);
      }catch(error){
        message.textContent=error.message||'Could not save this record.';
        save.disabled=false;
      }
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
