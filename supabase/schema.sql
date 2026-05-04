-- JobBoost AI — Schéma de base de données Supabase

-- Profils utilisateurs (extension de auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  plan text default 'free' check (plan in ('free', 'monthly', 'lifetime')),
  stripe_customer_id text,
  stripe_subscription_id text,
  generations_count integer default 0,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- Activer RLS
alter table public.profiles enable row level security;

-- Policy : les utilisateurs ne voient que leur propre profil
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger pour créer le profil automatiquement à l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Fonction pour incrémenter le compteur de générations (appelée par les API routes)
create or replace function public.increment_generations(user_id uuid)
returns void as $$
begin
  update public.profiles
  set generations_count = generations_count + 1,
      updated_at = timezone('utc', now())
  where id = user_id;
end;
$$ language plpgsql security definer;

-- Historique des générations
create table public.generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  type text not null check (type in ('cv', 'cover_letter', 'interview_prep', 'company_suggestions')),
  title text,
  input jsonb,
  output text,
  created_at timestamp with time zone default timezone('utc', now())
);

alter table public.generations enable row level security;

create policy "Users can view own generations"
  on public.generations for select
  using (auth.uid() = user_id);

create policy "Users can insert own generations"
  on public.generations for insert
  with check (auth.uid() = user_id);

-- Index pour les requêtes fréquentes
create index generations_user_id_idx on public.generations (user_id);
create index generations_type_idx on public.generations (type);
create index generations_created_at_idx on public.generations (created_at desc);

-- Permettre au service role de mettre à jour les profils (pour le webhook Stripe)
create policy "Service role can update profiles"
  on public.profiles for update
  using (true)
  with check (true);
