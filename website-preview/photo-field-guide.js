(() => {
  const body = document.body;
  const enabledCities = new Set(['Anna', 'Melissa', 'Celina', 'Van Alstyne']);
  if (!body.dataset.photoGuide && !enabledCities.has(body.dataset.campaignCity || '')) return;

  const city = body.dataset.campaignCity || body.dataset.localCity || 'North Texas';
  const insertionPoint = document.querySelector('.local-links') || document.querySelector('.cta');
  if (!insertionPoint || document.querySelector('.photo-field-guide')) return;

  const section = document.createElement('section');
  section.className = 'photo-field-guide';
  section.setAttribute('aria-labelledby', 'photo-guide-title');
  section.innerHTML = `
    <div class="photo-guide-heading">
      <p class="eyebrow">Real examples from Arborwise</p>
      <h2 id="photo-guide-title">What should it look like—and what should it not?</h2>
      <p>These photographs help you recognize patterns. They do not diagnose the exact cause. Species, timing, roots, soil, weather, construction, and the whole tree still matter.</p>
    </div>

    <div class="photo-guide-group">
      <div class="photo-guide-label good">What good work looks like</div>
      <div class="photo-guide-grid good-grid">
        <figure class="photo-card wide">
          <img src="https://drive.google.com/thumbnail?id=1yoWynjHbEVJb-y70t6JEbRICalWHFCES&sz=w1200" alt="Arborwise climber positioned in a mature canopy for selective pruning" loading="lazy">
          <figcaption><strong>Selective pruning with a clear objective</strong><span>Reach the branch, control the cut, protect the canopy, and avoid stripping the tree.</span></figcaption>
        </figure>
        <figure class="photo-card wide">
          <img src="https://drive.google.com/thumbnail?id=1LijlL07ECKZpdXxbfg3Huy4fqEQWEjzL&sz=w1200" alt="Arborwise crew controlling a tree removal near homes and fences" loading="lazy">
          <figcaption><strong>Controlled removal near property</strong><span>A climber, ground crew, ropes, and a plan—not branches dropped wherever they fall.</span></figcaption>
        </figure>
        <figure class="photo-card">
          <img src="https://drive.google.com/thumbnail?id=1WhumEjxBNU6RAYI0tRzx7uHlOwt4MgX7&sz=w1200" alt="Healthy young tree with a full green canopy and visible trunk" loading="lazy">
          <figcaption><strong>A healthy-looking pattern</strong><span>Even foliage and a balanced canopy are useful reference points, although appearance alone never proves perfect health.</span></figcaption>
        </figure>
      </div>
    </div>

    <div class="photo-guide-group">
      <div class="photo-guide-label avoid">What should make you stop and look closer</div>
      <div class="photo-guide-grid concern-grid">
        <figure class="photo-card volcano">
          <img src="https://drive.google.com/thumbnail?id=1oZBplqRtamw7rwSPRdIcEuYcWWEsf-7Z&sz=w1200" alt="Mulch piled high against the trunk of a young tree" loading="lazy">
          <figcaption><strong>Mulch volcano: what not to do</strong><span>Keep mulch off the trunk and leave the trunk flare visible. A deep mound can hold moisture against bark and hide problems.</span></figcaption>
        </figure>
        <figure class="photo-card">
          <img src="https://drive.google.com/thumbnail?id=1MnqCRhOoAiOOEZnKgUTWE0cGXBtYod1d&sz=w1200" alt="Large surface roots constrained by a small hard tree ring" loading="lazy">
          <figcaption><strong>Roots fighting the landscape</strong><span>Small rings, grade changes, compacted soil, and hardscape can conflict with a mature root system.</span></figcaption>
        </figure>
        <figure class="photo-card">
          <img src="https://drive.google.com/thumbnail?id=1pLI0pAVG_hCaInN_dbVSNcNyHBZj2O-t&sz=w1200" alt="Tree canopy with pale, curled, and discolored leaves" loading="lazy">
          <figcaption><strong>Leaf discoloration or curling</strong><span>Water, roots, soil, heat, insects, disease, or several factors may be involved. Photograph the whole pattern.</span></figcaption>
        </figure>
        <figure class="photo-card">
          <img src="https://drive.google.com/thumbnail?id=1nEf48sLXZ4VMILaTh54KS_l2GfBjspR7&sz=w1200" alt="Tree canopy with dead tips and sparse foliage" loading="lazy">
          <figcaption><strong>Dead tips or a thinning canopy</strong><span>The canopy often shows stress before the cause is obvious. Do not diagnose from one twig.</span></figcaption>
        </figure>
        <figure class="photo-card">
          <img src="https://drive.google.com/thumbnail?id=13tZ5v_LA7W1tdbNK_QLPYS39GknrJH9h&sz=w1200" alt="Large open trunk wound and cavity near the base of a mature tree" loading="lazy">
          <figcaption><strong>A cavity is evidence—not a verdict</strong><span>Location, remaining sound wood, movement, species, roots, and what could be struck all matter.</span></figcaption>
        </figure>
      </div>
    </div>

    <div class="photo-games">
      <article class="photo-game annie-game">
        <div class="game-copy">
          <p class="eyebrow">Where’s Annie?</p>
          <h3>Can you find Arborwise’s owl?</h3>
          <p>She is watching from one of the trees. Find her before you reveal the answer.</p>
          <button type="button" class="game-button" data-game="annie" aria-expanded="false">Reveal Annie</button>
        </div>
        <div class="game-image">
          <img src="https://drive.google.com/thumbnail?id=1-K53gqao45PNVy60ZvXcmwUF9zF6d49C&sz=w1600" alt="Busy illustrated forest scene containing a hidden Annie owl" loading="lazy">
          <span class="game-marker annie-marker" aria-hidden="true"></span>
        </div>
      </article>

      <article class="photo-game climber-game">
        <div class="game-copy">
          <p class="eyebrow">Find the climber</p>
          <h3>Some tree work almost disappears into the canopy.</h3>
          <p>Look carefully before revealing the person working high in the tree.</p>
          <button type="button" class="game-button" data-game="climber" aria-expanded="false">Reveal the climber</button>
        </div>
        <div class="game-image">
          <img src="https://drive.google.com/thumbnail?id=1cHGO7Lyjr_pPn7BTFySYFKNaKhQi9B3J&sz=w1200" alt="Arborwise climber partly hidden in a leafy canopy" loading="lazy">
          <span class="game-marker climber-marker" aria-hidden="true"></span>
        </div>
      </article>
    </div>

    <div class="photo-guide-cta">
      <div><strong>Seeing one of these patterns in ${city}?</strong><span>Text the whole tree, the concern, and the trunk base with surrounding ground.</span></div>
      <a href="sms:+19724308330?body=I%20am%20sending%203%20tree%20photos%3A%20whole%20tree%2C%20concern%2C%20and%20trunk%20base.">Text three photos</a>
    </div>`;

  insertionPoint.insertAdjacentElement('beforebegin', section);
  section.querySelectorAll('img').forEach(img => { img.referrerPolicy = 'no-referrer'; });

  section.querySelectorAll('.game-button').forEach(button => {
    button.addEventListener('click', () => {
      const article = button.closest('.photo-game');
      const revealed = article.classList.toggle('revealed');
      button.setAttribute('aria-expanded', String(revealed));
      button.textContent = revealed
        ? (button.dataset.game === 'annie' ? 'Hide Annie' : 'Hide the marker')
        : (button.dataset.game === 'annie' ? 'Reveal Annie' : 'Reveal the climber');
    });
  });

  const style = document.createElement('style');
  style.id = 'photo-field-guide-styles';
  style.textContent = `
    .photo-field-guide{max-width:1196px;margin:0 auto 72px;padding:58px 22px;border-top:1px solid var(--line)}
    .photo-guide-heading{max-width:820px;margin-bottom:34px}.photo-guide-heading h2{font-family:var(--serif);font-size:clamp(2.15rem,4.6vw,3.8rem);line-height:1.03;margin:0 0 16px;color:var(--forest)}.photo-guide-heading>p:last-child{color:var(--muted);font-size:1.03rem}
    .photo-guide-group{margin-top:34px}.photo-guide-label{display:inline-flex;padding:8px 12px;border-radius:999px;font-weight:950;font-size:.75rem;text-transform:uppercase;letter-spacing:.11em;margin-bottom:14px}.photo-guide-label.good{background:#dfeeda;color:var(--forest)}.photo-guide-label.avoid{background:#fff0d0;color:#714b00}
    .photo-guide-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.photo-card{margin:0;background:white;border:1px solid var(--line);border-radius:24px;overflow:hidden;box-shadow:0 10px 28px rgba(18,63,47,.07)}.photo-card img{width:100%;height:260px;object-fit:cover}.photo-card.volcano img{object-position:center bottom}.photo-card figcaption{padding:18px 19px 21px}.photo-card strong{display:block;font-family:var(--serif);font-size:1.2rem;color:var(--forest);margin-bottom:6px}.photo-card span{display:block;color:var(--muted);font-size:.91rem;line-height:1.45}
    .photo-games{display:grid;grid-template-columns:1fr 1fr;gap:17px;margin-top:44px}.photo-game{background:var(--deep);color:white;border-radius:28px;overflow:hidden;border:1px solid rgba(255,255,255,.09)}.game-copy{padding:25px 25px 20px}.game-copy h3{font-family:var(--serif);font-size:1.7rem;line-height:1.08;margin:0 0 9px}.game-copy p:not(.eyebrow){color:#d7e5de;margin:0 0 16px}.game-button{border:1px solid rgba(255,255,255,.45);background:transparent;color:white;border-radius:999px;padding:10px 15px;font-weight:900;cursor:pointer}.game-image{position:relative;background:#dce8d5}.game-image img{display:block;width:100%;height:auto}.game-marker{position:absolute;width:42px;height:42px;border:4px solid #e5ff78;border-radius:50%;box-shadow:0 0 0 7px rgba(18,63,47,.55),0 0 20px rgba(229,255,120,.8);opacity:0;transform:scale(.5);transition:.22s ease}.revealed .game-marker{opacity:1;transform:scale(1)}.annie-marker{left:87.2%;top:34.2%}.climber-marker{left:48.3%;top:57.5%}
    .photo-guide-cta{margin-top:22px;padding:20px 22px;border-radius:22px;background:#eff4e7;border:1px solid #d4e2c9;display:flex;align-items:center;justify-content:space-between;gap:20px}.photo-guide-cta strong{display:block;font-family:var(--serif);font-size:1.25rem;color:var(--forest)}.photo-guide-cta span{display:block;color:var(--muted)}.photo-guide-cta a{white-space:nowrap;background:var(--forest);color:white;text-decoration:none;font-weight:900;padding:11px 15px;border-radius:999px}
    @media(max-width:900px){.photo-guide-grid{grid-template-columns:1fr 1fr}.photo-games{grid-template-columns:1fr}}
    @media(max-width:650px){.photo-field-guide{padding:48px 13px;margin-bottom:55px}.photo-guide-heading{text-align:center}.photo-guide-grid{grid-template-columns:1fr}.photo-card img{height:280px}.photo-guide-label{display:flex;width:max-content;margin-left:auto;margin-right:auto}.photo-guide-cta{display:block;text-align:center}.photo-guide-cta a{display:inline-flex;margin-top:13px}.game-copy{text-align:center}.game-marker{width:34px;height:34px}}
  `;
  document.head.appendChild(style);
})();
