"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const LOGO_IMG = "data:image/jpeg;base64,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";

const C = {
  bg:"#F4F6F1",bg2:"#FFFFFF",bg3:"#EBF0E4",
  bd:"rgba(42,80,28,0.10)",bd2:"rgba(42,80,28,0.18)",
  t:"#182810",t2:"#3D5C2A",t3:"#7A9060",
  green:"#2E6E18",lima:"#7CBF3A",limaBg:"#EBF5DF",
  red:"#B84A3A",blue:"#2A6A5A",amber:"#7A6A1A",
};
const gCSS=`*{box-sizing:border-box;margin:0;padding:0}html,body{background:${C.bg};color:${C.t};font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:rgba(42,80,28,0.18);border-radius:4px}select option{background:#fff;color:${C.t}}@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}.fu{animation:fadeUp .28s ease both}.spin{animation:spin .8s linear infinite}input[type=date]::-webkit-calendar-picker-indicator{opacity:.5}input,select,textarea,button{font-family:inherit}@media(max-width:640px){.hide-mobile{display:none!important}.show-mobile{display:flex!important}}@media(min-width:641px){.show-mobile{display:none!important}}`;
const INP={background:"#fff",border:`1px solid ${C.bd2}`,color:C.t,borderRadius:7,padding:"8px 11px",fontSize:13,outline:"none",width:"100%"};
const SEL={...INP,cursor:"pointer"};
const ROL_LABEL={arquitecto:"Arquitecto",ayudante:"Ayudante",cliente:"Cliente"};
const ROL_COLOR={arquitecto:C.green,ayudante:C.blue,cliente:C.lima};
const todayISO=()=>new Date().toISOString().slice(0,10);
const fmtARS=n=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n);
const fmtUSD=n=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"USD",maximumFractionDigits:2,minimumFractionDigits:0}).format(n);
const fmtM=(n,m)=>m==="USD"?fmtUSD(n):fmtARS(n);
const toARS=(g,tcRef)=>g.moneda==="USD"?g.monto*(g.tc_valor||tcRef):g.monto;
const toUSD=(g,tcRef)=>g.moneda==="ARS"?g.monto/(g.tc_valor||tcRef):g.monto;
const exportCSV=(rows,fn)=>{if(!rows.length)return;const h=Object.keys(rows[0]);const csv="\uFEFF"+[h.join(","),...rows.map(r=>h.map(k=>'"'+(r[k]??"")+'"').join(","))].join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));a.download=fn;a.click();};

function useToast(){
  const [toasts,setToasts]=useState([]);
  const counter=useRef(0);
  const add=useCallback((msg,type,dur=3500)=>{const id=++counter.current;setToasts(ts=>[...ts,{id,msg,type}]);setTimeout(()=>setToasts(ts=>ts.filter(t=>t.id!==id)),dur);},[]);
  return{toasts,success:msg=>add(msg,"success"),error:msg=>add(msg,"error",5000),info:msg=>add(msg,"info")};
}
const TOAST_S={success:{bg:"#1a3d0a",border:"#2E6E18",icon:"✓",col:"#7CBF3A"},error:{bg:"#3d0a0a",border:"#B84A3A",icon:"✕",col:"#e06c5a"},info:{bg:"#0a2a3d",border:"#2A6A5A",icon:"ℹ",col:"#4a9a8a"}};
function ToastContainer({toasts}){return <div style={{position:"fixed",bottom:90,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:10,pointerEvents:"none"}}>{toasts.map(t=>{const s=TOAST_S[t.type]||TOAST_S.info;return <div key={t.id} style={{background:s.bg,border:`1px solid ${s.border}`,borderLeft:`3px solid ${s.col}`,borderRadius:10,padding:"11px 16px",display:"flex",alignItems:"center",gap:10,minWidth:260,maxWidth:380,boxShadow:"0 4px 20px rgba(0,0,0,.35)"}}><span style={{width:22,height:22,borderRadius:"50%",background:s.col+"22",border:`1px solid ${s.col}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:s.col,fontWeight:700,flexShrink:0}}>{s.icon}</span><span style={{fontSize:13,color:"#e8f0e0",lineHeight:1.4}}>{t.msg}</span></div>;})} </div>;}

function Logo({size=32}){return <img src={LOGO_IMG} alt="DA2ARQ" style={{width:size,height:size,objectFit:"contain",flexShrink:0}}/>;}
function Btn({children,onClick,primary,small,danger,disabled,full,loading}){return <button onClick={onClick} disabled={disabled||loading} style={{background:primary?C.green:danger?C.red+"18":C.bg3,color:primary?"#fff":danger?C.red:C.t2,border:`1px solid ${primary?"transparent":danger?C.red+"55":C.bd2}`,borderRadius:7,padding:small?"5px 12px":"8px 18px",cursor:(disabled||loading)?"not-allowed":"pointer",fontSize:small?11:13,fontWeight:primary?600:500,opacity:(disabled||loading)?.6:1,width:full?"100%":"auto",whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:6,justifyContent:"center"}}>{loading&&<span className="spin" style={{width:12,height:12,border:"2px solid currentColor",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block"}}/>}{children}</button>;}
function Tag({label,color}){return <span style={{background:color+"20",color,fontSize:10,padding:"2px 9px",borderRadius:20,fontWeight:600,whiteSpace:"nowrap",border:`1px solid ${color}33`}}>{label}</span>;}
function Card({children,style={}}){return <div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:14,padding:"18px 20px",boxShadow:"0 1px 6px rgba(42,80,28,.07)",...style}}>{children}</div>;}
function StatCard({label,value,sub,color,icon}){return <div style={{background:C.bg2,borderTop:`3px solid ${color}`,border:`1px solid ${C.bd}`,borderRadius:12,padding:"14px 18px",flex:"1 1 140px",minWidth:130}}><div style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:".08em",marginBottom:7,display:"flex",alignItems:"center",gap:5}}><span>{icon}</span>{label}</div><div style={{fontSize:19,fontWeight:700,color}}>{value}</div>{sub&&<div style={{fontSize:11,color:C.t3,marginTop:4}}>{sub}</div>}</div>;}
function Spinner(){return <div style={{display:"flex",justifyContent:"center",padding:"48px 0"}}><div className="spin" style={{width:32,height:32,border:`3px solid ${C.bd2}`,borderTopColor:C.green,borderRadius:"50%"}}/></div>;}
function Modal({title,onClose,children,wide}){useEffect(()=>{const h=e=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[onClose]);return <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:"fixed",inset:0,background:"rgba(10,30,5,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}><div style={{background:C.bg2,border:`1px solid ${C.bd2}`,borderRadius:16,padding:24,width:"100%",maxWidth:wide?720:480,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,.18)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><span style={{fontWeight:700,fontSize:15,color:C.t}}>{title}</span><button onClick={onClose} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:24,lineHeight:1}}>×</button></div>{children}</div></div>;}
function Donut({data,size=120}){const total=data.reduce((s,x)=>s+x.val,0);if(!total)return <div style={{width:size,height:size,borderRadius:"50%",background:C.bg3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:C.t3}}>Sin datos</div>;let ang=-Math.PI/2;const r=size/2,ir=r*.58,cx=r,cy=r;return <svg width={size} height={size}>{data.map((d,i)=>{const a=(d.val/total)*2*Math.PI;const x1=cx+r*Math.cos(ang),y1=cy+r*Math.sin(ang);ang+=a;const x2=cx+r*Math.cos(ang),y2=cy+r*Math.sin(ang);const ix1=cx+ir*Math.cos(ang-a),iy1=cy+ir*Math.sin(ang-a);const ix2=cx+ir*Math.cos(ang),iy2=cy+ir*Math.sin(ang);return <path key={i} d={`M${x1},${y1} A${r},${r},0,${a>Math.PI?1:0},1,${x2},${y2} L${ix2},${iy2} A${ir},${ir},0,${a>Math.PI?1:0},0,${ix1},${iy1} Z`} fill={d.color} opacity={.88}/>;})}<circle cx={cx} cy={cy} r={ir-2} fill={C.bg2}/></svg>;}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [obraActiva,setObraActiva]=useState(null);
  const [tab,setTab]=useState("dashboard");
  const [tcOficial,setTcOficial]=useState(null);
  const [tcBlue,setTcBlue]=useState(null);
  const [tcManual,setTcManual]=useState(1300);
  const [tcLoading,setTcLoading]=useState(false);
  const [inflData,setInflData]=useState(null);
  const [tcHistData,setTcHistData]=useState(null);
  const toast=useToast();

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{setUser(session?.user??null);setAuthLoading(false);});
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setUser(session?.user??null);});
    return()=>subscription.unsubscribe();
  },[]);
  useEffect(()=>{fetchTCs();},[]);

  const fetchTCs=async()=>{
    setTcLoading(true);
    try{
      const[rOf,rBl]=await Promise.all([fetch("https://dolarapi.com/v1/dolares/oficial").then(r=>r.json()).catch(()=>null),fetch("https://dolarapi.com/v1/dolares/blue").then(r=>r.json()).catch(()=>null)]);
      if(rOf?.venta){setTcOficial(rOf.venta);setTcManual(rOf.venta);}
      if(rBl?.venta)setTcBlue(rBl.venta);
    }catch{}
    setTcLoading(false);
  };
  const fetchIPC=async()=>{if(inflData)return;try{const r=await fetch("https://api.argentinadatos.com/v1/finanzas/indices/inflacion");const j=await r.json();if(Array.isArray(j))setInflData(j);}catch{}};
  const fetchTCHist=async()=>{if(tcHistData)return;try{const[rOf,rBl]=await Promise.all([fetch("https://api.argentinadatos.com/v1/cotizaciones/dolares/oficial"),fetch("https://api.argentinadatos.com/v1/cotizaciones/dolares/blue")]);const[jOf,jBl]=await Promise.all([rOf.json(),rBl.json()]);if(Array.isArray(jOf)&&Array.isArray(jBl))setTcHistData({oficial:jOf,blue:jBl});}catch{}};

  if(authLoading)return <><style>{gCSS}</style><Spinner/></>;
  if(!user)return <><style>{gCSS}</style><AuthScreen onLogin={setUser} toast={toast}/><ToastContainer toasts={toast.toasts}/></>;
  if(!obraActiva)return <><style>{gCSS}</style><ObrasScreen user={user} onSelect={o=>{setObraActiva(o);setTab("dashboard");}} onLogout={async()=>{await supabase.auth.signOut();setUser(null);}} toast={toast}/><ToastContainer toasts={toast.toasts}/></>;
  return <><style>{gCSS}</style><ObraApp user={user} obra={obraActiva} tab={tab} setTab={setTab} tcOficial={tcOficial} tcBlue={tcBlue} tcManual={tcManual} setTcManual={setTcManual} tcLoading={tcLoading} fetchTCs={fetchTCs} inflData={inflData} fetchIPC={fetchIPC} tcHistData={tcHistData} fetchTCHist={fetchTCHist} toast={toast} onBack={()=>setObraActiva(null)} onLogout={async()=>{await supabase.auth.signOut();setUser(null);setObraActiva(null);}}/><ToastContainer toasts={toast.toasts}/></>;
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
function AuthScreen({onLogin,toast}){
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [nombre,setNombre]=useState("");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const handleLogin=async()=>{if(!email||!pass)return setErr("Completá email y contraseña.");setLoading(true);setErr("");const{data,error}=await supabase.auth.signInWithPassword({email,password:pass});if(error){setErr(error.message);setLoading(false);return;}toast.success("Bienvenido");onLogin(data.user);setLoading(false);};
  const handleRegister=async()=>{if(!email||!pass||!nombre)return setErr("Completá todos los campos.");if(pass.length<6)return setErr("La contraseña debe tener al menos 6 caracteres.");setLoading(true);setErr("");const{data,error}=await supabase.auth.signUp({email,password:pass,options:{data:{nombre}}});if(error){setErr(error.message);setLoading(false);return;}toast.success("Cuenta creada");onLogin(data.user);setLoading(false);};
  const handle=mode==="login"?handleLogin:handleRegister;
  return <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{width:"100%",maxWidth:380}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><Logo size={90}/></div>
        <div style={{fontWeight:800,fontSize:24,letterSpacing:"-.04em",color:C.t}}>DA2ARQ</div>
        <div style={{color:C.t3,fontSize:13,marginTop:3}}>Gestión de gastos de obra</div>
      </div>
      <Card>
        <div style={{display:"flex",gap:8,marginBottom:20,background:C.bg3,borderRadius:8,padding:4}}>
          {["login","register"].map(m=><button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,padding:"7px",fontSize:12,border:"none",borderRadius:6,cursor:"pointer",background:mode===m?C.bg2:"transparent",color:mode===m?C.t:C.t3,fontWeight:mode===m?700:400}}>{m==="login"?"Ingresar":"Crear cuenta"}</button>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {mode==="register"&&<div><div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Nombre completo</div><input style={INP} placeholder="Ej: Juan García" value={nombre} onChange={e=>setNombre(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>}
          <div><div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Email</div><input style={INP} type="email" placeholder="tu@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Contraseña</div><input style={INP} type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
          {err&&<div style={{background:C.red+"18",border:`1px solid ${C.red}33`,borderRadius:7,padding:"8px 12px",fontSize:12,color:C.red}}>{err}</div>}
          <Btn primary full onClick={handle} loading={loading}>{mode==="login"?"Ingresar":"Crear cuenta"}</Btn>
        </div>
      </Card>
    </div>
  </div>;
}

// ── OBRAS SCREEN ──────────────────────────────────────────────────────────────
function ObrasScreen({user,onSelect,onLogout,toast}){
  const [obras,setObras]=useState([]);
  const [loading,setLoading]=useState(true);
  const [modal,setModal]=useState(false);
  const [saving,setSaving]=useState(false);
  const [draft,setDraft]=useState({nombre:"",direccion:"",estado:"En ejecución",presupuesto_total:"",moneda_presupuesto:"ARS",presup_tipo:"total"});
  const loadObras=useCallback(async()=>{setLoading(true);const{data,error}=await supabase.from("obras").select("*, participantes!inner(rol,puede_cargar,user_id)").eq("participantes.user_id",user.id).order("created_at",{ascending:false});if(!error)setObras(data||[]);setLoading(false);},[user.id]);
  useEffect(()=>{loadObras();},[loadObras]);
  const save=async()=>{
    if(!draft.nombre.trim())return;setSaving(true);
    const{data:obra,error:obraErr}=await supabase.from("obras").insert({nombre:draft.nombre.trim(),direccion:draft.direccion,estado:draft.estado,presupuesto_total:parseFloat(draft.presupuesto_total)||0,moneda_presupuesto:draft.moneda_presupuesto,created_by:user.id}).select().single();
    if(obraErr){toast.error("Error: "+obraErr.message);setSaving(false);return;}
    const profile=await supabase.from("profiles").select("nombre").eq("id",user.id).single();
    await supabase.from("participantes").insert({obra_id:obra.id,user_id:user.id,email:user.email,nombre:profile.data?.nombre||user.email,rol:"arquitecto",puede_cargar:true});
    await supabase.rpc("crear_categorias_default",{p_obra_id:obra.id});
    toast.success("Obra creada");setDraft({nombre:"",direccion:"",estado:"En ejecución",presupuesto_total:"",moneda_presupuesto:"ARS"});setModal(false);loadObras();setSaving(false);
  };
  const miRol=obra=>obra.participantes?.find(p=>p.user_id===user.id)?.rol||"cliente";
  return <div style={{minHeight:"100vh",background:C.bg}}>
    <div style={{background:C.bg2,borderBottom:`1px solid ${C.bd}`,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:54}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><Logo size={40}/><div><div style={{fontWeight:800,fontSize:15,color:C.t}}>DA2ARQ</div><div style={{fontSize:10,color:C.t3}}>Gestión de obra</div></div></div>
      <div style={{display:"flex",alignItems:"center",gap:10}}><span className="hide-mobile" style={{fontSize:12,color:C.t2}}>{user.email}</span><Btn small onClick={onLogout}>Salir</Btn></div>
    </div>
    <div style={{padding:24,maxWidth:960,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div><div style={{fontSize:20,fontWeight:700,color:C.t}}>Mis Obras</div><div style={{fontSize:12,color:C.t3,marginTop:2}}>{obras.length} obra{obras.length!==1?"s":""}</div></div>
        <Btn primary onClick={()=>setModal(true)}>+ Nueva obra</Btn>
      </div>
      {loading&&<Spinner/>}
      {!loading&&obras.length===0&&<Card><div style={{textAlign:"center",padding:"40px 0",color:C.t3}}>No tenés obras asignadas todavía.</div></Card>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {obras.map(o=>{const rol=miRol(o);return <div key={o.id} className="fu" onClick={()=>onSelect(o)} style={{background:C.bg2,border:`1px solid ${C.bd2}`,borderLeft:`4px solid ${C.green}`,borderRadius:12,padding:"18px 20px",cursor:"pointer",transition:"box-shadow .2s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(42,110,24,.13)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}><div style={{width:40,height:40,borderRadius:10,background:C.limaBg,border:`1px solid ${C.lima}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏗️</div><Tag label={o.estado} color={C.green}/></div>
          <div style={{fontWeight:700,fontSize:14,color:C.t,marginBottom:3}}>{o.nombre}</div>
          <div style={{fontSize:12,color:C.t3,marginBottom:12}}>{o.direccion}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><Tag label={ROL_LABEL[rol]} color={ROL_COLOR[rol]}/><span style={{fontSize:11,color:C.t3}}>{o.created_at?.slice(0,10)}</span></div>
        </div>;})}
      </div>
    </div>
    {modal&&<Modal title="Nueva Obra" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Nombre *</div><input style={INP} placeholder="Ej: Residencia Palermo" value={draft.nombre} onChange={e=>setDraft(d=>({...d,nombre:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Dirección</div><input style={INP} placeholder="Calle y número" value={draft.direccion} onChange={e=>setDraft(d=>({...d,direccion:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Estado</div><select style={SEL} value={draft.estado} onChange={e=>setDraft(d=>({...d,estado:e.target.value}))}>{["Relevamiento","En proyecto","En ejecución","Finalizada"].map(s=><option key={s}>{s}</option>)}</select></div>
        {/* Tipo de presupuesto */}
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:8,fontWeight:600}}>Tipo de presupuesto</div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {[{v:"total",label:"💰 Monto total",desc:"Un presupuesto global para toda la obra"},{v:"categorias",label:"📂 Por categorías",desc:"Desglose por rubro (definís después)"}].map(o=>(
              <div key={o.v} onClick={()=>setDraft(d=>({...d,presup_tipo:o.v}))} style={{flex:1,border:`2px solid ${draft.presup_tipo===o.v?C.green:C.bd2}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",background:draft.presup_tipo===o.v?C.limaBg:"transparent",transition:"all .2s"}}>
                <div style={{fontSize:12,fontWeight:700,color:draft.presup_tipo===o.v?C.green:C.t,marginBottom:3}}>{o.label}</div>
                <div style={{fontSize:10,color:C.t3}}>{o.desc}</div>
              </div>
            ))}
          </div>
          {draft.presup_tipo==="total"&&<div style={{display:"grid",gridTemplateColumns:"1fr 90px",gap:8}}>
            <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Monto</div><input style={INP} type="number" placeholder="0" value={draft.presupuesto_total} onChange={e=>setDraft(d=>({...d,presupuesto_total:e.target.value}))}/></div>
            <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div><select style={SEL} value={draft.moneda_presupuesto} onChange={e=>setDraft(d=>({...d,moneda_presupuesto:e.target.value}))}><option>ARS</option><option>USD</option></select></div>
          </div>}
          {draft.presup_tipo==="categorias"&&<div style={{background:C.bg3,borderRadius:8,padding:"10px 12px",fontSize:12,color:C.t3}}>✓ Vas a poder cargar el presupuesto por categoría desde el tab <b style={{color:C.t}}>Presupuesto</b> una vez creada la obra.</div>}
        </div>
        <div style={{display:"flex",gap:8,marginTop:4}}><Btn primary onClick={save} loading={saving}>Crear</Btn><Btn onClick={()=>setModal(false)}>Cancelar</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── OBRA APP ──────────────────────────────────────────────────────────────────
function ObraApp(props){
  const{user,obra,tab,setTab,tcOficial,tcBlue,tcManual,setTcManual,tcLoading,fetchTCs,inflData,fetchIPC,tcHistData,fetchTCHist,toast,onBack,onLogout}=props;
  const [gastos,setGastos]=useState([]);
  const [partic,setPartic]=useState([]);
  const [presup,setPresup]=useState([]);
  const [cats,setCats]=useState([]);
  const [fotos,setFotos]=useState([]);
  const [hitos,setHitos]=useState([]);
  const [comentarios,setComentarios]=useState([]);
  const [loadingData,setLoadingData]=useState(true);
  const [mobileMenu,setMobileMenu]=useState(false);
  const [showGastoModal,setShowGastoModal]=useState(false);
  const [monedaVista,setMonedaVista]=useState("ARS");
  const [notifVistas,setNotifVistas]=useState(()=>{try{return JSON.parse(localStorage.getItem("nv_"+obra.id)||"{}")}catch{return {}}});

  const loadAll=useCallback(async()=>{
    setLoadingData(true);
    const[gRes,prRes,cRes,fRes,partRes,hRes,cRes2]=await Promise.all([
      supabase.from("gastos").select("*").eq("obra_id",obra.id).order("fecha",{ascending:false}),
      supabase.from("presupuestos").select("*").eq("obra_id",obra.id),
      supabase.from("categorias").select("*, subcategorias(*)").eq("obra_id",obra.id).order("orden"),
      supabase.from("fotos").select("*").eq("obra_id",obra.id).order("fecha",{ascending:false}),
      supabase.from("participantes").select("*").eq("obra_id",obra.id),
      supabase.from("hitos").select("*").eq("obra_id",obra.id).order("fecha_estimada"),
      supabase.from("comentarios_gasto").select("*").eq("obra_id",obra.id).order("created_at"),
    ]);
    setGastos(gRes.data||[]);setPresup(prRes.data||[]);
    setCats((cRes.data||[]).map(c=>({...c,subs:c.subcategorias||[]})));
    setFotos(fRes.data||[]);setPartic(partRes.data||[]);
    setHitos(hRes.data||[]);setComentarios(cRes2.data||[]);
    setLoadingData(false);
  },[obra.id]);
  useEffect(()=>{loadAll();},[loadAll]);

  const miP=partic.find(p=>p.user_id===user.id);
  const miRol=miP?.rol||"cliente";
  const puedoCargar=miP?.puede_cargar||false;
  const esAdmin=miRol==="arquitecto"||miRol==="ayudante";
  const tcRef=tcOficial||tcManual;
  const gastosVis=esAdmin?gastos:gastos.filter(g=>g.visibilidad==="publico");

  // Notificaciones: gastos nuevos no vistos
  const gastosNuevos=gastosVis.filter(g=>!notifVistas[g.id]).length;
  const totalNotifs=gastosNuevos;
  const marcarTodosVistos=()=>{const nv={...notifVistas};gastosVis.forEach(g=>{nv[g.id]=1;});comentarios.forEach(c=>{nv["c_"+c.id]=1;});setNotifVistas(nv);try{localStorage.setItem("nv_"+obra.id,JSON.stringify(nv));}catch{}};

  const TABS=[
    {id:"dashboard",label:"Dashboard",icon:"📊"},
    {id:"gastos",label:"Gastos",icon:"💸",badge:totalNotifs},
    ...(esAdmin?[{id:"presupuesto",label:"Presupuesto",icon:"📐"}]:[]),
    {id:"fotos",label:"Fotos",icon:"📷"},
    {id:"objetivos",label:"Objetivos",icon:"🏁"},
    {id:"reportes",label:"Reportes",icon:"📈"},
    ...(!esAdmin?[{id:"resumen",label:"Mi Resumen",icon:"📋"}]:[]),
    ...(esAdmin?[{id:"categorias",label:"Categorías",icon:"🏷️"}]:[]),
    ...(esAdmin?[{id:"participantes",label:"Participantes",icon:"👥"}]:[]),
    {id:"ipc",label:"IPC",icon:"📉"},
    {id:"usd",label:"USD",icon:"💵"},
  ];
  const goTab=id=>{setTab(id);setMobileMenu(false);if(id==="ipc")fetchIPC();if(id==="usd"){fetchIPC();fetchTCHist();}if(id==="gastos")marcarTodosVistos();};

  return <div style={{minHeight:"100vh",background:C.bg}}>
    <div style={{background:C.bg2,borderBottom:`1px solid ${C.bd}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:50}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={onBack} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:7,padding:"5px 10px",cursor:"pointer",color:C.t2,fontSize:11,fontWeight:600}}>← Obras</button>
          <Logo size={34}/>
          <div><div style={{fontWeight:700,fontSize:13,color:C.t}}>{obra.nombre}</div><div className="hide-mobile" style={{fontSize:10,color:C.t3}}>{obra.direccion}</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {/* Toggle ARS/USD */}
          <div style={{display:"flex",background:C.bg3,borderRadius:20,padding:3,border:`1px solid ${C.bd2}`}}>
            {["ARS","USD"].map(m=><button key={m} onClick={()=>setMonedaVista(m)} style={{padding:"4px 12px",fontSize:11,border:"none",borderRadius:16,cursor:"pointer",background:monedaVista===m?C.green:"transparent",color:monedaVista===m?"#fff":C.t2,fontWeight:monedaVista===m?700:400,transition:"all .2s"}}>{m}</button>)}
          </div>
          <Tag label={ROL_LABEL[miRol]} color={ROL_COLOR[miRol]}/>
          <Btn small onClick={onLogout}>Salir</Btn>
        </div>
      </div>
      {/* TC BAR */}
      <div style={{display:"flex",alignItems:"center",gap:8,paddingBottom:8,flexWrap:"wrap",borderTop:`1px solid ${C.bg3}`}}>
        <span style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:".06em",fontWeight:600}}>TC</span>
        <div style={{display:"flex",alignItems:"center",gap:5,background:C.bg3,borderRadius:7,padding:"3px 10px",border:`1px solid ${C.bd}`}}>
          <span style={{fontSize:10,color:C.t3}}>Oficial</span>
          <span style={{fontSize:12,fontWeight:700,color:C.green}}>{tcLoading?"···":tcOficial?`$${tcOficial.toLocaleString("es-AR")}`:"—"}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5,background:C.limaBg,borderRadius:7,padding:"3px 10px",border:`1px solid ${C.lima}44`}}>
          <span style={{fontSize:10,color:C.t3}}>Blue</span>
          <span style={{fontSize:12,fontWeight:700,color:C.lima}}>{tcLoading?"···":tcBlue?`$${tcBlue.toLocaleString("es-AR")}`:"—"}</span>
        </div>
        <button onClick={fetchTCs} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:6,padding:"3px 8px",cursor:"pointer",color:C.t2,fontSize:11}}>↻</button>
        <span className="hide-mobile" style={{fontSize:10,color:C.t3}}>Manual:</span>
        <input type="number" value={tcManual} onChange={e=>setTcManual(+e.target.value)} style={{...INP,width:82,padding:"3px 7px",fontSize:11}}/>
      </div>
      {/* TABS desktop */}
      <div className="hide-mobile" style={{display:"flex",overflowX:"auto",marginBottom:-1}}>
        {TABS.map(t=><button key={t.id} onClick={()=>goTab(t.id)} style={{padding:"8px 14px",fontSize:12,border:"none",borderBottom:tab===t.id?`2px solid ${C.green}`:"2px solid transparent",cursor:"pointer",background:"transparent",color:tab===t.id?C.green:C.t3,fontWeight:tab===t.id?600:400,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5,position:"relative"}}>
          <span>{t.icon}</span>{t.label}
          {t.badge>0&&<span style={{background:C.red,color:"#fff",fontSize:9,fontWeight:700,borderRadius:10,padding:"1px 5px",marginLeft:2,lineHeight:1.4}}>{t.badge}</span>}
        </button>)}
      </div>
      {/* TABS mobile */}
      <div className="show-mobile" style={{paddingBottom:8,flexDirection:"column",gap:4}}>
        <button onClick={()=>setMobileMenu(v=>!v)} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:7,padding:"6px 12px",cursor:"pointer",color:C.t2,fontSize:12,display:"flex",alignItems:"center",gap:6,width:"100%"}}>
          <span>{TABS.find(t=>t.id===tab)?.icon}</span><span>{TABS.find(t=>t.id===tab)?.label}</span>
          {totalNotifs>0&&<span style={{background:C.red,color:"#fff",fontSize:9,fontWeight:700,borderRadius:10,padding:"1px 5px",lineHeight:1.4}}>{totalNotifs}</span>}
          <span style={{marginLeft:"auto",fontSize:10}}>▾</span>
        </button>
        {mobileMenu&&<div style={{background:C.bg2,border:`1px solid ${C.bd2}`,borderRadius:10,padding:8,display:"flex",flexWrap:"wrap",gap:4}}>
          {TABS.map(t=><button key={t.id} onClick={()=>goTab(t.id)} style={{padding:"7px 12px",fontSize:12,border:`1px solid ${tab===t.id?C.green:C.bd}`,borderRadius:20,cursor:"pointer",background:tab===t.id?C.green+"18":"transparent",color:tab===t.id?C.green:C.t2,fontWeight:tab===t.id?600:400,display:"flex",alignItems:"center",gap:5}}>
            <span>{t.icon}</span>{t.label}
            {t.badge>0&&<span style={{background:C.red,color:"#fff",fontSize:9,fontWeight:700,borderRadius:10,padding:"1px 5px",lineHeight:1.4}}>{t.badge}</span>}
          </button>)}
        </div>}
      </div>
    </div>

    <div style={{padding:20,paddingBottom:100,maxWidth:1040,margin:"0 auto"}}>
      {loadingData?<Spinner/>:<>
        {tab==="dashboard"&&<DashboardTab obra={obra} gastos={gastosVis} esAdmin={esAdmin} presup={presup} tcRef={tcRef} partic={partic} cats={cats} fotos={fotos} hitos={hitos} monedaVista={monedaVista}/>}
        {tab==="gastos"&&<GastosTab user={user} obra={obra} gastos={gastos} esAdmin={esAdmin} puedoCargar={puedoCargar} tcOficial={tcOficial} tcBlue={tcBlue} tcManual={tcManual} setTcManual={setTcManual} cats={cats} toast={toast} reload={loadAll} monedaVista={monedaVista} externalOpen={showGastoModal} onExternalClose={()=>setShowGastoModal(false)} comentarios={comentarios} miUserId={user.id}/>}
        {tab==="presupuesto"&&esAdmin&&<PresupuestoTab obra={obra} gastos={gastos} presup={presup} tcRef={tcRef} cats={cats} toast={toast} reload={loadAll} monedaVista={monedaVista}/>}
        {tab==="fotos"&&<FotosTab obra={obra} fotos={fotos} puedoCargar={puedoCargar||esAdmin} user={user} toast={toast} reload={loadAll}/>}
        {tab==="objetivos"&&<HitosTab obra={obra} hitos={hitos} esAdmin={esAdmin} toast={toast} reload={loadAll}/>}
        {tab==="reportes"&&<ReportesTab obra={obra} gastos={gastosVis} presup={presup} tcRef={tcRef} cats={cats} esAdmin={esAdmin} monedaVista={monedaVista}/>}
        {tab==="resumen"&&!esAdmin&&<ResumenClienteTab obra={obra} gastos={gastosVis} presup={presup} tcRef={tcRef} cats={cats} fotos={fotos} hitos={hitos} monedaVista={monedaVista}/>}
        {tab==="categorias"&&esAdmin&&<CategoriasTab cats={cats} obra={obra} toast={toast} reload={loadAll}/>}
        {tab==="participantes"&&esAdmin&&<ParticipantesTab obra={obra} partic={partic} toast={toast} reload={loadAll}/>}
        {tab==="ipc"&&<IPCTab inflData={inflData}/>}
        {tab==="usd"&&<USDTab tcHistData={tcHistData} inflData={inflData} tcOficial={tcOficial} tcBlue={tcBlue}/>}
      </>}
    </div>

    {/* FAB — speed dial */}
    {(puedoCargar||esAdmin)&&<FABMenu onGasto={()=>{setTab("gastos");setShowGastoModal(true);}} onObjetivo={()=>setTab("objetivos")} esAdmin={esAdmin}/>}
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardTab({obra,gastos,esAdmin,presup,tcRef,partic,cats,fotos,hitos=[],monedaVista}){
  const enUSD=monedaVista==="USD";
  const conv=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  const totalMV=gastos.reduce((s,g)=>s+conv(g),0);
  const presupTotalARS=obra.presupuesto_total?(obra.moneda_presupuesto==="USD"?obra.presupuesto_total*tcRef:obra.presupuesto_total):0;
  const presupTotalMV=enUSD?presupTotalARS/tcRef:presupTotalARS;
  const pct=presupTotalMV>0?Math.min(Math.round((totalMV/presupTotalMV)*100),200):null;
  const byCat=useMemo(()=>{const r={};cats.forEach(c=>{r[c.id]=gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0);});return r;},[gastos,cats,tcRef,monedaVista]);
  const donutData=cats.map(c=>({color:c.color,val:byCat[c.id]||0,label:c.label})).filter(x=>x.val>0);
  const ultimos=gastos.slice(0,6);
  const ultimaFoto=fotos.length>0?fotos[0]:null;
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);
  const hitosActivos=hitos.filter(h=>h.estado!=="completado").slice(0,3);
  const hitosComp=hitos.filter(h=>h.estado==="completado").length;

  return <div className="fu">
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <StatCard label={`Ejecutado (${monedaVista})`} value={fmt(totalMV)} sub={`${gastos.length} movimientos`} color={C.green} icon="💸"/>
      {presupTotalMV>0&&<StatCard label="Presupuesto" value={fmt(presupTotalMV)} sub={pct!==null?`${pct}% ejecutado`:""} color={C.blue} icon="📐"/>}
      {presupTotalMV>0&&<StatCard label="Disponible" value={fmt(Math.max(0,presupTotalMV-totalMV))} sub={pct>=90?"⚠ Límite cercano":""} color={presupTotalMV-totalMV<0?C.red:C.lima} icon="📊"/>}
      <StatCard label="Participantes" value={partic.length} sub={`${fotos.length} foto${fotos.length!==1?"s":""}`} color={C.amber} icon="👥"/>
      {hitos.length>0&&<StatCard label="Hitos" value={`${hitosComp}/${hitos.length}`} sub={`${Math.round((hitosComp/hitos.length)*100)}% completados`} color={C.blue} icon="🏁"/>}
    </div>

    {presupTotalMV>0&&<Card style={{marginBottom:14}}>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,fontWeight:600}}>Avance presupuestario</div>
      <div style={{height:12,borderRadius:6,background:C.bg3,overflow:"hidden",marginBottom:6}}>
        <div style={{height:"100%",borderRadius:6,background:pct>=100?C.red:pct>=80?C.amber:C.green,width:`${Math.min(pct,100)}%`,transition:"width .6s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.t3}}>
        <span>Ejecutado: <b style={{color:C.t}}>{fmt(totalMV)}</b></span>
        <span style={{color:pct>=100?C.red:pct>=80?C.amber:C.green,fontWeight:700}}>{pct}%</span>
        <span>Presupuesto: <b style={{color:C.t}}>{fmt(presupTotalMV)}</b></span>
      </div>
    </Card>}

    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:14}}>
      <Card style={{flex:"1 1 260px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Por categoría</div>
        {donutData.length===0?<div style={{textAlign:"center",padding:"20px 0",color:C.t3}}>Sin datos</div>:
        <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
          <Donut data={donutData} size={110}/>
          <div style={{flex:1,minWidth:120}}>
            {[...donutData].sort((a,b)=>b.val-a.val).map(d=>{const p2=totalMV>0?Math.round((d.val/totalMV)*100):0;return <div key={d.label} style={{display:"flex",justifyContent:"space-between",marginBottom:7,fontSize:12}}><span style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:9,height:9,borderRadius:2,background:d.color,display:"inline-block"}}/><span style={{color:C.t2}}>{d.label}</span></span><span style={{color:d.color,fontWeight:700}}>{p2}%</span></div>;})}
          </div>
        </div>}
      </Card>
      <Card style={{flex:"2 1 280px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Gasto por categoría — ordenado por monto</div>
        {cats.filter(c=>byCat[c.id]>0).sort((a,b)=>(byCat[b.id]||0)-(byCat[a.id]||0)).map((c,i)=>{
          const p2=totalMV>0?Math.round((byCat[c.id]/totalMV)*100):0;
          return <div key={c.id} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4,alignItems:"center"}}>
              <span style={{color:C.t2,display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:18,height:18,borderRadius:4,background:c.color+"22",border:`1px solid ${c.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0}}>{i+1}</span>
                <span>{c.icon}</span>{c.label}
              </span>
              <span style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:10,color:C.t3,background:C.bg3,borderRadius:10,padding:"1px 7px",fontWeight:600}}>{p2}%</span>
                <span style={{color:c.color,fontWeight:700}}>{fmt(byCat[c.id])}</span>
              </span>
            </div>
            <div style={{height:7,borderRadius:4,background:C.bg3}}>
              <div style={{height:"100%",borderRadius:4,background:c.color,width:`${p2}%`,transition:"width .5s"}}/>
            </div>
          </div>;
        })}
        {donutData.length===0&&<div style={{color:C.t3,fontSize:12}}>Sin datos aún</div>}
        {donutData.length>0&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.bd}`,display:"flex",justifyContent:"space-between",fontSize:12}}>
          <span style={{color:C.t3}}>Total</span>
          <span style={{fontWeight:700,color:C.t}}>{fmt(totalMV)}</span>
        </div>}
      </Card>
    </div>

    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
      <Card style={{flex:"2 1 300px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Últimos movimientos</div>
        {ultimos.length===0&&<div style={{color:C.t3,fontSize:12}}>Sin movimientos</div>}
        {ultimos.map(g=>{
          const cat=cats.find(c=>c.id===g.cat_id);const sub=cat?.subs?.find(s=>s.id===g.sub_id);
          return <div key={g.id} style={{display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${C.bd}`,paddingBottom:9,marginBottom:9}}>
            <div style={{width:30,height:30,borderRadius:8,background:(cat?.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{cat?.icon||"📦"}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:C.t,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{g.descripcion||sub?.label||"—"}</div>
              <div style={{fontSize:10,color:C.t3}}>{cat?.label} · {g.fecha} · {g.cargado_por}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:13,fontWeight:700,color:cat?.color||C.green}}>{fmt(conv(g))}</div>
              {esAdmin&&<Tag label={g.visibilidad==="privado"?"🔒":"🌐"} color={g.visibilidad==="privado"?C.t3:C.green}/>}
            </div>
          </div>;
        })}
      </Card>
      {ultimaFoto&&<Card style={{flex:"1 1 200px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Última foto</div>
        <img src={ultimaFoto.url} alt={ultimaFoto.titulo} style={{width:"100%",borderRadius:10,objectFit:"cover",maxHeight:170}}/>
        <div style={{marginTop:8,fontSize:12,fontWeight:600,color:C.t}}>{ultimaFoto.titulo}</div>
        <div style={{fontSize:11,color:C.t3,marginTop:2}}>{ultimaFoto.fecha}{ultimaFoto.etapa&&` · ${ultimaFoto.etapa}`}</div>
      </Card>}
      {hitosActivos.length>0&&<Card style={{flex:"1 1 200px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Próximos hitos</div>
        {hitosActivos.map(h=>{
          const col=h.estado==="en_progreso"?C.amber:C.t3;
          return <div key={h.id} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${C.bd}`}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:col,marginTop:4,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:600,color:C.t}}>{h.titulo}</div>
              <div style={{fontSize:10,color:C.t3,marginTop:1}}>📅 {h.fecha_estimada}</div>
            </div>
            <Tag label={h.estado==="en_progreso"?"En curso":"Pendiente"} color={col}/>
          </div>;
        })}
      </Card>}
    </div>
  </div>;
}

// ── GASTOS ────────────────────────────────────────────────────────────────────
function GastosTab({user,obra,gastos,esAdmin,puedoCargar,tcOficial,tcBlue,tcManual,setTcManual,cats,toast,reload,monedaVista,externalOpen,onExternalClose,comentarios=[],miUserId}){
  const vis=gastos.filter(g=>esAdmin||g.visibilidad==="publico");
  const [showForm,setShowForm]=useState(false);
  const [filtro,setFiltro]=useState({cat:"todas",moneda:"todas",vis:"todas",q:""});
  const [tcTipo,setTcTipo]=useState("oficial");
  const [editM,setEditM]=useState(null);
  const [saving,setSaving]=useState(false);
  const [gastoComent,setGastoComent]=useState(null); // gasto seleccionado para comentarios
  const tcRef=tcOficial||tcManual;
  const tcVal=tcTipo==="oficial"?(tcOficial||tcManual):tcTipo==="blue"?(tcBlue||tcManual):tcManual;
  const enUSD=monedaVista==="USD";
  const conv=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);

  // Abrir form desde FAB externo
  useEffect(()=>{if(externalOpen){setShowForm(true);onExternalClose();}},[externalOpen]);

  const initD=()=>({fecha:todayISO(),cat_id:cats[0]?.id||"",sub_id:cats[0]?.subs?.[0]?.id||"",descripcion:"",monto:"",moneda:"ARS",visibilidad:"publico"});
  const [draft,setDraft]=useState(initD);
  const catD=cats.find(c=>c.id===draft.cat_id)||cats[0];
  const catE=editM?cats.find(c=>c.id===editM.cat_id)||cats[0]:null;

  const filtered=vis.filter(g=>{
    if(filtro.cat!=="todas"&&g.cat_id!==filtro.cat)return false;
    if(filtro.moneda!=="todas"&&g.moneda!==filtro.moneda)return false;
    if(filtro.vis!=="todas"&&g.visibilidad!==filtro.vis)return false;
    if(filtro.q){const q=filtro.q.toLowerCase();const sl=cats.find(c=>c.id===g.cat_id)?.subs?.find(s=>s.id===g.sub_id)?.label||"";if(!(g.descripcion||"").toLowerCase().includes(q)&&!sl.toLowerCase().includes(q))return false;}
    return true;
  });
  const total=filtered.reduce((s,g)=>s+conv(g),0);

  const save=async()=>{
    if(!draft.monto||parseFloat(draft.monto)<=0)return;setSaving(true);
    const{error}=await supabase.from("gastos").insert({obra_id:obra.id,fecha:draft.fecha,cat_id:draft.cat_id,sub_id:draft.sub_id,descripcion:draft.descripcion,monto:parseFloat(draft.monto),moneda:draft.moneda,tc_tipo:tcTipo,tc_valor:tcVal,visibilidad:esAdmin?draft.visibilidad:"publico",cargado_por:user.email,user_id:user.id});
    if(error)toast.error("Error: "+error.message);else{toast.success("Gasto registrado");await reload();}
    setDraft(initD());setShowForm(false);setSaving(false);
  };

  const saveEdit=async()=>{
    if(!editM||parseFloat(editM.monto)<=0)return;setSaving(true);
    const{error}=await supabase.from("gastos").update({fecha:editM.fecha,cat_id:editM.cat_id,sub_id:editM.sub_id,descripcion:editM.descripcion,monto:parseFloat(editM.monto),moneda:editM.moneda,visibilidad:editM.visibilidad}).eq("id",editM.id);
    if(error)toast.error("Error: "+error.message);else{toast.success("Gasto actualizado");await reload();}
    setEditM(null);setSaving(false);
  };

  const deleteG=async(id)=>{const{error}=await supabase.from("gastos").delete().eq("id",id);if(error)toast.error("Error al eliminar");else{toast.success("Gasto eliminado");await reload();}};
  const doExport=()=>exportCSV(filtered.map(g=>({Fecha:g.fecha,Categoria:cats.find(c=>c.id===g.cat_id)?.label||"",Subcategoria:cats.find(c=>c.id===g.cat_id)?.subs?.find(s=>s.id===g.sub_id)?.label||"",Descripcion:g.descripcion||"",Monto:g.monto,Moneda:g.moneda,TC_Tipo:g.tc_tipo,TC_Valor:g.tc_valor,Monto_ARS:toARS(g,tcRef),Visibilidad:g.visibilidad,Cargado_por:g.cargado_por})),`gastos_${obra.nombre.replace(/\s+/g,"_")}.csv`);

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
      <div><div style={{fontSize:16,fontWeight:700,color:C.t}}>Gastos</div><div style={{fontSize:12,color:C.t3}}>{filtered.length} registros · {fmt(total)}</div></div>
      <div style={{display:"flex",gap:8}}><Btn small onClick={doExport}>⬇ CSV</Btn>{puedoCargar&&<Btn primary onClick={()=>{setDraft(initD());setShowForm(v=>!v);}}>+ Nuevo gasto</Btn>}</div>
    </div>

    {showForm&&<Card style={{marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:14}}>Nuevo gasto</div>
      <div style={{background:C.bg3,border:`1px solid ${C.bd}`,borderRadius:10,padding:"10px 14px",marginBottom:14}}>
        <div style={{fontSize:11,color:C.t2,marginBottom:8,fontWeight:600}}>Tipo de cambio (se guarda con el TC del día):</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          {[{id:"oficial",label:`Oficial $${tcOficial?.toLocaleString("es-AR")||"—"}`,color:C.green},{id:"blue",label:`Blue $${tcBlue?.toLocaleString("es-AR")||"—"}`,color:C.lima},{id:"manual",label:"Manual",color:C.blue}].map(t=>(
            <button key={t.id} onClick={()=>setTcTipo(t.id)} style={{padding:"6px 14px",fontSize:12,border:`1px solid ${tcTipo===t.id?t.color:C.bd2}`,borderRadius:20,cursor:"pointer",background:tcTipo===t.id?t.color+"18":"transparent",color:tcTipo===t.id?t.color:C.t2,fontWeight:tcTipo===t.id?700:400}}>{t.label}</button>
          ))}
          {tcTipo==="manual"&&<input type="number" value={tcManual} onChange={e=>setTcManual(+e.target.value)} style={{...INP,width:90,padding:"4px 8px",fontSize:12}}/>}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10,marginBottom:12}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha</div><input style={INP} type="date" value={draft.fecha} onChange={e=>setDraft(d=>({...d,fecha:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Categoría</div>
          <select style={SEL} value={draft.cat_id} onChange={e=>{const c=cats.find(x=>x.id===e.target.value);setDraft(d=>({...d,cat_id:e.target.value,sub_id:c?.subs?.[0]?.id||""}));}}>
            {cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
        </div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Subcategoría</div>
          <select style={SEL} value={draft.sub_id} onChange={e=>setDraft(d=>({...d,sub_id:e.target.value}))}>
            {(catD?.subs||[]).map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Monto</div><input style={INP} type="number" placeholder="0" value={draft.monto} onChange={e=>setDraft(d=>({...d,monto:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div><select style={SEL} value={draft.moneda} onChange={e=>setDraft(d=>({...d,moneda:e.target.value}))}><option>ARS</option><option>USD</option></select></div>
        {esAdmin&&<div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Visibilidad</div>
          <select style={SEL} value={draft.visibilidad} onChange={e=>setDraft(d=>({...d,visibilidad:e.target.value}))}>
            <option value="publico">🌐 Público</option><option value="privado">🔒 Privado</option>
          </select>
        </div>}
        <div style={{gridColumn:"1/-1"}}><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción</div><input style={INP} placeholder="Detalle opcional..." value={draft.descripcion} onChange={e=>setDraft(d=>({...d,descripcion:e.target.value}))}/></div>
      </div>
      {draft.moneda==="USD"&&parseFloat(draft.monto)>0&&<div style={{background:C.limaBg,border:`1px solid ${C.lima}44`,borderRadius:7,padding:"7px 11px",fontSize:11,color:C.t2,marginBottom:10}}>≈ <b>{fmtARS(parseFloat(draft.monto)*tcVal)}</b> al TC {tcTipo} ${tcVal?.toLocaleString("es-AR")}</div>}
      {draft.moneda==="ARS"&&parseFloat(draft.monto)>0&&<div style={{background:C.limaBg,border:`1px solid ${C.lima}44`,borderRadius:7,padding:"7px 11px",fontSize:11,color:C.t2,marginBottom:10}}>≈ <b>{fmtUSD(parseFloat(draft.monto)/tcVal)}</b> al TC {tcTipo} ${tcVal?.toLocaleString("es-AR")}</div>}
      <div style={{display:"flex",gap:8}}><Btn primary onClick={save} loading={saving}>Guardar</Btn><Btn onClick={()=>setShowForm(false)}>Cancelar</Btn></div>
    </Card>}

    <div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
      <input style={{...INP,flex:"2 1 140px",padding:"6px 10px",fontSize:12}} placeholder="🔍 Buscar..." value={filtro.q} onChange={e=>setFiltro(f=>({...f,q:e.target.value}))}/>
      <select style={{...SEL,flex:"1 1 150px",padding:"5px 8px",fontSize:12}} value={filtro.cat} onChange={e=>setFiltro(f=>({...f,cat:e.target.value}))}>
        <option value="todas">Todas las categorías</option>{cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
      </select>
      <select style={{...SEL,flex:"0 1 110px",padding:"5px 8px",fontSize:12}} value={filtro.moneda} onChange={e=>setFiltro(f=>({...f,moneda:e.target.value}))}>
        <option value="todas">ARS + USD</option><option value="ARS">ARS</option><option value="USD">USD</option>
      </select>
      {esAdmin&&<select style={{...SEL,flex:"0 1 120px",padding:"5px 8px",fontSize:12}} value={filtro.vis} onChange={e=>setFiltro(f=>({...f,vis:e.target.value}))}>
        <option value="todas">Todas</option><option value="publico">🌐 Público</option><option value="privado">🔒 Privado</option>
      </select>}
    </div>

    <Card>
      <div className="hide-mobile" style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:580}}>
          <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
            {["Fecha","Categoría","Subcategoría","Descripción",`Monto (${monedaVista})`,"TC",esAdmin?"Vis.":null,"Por",""].filter(Boolean).map((h,i)=>(
              <th key={i} style={{padding:"8px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em",whiteSpace:"nowrap"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(g=>{
              const cat=cats.find(c=>c.id===g.cat_id);const sub=cat?.subs?.find(s=>s.id===g.sub_id);
              return <tr key={g.id} style={{borderBottom:`1px solid ${C.bd}`}}>
                <td style={{padding:"9px 10px",color:C.t3,fontSize:11,whiteSpace:"nowrap"}}>{g.fecha}</td>
                <td style={{padding:"9px 10px",whiteSpace:"nowrap"}}><span style={{display:"flex",alignItems:"center",gap:5,color:cat?.color||C.t,fontWeight:600}}><span>{cat?.icon}</span>{cat?.label}</span></td>
                <td style={{padding:"9px 10px",color:C.t2}}>{sub?.label||"—"}</td>
                <td style={{padding:"9px 10px",color:C.t2,maxWidth:150,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{g.descripcion||"—"}</td>
                <td style={{padding:"9px 10px",fontWeight:700,color:cat?.color||C.green,whiteSpace:"nowrap"}}>{fmt(conv(g))}</td>
                <td style={{padding:"9px 10px",whiteSpace:"nowrap"}}><span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:g.tc_tipo==="blue"?C.limaBg:C.bg3,color:g.tc_tipo==="blue"?C.lima:C.green,fontWeight:600,border:`1px solid ${g.tc_tipo==="blue"?C.lima+"44":C.bd}`}}>{g.tc_tipo} ${(g.tc_valor||0).toLocaleString("es-AR")}</span></td>
                {esAdmin&&<td style={{padding:"9px 10px"}}><Tag label={g.visibilidad==="privado"?"🔒":"🌐"} color={g.visibilidad==="privado"?C.t3:C.green}/></td>}
                <td style={{padding:"9px 10px",color:C.t3,fontSize:11,whiteSpace:"nowrap"}}>{g.cargado_por}</td>
                <td style={{padding:"9px 10px",textAlign:"right"}}>
                  <div style={{display:"flex",gap:4,justifyContent:"flex-end"}}>
                    {(()=>{const cnt=comentarios.filter(c=>c.gasto_id===g.id).length;return cnt>0?<button onClick={()=>setGastoComent(g)} style={{background:C.blue+"18",border:`1px solid ${C.blue}44`,borderRadius:5,padding:"3px 8px",cursor:"pointer",color:C.blue,fontSize:11}}>💬 {cnt}</button>:<button onClick={()=>setGastoComent(g)} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:5,padding:"3px 8px",cursor:"pointer",color:C.t3,fontSize:11}}>💬</button>;})()}
                    {esAdmin&&<button onClick={()=>setEditM({...g,monto:String(g.monto)})} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:5,padding:"3px 8px",cursor:"pointer",color:C.t2,fontSize:11}}>✎</button>}
                    {esAdmin&&<button onClick={()=>deleteG(g.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:16,padding:"0 3px"}}>×</button>}
                  </div>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{textAlign:"center",padding:"28px 0",color:C.t3}}>Sin resultados</div>}
      </div>
      <div className="show-mobile" style={{flexDirection:"column",gap:0}}>
        {filtered.map(g=>{const cat=cats.find(c=>c.id===g.cat_id);const sub=cat?.subs?.find(s=>s.id===g.sub_id);return <div key={g.id} style={{borderBottom:`1px solid ${C.bd}`,padding:"12px 0",display:"flex",gap:10,alignItems:"flex-start"}}><div style={{width:36,height:36,borderRadius:9,background:(cat?.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{cat?.icon||"📦"}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:700,color:cat?.color||C.green}}>{fmt(conv(g))}</div><div style={{fontSize:12,color:C.t2,marginTop:1}}>{sub?.label||cat?.label}</div>{g.descripcion&&<div style={{fontSize:11,color:C.t3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{g.descripcion}</div>}<div style={{fontSize:10,color:C.t3,marginTop:2}}>{g.fecha} · TC {g.tc_tipo}</div></div>{esAdmin&&<div style={{display:"flex",gap:4}}><button onClick={()=>setEditM({...g,monto:String(g.monto)})} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:5,padding:"3px 8px",cursor:"pointer",color:C.t2,fontSize:11}}>✎</button><button onClick={()=>deleteG(g.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:20,padding:"0 4px"}}>×</button></div>}</div>;})}
        {filtered.length===0&&<div style={{textAlign:"center",padding:"28px 0",color:C.t3}}>Sin resultados</div>}
      </div>
    </Card>

    {editM&&<Modal title="Editar gasto" onClose={()=>setEditM(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha</div><input style={INP} type="date" value={editM.fecha} onChange={e=>setEditM(m=>({...m,fecha:e.target.value}))}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Monto</div><input style={INP} type="number" value={editM.monto} onChange={e=>setEditM(m=>({...m,monto:e.target.value}))}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Categoría</div>
            <select style={SEL} value={editM.cat_id} onChange={e=>{const c=cats.find(x=>x.id===e.target.value);setEditM(m=>({...m,cat_id:e.target.value,sub_id:c?.subs?.[0]?.id||""}));}}>
              {cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Subcategoría</div>
            <select style={SEL} value={editM.sub_id} onChange={e=>setEditM(m=>({...m,sub_id:e.target.value}))}>
              {(catE?.subs||[]).map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div><select style={SEL} value={editM.moneda} onChange={e=>setEditM(m=>({...m,moneda:e.target.value}))}><option>ARS</option><option>USD</option></select></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Visibilidad</div><select style={SEL} value={editM.visibilidad} onChange={e=>setEditM(m=>({...m,visibilidad:e.target.value}))}><option value="publico">🌐 Público</option><option value="privado">🔒 Privado</option></select></div>
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción</div><input style={INP} value={editM.descripcion||""} onChange={e=>setEditM(m=>({...m,descripcion:e.target.value}))}/></div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={saveEdit} loading={saving}>Guardar</Btn><Btn onClick={()=>setEditM(null)}>Cancelar</Btn></div>
      </div>
    </Modal>}
    {gastoComent&&<ComentariosModal gasto={gastoComent} comentarios={comentarios.filter(c=>c.gasto_id===gastoComent.id)} obra={obra} user={user} esAdmin={esAdmin} toast={toast} reload={reload} onClose={()=>setGastoComent(null)}/>}
  </div>;
}

// ── PRESUPUESTO ───────────────────────────────────────────────────────────────
function PresupuestoTab({obra,gastos,presup,tcRef,cats,toast,reload,monedaVista}){
  const [modal,setModal]=useState(false);
  const [draft,setDraft]=useState({cat_id:cats[0]?.id||"",monto:"",moneda:"ARS"});
  const [saving,setSaving]=useState(false);
  const enUSD=monedaVista==="USD";
  const conv=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);
  const toMV=p=>enUSD?(p.moneda==="USD"?p.monto:p.monto/tcRef):(p.moneda==="USD"?p.monto*tcRef:p.monto);
  const totalPMV=presup.reduce((s,p)=>s+toMV(p),0);
  const totalEMV=gastos.reduce((s,g)=>s+conv(g),0);

  const save=async()=>{
    if(!draft.monto||parseFloat(draft.monto)<=0)return;setSaving(true);
    const ex=presup.find(p=>p.cat_id===draft.cat_id);
    if(ex){const{error}=await supabase.from("presupuestos").update({monto:parseFloat(draft.monto),moneda:draft.moneda}).eq("id",ex.id);if(error){toast.error("Error");setSaving(false);return;}}
    else{const{error}=await supabase.from("presupuestos").insert({obra_id:obra.id,cat_id:draft.cat_id,monto:parseFloat(draft.monto),moneda:draft.moneda});if(error){toast.error("Error");setSaving(false);return;}}
    toast.success("Presupuesto guardado");await reload();setModal(false);setSaving(false);
  };
  const deleteP=async(id)=>{const{error}=await supabase.from("presupuestos").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}};
  const doExport=()=>exportCSV([...presup.map(p=>{const cat=cats.find(c=>c.id===p.cat_id);const ej=gastos.filter(g=>g.cat_id===p.cat_id).reduce((s,g)=>s+toARS(g,tcRef),0);const pA=p.moneda==="USD"?p.monto*tcRef:p.monto;return{Categoria:cat?.label||"",Presupuesto:p.monto,Moneda:p.moneda,Presupuesto_ARS:Math.round(pA),Ejecutado_ARS:Math.round(ej),Diferencia:Math.round(pA-ej),Porc:pA>0?Math.round((ej/pA)*100)+"%":"—"};}),{Categoria:"TOTAL",Presupuesto:"—",Moneda:"—",Presupuesto_ARS:Math.round(presup.reduce((s,p)=>s+(p.moneda==="USD"?p.monto*tcRef:p.monto),0)),Ejecutado_ARS:Math.round(gastos.reduce((s,g)=>s+toARS(g,tcRef),0)),Diferencia:"—",Porc:"—"}],`presupuesto_${obra.nombre.replace(/\s+/g,"_")}.csv`);

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
      <div><div style={{fontSize:16,fontWeight:700,color:C.t}}>Presupuesto por categoría</div><div style={{fontSize:12,color:C.t3}}>Total presup: {fmt(totalPMV)} · Ejecutado: {fmt(totalEMV)}</div></div>
      <div style={{display:"flex",gap:8}}><Btn small onClick={doExport}>⬇ CSV</Btn><Btn primary onClick={()=>{setDraft({cat_id:cats[0]?.id||"",monto:"",moneda:"ARS"});setModal(true);}}>+ Agregar</Btn></div>
    </div>

    {/* Resumen total */}
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
      <StatCard label={`Presupuesto total (${monedaVista})`} value={fmt(totalPMV)} color={C.blue} icon="📐"/>
      <StatCard label={`Ejecutado (${monedaVista})`} value={fmt(totalEMV)} color={C.green} icon="💸"/>
      <StatCard label={`Disponible (${monedaVista})`} value={fmt(Math.max(0,totalPMV-totalEMV))} color={totalPMV-totalEMV<0?C.red:C.lima} icon="✅"/>
      {obra.presupuesto_total>0&&<StatCard label="Presup. general obra" value={fmtM(obra.presupuesto_total,obra.moneda_presupuesto)} color={C.amber} icon="🏗️"/>}
    </div>

    <Card>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:480}}>
          <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
            {["Categoría",`Presupuesto (${monedaVista})`,`Ejecutado (${monedaVista})`,"Diferencia","Avance",""].map((h,i)=>(
              <th key={i} style={{padding:"8px 10px",textAlign:i>=1&&i<=4?"right":i===5?"right":"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em",whiteSpace:"nowrap"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {cats.map(cat=>{
              const p=presup.find(x=>x.cat_id===cat.id);
              const ejMV=gastos.filter(g=>g.cat_id===cat.id).reduce((s,g)=>s+conv(g),0);
              if(!p&&ejMV===0)return null;
              const pMV=p?toMV(p):0;
              const pct=pMV>0?Math.min(Math.round((ejMV/pMV)*100),200):null;
              const diff=pMV-ejMV;
              const col=pct===null?C.t3:pct>=100?C.red:pct>=80?C.amber:C.green;
              return <tr key={cat.id} style={{borderBottom:`1px solid ${C.bd}`}}>
                <td style={{padding:"10px"}}><span style={{display:"flex",alignItems:"center",gap:7}}><span style={{width:30,height:30,borderRadius:8,background:cat.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{cat.icon}</span><span style={{fontWeight:600,color:C.t}}>{cat.label}</span></span></td>
                <td style={{padding:"10px",textAlign:"right",color:C.t2,whiteSpace:"nowrap"}}>{p?fmt(pMV):"—"}</td>
                <td style={{padding:"10px",textAlign:"right",fontWeight:700,color:cat.color,whiteSpace:"nowrap"}}>{fmt(ejMV)}</td>
                <td style={{padding:"10px",textAlign:"right",color:pMV>0?(diff>=0?C.green:C.red):C.t3,fontWeight:600,whiteSpace:"nowrap"}}>{pMV>0?fmt(diff):"—"}</td>
                <td style={{padding:"10px",minWidth:120}}>
                  {pct!==null?<><div style={{height:6,borderRadius:3,background:C.bg3,marginBottom:3}}><div style={{height:"100%",borderRadius:3,background:col,width:`${Math.min(pct,100)}%`,transition:"width .5s"}}/></div><span style={{fontSize:10,color:col,fontWeight:700}}>{pct}%</span></>:<span style={{fontSize:11,color:C.t3}}>Sin presup.</span>}
                </td>
                <td style={{padding:"10px",textAlign:"right"}}>{p&&<button onClick={()=>deleteP(p.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:16}}>×</button>}</td>
              </tr>;
            })}
          </tbody>
          <tfoot><tr style={{borderTop:`2px solid ${C.bd2}`,background:C.bg3}}>
            <td style={{padding:"10px",fontWeight:700,color:C.t}}>TOTAL</td>
            <td style={{padding:"10px",textAlign:"right",fontWeight:700,color:C.t}}>{fmt(totalPMV)}</td>
            <td style={{padding:"10px",textAlign:"right",fontWeight:700,color:C.green}}>{fmt(totalEMV)}</td>
            <td style={{padding:"10px",textAlign:"right",fontWeight:700,color:totalPMV-totalEMV>=0?C.green:C.red}}>{fmt(totalPMV-totalEMV)}</td>
            <td colSpan={2}/>
          </tr></tfoot>
        </table>
      </div>
    </Card>

    {modal&&<Modal title="Agregar presupuesto de categoría" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Categoría</div><select style={SEL} value={draft.cat_id} onChange={e=>setDraft(d=>({...d,cat_id:e.target.value}))}>{cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}</select></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 90px",gap:8}}>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Monto</div><input style={INP} type="number" placeholder="0" value={draft.monto} onChange={e=>setDraft(d=>({...d,monto:e.target.value}))}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div><select style={SEL} value={draft.moneda} onChange={e=>setDraft(d=>({...d,moneda:e.target.value}))}><option>ARS</option><option>USD</option></select></div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={save} loading={saving}>Guardar</Btn><Btn onClick={()=>setModal(false)}>Cancelar</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── FOTOS ─────────────────────────────────────────────────────────────────────
function FotosTab({obra,fotos,puedoCargar,user,toast,reload}){
  const [modal,setModal]=useState(false);
  const [draft,setDraft]=useState({titulo:"",fecha:todayISO(),etapa:"",file:null,preview:null,nombre:""});
  const [etapaF,setEtapaF]=useState("todas");
  const [saving,setSaving]=useState(false);
  const [lightbox,setLightbox]=useState(null);
  const [vistaGrilla,setVistaGrilla]=useState(true);
  const fileRef=useRef();
  const etapas=[...new Set(fotos.map(f=>f.etapa).filter(Boolean))];
  const handleFile=e=>{const file=e.target.files[0];if(!file)return;setDraft(d=>({...d,file,preview:URL.createObjectURL(file),nombre:file.name}));};
  const save=async()=>{
    if(!draft.file||!draft.titulo.trim())return;setSaving(true);
    const ext=draft.file.name.split(".").pop();const path=`${user.id}/${obra.id}/${Date.now()}.${ext}`;
    const{error:upErr}=await supabase.storage.from("obra-fotos").upload(path,draft.file);
    if(upErr){toast.error("Error al subir: "+upErr.message);setSaving(false);return;}
    const{data:{publicUrl}}=supabase.storage.from("obra-fotos").getPublicUrl(path);
    const{error}=await supabase.from("fotos").insert({obra_id:obra.id,titulo:draft.titulo.trim(),fecha:draft.fecha,etapa:draft.etapa,storage_path:path,url:publicUrl,user_id:user.id});
    if(error)toast.error("Error al guardar foto");else{toast.success("Foto subida");await reload();}
    setDraft({titulo:"",fecha:todayISO(),etapa:"",file:null,preview:null,nombre:""});setModal(false);setSaving(false);
  };
  const deleteFoto=async(foto)=>{if(foto.storage_path)await supabase.storage.from("obra-fotos").remove([foto.storage_path]);const{error}=await supabase.from("fotos").delete().eq("id",foto.id);if(error)toast.error("Error");else{toast.success("Foto eliminada");await reload();}};
  const filtradas=fotos.filter(f=>etapaF==="todas"||f.etapa===etapaF);

  // Agrupar por etapa para vista cronológica
  const porEtapa=etapas.reduce((acc,e)=>{acc[e]=filtradas.filter(f=>f.etapa===e);return acc;},{});
  const sinEtapa=filtradas.filter(f=>!f.etapa);

  const FotoCard=({f})=>(
    <div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:14,overflow:"hidden",boxShadow:"0 1px 6px rgba(42,80,28,.07)"}}>
      <div style={{position:"relative",cursor:"zoom-in"}} onClick={()=>setLightbox(f)}>
        <img src={f.url} alt={f.titulo} style={{width:"100%",height:175,objectFit:"cover",display:"block"}}/>
        {f.etapa&&<div style={{position:"absolute",top:8,left:8}}><Tag label={f.etapa} color={C.green}/></div>}
        {puedoCargar&&<button onClick={e=>{e.stopPropagation();deleteFoto(f);}} style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.55)",border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer",color:"#fff",fontSize:12}}>×</button>}
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.5)",padding:"20px 12px 8px"}}>
          <div style={{color:"#fff",fontWeight:700,fontSize:12}}>{f.titulo}</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:10}}>{f.fecha}</div>
        </div>
      </div>
    </div>
  );

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
      <div><div style={{fontSize:16,fontWeight:700,color:C.t}}>Fotos de Obra</div><div style={{fontSize:12,color:C.t3}}>{fotos.length} foto{fotos.length!==1?"s":""} · {etapas.length} etapa{etapas.length!==1?"s":""}</div></div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <div style={{display:"flex",background:C.bg3,borderRadius:8,padding:2,border:`1px solid ${C.bd2}`}}>
          {[{v:true,icon:"⊞"},{v:false,icon:"☰"}].map(o=><button key={String(o.v)} onClick={()=>setVistaGrilla(o.v)} style={{padding:"4px 10px",fontSize:14,border:"none",borderRadius:6,cursor:"pointer",background:vistaGrilla===o.v?C.bg2:"transparent",color:vistaGrilla===o.v?C.t:C.t3}}>{o.icon}</button>)}
        </div>
        {puedoCargar&&<Btn primary onClick={()=>{setDraft({titulo:"",fecha:todayISO(),etapa:"",file:null,preview:null,nombre:""});setModal(true);}}>+ Subir foto</Btn>}
      </div>
    </div>

    {/* Filtro por etapa */}
    {etapas.length>0&&<div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
      {["todas",...etapas].map(e=><button key={e} onClick={()=>setEtapaF(e)} style={{padding:"5px 14px",fontSize:12,border:`1px solid ${etapaF===e?C.green:C.bd2}`,borderRadius:20,cursor:"pointer",background:etapaF===e?C.green+"18":"transparent",color:etapaF===e?C.green:C.t2,fontWeight:etapaF===e?700:400,display:"flex",alignItems:"center",gap:5}}>
        {e==="todas"?"📷 Todas":e}
        <span style={{fontSize:10,color:etapaF===e?C.green:C.t3}}>{e==="todas"?fotos.length:fotos.filter(f=>f.etapa===e).length}</span>
      </button>)}
    </div>}

    {filtradas.length===0&&<Card><div style={{textAlign:"center",padding:"48px 0"}}><div style={{fontSize:44,marginBottom:12}}>📷</div><div style={{fontSize:14,fontWeight:600,color:C.t2,marginBottom:6}}>Sin fotos cargadas</div><div style={{fontSize:12,color:C.t3,marginBottom:16}}>Subí fotos para registrar el avance</div>{puedoCargar&&<Btn primary onClick={()=>setModal(true)}>+ Subir primera foto</Btn>}</div></Card>}

    {/* Vista grilla agrupada por etapa */}
    {vistaGrilla&&etapaF==="todas"&&etapas.length>0?<>
      {etapas.map(etapa=><div key={etapa} style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,color:C.t}}>{etapa}</div>
          <div style={{height:1,flex:1,background:C.bd2}}/>
          <span style={{fontSize:11,color:C.t3}}>{porEtapa[etapa]?.length||0} foto{(porEtapa[etapa]?.length||0)!==1?"s":""}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
          {(porEtapa[etapa]||[]).map(f=><FotoCard key={f.id} f={f}/>)}
        </div>
      </div>)}
      {sinEtapa.length>0&&<div style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,color:C.t}}>Sin etapa</div>
          <div style={{height:1,flex:1,background:C.bd2}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
          {sinEtapa.map(f=><FotoCard key={f.id} f={f}/>)}
        </div>
      </div>}
    </>:<div style={{display:vistaGrilla?"grid":"flex",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",flexDirection:"column",gap:vistaGrilla?12:8}}>
      {filtradas.map(f=>vistaGrilla?<FotoCard key={f.id} f={f}/>:
        <div key={f.id} style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:10,padding:"10px 14px",display:"flex",gap:12,alignItems:"center",cursor:"zoom-in"}} onClick={()=>setLightbox(f)}>
          <img src={f.url} alt={f.titulo} style={{width:60,height:60,borderRadius:8,objectFit:"cover",flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:13,color:C.t}}>{f.titulo}</div>
            <div style={{fontSize:11,color:C.t3,marginTop:2}}>{f.fecha}{f.etapa&&` · ${f.etapa}`}</div>
          </div>
          {puedoCargar&&<button onClick={e=>{e.stopPropagation();deleteFoto(f);}} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:18}}>×</button>}
        </div>
      )}
    </div>}

    {/* Lightbox */}
    {lightbox&&<div onClick={()=>setLightbox(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.88)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{maxWidth:900,width:"100%",position:"relative"}} onClick={e=>e.stopPropagation()}>
        <img src={lightbox.url} alt={lightbox.titulo} style={{width:"100%",borderRadius:12,maxHeight:"80vh",objectFit:"contain",display:"block"}}/>
        <div style={{color:"#fff",marginTop:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontWeight:700,fontSize:15}}>{lightbox.titulo}</div>
            <div style={{fontSize:12,opacity:.6,marginTop:3}}>{lightbox.fecha}{lightbox.etapa&&` · ${lightbox.etapa}`}</div>
          </div>
          <button onClick={()=>setLightbox(null)} style={{background:"rgba(255,255,255,.15)",border:"none",borderRadius:8,width:36,height:36,cursor:"pointer",color:"#fff",fontSize:20}}>×</button>
        </div>
      </div>
    </div>}

    {modal&&<Modal title="Subir foto" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div onClick={()=>fileRef.current.click()} style={{border:`2px dashed ${draft.preview?C.green:C.bd2}`,borderRadius:12,padding:"24px 16px",textAlign:"center",cursor:"pointer",background:draft.preview?C.bg3:"transparent"}}>
          {draft.preview?<><img src={draft.preview} alt="" style={{maxHeight:150,maxWidth:"100%",borderRadius:8,objectFit:"contain",marginBottom:8}}/><div style={{fontSize:12,color:C.green,fontWeight:600}}>✓ {draft.nombre}</div></>:<><div style={{fontSize:40,marginBottom:8}}>📷</div><div style={{fontSize:13,fontWeight:600,color:C.t2}}>Seleccionar foto</div><div style={{fontSize:11,color:C.t3}}>JPG, PNG, WEBP</div></>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Título *</div><input style={INP} placeholder="Ej: Losa planta baja" value={draft.titulo} onChange={e=>setDraft(d=>({...d,titulo:e.target.value}))}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha</div><input style={INP} type="date" value={draft.fecha} onChange={e=>setDraft(d=>({...d,fecha:e.target.value}))}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Etapa</div><input style={INP} list="etapas-dl" placeholder="Ej: Estructura" value={draft.etapa} onChange={e=>setDraft(d=>({...d,etapa:e.target.value}))}/><datalist id="etapas-dl">{["Demolición","Excavación","Estructura","Mampostería","Instalaciones","Carpintería","Terminaciones","Exterior","Final"].map(e=><option key={e} value={e}/>)}</datalist></div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={save} disabled={!draft.file||!draft.titulo.trim()} loading={saving}>Subir</Btn><Btn onClick={()=>setModal(false)}>Cancelar</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── COMENTARIOS MODAL ─────────────────────────────────────────────────────────
function ComentariosModal({gasto,comentarios,obra,user,esAdmin,toast,reload,onClose}){
  const [texto,setTexto]=useState("");
  const [visib,setVisib]=useState("publico");
  const [saving,setSaving]=useState(false);
  const textRef=useRef();
  useEffect(()=>{textRef.current?.focus();},[]);

  const save=async()=>{
    if(!texto.trim())return;setSaving(true);
    const{error}=await supabase.from("comentarios_gasto").insert({
      obra_id:obra.id,gasto_id:gasto.id,
      texto:texto.trim(),visibilidad:esAdmin?visib:"publico",
      autor:user.email,user_id:user.id,
      created_at:new Date().toISOString()
    });
    if(error)toast.error("Error: "+error.message);
    else{toast.success("Comentario guardado");await reload();}
    setTexto("");setSaving(false);
  };
  const del=async(id)=>{await supabase.from("comentarios_gasto").delete().eq("id",id);await reload();};

  const visComments=esAdmin?comentarios:comentarios.filter(c=>c.visibilidad==="publico");

  return <Modal title={`💬 Notas — ${gasto.descripcion||gasto.sub_id||"Gasto"}`} onClose={onClose} wide>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {/* Lista comentarios */}
      <div style={{maxHeight:260,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
        {visComments.length===0&&<div style={{textAlign:"center",padding:"20px 0",color:C.t3,fontSize:12}}>Sin notas todavía.</div>}
        {visComments.map(c=>(
          <div key={c.id} style={{background:c.visibilidad==="privado"?C.bg3:C.bg2,border:`1px solid ${c.visibilidad==="privado"?C.amber+"44":C.bd}`,borderRadius:10,padding:"10px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:12,fontWeight:600,color:C.t2}}>{c.autor}</span>
                {c.visibilidad==="privado"&&<Tag label="🔒 Solo arquitecto" color={C.amber}/>}
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:10,color:C.t3}}>{c.created_at?.slice(0,10)}</span>
                {(esAdmin||c.user_id===user.id)&&<button onClick={()=>del(c.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:14}}>×</button>}
              </div>
            </div>
            <div style={{fontSize:13,color:C.t,lineHeight:1.5}}>{c.texto}</div>
          </div>
        ))}
      </div>
      {/* Nueva nota */}
      <div style={{borderTop:`1px solid ${C.bd}`,paddingTop:12}}>
        <div style={{fontSize:11,color:C.t2,marginBottom:6,fontWeight:600}}>Nueva nota</div>
        <textarea ref={textRef} style={{...INP,resize:"vertical",minHeight:70}} placeholder="Escribí una nota sobre este gasto..." value={texto} onChange={e=>setTexto(e.target.value)}/>
        {esAdmin&&<div style={{display:"flex",gap:8,marginTop:8,alignItems:"center"}}>
          {[{v:"publico",label:"🌐 Visible para el cliente"},{v:"privado",label:"🔒 Solo para mí"}].map(o=>(
            <button key={o.v} onClick={()=>setVisib(o.v)} style={{padding:"5px 12px",fontSize:11,border:`1px solid ${visib===o.v?(o.v==="privado"?C.amber:C.green):C.bd2}`,borderRadius:20,cursor:"pointer",background:visib===o.v?(o.v==="privado"?C.amber+"18":C.green+"18"):"transparent",color:visib===o.v?(o.v==="privado"?C.amber:C.green):C.t2,fontWeight:visib===o.v?700:400}}>{o.label}</button>
          ))}
        </div>}
        <div style={{display:"flex",gap:8,marginTop:10}}>
          <Btn primary onClick={save} loading={saving} disabled={!texto.trim()}>Guardar nota</Btn>
          <Btn onClick={onClose}>Cerrar</Btn>
        </div>
      </div>
    </div>
  </Modal>;
}

// ── HITOS ─────────────────────────────────────────────────────────────────────
function HitosTab({obra,hitos,esAdmin,toast,reload}){
  const [modal,setModal]=useState(false);
  const [saving,setSaving]=useState(false);
  const [draft,setDraft]=useState({titulo:"",descripcion:"",fecha_estimada:"",estado:"pendiente"});

  const save=async()=>{
    if(!draft.titulo.trim()||!draft.fecha_estimada)return;setSaving(true);
    const{error}=await supabase.from("hitos").insert({obra_id:obra.id,...draft,titulo:draft.titulo.trim()});
    if(error)toast.error("Error: "+error.message);
    else{toast.success("Hito creado");await reload();}
    setDraft({titulo:"",descripcion:"",fecha_estimada:"",estado:"pendiente"});setModal(false);setSaving(false);
  };
  const updateEstado=async(id,estado)=>{
    const{error}=await supabase.from("hitos").update({estado}).eq("id",id);
    if(error)toast.error("Error");else await reload();
  };
  const deleteH=async(id)=>{
    const{error}=await supabase.from("hitos").delete().eq("id",id);
    if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}
  };

  const EC={
    pendiente:{color:C.t3,label:"Pendiente",dot:"○"},
    en_progreso:{color:C.amber,label:"En progreso",dot:"◑"},
    completado:{color:C.green,label:"Completado",dot:"●"},
  };
  const completados=hitos.filter(h=>h.estado==="completado").length;
  const pct=hitos.length>0?Math.round((completados/hitos.length)*100):0;

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
      <div>
        <div style={{fontSize:16,fontWeight:700,color:C.t}}>Hitos de Obra</div>
        <div style={{fontSize:12,color:C.t3}}>{completados}/{hitos.length} completados · {pct}% avanzado</div>
      </div>
      {esAdmin&&<Btn primary onClick={()=>setModal(true)}>+ Nuevo hito</Btn>}
    </div>

    {hitos.length>0&&<Card style={{marginBottom:16}}>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,fontWeight:600}}>Avance general de obra</div>
      <div style={{height:10,borderRadius:5,background:C.bg3,overflow:"hidden",marginBottom:6}}>
        <div style={{height:"100%",borderRadius:5,background:pct===100?C.green:C.lima,width:`${pct}%`,transition:"width .6s ease"}}/>
      </div>
      <div style={{fontSize:11,color:C.t3,textAlign:"right",fontWeight:600,color:pct===100?C.green:C.t3}}>{pct}%{pct===100?" ✓ Obra finalizada":""}</div>
    </Card>}

    {hitos.length===0&&<Card><div style={{textAlign:"center",padding:"48px 0"}}>
      <div style={{fontSize:44,marginBottom:12}}>🏁</div>
      <div style={{fontSize:14,fontWeight:600,color:C.t2,marginBottom:6}}>Sin hitos definidos</div>
      <div style={{fontSize:12,color:C.t3,marginBottom:16}}>Los hitos marcan las etapas clave de la obra y son visibles para todos</div>
      {esAdmin&&<Btn primary onClick={()=>setModal(true)}>+ Crear primer hito</Btn>}
    </div></Card>}

    {/* Timeline */}
    <div style={{display:"flex",flexDirection:"column",gap:0}}>
      {hitos.map((h,i)=>{
        const ec=EC[h.estado]||EC.pendiente;
        const isLast=i===hitos.length-1;
        return <div key={h.id} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          {/* Línea vertical */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,width:28}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:ec.color+"22",border:`2px solid ${ec.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:ec.color,fontWeight:700,zIndex:1}}>{ec.dot}</div>
            {!isLast&&<div style={{width:2,flexGrow:1,background:C.bd2,minHeight:24,marginTop:2}}/>}
          </div>
          {/* Contenido */}
          <div style={{flex:1,paddingBottom:isLast?0:16}}>
            <Card style={{padding:"12px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:13,color:h.estado==="completado"?C.t3:C.t,textDecoration:h.estado==="completado"?"line-through":"none"}}>{h.titulo}</div>
                  {h.descripcion&&<div style={{fontSize:12,color:C.t3,marginTop:3}}>{h.descripcion}</div>}
                  <div style={{fontSize:11,color:C.t3,marginTop:5}}>📅 Estimado: {h.fecha_estimada}</div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                  {esAdmin?<select value={h.estado} onChange={e=>updateEstado(h.id,e.target.value)} style={{...SEL,width:"auto",padding:"5px 8px",fontSize:11,borderColor:ec.color+"66"}}>
                    {Object.entries(EC).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                  </select>:<Tag label={ec.label} color={ec.color}/>}
                  {esAdmin&&<button onClick={()=>deleteH(h.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:18}}>×</button>}
                </div>
              </div>
            </Card>
          </div>
        </div>;
      })}
    </div>

    {modal&&<Modal title="Nuevo hito" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Título *</div><input style={INP} placeholder="Ej: Losa planta alta terminada" value={draft.titulo} onChange={e=>setDraft(d=>({...d,titulo:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción</div><input style={INP} placeholder="Detalle opcional..." value={draft.descripcion} onChange={e=>setDraft(d=>({...d,descripcion:e.target.value}))}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha estimada *</div><input style={INP} type="date" value={draft.fecha_estimada} onChange={e=>setDraft(d=>({...d,fecha_estimada:e.target.value}))}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Estado inicial</div>
            <select style={SEL} value={draft.estado} onChange={e=>setDraft(d=>({...d,estado:e.target.value}))}>
              {Object.entries(EC).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={save} loading={saving}>Crear</Btn><Btn onClick={()=>setModal(false)}>Cancelar</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── RESUMEN CLIENTE ───────────────────────────────────────────────────────────
function ResumenClienteTab({obra,gastos,presup,tcRef,cats,fotos,hitos=[],monedaVista}){
  const enUSD=monedaVista==="USD";
  const conv=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);
  const totalGastado=gastos.reduce((s,g)=>s+conv(g),0);
  const presupTotalARS=obra.presupuesto_total?(obra.moneda_presupuesto==="USD"?obra.presupuesto_total*tcRef:obra.presupuesto_total):0;
  const presupTotalMV=enUSD?presupTotalARS/tcRef:presupTotalARS;
  const pct=presupTotalMV>0?Math.min(Math.round((totalGastado/presupTotalMV)*100),200):null;
  const byCat=cats.map(c=>({...c,total:gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0)})).filter(c=>c.total>0).sort((a,b)=>b.total-a.total);
  const ultimaFoto=fotos[0]||null;
  const hitosComp=hitos.filter(h=>h.estado==="completado").length;
  const hitoPct=hitos.length>0?Math.round((hitosComp/hitos.length)*100):null;
  const ultimoGasto=gastos[0]||null;

  return <div className="fu">
    <div style={{marginBottom:20}}>
      <div style={{fontSize:18,fontWeight:700,color:C.t,marginBottom:4}}>📋 Tu resumen de obra</div>
      <div style={{fontSize:13,color:C.t3}}>{obra.nombre} · {obra.direccion}</div>
    </div>

    {/* Estado general */}
    <Card style={{marginBottom:14,background:`linear-gradient(135deg, ${C.limaBg} 0%, #fff 100%)`,border:`1px solid ${C.lima}44`}}>
      <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{fontSize:44}}>🏗️</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:16,color:C.t,marginBottom:4}}>{obra.nombre}</div>
          <Tag label={obra.estado} color={obra.estado==="En ejecución"?C.green:obra.estado==="Finalizada"?C.blue:C.amber}/>
          <div style={{fontSize:12,color:C.t3,marginTop:6}}>{obra.direccion}</div>
        </div>
        {obra.presupuesto_total>0&&<div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:C.t3}}>Presupuesto total</div>
          <div style={{fontSize:18,fontWeight:700,color:C.t}}>{fmtM(obra.presupuesto_total,obra.moneda_presupuesto)}</div>
        </div>}
      </div>
    </Card>

    {/* Avance financiero */}
    {presupTotalMV>0&&<Card style={{marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:12}}>💰 Avance financiero</div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
        <StatCard label="Ejecutado" value={fmt(totalGastado)} sub={`${gastos.length} movimientos`} color={C.green} icon="💸"/>
        <StatCard label="Presupuesto" value={fmt(presupTotalMV)} color={C.blue} icon="📐"/>
        <StatCard label="Disponible" value={fmt(Math.max(0,presupTotalMV-totalGastado))} color={totalGastado>presupTotalMV?C.red:C.lima} icon="✅"/>
      </div>
      <div style={{height:14,borderRadius:7,background:C.bg3,overflow:"hidden",marginBottom:6}}>
        <div style={{height:"100%",borderRadius:7,background:pct>=100?C.red:pct>=80?C.amber:C.green,width:`${Math.min(pct,100)}%`,transition:"width .6s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.t3}}>
        <span>Inicio</span>
        <span style={{fontWeight:700,color:pct>=100?C.red:pct>=80?C.amber:C.green}}>{pct}% ejecutado</span>
        <span>Presupuesto</span>
      </div>
    </Card>}

    {/* Gastos por categoría — simplificado */}
    {byCat.length>0&&<Card style={{marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:12}}>📊 En qué se gastó</div>
      {byCat.map(c=>{
        const p=totalGastado>0?Math.round((c.total/totalGastado)*100):0;
        return <div key={c.id} style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:13}}>
            <span style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:16}}>{c.icon}</span><span style={{color:C.t2,fontWeight:500}}>{c.label}</span></span>
            <span style={{fontWeight:700,color:c.color}}>{fmt(c.total)} <span style={{fontSize:10,color:C.t3,fontWeight:400}}>({p}%)</span></span>
          </div>
          <div style={{height:8,borderRadius:4,background:C.bg3}}><div style={{height:"100%",borderRadius:4,background:c.color,width:`${p}%`,transition:"width .5s"}}/></div>
        </div>;
      })}
    </Card>}

    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
      {/* Hitos */}
      {hitos.length>0&&<Card style={{flex:"1 1 250px"}}>
        <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:12}}>🏁 Avance de obra</div>
        {hitoPct!==null&&<>
          <div style={{height:10,borderRadius:5,background:C.bg3,overflow:"hidden",marginBottom:6}}>
            <div style={{height:"100%",borderRadius:5,background:hitoPct===100?C.green:C.lima,width:`${hitoPct}%`,transition:"width .6s"}}/>
          </div>
          <div style={{fontSize:12,color:C.t3,marginBottom:12}}>{hitosComp} de {hitos.length} etapas completadas ({hitoPct}%)</div>
        </>}
        {hitos.slice(0,5).map(h=>{
          const col=h.estado==="completado"?C.green:h.estado==="en_progreso"?C.amber:C.t3;
          return <div key={h.id} style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,fontSize:12}}>
            <span style={{fontSize:14,color:col}}>{h.estado==="completado"?"✅":h.estado==="en_progreso"?"🔄":"⏳"}</span>
            <span style={{flex:1,color:h.estado==="completado"?C.t3:C.t,textDecoration:h.estado==="completado"?"line-through":"none"}}>{h.titulo}</span>
            <span style={{fontSize:10,color:C.t3}}>{h.fecha_estimada}</span>
          </div>;
        })}
      </Card>}

      {/* Última foto */}
      {ultimaFoto&&<Card style={{flex:"1 1 220px"}}>
        <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:10}}>📷 Última actualización visual</div>
        <img src={ultimaFoto.url} alt={ultimaFoto.titulo} style={{width:"100%",borderRadius:10,objectFit:"cover",maxHeight:160}}/>
        <div style={{marginTop:8,fontSize:12,fontWeight:600,color:C.t}}>{ultimaFoto.titulo}</div>
        <div style={{fontSize:11,color:C.t3,marginTop:2}}>{ultimaFoto.fecha}{ultimaFoto.etapa&&` · ${ultimaFoto.etapa}`}</div>
      </Card>}
    </div>

    {/* Último gasto */}
    {ultimoGasto&&<Card style={{marginTop:14}}>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,fontWeight:600}}>Último movimiento registrado</div>
      {(()=>{const cat=cats.find(c=>c.id===ultimoGasto.cat_id);return <div style={{display:"flex",gap:12,alignItems:"center"}}>
        <div style={{width:40,height:40,borderRadius:10,background:(cat?.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{cat?.icon||"📦"}</div>
        <div style={{flex:1}}><div style={{fontWeight:600,color:C.t}}>{ultimoGasto.descripcion||cat?.label||"—"}</div><div style={{fontSize:11,color:C.t3,marginTop:2}}>{ultimoGasto.fecha} · {cat?.label}</div></div>
        <div style={{fontSize:16,fontWeight:700,color:cat?.color||C.green}}>{fmt(conv(ultimoGasto))}</div>
      </div>;})()} 
    </Card>}
  </div>;
}




// ── FAB SPEED DIAL ────────────────────────────────────────────────────────────
function FABMenu({onGasto,onObjetivo,esAdmin}){
  const [open,setOpen]=useState(false);
  const items=[
    {icon:"💸",label:"Cargar gasto",action:onGasto,color:C.green},
    ...(esAdmin?[{icon:"🏁",label:"Nuevo objetivo",action:onObjetivo,color:C.blue}]:[]),
  ];
  return <div style={{position:"fixed",bottom:28,right:28,zIndex:150,display:"flex",flexDirection:"column-reverse",alignItems:"flex-end",gap:10}}>
    {open&&items.map((it,i)=>(
      <div key={i} className="fu" style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{background:"rgba(0,0,0,.65)",color:"#fff",fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{it.label}</span>
        <button onClick={()=>{setOpen(false);it.action();}} style={{width:44,height:44,borderRadius:"50%",background:it.color,color:"#fff",border:"none",cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 3px 12px ${it.color}88`}}>{it.icon}</button>
      </div>
    ))}
    <button onClick={()=>setOpen(v=>!v)}
      style={{width:56,height:56,borderRadius:"50%",background:open?"#333":C.green,color:"#fff",border:"none",cursor:"pointer",fontSize:28,boxShadow:"0 4px 20px rgba(46,110,24,.5)",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .25s",transform:open?"rotate(45deg)":"rotate(0)"}}
    >+</button>
  </div>;
}

// ── REPORTES ──────────────────────────────────────────────────────────────────
function ReportesTab({obra,gastos,presup,tcRef,cats,esAdmin,monedaVista}){
  const [vistaR,setVistaR]=useState("mensual");
  const enUSD=monedaVista==="USD";
  const conv=useCallback(g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef),[enUSD,tcRef]);
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);

  const porMes=useMemo(()=>{
    const m={};
    gastos.forEach(g=>{const ym=g.fecha?.slice(0,7)||"";if(!m[ym])m[ym]={ym,total:0,items:[]};m[ym].total+=conv(g);m[ym].items.push(g);});
    return Object.values(m).sort((a,b)=>a.ym>b.ym?1:-1);
  },[gastos,conv]);

  const porAnio=useMemo(()=>{
    const a={};
    gastos.forEach(g=>{const y=g.fecha?.slice(0,4)||"";if(!a[y])a[y]={anio:y,total:0,count:0};a[y].total+=conv(g);a[y].count++;});
    return Object.values(a).sort((a,b)=>a.anio>b.anio?1:-1);
  },[gastos,conv]);

  const porCat=useMemo(()=>
    cats.map(c=>({...c,total:gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0),count:gastos.filter(g=>g.cat_id===c.id).length})).filter(c=>c.total>0).sort((a,b)=>b.total-a.total)
  ,[gastos,cats,conv]);

  const totalGlobal=gastos.reduce((s,g)=>s+conv(g),0);
  const topGastos=[...gastos].sort((a,b)=>conv(b)-conv(a)).slice(0,5);
  const promMensual=porMes.length>0?totalGlobal/porMes.length:0;
  const maxMes=porMes.length>0?porMes.reduce((mx,m)=>m.total>mx.total?m:mx,porMes[0]):null;

  const W=540,PL=44,PR=12,PT=16,PB=28,cH=100,H=PT+cH+PB;
  const maxBar=Math.max(...porMes.map(m=>m.total),1);
  const VISTAS=[{id:"mensual",label:"Por mes"},{id:"anual",label:"Por año"},{id:"categorias",label:"Por categoría"},{id:"top",label:"Top gastos"}];

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
      <div><div style={{fontSize:16,fontWeight:700,color:C.t}}>📈 Reportes</div><div style={{fontSize:12,color:C.t3}}>{gastos.length} movimientos · {fmt(totalGlobal)} total</div></div>
      <Btn small onClick={()=>exportCSV(gastos.map(g=>({Fecha:g.fecha,Categoria:cats.find(c=>c.id===g.cat_id)?.label||"",Monto:g.monto,Moneda:g.moneda,TC:g.tc_valor,Monto_ARS:toARS(g,tcRef),Descripcion:g.descripcion||"",Cargado_por:g.cargado_por})),`reporte_${obra.nombre.replace(/\s+/g,"_")}.csv`)}>⬇ Exportar todo</Btn>
    </div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <StatCard label="Total ejecutado" value={fmt(totalGlobal)} sub={`${gastos.length} movimientos`} color={C.green} icon="💸"/>
      <StatCard label="Promedio mensual" value={fmt(promMensual)} sub={`${porMes.length} meses activos`} color={C.blue} icon="📅"/>
      {maxMes&&<StatCard label="Mes más alto" value={maxMes.ym} sub={fmt(maxMes.total)} color={C.amber} icon="📌"/>}
      {porCat[0]&&<StatCard label="Categoría #1" value={porCat[0].label} sub={`${fmt(porCat[0].total)} · ${totalGlobal>0?Math.round((porCat[0].total/totalGlobal)*100):0}%`} color={porCat[0].color} icon={porCat[0].icon}/>}
    </div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
      {VISTAS.map(v=><button key={v.id} onClick={()=>setVistaR(v.id)} style={{padding:"6px 16px",fontSize:12,border:`1px solid ${vistaR===v.id?C.green:C.bd2}`,borderRadius:20,cursor:"pointer",background:vistaR===v.id?C.green:"transparent",color:vistaR===v.id?"#fff":C.t2,fontWeight:vistaR===v.id?600:400}}>{v.label}</button>)}
    </div>

    {vistaR==="mensual"&&<>
      {porMes.length>0&&<Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Gasto mensual ({monedaVista})</div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxHeight:160,display:"block"}}>
          {[0,.5,1].map((f,i)=>{const v=maxBar*f,y=PT+cH*(1-f);return <g key={i}><line x1={PL} y1={y} x2={W-PR} y2={y} stroke={C.bd2} strokeWidth=".5"/><text x={PL-4} y={y+4} textAnchor="end" fill={C.t3} fontSize="7" fontFamily="sans-serif">{Math.round(v/1000)+"k"}</text></g>;})}
          {porMes.map((m,i)=>{
            const bW=Math.max(6,(W-PL-PR)/porMes.length-3);
            const x=PL+(i/porMes.length)*(W-PL-PR)+(W-PL-PR)/porMes.length/2-bW/2;
            const bH=Math.max(2,(m.total/maxBar)*cH);const y=PT+cH-bH;
            const show=i===0||i===porMes.length-1||porMes.length<=12||i%3===0;
            const isMax=m.ym===maxMes?.ym;
            return <g key={i}><rect x={x} y={y} width={bW} height={bH} fill={isMax?C.amber:C.green} rx="2" opacity=".85"/>{show&&<text x={x+bW/2} y={H-4} textAnchor="middle" fill={C.t3} fontSize="7" fontFamily="sans-serif">{m.ym.slice(5,7)+"/"+m.ym.slice(2,4)}</text>}</g>;
          })}
        </svg>
      </Card>}
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:400}}>
            <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>{["Mes","Movim.","Total","% total",""].map((h,i)=><th key={i} style={{padding:"7px 10px",textAlign:i>=2?"right":"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}</tr></thead>
            <tbody>{[...porMes].reverse().map(m=>{const p=totalGlobal>0?Math.round((m.total/totalGlobal)*100):0;const isMax=m.ym===maxMes?.ym;return <tr key={m.ym} style={{borderBottom:`1px solid ${C.bd}`,background:isMax?C.amber+"08":"transparent"}}>
              <td style={{padding:"8px 10px",fontWeight:600,color:C.t}}>{m.ym}{isMax&&<span style={{marginLeft:6,fontSize:9,background:C.amber+"22",color:C.amber,padding:"1px 6px",borderRadius:10,fontWeight:700}}>MAX</span>}</td>
              <td style={{padding:"8px 10px",color:C.t3}}>{m.items.length}</td>
              <td style={{padding:"8px 10px",textAlign:"right",fontWeight:700,color:C.green}}>{fmt(m.total)}</td>
              <td style={{padding:"8px 10px",textAlign:"right",color:C.t3}}>{p}%</td>
              <td style={{padding:"8px 10px",minWidth:90}}><div style={{height:6,borderRadius:3,background:C.bg3}}><div style={{height:"100%",borderRadius:3,background:isMax?C.amber:C.green,width:`${p}%`}}/></div></td>
            </tr>;})}
            </tbody>
          </table>
        </div>
      </Card>
    </>}

    {vistaR==="anual"&&<Card>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Resumen anual</div>
      {porAnio.length===0&&<div style={{textAlign:"center",padding:"24px",color:C.t3}}>Sin datos</div>}
      {porAnio.map(a=>{const p=totalGlobal>0?Math.round((a.total/totalGlobal)*100):0;const mesesAnio=porMes.filter(m=>m.ym.startsWith(a.anio)).length;return <div key={a.anio} style={{marginBottom:16,paddingBottom:16,borderBottom:`1px solid ${C.bd}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontWeight:700,fontSize:15,color:C.t}}>{a.anio}</span><span style={{fontWeight:700,color:C.green,fontSize:15}}>{fmt(a.total)}</span></div>
        <div style={{display:"flex",gap:14,fontSize:11,color:C.t3,marginBottom:7}}><span>{a.count} movimientos</span><span>{p}% del total</span><span>Prom: {fmt(a.total/Math.max(mesesAnio,1))}/mes</span></div>
        <div style={{height:8,borderRadius:4,background:C.bg3}}><div style={{height:"100%",borderRadius:4,background:C.green,width:`${p}%`}}/></div>
      </div>;})}
    </Card>}

    {vistaR==="categorias"&&<Card>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Ranking por categoría</div>
      {porCat.length===0&&<div style={{textAlign:"center",padding:"24px",color:C.t3}}>Sin datos</div>}
      {porCat.map((c,i)=>{const p=totalGlobal>0?Math.round((c.total/totalGlobal)*100):0;const promCat=c.count>0?c.total/c.count:0;return <div key={c.id} style={{marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${C.bd}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
          <span style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:24,height:24,borderRadius:6,background:c.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{c.icon}</span><span style={{fontWeight:700,fontSize:13,color:C.t}}>{c.label}</span><span style={{fontSize:10,color:C.t3,background:C.bg3,padding:"1px 7px",borderRadius:10}}>#{i+1}</span></span>
          <span style={{fontWeight:700,color:c.color,fontSize:14}}>{fmt(c.total)}</span>
        </div>
        <div style={{display:"flex",gap:14,fontSize:11,color:C.t3,marginBottom:6}}><span>{c.count} movimientos</span><span>{p}% del total</span><span>Promedio: {fmt(promCat)}</span></div>
        <div style={{height:8,borderRadius:4,background:C.bg3}}><div style={{height:"100%",borderRadius:4,background:c.color,width:`${p}%`,transition:"width .5s"}}/></div>
      </div>;})}
      <div style={{paddingTop:10,borderTop:`1px solid ${C.bd2}`,display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:C.t3}}>Total general</span><span style={{fontWeight:700,color:C.t}}>{fmt(totalGlobal)}</span></div>
    </Card>}

    {vistaR==="top"&&<Card>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Top 5 gastos individuales más altos</div>
      {topGastos.length===0&&<div style={{textAlign:"center",padding:"24px",color:C.t3}}>Sin datos</div>}
      {topGastos.map((g,i)=>{const cat=cats.find(c=>c.id===g.cat_id);const sub=cat?.subs?.find(s=>s.id===g.sub_id);const p=totalGlobal>0?Math.round((conv(g)/totalGlobal)*100):0;return <div key={g.id} style={{display:"flex",gap:12,alignItems:"center",marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${C.bd}`}}>
        <div style={{width:28,height:28,borderRadius:"50%",background:C.green+"18",border:`2px solid ${C.green}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:C.green,flexShrink:0}}>#{i+1}</div>
        <div style={{width:32,height:32,borderRadius:8,background:(cat?.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{cat?.icon||"📦"}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:600,color:C.t,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{g.descripcion||sub?.label||cat?.label||"—"}</div>
          <div style={{fontSize:11,color:C.t3,marginTop:2}}>{g.fecha} · {cat?.label}</div>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:14,fontWeight:700,color:cat?.color||C.green}}>{fmt(conv(g))}</div>
          <div style={{fontSize:10,color:C.t3}}>{p}% del total</div>
        </div>
      </div>;})}
    </Card>}
  </div>;
}

function CategoriasTab({cats,obra,toast,reload}){
  const [catM,setCatM]=useState(null);const [subM,setSubM]=useState(null);const [catD,setCatD]=useState({label:"",color:C.green,icon:"📦"});const [subD,setSubD]=useState({label:""});const [saving,setSaving]=useState(false);
  const ICONS=["🏗️","👷","📦","🔧","⚙️","🪵","🏠","💡","🛁","🪟","🚪","🔌","🪣","🏛️","📐","📋","🚛","🔨","🧱","🪚"];
  const COLS=[C.green,C.lima,C.blue,C.amber,C.red,"#7A4A9A","#2A8A7A","#9A6A2A"];
  const saveCat=async()=>{if(!catD.label.trim())return;setSaving(true);if(catM==="new"){const{error}=await supabase.from("categorias").insert({obra_id:obra.id,label:catD.label.trim(),color:catD.color,icon:catD.icon,orden:cats.length+1});if(error){toast.error("Error");setSaving(false);return;}toast.success("Categoría creada");}else{const{error}=await supabase.from("categorias").update({label:catD.label,color:catD.color,icon:catD.icon}).eq("id",catM);if(error){toast.error("Error");setSaving(false);return;}toast.success("Actualizada");}await reload();setCatM(null);setSaving(false);};
  const saveSub=async()=>{if(!subD.label.trim())return;setSaving(true);if(subM.mode==="new"){const{error}=await supabase.from("subcategorias").insert({cat_id:subM.catId,label:subD.label.trim(),orden:0});if(error){toast.error("Error");setSaving(false);return;}toast.success("Subcategoría creada");}else{const{error}=await supabase.from("subcategorias").update({label:subD.label}).eq("id",subM.subId);if(error){toast.error("Error");setSaving(false);return;}toast.success("Actualizada");}await reload();setSubM(null);setSaving(false);};
  const deleteCat=async(id)=>{const{error}=await supabase.from("categorias").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminada");await reload();}};
  const deleteSub=async(id)=>{const{error}=await supabase.from("subcategorias").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminada");await reload();}};
  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div><div style={{fontSize:16,fontWeight:700,color:C.t}}>Categorías</div><div style={{fontSize:12,color:C.t3}}>Clasificación de gastos</div></div><Btn primary onClick={()=>{setCatD({label:"",color:C.green,icon:"📦"});setCatM("new");}}>+ Nueva categoría</Btn></div>
    {cats.map(cat=><Card key={cat.id} style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${C.bd}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:38,height:38,borderRadius:10,background:cat.color+"18",border:`1px solid ${cat.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{cat.icon}</div><div><div style={{fontWeight:700,fontSize:14,color:C.t}}>{cat.label}</div><div style={{fontSize:11,color:C.t3}}>{cat.subs?.length||0} subcategorías</div></div></div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><Btn small onClick={()=>{setSubD({label:""});setSubM({catId:cat.id,mode:"new"});}}>+ Sub</Btn><Btn small onClick={()=>{setCatD({label:cat.label,color:cat.color,icon:cat.icon});setCatM(cat.id);}}>Editar</Btn><Btn small danger onClick={()=>deleteCat(cat.id)}>Eliminar</Btn></div>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{(cat.subs||[]).map(sub=><div key={sub.id} style={{display:"flex",alignItems:"center",gap:6,background:C.bg3,border:`1px solid ${cat.color}33`,borderRadius:20,padding:"4px 10px 4px 12px"}}><span style={{fontSize:12,color:C.t2,fontWeight:500}}>{sub.label}</span><button onClick={()=>{setSubD({label:sub.label});setSubM({catId:cat.id,subId:sub.id,mode:"edit"});}} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:11}}>✎</button><button onClick={()=>deleteSub(sub.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:14}}>×</button></div>)}{(!cat.subs||cat.subs.length===0)&&<span style={{fontSize:12,color:C.t3,fontStyle:"italic"}}>Sin subcategorías</span>}</div>
    </Card>)}
    {catM&&<Modal title={catM==="new"?"Nueva categoría":"Editar categoría"} onClose={()=>setCatM(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Nombre</div><input style={INP} autoFocus placeholder="Ej: Estructura" value={catD.label} onChange={e=>setCatD(d=>({...d,label:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:8,fontWeight:600}}>Ícono</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{ICONS.map(ic=><button key={ic} onClick={()=>setCatD(d=>({...d,icon:ic}))} style={{width:36,height:36,borderRadius:8,fontSize:18,border:`2px solid ${catD.icon===ic?C.green:"transparent"}`,background:catD.icon===ic?C.bg3:"transparent",cursor:"pointer"}}>{ic}</button>)}</div></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:8,fontWeight:600}}>Color</div><div style={{display:"flex",gap:8}}>{COLS.map(col=><button key={col} onClick={()=>setCatD(d=>({...d,color:col}))} style={{width:26,height:26,borderRadius:"50%",background:col,border:`3px solid ${catD.color===col?"#fff":"transparent"}`,outline:catD.color===col?`2px solid ${col}`:"none",cursor:"pointer"}}/>)}</div></div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={saveCat} loading={saving}>Guardar</Btn><Btn onClick={()=>setCatM(null)}>Cancelar</Btn></div>
      </div>
    </Modal>}
    {subM&&<Modal title={subM.mode==="new"?"Nueva subcategoría":"Editar subcategoría"} onClose={()=>setSubM(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Nombre</div><input style={INP} autoFocus value={subD.label} onChange={e=>setSubD({label:e.target.value})} onKeyDown={e=>e.key==="Enter"&&saveSub()}/></div>
        <div style={{fontSize:11,color:C.t3,background:C.bg3,borderRadius:8,padding:"8px 12px"}}>Pertenece a: <b style={{color:C.t}}>{cats.find(c=>c.id===subM.catId)?.label}</b></div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={saveSub} loading={saving}>Guardar</Btn><Btn onClick={()=>setSubM(null)}>Cancelar</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── PARTICIPANTES ─────────────────────────────────────────────────────────────
function ParticipantesTab({obra,partic,toast,reload}){
  const [modal,setModal]=useState(false);const [draft,setDraft]=useState({email:"",nombre:"",rol:"cliente",puede_cargar:false});const [saving,setSaving]=useState(false);
  const save=async()=>{if(!draft.email.trim()||!draft.nombre.trim())return;setSaving(true);const{data:profile}=await supabase.from("profiles").select("id").eq("email",draft.email).single();const{error}=await supabase.from("participantes").insert({obra_id:obra.id,user_id:profile?.id||null,email:draft.email.trim(),nombre:draft.nombre.trim(),rol:draft.rol,puede_cargar:draft.rol!=="cliente"?true:draft.puede_cargar});if(error){toast.error("Error: "+error.message);setSaving(false);return;}toast.success(`${draft.nombre} invitado`);setDraft({email:"",nombre:"",rol:"cliente",puede_cargar:false});setModal(false);await reload();setSaving(false);};
  const updateRol=async(id,rol)=>{const{error}=await supabase.from("participantes").update({rol}).eq("id",id);if(error)toast.error("Error");else{toast.success("Rol actualizado");await reload();}};
  const updatePC=async(id,puede_cargar)=>{await supabase.from("participantes").update({puede_cargar}).eq("id",id);await reload();};
  const deleteP=async(id)=>{const{error}=await supabase.from("participantes").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}};
  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div><div style={{fontSize:16,fontWeight:700,color:C.t}}>Participantes</div><div style={{fontSize:12,color:C.t3}}>{partic.length} personas</div></div><Btn primary onClick={()=>setModal(true)}>+ Invitar</Btn></div>
    <Card><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:400}}><thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>{["Nombre","Email","Rol","Puede cargar",""].map((h,i)=><th key={i} style={{padding:"8px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}</tr></thead><tbody>{partic.map(p=><tr key={p.id} style={{borderBottom:`1px solid ${C.bd}`}}><td style={{padding:"10px",fontWeight:600,color:C.t}}>{p.nombre}</td><td style={{padding:"10px",color:C.t3,fontSize:11}}>{p.email}</td><td style={{padding:"10px"}}><select style={{...SEL,width:"auto",padding:"4px 8px",fontSize:11}} value={p.rol} onChange={e=>updateRol(p.id,e.target.value)}><option value="arquitecto">Arquitecto</option><option value="ayudante">Ayudante</option><option value="cliente">Cliente</option></select></td><td style={{padding:"10px"}}>{p.rol==="cliente"?<label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}><input type="checkbox" checked={p.puede_cargar} onChange={e=>updatePC(p.id,e.target.checked)} style={{accentColor:C.green,width:14,height:14}}/><span style={{color:p.puede_cargar?C.green:C.t3,fontWeight:p.puede_cargar?600:400}}>{p.puede_cargar?"Sí":"Solo lectura"}</span></label>:<span style={{color:C.green,fontWeight:600}}>✓ Sí</span>}</td><td style={{padding:"10px",textAlign:"right"}}>{p.rol!=="arquitecto"&&<button onClick={()=>deleteP(p.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:16}}>×</button>}</td></tr>)}</tbody></table></div></Card>
    <div style={{marginTop:12,background:C.bg3,border:`1px solid ${C.bd}`,borderRadius:10,padding:"12px 16px",fontSize:12,color:C.t3,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}><Tag label="Arquitecto" color={C.green}/><span>acceso total</span><Tag label="Ayudante" color={C.blue}/><span>igual, sin eliminar obra</span><Tag label="Cliente" color={C.lima}/><span>solo ve resumen público</span></div>
    {modal&&<Modal title="Invitar participante" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Nombre</div><input style={INP} placeholder="Ej: Juan Pérez" value={draft.nombre} onChange={e=>setDraft(d=>({...d,nombre:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Email</div><input style={INP} type="email" placeholder="juan@mail.com" value={draft.email} onChange={e=>setDraft(d=>({...d,email:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Rol</div><select style={SEL} value={draft.rol} onChange={e=>setDraft(d=>({...d,rol:e.target.value}))}><option value="arquitecto">Arquitecto</option><option value="ayudante">Ayudante</option><option value="cliente">Cliente</option></select></div>
        {draft.rol==="cliente"&&<label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",background:C.bg3,borderRadius:8,padding:"10px 12px"}}><input type="checkbox" checked={draft.puede_cargar} onChange={e=>setDraft(d=>({...d,puede_cargar:e.target.checked}))} style={{accentColor:C.green,width:16,height:16}}/><div><div style={{fontSize:12,fontWeight:600,color:C.t}}>Permitir cargar gastos</div><div style={{fontSize:11,color:C.t3}}>Si no, solo verá el resumen público</div></div></label>}
        <div style={{display:"flex",gap:8}}><Btn primary onClick={save} loading={saving}>Invitar</Btn><Btn onClick={()=>setModal(false)}>Cancelar</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── IPC ───────────────────────────────────────────────────────────────────────
function IPCTab({inflData}){
  const u24=inflData?[...inflData].sort((a,b)=>b.fecha>a.fecha?1:-1).slice(0,24).reverse():[];
  const porA={};if(inflData)inflData.forEach(x=>{const y=x.fecha.slice(0,4);if(!porA[y])porA[y]=[];porA[y].push(x.valor);});
  const acum=Object.entries(porA).map(([y,v])=>({anio:y,pct:Math.round((v.reduce((f,x)=>f*(1+x/100),1)-1)*100)})).sort((a,b)=>a.anio>b.anio?1:-1);
  const W=540,PL=34,PR=12,PT=18,PB=26,cH=96,H=PT+cH+PB;
  const maxI=Math.max(...u24.map(x=>x.valor),1);
  return <div className="fu">
    <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>📈 Inflación (IPC)</div>
    <div style={{fontSize:12,color:C.t3,marginBottom:16}}>INDEC via argentinadatos.com</div>
    {!inflData&&<Card><div style={{textAlign:"center",padding:"32px 0",color:C.t3}}>Cargando datos...</div></Card>}
    {inflData&&<>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>{acum.slice(-5).map(a=><div key={a.anio} style={{flex:"1 1 90px",background:C.bg2,border:`1px solid ${a.pct>100?C.red+"44":a.pct>50?C.amber+"44":C.green+"33"}`,borderRadius:10,padding:"12px 14px",textAlign:"center"}}><div style={{fontSize:11,color:C.t3,marginBottom:4,fontWeight:600}}>{a.anio}</div><div style={{fontSize:20,fontWeight:700,color:a.pct>100?C.red:a.pct>50?C.amber:C.green}}>{a.pct}%</div><div style={{fontSize:10,color:C.t3}}>acumulado</div></div>)}</div>
      <Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>IPC mensual — últimos 24 meses</div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxHeight:160,display:"block"}}>
          {[0,.5,1].map((f,i)=>{const v=(maxI*f).toFixed(1),y=PT+cH*(1-f);return<g key={i}><line x1={PL} y1={y} x2={W-PR} y2={y} stroke={C.bd2} strokeWidth=".5"/><text x={PL-3} y={y+4} textAnchor="end" fill={C.t3} fontSize="8" fontFamily="sans-serif">{v}%</text></g>;})}
          {u24.map((d,i)=>{const bW=Math.max(7,(W-PL-PR)/u24.length-3);const x=PL+(i/u24.length)*(W-PL-PR)+(W-PL-PR)/u24.length/2-bW/2;const bH=Math.max(2,(d.valor/maxI)*cH),y=PT+cH-bH;const col=d.valor>10?C.red:d.valor>5?C.amber:C.green;const show=i===0||i===u24.length-1||i%4===0;return <g key={i}><rect x={x} y={y} width={bW} height={bH} fill={col} rx="2" opacity=".8"/>{show&&<text x={x+bW/2} y={H-4} textAnchor="middle" fill={C.t3} fontSize="7" fontFamily="sans-serif">{d.fecha.slice(2,7)}</text>}</g>;})}
        </svg>
      </Card>
      <Card><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:380}}><thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>{["Mes","IPC %","Equivalencia $1.000.000"].map((h,i)=><th key={i} style={{padding:"7px 10px",textAlign:i>=1?"right":"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}</tr></thead><tbody>{[...u24].reverse().slice(0,16).map(d=>{const col=d.valor>10?C.red:d.valor>5?C.amber:C.green;return <tr key={d.fecha} style={{borderBottom:`1px solid ${C.bd}`}}><td style={{padding:"8px 10px",color:C.t2,fontWeight:500}}>{d.fecha.slice(0,7)}</td><td style={{padding:"8px 10px",textAlign:"right",fontWeight:700,color:col}}>{d.valor}%</td><td style={{padding:"8px 10px",textAlign:"right",color:C.t3,fontSize:11}}>{fmtARS(1000000*(1+d.valor/100))}</td></tr>;})}</tbody></table></div></Card>
    </>}
  </div>;
}

// ── USD ───────────────────────────────────────────────────────────────────────
function USDGrafico({br,W,PL,PR,PT,PB,cH,H}){
  const n=br.length;
  const maxTC=Math.max(...br.map(x=>Math.max(x.of||0,x.bl||0)),1);
  const xOf=br.filter(x=>x.of).map(x=>({x:PL+(br.indexOf(x)/(n-1||1))*(W-PL-PR),y:PT+cH*(1-x.of/maxTC)}));
  const xBl=br.filter(x=>x.bl).map(x=>({x:PL+(br.indexOf(x)/(n-1||1))*(W-PL-PR),y:PT+cH*(1-x.bl/maxTC)}));
  const pOf=xOf.map((p,i)=>(i===0?"M":"L")+p.x+","+p.y).join(" ");
  const pBl=xBl.map((p,i)=>(i===0?"M":"L")+p.x+","+p.y).join(" ");
  return <>
    <svg viewBox={"0 0 "+W+" "+H} style={{width:"100%",maxHeight:170,display:"block"}}>
      {[0,.5,1].map((f,i)=>{
        const v=Math.round(maxTC*f),y=PT+cH*(1-f);
        const label=v>=1000?Math.round(v/1000)+"K":String(v);
        return <g key={i}>
          <line x1={PL} y1={y} x2={W-PR} y2={y} stroke={C.bd2} strokeWidth=".5"/>
          <text x={PL-4} y={y+4} textAnchor="end" fill={C.t3} fontSize="8" fontFamily="sans-serif">{label}</text>
        </g>;
      })}
      {xBl.length>1&&<path d={pBl} fill="none" stroke={C.lima} strokeWidth="2" strokeLinejoin="round"/>}
      {xOf.length>1&&<path d={pOf} fill="none" stroke={C.green} strokeWidth="2" strokeLinejoin="round"/>}
      {xOf.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="2.5" fill={C.green}/>)}
      {xBl.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="2.5" fill={C.lima}/>)}
      {br.map((b,i)=>{
        const x=PL+(i/(n-1||1))*(W-PL-PR);
        const show=i===0||i===n-1||i%4===0;
        return show?<text key={i} x={x} y={H-4} textAnchor="middle" fill={C.t3} fontSize="8" fontFamily="sans-serif">{b.label}</text>:null;
      })}
    </svg>
    <div style={{display:"flex",gap:14,fontSize:11,color:C.t2,marginTop:6}}>
      <span><span style={{display:"inline-block",width:14,height:2,background:C.green,borderRadius:2,marginRight:5,verticalAlign:"middle"}}/>Oficial</span>
      <span><span style={{display:"inline-block",width:14,height:2,background:C.lima,borderRadius:2,marginRight:5,verticalAlign:"middle"}}/>Blue</span>
    </div>
  </>;
}

function USDTab({tcHistData,inflData,tcOficial,tcBlue}){
  const agM=arr=>{const m={};if(!arr)return m;arr.forEach(x=>{const ym=x.fecha.slice(0,7);if(!m[ym]){m[ym]={sum:0,count:0};}m[ym].sum+=(x.venta||0);m[ym].count++;});Object.keys(m).forEach(k=>{m[k].avg=Math.round(m[k].sum/m[k].count);});return m;};
  const ofM=agM(tcHistData?.oficial),blM=agM(tcHistData?.blue);
  const ipcM={};if(inflData)inflData.forEach(x=>{ipcM[x.fecha.slice(0,7)]=x.valor;});
  const hoy=new Date(),serie=[];
  for(let i=23;i>=0;i--){const d=new Date(hoy.getFullYear(),hoy.getMonth()-i,1);serie.push(d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0"));}
  const sF=serie.filter(ym=>ofM[ym]||blM[ym]);
  const br=sF.map(ym=>({ym,of:ofM[ym]?.avg||null,bl:blM[ym]?.avg||null,gap:ofM[ym]?.avg&&blM[ym]?.avg?Math.round(((blM[ym].avg-ofM[ym].avg)/ofM[ym].avg)*100):null,ipc:ipcM[ym]||null,label:ym.slice(5,7)+"/"+ym.slice(2,4)}));
  const last=br[br.length-1];
  const W=540,PL=50,PR=12,PT=20,PB=26,cH=96,H=PT+cH+PB;
  const brechaColor=last?.gap>100?C.red:last?.gap>50?C.amber:C.green;

  return <div className="fu">
    <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>💵 Dólar & Tipo de Cambio</div>
    <div style={{fontSize:12,color:C.t3,marginBottom:16}}>dolarapi.com & argentinadatos.com</div>
    {!tcHistData&&<Card><div style={{textAlign:"center",padding:"32px 0",color:C.t3}}>Cargando cotizaciones...</div></Card>}
    {tcHistData&&<>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
        <StatCard label="Oficial hoy" value={tcOficial?("$"+tcOficial.toLocaleString("es-AR")):last?.of?("$"+last.of.toLocaleString("es-AR")):"—"} color={C.green} icon="🏛️"/>
        <StatCard label="Blue hoy" value={tcBlue?("$"+tcBlue.toLocaleString("es-AR")):last?.bl?("$"+last.bl.toLocaleString("es-AR")):"—"} color={C.lima} icon="💵"/>
        <StatCard label="Brecha" value={last?.gap!=null?(last.gap+"%"):"—"} color={brechaColor} icon="📊"/>
        <StatCard label="IPC último mes" value={last?.ipc!=null?(last.ipc+"%"):"—"} color={C.amber} icon="📈"/>
      </div>
      {sF.length>1&&<Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Oficial vs Blue — últimos 24 meses</div>
        <USDGrafico br={br} W={W} PL={PL} PR={PR} PT={PT} PB={PB} cH={cH} H={H}/>
      </Card>}
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:380}}>
            <thead><tr style={{borderBottom:"2px solid "+C.bd2}}>
              {["Mes","Oficial","Blue","Brecha","IPC"].map((h,i)=><th key={i} style={{padding:"7px 10px",textAlign:i>=1?"right":"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[...br].reverse().slice(0,18).map((b,i)=>{
                const gapColor=b.gap>100?C.red:b.gap>50?C.amber:C.t2;
                return <tr key={i} style={{borderBottom:"1px solid "+C.bd}}>
                  <td style={{padding:"8px 10px",color:C.t2,fontWeight:500}}>{b.ym}</td>
                  <td style={{padding:"8px 10px",textAlign:"right",color:C.green,fontWeight:600}}>{b.of?("$"+b.of.toLocaleString("es-AR")):"—"}</td>
                  <td style={{padding:"8px 10px",textAlign:"right",color:C.lima,fontWeight:600}}>{b.bl?("$"+b.bl.toLocaleString("es-AR")):"—"}</td>
                  <td style={{padding:"8px 10px",textAlign:"right",color:gapColor,fontWeight:b.gap?600:400}}>{b.gap!=null?(b.gap+"%"):"—"}</td>
                  <td style={{padding:"8px 10px",textAlign:"right",color:C.amber}}>{b.ipc!=null?(b.ipc+"%"):"—"}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>}
  </div>;
}
