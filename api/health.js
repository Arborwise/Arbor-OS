import {json} from '../lib/http.js';
import {qboConfigured} from '../lib/qbo.js';
import {googleConfigured} from '../lib/google.js';
export default async function handler(req,res){json(res,200,{ok:true,service:'Arborwise OS',databaseConfigured:Boolean(process.env.DATABASE_URL),quickbooksConfigured:qboConfigured(),googleConfigured:googleConfigured()});}
