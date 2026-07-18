-- ============================================================
-- Fix: recursión infinita (42P17) en policies de "participantes"
-- Causa: es_participante()/mi_rol() estaban en `language sql`.
-- Postgres puede inlinear funciones SQL simples dentro de la
-- policy que las invoca; al inlinearse se pierde el efecto de
-- SECURITY DEFINER (que las hacía bypassear RLS), y terminan
-- consultando participantes CON RLS activo -> se llaman a sí
-- mismas -> recursión infinita.
-- Solución: pasarlas a `language plpgsql`, que Postgres nunca
-- inlinea. Mismo comportamiento, ninguna policy cambia (siguen
-- llamándose igual, por nombre).
-- ============================================================

begin;

create or replace function public.es_participante(p_obra_id uuid)
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
begin
  return exists(
    select 1 from public.participantes
    where obra_id = p_obra_id and user_id = auth.uid()
  );
end;
$$;

create or replace function public.mi_rol(p_obra_id uuid)
returns text
language plpgsql
security definer
stable
set search_path = public
as $$
declare
  v_rol text;
begin
  select rol into v_rol from public.participantes
  where obra_id = p_obra_id and user_id = auth.uid()
  limit 1;
  return v_rol;
end;
$$;

commit;

-- Verificación: con el usuario cliente logueado, recargar la app.
-- El request a /rest/v1/obras?... ya no debería devolver 500.
