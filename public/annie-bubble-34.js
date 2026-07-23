'use strict';
(() => {
  const annie = document.getElementById('annieButton');
  const bubble = document.getElementById('annieBubble');
  if (!annie || !bubble) return;

  const messages = [
    'Six approved SBB tree replacements still need scheduling.',
    'Friday has four approved mowing stops assigned to KW Landscaping.',
    'Saturday: Rick 8–12, Deborah 12–1, Johanna 1–5.',
    'Dana and Tom are scheduled for Saturday; start time is not entered.',
    'Completed work can always be reopened.'
  ];

  bubble.setAttribute('role', 'status');
  bubble.setAttribute('aria-live', 'polite');

  const hide = () => {
    bubble.hidden = true;
    annie.setAttribute('aria-expanded', 'false');
    clearTimeout(window.annieTimer);
  };

  const show = () => {
    const next = messages[Math.floor(Math.random() * messages.length)];
    bubble.textContent = next;
    bubble.scrollTop = 0;
    bubble.hidden = false;
    annie.setAttribute('aria-expanded', 'true');
    clearTimeout(window.annieTimer);
    window.annieTimer = setTimeout(hide, 8000);
  };

  annie.setAttribute('aria-controls', 'annieBubble');
  annie.setAttribute('aria-expanded', 'false');
  annie.onclick = event => {
    event.stopPropagation();
    if (bubble.hidden) show();
    else hide();
  };

  bubble.onclick = event => event.stopPropagation();
  document.addEventListener('click', event => {
    if (!bubble.hidden && !bubble.contains(event.target) && !annie.contains(event.target)) hide();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') hide();
  });
})();