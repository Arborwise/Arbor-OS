(() => {
  'use strict';

  document.getElementById('arborwise-annie-faq-v42')?.remove();

  const SHORT_TIPS = new Map([
    ["Hi! I'm Arborwise Annie & we're glad you're here!", "Hi! I'm Annie. Glad you're here!"],
    ['Show us the whole tree, the concern, and the trunk base. Those three views help reveal the pattern.', 'Send the whole tree, concern, and trunk base.'],
    ['A cavity or thinning canopy is a clue, not a diagnosis. Location, movement, and nearby targets matter too.', 'A cavity is a clue—not a verdict.'],
    ['Good pruning has a reason. Every cut should improve structure, clearance, health, or long-term growth.', 'Good pruning always has a reason.'],
    ['Keep mulch off the trunk flare. Mulch belongs over the root zone, not piled against the bark.', 'Keep mulch away from the trunk flare.'],
    ['For a faster estimate, send the property address and clear photos of what has changed.', 'Send the address with clear photos.'],
    ['Good tree work has a reason. Pruning, removal, and planting should each solve a specific problem.', 'Every service should solve a real problem.'],
    ['Planting depth matters. Keep the root flare visible and never pile mulch against the trunk.', 'Plant high enough to show the root flare.'],
    ['A sound recommendation explains what needs action, what can wait, and why.', 'Good advice explains what can wait.'],
    ['Arborwise serves North Texas locally, so the people making the recommendation are accountable for the result.', 'Local crews stay accountable for the result.'],
    ['For a faster estimate, send the address plus photos of the whole tree, the concern, and the trunk base.', 'Send the address and three clear photos.'],
    ['A cavity, lean, or thinning canopy is a clue, not a diagnosis. The whole site matters.', 'Tap a question for the straight answer.']
  ]);

  function compactBubbleText(bubble) {
    if (!bubble) return;
    const current = bubble.textContent.trim();
    const replacement = SHORT_TIPS.get(current);
    if (replacement && replacement !== current) bubble.textContent = replacement;
  }

  function installTextCompactor() {
    const bubbles = [...document.querySelectorAll('.aw-v39-bubble')];
    bubbles.forEach(compactBubbleText);

    const observer = new MutationObserver(records => {
      records.forEach(record => {
        const bubble = record.target.nodeType === Node.TEXT_NODE
          ? record.target.parentElement
          : record.target.closest?.('.aw-v39-bubble') || record.target;
        if (bubble?.classList?.contains('aw-v39-bubble')) compactBubbleText(bubble);
      });
    });

    bubbles.forEach(bubble => observer.observe(bubble, {childList:true, characterData:true, subtree:true}));
  }

  const style = document.createElement('style');
  style.id = 'arborwise-annie-faq-v42';
  style.textContent = `
    /* Compact standard speech balloon: smooth oval, tight air, short tail to Annie's mouth. */
    .aw-v39-guide{width:178px!important;height:118px!important}
    .aw-v39-bubble{
      top:-5px!important;
      width:122px!important;
      min-height:44px!important;
      padding:8px 10px!important;
      border:2px solid #153c30!important;
      border-radius:50% / 46%!important;
      background:#fffdf5!important;
      color:#123d31!important;
      font:850 10.4px/1.22 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      letter-spacing:-.01em!important;
      box-shadow:3px 4px 0 rgba(18,45,35,.14),0 7px 15px rgba(15,48,37,.12)!important;
    }
    .aw-v39-guide.right .aw-v39-bubble{left:4px!important;right:auto!important}
    .aw-v39-guide.left .aw-v39-bubble{right:4px!important;left:auto!important}

    .aw-v39-bubble::before,
    .aw-v39-bubble::after{
      content:""!important;
      position:absolute!important;
      top:auto!important;
      width:0!important;
      height:0!important;
      border-radius:0!important;
      background:transparent!important;
      box-shadow:none!important;
      transform:none!important;
    }
    .aw-v39-guide.right .aw-v39-bubble::before{
      right:16px!important;left:auto!important;bottom:-13px!important;
      border-left:7px solid transparent!important;
      border-right:3px solid transparent!important;
      border-top:13px solid #153c30!important;
      border-bottom:0!important;
    }
    .aw-v39-guide.right .aw-v39-bubble::after{
      right:17px!important;left:auto!important;bottom:-9px!important;
      border-left:5px solid transparent!important;
      border-right:2px solid transparent!important;
      border-top:10px solid #fffdf5!important;
      border-bottom:0!important;
    }
    .aw-v39-guide.left .aw-v39-bubble::before{
      left:16px!important;right:auto!important;bottom:-13px!important;
      border-right:7px solid transparent!important;
      border-left:3px solid transparent!important;
      border-top:13px solid #153c30!important;
      border-bottom:0!important;
    }
    .aw-v39-guide.left .aw-v39-bubble::after{
      left:17px!important;right:auto!important;bottom:-9px!important;
      border-right:5px solid transparent!important;
      border-left:2px solid transparent!important;
      border-top:10px solid #fffdf5!important;
      border-bottom:0!important;
    }

    /* Trial requested by Greg: mirror Annie only when she appears on the left. */
    .aw-v39-guide.left .aw-v39-annie img{
      transform:scaleX(-1)!important;
      transform-origin:center!important;
    }

    /* FAQ section: tighter cards with unmistakable separation and value. */
    html body .faq-section{
      margin-inline:auto!important;
      padding:42px 18px 58px!important;
      background:linear-gradient(180deg,#eef1e7 0%,#f8f2df 100%)!important;
      border-top:1px solid rgba(18,61,49,.14)!important;
    }
    html body .faq-section .section-head{
      max-width:760px!important;
      margin:0 auto 18px!important;
      padding:20px 18px!important;
      border:1px solid rgba(226,181,73,.72)!important;
      border-radius:18px!important;
      background:linear-gradient(145deg,#061e17 0%,#0c3b2c 72%,#09271e 100%)!important;
      box-shadow:0 12px 26px rgba(5,36,27,.2)!important;
    }
    html body .faq-section .section-label{
      color:#d9f378!important;
    }
    html body .faq-section .section-head h2{
      margin-top:8px!important;
      color:#fff6df!important;
      font-size:clamp(2rem,8.5vw,3.4rem)!important;
      line-height:.98!important;
      text-shadow:0 3px 8px rgba(0,0,0,.28)!important;
    }
    html body .faq-list{
      display:grid!important;
      gap:10px!important;
      max-width:820px!important;
      margin:0 auto!important;
    }
    html body .faq-list details{
      --faq-accent:#d9f378;
      margin:0!important;
      border:1px solid color-mix(in srgb,var(--faq-accent) 62%,#ffffff 8%)!important;
      border-left:5px solid var(--faq-accent)!important;
      border-radius:15px!important;
      background:linear-gradient(145deg,#07271e 0%,#0d3c2e 65%,#08251c 100%)!important;
      color:#fff!important;
      box-shadow:0 9px 20px rgba(5,32,24,.2),inset 0 1px rgba(255,255,255,.06)!important;
      overflow:hidden!important;
    }
    html body .faq-list details:nth-child(1){--faq-accent:#d9f378}
    html body .faq-list details:nth-child(2){--faq-accent:#f0c45d}
    html body .faq-list details:nth-child(3){--faq-accent:#8fd6c0}
    html body .faq-list details:nth-child(4){--faq-accent:#f0a75d}
    html body .faq-list summary{
      position:relative!important;
      min-height:0!important;
      padding:14px 42px 14px 16px!important;
      color:#fff8e8!important;
      font:900 clamp(.98rem,3.8vw,1.14rem)/1.25 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      list-style:none!important;
      cursor:pointer!important;
    }
    html body .faq-list summary::-webkit-details-marker{display:none!important}
    html body .faq-list summary::before{
      content:"+"!important;
      position:absolute!important;
      right:14px!important;
      top:50%!important;
      display:grid!important;
      place-items:center!important;
      width:23px!important;
      height:23px!important;
      transform:translateY(-50%)!important;
      border-radius:50%!important;
      background:var(--faq-accent)!important;
      color:#073126!important;
      font:950 1rem/1 system-ui,sans-serif!important;
      box-shadow:0 4px 9px rgba(0,0,0,.24)!important;
    }
    html body .faq-list details[open] summary::before{content:"–"!important}
    html body .faq-list details[open] summary{
      color:var(--faq-accent)!important;
    }
    html body .faq-list details p{
      margin:0!important;
      padding:12px 16px 15px!important;
      border-top:1px solid rgba(255,255,255,.14)!important;
      background:rgba(0,0,0,.12)!important;
      color:#dce9e2!important;
      font-size:.92rem!important;
      line-height:1.45!important;
    }

    @media(max-width:700px){
      .aw-v39-guide{width:170px!important;height:114px!important}
      .aw-v39-bubble{width:116px!important;min-height:42px!important;padding:7px 9px!important;font-size:10px!important}
      html body .faq-section{padding:34px 12px 52px!important}
      html body .faq-section .section-head{padding:17px 14px!important;margin-bottom:12px!important;border-radius:15px!important}
      html body .faq-section .section-head h2{font-size:clamp(1.85rem,9.5vw,2.65rem)!important}
      html body .faq-list{gap:8px!important}
      html body .faq-list details{border-radius:13px!important;border-left-width:4px!important}
      html body .faq-list summary{padding:12px 39px 12px 13px!important;font-size:.96rem!important;line-height:1.22!important}
      html body .faq-list details p{padding:10px 13px 13px!important;font-size:.86rem!important}
    }
  `;

  document.head.appendChild(style);

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (document.querySelector('.aw-v39-bubble')) {
      window.clearInterval(timer);
      installTextCompactor();
    } else if (attempts > 50) {
      window.clearInterval(timer);
    }
  }, 100);
})();