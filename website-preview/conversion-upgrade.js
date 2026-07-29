(() => {
  const PHONE = '+19724308330';
  const PHONE_DISPLAY = '972-430-8330';

  const css = document.createElement('style');
  css.id = 'conversion-upgrade-styles';
  css.textContent = `
    .recognition-prompt{display:inline-flex;align-items:center;gap:7px;margin-bottom:12px;padding:6px 10px;border-radius:999px;background:#edf4e6;color:var(--forest);font-size:.72rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase}
    .recognition-prompt:before{content:"✓";width:20px;height:20px;border-radius:50%;display:grid;place-items:center;background:var(--lime);font-size:.72rem}
    .concern-card .card-link{display:flex;align-items:center;justify-content:space-between;gap:8px}
    .concern-card .card-link:after{content:"→";font-size:1rem}
    .decision-section{max-width:1376px;margin:10px auto 86px;padding:0 32px}
    .decision-shell{background:linear-gradient(135deg,#123f2f,#225d43);color:white;border-radius:38px;padding:clamp(30px,5vw,68px);display:grid;grid-template-columns:.86fr 1.14fr;gap:46px;align-items:start;box-shadow:var(--shadow)}
    .decision-copy .eyebrow{color:var(--lime)}
    .decision-copy h2{font-size:clamp(2.2rem,4.2vw,4rem)}
    .decision-copy>p:last-of-type{color:#dce8e1;font-size:1.05rem}
    .decision-principles{display:grid;gap:10px;margin-top:24px}
    .decision-principles span{display:flex;gap:10px;align-items:flex-start;color:#e9f0ec;font-size:.93rem}
    .decision-principles span:before{content:"";width:9px;height:9px;border-radius:50%;background:var(--lime);margin-top:.48rem;flex:0 0 auto}
    .quick-check{background:var(--paper);color:var(--ink);border-radius:28px;padding:26px;box-shadow:0 18px 50px rgba(0,0,0,.16)}
    .quick-check-header{display:flex;justify-content:space-between;gap:15px;align-items:flex-start;margin-bottom:20px}
    .quick-check-header h3{font-family:var(--serif);font-size:1.7rem;margin:0}
    .quick-check-header span{font-size:.72rem;font-weight:900;color:var(--leaf);text-transform:uppercase;letter-spacing:.12em;white-space:nowrap}
    .check-question{border-top:1px solid var(--line);padding:18px 0}
    .check-question:first-of-type{border-top:0;padding-top:0}
    .check-question legend{font-weight:900;margin-bottom:10px;padding:0}
    .check-options{display:flex;flex-wrap:wrap;gap:8px}
    .check-options label{position:relative}
    .check-options input{position:absolute;opacity:0;pointer-events:none}
    .check-options span{display:inline-flex;align-items:center;min-height:42px;padding:9px 13px;border:1px solid #ccd8cf;border-radius:999px;background:white;color:var(--forest);font-size:.86rem;font-weight:800;cursor:pointer;transition:.18s ease}
    .check-options input:checked+span{background:var(--forest);color:white;border-color:var(--forest);box-shadow:0 0 0 3px rgba(184,216,103,.34)}
    .check-options input:focus-visible+span{outline:3px solid rgba(184,216,103,.65);outline-offset:2px}
    .check-result{display:none;margin-top:18px;padding:20px;border-radius:20px;background:#eff4e7;border:1px solid #d2dfc9}
    .check-result.visible{display:block;animation:resultIn .28s ease-out}
    .check-result.urgent{background:#fff0e8;border-color:#eabda6}
    .check-result.prompt{background:#fff8df;border-color:#ead99b}
    .result-level{display:inline-flex;padding:5px 9px;border-radius:999px;background:var(--forest);color:white;font-size:.7rem;font-weight:950;text-transform:uppercase;letter-spacing:.12em;margin-bottom:9px}
    .check-result.urgent .result-level{background:#9a3d21}
    .check-result.prompt .result-level{background:#80600a}
    .check-result h4{font-family:var(--serif);font-size:1.55rem;line-height:1.15;margin:0 0 8px}
    .check-result p{color:var(--muted);margin-bottom:15px}
    .result-actions{display:flex;flex-wrap:wrap;gap:8px}
    .result-actions a{min-height:44px;padding:9px 14px;border-radius:999px;text-decoration:none;font-weight:900;font-size:.86rem;display:inline-flex;align-items:center;justify-content:center}
    .result-actions a:first-child{background:var(--forest);color:white}
    .result-actions a:nth-child(2){background:var(--lime);color:var(--forest)}
    .result-actions a:last-child{border:1px solid var(--forest);color:var(--forest)}
    .why-visit{max-width:1376px;margin:0 auto;padding:82px 32px}
    .why-visit-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:17px;margin-top:34px}
    .why-visit-card{background:var(--paper);border:1px solid var(--line);border-radius:25px;padding:28px;position:relative;overflow:hidden}
    .why-visit-card>span{display:inline-grid;place-items:center;width:46px;height:46px;border-radius:15px;background:#e8f1df;color:var(--forest);font-weight:950;margin-bottom:20px}
    .why-visit-card h3{font-family:var(--serif);font-size:1.45rem}
    .why-visit-card p{color:var(--muted);margin:0}
    .visit-truth{margin-top:18px;padding:22px 25px;background:#fff1cf;border-radius:22px;display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center}
    .visit-truth strong{font-family:var(--serif);font-size:1.3rem;line-height:1.25}
    .visit-truth span:first-child{font-size:2rem}
    .onsite-section{max-width:1376px;margin:0 auto 78px;padding:0 32px}
    .onsite-shell{background:#eff4e7;border:1px solid #d6e2cf;border-radius:34px;padding:45px;display:grid;grid-template-columns:.82fr 1.18fr;gap:46px;align-items:center}
    .onsite-copy p:last-child{color:var(--muted)}
    .onsite-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .onsite-step{background:white;border-radius:21px;padding:20px;min-height:185px;display:flex;flex-direction:column}
    .onsite-step>span{font-size:.75rem;font-weight:950;color:var(--leaf);letter-spacing:.13em;text-transform:uppercase}
    .onsite-step strong{font-family:var(--serif);font-size:1.3rem;line-height:1.2;margin:10px 0}
    .onsite-step p{color:var(--muted);font-size:.88rem;margin:0}
    .onsite-cta{grid-column:1/-1;margin-top:10px;display:flex;align-items:center;justify-content:space-between;gap:22px;background:var(--forest);color:white;border-radius:22px;padding:20px 24px}
    .onsite-cta p{margin:0;color:#dce8e1}
    .onsite-cta .button{flex:0 0 auto}
    .dialog-conversion{margin:22px 0 0;padding-top:22px;border-top:1px solid var(--line)}
    .dialog-conversion h3{font-family:var(--serif);font-size:1.35rem;margin-bottom:10px}
    .dialog-conversion-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .dialog-conversion-grid div{background:#f4f5f0;border-radius:16px;padding:15px}
    .dialog-conversion-grid strong{display:block;color:var(--forest);margin-bottom:5px}
    .dialog-conversion-grid p{font-size:.88rem;color:var(--muted);margin:0}
    .dialog-conversion-note{margin:13px 0 0;padding:13px 15px;border-left:4px solid var(--lime);background:#f8f4e8;border-radius:0 13px 13px 0;font-weight:750;color:#405349}
    @keyframes resultIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
    @media(max-width:960px){.decision-shell,.onsite-shell{grid-template-columns:1fr}.why-visit-grid{grid-template-columns:1fr}.onsite-steps{grid-template-columns:1fr 1fr}.onsite-step:last-child{grid-column:1/-1}}
    @media(max-width:720px){
      .decision-section,.why-visit,.onsite-section{padding-left:14px;padding-right:14px}
      .decision-section{margin-bottom:58px}.decision-shell{border-radius:28px;padding:34px 20px;gap:28px}
      .quick-check{padding:20px;border-radius:23px}.quick-check-header{display:block}.quick-check-header span{display:inline-block;margin-top:5px}
      .why-visit{padding-top:62px;padding-bottom:62px}.visit-truth{grid-template-columns:1fr;text-align:center}
      .onsite-shell{padding:28px 20px;border-radius:26px}.onsite-steps{grid-template-columns:1fr}.onsite-step:last-child{grid-column:auto}
      .onsite-cta{display:block;text-align:center}.onsite-cta .button{width:100%;margin-top:14px}
      .dialog-conversion-grid{grid-template-columns:1fr}.result-actions a{width:100%}
    }`;
  document.head.appendChild(css);

  document.querySelectorAll('.concern-card').forEach(card => {
    const copy = card.querySelector('.concern-copy');
    if (copy && !copy.querySelector('.recognition-prompt')) {
      const tag = document.createElement('span');
      tag.className = 'recognition-prompt';
      tag.textContent = 'Have you seen this?';
      copy.insertBefore(tag, copy.querySelector('strong'));
    }
    const link = card.querySelector('.card-link');
    if (link) link.textContent = 'Yes — help me understand it';
  });

  const concernSection = document.querySelector('.concern-section');
  if (concernSection && !document.querySelector('.decision-section')) {
    const section = document.createElement('section');
    section.className = 'decision-section';
    section.setAttribute('aria-labelledby', 'quick-check-title');
    section.innerHTML = `
      <div class="decision-shell">
        <div class="decision-copy">
          <p class="eyebrow">Recognition is the beginning</p>
          <h2 id="quick-check-title">You may know there is a problem. The property still decides the answer.</h2>
          <p>Two trees can show the same symptom and need completely different responses. What changed, how quickly it changed, and what the tree could strike all affect the next step.</p>
          <div class="decision-principles">
            <span>We give enough information to help you recognize the concern.</span>
            <span>We do not pretend a webpage can inspect roots, movement, decay, or branch structure.</span>
            <span>The free on-site estimate is where Arborwise turns the clues into practical options.</span>
          </div>
        </div>
        <form class="quick-check" id="quickCheck">
          <div class="quick-check-header"><h3>How quickly should Arborwise look?</h3><span>Three fast questions</span></div>
          <fieldset class="check-question"><legend>How quickly did the change appear?</legend><div class="check-options">
            <label><input type="radio" name="speed" value="sudden"><span>Suddenly</span></label>
            <label><input type="radio" name="speed" value="gradual"><span>Gradually</span></label>
            <label><input type="radio" name="speed" value="unknown"><span>Not sure</span></label>
          </div></fieldset>
          <fieldset class="check-question"><legend>What could the tree or branch strike?</legend><div class="check-options">
            <label><input type="radio" name="target" value="occupied"><span>Home, car, road, or people</span></label>
            <label><input type="radio" name="target" value="open"><span>Mostly open ground</span></label>
            <label><input type="radio" name="target" value="unknown"><span>Not sure</span></label>
          </div></fieldset>
          <fieldset class="check-question"><legend>Are you seeing movement or structural change?</legend><div class="check-options">
            <label><input type="radio" name="structure" value="movement"><span>New lean, crack, split, or lifting soil</span></label>
            <label><input type="radio" name="structure" value="canopy"><span>Leaves or branches only</span></label>
            <label><input type="radio" name="structure" value="unknown"><span>Not sure</span></label>
          </div></fieldset>
          <div class="check-result" id="quickCheckResult" aria-live="polite"></div>
        </form>
      </div>`;
    concernSection.insertAdjacentElement('afterend', section);
  }

  const annieSection = document.querySelector('.annie-section');
  if (annieSection && !document.querySelector('.why-visit')) {
    const section = document.createElement('section');
    section.className = 'why-visit';
    section.setAttribute('aria-labelledby', 'why-visit-title');
    section.innerHTML = `
      <div class="section-heading left-heading">
        <p class="eyebrow">Why the visit still matters</p>
        <h2 id="why-visit-title">The visible symptom tells us where to begin—not where to stop.</h2>
        <p>A useful website should help you ask a better question. A useful tree company should come out and answer it responsibly.</p>
      </div>
      <div class="why-visit-grid">
        <article class="why-visit-card"><span>01</span><h3>The same symptom can have different causes</h3><p>Brown leaves can involve heat, water, roots, insects, disease, or recent site damage. The correct response depends on the whole pattern.</p></article>
        <article class="why-visit-card"><span>02</span><h3>Risk depends on what is around the tree</h3><p>A defect over an empty field is not the same decision as that defect over a bedroom, driveway, roadway, or play area.</p></article>
        <article class="why-visit-card"><span>03</span><h3>The best recommendation may be smaller than expected</h3><p>The right answer could be targeted pruning, removal, monitoring, protecting roots, changing site conditions, or doing nothing today.</p></article>
      </div>
      <div class="visit-truth"><span aria-hidden="true">🦉</span><strong>Arborwise earns the job by explaining the situation—not by making every tree sound like an emergency.</strong></div>`;
    annieSection.insertAdjacentElement('afterend', section);
  }

  const estimate = document.querySelector('.estimate-section');
  if (estimate && !document.querySelector('.onsite-section')) {
    const section = document.createElement('section');
    section.className = 'onsite-section';
    section.setAttribute('aria-labelledby', 'onsite-title');
    section.innerHTML = `
      <div class="onsite-shell">
        <div class="onsite-copy"><p class="eyebrow">What happens next</p><h2 id="onsite-title">Getting Arborwise to the property should feel easy.</h2><p>No mystery process and no pressure. Show us what caught your eye, let us inspect the whole situation, and hear the realistic options before deciding anything.</p></div>
        <div class="onsite-steps">
          <article class="onsite-step"><span>Step 1</span><strong>Call or text photos</strong><p>Tell us what changed and send the whole tree, concern area, and trunk base.</p></article>
          <article class="onsite-step"><span>Step 2</span><strong>We look at the property</strong><p>Tree, roots, defects, targets, access, recent work, soil, and surrounding conditions.</p></article>
          <article class="onsite-step"><span>Step 3</span><strong>You get practical options</strong><p>What needs action, what can wait, what it may cost, and why Arborwise recommends it.</p></article>
        </div>
        <div class="onsite-cta"><p><strong>Not sure what to call the problem?</strong><br>That is fine. “Something looks different” is enough to begin.</p><a class="button primary" href="#estimate">Schedule a free estimate</a></div>
      </div>`;
    estimate.insertAdjacentElement('beforebegin', section);
  }

  const quickCheck = document.getElementById('quickCheck');
  const quickResult = document.getElementById('quickCheckResult');
  if (quickCheck && quickResult) {
    quickCheck.addEventListener('change', () => {
      const data = new FormData(quickCheck);
      const speed = data.get('speed');
      const target = data.get('target');
      const structure = data.get('structure');
      if (!speed || !target || !structure) return;

      let level = 'Schedule';
      let className = '';
      let heading = 'A free on-site estimate is the sensible next step.';
      let copy = 'Nothing here proves an emergency, but the property details still matter. Arborwise can inspect the full tree and explain whether work is needed now, later, or not at all.';

      if (structure === 'movement' && (speed === 'sudden' || target === 'occupied')) {
        level = 'Act now';
        className = 'urgent';
        heading = 'Keep people clear and call Arborwise now.';
        copy = 'A new lean, active crack, split, lifting soil, or sudden structural movement near people or property deserves prompt attention. Do not stand beneath it or try to test it yourself.';
      } else if (speed === 'sudden' || structure === 'movement' || target === 'occupied') {
        level = 'Prompt look';
        className = 'prompt';
        heading = 'Arrange an on-site look soon.';
        copy = 'A sudden change, structural concern, or nearby target raises the importance of seeing the full tree and site. Arborwise can separate an urgent defect from something manageable.';
      }

      const summary = `Speed: ${speed}; nearby target: ${target}; visible concern: ${structure}`;
      const textBody = encodeURIComponent(`Hi Arborwise, I used the website tree check. ${summary}. I would like a free on-site estimate and can send photos.`);
      quickResult.className = `check-result visible ${className}`.trim();
      quickResult.innerHTML = `
        <span class="result-level">${level}</span>
        <h4>${heading}</h4>
        <p>${copy}</p>
        <div class="result-actions">
          <a href="tel:${PHONE}">Call ${PHONE_DISPLAY}</a>
          <a href="sms:${PHONE}?body=${textBody}">Text this result</a>
          <a href="#estimate">Free estimate</a>
        </div>`;
    });
  }

  const dialogContent = document.querySelector('.dialog-content');
  const dialogActions = document.querySelector('.dialog-actions');
  if (dialogContent && dialogActions && !dialogContent.querySelector('.dialog-conversion')) {
    const block = document.createElement('div');
    block.className = 'dialog-conversion';
    block.innerHTML = `
      <h3>Why Arborwise still needs to see the tree</h3>
      <div class="dialog-conversion-grid">
        <div><strong>What the page can do</strong><p>Help you recognize the concern, understand possible causes, and know what details matter.</p></div>
        <div><strong>What the property tells us</strong><p>Whether the tree is moving, how much sound structure remains, what roots and soil show, and what could be struck.</p></div>
      </div>
      <p class="dialog-conversion-note">The goal is not to turn every concern into a big job. It is to get the right eyes on the tree before somebody guesses.</p>`;
    dialogActions.insertAdjacentElement('beforebegin', block);
  }

  const originalCards = document.querySelectorAll('.concern-card');
  originalCards.forEach(card => {
    card.addEventListener('click', () => {
      const issue = card.querySelector('strong')?.textContent?.trim() || 'tree concern';
      document.querySelectorAll('.dialog-actions a[href^="sms:"]').forEach(link => {
        link.href = `sms:${PHONE}?body=${encodeURIComponent(`Hi Arborwise, I was reading about ${issue} on your website. I am seeing something similar and would like to send photos and arrange a free estimate.`)}`;
      });
    });
  });
})();
