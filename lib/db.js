import pg from 'pg';
const {Pool}=pg;
let pool;
export function db(){
  if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL is not configured');
  pool||=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.NODE_ENV==='development'?false:{rejectUnauthorized:false},max:4,idleTimeoutMillis:30000,connectionTimeoutMillis:10000});
  return pool;
}
let ready;
export async function initDb(){
  if(ready)return ready;
  ready=(async()=>{
    await db().query(`
      create table if not exists app_tokens (provider text primary key, access_token text, refresh_token text, expires_at timestamptz, metadata jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now());
      create table if not exists records (id text primary key, source text not null, source_id text, kind text not null, category text, customer_name text, phone text, email text, address text, service text, description text, amount numeric, status text, assigned_to text, work_date date, work_time text, follow_up_date date, notes text, closed boolean not null default false, raw jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now());
      create unique index if not exists records_source_unique on records(source,source_id) where source_id is not null;
      create table if not exists inbox_items (id text primary key, source text not null, subject text, sender text, snippet text, record_id text, status text not null default 'open', raw jsonb not null default '{}'::jsonb, occurred_at timestamptz, updated_at timestamptz not null default now());
      create table if not exists mileage (id bigserial primary key, trip_date date not null, origin text not null, destination text not null, miles numeric not null, purpose text, created_at timestamptz not null default now());
      create table if not exists notes (id bigserial primary key, lane text not null, body text not null, author text, created_at timestamptz not null default now());
      create table if not exists hours_entries (id bigserial primary key, work_date date not null, employee text not null, job_ref text, start_time time not null, end_time time not null, break_minutes integer not null default 0, hours_worked numeric not null, notes text, status text not null default 'Submitted', created_at timestamptz not null default now());
      create table if not exists equipment (id text primary key, name text not null, group_name text not null, task text not null, fuel_filter_due date, active boolean not null default true, updated_at timestamptz not null default now());
      create table if not exists maintenance (equipment_id text not null references equipment(id) on delete cascade, week_of date not null, crew_checked boolean not null default false, verified boolean not null default false, photo_data text, updated_at timestamptz not null default now(), primary key(equipment_id,week_of));
      create table if not exists sync_runs (id bigserial primary key, started_at timestamptz not null default now(), finished_at timestamptz, status text not null default 'running', trigger text, summary jsonb not null default '{}'::jsonb, error text);
      create table if not exists record_status_state (
        record_id text primary key,
        status text,
        kind text,
        source text,
        last_record_updated_at timestamptz,
        updated_at timestamptz not null default now()
      );
      create table if not exists record_status_events (
        id bigserial primary key,
        event_key text not null unique,
        record_id text not null,
        old_status text,
        new_status text,
        kind text,
        source text,
        trigger text,
        metadata jsonb not null default '{}'::jsonb,
        changed_at timestamptz not null default now()
      );
      create index if not exists record_status_events_record_idx on record_status_events(record_id,changed_at desc);
      create table if not exists communication_events (
        id bigserial primary key,
        event_key text not null unique,
        record_id text not null,
        communication_type text not null,
        customer_name text,
        recipient_email text,
        subject text,
        status text not null default 'planned',
        due_at timestamptz,
        guide_keys jsonb not null default '[]'::jsonb,
        attachment_names jsonb not null default '[]'::jsonb,
        gmail_draft_id text,
        gmail_message_id text,
        stop_reason text,
        details jsonb not null default '{}'::jsonb,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );
      create index if not exists communication_events_queue_idx on communication_events(status,due_at);
      create index if not exists communication_events_record_idx on communication_events(record_id,created_at desc);
    `);
  })().catch(error=>{ready=null;throw error;});
  return ready;
}
export async function upsertToken(provider,token){await initDb();await db().query(`insert into app_tokens(provider,access_token,refresh_token,expires_at,metadata,updated_at) values($1,$2,$3,$4,$5,now()) on conflict(provider) do update set access_token=excluded.access_token,refresh_token=coalesce(nullif(excluded.refresh_token,''),app_tokens.refresh_token),expires_at=excluded.expires_at,metadata=app_tokens.metadata||excluded.metadata,updated_at=now()`,[provider,token.access_token||'',token.refresh_token||'',token.expires_at||null,token.metadata||{}]);}
export async function getToken(provider){await initDb();const result=await db().query('select * from app_tokens where provider=$1',[provider]);return result.rows[0]||null;}
