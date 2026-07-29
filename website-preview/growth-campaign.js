(() => {
  const city = document.body.dataset.campaignCity;
  if (!city) return;

  const code = (document.body.dataset.campaignCode || city).toUpperCase().replace(/[^A-Z0-9]+/g, '-');
  const sourceLabel = `${code} WEBSITE LEAD`;
  const phone = '+19724308330';
  const attributionKey = 'arborwise_attribution';
  const clickKey = 'arborwise_lead_clicks';
  const now = new Date().toISOString();

  const readJson = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch (_) { return fallback; }
  };
  const writeJson = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) {}
  };

  const params = new URLSearchParams(location.search);
  const previous = readJson(attributionKey, {});
  const touch = {
    city,
    source_label: sourceLabel,
    landing_page: location.pathname,
    referrer: document.referrer || previous.last_touch?.referrer || '',
    utm_source: params.get('utm_source') || previous.last_touch?.utm_source || '',
    utm_medium: params.get('utm_medium') || previous.last_touch?.utm_medium || '',
    utm_campaign: params.get('utm_campaign') || previous.last_touch?.utm_campaign || '',
    utm_content: params.get('utm_content') || previous.last_touch?.utm_content || '',
    utm_term: params.get('utm_term') || previous.last_touch?.utm_term || '',
    gclid: params.get('gclid') || previous.last_touch?.gclid || '',
    fbclid: params.get('fbclid') || previous.last_touch?.fbclid || '',
    captured_at: now
  };
  const attribution = { first_touch: previous.first_touch || touch, last_touch: touch };
  writeJson(attributionKey, attribution);

  const attributionSummary = () => {
    const last = readJson(attributionKey, attribution).last_touch || touch;
    return [
      last.utm_source && `Source: ${last.utm_source}`,
      last.utm_medium && `Medium: ${last.utm_medium}`,
      last.utm_campaign && `Campaign: ${last.utm_campaign}`,
      last.utm_content && `Content: ${last.utm_content}`,
      last.gclid && `Google click: ${last.gclid}`,
      last.fbclid && `Facebook click: ${last.fbclid}`
    ].filter(Boolean).join(' | ');
  };

  const pushEvent = (channel, detail = '') => {
    const event = {
      event: 'arborwise_lead_action',
      lead_city: city,
      lead_source: sourceLabel,
      lead_channel: channel,
      lead_detail: detail,
      page_path: location.pathname,
      first_touch: attribution.first_touch,
      last_touch: attribution.last_touch,
      occurred_at: new Date().toISOString()
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
    const stored = readJson(clickKey, []);
    stored.push(event);
    writeJson(clickKey, stored.slice(-100));
  };

  const decorateSms = link => {
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('sms:')) return;
    const bodyMatch = href.match(/[?&]body=([^&]*)/);
    const existing = bodyMatch ? decodeURIComponent(bodyMatch[1]) : '';
    const clean = existing.replace(/^\[[^\]]+ WEBSITE LEAD\]\s*/i, '').replace(/\nAttribution:.*$/s, '');
    const source = attributionSummary();
    const message = [`[${sourceLabel}] ${clean}`.trim(), source && `Attribution: ${source}`].filter(Boolean).join('\n');
    link.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
    link.dataset.leadSource = sourceLabel;
    link.addEventListener('click', () => pushEvent('text', link.textContent.trim()));
  };

  const decorateEmail = link => {
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('mailto:')) return;
    const address = href.slice(7).split('?')[0];
    const emailParams = new URLSearchParams(href.includes('?') ? href.split('?')[1] : '');
    const subject = emailParams.get('subject') || `${city} Tree Question`;
    emailParams.set('subject', `[${sourceLabel}] ${subject.replace(/^\[[^\]]+ WEBSITE LEAD\]\s*/i, '')}`);
    const source = attributionSummary();
    if (source) {
      const body = emailParams.get('body') || '';
      emailParams.set('body', `${body}${body ? '\n\n' : ''}Attribution: ${source}`);
    }
    link.href = `mailto:${address}?${emailParams.toString()}`;
    link.dataset.leadSource = sourceLabel;
    link.addEventListener('click', () => pushEvent('email', link.textContent.trim()));
  };

  document.querySelectorAll('a[href^="sms:"]').forEach(decorateSms);
  document.querySelectorAll('a[href^="mailto:"]').forEach(decorateEmail);
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.dataset.leadSource = sourceLabel;
    link.addEventListener('click', () => pushEvent('call', link.textContent.trim()));
  });

  document.querySelectorAll('a[href^="/"]').forEach(link => {
    const raw = link.getAttribute('href');
    if (!raw || raw.startsWith('//')) return;
    const url = new URL(raw, location.origin);
    if (url.pathname === location.pathname && url.hash === location.hash) return;
    url.searchParams.set('utm_source', `${code.toLowerCase()}_local_page`);
    url.searchParams.set('utm_medium', 'internal');
    url.searchParams.set('utm_campaign', 'growth_2026');
    url.searchParams.set('utm_content', location.pathname.replace(/^\/+|\/+$/g, '') || code.toLowerCase());
    link.href = `${url.pathname}${url.search}${url.hash}`;
  });

  const cta = document.querySelector('.cta');
  if (cta && !document.querySelector('.fast-estimate')) {
    const section = document.createElement('section');
    section.className = 'fast-estimate';
    section.setAttribute('aria-labelledby', 'fast-estimate-title');
    section.innerHTML = `
      <div class="fast-estimate-copy">
        <p class="eyebrow">Fast first answer</p>
        <h2 id="fast-estimate-title">Tell Arborwise what is happening in ${city}.</h2>
        <p>This opens a text already labeled <strong>${sourceLabel}</strong>. Add three photos: the whole tree, the concern, and the trunk base.</p>
      </div>
      <form class="fast-estimate-form">
        <label>Name<input name="name" autocomplete="name" required></label>
        <label>Property address or ZIP<input name="location" autocomplete="street-address" required></label>
        <label>What do you need?
          <select name="concern" required>
            <option value="">Choose one</option>
            <option>Tree trimming or pruning</option>
            <option>Dead or broken limb</option>
            <option>Tree removal</option>
            <option>Storm damage</option>
            <option>Tree health or decline question</option>
            <option>HOA, commercial, or property-management work</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label>What changed or concerns you?<textarea name="details" rows="3" required></textarea></label>
        <button class="button primary" type="submit">Open labeled text</button>
        <a class="fast-call" href="tel:${phone}">Call Arborwise instead</a>
      </form>`;
    cta.insertAdjacentElement('beforebegin', section);

    section.querySelector('a[href^="tel:"]').addEventListener('click', () => pushEvent('call', 'fast estimate call'));
    section.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const source = attributionSummary();
      const message = [
        `[${sourceLabel}]`,
        `Name: ${data.get('name')}`,
        `Property: ${data.get('location')}`,
        `Need: ${data.get('concern')}`,
        `Details: ${data.get('details')}`,
        'I can add photos of the whole tree, concern area, and trunk base.',
        source && `Attribution: ${source}`
      ].filter(Boolean).join('\n');
      pushEvent('text_form', String(data.get('concern') || ''));
      location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    .growth-proof{max-width:1196px;margin:0 auto 72px;padding:26px 30px;border:1px solid #d5e2cf;background:#eff4e7;border-radius:25px;display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:center}
    .growth-proof strong{font-family:var(--serif);font-size:2rem;color:var(--forest)}
    .growth-proof p{margin:0;color:var(--muted)}.growth-proof a{font-weight:850;color:var(--forest)}
    .fast-estimate{max-width:1196px;margin:0 auto 72px;padding:48px;border-radius:35px;background:white;border:1px solid var(--line);box-shadow:0 16px 42px rgba(18,63,47,.08);display:grid;grid-template-columns:.85fr 1.15fr;gap:40px}
    .fast-estimate h2{font-family:var(--serif);font-size:clamp(2rem,4vw,3.35rem);line-height:1.04;margin:0 0 14px;color:var(--forest)}
    .fast-estimate-copy>p:last-child{color:var(--muted)}
    .fast-estimate-form{display:grid;grid-template-columns:1fr 1fr;gap:13px}.fast-estimate-form label{display:grid;gap:6px;font-weight:850;color:var(--forest);font-size:.86rem}
    .fast-estimate-form label:nth-child(3),.fast-estimate-form label:nth-child(4),.fast-estimate-form .button,.fast-call{grid-column:1/-1}
    .fast-estimate-form input,.fast-estimate-form select,.fast-estimate-form textarea{width:100%;border:1px solid #cbd8c5;border-radius:13px;padding:12px 13px;background:#fffdf7;color:var(--ink);font:inherit}
    .fast-estimate-form textarea{resize:vertical}.fast-estimate-form .button{border:0;cursor:pointer}.fast-call{text-align:center;font-weight:900;color:var(--forest)}
    @media(max-width:750px){.growth-proof{margin:0 13px 55px;padding:22px;grid-template-columns:1fr;text-align:center}.fast-estimate{margin:0 13px 55px;padding:30px 20px;grid-template-columns:1fr;border-radius:27px}.fast-estimate-copy{text-align:center}.fast-estimate-form{grid-template-columns:1fr}.fast-estimate-form label,.fast-estimate-form label:nth-child(3),.fast-estimate-form label:nth-child(4),.fast-estimate-form .button,.fast-call{grid-column:1}}
  `;
  document.head.appendChild(style);

  if (!document.querySelector('script[src="/photo-field-guide.js"]')) {
    const photoGuide = document.createElement('script');
    photoGuide.src = '/photo-field-guide.js';
    photoGuide.defer = true;
    document.body.appendChild(photoGuide);
  }
})();