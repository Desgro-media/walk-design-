-- Neon Postgres schema for the admin panel. Run once: npm run db:setup (or paste into the Neon SQL Editor).

create table if not exists projects (
  id text primary key,
  data jsonb not null,
  sort_order int not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  location text,
  service text,
  scope text,
  message text,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new','contacted','meeting','proposal','won','lost')),
  notes text not null default '',
  follow_up date,
  client_id uuid
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text,
  phone text,
  location text,
  project_ids text[] not null default '{}',
  notes text not null default ''
);
