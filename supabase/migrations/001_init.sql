create table registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  role text not null check (role in ('student','working_professional_tech','working_professional_non_tech','other')),
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'pending' check (status in ('pending','paid','failed')),
  payment_id text,
  amount integer default 9900,
  created_at timestamptz default now(),
  paid_at timestamptz,
  email_sent_at timestamptz
);

create index idx_registrations_email on registrations(email);
create index idx_registrations_status on registrations(status);
create index idx_registrations_created_at on registrations(created_at desc);

alter table registrations enable row level security;
