'use strict';
(() => {
  if(typeof state==='undefined'||!Array.isArray(state.records))return;
  const mowIds=new Set(['2016','2017','2018','2019']);
  const treeIds=new Set(['2010','2011','2012','2013','2014','2015']);
  state.records=state.records.filter(record=>!/^WO-20(10|11|12|13|14|15|16|17|18|19)$/.test(String(record.id||'')));
  for(const record of state.records){
    const id=String(record.id||'');
    if(mowIds.has(id)){
      Object.assign(record,{type:'est',status:'Approved',category:'KW',who:'KW Landscaping',workDate:'2026-07-24',workTime:'',followUp:'',notes:'Approved mowing assigned to KW Landscaping for Friday, July 24, 2026.',closed:false});
    }else if(treeIds.has(id)){
      Object.assign(record,{type:'est',status:'Approved',category:'SBB',who:'Greg',workDate:'',workTime:'',followUp:'',notes:'Approved tree work; not scheduled yet.',closed:false});
    }
  }
  save();
  render();
})();
