(() => {
  const propertyCopy = document.querySelector('.property-management-copy');
  if (!propertyCopy || propertyCopy.querySelector('.management-client-proof')) return;

  const proof = document.createElement('div');
  proof.className = 'management-client-proof';
  proof.setAttribute('aria-label', 'Property management experience');
  proof.innerHTML = `
    <p>Property-management experience includes work on properties for:</p>
    <div class="management-client-names">
      <span>Goodwin &amp; Company</span>
      <span>SBB Management</span>
      <span>Kanam Realty</span>
      <span>and others</span>
    </div>`;

  const managementProof = propertyCopy.querySelector('.management-proof');
  if (managementProof) {
    managementProof.insertAdjacentElement('beforebegin', proof);
  } else {
    propertyCopy.appendChild(proof);
  }

  const style = document.createElement('style');
  style.id = 'management-client-proof-styles';
  style.textContent = `
    .management-client-proof{margin:24px 0 0;padding:18px 20px;background:rgba(255,255,255,.78);border:1px solid #d6e0e4;border-radius:20px}
    .management-client-proof>p{margin:0 0 11px;color:var(--muted);font-size:.8rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em}
    .management-client-names{display:flex;flex-wrap:wrap;gap:8px}
    .management-client-names span{display:inline-flex;align-items:center;min-height:36px;padding:7px 11px;background:white;border:1px solid #d9e2e4;border-radius:999px;color:var(--forest);font-size:.88rem;font-weight:850;line-height:1.2}
    .management-client-names span:last-child{background:transparent;color:var(--muted);font-style:italic;font-weight:750}
    @media(max-width:520px){
      .management-client-proof{padding:16px}
      .management-client-names{display:grid;grid-template-columns:1fr}
      .management-client-names span{justify-content:center;text-align:center}
    }`;
  document.head.appendChild(style);
})();
