import board from './board.js';
import connections from './connections.js';
import data from './data.js';
import health from './health.js';
import login from './login.js';
import logout from './logout.js';
import records from './records.js';
import setup from './setup.js';
import state from './state.js';

const routes={board,connections,data,health,login,logout,records,setup,state};

export default async function handler(req,res){
  const route=String(req.query?.route||'').toLowerCase();
  const selected=routes[route];
  if(!selected){
    res.statusCode=404;
    res.setHeader('Content-Type','application/json; charset=utf-8');
    return res.end(JSON.stringify({ok:false,error:'API route not found'}));
  }
  const query={...(req.query||{})};
  delete query.route;
  req.query=query;
  return selected(req,res);
}
