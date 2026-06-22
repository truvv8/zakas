-- ============================================================
--  Схема БД. Запустить в Supabase SQL Editor.
-- ============================================================

-- Профиль пользователя. id = auth.users.id (Supabase Auth).
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  status       text not null default 'unpaid'   -- 'unpaid' | 'paid'
                 check (status in ('unpaid', 'paid')),
  access_until timestamptz,                       -- до какой даты активна подписка
  created_at   timestamptz not null default now()
);

-- Устройства пользователя. Жёсткий лимит — в логике API (MAX_DEVICES).
create table if not exists public.devices (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  fingerprint  text not null,
  label        text,                              -- напр. "Chrome на Mac"
  last_seen    timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  unique (user_id, fingerprint)
);

-- Платежи (журнал webhook'ов CloudPayments).
create table if not exists public.payments (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references public.profiles(id) on delete set null,
  amount              numeric not null,
  currency            text not null default 'KZT',
  provider            text not null default 'cloudpayments',
  provider_payment_id text,
  status              text not null,              -- 'completed' | 'failed' и т.п.
  raw                 jsonb,                      -- сырой payload для разбора споров
  created_at          timestamptz not null default now(),
  unique (provider, provider_payment_id)          -- идемпотентность webhook'а
);

-- Контент: контакты поставщиков. Отдаётся ТОЛЬКО через серверный рендер.
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,                      -- что видно в списке
  body        text not null,                      -- сам контакт (рендерим в PNG)
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
--  Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.devices  enable row level security;
alter table public.payments enable row level security;
alter table public.contacts enable row level security;

-- profiles: пользователь видит и правит только свою строку.
create policy "own profile read"  on public.profiles
  for select using (auth.uid() = id);
create policy "own profile update" on public.profiles
  for update using (auth.uid() = id);

-- devices: пользователь видит/удаляет только свои устройства.
-- ВСТАВКУ устройств делает сервер (service_role) после проверки лимита.
create policy "own devices read"   on public.devices
  for select using (auth.uid() = user_id);
create policy "own devices delete" on public.devices
  for delete using (auth.uid() = user_id);

-- payments: пользователь видит только свои платежи. Пишет только сервер.
create policy "own payments read" on public.payments
  for select using (auth.uid() = user_id);

-- contacts: НИКАКИХ политик select для обычных пользователей.
-- => клиент через anon-ключ не прочитает контент напрямую.
-- Доступ выдаёт только серверный код (service_role) после проверки оплаты+устройства.

-- ============================================================
--  Автосоздание профиля при регистрации
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
