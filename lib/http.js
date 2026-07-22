export function json(res, status, body) {
  res.status(status).setHeader('Content-Type','application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}
export function method(req, allowed) {
  if (!allowed.includes(req.method)) { const e=new Error('Method not allowed'); e.status=405; throw e; }
}
export function baseUrl(req) {
  return process.env.APP_URL || `https://${req.headers.host}`;
}
export async function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw=''; for await (const c of req) raw += c;
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { const e=new Error('Invalid JSON'); e.status=400; throw e; }
}
export function fail(res, err) {
  console.error(err);
  json(res, err.status || 500, {ok:false,error:err.message || 'Server error'});
}
