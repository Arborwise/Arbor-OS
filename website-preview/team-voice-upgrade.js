(() => {
  const aboutTitle = document.getElementById('about-title');
  if (aboutTitle) aboutTitle.textContent = 'Greg, Brandon & the Arborwise Team';

  const aboutCopy = document.querySelector('.about-card > div:first-child');
  if (aboutCopy) {
    aboutCopy.innerHTML = `
      <p class="eyebrow">Meet Arborwise</p>
      <h2 id="about-title">Greg, Brandon &amp; the Arborwise Team</h2>
      <p>Arborwise is a North Texas tree company built around skilled work, direct answers, and personal accountability. Greg and Brandon help lead the decisions, and the entire Arborwise team carries that standard onto every property.</p>
      <p><strong>We want the work.</strong> This is how we make our living. We also care whether the recommendation is right, whether every cut has a reason, whether the property is protected, and whether you are glad Arborwise was the company that showed up.</p>
      <p class="team-signature"><strong>Nurture Your Nature</strong> means caring for the tree, the property, and the people trusting us with both.</p>`;
  }

  document.querySelectorAll('.desktop-nav a, .site-footer a').forEach(link => {
    if (/Greg\s*&\s*Brandon/i.test(link.textContent)) link.textContent = 'Our Team';
  });

  const heroLead = document.querySelector('.hero-lead');
  if (heroLead) heroLead.textContent = 'Greg, Brandon, and the whole Arborwise team help North Texas homeowners, businesses, HOAs, and property managers understand their trees and choose the right work, not simply the biggest job.';

  const storyIntro = document.querySelector('.stories-intro > p:last-child');
  if (storyIntro) storyIntro.textContent = 'Real Arborwise work should teach you something: how we climbed it, why we pruned it, how we controlled it, what we protected, and what the customer needed to know next.';

  const style = document.createElement('style');
  style.id = 'team-voice-upgrade-styles';
  style.textContent = `
    .team-signature{margin-top:18px;padding:16px 18px;border-left:4px solid var(--lime);background:#f2f6ec;border-radius:0 16px 16px 0}
    .team-signature strong{display:block;font-family:var(--serif);font-size:1.25rem;margin-bottom:4px}
  `;
  document.head.appendChild(style);

  const localNetwork = document.createElement('script');
  localNetwork.src = 'local-network-upgrade.js';
  localNetwork.defer = true;
  document.body.appendChild(localNetwork);
})();