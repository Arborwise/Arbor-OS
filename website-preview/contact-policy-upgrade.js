(() => {
  const PUBLIC_EMAIL = 'greg@arborwisetreecare.com';

  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    const href = link.getAttribute('href') || '';
    const query = href.includes('?') ? href.slice(href.indexOf('?')) : '';
    link.setAttribute('href', `mailto:${PUBLIC_EMAIL}${query}`);
  });

  document.querySelectorAll('a').forEach(link => {
    if (link.textContent.trim().toLowerCase() === 'info@arborwisetreecare.com') {
      link.textContent = PUBLIC_EMAIL;
    }
  });

  const footerEmail = [...document.querySelectorAll('.site-footer a')]
    .find(link => (link.getAttribute('href') || '').startsWith('mailto:'));
  if (footerEmail) footerEmail.textContent = PUBLIC_EMAIL;

  const trustRow = document.querySelector('.trust-row');
  if (trustRow && ![...trustRow.children].some(item => item.textContent.includes('Priority Storm-Damage Response'))) {
    const stormTrust = document.createElement('span');
    stormTrust.textContent = 'Priority Storm-Damage Response';
    trustRow.appendChild(stormTrust);
  }

  document.querySelectorAll('h3, p, span, strong').forEach(element => {
    if (element.children.length) return;
    element.textContent = element.textContent
      .replace(/24\/?7 emergency tree service/gi, 'priority storm-damage response')
      .replace(/24-hour emergency tree service/gi, 'priority storm-damage response')
      .replace(/emergency tree service/gi, 'priority storm-damage response');
  });

  const structuredData = document.querySelector('script[type="application/ld+json"]');
  if (structuredData) {
    try {
      const data = JSON.parse(structuredData.textContent);
      const business = data['@graph']?.find(item => item['@id'] === 'https://arborwisetreecare.com/#business');
      if (business) {
        business.email = PUBLIC_EMAIL;
        business.slogan = 'Nurture Your Nature';
        business.description = 'Master-level tree pruning, expert tree removal, priority storm-damage response, tree risk assessment, and property-management tree services for Collin County, Grayson County, and nearby North Texas communities.';
      }
      structuredData.textContent = JSON.stringify(data);
    } catch (error) {
      console.warn('Could not update Arborwise contact and storm-response data.', error);
    }
  }

  const customerViewUpgrade = document.createElement('script');
  customerViewUpgrade.src = 'customer-view-upgrade.js';
  customerViewUpgrade.defer = true;
  document.body.appendChild(customerViewUpgrade);
})();