-- ============================================================
-- Fix v3: limpieza de policies duplicadas/viejas en obras,
-- categorias, subcategorias, fotos, presupuestos, profiles.
-- Mismo patrón que resolvió la recursión en participantes: se
-- borran TODAS las policies existentes por tabla (dinámicamente,
-- sin depender de conocer sus nombres viejos) y se recrean solo
-- las correctas, ya verificadas contra el código real de page.js.
--
-- Nota sobre "obras_delete": existía una policy vieja de DELETE
-- en obras que no tiene equivalente nuevo (el cliente/app no
-- borra obras desde el frontend hoy). Se elimina sin reemplazo:
-- es el comportamiento más seguro y consistente con el uso real
-- actual. Si en el futuro agregás borrado de obras desde la UI,
-- avisame y sumo la policy correspondiente.
-- ============================================================

begin;

do $$
declare
  t text;
  pol record;
begin
  foreach t in array array['obras','categorias','subcategorias','fotos','presupuestos','profiles']
  loop
    for pol in select policyname from pg_policies where tablename = t loop
      execute format('drop policy if exists %I on public.%I', pol.policyname, t);
    end loop;
  end loop;
end $$;

-- ---------- OBRAS ----------
create policy "obras_select" on public.obras
  for select using (public.es_participante(id));

create policy "obras_insert" on public.obras
  for insert with check (created_by = auth.uid());

create policy "obras_update" on public.obras
  for update using (public.mi_rol(id) in ('arquitecto','ayudante'));

-- ---------- PROFILES ----------
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
create policy "categorias_select" on public.categorias
  for select using (public.es_participante(obra_id));

create policy "categorias_write" on public.categorias
  for all using (public.mi_rol(obra_id) in ('arquitecto','ayudante'))
  with check (public.mi_rol(obra_id) in ('arquitecto','ayudante'));

-- ---------- SUBCATEGORIAS ----------
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
create policy "fotos_select" on public.fotos
  for select using (public.es_participante(obra_id));

create policy "fotos_write" on public.fotos
  for all using (public.es_participante(obra_id))
  with check (public.es_participante(obra_id));

-- ---------- PRESUPUESTOS ----------
create policy "presupuestos_select" on public.presupuestos
  for select using (public.es_participante(obra_id));

create policy "presupuestos_write" on public.presupuestos
  for all using (public.mi_rol(obra_id) in ('arquitecto','ayudante'))
  with check (public.mi_rol(obra_id) in ('arquitecto','ayudante'));

commit;

-- Verificación: cada tabla debe tener exactamente las policies
-- de arriba, sin duplicados.
select tablename, policyname, cmd
from pg_policies
where tablename in ('obras','categorias','subcategorias','fotos','presupuestos','profiles')
order by tablename, policyname;
