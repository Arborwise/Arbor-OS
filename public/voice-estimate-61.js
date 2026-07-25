'use strict';
(() => {
  const addButton=document.getElementById('addButton');
  const veil=document.getElementById('veil');
  const sheet=document.getElementById('sheet');
  const toastEl=document.getElementById('toast');
  if(!addButton||!veil||!sheet)return;

  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  let recognition=null;
  let listening=false;
  let finalTranscript='';

  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const toast=message=>{
    if(!toastEl)return;
    toastEl.textContent=message;
    toastEl.hidden=false;
    clearTimeout(toast._timer);
    toast._timer=setTimeout(()=>{toastEl.hidden=true;},5200);
  };
  const field=id=>document.getElementById(id);

  const style=document.createElement('style');
  style.textContent=`
    #addButton.voiceEstimate{
      display:flex!important;align-items:center;justify-content:center;
      background:#e4590c;color:#fff;border:3px solid #fff;
      width:62px;height:62px;right:14px;bottom:88px;
      box-shadow:0 5px 13px rgba(0,0,0,.38)
    }
    #addButton.voiceEstimate svg{width:31px;height:31px;fill:currentColor}
    #addButton.voiceEstimate.listening{background:#a62b24;animation:voicePulse 1s ease-in-out infinite}
    @keyframes voicePulse{50%{transform:scale(1.08);box-shadow:0 0 0 10px rgba(166,43,36,.17),0 5px 13px rgba(0,0,0,.38)}}
    .voiceIntro{margin:-3px 0 13px;padding:10px 12px;border-radius:12px;background:#e8f3eb;color:#17402b;font-weight:750;line-height:1.4}
    .voiceCapture{display:grid;grid-template-columns:74px 1fr;gap:10px;align-items:stretch;margin-bottom:12px}
    .voiceMic{border:0;border-radius:15px;background:#e4590c;color:#fff;font-weight:950;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:92px}
    .voiceMic svg{width:31px;height:31px;fill:currentColor}.voiceMic span{font-size:10px;letter-spacing:.04em}
    .voiceMic.listening{background:#a62b24;animation:voicePulse 1s ease-in-out infinite}
    .voiceTranscript{width:100%;min-height:92px!important;resize:vertical}
    .voiceState{font-size:12px;font-weight:850;color:#687068;margin:-5px 0 11px}
    .voiceTools{display:flex;gap:8px;margin:-2px 0 13px}.voiceTools button{flex:1;border:0;border-radius:10px;padding:10px;font-weight:900}.organizeVoice{background:#17402b;color:#fff}.clearVoice{background:#dfded6;color:#18231c}
    .draftBadge{display:inline-block;margin:0 0 12px;padding:6px 10px;border-radius:999px;background:#fff0d7;color:#7b4400;font-size:11px;font-weight:950;letter-spacing:.04em}
    .priceField{position:relative}.priceField:before{content:'$';position:absolute;left:12px;bottom:12px;font-weight:900;color:#17402b}.priceField input{padding-left:27px!important}
    .sheet.voiceEstimateSheet{max-height:94vh}
    @media(max-width:390px){#addButton.voiceEstimate{width:58px;height:58px}.voiceCapture{grid-template-columns:66px 1fr}.voiceMic{min-height:98px}}
  `;
  document.head.appendChild(style);

  addButton.hidden=false;
  addButton.removeAttribute('hidden');
  addButton.setAttribute('aria-hidden','false');
  addButton.setAttribute('aria-label','Dictate a new estimate');
  addButton.title='Dictate a new estimate';
  addButton.classList.add('voiceEstimate');
  addButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v7a3 3 0 0 0 3 3zm5-3a1 1 0 0 1 2 0 7 7 0 0 1-6 6.93V21h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2.07A7 7 0 0 1 5 12a1 1 0 0 1 2 0 5 5 0 0 0 10 0z"/></svg>';

  function close(){
    try{recognition?.stop();}catch{}
    listening=false;
    addButton.classList.remove('listening');
    veil.hidden=true;
    sheet.classList.remove('voiceEstimateSheet');
    sheet.innerHTML='';
  }

  function capture(text,label,nextLabels){
    const next=nextLabels.join('|');
    const expression=new RegExp(`(?:${label})\\s*(?:is|are|:|=)?\\s*([\\s\\S]*?)(?=\\b(?:${next})\\b|$)`,'i');
    return (text.match(expression)?.[1]||'').trim().replace(/[.,;]+$/,'');
  }
  function extract(text){
    const labels=['customer','customer name','name','address','city','state','zip','phone','telephone','email','scope','work','service','details','price','total','estimate','quote','exclusions','exclude','notes'];
    const next=labels.map(value=>value.replace(/ /g,'\\s+'));
    const customer=capture(text,'customer(?:\\s+name)?|name',next.filter(value=>!/^customer|^name/.test(value)));
    const address=capture(text,'address',next.filter(value=>value!=='address'));
    const city=capture(text,'city',next.filter(value=>value!=='city'));
    const state=capture(text,'state',next.filter(value=>value!=='state'));
    const zip=capture(text,'zip(?:\\s+code)?',next.filter(value=>!value.startsWith('zip')));
    const email=(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)||[])[0]||'';
    const phone=(text.match(/(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/)||[])[0]||'';
    const price=(text.match(/(?:price|total|estimate|quote)(?:\s+(?:is|at|for))?\s*\$?([\d,]+(?:\.\d{1,2})?)/i)||[])[1]||'';
    const work=capture(text,'scope|work|service|details',next.filter(value=>!['scope','work','service','details'].includes(value)));
    const exclusions=capture(text,'exclusions?|exclude',next.filter(value=>!value.startsWith('exclu')));
    const notes=capture(text,'notes?',next.filter(value=>value!=='notes'));
    return {customer,address,city,state,zip,email,phone,price,work,exclusions,notes};
  }

  function classify(text){
    const lower=text.toLowerCase();
    if(/storm|hanging limb|broken limb|emergency|storm damage/.test(lower))return 'Storm Cleanup';
    if(/stump grind|grind stump|stump grinding/.test(lower))return 'Stump Grinding';
    if(/remove|removal|take down|dead tree|fell tree/.test(lower))return 'Tree Removal';
    if(/prun|trim|deadwood|canopy|clearance|elevat|raise|branch collar|shape|train/.test(lower))return 'Tree Pruning';
    if(/root flare|mulch|fertiliz|nutriroot|plant health|treatment|bagworm|soil|declin/.test(lower))return 'Plant Health Care';
    if(/shrub|hedge|transplant/.test(lower))return 'Hedges / Shrubs';
    if(/mow|edge|weed/.test(lower))return 'Grounds Maintenance';
    return 'Personalized Tree Care';
  }

  function detailsSentence(value){
    const text=String(value||'').trim();
    if(!text)return 'the trees and work areas identified during the property walkthrough';
    return text.charAt(0).toLowerCase()+text.slice(1).replace(/[.]+$/,'');
  }

  function scopeFor(service,details){
    const site=detailsSentence(details);
    if(service==='Tree Removal')return `Scope of Work includes:\n\n• Safe removal of ${site} using appropriate professional equipment and controlled removal techniques.\n\n• Sectioning and lowering material as necessary to protect the residence, fencing, landscaping, utilities, and surrounding property.\n\n• Cutting the remaining stump flush to grade unless stump grinding is specifically listed.\n\n• Hauling away all limbs, wood, brush, and debris generated by the work.\n\n• Cleaning the project area thoroughly upon completion.\n\nAll work will be performed with attention to crew safety, protection of the surrounding property, and proper jobsite cleanup.`;
    if(service==='Tree Pruning')return `Scope of Work includes:\n\n• Selective pruning of ${site}.\n\n• Removal of dead, damaged, diseased, crossing, rubbing, or structurally compromised branches that can be safely and appropriately addressed.\n\n• Canopy elevation, balancing, and clearance from the residence, roofline, walkways, driveway, fencing, and neighboring property where discussed during the walkthrough.\n\n• Precise pruning cuts made just outside the branch collar to support proper compartmentalization and reduce unnecessary exposure to decay, insects, and disease.\n\n• Preservation of the tree's natural form without topping or excessive live-crown removal.\n\n• Hauling away all limbs, brush, and debris generated by the work, followed by a thorough cleanup of the project area.`;
    if(service==='Stump Grinding')return `Scope of Work includes:\n\n• Grinding ${site} to an appropriate depth below surrounding grade.\n\n• Removal of accessible surface roots within the agreed work area where practical.\n\n• Consolidation of grindings in the stump area unless removal is specifically included.\n\n• Cleanup of the immediate work zone upon completion.\n\nUnderground utilities, irrigation, invisible fencing, and other concealed obstructions must be identified before work begins.`;
    if(service==='Plant Health Care')return `Scope of Work includes:\n\n• Evaluation and treatment of ${site} according to the conditions observed during the property walkthrough.\n\n• Clearing excess soil, rock, liner, or accumulated debris from the trunk and root-flare area where applicable so the root flare remains properly exposed.\n\n• Applying mulch appropriately without piling material against the trunk.\n\n• Completing the discussed plant-health-care treatment, soil improvement, pest management, or corrective care.\n\n• Removing debris generated by the work and leaving the project area tidy.\n\nTree response cannot be guaranteed; recommendations are intended to improve growing conditions and support long-term health.`;
    if(service==='Storm Cleanup')return `Scope of Work includes:\n\n• Controlled removal of ${site}, including broken, hanging, split, or storm-damaged material identified during the site inspection.\n\n• Use of appropriate rigging and professional equipment to protect structures, vehicles, fencing, landscaping, and the crew.\n\n• Cutting and handling compromised material in a sequence that reduces additional movement or failure.\n\n• Hauling away all brush, limbs, wood, and debris generated by the work.\n\n• Thorough cleanup of the project area upon completion.\n\nAdditional concealed defects discovered after work begins will be documented and presented for approval before expanding the scope.`;
    if(service==='Hedges / Shrubs')return `Scope of Work includes:\n\n• Pruning, shaping, removal, or transplanting of ${site} as discussed during the property walkthrough.\n\n• Use of selective cuts intended to maintain an appropriate natural form and reduce unnecessary stress.\n\n• Root-ball and planting-area preparation where transplanting is included, with mulch applied appropriately as needed.\n\n• Collection and removal of all waste materials generated by the work.\n\n• Final cleanup so the homeowner's property remains tidy.`;
    if(service==='Grounds Maintenance')return `Scope of Work includes:\n\n• Mowing, edging, and weed removal for ${site}.\n\n• Trimming around accessible obstacles and hardscape without damaging trees, shrubs, irrigation components, or structures.\n\n• Blowing and cleaning paved surfaces upon completion.\n\n• Removal or consolidation of generated debris as specified for the property.`;
    return `Scope of Work includes:\n\n• Personalized tree care for ${site}, based on the conditions observed and the objectives discussed during the property walkthrough.\n\n• Use of professional equipment and accepted arboricultural practices appropriate to the work.\n\n• Protection of the residence, landscaping, fencing, utilities, and surrounding property throughout the project.\n\n• Hauling away debris generated by the listed work and completing a thorough jobsite cleanup.\n\nAny work not specifically described in this estimate will require separate approval.`;
  }

  function guideFor(service){
    return ({
      'Tree Pruning':'Why Proper Pruning Cuts and Branch Collars Matter',
      'Tree Removal':'Tree Removal, Property Protection, and Cleanup',
      'Stump Grinding':'What to Expect From Stump Grinding',
      'Plant Health Care':'Root Flares, Mulch, and Long-Term Tree Health',
      'Storm Cleanup':'Storm-Damaged Trees and Hidden Structural Risk',
      'Hedges / Shrubs':'Healthy Shrub Pruning and Transplant Care',
      'Grounds Maintenance':'Protecting Trees During Grounds Maintenance'
    })[service]||'Arborwise Personalized Tree Care';
  }

  function organize(){
    const raw=field('voiceRaw')?.value.trim()||'';
    if(!raw){toast('Dictate or type the field notes first');return;}
    const found=extract(raw);
    const service=classify(`${found.work} ${raw}`);
    const set=(id,value,overwrite=false)=>{const element=field(id);if(element&&(overwrite||!element.value.trim())&&value)element.value=value;};
    set('voiceCustomer',found.customer);
    set('voiceAddress',found.address);
    set('voiceCity',found.city);
    set('voiceState',found.state||'TX');
    set('voiceZip',found.zip);
    set('voicePhone',found.phone);
    set('voiceEmail',found.email);
    set('voicePrice',found.price);
    set('voiceService',service,true);
    set('voiceScope',scopeFor(service,found.work||raw),true);
    set('voiceExclusions',found.exclusions);
    set('voiceNotes',found.notes);
    const badge=field('voiceClassification');
    if(badge)badge.textContent=`ORGANIZED AS ${service.toUpperCase()} • REVIEW REQUIRED`;
    const state=field('voiceStateLine');
    if(state)state.textContent='Draft organized. Review the customer, scope, price, exclusions, and notes before saving.';
  }

  function updateMicUi(active,message){
    listening=active;
    addButton.classList.toggle('listening',active);
    const button=field('voiceMic');
    button?.classList.toggle('listening',active);
    if(button)button.querySelector('span').textContent=active?'STOP':'DICTATE';
    const state=field('voiceStateLine');
    if(state)state.textContent=message;
  }

  function toggleRecognition(){
    if(!SpeechRecognition){
      field('voiceRaw')?.focus();
      toast('Use the microphone on the phone keyboard to dictate into Field Notes');
      return;
    }
    if(listening){try{recognition.stop();}catch{}return;}
    finalTranscript=field('voiceRaw')?.value.trim()||'';
    recognition=new SpeechRecognition();
    recognition.lang='en-US';
    recognition.continuous=true;
    recognition.interimResults=true;
    recognition.onstart=()=>updateMicUi(true,'Listening — speak the customer, address, work, price, exclusions, and notes.');
    recognition.onresult=event=>{
      let interim='';
      for(let index=event.resultIndex;index<event.results.length;index++){
        const words=event.results[index][0].transcript;
        if(event.results[index].isFinal)finalTranscript+=`${finalTranscript?' ':''}${words.trim()}`;
        else interim+=words;
      }
      const raw=field('voiceRaw');
      if(raw)raw.value=`${finalTranscript}${interim?`${finalTranscript?' ':''}${interim}`:''}`;
    };
    recognition.onerror=event=>{
      updateMicUi(false,event.error==='not-allowed'?'Microphone permission was blocked. Allow microphone access and tap again.':`Microphone error: ${event.error}`);
    };
    recognition.onend=()=>{
      updateMicUi(false,'Dictation stopped. Tap Organize Draft, then review every field.');
      if(field('voiceRaw')?.value.trim())organize();
    };
    try{recognition.start();}catch(error){toast(error.message||'Could not start microphone');}
  }

  async function saveDraft(){
    const customer=field('voiceCustomer')?.value.trim()||'';
    const scope=field('voiceScope')?.value.trim()||'';
    if(!customer){toast('Customer name is required');field('voiceCustomer')?.focus();return;}
    if(!scope){toast('Estimate scope is required');field('voiceScope')?.focus();return;}
    const button=field('saveVoiceDraft');
    button.disabled=true;
    button.textContent='SAVING DRAFT…';
    const payload={
      customer,
      address:field('voiceAddress')?.value||'',city:field('voiceCity')?.value||'',state:field('voiceState')?.value||'',zip:field('voiceZip')?.value||'',
      phone:field('voicePhone')?.value||'',email:field('voiceEmail')?.value||'',service:field('voiceService')?.value||'',scope,
      price:field('voicePrice')?.value||'',exclusions:field('voiceExclusions')?.value||'',notes:field('voiceNotes')?.value||'',
      rawDictation:field('voiceRaw')?.value||'',guide:guideFor(field('voiceService')?.value||'')
    };
    try{
      const response=await fetch('/api/estimate-draft',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(data.error||`Save failed ${response.status}`);
      close();
      toast(`${data.draft.id} saved • Draft — Review Required`);
      setTimeout(()=>document.getElementById('syncButton')?.click(),700);
    }catch(error){
      toast(error.message||'Could not save estimate draft');
      button.disabled=false;
      button.textContent='SAVE REVIEW DRAFT';
    }
  }

  function openForm(){
    finalTranscript='';
    sheet.classList.add('voiceEstimateSheet');
    sheet.innerHTML=`<h2>Dictate Estimate</h2>
      <div class="draftBadge" id="voiceClassification">DRAFT — REVIEW REQUIRED</div>
      <div class="voiceIntro">Tap the microphone and speak naturally. Include the customer, address, phone, exact work, price, exclusions, and jobsite notes. The board will organize it into Arborwise's detailed estimate style for review.</div>
      <div class="voiceCapture"><button class="voiceMic" id="voiceMic" type="button" aria-label="Start or stop estimate dictation"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v7a3 3 0 0 0 3 3zm5-3a1 1 0 0 1 2 0 7 7 0 0 1-6 6.93V21h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2.07A7 7 0 0 1 5 12a1 1 0 0 1 2 0 5 5 0 0 0 10 0z"/></svg><span>DICTATE</span></button><textarea class="voiceTranscript" id="voiceRaw" placeholder="Example: Customer is Jane Smith, address is 123 Main Street, remove the dead front oak, cut stump flush, haul debris, price is 850 dollars…"></textarea></div>
      <div class="voiceState" id="voiceStateLine">Ready for Brandon's field dictation.</div>
      <div class="voiceTools"><button class="organizeVoice" id="organizeVoice" type="button">ORGANIZE DRAFT</button><button class="clearVoice" id="clearVoice" type="button">CLEAR</button></div>
      <div class="row"><div class="field"><label for="voiceCustomer">Customer</label><input id="voiceCustomer" autocomplete="name"></div><div class="field"><label for="voicePhone">Phone</label><input id="voicePhone" inputmode="tel" autocomplete="tel"></div></div>
      <div class="field"><label for="voiceAddress">Street Address</label><input id="voiceAddress" autocomplete="street-address"></div>
      <div class="row"><div class="field"><label for="voiceCity">City</label><input id="voiceCity"></div><div class="field"><label for="voiceState">State</label><input id="voiceState" value="TX"></div></div>
      <div class="row"><div class="field"><label for="voiceZip">ZIP</label><input id="voiceZip" inputmode="numeric"></div><div class="field"><label for="voiceEmail">Email</label><input id="voiceEmail" inputmode="email" autocomplete="email"></div></div>
      <div class="row"><div class="field"><label for="voiceService">Service Classification</label><select id="voiceService"><option>Personalized Tree Care</option><option>Tree Pruning</option><option>Tree Removal</option><option>Stump Grinding</option><option>Plant Health Care</option><option>Storm Cleanup</option><option>Hedges / Shrubs</option><option>Grounds Maintenance</option></select></div><div class="field priceField"><label for="voicePrice">Price Before Tax</label><input id="voicePrice" inputmode="decimal" placeholder="0.00"></div></div>
      <div class="field"><label for="voiceScope">Detailed Arborwise Scope</label><textarea id="voiceScope" style="min-height:260px" placeholder="The organized QuickBooks-style scope appears here for review."></textarea></div>
      <div class="field"><label for="voiceExclusions">Exclusions / Clarifications</label><textarea id="voiceExclusions" placeholder="Items not included, access limits, utility concerns, stump or haul-off clarifications…"></textarea></div>
      <div class="field"><label for="voiceNotes">Internal Estimator Notes</label><textarea id="voiceNotes" placeholder="Private follow-up notes for Greg and Brandon."></textarea></div>
      <div class="buttons"><button class="secondary" id="cancelVoiceDraft" type="button">CANCEL</button><button class="primary" id="saveVoiceDraft" type="button">SAVE REVIEW DRAFT</button></div>`;
    veil.hidden=false;
    field('voiceMic').onclick=toggleRecognition;
    field('organizeVoice').onclick=organize;
    field('clearVoice').onclick=()=>{field('voiceRaw').value='';finalTranscript='';updateMicUi(false,'Cleared. Ready for a new field dictation.');};
    field('cancelVoiceDraft').onclick=close;
    field('saveVoiceDraft').onclick=saveDraft;
    veil.onclick=event=>{if(event.target===veil)close();};
    setTimeout(()=>field('voiceMic')?.focus(),80);
  }

  addButton.onclick=event=>{event.preventDefault();event.stopPropagation();openForm();};
  window.ARBORWISE_VOICE_ESTIMATE_VERSION='61';
})();
