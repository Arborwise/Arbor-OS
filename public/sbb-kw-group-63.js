'use strict';
(() => {
  const VERSION='81';
  const STORAGE_KEY='arborwise-pmg-native-v81';
  const PMG_ALL='PMGS';
  const VALID_CHOICES=new Set([PMG_ALL,'GOODWIN','SBB','KW','KANAM']);
  let active=false;
  let choice=PMG_ALL;
  let suppressTopReset=false;
  let queued=false;
  let filterObserver=null;
  let mainObserver=null;

  const upper=value=>String(value??'').trim().toUpperCase();

  function readPreference(){
    try{
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
      active=Boolean(saved.active);
      choice=VALID_CHOICES.has(upper(saved.choice))?upper(saved.choice):PMG_ALL;
    }catch{
      active=false;
      choice=PMG_ALL;
    }
  }

  function savePreference(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify({active,choice}));}catch{}
  }

  function classify(record={}){
    const category=upper(record.category);
    const who=upper(record.who);
    const managementGroup=upper(record.managementGroup);
    const subcontractor=upper(record.subcontractor);
    const text=upper([
      record.category,
      record.managementGroup,
      record.subcontractor,
      record.who,
      record.name,
      record.address,
      record.service,
      record.notes
    ].filter(Boolean).join(' '));

    const kw=category==='KW'
      ||who.includes('KW')
      ||subcontractor.includes('KW LANDSCAPING')
      ||text.includes('KW LANDSCAPING');
    const goodwin=category==='GOODWIN'
      ||managementGroup.includes('GOODWIN')
      ||text.includes('GOODWIN & COMPANY')
      ||text.includes('GOODWIN');
    const kanam=category==='KANAM'
      ||managementGroup.includes('KANAM')
      ||text.includes('KANAM REALTY')
      ||text.includes('KANAM');
    const sbb=!kw&&(
      category==='SBB'
      ||managementGroup.includes('SBB MANAGEMENT')
      ||text.includes('SBB MANAGEMENT')
      ||/(^|\s)SBB(\s|$)/.test(text)
    );

    return {kw,goodwin,kanam,sbb,isPmg:kw||goodwin||kanam||sbb};
  }

  function matchesChoice(record){
    if(!record)return false;
    const group=classify(record);
    if(choice===PMG_ALL)return group.isPmg;
    if(choice==='GOODWIN')return group.goodwin;
    if(choice==='SBB')return group.sbb;
    if(choice==='KW')return group.kw;
    if(choice==='KANAM')return group.kanam;
    return false;
  }

  function recordsById(){
    const records=window.ARBORWISE_CURRENT_OPERATIONS?.records;
    const map=new Map();
    if(!Array.isArray(records))return map;
    records.forEach(record=>{
      const id=String(record?.id??'').trim();
      if(id)map.set(id,record);
    });
    return map;
  }

  function resetUnderlyingManagementFilter(){
    const all=document.querySelector('#groupFilters54 button[data-group="ALL"]');
    if(all&&!all.classList.contains('on'))all.click();
  }

  function selectTopAll(){
    const all=document.querySelector('#filters button[data-filter="ALL"]');
    if(all&&!all.classList.contains('on'))all.click();
  }

  function activatePmg(nextChoice){
    choice=VALID_CHOICES.has(upper(nextChoice))?upper(nextChoice):PMG_ALL;
    active=true;
    savePreference();
    suppressTopReset=true;
    resetUnderlyingManagementFilter();
    selectTopAll();
    setTimeout(()=>{
      suppressTopReset=false;
      queueApply();
    },40);
  }

  function deactivatePmg(){
    if(!active)return;
    active=false;
    savePreference();
    queueApply();
  }

  function installStyle(){
    if(document.getElementById(`pmg-native-${VERSION}`))return;
    const style=document.createElement('style');
    style.id=`pmg-native-${VERSION}`;
    style.textContent=`
      #groupFilters54{display:none!important}
      #filters.filters{grid-template-columns:repeat(4,minmax(0,1fr))!important}
      #filters button[data-filter="KW"],#filters button[data-filter="UNASSIGNED"]{display:none!important}
      .pmgNative81{display:block;min-width:0;margin:0;padding:0}
      .pmgNative81 select{
        display:block;
        width:100%;
        min-width:0;
        min-height:37px;
        margin:0;
        border:1.5px solid #17402b;
        border-radius:999px;
        background:#fff;
        color:#17402b;
        padding:8px 4px;
        font-family:Arial,Helvetica,sans-serif;
        font-size:12px;
        font-weight:900;
        text-align:center;
        text-align-last:center;
        appearance:auto;
        -webkit-appearance:menulist;
      }
      .pmgNative81.on select{background:#17402b;color:#fff}
      @media(max-width:390px){
        .pmgNative81 select{font-size:10px;padding:8px 1px}
      }
    `;
    document.head.appendChild(style);
  }

  function buildNativeSelect(){
    const filters=document.getElementById('filters');
    if(!filters)return;

    filters.querySelectorAll('button[data-filter="KW"],button[data-filter="UNASSIGNED"]').forEach(button=>{
      button.hidden=true;
      button.setAttribute('aria-hidden','true');
      button.tabIndex=-1;
    });

    filters.querySelectorAll('button[data-filter="ALL"],button[data-filter="ARBORWISE"],button[data-filter="DALLAS"]').forEach(button=>{
      if(button.dataset.pmgResetBound===VERSION)return;
      button.dataset.pmgResetBound=VERSION;
      button.addEventListener('click',()=>{
        if(suppressTopReset)return;
        deactivatePmg();
        setTimeout(()=>{
          resetUnderlyingManagementFilter();
          queueApply();
        },0);
      });
    });

    let wrapper=filters.querySelector('.pmgNative81');
    if(!wrapper){
      wrapper=document.createElement('label');
      wrapper.className='pmgNative81';
      wrapper.innerHTML=`
        <select id="pmgNativeSelect81" aria-label="Property management groups">
          <option value="PMGS">PMGs</option>
          <option value="GOODWIN">Goodwin &amp; Company</option>
          <optgroup label="SBB Management">
            <option value="SBB">SBB Management</option>
            <option value="KW">KW Landscaping</option>
          </optgroup>
          <option value="KANAM">KANAM Realty</option>
        </select>`;
      filters.appendChild(wrapper);
      const select=wrapper.querySelector('select');
      select.addEventListener('change',()=>activatePmg(select.value));
    }

    const select=wrapper.querySelector('select');
    if(select&&select.value!==choice)select.value=choice;
    wrapper.classList.toggle('on',active);
  }

  function applyCardFilter(){
    const main=document.getElementById('main');
    if(!main)return;
    const records=recordsById();
    let visible=0;

    main.querySelectorAll('.card').forEach(card=>{
      const id=String(card.querySelector('.recordId')?.textContent||'').trim();
      const show=!active||matchesChoice(records.get(id));
      card.hidden=!show;
      if(show)visible+=1;
    });

    if(active){
      const count=main.querySelector('.title .count');
      if(count)count.textContent=String(visible);
    }
  }

  function apply(){
    queued=false;
    installStyle();
    buildNativeSelect();
    applyCardFilter();
  }

  function queueApply(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(apply);
  }

  function start(){
    readPreference();
    installStyle();

    const filters=document.getElementById('filters');
    const main=document.getElementById('main');
    filterObserver=new MutationObserver(queueApply);
    mainObserver=new MutationObserver(queueApply);
    if(filters)filterObserver.observe(filters,{childList:true});
    if(main)mainObserver.observe(main,{childList:true,subtree:true});

    window.addEventListener('arborwise:data-ready',queueApply);
    window.addEventListener('arborwise:data-cleared',queueApply);
    apply();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
