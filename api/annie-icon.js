import fs from 'node:fs';

const anniePath = new URL('../public/assets/annie-main-icon.png', import.meta.url);
let cachedSvg = '';

function buildIcon() {
  if (cachedSvg) return cachedSvg;
  const pngBase64 = fs.readFileSync(anniePath).toString('base64');
  cachedSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="Annie — Arborwise OS">
  <rect width="512" height="512" rx="104" fill="#f7f2e8"/>
  <circle cx="256" cy="256" r="226" fill="#17402b"/>
  <circle cx="256" cy="256" r="207" fill="#f7f2e8"/>
  <image href="data:image/png;base64,${pngBase64}" x="64" y="70" width="384" height="367" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  return cachedSvg;
}

export default function handler(_request, response) {
  response.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  response.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  response.status(200).send(buildIcon());
}
