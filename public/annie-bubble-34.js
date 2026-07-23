'use strict';
(() => {
  const annie = document.getElementById('annieButton');
  const bubble = document.getElementById('annieBubble');
  if (!annie || !bubble) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const CLOUD_PATH = 'M37 94 C22 98 10 88 15 74 C3 66 6 49 22 44 C17 29 29 16 45 21 C52 7 71 8 79 21 C89 7 108 7 116 20 C129 7 148 12 152 26 C167 15 185 23 185 39 C201 38 211 51 205 65 C217 76 208 92 193 92 C186 105 168 106 158 97 C146 108 128 108 118 97 C106 108 88 107 79 97 C69 105 53 103 47 94 L57 112 L36 97 C36 96 36 95 37 94 Z';

  const messages = [
    'Six approved SBB tree replacements still need scheduling.',
    'Friday has four approved mowing stops assigned to KW Landscaping.',
    'Saturday: Rick 8–12, Deborah 12–1, Johanna 1–5.',
    'Dana and Tom are scheduled for Saturday; start time is not entered.',
    'Completed work can always be reopened.'
  ];

  bubble.setAttribute('role', 'status');
  bubble.setAttribute('aria-live', 'polite');
  bubble.dataset.cloudStyle = 'scalloped-38';
  annie.setAttribute('aria-controls', 'annieBubble');
  annie.setAttribute('aria-expanded', 'false');

  const hide = () => {
    bubble.hidden = true;
    annie.setAttribute('aria-expanded', 'false');
    clearTimeout(window.annieTimer);
  };

  const buildCloud = message => {
    bubble.replaceChildren();

    const art = document.createElementNS(SVG_NS, 'svg');
    art.classList.add('annieCloudArt');
    art.setAttribute('viewBox', '0 0 220 116');
    art.setAttribute('preserveAspectRatio', 'none');
    art.setAttribute('aria-hidden', 'true');
    art.setAttribute('focusable', 'false');

    const shape = document.createElementNS(SVG_NS, 'path');
    shape.classList.add('annieCloudShape');
    shape.setAttribute('d', CLOUD_PATH);
    art.appendChild(shape);

    const cloudText = document.createElement('span');
    cloudText.className = 'annieCloudText';
    if (message.length > 64) cloudText.classList.add('isExtraLong');
    else if (message.length > 52) cloudText.classList.add('isLong');
    cloudText.textContent = message;

    bubble.append(art, cloudText);
  };

  const show = () => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    buildCloud(message);
    bubble.hidden = false;
    annie.setAttribute('aria-expanded', 'true');
    clearTimeout(window.annieTimer);
    window.annieTimer = setTimeout(hide, 8000);
  };

  annie.onclick = event => {
    event.preventDefault();
    event.stopPropagation();
    if (bubble.hidden) show();
    else hide();
  };

  bubble.onclick = event => {
    event.stopPropagation();
    hide();
  };

  document.addEventListener('click', event => {
    if (!bubble.hidden && !bubble.contains(event.target) && !annie.contains(event.target)) hide();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') hide();
  });
})();
