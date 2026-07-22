export function classify(text=''){const t=text.toLowerCase();if(/mow|edg(e|ing)|weed|lawn|landscap|mulch|irrigat|shrub/.test(t))return 'KW';if(/sbbmanagement|sbb management|\bsbb\b/.test(t))return 'SBB';if(/goodwin/.test(t))return 'GOODWIN';if(/kanam/.test(t))return 'KANAM';return 'ARBORWISE';}
export function kindFromStatus(status='',fallback='est'){return /approved|scheduled|in progress|completed|done|invoiced|paid/i.test(status)&&fallback==='job'?'job':fallback;}
export function isClosed(status=''){return /declined|closed|completed|done|paid/i.test(status);}
