-- ============================================================
-- Fix v2: elimina TODAS las policies existentes sobre
-- "participantes" (por si alguna vieja/dormida se reactivó al
-- hacer ENABLE ROW LEVEL SECURITY y está causando la recursión
-- 42P17 por fuera de las funciones es_participante/mi_rol), y
-- deja únicamente las 4 policies correctas.
-- ============================================================

begin;

do $$
declare
  pol record;
begin
  for pol in
    select policyname from pg_policies where tablename = 'participantes'
  loop
    execute format('drop policy if exists %I on public.participantes', pol.policyname);
  end loop;
end $$;

-- Se recrean limpias (idénticas a las del archivo anterior):

create policy "participantes_select" on public.participantes
  for select using (public.es_participante(obra_id));

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

commit;

-- Verificación: debe haber exactamente 4 filas.
select policyname, cmd from pg_policies where tablename = 'participantes';
