import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // 1. Verificar que quien llama está autenticado
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });

    // 2. Cliente con service role (puede crear usuarios)
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // 3. Verificar que el que llama es arquitecto o ayudante de la obra
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });

    const { email, nombre, rol, puede_cargar, obra_id, obra_nombre } = await req.json();
    if (!email || !obra_id) return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });

    // 4. Verificar que el caller es admin de esa obra
    const { data: miPartic } = await adminClient
      .from("participantes")
      .select("rol")
      .eq("obra_id", obra_id)
      .eq("user_id", user.id)
      .single();

    if (!miPartic || !["arquitecto", "ayudante"].includes(miPartic.rol)) {
      return new Response(JSON.stringify({ error: "Sin permisos para invitar" }), { status: 403, headers: corsHeaders });
    }

    // 5. Invitar al usuario (crea cuenta + manda email para setear contraseña)
    const { data: invData, error: invErr } = await adminClient.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${Deno.env.get("SITE_URL") || "https://da2arq-v2.vercel.app"}/`,
      data: { nombre },
    });
    if (invErr) return new Response(JSON.stringify({ error: invErr.message }), { status: 400, headers: corsHeaders });

    // 6. Crear o actualizar perfil
    await adminClient.from("profiles").upsert(
      { id: invData.user.id, email, nombre },
      { onConflict: "id" }
    );

    // 7. Agregar como participante (o actualizar si ya existe)
    const { error: partErr } = await adminClient.from("participantes").upsert(
      { obra_id, user_id: invData.user.id, email, nombre, rol, puede_cargar },
      { onConflict: "obra_id,email" }
    );
    if (partErr) return new Response(JSON.stringify({ error: partErr.message }), { status: 400, headers: corsHeaders });

    return new Response(JSON.stringify({ ok: true, mensaje: `Invitación enviada a ${email}` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
