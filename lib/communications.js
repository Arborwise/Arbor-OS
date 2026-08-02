import {google} from 'googleapis';
import {db,initDb} from './db.js';
import {googleClient} from './google.js';

const TIME_ZONE='America/Chicago';
const WELCOME_FLYER_ID=process.env.ARBORWISE_WELCOME_FLYER_FILE_ID||'1yxYRLw6KUQUtD1EjAmBTo9XgtFraOotY';
const PRUNING_GUIDE_ID=process.env.ARBORWISE_PRUNING_GUIDE_FILE_ID||'1GWpDHJmfiO4_8viOKIYnZGloOfazSC0T';
const ARBORWISE_WAY_ID=process.env.ARBORWISE_WAY_FILE_ID||'1vbGdj0y8OL2j9i3vpCJkLdX6rwscrgwbcpz8Vc3W__c';
const DRAFTS_ENABLED=!/^(0|false|off|no)$/i.test(String(process.env.COMMUNICATION_DRAFTS_ENABLED||'true').trim());

function clean(value,max=12000){return String(value??'').trim().slice(0,max);}
function statusKey(value){return clean(value,300).toLowerCase().replace(/[–—]/g,'-').replace(/\s+/g,' ');}
function emailKey(value){return clean(value,300).toLowerCase().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)?.[0]||'';}
function safeHeader(value){return clean(value,500).replace(/[\r\n]+/g,' ');}
function centralTimestamp(date=new Date()){
  const parts=new Intl.DateTimeFormat('en-US',{
    timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit',
    hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false
  }).formatToParts(date);
  const map=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second} CT`;
}
function firstNames(name){
  const text=clean(name,200).replace(/\s+/g,' ');
  if(!text)return 'there';
  const people=text.split(/\s+(?:&|and)\s+/i).filter(Boolean);
  if(people.length>1){
    return people.map(person=>person.split(/\s+/)[0]).filter(Boolean).join(' and ');
  }
  return text.split(/\s+/)[0]||'there';
}
function serviceText(record){
  return [record.service,record.description,record.notes,record.category].filter(Boolean).join(' ');
}
function guidePlan(record){
  const text=serviceText(record);
  const guides=[];
  if(/prun|elevat|reduct|clearance|deadwood|widowmaker|limb|branch|canopy|structure|shape|train/i.test(text)){
    guides.push({key:'pruning',fileId:PRUNING_GUIDE_ID,name:'Arborwise Pruning Guide.jpg'});
  }
  const removalId=clean(process.env.ARBORWISE_REMOVAL_GUIDE_FILE_ID);
  if(removalId&&/tree removal|remove (?:a |the )?tree|hazardous tree|dead tree|stump (?:grind|remov)|fell(?:ing)?/i.test(text)){
    guides.push({key:'removal',fileId:removalId,name:'Arborwise Tree Removal Guide.pdf'});
  }
  const mulchId=clean(process.env.ARBORWISE_MULCHING_GUIDE_FILE_ID);
  if(mulchId&&/mulch|root zone|root-zone|bed work/i.test(text)){
    guides.push({key:'mulching',fileId:mulchId,name:'Arborwise Proper Mulching Guide.pdf'});
  }
  const plantingId=clean(process.env.ARBORWISE_PLANTING_GUIDE_FILE_ID);
  if(plantingId&&/plant|replacement tree|staking/i.test(text)){
    guides.push({key:'planting',fileId:plantingId,name:'Arborwise Tree Planting Guide.pdf'});
  }
  const wateringId=clean(process.env.ARBORWISE_WATERING_GUIDE_FILE_ID);
  if(wateringId&&/water|drought|dry soil|heat stress/i.test(text)){
    guides.push({key:'watering',fileId:wateringId,name:'Arborwise Proper Watering Guide.pdf'});
  }
  return guides.slice(0,2);
}
function isEstimateVisitComplete(status){
  return /(^completed?$)|(^done$)|estimate.*(?:done|complete)|(?:done|complete).*estimate/i.test(status);
}
function isEstimateSent(status){
  return /(^sent$)|estimate sent|email sent|emailed|delivered/i.test(status);
}
function isStopStatus(status){
  return /approved|accepted|declined|rejected|converted|schedul|hold|do not follow|archiv|expired|cancel/i.test(status);
}
function isJobComplete(status){
  return /^(done|completed?|invoiced|paid)$/i.test(status)||/job.*(?:done|complete)/i.test(status);
}
function addDays(date,days){return new Date(date.getTime()+days*86400000);}
function eventKey(recordId,type){return `${clean(recordId,200)}:${type}`;}

async function planEvent(record,type,dueAt,subject,guides=[],details={}){
  const key=eventKey(record.id,type);
  const result=await db().query(
    `insert into communication_events(
      event_key,record_id,communication_type,customer_name,recipient_email,subject,status,due_at,guide_keys,details,created_at,updated_at
    ) values($1,$2,$3,$4,$5,$6,'planned',$7,$8,$9,now(),now())
    on conflict(event_key) do nothing
    returning id`,
    [key,record.id,type,record.customer_name||'',record.email||'',subject,dueAt,JSON.stringify(guides.map(guide=>guide.key)),JSON.stringify(details)]
  );
  return result.rowCount>0;
}
async function cancelFollowUps(recordId,reason){
  const result=await db().query(
    `update communication_events
     set status='cancelled',stop_reason=$2,updated_at=now()
     where record_id=$1
       and communication_type='estimate_three_day_followup'
       and status in ('planned','due')
     returning id`,
    [recordId,clean(reason,500)]
  );
  return result.rowCount;
}
async function recordTransition(record,previous,trigger){
  const oldStatus=statusKey(previous.status);
  const newStatus=statusKey(record.status);
  const version=record.updated_at?new Date(record.updated_at).toISOString():new Date().toISOString();
  const key=`${record.id}:${oldStatus}->${newStatus}:${version}`;
  await db().query(
    `insert into record_status_events(event_key,record_id,old_status,new_status,kind,source,trigger,metadata)
     values($1,$2,$3,$4,$5,$6,$7,$8)
     on conflict(event_key) do nothing`,
    [key,record.id,previous.status||'',record.status||'',record.kind||'',record.source||'',trigger,JSON.stringify({recordUpdatedAt:record.updated_at})]
  );
}
async function saveState(record){
  await db().query(
    `insert into record_status_state(record_id,status,kind,source,last_record_updated_at,updated_at)
     values($1,$2,$3,$4,$5,now())
     on conflict(record_id) do update set
       status=excluded.status,kind=excluded.kind,source=excluded.source,
       last_record_updated_at=excluded.last_record_updated_at,updated_at=now()`,
    [record.id,record.status||'',record.kind||'',record.source||'',record.updated_at||null]
  );
}
async function handleTransition(record,previous,trigger,summary){
  const oldStatus=statusKey(previous.status);
  const newStatus=statusKey(record.status);
  if(oldStatus===newStatus)return;
  await recordTransition(record,previous,trigger);
  summary.transitions++;

  if(isStopStatus(newStatus)){
    summary.cancelled+=await cancelFollowUps(record.id,`Status changed to ${record.status}`);
  }

  if(record.kind==='est'&&isEstimateVisitComplete(newStatus)&&!isEstimateVisitComplete(oldStatus)){
    const guides=guidePlan(record);
    const planned=await planEvent(
      record,
      'estimate_visit_complete',
      new Date(),
      'Thank you for having Arborwise out today',
      guides,
      {trigger,oldStatus:previous.status||'',newStatus:record.status||''}
    );
    if(planned)summary.planned++;
  }

  if(record.kind==='est'&&isEstimateSent(newStatus)&&!isEstimateSent(oldStatus)){
    const guides=guidePlan(record);
    const welcomePlanned=await planEvent(
      record,
      'estimate_visit_complete',
      new Date(),
      'Thank you for having Arborwise out today',
      guides,
      {trigger,oldStatus:previous.status||'',newStatus:record.status||'',safetyNet:'Estimate sent before completed status was captured'}
    );
    if(welcomePlanned)summary.planned++;
    const planned=await planEvent(
      record,
      'estimate_three_day_followup',
      addDays(new Date(),3),
      'Checking in on your Arborwise estimate',
      [],
      {trigger,oldStatus:previous.status||'',newStatus:record.status||'',sentAt:new Date().toISOString()}
    );
    if(planned)summary.planned++;
  }

  if(record.kind==='job'&&isJobComplete(newStatus)&&!isJobComplete(oldStatus)){
    const planned=await planEvent(
      record,
      'job_completed_satisfaction',
      new Date(),
      'Thank you for choosing Arborwise',
      [],
      {trigger,oldStatus:previous.status||'',newStatus:record.status||'',needsApprovedFinalAsset:true}
    );
    if(planned)summary.planned++;
  }
}
async function applyReplyStops(summary){
  const result=await db().query(
    `select distinct lower(email) as email,id
     from records
     where coalesce(email,'')<>''`
  );
  if(!result.rows.length)return;
  const byEmail=new Map(result.rows.map(row=>[emailKey(row.email),row.id]).filter(([email])=>email));
  const messages=await db().query(
    `select sender,occurred_at
     from inbox_items
     where source='gmail'
       and occurred_at>=now()-interval '14 days'`
  );
  for(const message of messages.rows){
    const recordId=byEmail.get(emailKey(message.sender));
    if(!recordId)continue;
    const stopped=await db().query(
      `update communication_events
       set status='cancelled',stop_reason='Customer replied by email',updated_at=now()
       where record_id=$1
         and communication_type='estimate_three_day_followup'
         and status in ('planned','due')
         and created_at<=coalesce($2,now())
       returning id`,
      [recordId,message.occurred_at||null]
    );
    summary.cancelled+=stopped.rowCount;
  }
}
function messageFor(event,record,guides){
  const names=firstNames(event.customer_name||record.customer_name);
  if(event.communication_type==='estimate_visit_complete'){
    const guideSentence=guides.length
      ? ` I also attached ${guides.length===1?'a short Arborwise guide':'two short Arborwise guides'} related to the work discussed.`
      : '';
    return {
      subject:'Thank you for having Arborwise out today',
      body:`Hi ${names},

Thank you for having Arborwise out to look over your trees today. Your written Arborwise estimate will be prepared and sent separately.

I attached our Thank You for Having Us Out handout.${guideSentence} We want you to understand what we are recommending, why we are recommending it, and what proper tree care should look like.

Please call, text, or reply with any questions. We are happy to explain any part of the recommendation.

Thank you,
Greg
Arborwise Tree Care
972-430-8330
greg@arborwisetreecare.com
arborwisetreecare.com`,
      attachments:[
        {fileId:WELCOME_FLYER_ID,name:'Arborwise Thank You for Having Us Out Today.png'},
        ...guides
      ]
    };
  }
  if(event.communication_type==='estimate_three_day_followup'){
    return {
      subject:'Checking in on your Arborwise estimate',
      body:`Dear ${names},

We wanted to follow up on the estimate we sent a few days ago.

We know tree work can involve a lot of questions, and we never want you to feel rushed or unsure about what has been recommended. If you would like us to explain any part of the estimate, compare options, or talk through timing, please reach out.

We have also included a short explanation of the Arborwise Way, so you know what to expect from us before, during, and after the work.

We are here whenever you are ready.

The Arborwise Crew
972-430-8330
greg@arborwisetreecare.com
arborwisetreecare.com`,
      attachments:[{fileId:ARBORWISE_WAY_ID,name:'The Arborwise Way.pdf',exportMimeType:'application/pdf'}]
    };
  }
  return null;
}
function wrapBase64(buffer){
  return Buffer.from(buffer).toString('base64').replace(/.{1,76}/g,'$&\r\n').trim();
}
function base64Url(value){
  return Buffer.from(value).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
async function driveAttachment(drive,spec){
  const meta=(await drive.files.get({fileId:spec.fileId,fields:'id,name,mimeType'})).data;
  const isNative=String(meta.mimeType||'').startsWith('application/vnd.google-apps.');
  let response;
  let mimeType=meta.mimeType||'application/octet-stream';
  if(isNative){
    mimeType=spec.exportMimeType||'application/pdf';
    response=await drive.files.export({fileId:spec.fileId,mimeType},{responseType:'arraybuffer'});
  }else{
    response=await drive.files.get({fileId:spec.fileId,alt:'media'},{responseType:'arraybuffer'});
  }
  return {
    name:spec.name||meta.name||'attachment',
    mimeType,
    data:Buffer.from(response.data)
  };
}
function rawMessage(to,subject,body,attachments){
  const boundary=`arborwise_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const lines=[
    `To: ${safeHeader(to)}`,
    `Subject: ${safeHeader(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: 8bit',
    '',
    body,
    ''
  ];
  for(const attachment of attachments){
    const fileName=safeHeader(attachment.name).replace(/"/g,"'");
    lines.push(
      `--${boundary}`,
      `Content-Type: ${attachment.mimeType}; name="${fileName}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${fileName}"`,
      '',
      wrapBase64(attachment.data),
      ''
    );
  }
  lines.push(`--${boundary}--`,'');
  return base64Url(lines.join('\r\n'));
}
async function createVerifiedDraft(event,record){
  const guides=guidePlan(record);
  const message=messageFor(event,record,guides);
  if(!message)return {status:'needs_asset',reason:'The approved final customer asset is not ready yet'};
  const auth=await googleClient();
  const drive=google.drive({version:'v3',auth});
  const gmail=google.gmail({version:'v1',auth});
  const attachments=[];
  for(const spec of message.attachments){
    attachments.push(await driveAttachment(drive,spec));
  }
  const created=await gmail.users.drafts.create({
    userId:'me',
    requestBody:{message:{raw:rawMessage(event.recipient_email,message.subject,message.body,attachments)}}
  });
  const draftId=created.data.id;
  if(!draftId)throw new Error('Gmail did not return a draft ID');
  const verified=await gmail.users.drafts.get({userId:'me',id:draftId,format:'metadata'});
  if(!verified.data.id||!verified.data.message?.id)throw new Error('Gmail draft verification failed');
  return {
    status:'draft',
    draftId,
    messageId:verified.data.message.id,
    subject:message.subject,
    attachmentNames:attachments.map(item=>item.name)
  };
}
async function processDue(summary){
  await db().query(
    `update communication_events
     set status='due',updated_at=now()
     where status='planned' and due_at<=now()`
  );
  if(!DRAFTS_ENABLED)return;
  const due=await db().query(
    `select ce.*,r.status as record_status,r.kind,r.service,r.description,r.notes,r.category,r.email,r.customer_name as record_customer_name
     from communication_events ce
     left join records r on r.id=ce.record_id
     where ce.status='due'
     order by ce.due_at asc
     limit 10`
  );
  for(const event of due.rows){
    try{
      const record={
        id:event.record_id,
        status:event.record_status||'',
        kind:event.kind||'',
        service:event.service||'',
        description:event.description||'',
        notes:event.notes||'',
        category:event.category||'',
        email:event.email||event.recipient_email||'',
        customer_name:event.record_customer_name||event.customer_name||''
      };
      if(event.communication_type==='estimate_three_day_followup'&&isStopStatus(statusKey(record.status))){
        await db().query(
          `update communication_events set status='cancelled',stop_reason=$2,updated_at=now() where id=$1`,
          [event.id,`Current status is ${record.status}`]
        );
        summary.cancelled++;
        continue;
      }
      const recipient=emailKey(record.email||event.recipient_email);
      if(!recipient){
        await db().query(
          `update communication_events set status='missing_information',stop_reason='Customer email is missing',updated_at=now() where id=$1`,
          [event.id]
        );
        summary.missing++;
        continue;
      }
      event.recipient_email=recipient;
      const result=await createVerifiedDraft(event,record);
      await db().query(
        `update communication_events set
          status=$2,gmail_draft_id=$3,gmail_message_id=$4,subject=$5,
          attachment_names=$6,stop_reason=$7,updated_at=now()
         where id=$1`,
        [
          event.id,result.status,result.draftId||null,result.messageId||null,result.subject||event.subject,
          JSON.stringify(result.attachmentNames||[]),result.reason||null
        ]
      );
      if(result.status==='draft')summary.drafts++;
      else summary.needsAsset++;
    }catch(error){
      await db().query(
        `update communication_events
         set status='error',stop_reason=$2,details=details||$3::jsonb,updated_at=now()
         where id=$1`,
        [event.id,clean(error.message,1000),JSON.stringify({lastErrorAt:new Date().toISOString()})]
      );
      summary.errors.push(`${event.record_id}: ${error.message}`);
    }
  }
}
export async function processCommunicationTransitions(trigger='sync'){
  await initDb();
  const summary={seeded:0,transitions:0,planned:0,cancelled:0,drafts:0,missing:0,needsAsset:0,errors:[],processedAt:centralTimestamp()};
  const records=await db().query(
    `select id,source,kind,customer_name,email,service,description,notes,category,status,updated_at
     from records
     where coalesce(status,'')<>''`
  );
  const stateRows=await db().query('select * from record_status_state');
  const states=new Map(stateRows.rows.map(row=>[row.record_id,row]));
  for(const record of records.rows){
    const previous=states.get(record.id);
    if(!previous){
      await saveState(record);
      summary.seeded++;
      continue;
    }
    try{
      await handleTransition(record,previous,trigger,summary);
      await saveState(record);
    }catch(error){
      summary.errors.push(`${record.id}: ${error.message}`);
    }
  }
  await applyReplyStops(summary);
  await processDue(summary);
  return summary;
}
export async function listCommunicationQueue(limit=100){
  await initDb();
  const result=await db().query(
    `select ce.*,r.status as record_status,r.service,r.description
     from communication_events ce
     left join records r on r.id=ce.record_id
     order by
       case ce.status when 'due' then 0 when 'error' then 1 when 'missing_information' then 2 when 'planned' then 3 else 4 end,
       ce.due_at asc nulls last,ce.created_at desc
     limit $1`,
    [Math.max(1,Math.min(250,Number(limit)||100))]
  );
  return result.rows;
}
