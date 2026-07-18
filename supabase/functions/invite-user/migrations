-- ============================================================
-- Migración: activar RLS en tablas abiertas + limpiar políticas
-- conflictivas en comentarios_gasto
-- Fecha: 2026-07-18
-- Alcance: categorias, fotos, obras, participantes, presupuestos,
--          profiles, subcategorias + cleanup comentarios_gasto
-- Fuera de alcance (pendiente, decisión aparte): gastos_select
--          (rol ayudante ve gastos "privado" a nivel de base).
-- ============================================================

begin;

-- ---------- Funciones helper (SECURITY DEFINER, evitan recursión RLS) ----------
-- Sin SECURITY DEFINER, una policy de "participantes" que consulta
-- "participantes" para saber tu rol dispara RLS sobre sí misma
-- (recursión). Estas funciones corren con permisos del dueño,
-- evitando el problema, y quedan como única fuente de verdad para
-- "¿este usuario participa de esta obra / con qué rol?".

create or replace function public.es_participante(p_obra_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists(
    select 1 from public.participantes
    where obra_id = p_obra_id and user_id = auth.uid()
  );
$$;

create or replace function public.mi_rol(p_obra_id uuid)
returns text
language sql
security definer
stable
set search_path = public
as $$
  select rol from public.participantes
  where obra_id = p_obra_id and user_id = auth.uid()
  limit 1;
$$;

-- ---------- OBRAS ----------
alter table public.obras enable row level security;

drop policy if exists "obras_select" on public.obras;
drop policy if exists "obras_insert" on public.obras;
drop policy if exists "obras_update" on public.obras;

create policy "obras_select" on public.obras
  for select using (public.es_participante(id));

create policy "obras_insert" on public.obras
  for insert with check (created_by = auth.uid());

create policy "obras_update" on public.obras
  for update using (public.mi_rol(id) in ('arquitecto','ayudante'));

-- ---------- PARTICIPANTES ----------
alter table public.participantes enable row level security;

drop policy if exists "participantes_select" on public.participantes;
drop policy if exists "participantes_insert" on public.participantes;
drop policy if exists "participantes_update" on public.participantes;
drop policy if exists "participantes_delete" on public.participantes;

create policy "participantes_select" on public.participantes
  for select using (public.es_participante(obra_id));

-- Único insert permitido desde el cliente: el creador de una obra se
-- agrega a sí mismo como arquitecto justo después de crearla (page.js
-- línea ~530). Las invitaciones de otros participantes van por el
-- edge function invite-user, que usa SERVICE_ROLE_KEY y bypassa RLS,
-- así que no necesitan (ni deben tener) una policy de insert acá.
create policy "participantes_insert" on public.participantes
  for insert with check (
    user_id = auth.uid()
    and rol = 'arquitecto'
    and exists (
      select 1 from public.obras o
      where o.id = obra_id and o.created_by = auth.uid()
    )
  );

create policy "participantes_update" on public.participantes
  for update using (public.mi_rol(obra_id) in ('arquitecto','ayudante'));

create policy "participantes_delete" on public.participantes
  for delete using (public.mi_rol(obra_id) in ('arquitecto','ayudante'));

-- ---------- PROFILES ----------
alter table public.profiles enable row level security;

drop policy if exists "profiles_select" on public.profiles;
drop policy if exists "profiles_insert" on public.profiles;
drop policy if exists "profiles_update" on public.profiles;

-- Cada usuario ve su propio perfil, y además el perfil del creador
-- de cualquier obra en la que participa (page.js línea 511 hace ese
-- join para mostrar el logo_url del arquitecto en la lista de obras).
create policy "profiles_select" on public.profiles
  for select using (
    id = auth.uid()
    or id in (
      select o.created_by from public.obras o
      where public.es_participante(o.id)
    )
  );

create policy "profiles_insert" on public.profiles
  for insert with check (id = auth.uid());

create policy "profiles_update" on public.profiles
  for update using (id = auth.uid());

-- ---------- CATEGORIAS ----------
alter table public.categorias enable row level security;

drop policy if exists "categorias_select" on public.categorias;
drop policy if exists "categorias_write" on public.categorias;

create policy "categorias_select" on public.categorias
  for select using (public.es_participante(obra_id));

create policy "categorias_write" on public.categorias
  for all using (public.mi_rol(obra_id) in ('arquitecto','ayudante'))
  with check (public.mi_rol(obra_id) in ('arquitecto','ayudante'));

-- ---------- SUBCATEGORIAS ----------
-- No tiene obra_id propio: se llega a la obra a través de categorias.cat_id.
alter table public.subcategorias enable row level security;

drop policy if exists "subcategorias_select" on public.subcategorias;
drop policy if exists "subcategorias_write" on public.subcategorias;

create policy "subcategorias_select" on public.subcategorias
  for select using (
    exists (
      select 1 from public.categorias c
      where c.id = subcategorias.cat_id and public.es_participante(c.obra_id)
    )
  );

create policy "subcategorias_write" on public.subcategorias
  for all using (
    exists (
      select 1 from public.categorias c
      where c.id = subcategorias.cat_id
        and public.mi_rol(c.obra_id) in ('arquitecto','ayudante')
    )
  )
  with check (
    exists (
      select 1 from public.categorias c
      where c.id = subcategorias.cat_id
        and public.mi_rol(c.obra_id) in ('arquitecto','ayudante')
    )
  );

-- ---------- FOTOS ----------
-- OJO: hoy la UI (FotosTab, prop puedoCargar={true} fija) permite subir,
-- editar, borrar y reordenar fotos a CUALQUIER participante, incluido
-- el cliente — no solo al arquitecto/ayudante. Esta policy respeta ese
-- comportamiento actual tal cual está para no romper nada. Si en
-- realidad querés que el cliente solo pueda VER fotos (no tocarlas),
-- avisame y separo fotos_write para esAdmin únicamente.
alter table public.fotos enable row level security;

drop policy if exists "fotos_select" on public.fotos;
drop policy if exists "fotos_write" on public.fotos;

create policy "fotos_select" on public.fotos
  for select using (public.es_participante(obra_id));

create policy "fotos_write" on public.fotos
  for all using (public.es_participante(obra_id))
  with check (public.es_participante(obra_id));

-- ---------- PRESUPUESTOS ----------
alter table public.presupuestos enable row level security;

drop policy if exists "presupuestos_select" on public.presupuestos;
drop policy if exists "presupuestos_write" on public.presupuestos;

create policy "presupuestos_select" on public.presupuestos
  for select using (public.es_participante(obra_id));

create policy "presupuestos_write" on public.presupuestos
  for all using (public.mi_rol(obra_id) in ('arquitecto','ayudante'))
  with check (public.mi_rol(obra_id) in ('arquitecto','ayudante'));

-- ---------- COMENTARIOS_GASTO: limpiar políticas viejas conflictivas ----------
-- En RLS, varias policies del mismo comando (ej. SELECT) se combinan
-- con OR: gana la más permisiva. Estas 3 policies viejas anulaban en
-- la práctica a las nuevas "cg_*" (que sí respetan visibilidad
-- público/solo_admin/privado). Se eliminan; las cg_* quedan como
-- única fuente de verdad. No se tocan ni se recrean las cg_*.
drop policy if exists "autor borra su comentario" on public.comentarios_gasto;
drop policy if exists "participantes escriben comentarios" on public.comentarios_gasto;
drop policy if exists "participantes leen comentarios" on public.comentarios_gasto;

commit;

-- ============================================================
-- VERIFICACIÓN POST-MIGRACIÓN (correr aparte, no forma parte de
-- la transacción de arriba):
--
-- select tablename, rowsecurity from pg_tables
-- where schemaname='public'
--   and tablename in ('categorias','fotos','obras','participantes',
--                      'presupuestos','profiles','subcategorias');
-- -> las 7 filas deben tener rowsecurity = true
--
-- select tablename, policyname, cmd from pg_policies
-- where tablename='comentarios_gasto';
-- -> no debe aparecer ninguna de las 3 policies viejas eliminadas
-- ============================================================
