import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = Deno.env.get("SITE_URL") || "https://da-2-arq.vercel.app";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: corsHeaders });

    const { email, nombre, rol, puede_cargar, obra_id, obra_nombre } = await req.json();
    if (!email || !obra_id) return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400, headers: corsHeaders });

    // Verificar que el caller es admin de esa obra
    const { data: miPartic } = await adminClient
      .from("participantes").select("rol").eq("obra_id", obra_id).eq("user_id", user.id).single();

    if (!miPartic || !["arquitecto", "ayudante"].includes(miPartic.rol)) {
      return new Response(JSON.stringify({ error: "Sin permisos para invitar" }), { status: 403, headers: corsHeaders });
    }

    // Buscar si el usuario ya existe en Auth
    const { data: usersData } = await adminClient.auth.admin.listUsers();
    const existingUser = usersData?.users?.find(u => u.email === email.trim());

    let targetUserId: string;

    if (existingUser) {
      // Ya tiene cuenta — solo re-invitar sin crear usuario nuevo
      targetUserId = existingUser.id;
      const { error: reinviteErr } = await adminClient.auth.admin.inviteUserByEmail(email.trim(), {
        redirectTo: `${SITE_URL}/`,
        data: { nombre },
      });
      if (reinviteErr) {
        // Ya no se ignora: se loguea para poder diagnosticar en el dashboard
        console.error("Error reenviando invite a usuario existente:", reinviteErr.message);
      }
    } else {
      // Usuario nuevo — invitar
      const { data: invData, error: invErr } = await adminClient.auth.admin.inviteUserByEmail(email.trim(), {
        redirectTo: `${SITE_URL}/`,
        data: { nombre },
      });
      if (invErr) {
        console.error("Error invitando usuario nuevo:", invErr.message, "| SITE_URL usado:", SITE_URL);
        return new Response(JSON.stringify({ error: invErr.message }), { status: 400, headers: corsHeaders });
      }
      targetUserId = invData.user.id;
    }

    // Crear/actualizar perfil
    await adminClient.from("profiles").upsert(
      { id: targetUserId, email: email.trim(), nombre },
      { onConflict: "id" }
    );

    // Agregar participante (upsert por obra_id+email)
    const { error: partErr } = await adminClient.from("participantes").upsert(
      { obra_id, user_id: targetUserId, email: email.trim(), nombre, rol, puede_cargar },
      { onConflict: "obra_id,email" }
    );
    if (partErr) return new Response(JSON.stringify({ error: partErr.message }), { status: 400, headers: corsHeaders });

    return new Response(JSON.stringify({ ok: true, mensaje: `Invitación enviada a ${email}` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error inesperado en invite-user:", e.message);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
