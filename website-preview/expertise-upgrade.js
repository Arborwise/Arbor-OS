(() => {
  const serviceSection = document.querySelector('.services-section');
  if (serviceSection) {
    serviceSection.innerHTML = `
      <div class="expertise-heading">
        <div>
          <p class="eyebrow">What Arborwise does exceptionally well</p>
          <h2>Pruning is our craft. Removals are controlled. Professional properties stay handled.</h2>
        </div>
        <p class="expertise-intro">We do not try to be every kind of outdoor company. Arborwise is built around high-skill tree work, honest recommendations, and the kind of follow-through homeowners and property managers remember.</p>
      </div>
      <div class="expertise-grid">
        <article class="expertise-card pruning-card">
          <span class="expertise-number">01</span>
          <div class="expertise-icon" aria-hidden="true">✂</div>
          <h3>Master-Level Pruning</h3>
          <p>Pruning is not cutting until the tree looks smaller. We read branch structure, load, clearance, species response, future growth, and the purpose of every cut.</p>
          <ul>
            <li>Correct cuts—not topping</li>
            <li>Structure, balance, clearance, and long-term growth</li>
            <li>Work that respects both the tree and the property</li>
          </ul>
          <a href="#estimate">Have us look at your trees</a>
        </article>
        <article class="expertise-card removal-card">
          <span class="expertise-number">02</span>
          <div class="expertise-icon" aria-hidden="true">↘</div>
          <h3>Expert Tree Removal</h3>
          <p>Difficult removals are solved before the first cut. We plan access, rigging, drop zones, nearby structures, utilities, traffic, equipment, and cleanup as one controlled operation.</p>
          <ul>
            <li>Tight-access and technical removals</li>
            <li>Hazardous, storm-damaged, dead, and declining trees</li>
            <li>Property protection from setup through final cleanup</li>
          </ul>
          <a href="#estimate">Discuss a removal</a>
        </article>
        <article class="expertise-card management-card">
          <span class="expertise-number">03</span>
          <div class="expertise-icon" aria-hidden="true">▦</div>
          <h3>Nearly a Decade With Property Managers</h3>
          <p>Property management work requires more than tree skill. It requires clear scopes, dependable scheduling, communication, documentation, resident awareness, and consistent results across multiple properties.</p>
          <ul>
            <li>HOAs, communities, commercial sites, and managed properties</li>
            <li>Clear priorities and practical budget options</li>
            <li>A crew that understands accountability and repeat work</li>
          </ul>
          <a href="#property-management">Property management services</a>
        </article>
      </div>
      <div class="care-statement">
        <img src="assets/annie.webp" alt="Annie, the Arborwise owl" width="120" height="120">
        <div>
          <p class="eyebrow">The Arborwise truth</p>
          <blockquote>“We make our living doing tree work. We earn it by telling you what the tree and property actually need—even when the honest answer is less work.”</blockquote>
        </div>
        <a class="button primary" href="#estimate">Get Arborwise on the property</a>
      </div>`;
    serviceSection.setAttribute('aria-labelledby', 'expertise-title');
    const heading = serviceSection.querySelector('h2');
    if (heading) heading.id = 'expertise-title';
  }

  const localSection = document.querySelector('.local-section');
  if (localSection && !document.getElementById('property-management')) {
    const propertySection = document.createElement('section');
    propertySection.className = 'property-management-section';
    propertySection.id = 'property-management';
    propertySection.setAttribute('aria-labelledby', 'property-management-title');
    propertySection.innerHTML = `
      <div class="property-management-copy">
        <p class="eyebrow">For property managers, HOAs, and commercial properties</p>
        <h2 id="property-management-title">One tree concern is a job. A portfolio requires a system.</h2>
        <p>For almost a decade, Arborwise has worked with property-management groups that need the trees handled without creating another problem for the manager. We identify priorities, explain tradeoffs, coordinate access, communicate clearly, complete the work, and leave the site ready for residents, tenants, owners, and boards.</p>
        <div class="management-proof">
          <span><strong>Clear scopes</strong><small>Know what is included and why.</small></span>
          <span><strong>Priority planning</strong><small>Urgent, necessary, and deferrable work separated.</small></span>
          <span><strong>Reliable follow-through</strong><small>Communication before, during, and after the work.</small></span>
        </div>
      </div>
      <aside class="manager-cta">
        <p class="eyebrow">Need Arborwise at a property?</p>
        <h3>Send the address, concern, and photos.</h3>
        <p>We will start with the information you have and arrange the right next step.</p>
        <a class="button primary" href="sms:+19724308330?body=Hi%20Arborwise%2C%20I%20manage%20a%20property%20and%20need%20help%20with%20tree%20work.%20The%20property%20address%20is%3A%20">Text a property concern</a>
        <a class="manager-email" href="mailto:greg@arborwisetreecare.com?subject=Property%20Management%20Tree%20Work">Email property details</a>
      </aside>`;
    localSection.insertAdjacentElement('beforebegin', propertySection);
  }

  const about = document.querySelector('.about-card > div:first-child');
  if (about) {
    about.innerHTML = `
      <p class="eyebrow">Meet Arborwise</p>
      <h2 id="about-title">Greg and Brandon</h2>
      <p>Arborwise is a North Texas tree company built around skilled work, direct answers, and personal accountability. Greg and Brandon inspect the situation, explain the choices, and remain responsible for what is recommended and what happens on the property.</p>
      <p><strong>We want the work.</strong> This is how we make our living. We also care whether the recommendation is right, whether the cuts are correct, whether the property is protected, and whether you are glad Arborwise was the company that showed up.</p>`;
  }

  const css = document.createElement('style');
  css.id = 'expertise-upgrade-styles';
  css.textContent = `
    .expertise-heading{display:grid;grid-template-columns:1.1fr .9fr;gap:54px;align-items:end;margin-bottom:36px}
    .expertise-heading h2{margin-bottom:0}
    .expertise-intro{color:var(--muted);font-size:1.06rem;margin:0 0 6px}
    .expertise-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
    .expertise-card{position:relative;background:var(--paper);border:1px solid var(--line);border-radius:28px;padding:30px;display:flex;flex-direction:column;min-height:540px;overflow:hidden;box-shadow:0 10px 32px rgba(18,63,47,.06)}
    .expertise-card:before{content:"";position:absolute;inset:0 0 auto;height:7px;background:var(--leaf)}
    .removal-card:before{background:var(--gold)}
    .management-card:before{background:#5a7890}
    .expertise-number{position:absolute;right:24px;top:20px;font-weight:950;color:#c5d0c9;font-size:1.8rem}
    .expertise-icon{width:58px;height:58px;border-radius:18px;background:#e8f1df;display:grid;place-items:center;color:var(--forest);font-size:1.55rem;margin-bottom:24px}
    .removal-card .expertise-icon{background:#fff1cf;color:#76530d}
    .management-card .expertise-icon{background:#e5edf2;color:#35566b}
    .expertise-card h3{font-family:var(--serif);font-size:1.75rem;margin-bottom:14px}
    .expertise-card>p{color:var(--muted)}
    .expertise-card ul{padding-left:19px;margin:10px 0 26px;color:#405349}
    .expertise-card li{margin-bottom:8px}
    .expertise-card>a{margin-top:auto;font-weight:900;color:var(--leaf)}
    .care-statement{margin-top:20px;background:var(--forest);color:white;border-radius:28px;padding:20px 24px;display:grid;grid-template-columns:110px 1fr auto;gap:22px;align-items:center}
    .care-statement img{width:110px;height:110px;object-fit:contain;animation:annieFloat 5s ease-in-out infinite}
    .care-statement .eyebrow{color:var(--lime);margin-bottom:5px}
    .care-statement blockquote{font-family:var(--serif);font-size:clamp(1.25rem,2vw,1.8rem);line-height:1.25;margin:0;color:#f4f7f5}
    .property-management-section{max-width:1376px;margin:18px auto 80px;padding:58px;background:linear-gradient(135deg,#eaf0f2,#fffdf7);border:1px solid #d6e0e4;border-radius:36px;display:grid;grid-template-columns:1.2fr .8fr;gap:46px;align-items:center}
    .property-management-copy>p:last-of-type{color:var(--muted);font-size:1.04rem}
    .management-proof{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:28px}
    .management-proof span{background:white;border:1px solid #dbe3e5;border-radius:17px;padding:16px;display:flex;flex-direction:column}
    .management-proof strong{color:var(--forest)}
    .management-proof small{color:var(--muted);line-height:1.4;margin-top:5px}
    .manager-cta{background:var(--forest);color:white;border-radius:27px;padding:30px}
    .manager-cta .eyebrow{color:var(--lime)}
    .manager-cta h3{font-family:var(--serif);font-size:1.8rem}
    .manager-cta>p:not(.eyebrow){color:#d9e5df}
    .manager-cta .button{width:100%;margin:8px 0 12px;text-align:center}
    .manager-email{display:block;text-align:center;color:white;font-weight:850}
    .about-card>div:first-child p strong{color:var(--forest)}
    @media(max-width:960px){.expertise-heading,.property-management-section{grid-template-columns:1fr}.expertise-grid{grid-template-columns:1fr}.expertise-card{min-height:0}.management-proof{grid-template-columns:1fr 1fr}.care-statement{grid-template-columns:90px 1fr}.care-statement .button{grid-column:1/-1}}
    @media(max-width:720px){.expertise-heading{gap:18px}.expertise-grid{gap:12px}.expertise-card{padding:25px;border-radius:24px}.care-statement{grid-template-columns:90px 1fr;padding:18px}.care-statement img{width:90px;height:90px}.care-statement blockquote{font-size:1.12rem}.property-management-section{margin:0 14px 58px;padding:28px 20px;border-radius:27px;gap:25px}.management-proof{grid-template-columns:1fr}.manager-cta{padding:24px}}
  `;
  document.head.appendChild(css);
})();
