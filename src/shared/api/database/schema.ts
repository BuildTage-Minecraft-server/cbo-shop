export const schemaSql = `
create table if not exists partners (
  id integer generated always as identity primary key,
  player_uuid text not null unique,
  player_name text not null,
  code text not null unique,
  rate_bps integer not null check (rate_bps between 0 and 10000),
  created_at timestamptz not null default now()
);

create table if not exists referrals (
  player_uuid text primary key,
  partner_id integer not null references partners (id),
  attributed_at timestamptz not null default now()
);

create index if not exists referrals_partner_idx on referrals (partner_id);

create table if not exists commissions (
  payment_id text primary key,
  partner_id integer not null references partners (id),
  player_uuid text not null,
  payment_kopecks integer not null,
  amount_kopecks integer not null,
  created_at timestamptz not null default now(),
  available_at timestamptz not null
);

create index if not exists commissions_partner_idx on commissions (partner_id);

create table if not exists payouts (
  id integer generated always as identity primary key,
  partner_id integer not null references partners (id),
  amount_kopecks integer not null check (amount_kopecks > 0),
  details text not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'rejected')),
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists payouts_partner_idx on payouts (partner_id);
`;
