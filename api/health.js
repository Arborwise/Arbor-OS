import {json,fail} from '../lib/http.js';
import {initDb,db,getToken} from '../lib/db.js';
import {qboConfigured} from '../lib/qbo.js';
import {googleConfigured} from '../lib/google.js';
export default async function handler(req,res){try{await initDb();const [rows,q,g]=await Promise.all([db().query('select provider,updated_at,metadata from app_tokens order by provider'),getToken('quickbooks'),getToken('google')]);json(res,200,{ok:true,service:'Arborwise OS',database:true,quickbooks:{configured:qboConfigured(),authorized:Boolean(q)},google:{configured:googleConfigured(),authorized:Boolean(g)},connections:rows.rows});}catch(e){fail(res,e);}}
