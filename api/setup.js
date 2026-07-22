import {json,fail,method} from '../lib/http.js';
import {requireSession} from '../lib/auth.js';
import {initDb,db} from '../lib/db.js';
import {repairSeededQuickBooksRows} from '../lib/repair.js';

const equipment=[
 {id:'TRK-1',name:'2022 Chevy 2500 HD',group:'Vehicles & Trailers',task:'Wash inside and out weekly. Check tire pressure weekly.',fuel:null},
 {id:'DMP-1',name:'16-foot dump trailer (lowboy)',group:'Vehicles & Trailers',task:'Grease and wash weekly. Check tires, brakes, lights, hitch, chains, wiring and doors.',fuel:null},
 {id:'FLT-1',name:'16-foot flatbed trailer',group:'Vehicles & Trailers',task:'Inspect deck, tires, lights, hitch, chains and tie-down points weekly.',fuel:null},
 {id:'BLWR-1',name:'Stihl backpack blower',group:'Saws & Power Tools',task:'Blow out air filter weekly. Inspect condition and controls.',fuel:'2026-10-02'},
 {id:'PP-1',name:'Stihl power pruner 1',group:'Saws & Power Tools',task:'Inspect air filter, saw head, chain sharpness and pole condition.',fuel:'2026-10-02'},
 {id:'PP-2',name:'Stihl power pruner 2',group:'Saws & Power Tools',task:'Inspect air filter, saw head, chain sharpness and pole condition.',fuel:'2026-10-02'},
 {id:'CS-1',name:'Stihl MS 500i chainsaw',group:'Saws & Power Tools',task:'Clean air filter and cover; inspect and sharpen chain.',fuel:'2026-10-02'},
 {id:'CS-2',name:'Stihl MS 261 chainsaw',group:'Saws & Power Tools',task:'Clean air filter and cover; inspect and sharpen chain.',fuel:'2026-10-02'},
 {id:'CS-3',name:'Stihl MS 194 chainsaw',group:'Saws & Power Tools',task:'Clean air filter and cover; inspect and sharpen chain.',fuel:'2026-10-02'},
 {id:'CS-4',name:'Echo CS400 chainsaw',group:'Saws & Power Tools',task:'Clean air filter and cover; inspect and sharpen chain.',fuel:'2026-10-02'},
 {id:'AUG-1',name:'Stihl auger drill',group:'Saws & Power Tools',task:'Inspect air filter, auger and controls.',fuel:'2026-10-02'},
 {id:'HT-1',name:'Stihl hedge trimmers / attachment',group:'Saws & Power Tools',task:'Clean and inspect air filter and cutting head.',fuel:'2026-10-02'},
 {id:'DRILL-1',name:'Milwaukee drill with 5-foot bit',group:'Saws & Power Tools',task:'Inspect battery, chuck, bit, fasteners and condition.',fuel:null},
 {id:'POLES',name:'6 manual poles',group:'Climbing & Rigging',task:'Inspect for breaks, cracks, bends and unsafe wear.',fuel:null},
 {id:'HEADS-SAW',name:'Saw heads',group:'Climbing & Rigging',task:'Account for and clean every saw head. Report unsafe wear.',fuel:null},
 {id:'HEADS-PRUNER',name:'Pruning heads',group:'Climbing & Rigging',task:'Clean with bleach and sharpen weekly.',fuel:null},
 {id:'CLIMB',name:'Climbing gear',group:'Climbing & Rigging',task:'Inspect ropes, saddles, carabiners, friction devices and wear points.',fuel:null},
 {id:'RIG',name:'Rigging gear including quarter wraps',group:'Climbing & Rigging',task:'Inspect ropes, blocks, slings, hardware and wear points.',fuel:null},
 {id:'PORTA',name:'Porta-Wrap',group:'Climbing & Rigging',task:'Inspect attachment point, welds, surface damage and hardware.',fuel:null}
];
const current=[
 ['2019','Sicily Laguna Azure','Mow, edge, pull weeds - 3004 Cremini Falls',162.38,'KW'],['2018','Sicily Laguna Azure','Mow, edge, pull weeds - 3007 Isla Terrace',162.38,'KW'],['2017','Venetian HOA','Mow, edge, pull weeds - 437 Hoot Owl',162.38,'KW'],['2016','Venetian HOA','Mow, edge, pull weeds - 1737 Barnwood',162.38,'KW'],['2015','Sicily Laguna Azure','Tree removal and replacement - 517 Parrino Parkway',866,'SBB'],['2014','Sicily Laguna Azure','Tree removal and replacement - 3116 Lucia Way',866,'SBB'],['2013','Sicily Laguna Azure','Tree removal and replacement - 3016 Isla Terrace',866,'SBB'],['2012','Sicily Laguna Azure','Tree removal and replacement - 3107 Lucia Way',866,'SBB'],['2011','Sicily Laguna Azure','Tree removal and replacement - 2902 Cremini Falls',866,'SBB'],['2010','Sicily Laguna Azure','Tree removal and replacement - 3110 Giovanni Way',866,'SBB']
];
function splitService(value){const parts=String(value).split(' - ');return {service:parts[0],address:parts.slice(1).join(' - ')};}
export default async function handler(req,res){
  try{
    method(req,['POST']);requireSession(req);
    if(!process.env.DATABASE_URL)return json(res,200,{ok:true,localMode:true,equipment:equipment.length,seededEstimates:current.length,seededJobs:0});
    await initDb();
    for(const e of equipment)await db().query(`insert into equipment(id,name,group_name,task,fuel_filter_due) values($1,$2,$3,$4,$5) on conflict(id) do update set name=excluded.name,group_name=excluded.group_name,task=excluded.task,fuel_filter_due=excluded.fuel_filter_due,updated_at=now()`,[e.id,e.name,e.group,e.task,e.fuel]);
    for(const [doc,customer,rawService,total,category] of current){const {service,address}=splitService(rawService);await db().query(`insert into records(id,source,source_id,kind,category,customer_name,address,service,description,amount,status,assigned_to,follow_up_date,notes,closed,raw,updated_at) values($1,'seed',$2,'est',$3,$4,$5,$6,$7,$8,'Estimate Sent','Greg','2026-07-24',$9,false,$10,now()) on conflict(id) do nothing`,[doc,`seed-est:${doc}`,category,customer,address,service,rawService,total,'QuickBooks estimate was pending as of July 21, 2026. Follow up before creating a work order.',{doc,customer,rawService,total,category}]);}
    await repairSeededQuickBooksRows();
    json(res,200,{ok:true,localMode:false,equipment:equipment.length,seededEstimates:current.length,seededJobs:0});
  }catch(e){fail(res,e);}
}
