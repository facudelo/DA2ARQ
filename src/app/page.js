"use client";
import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const LOGO_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGgcAigAYkZCTUQwYTAwMGFlNzAxMDAwMDY3MDMwMDAwOGYwNTAwMDBlMjA1MDAwMDJmMDYwMDAwMDYwYTAwMDBhMjBkMDAwMGZiMGQwMDAwNzAwZTAwMDBiMjBlMDAwMDViMTIwMDAwAP/bAIQABQYGCwgLCwsLCw0LCwsNDg4NDQ4ODw0ODg4NDxAQEBEREBAQEA8TEhMPEBETFBQTERMWFhYTFhUVFhkWGRYWEgEFBQUKBwoICQkICwgKCAsKCgkJCgoMCQoJCgkMDQsKCwsKCw0MCwsICwsMDAwNDQwMDQoLCg0MDQ0MExQTExOc/8IAEQgAlgCWAwEiAAIRAQMRAf/EALIAAQABBQEAAAAAAAAAAAAAAAAHAQMEBQYCEAABBAAFAAcGAwkAAAAAAAADAAECBBESExQVBRAgYoGR4SUxQVBxkkBCUiMkMDRRYaKj8BEAAQIBBggLBwQDAAAAAAAAAQACEQMSITGRoTIzNEFRYdHSBBATIkJxgaKxweEgI1JicpPwQ1CS8xQwshIAAQMBBwQDAQEBAAAAAAAAAQARITFBUWFxgZHwECCh8bHB0TBQ4f/aAAwDAQACAAMAAAABmUAAAAAAAACGplhomWlcAznNqU6RzesO3RdSlJSRd1Va9Qx8itQAAENTLDRMuq2urU0RTzSus2WsNQ8qU9dRyvV1r0921aMlzNu1Y6qmjzfdzPvarYevWRDUyw169zLg52DRznJ9byFPPp5Up1mwwM/16A3Vu7apTTeNwt2dVl6vxbtbzYaXdXsi9DUyw1cuzLgZ+FRzfI9rzdPOubEWvfpR5rVVIfj3r6UvtQtWLfi8t2szdafcZGTehqZYauXplwc7BNDzvRc5581UFVBVSpIeDnYHnzgPCxi+3mhsdtptxfyb0NTLDVy7MoOXyOYkalNPuIx7gZcdSccxvsHVnV+o2kQ8X45yzvMTlOmNhWOJGKw1MsNVrMoI2kfVeKU5vO6vDOJ6rc6g53eMo0mJ3WvOIvdhlHBSHY15zvecZdOvhqU4srWZQAAAAAAAKVFIbmWGiZUNCZUNCZUNCZUNCZUNCZUNCZUNCZUNCZUNCZYaD//aAAgBAQABBQL50YMStx4lx4lx4lY6LaTcOVcOVcOVN0cNDg0G/g2ICk2hTWhTWhTR6NUq4iuuIrriK6avTZBaDRebMtSK1IrUitSK1Ipnx67ExRbXprcU1uKasbEzbOgtlQWyoJjU2QXg8ZyHjIVd30K6HEEFnEs4lB2duoxoiY9yvOPs1ezV7NQLdaEd+Jb8S34kObTaRWipRC76YFAwBreCTWoOoyzdZi6bHuwybygt5QW8oKvdHk3q3q3qHPO0iYLWWsnOBa9dBNBRfHrNOUGNcnCPLgXLgXLgTdPQZc/Bc/Bc/BCnnjKcmWpNak09uK3kEKxmUXx6yvNkU9gceWMuWMuWMuWMuWMuWMuWMhSeUTmnB92Rbsi3c1u5oZiTUcesspsi2TjjzJFzJFzJFzJFzJFzJFzJEGTyiaZYvq2Fq2Fq2Fq2EORpKOPWbUwLO1CO/uLf3Fv7i39xb+4t/cW/uILyeJyEi+4Otwdbg63B0OZpKOPYsXtGc7M4KtbHYZAsxM5iacS3JjiEsSxx6tSKZ8erWhj2ekP5pXG29u2XSGMexsu2KvTaAeiBOOv0iSeaEmm0RRleALTt2jOQ+2HgCb1bPY6Rf96U47uwdtwbpOj+yq2mKGRR2XldhkHSnp9Dldo5M98JXplvNoWWlimHr2+wSmIj7ESaLM0K0IPKLSbYhwsrc9hDFBAck+S5RREOIaKoEE0EUhBIKRJZNAwAZ0RmaZYvYIOIlMQGy+MGSiNuHd6mru34h/MPN/ivzXRMM3IJC4y1YbP9r//2Q==";

const C = {
  bg:"#F4F6F1",bg2:"#FFFFFF",bg3:"#EBF0E4",
  bd:"rgba(42,80,28,0.10)",bd2:"rgba(42,80,28,0.18)",
  t:"#182810",t2:"#3D5C2A",t3:"#7A9060",
  green:"#2E6E18",lima:"#7CBF3A",limaBg:"#EBF5DF",
  red:"#B84A3A",blue:"#2A6A5A",amber:"#7A6A1A",
};
const gCSS=`*{box-sizing:border-box;margin:0;padding:0}html,body{background:${C.bg};color:${C.t};font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:rgba(42,80,28,0.18);border-radius:4px}select option{background:#fff;color:${C.t}}@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes spin{to{transform:rotate(360deg)}}.fu{animation:fadeUp .28s ease both}.spin{animation:spin .8s linear infinite}input[type=date]::-webkit-calendar-picker-indicator{opacity:.5}input,select,textarea,button{font-family:inherit}@media(max-width:640px){.hide-mobile{display:none!important}.show-mobile{display:flex!important}}@media(min-width:641px){.show-mobile{display:none!important}}.foto-card .foto-overlay{opacity:0;transition:opacity .22s}.foto-card:hover .foto-overlay{opacity:1}.foto-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(42,80,28,.18)}`;
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
const exportCSV=(rows,fn)=>{if(!rows.length)return;const h=Object.keys(rows[0]);const csv="\uFEFF"+[h.join(","),...rows.map(r=>h.map(k=>'"'+(r[k]??'').toString().replace(/"/g,'""')+'"').join(","))].join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));a.download=fn;a.click();};

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useToast(){
  const [toasts,setToasts]=useState([]);
  const add=useCallback((msg,type="info")=>{const id=Date.now();setToasts(t=>[...t,{id,msg,type}]);setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3200);},[]);
  return{toasts,success:m=>add(m,"success"),error:m=>add(m,"error"),info:m=>add(m,"info")};
}
function ToastContainer({toasts}){
  return <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:999,display:"flex",flexDirection:"column",gap:8,alignItems:"center",pointerEvents:"none"}}>
    {toasts.map(t=><div key={t.id} className="fu" style={{background:t.type==="error"?C.red:t.type==="success"?C.green:"#333",color:"#fff",padding:"9px 20px",borderRadius:20,fontSize:13,fontWeight:500,boxShadow:"0 4px 16px rgba(0,0,0,.18)",whiteSpace:"nowrap"}}>{t.msg}</div>)}
  </div>;
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function Logo({size=44}){return <img src={LOGO_IMG} alt="DA2ARQ" style={{width:size,height:size,borderRadius:size*.22,objectFit:"cover",flexShrink:0}}/>;}
function Btn({children,onClick,primary,small,full,danger,loading,disabled}){return <button onClick={onClick} disabled={disabled||loading} style={{background:primary?C.green:danger?C.red+"18":"transparent",color:primary?"#fff":danger?C.red:C.t2,border:`1px solid ${primary?"transparent":danger?C.red+"55":C.bd2}`,borderRadius:7,padding:small?"5px 12px":"8px 18px",cursor:(disabled||loading)?"not-allowed":"pointer",fontSize:small?11:13,fontWeight:primary?600:500,opacity:(disabled||loading)?.6:1,width:full?"100%":"auto",whiteSpace:"nowrap",display:"inline-flex",alignItems:"center",gap:6,justifyContent:"center"}}>{loading&&<span className="spin" style={{width:12,height:12,border:"2px solid currentColor",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block"}}/>}{children}</button>;}
function Tag({label,color}){return <span style={{background:color+"20",color,fontSize:10,padding:"2px 9px",borderRadius:20,fontWeight:600,whiteSpace:"nowrap",border:`1px solid ${color}33`}}>{label}</span>;}
function Card({children,style={}}){return <div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:14,padding:"18px 20px",boxShadow:"0 1px 6px rgba(42,80,28,.07)",...style}}>{children}</div>;}
function StatCard({label,value,sub,color,icon}){return <div style={{background:C.bg2,borderTop:`3px solid ${color}`,border:`1px solid ${C.bd}`,borderRadius:12,padding:"14px 18px",flex:"1 1 140px",minWidth:130}}><div style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:".08em",marginBottom:7,display:"flex",alignItems:"center",gap:5}}><span>{icon}</span>{label}</div><div style={{fontSize:19,fontWeight:700,color}}>{value}</div>{sub&&<div style={{fontSize:11,color:C.t3,marginTop:4}}>{sub}</div>}</div>;}
function Spinner(){return <div style={{display:"flex",justifyContent:"center",padding:"48px 0"}}><div className="spin" style={{width:32,height:32,border:`3px solid ${C.bd2}`,borderTopColor:C.green,borderRadius:"50%"}}/></div>;}
function Modal({title,onClose,children,wide}){
  const boxRef=useRef(null);
  useEffect(()=>{const h=e=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[onClose]);
  useEffect(()=>{
    const reset=()=>{if(boxRef.current)boxRef.current.scrollTop=0;};
    reset();
    const raf=requestAnimationFrame(reset);
    const t=setTimeout(reset,50);
    return()=>{cancelAnimationFrame(raf);clearTimeout(t);};
  },[]);
  return <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:"fixed",inset:0,background:"rgba(10,30,5,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}><div ref={boxRef} style={{background:C.bg2,border:`1px solid ${C.bd2}`,borderRadius:16,padding:24,width:"100%",maxWidth:wide?720:480,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,.18)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><span style={{fontWeight:700,fontSize:15,color:C.t}}>{title}</span><button onClick={onClose} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:24,lineHeight:1}}>×</button></div>{children}</div></div>;
}
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
  const CAC_BASE=[
    {fecha:"2022-01",valor:4.8},{fecha:"2022-02",valor:6.0},{fecha:"2022-03",valor:7.3},
    {fecha:"2022-04",valor:6.2},{fecha:"2022-05",valor:5.8},{fecha:"2022-06",valor:6.4},
    {fecha:"2022-07",valor:7.9},{fecha:"2022-08",valor:7.0},{fecha:"2022-09",valor:7.1},
    {fecha:"2022-10",valor:7.4},{fecha:"2022-11",valor:6.5},{fecha:"2022-12",valor:6.3},
    {fecha:"2023-01",valor:7.4},{fecha:"2023-02",valor:7.2},{fecha:"2023-03",valor:8.5},
    {fecha:"2023-04",valor:8.8},{fecha:"2023-05",valor:8.6},{fecha:"2023-06",valor:8.2},
    {fecha:"2023-07",valor:10.2},{fecha:"2023-08",valor:14.5},{fecha:"2023-09",valor:12.7},
    {fecha:"2023-10",valor:11.0},{fecha:"2023-11",valor:14.7},{fecha:"2023-12",valor:40.1},
    {fecha:"2024-01",valor:14.2},{fecha:"2024-02",valor:14.2},{fecha:"2024-03",valor:9.8},
    {fecha:"2024-04",valor:8.1},{fecha:"2024-05",valor:5.1},{fecha:"2024-06",valor:3.4},
    {fecha:"2024-07",valor:2.4},{fecha:"2024-08",valor:2.5},{fecha:"2024-09",valor:2.7},
    {fecha:"2024-10",valor:2.3},{fecha:"2024-11",valor:2.2},{fecha:"2024-12",valor:2.2},
    {fecha:"2025-01",valor:2.1},{fecha:"2025-02",valor:2.2},{fecha:"2025-03",valor:2.5},
    {fecha:"2025-04",valor:2.4},{fecha:"2025-05",valor:2.1},{fecha:"2025-06",valor:1.9},
    {fecha:"2025-07",valor:1.8},{fecha:"2025-08",valor:1.7},{fecha:"2025-09",valor:1.6},
    {fecha:"2025-10",valor:1.5},{fecha:"2025-11",valor:1.4},{fecha:"2025-12",valor:1.4},
    {fecha:"2026-01",valor:1.3},{fecha:"2026-02",valor:1.2},{fecha:"2026-03",valor:1.1},
    {fecha:"2026-04",valor:0.9},{fecha:"2026-05",valor:0.9},{fecha:"2026-06",valor:0.8},
  ];
  const [cacData,setCacData]=useState(CAC_BASE);
  const toast=useToast();
  const [needsPassword,setNeedsPassword]=useState(()=>typeof window!=="undefined"&&(window.location.hash.includes("type=invite")||window.location.hash.includes("type=recovery")));

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

  const mergeCACConBase=(fromDB)=>{
    const map=new Map(CAC_BASE.map(x=>[x.fecha,x.valor]));
    (fromDB||[]).forEach(x=>map.set(x.fecha,parseFloat(x.valor)));
    return [...map.entries()].map(([fecha,valor])=>({fecha,valor})).sort((a,b)=>a.fecha>b.fecha?1:-1);
  };
  const fetchCAC=async()=>{
    try{const{data,error}=await supabase.from("cac_historico").select("fecha,valor").order("fecha",{ascending:true});if(!error&&data?.length)setCacData(mergeCACConBase(data));}catch{}
  };
  const refreshCAC=async()=>{
    try{const{data,error}=await supabase.from("cac_historico").select("fecha,valor").order("fecha",{ascending:true});if(!error&&data?.length)setCacData(mergeCACConBase(data));}catch{}
  };

  if(authLoading)return <><style>{gCSS}</style><Spinner/></>;
  if(needsPassword)return <><style>{gCSS}</style><SetPasswordScreen user={user} toast={toast} onDone={()=>{window.history.replaceState(null,"",window.location.pathname);setNeedsPassword(false);}}/><ToastContainer toasts={toast.toasts}/></>;
  if(!user)return <><style>{gCSS}</style><AuthScreen onLogin={setUser} toast={toast}/><ToastContainer toasts={toast.toasts}/></>;
  if(!obraActiva)return <><style>{gCSS}</style><ObrasScreen user={user} onSelect={o=>{setObraActiva(o);setTab("dashboard");}} onLogout={async()=>{await supabase.auth.signOut();setUser(null);}} toast={toast}/><ToastContainer toasts={toast.toasts}/></>;
  return <><style>{gCSS}</style><ObraApp user={user} obra={obraActiva} tab={tab} setTab={setTab} tcOficial={tcOficial} tcBlue={tcBlue} tcManual={tcManual} setTcManual={setTcManual} tcLoading={tcLoading} fetchTCs={fetchTCs} inflData={inflData} fetchIPC={fetchIPC} tcHistData={tcHistData} fetchTCHist={fetchTCHist} cacData={cacData} fetchCAC={fetchCAC} refreshCAC={refreshCAC} toast={toast} onBack={()=>setObraActiva(null)} onLogout={async()=>{await supabase.auth.signOut();setUser(null);setObraActiva(null);}}/><ToastContainer toasts={toast.toasts}/></>;
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

// ── SET PASSWORD (link de invitación / recuperación) ──────────────────────────
function ChangePasswordModal({onClose,toast}){
  const [pass,setPass]=useState("");
  const [pass2,setPass2]=useState("");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const handle=async()=>{
    if(pass.length<6)return setErr("La contraseña debe tener al menos 6 caracteres.");
    if(pass!==pass2)return setErr("Las contraseñas no coinciden.");
    setLoading(true);setErr("");
    const{error}=await supabase.auth.updateUser({password:pass});
    if(error){setErr(error.message);setLoading(false);return;}
    toast.success("Contraseña actualizada");
    setLoading(false);
    onClose();
  };
  return <Modal title="Cambiar contraseña" onClose={onClose}>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div><div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Nueva contraseña</div><input style={INP} type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
      <div><div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Repetir contraseña</div><input style={INP} type="password" placeholder="••••••••" value={pass2} onChange={e=>setPass2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
      {err&&<div style={{background:C.red+"18",border:`1px solid ${C.red}33`,borderRadius:7,padding:"8px 12px",fontSize:12,color:C.red}}>{err}</div>}
      <div style={{display:"flex",gap:8}}><Btn primary onClick={handle} loading={loading}>Guardar</Btn><Btn onClick={onClose}>Cancelar</Btn></div>
    </div>
  </Modal>;
}

function SetPasswordScreen({user,toast,onDone}){
  const [pass,setPass]=useState("");
  const [pass2,setPass2]=useState("");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");

  const handle=async()=>{
    if(pass.length<6)return setErr("La contraseña debe tener al menos 6 caracteres.");
    if(pass!==pass2)return setErr("Las contraseñas no coinciden.");
    setLoading(true);setErr("");
    const{error}=await supabase.auth.updateUser({password:pass});
    if(error){setErr(error.message);setLoading(false);return;}
    toast.success("Contraseña creada. ¡Bienvenido!");
    setLoading(false);
    onDone();
  };

  if(!user)return <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{width:"100%",maxWidth:380}}><Card><div style={{textAlign:"center",padding:10}}>
      <div style={{fontSize:14,color:C.t,marginBottom:14,fontWeight:600}}>El link de invitación es inválido o ya expiró.</div>
      <Btn primary onClick={()=>{window.history.replaceState(null,"",window.location.pathname);window.location.reload();}}>Ir al login</Btn>
    </div></Card></div>
  </div>;

  return <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{width:"100%",maxWidth:380}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><Logo size={90}/></div>
        <div style={{fontWeight:800,fontSize:24,letterSpacing:"-.04em",color:C.t}}>DA2ARQ</div>
        <div style={{color:C.t3,fontSize:13,marginTop:3}}>Creá tu contraseña para {user.email}</div>
      </div>
      <Card>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Nueva contraseña</div><input style={INP} type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Repetir contraseña</div><input style={INP} type="password" placeholder="••••••••" value={pass2} onChange={e=>setPass2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
          {err&&<div style={{background:C.red+"18",border:`1px solid ${C.red}33`,borderRadius:7,padding:"8px 12px",fontSize:12,color:C.red}}>{err}</div>}
          <Btn primary full onClick={handle} loading={loading}>Crear contraseña e ingresar</Btn>
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
  const [showPw,setShowPw]=useState(false);
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
      <div style={{display:"flex",alignItems:"center",gap:10}}><span className="hide-mobile" style={{fontSize:12,color:C.t2}}>{user.email}</span><Btn small onClick={()=>setShowPw(true)}>🔒 Contraseña</Btn><Btn small onClick={onLogout}>Salir</Btn></div>
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
    {showPw&&<ChangePasswordModal onClose={()=>setShowPw(false)} toast={toast}/>}
  </div>;
}

// ── OBRA APP ──────────────────────────────────────────────────────────────────
function ObraApp(props){
  const{user,obra,tab,setTab,tcOficial,tcBlue,tcManual,setTcManual,tcLoading,fetchTCs,inflData,fetchIPC,tcHistData,fetchTCHist,cacData,fetchCAC,refreshCAC,toast,onBack,onLogout}=props;
  const [gastos,setGastos]=useState([]);
  const [partic,setPartic]=useState([]);
  const [presup,setPresup]=useState([]);
  const [cats,setCats]=useState([]);
  const [fotos,setFotos]=useState([]);
  const [hitos,setHitos]=useState([]);
  const [comentarios,setComentarios]=useState([]);
  const [obraEtapas,setObraEtapas]=useState([]);
  const [loadingData,setLoadingData]=useState(true);
  const [mobileMenu,setMobileMenu]=useState(false);
  const [showGastoModal,setShowGastoModal]=useState(false);
  const [monedaVista,setMonedaVista]=useState("ARS");
  const [notifVistas,setNotifVistas]=useState(()=>{try{return JSON.parse(localStorage.getItem("nv_"+obra.id)||"{}")}catch{return {}}});
  const [showPw,setShowPw]=useState(false);

  const loadAll=useCallback(async()=>{
    setLoadingData(true);
    const[gRes,prRes,cRes,fRes,partRes,hRes,cRes2,etRes]=await Promise.all([
      supabase.from("gastos").select("*").eq("obra_id",obra.id).order("fecha",{ascending:false}),
      supabase.from("presupuestos").select("*").eq("obra_id",obra.id).order("fecha",{ascending:true}),
      supabase.from("categorias").select("*, subcategorias(*)").eq("obra_id",obra.id).order("orden"),
      supabase.from("fotos").select("*").eq("obra_id",obra.id).order("fecha",{ascending:false}),
      supabase.from("participantes").select("*").eq("obra_id",obra.id),
      supabase.from("hitos").select("*").eq("obra_id",obra.id).order("fecha_estimada"),
      supabase.from("comentarios_gasto").select("*").eq("obra_id",obra.id).order("created_at"),
      supabase.from("obra_etapas").select("*").eq("obra_id",obra.id).order("orden"),
    ]);
    setGastos(gRes.data||[]);setPresup(prRes.data||[]);
    setCats((cRes.data||[]).map(c=>({...c,subs:c.subcategorias||[]})));
    setFotos(fRes.data||[]);setPartic(partRes.data||[]);
    setHitos(hRes.data||[]);setComentarios(cRes2.data||[]);
    setObraEtapas(etRes.data||[]);
    setLoadingData(false);
  },[obra.id]);
  useEffect(()=>{loadAll();},[loadAll]);

  const miP=partic.find(p=>p.user_id===user.id);
  const miRol=miP?.rol||"cliente";
  const puedoCargar=miP?.puede_cargar||false;
  const esAdmin=miRol==="arquitecto"||miRol==="ayudante";
  const TABS_CLIENTE_DEFAULT=["dashboard","gastos","fotos","objetivos","reportes","resumen","ipc","usd","cac"];
  const tabsCliente=miP?.tabs_permitidas||TABS_CLIENTE_DEFAULT;
  const puedeVerEjecutado=miP?.ve_ejecutado!==false;
  const tcRef=tcOficial||tcManual;
  const gastosVis=esAdmin?gastos:miRol==="ayudante"?gastos.filter(g=>g.visibilidad!=="privado"):gastos.filter(g=>g.visibilidad==="publico").map(g=>({...g,monto:g.monto_cliente??g.monto}));

  const gastosNuevos=gastosVis.filter(g=>!notifVistas[g.id]).length;
  const totalNotifs=gastosNuevos;
  const marcarTodosVistos=()=>{const nv={...notifVistas};gastosVis.forEach(g=>{nv[g.id]=1;});comentarios.forEach(c=>{nv["c_"+c.id]=1;});setNotifVistas(nv);try{localStorage.setItem("nv_"+obra.id,JSON.stringify(nv));}catch{}};

  // Tabs permitidas para clientes (guardadas por participante en participantes.tabs_permitidas)
  const TABS=[
    ...(esAdmin||tabsCliente.includes("dashboard")?[{id:"dashboard",label:"Dashboard",icon:"📊"}]:[]),
    ...(esAdmin||tabsCliente.includes("gastos")?[{id:"gastos",label:"Gastos",icon:"💸",badge:totalNotifs}]:[]),
    ...(esAdmin||tabsCliente.includes("presupuesto")?[{id:"presupuesto",label:"Presupuesto",icon:"📐"}]:[]),
    ...(esAdmin||tabsCliente.includes("fotos")?[{id:"fotos",label:"Fotos",icon:"📷"}]:[]),
    ...(esAdmin||tabsCliente.includes("objetivos")?[{id:"objetivos",label:"Objetivos",icon:"🏁"}]:[]),
    ...(esAdmin||tabsCliente.includes("reportes")?[{id:"reportes",label:"Reportes",icon:"📈"}]:[]),
    ...(!esAdmin&&tabsCliente.includes("resumen")?[{id:"resumen",label:"Mi Resumen",icon:"📋"}]:[]),
    ...(esAdmin?[{id:"categorias",label:"Categorías",icon:"🏷️"}]:[]),
    ...(esAdmin?[{id:"participantes",label:"Participantes",icon:"👥"}]:[]),
    ...(esAdmin?[{id:"accesos",label:"Accesos",icon:"🔐"}]:[]),
    ...(esAdmin||tabsCliente.includes("ipc")?[{id:"ipc",label:"IPC",icon:"📉"}]:[]),
    ...(esAdmin||tabsCliente.includes("usd")?[{id:"usd",label:"USD",icon:"💵"}]:[]),
    ...(esAdmin||tabsCliente.includes("cac")?[{id:"cac",label:"CAC",icon:"🏗️"}]:[]),
  ];
  const tabsIds=TABS.map(t=>t.id).join(",");
  useEffect(()=>{const ids=tabsIds.split(",").filter(Boolean);if(ids.length&&!ids.includes(tab))setTab(ids[0]);},[tabsIds,tab,setTab]);
  const goTab=id=>{setTab(id);setMobileMenu(false);if(id==="ipc")fetchIPC();if(id==="usd"){fetchIPC();fetchTCHist();}if(id==="cac")fetchCAC();if(id==="gastos")marcarTodosVistos();};

  return <div style={{minHeight:"100vh",background:C.bg}}>
    <div style={{background:C.bg2,borderBottom:`1px solid ${C.bd}`,padding:"0 16px",position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:50}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={onBack} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:7,padding:"5px 10px",cursor:"pointer",color:C.t2,fontSize:11,fontWeight:600}}>← Obras</button>
          <Logo size={34}/>
          <div><div style={{fontWeight:700,fontSize:13,color:C.t}}>{obra.nombre}</div><div className="hide-mobile" style={{fontSize:10,color:C.t3}}>{obra.direccion}</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"flex",background:C.bg3,borderRadius:20,padding:3,border:`1px solid ${C.bd2}`}}>
            {["ARS","USD"].map(m=><button key={m} onClick={()=>setMonedaVista(m)} style={{padding:"4px 12px",fontSize:11,border:"none",borderRadius:16,cursor:"pointer",background:monedaVista===m?C.green:"transparent",color:monedaVista===m?"#fff":C.t2,fontWeight:monedaVista===m?700:400,transition:"all .2s"}}>{m}</button>)}
          </div>
          <Tag label={ROL_LABEL[miRol]} color={ROL_COLOR[miRol]}/>
          <Btn small onClick={()=>setShowPw(true)}>🔒</Btn>
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
        {tab==="gastos"&&<GastosTab user={user} obra={obra} gastos={gastos} esAdmin={esAdmin} miRol={miRol} puedoCargar={puedoCargar} tcOficial={tcOficial} tcBlue={tcBlue} tcManual={tcManual} setTcManual={setTcManual} cats={cats} toast={toast} reload={loadAll} monedaVista={monedaVista} externalOpen={showGastoModal} onExternalClose={()=>setShowGastoModal(false)} comentarios={comentarios} miUserId={user.id}/>}
        {tab==="presupuesto"&&(esAdmin||tabsCliente.includes("presupuesto"))&&<PresupuestoTab obra={obra} gastos={gastos} presup={presup} tcRef={tcRef} tcOficial={tcOficial} tcBlue={tcBlue} cats={cats} toast={toast} reload={loadAll} monedaVista={monedaVista} inflData={inflData} fetchIPC={fetchIPC} cacData={cacData} fetchCAC={fetchCAC} esAdmin={esAdmin} puedeVerEjecutado={esAdmin||puedeVerEjecutado}/>}
        {tab==="fotos"&&<FotosTab obra={obra} fotos={fotos} puedoCargar={true} esAdmin={esAdmin} user={user} toast={toast} reload={loadAll} obraEtapas={obraEtapas}/>}
        {tab==="objetivos"&&<HitosTab obra={obra} hitos={hitos} esAdmin={esAdmin} toast={toast} reload={loadAll}/>}
        {tab==="reportes"&&<ReportesTab obra={obra} gastos={gastosVis} presup={presup} tcRef={tcRef} cats={cats} esAdmin={esAdmin} monedaVista={monedaVista}/>}
        {tab==="resumen"&&!esAdmin&&<ResumenClienteTab obra={obra} gastos={gastosVis} presup={presup} tcRef={tcRef} cats={cats} fotos={fotos} hitos={hitos} monedaVista={monedaVista}/>}
        {tab==="categorias"&&esAdmin&&<CategoriasTab cats={cats} obra={obra} toast={toast} reload={loadAll}/>}
        {tab==="participantes"&&esAdmin&&<ParticipantesTab obra={obra} partic={partic} toast={toast} reload={loadAll}/>}
        {tab==="accesos"&&esAdmin&&<AccesosTab obra={obra} partic={partic} toast={toast} reload={loadAll}/>}
        {tab==="ipc"&&<IPCTab inflData={inflData}/>}
        {tab==="usd"&&<USDTab tcHistData={tcHistData} inflData={inflData} tcOficial={tcOficial} tcBlue={tcBlue}/>}
        {tab==="cac"&&<CACTab cacData={cacData} fetchCAC={fetchCAC} esAdmin={esAdmin} toast={toast} refreshCAC={refreshCAC}/>}
      </>}
    </div>

    {(puedoCargar||esAdmin)&&<>
      <button onClick={()=>setShowGastoModal(true)}
        style={{position:"fixed",bottom:28,right:28,width:56,height:56,borderRadius:"50%",background:C.green,color:"#fff",border:"none",cursor:"pointer",fontSize:28,boxShadow:"0 4px 20px rgba(46,110,24,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:150,transition:"transform .2s"}}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        title="Cargar gasto">+</button>
      {showGastoModal&&<GastoRapidoModal
        user={user} obra={obra} cats={cats}
        tcOficial={tcOficial} tcBlue={tcBlue} tcManual={tcManual} setTcManual={setTcManual}
        esAdmin={esAdmin} toast={toast} reload={loadAll}
        onClose={()=>setShowGastoModal(false)}
      />}
    </>}
    {showPw&&<ChangePasswordModal onClose={()=>setShowPw(false)} toast={toast}/>}
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardTab({obra,gastos,esAdmin,presup,tcRef,partic,cats,fotos,hitos=[],monedaVista}){
  const enUSD=monedaVista==="USD";
  const conv=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  const totalMV=gastos.reduce((s,g)=>s+conv(g),0);
  const presupCatARS=presup.reduce((s,p)=>s+(p.moneda==="USD"?p.monto*tcRef:p.monto),0);
  const presupTotalARS=obra.presupuesto_total?(obra.moneda_presupuesto==="USD"?obra.presupuesto_total*tcRef:obra.presupuesto_total):0;
  const presupBaseARS=presupCatARS>0?presupCatARS:presupTotalARS;
  const presupMV=enUSD?(tcRef>0?presupBaseARS/tcRef:0):presupBaseARS;
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);
  const pct=presupMV>0?Math.min(Math.round((totalMV/presupMV)*100),999):null;
  const ultGastos=gastos.slice(0,8);
  const ultFotos=fotos.slice(0,4);
  const autorG=g=>partic.find(p=>p.user_id===g.user_id)?.nombre||g.user_email||"—";

  // Categorías con subcategorías ordenadas por monto desc
  const porCat=cats.map(c=>{
    const totalCat=gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0);
    const subs=(c.subs||[]).map(s=>({
      ...s,
      total:gastos.filter(g=>g.cat_id===c.id&&g.sub_id===s.id).reduce((s2,g)=>s2+conv(g),0)
    })).filter(s=>s.total>0).sort((a,b)=>b.total-a.total);
    return {...c,total:totalCat,subs};
  }).filter(c=>c.total>0).sort((a,b)=>b.total-a.total);

  return <div className="fu">
    {/* FILA 1: KPIs */}
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
      <StatCard label={`Total gastado (${monedaVista})`} value={fmt(totalMV)} color={C.green} icon="💸"/>
      {presupMV>0&&<StatCard label={`Presupuesto (${monedaVista})`} value={fmt(presupMV)} color={C.blue} icon="📐"/>}
      {presupMV>0&&<StatCard label="Avance presupuesto" value={pct!==null?`${pct}%`:"—"} color={pct>100?C.red:pct>80?C.amber:C.green} icon="📊"/>}
      <StatCard label="Participantes" value={partic.length} color={C.lima} icon="👥"/>
    </div>

    {/* FILA 2: Gastos por categoría / subcategoría */}
    <Card style={{marginBottom:16}}>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:14,fontWeight:600,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span>Gastos por categoría · subcategoría</span>
        <span style={{color:C.t2,fontWeight:700}}>{fmt(totalMV)}</span>
      </div>
      {porCat.length===0&&<div style={{color:C.t3,fontSize:12,textAlign:"center",padding:"20px 0"}}>Sin gastos cargados aún</div>}
      {porCat.map(c=>{
        const pCat=totalMV>0?Math.round((c.total/totalMV)*100):0;
        return <div key={c.id} style={{marginBottom:14}}>
          {/* Fila categoría */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
            <div style={{width:30,height:30,borderRadius:8,background:(c.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{c.icon||"📦"}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                <span style={{fontSize:13,fontWeight:700,color:C.t}}>{c.label}</span>
                <span style={{fontSize:13,fontWeight:700,color:c.color||C.green}}>{fmt(c.total)} <span style={{fontSize:11,color:C.t3,fontWeight:400}}>· {pCat}% del total</span></span>
              </div>
              <div style={{height:7,borderRadius:4,background:C.bg3}}>
                <div style={{height:"100%",borderRadius:4,background:c.color||C.green,width:`${pCat}%`,transition:"width .6s"}}/>
              </div>
            </div>
          </div>
          {/* Subcategorías */}
          {c.subs.length>0&&<div style={{marginLeft:40,display:"flex",flexDirection:"column",gap:4}}>
            {c.subs.map(s=>{
              const pSub=c.total>0?Math.round((s.total/c.total)*100):0;
              return <div key={s.id} style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:10,color:C.t3,width:14,textAlign:"right",flexShrink:0}}>└</span>
                <div style={{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                  <span style={{fontSize:11,color:C.t2,minWidth:80}}>{s.label}</span>
                  <div style={{flex:1,height:4,borderRadius:2,background:C.bg3,maxWidth:180}}>
                    <div style={{height:"100%",borderRadius:2,background:(c.color||C.green)+"99",width:`${pSub}%`}}/>
                  </div>
                  <span style={{fontSize:11,color:C.t2,whiteSpace:"nowrap",minWidth:80,textAlign:"right"}}>{fmt(s.total)} <span style={{color:C.t3}}>· {pSub}%</span></span>
                </div>
              </div>;
            })}
          </div>}
        </div>;
      })}
    </Card>

    {/* FILA 3: Últimos gastos + Últimas fotos */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
      <Card>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Últimos gastos</div>
        {ultGastos.length===0&&<div style={{color:C.t3,fontSize:12,textAlign:"center",padding:"16px 0"}}>Sin gastos</div>}
        {ultGastos.map(g=>{
          const cat=cats.find(c=>c.id===g.cat_id);
          const sub=cat?.subs?.find(s=>s.id===g.sub_id);
          return <div key={g.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.bd}`}}>
            <div style={{display:"flex",alignItems:"center",gap:7,minWidth:0}}>
              <div style={{width:26,height:26,borderRadius:6,background:(cat?.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{cat?.icon||"📦"}</div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,color:C.t,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:130}}>{g.descripcion||sub?.label||cat?.label||"—"}</div>
                <div style={{fontSize:10,color:C.t3}}>{g.fecha} · <span style={{color:C.t2}}>{autorG(g)}</span></div>
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}>
              <div style={{fontSize:12,fontWeight:700,color:cat?.color||C.green}}>{fmt(conv(g))}</div>
              <div style={{fontSize:9,color:C.t3}}>{cat?.label}</div>
            </div>
          </div>;
        })}
      </Card>

      <Card>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Últimas fotos</div>
        {ultFotos.length===0&&<div style={{color:C.t3,fontSize:12,textAlign:"center",padding:"16px 0"}}>Sin fotos cargadas</div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {ultFotos.map(f=><div key={f.id} style={{borderRadius:8,overflow:"hidden",border:`1px solid ${C.bd}`}}>
            <img src={f.url} alt={f.titulo} style={{width:"100%",height:90,objectFit:"cover",display:"block"}}/>
            <div style={{padding:"5px 7px"}}>
              <div style={{fontSize:11,fontWeight:600,color:C.t,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.titulo}</div>
              <div style={{fontSize:10,color:C.t3}}>{f.fecha}{f.etapa&&` · ${f.etapa}`}</div>
            </div>
          </div>)}
        </div>
      </Card>
    </div>

    {/* FILA 4: Objetivos */}
    {hitos.length>0&&<Card>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600,display:"flex",justifyContent:"space-between"}}>
        <span>Objetivos de obra</span>
        <span>{hitos.filter(h=>h.estado==="completado").length}/{hitos.length} completados</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {hitos.slice(0,6).map(h=>{
          const EC={pendiente:{color:C.t3,dot:"○"},en_progreso:{color:C.amber,dot:"◑"},completado:{color:C.green,dot:"●"}};
          const ec=EC[h.estado]||EC.pendiente;
          return <div key={h.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:`1px solid ${C.bd}`}}>
            <span style={{fontSize:14,color:ec.color,flexShrink:0}}>{ec.dot}</span>
            <div style={{flex:1,minWidth:0}}>
              <span style={{fontSize:12,fontWeight:600,color:h.estado==="completado"?C.t3:C.t,textDecoration:h.estado==="completado"?"line-through":"none"}}>{h.titulo}</span>
            </div>
            <span style={{fontSize:10,color:C.t3,flexShrink:0}}>📅 {h.fecha_estimada}</span>
            <Tag label={h.estado==="completado"?"✓ Listo":h.estado==="en_progreso"?"En curso":"Pendiente"} color={ec.color}/>
          </div>;
        })}
      </div>
    </Card>}
  </div>;
}

// ── GASTOS ────────────────────────────────────────────────────────────────────
function GastosTab({user,obra,gastos,esAdmin,miRol,puedoCargar,tcOficial,tcBlue,tcManual,setTcManual,cats,toast,reload,monedaVista,externalOpen,onExternalClose,comentarios=[],miUserId}){
  const vis=gastos
    .filter(g=>esAdmin||(miRol==="ayudante"&&g.visibilidad!=="privado")||g.visibilidad==="publico")
    .map(g=>(esAdmin||miRol==="ayudante")?g:{...g,monto:g.monto_cliente??g.monto});
  const [showForm,setShowForm]=useState(false);
  const [filtro,setFiltro]=useState({cat:"todas",moneda:"todas",vis:"todas",q:""});
  const [tcTipo,setTcTipo]=useState("blue");
  const [editM,setEditM]=useState(null);
  const [saving,setSaving]=useState(false);
  const [gastoComent,setGastoComent]=useState(null);
  const tcRef=tcOficial||tcManual;
  const tcVal=tcTipo==="oficial"?(tcOficial||tcManual):tcTipo==="blue"?(tcBlue||tcManual):tcManual;
  const enUSD=monedaVista==="USD";
  const conv=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  const convCliente=g=>{const gc={...g,monto:g.monto_cliente??g.monto};return enUSD?toUSD(gc,tcRef):toARS(gc,tcRef);};
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);

  useEffect(()=>{if(externalOpen)setShowForm(true);},[externalOpen]);
  const closeForm=()=>{setShowForm(false);onExternalClose&&onExternalClose();};

  const filtered=vis.filter(g=>{
    if(filtro.cat!=="todas"&&g.cat_id!==filtro.cat)return false;
    if(filtro.moneda!=="todas"&&g.moneda!==filtro.moneda)return false;
    if(filtro.vis!=="todas"&&g.visibilidad!==filtro.vis)return false;
    if(filtro.q&&!((g.descripcion||"").toLowerCase().includes(filtro.q.toLowerCase())))return false;
    return true;
  });
  const totalFilt=filtered.reduce((s,g)=>s+conv(g),0);
  const totalFiltCliente=esAdmin?filtered.reduce((s,g)=>s+convCliente(g),0):null;

  const catE=cats.find(c=>c.id===editM?.cat_id);
  const saveEdit=async()=>{
    if(!editM)return;setSaving(true);
    const{error}=await supabase.from("gastos").update({
      fecha:editM.fecha,cat_id:editM.cat_id,sub_id:editM.sub_id,
      monto:parseFloat(editM.monto),moneda:editM.moneda,
      descripcion:editM.descripcion,visibilidad:editM.visibilidad,
      monto_cliente:editM.monto_cliente?parseFloat(editM.monto_cliente):null,
    }).eq("id",editM.id);
    if(error)toast.error("Error: "+error.message);
    else{toast.success("Gasto actualizado");await reload();}
    setEditM(null);setSaving(false);
  };
  const deleteG=async(id)=>{const{error}=await supabase.from("gastos").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}};

  return <div className="fu">
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12,alignItems:"center"}}>
      <select style={{...SEL,width:"auto",fontSize:11}} value={filtro.cat} onChange={e=>setFiltro(f=>({...f,cat:e.target.value}))}>
        <option value="todas">Todas las cats.</option>
        {cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
      </select>
      <select style={{...SEL,width:"auto",fontSize:11}} value={filtro.moneda} onChange={e=>setFiltro(f=>({...f,moneda:e.target.value}))}>
        <option value="todas">ARS + USD</option><option value="ARS">Solo ARS</option><option value="USD">Solo USD</option>
      </select>
      {esAdmin&&<select style={{...SEL,width:"auto",fontSize:11}} value={filtro.vis} onChange={e=>setFiltro(f=>({...f,vis:e.target.value}))}>
        <option value="todas">Toda visibilidad</option><option value="publico">Públicos</option><option value="solo_admin">Equipo</option><option value="privado">Privados</option>
      </select>}
      <input style={{...INP,flex:1,minWidth:120,fontSize:11}} placeholder="Buscar descripción..." value={filtro.q} onChange={e=>setFiltro(f=>({...f,q:e.target.value}))}/>
      {(puedoCargar||esAdmin)&&<Btn primary onClick={()=>setShowForm(true)}>+ Cargar gasto</Btn>}
      <div style={{marginLeft:"auto",textAlign:"right"}}>
        <div style={{fontSize:12,fontWeight:700,color:C.green}}>{fmt(totalFilt)}{esAdmin?" 🔒":""}</div>
        {esAdmin&&totalFiltCliente!==null&&totalFiltCliente!==totalFilt&&<div style={{fontSize:10,color:C.lima,fontWeight:600}}>🌐 Cliente ve: {fmt(totalFiltCliente)}</div>}
      </div>
    </div>

    <Card style={{padding:0,overflow:"hidden"}}>
      {filtered.map(g=>{
        const cat=cats.find(c=>c.id===g.cat_id);
        const sub=cat?.subs?.find(s=>s.id===g.sub_id);
        const cCount=comentarios.filter(c=>c.gasto_id===g.id).length;
        const difiereCliente=esAdmin&&g.monto_cliente!=null&&g.monto_cliente!==g.monto;
        return <div key={g.id} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 16px",borderBottom:`1px solid ${C.bd}`,transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.bg3} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <div style={{width:34,height:34,borderRadius:9,background:(cat?.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{cat?.icon||"📦"}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,color:C.t,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{g.descripcion||sub?.label||cat?.label||"—"}</div>
            <div style={{fontSize:11,color:C.t3,marginTop:1}}>{g.fecha} · {cat?.label}{sub?` › ${sub.label}`:""}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:14,fontWeight:700,color:cat?.color||C.green}}>{fmt(conv(g))}</div>
            <div style={{fontSize:10,color:C.t3}}>{g.moneda==="USD"?`USD ${g.monto.toLocaleString("es-AR",{maximumFractionDigits:2})}`:`$${g.monto.toLocaleString("es-AR",{maximumFractionDigits:0})}`}</div>
            {difiereCliente&&<div style={{fontSize:10,color:C.lima,fontWeight:600,marginTop:1}}>🌐 {fmt(convCliente(g))}</div>}
          </div>
          <div style={{display:"flex",gap:4,flexShrink:0,alignItems:"center"}}>
            <button onClick={()=>setGastoComent(g)} style={{background:cCount>0?C.blue+"18":"none",border:cCount>0?`1px solid ${C.blue}33`:"none",cursor:"pointer",color:C.blue,fontSize:13,borderRadius:6,padding:"3px 7px",display:"flex",alignItems:"center",gap:3}}>
              💬{cCount>0&&<span style={{fontSize:10,fontWeight:700}}>{cCount}</span>}
            </button>
            {esAdmin&&<><button onClick={()=>setEditM({...g,monto:g.monto.toString(),monto_cliente:(g.monto_cliente||"").toString()})} style={{background:"none",border:`1px solid ${C.bd2}`,cursor:"pointer",color:C.t2,fontSize:11,borderRadius:5,padding:"3px 8px"}}>✎</button><button onClick={()=>deleteG(g.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:20,padding:"0 4px"}}>×</button></>}
          </div>
        </div>;
      })}
      {filtered.length===0&&<div style={{textAlign:"center",padding:"28px 0",color:C.t3}}>Sin resultados</div>}
    </Card>

    {editM&&<Modal title="Editar gasto" onClose={()=>setEditM(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha</div><input style={INP} type="date" value={editM.fecha} onChange={e=>setEditM(m=>({...m,fecha:e.target.value}))}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div><select style={SEL} value={editM.moneda} onChange={e=>setEditM(m=>({...m,moneda:e.target.value}))}><option>ARS</option><option>USD</option></select></div>
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
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Visibilidad</div><select style={SEL} value={editM.visibilidad} onChange={e=>setEditM(m=>({...m,visibilidad:e.target.value}))}><option value="publico">🌐 Público (todos)</option><option value="solo_admin">👷 Solo equipo (arq. + ayudante)</option><option value="privado">🔒 Solo yo (arquitecto)</option></select></div>
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción</div><input style={INP} value={editM.descripcion||""} onChange={e=>setEditM(m=>({...m,descripcion:e.target.value}))}/></div>
        </div>
        <div style={{background:"#1a3d0a18",border:`1px solid ${C.green}33`,borderRadius:10,padding:"12px 14px"}}>
          <div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:10}}>💰 Montos</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>🔒 Monto real <span style={{color:C.t3,fontWeight:400}}>(solo vos)</span></div>
              <input style={{...INP,borderColor:C.green+"66"}} type="number" value={editM.monto} onChange={e=>setEditM(m=>({...m,monto:e.target.value}))}/>
            </div>
            <div>
              <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>🌐 Monto cliente <span style={{color:C.t3,fontWeight:400}}>(opcional)</span></div>
              <input style={{...INP,borderColor:C.lima+"66"}} type="number" placeholder="igual al real" value={editM.monto_cliente||""} onChange={e=>setEditM(m=>({...m,monto_cliente:e.target.value}))}/>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={saveEdit} loading={saving}>Guardar</Btn><Btn onClick={()=>setEditM(null)}>Cancelar</Btn></div>
      </div>
    </Modal>}
    {gastoComent&&<ComentariosModal gasto={gastoComent} comentarios={comentarios.filter(c=>c.gasto_id===gastoComent.id)} obra={obra} user={user} esAdmin={esAdmin} toast={toast} reload={reload} onClose={()=>setGastoComent(null)}/>}
    {showForm&&<GastoRapidoModal user={user} obra={obra} cats={cats} tcOficial={tcOficial} tcBlue={tcBlue} tcManual={tcManual} setTcManual={setTcManual} esAdmin={esAdmin} toast={toast} reload={reload} onClose={closeForm}/>}
  </div>;
}

// ── GASTO RÁPIDO MODAL (FAB) ──────────────────────────────────────────────────
function GastoRapidoModal({user,obra,cats,tcOficial,tcBlue,tcManual,setTcManual,esAdmin,toast,reload,onClose}){
  const [tcTipo,setTcTipo]=useState("blue");
  const tcRef=tcOficial||tcManual;
  const tcVal=tcTipo==="oficial"?(tcOficial||tcManual):tcTipo==="blue"?(tcBlue||tcManual):tcManual;
  const initD=()=>({fecha:todayISO(),cat_id:cats[0]?.id||"",sub_id:cats[0]?.subs?.[0]?.id||"",monto:"",monto_cliente:"",moneda:"ARS",descripcion:"",visibilidad:esAdmin?"solo_admin":"publico"});
  const [draft,setDraft]=useState(initD);
  const [saving,setSaving]=useState(false);
  const montoNum=parseFloat(draft.monto)||0;
  const catD=cats.find(c=>c.id===draft.cat_id);

  const save=async()=>{
    if(montoNum<=0)return;setSaving(true);
    const{error}=await supabase.from("gastos").insert({
      obra_id:obra.id,user_id:user.id,
      fecha:draft.fecha,cat_id:draft.cat_id,sub_id:draft.sub_id||null,
      monto:montoNum,moneda:draft.moneda,
      monto_cliente:esAdmin&&draft.monto_cliente?parseFloat(draft.monto_cliente):null,
      tc_valor:draft.moneda==="USD"?tcVal:null,
      descripcion:draft.descripcion.trim()||null,
      visibilidad:esAdmin?draft.visibilidad:"publico",
    });
    if(error){toast.error("Error: "+error.message);setSaving(false);return;}
    toast.success("Gasto guardado");await reload();setDraft(initD());setSaving(false);
  };

  return <Modal title="Cargar gasto" onClose={onClose}>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 80px",gap:8}}>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>{esAdmin?"🔒 Monto real":"Monto"}</div>
          <input style={{...INP,fontSize:20,fontWeight:700}} type="number" placeholder="0" autoFocus value={draft.monto} onChange={e=>setDraft(d=>({...d,monto:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&save()}/>
        </div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div>
          <select style={SEL} value={draft.moneda} onChange={e=>setDraft(d=>({...d,moneda:e.target.value}))}><option>ARS</option><option>USD</option></select>
        </div>
      </div>

      {esAdmin&&<div>
        <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>🌐 Monto cliente <span style={{color:C.t3,fontWeight:400}}>(opcional, si es distinto al real)</span></div>
        <input style={{...INP,borderColor:C.lima+"66"}} type="number" placeholder="igual al real" value={draft.monto_cliente} onChange={e=>setDraft(d=>({...d,monto_cliente:e.target.value}))}/>
      </div>}

      {draft.moneda==="USD"&&<div style={{background:C.bg3,borderRadius:8,padding:"8px 12px"}}>
        <div style={{fontSize:11,color:C.t2,marginBottom:6,fontWeight:600}}>Tipo de cambio a usar</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[{v:"oficial",label:`Oficial $${tcOficial?.toLocaleString("es-AR")||"—"}`},{v:"blue",label:`Blue $${tcBlue?.toLocaleString("es-AR")||"—"}`},{v:"manual",label:"Manual"}].map(o=>(
            <button key={o.v} onClick={()=>setTcTipo(o.v)} style={{padding:"5px 10px",fontSize:11,border:`1px solid ${tcTipo===o.v?C.green:C.bd2}`,borderRadius:6,cursor:"pointer",background:tcTipo===o.v?C.green+"18":"transparent",color:tcTipo===o.v?C.green:C.t2,fontWeight:tcTipo===o.v?600:400}}>{o.label}</button>
          ))}
          {tcTipo==="manual"&&<input type="number" value={tcManual} onChange={e=>setTcManual(+e.target.value)} style={{...INP,width:90,padding:"4px 8px",fontSize:11}}/>}
        </div>
        {montoNum>0&&<div style={{marginTop:8,fontSize:12,color:C.t2}}>= {fmtARS(montoNum*(tcVal||tcManual))}</div>}
      </div>}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Categoría</div>
          <select style={SEL} value={draft.cat_id} onChange={e=>{const c=cats.find(x=>x.id===e.target.value);setDraft(d=>({...d,cat_id:e.target.value,sub_id:c?.subs?.[0]?.id||""}));}}>
            {cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
        </div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Subcategoría</div>
          <select style={SEL} value={draft.sub_id} onChange={e=>setDraft(d=>({...d,sub_id:e.target.value}))}>
            {(catD?.subs||[]).map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha</div>
          <input style={INP} type="date" value={draft.fecha} onChange={e=>setDraft(d=>({...d,fecha:e.target.value}))}/>
        </div>
        {esAdmin&&<div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Visibilidad</div>
          <select style={SEL} value={draft.visibilidad} onChange={e=>setDraft(d=>({...d,visibilidad:e.target.value}))}>
            <option value="publico">🌐 Público (todos)</option>
            <option value="solo_admin">👷 Solo equipo (arq. + ayudante)</option>
            <option value="privado">🔒 Solo yo (arquitecto)</option>
          </select>
        </div>}
      </div>

      <div style={{marginBottom:4}}>
        <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción (opcional)</div>
        <input style={INP} placeholder="Ej: Cuadrilla lunes..." value={draft.descripcion} onChange={e=>setDraft(d=>({...d,descripcion:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&save()}/>
      </div>

      <Btn primary full onClick={save} loading={saving} disabled={montoNum<=0}>
        {saving?"Guardando...":"Guardar gasto"}
      </Btn>
      <div style={{textAlign:"center",fontSize:11,color:C.t3,marginTop:4}}>TC al guardar: ${tcVal?.toLocaleString("es-AR")} · Enter para guardar</div>
    </div>
  </Modal>;
}

// ── HISTORIAL PRESUPUESTO (componente auxiliar) ───────────────────────────────
function HistorialPresupuesto({presupInicialObra,presup,indiceAjuste,cacData,inflData,calcFactor,tcRef,enUSD,fmt,totalPMV,presupAjustado,INDICES}){
  const data=indiceAjuste!=="usd"?(indiceAjuste==="cac"?cacData:inflData):null;
  const montoInicialARS=presupInicialObra.moneda==="USD"?presupInicialObra.monto*tcRef:presupInicialObra.monto;
  const fInicial=data?calcFactor(presupInicialObra.fecha,data):1;
  const ajustadoInicial=Math.round(montoInicialARS*fInicial);
  const pctVar=data&&fInicial!==1?+((fInicial-1)*100).toFixed(1):null;
  const idxColor=INDICES.find(i=>i.v===indiceAjuste)?.color||C.amber;
  const ultimaFechaPresup=[...presup].sort((a,b)=>b.fecha>a.fecha?1:-1)[0]?.fecha||"—";

  return <Card style={{marginBottom:14,border:`1px solid ${C.amber}33`,background:C.amber+"06"}}>
    <div style={{fontSize:12,fontWeight:700,color:C.t,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
      <span>📋</span> Historial del presupuesto de obra
      <span style={{fontSize:10,color:C.t3,fontWeight:400,marginLeft:4}}>Comparativo entre versión inicial y vigente</span>
    </div>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead><tr style={{borderBottom:`1px solid ${C.bd2}`}}>
        <th style={{padding:"6px 10px",textAlign:"left",fontSize:10,color:C.t3,fontWeight:700,textTransform:"uppercase"}}>Versión</th>
        <th style={{padding:"6px 10px",textAlign:"left",fontSize:10,color:C.t3,fontWeight:700,textTransform:"uppercase"}}>Fecha</th>
        <th style={{padding:"6px 10px",textAlign:"right",fontSize:10,color:C.t3,fontWeight:700,textTransform:"uppercase"}}>Monto original</th>
        <th style={{padding:"6px 10px",textAlign:"right",fontSize:10,color:C.t3,fontWeight:700,textTransform:"uppercase"}}>Ajustado ({indiceAjuste.toUpperCase()}) hoy</th>
        <th style={{padding:"6px 10px",textAlign:"right",fontSize:10,color:C.t3,fontWeight:700,textTransform:"uppercase"}}>Incremento</th>
      </tr></thead>
      <tbody>
        <tr style={{borderBottom:`1px solid ${C.bd}`,background:C.bg3}}>
          <td style={{padding:"9px 10px",color:C.t3,fontStyle:"italic",fontWeight:500}}>Inicial (al crear la obra)</td>
          <td style={{padding:"9px 10px",color:C.t3,fontSize:11}}>{presupInicialObra.fecha||"—"}</td>
          <td style={{padding:"9px 10px",textAlign:"right",fontWeight:700,color:C.t2}}>{fmt(enUSD?presupInicialObra.monto/(presupInicialObra.moneda==="USD"?1:tcRef):montoInicialARS)}</td>
          <td style={{padding:"9px 10px",textAlign:"right",fontWeight:700,color:data?C.amber:C.t3}}>{data&&fInicial!==1?fmt(enUSD?ajustadoInicial/tcRef:ajustadoInicial):data?"Sin datos":"—"}</td>
          <td style={{padding:"9px 10px",textAlign:"right",color:C.amber,fontWeight:600}}>{pctVar?`+${pctVar}%`:"—"}</td>
        </tr>
        {presup.length>0&&<tr style={{borderBottom:`1px solid ${C.bd}`}}>
          <td style={{padding:"9px 10px",fontWeight:700,color:C.t}}>Vigente (desglosado por categoría)</td>
          <td style={{padding:"9px 10px",color:C.t3,fontSize:11}}>{ultimaFechaPresup}</td>
          <td style={{padding:"9px 10px",textAlign:"right",fontWeight:700,color:C.blue}}>{fmt(totalPMV)}</td>
          <td style={{padding:"9px 10px",textAlign:"right",fontWeight:700,color:presupAjustado?idxColor:C.t3}}>
            {presupAjustado?fmt(enUSD?presupAjustado/tcRef:presupAjustado):"—"}
          </td>
          <td style={{padding:"9px 10px",textAlign:"right",color:idxColor,fontWeight:600}}>
            {presupAjustado?`+${+((presupAjustado/(enUSD?totalPMV*tcRef:totalPMV)-1)*100).toFixed(1)}%`:"—"}
          </td>
        </tr>}
      </tbody>
    </table>
  </Card>;
}

// ── PANEL AJUSTE (componente auxiliar de PresupuestoTab) ─────────────────────
function PanelAjuste({indiceAjuste,inflData,cacData,tcOficial,obra,presupBaseARS,presupAjustado,ajusteAcum,calcAjusteGeneral,showInfl,handleShowInfl,fetchIPC,fetchCAC,setShowInfl,INDICES}){
  const idxInfo=INDICES.find(i=>i.v===indiceAjuste)||INDICES[0];
  const colIdx=idxInfo.color;
  const needsData=(indiceAjuste==="ipc"&&!inflData)||(indiceAjuste==="cac"&&!cacData);
  return <Card style={{marginTop:14,border:`1px solid ${colIdx}44`,background:colIdx+"08"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:20}}>{idxInfo.label.slice(-2)}</span>
        <div>
          <div style={{fontWeight:700,fontSize:13,color:C.t}}>Ajuste por {indiceAjuste==="usd"?"Dólar":indiceAjuste==="cac"?"Índice CAC":"IPC"} acumulado</div>
          <div style={{fontSize:11,color:C.t3}}>Desde inicio de obra ({obra.created_at?.slice(0,7)||"—"}) · {indiceAjuste==="cac"?"Cámara Argentina de la Construcción":indiceAjuste==="ipc"?"IPC INDEC":"Dolarapi.com"}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {needsData&&<Btn small onClick={()=>{if(indiceAjuste==="ipc")fetchIPC();if(indiceAjuste==="cac")fetchCAC();setShowInfl(true);}}>Cargar datos</Btn>}
        {!needsData&&indiceAjuste!=="usd"&&<button onClick={handleShowInfl} style={{background:colIdx+"18",border:`1px solid ${colIdx}44`,borderRadius:8,padding:"5px 12px",cursor:"pointer",color:colIdx,fontSize:11,fontWeight:600}}>{showInfl?"Ocultar detalle":"Ver detalle"}</button>}
      </div>
    </div>
    {indiceAjuste==="usd"&&<div style={{marginTop:12,background:C.bg2,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.bd}`,fontSize:12,color:C.t2}}>
      El ajuste por dólar compara tu presupuesto en ARS vs el valor en USD al TC oficial actual. {tcOficial?<span>TC oficial hoy: <b style={{color:C.green}}>${tcOficial.toLocaleString("es-AR")}</b></span>:"Cargando TC..."}
      {presupBaseARS>0&&tcOficial&&<div style={{marginTop:8}}><b>Presupuesto original:</b> {fmtARS(presupBaseARS)} = <b style={{color:C.blue}}>{fmtUSD(presupBaseARS/tcOficial)}</b> al TC de hoy.</div>}
    </div>}
    {!needsData&&calcAjusteGeneral&&indiceAjuste!=="usd"&&<>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:14}}>
        <div style={{flex:"1 1 130px",background:C.bg2,borderRadius:10,padding:"12px 14px",border:`1px solid ${C.bd}`}}>
          <div style={{fontSize:10,color:C.t3,marginBottom:4,fontWeight:600,textTransform:"uppercase"}}>Acum. {indiceAjuste.toUpperCase()}</div>
          <div style={{fontSize:22,fontWeight:700,color:colIdx}}>{ajusteAcum?.toFixed(1)}%</div>
          <div style={{fontSize:10,color:C.t3,marginTop:2}}>{calcAjusteGeneral.length} meses medidos</div>
        </div>
        {presupBaseARS>0&&<div style={{flex:"1 1 180px",background:C.bg2,borderRadius:10,padding:"12px 14px",border:`1px solid ${C.bd}`}}>
          <div style={{fontSize:10,color:C.t3,marginBottom:4,fontWeight:600,textTransform:"uppercase"}}>Presup. original (suma)</div>
          <div style={{fontSize:18,fontWeight:700,color:C.blue}}>{fmtARS(presupBaseARS)}</div>
          <div style={{fontSize:10,color:C.t3,marginTop:2}}>sin ajuste por {indiceAjuste.toUpperCase()}</div>
        </div>}
        {presupAjustado&&<div style={{flex:"1 1 180px",background:C.bg2,borderRadius:10,padding:"12px 14px",border:`2px solid ${colIdx}`,boxShadow:`0 0 12px ${colIdx}22`}}>
          <div style={{fontSize:10,color:colIdx,marginBottom:4,fontWeight:700,textTransform:"uppercase"}}>Presup. ajustado hoy</div>
          <div style={{fontSize:18,fontWeight:700,color:colIdx}}>{fmtARS(presupAjustado)}</div>
          <div style={{fontSize:10,color:C.t3,marginTop:2}}>cada ítem ajustado desde su fecha</div>
        </div>}
      </div>
      {showInfl&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12}}>
        {calcAjusteGeneral.map(x=><div key={x.ym} style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:8,padding:"6px 12px",textAlign:"center"}}>
          <div style={{fontSize:10,color:C.t3}}>{x.ym.slice(5,7)}/{x.ym.slice(2,4)}</div>
          <div style={{fontSize:12,fontWeight:700,color:colIdx}}>{x.val?.toFixed(1)}%</div>
          <div style={{fontSize:10,color:C.t2}}>Acum: {x.acum?.toFixed(1)}%</div>
        </div>)}
      </div>}
    </>}
    {needsData&&<div style={{fontSize:12,color:C.t3,marginTop:10}}>Presioná "Cargar datos" para ver el presupuesto ajustado.</div>}
  </Card>;
}

// ── PRESUPUESTO ───────────────────────────────────────────────────────────────
function PresupuestoTab({obra,gastos,presup,tcRef,tcOficial,tcBlue,cats,toast,reload,monedaVista,inflData,fetchIPC,cacData,fetchCAC,esAdmin=true,puedeVerEjecutado=true}){
  const [modal,setModal]=useState(false);
  const [draft,setDraft]=useState({cat_id:cats[0]?.id||"",sub_id:"",monto:"",moneda:"ARS",fecha:todayISO(),descripcion:""});
  const [saving,setSaving]=useState(false);
  const [showInfl,setShowInfl]=useState(false);
  const [expandedCat,setExpandedCat]=useState({});
  const [indiceAjuste,setIndiceAjuste]=useState("cac"); // "ipc" | "cac" | "usd"
  const enUSD=monedaVista==="USD";
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);

  // Convertir registro de presupuesto a moneda vista
  const presupToMV=p=>{
    const ars=p.moneda==="USD"?p.monto*tcRef:p.monto;
    return enUSD?(tcRef>0?ars/tcRef:0):ars;
  };

  // Ejecutado por categoría en moneda vista
  const ejCat=cat_id=>{
    const ars=gastos.filter(g=>g.cat_id===cat_id).reduce((s,g)=>s+toARS(g,tcRef),0);
    return enUSD?(tcRef>0?ars/tcRef:0):ars;
  };

  // Presupuesto total por categoría (suma TODOS los registros — no pisa)
  const presupCat=cat_id=>presup.filter(p=>p.cat_id===cat_id).reduce((s,p)=>s+presupToMV(p),0);

  const totalPMV=cats.reduce((s,c)=>s+presupCat(c.id),0);
  const totalEMV=cats.reduce((s,c)=>s+ejCat(c.id),0);

  // Calcular ajuste acumulado COMPUESTO desde una fecha según índice seleccionado
  // Para el historial expandible — devuelve el % de variación
  const ajusteDesde=fechaDesde=>{
    if(indiceAjuste==="usd")return null;
    const data=indiceAjuste==="cac"?cacData:inflData;
    const f=calcFactor(fechaDesde,data);
    return f===1?null:f-1;
  };

  // Panel general: acumulado desde inicio de obra (mes inclusive), con detalle mes a mes
  const calcAjusteGeneral=useMemo(()=>{
    const data=indiceAjuste==="cac"?cacData:indiceAjuste==="ipc"?inflData:null;
    if(!data||!obra.created_at)return null;
    const inicio=obra.created_at.slice(0,7);
    const serie=data
      .filter(x=>x.fecha.slice(0,7)>=inicio)
      .sort((a,b)=>a.fecha<b.fecha?-1:1);
    if(!serie.length)return null;
    let factor=1;
    return serie.map(x=>{
      factor*=(1+x.valor/100);
      return{ym:x.fecha.slice(0,7),val:x.valor,acum:+(((factor-1)*100).toFixed(2))};
    });
  },[indiceAjuste,cacData,inflData,obra.created_at]);

  const save=async()=>{
    if(!draft.monto||parseFloat(draft.monto)<=0)return;
    setSaving(true);
    const{error}=await supabase.from("presupuestos").insert({
      obra_id:obra.id,cat_id:draft.cat_id,sub_id:draft.sub_id||null,monto:parseFloat(draft.monto),
      moneda:draft.moneda,fecha:draft.fecha,descripcion:draft.descripcion.trim(),
    });
    if(error){toast.error("Error: "+error.message);setSaving(false);return;}
    toast.success("Presupuesto agregado");
    setDraft({cat_id:cats[0]?.id||"",sub_id:"",monto:"",moneda:"ARS",fecha:todayISO(),descripcion:""});
    setModal(false);await reload();setSaving(false);
  };

  const deleteP=async(id)=>{
    const{error}=await supabase.from("presupuestos").delete().eq("id",id);
    if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}
  };

  const doExport=()=>{
    const rows=[];
    cats.forEach(c=>{
      const ps=presup.filter(p=>p.cat_id===c.id);
      ps.forEach(p=>{
        const ej=ejCat(c.id);
        const pARS=p.moneda==="USD"?p.monto*tcRef:p.monto;
        const subL=c.subs?.find(s=>s.id===p.sub_id)?.label||"";
        const row={Categoria:c.label,Subcategoria:subL,Fecha:p.fecha||"",Descripcion:p.descripcion||"",Monto:p.monto,Moneda:p.moneda,Monto_ARS:Math.round(pARS)};
        if(puedeVerEjecutado)row.Ejecutado_ARS=Math.round(ej);
        rows.push(row);
      });
    });
    if(rows.length)exportCSV(rows,`presupuesto_${obra.nombre.replace(/\s+/g,"_")}.csv`);
  };

  const handleShowInfl=()=>{
    if(indiceAjuste==="ipc"&&!inflData)fetchIPC();
    if(indiceAjuste==="cac"&&!cacData)fetchCAC();
    setShowInfl(v=>!v);
  };

  const presupBaseARS=totalPMV>0?(enUSD?totalPMV*tcRef:totalPMV):obra.presupuesto_total?(obra.moneda_presupuesto==="USD"?obra.presupuesto_total*tcRef:obra.presupuesto_total):0;
  const ajusteAcum=calcAjusteGeneral?calcAjusteGeneral[calcAjusteGeneral.length-1]?.acum:null;

  // Función pura: factor compuesto desde un mes (inclusive) al último dato disponible
  const calcFactor=(fechaDesde,data)=>{
    if(!fechaDesde||!data)return 1;
    const desde=fechaDesde.slice(0,7);
    const serie=data.filter(x=>x.fecha.slice(0,7)>=desde).sort((a,b)=>a.fecha<b.fecha?-1:1);
    return serie.length>0?serie.reduce((f,x)=>f*(1+x.valor/100),1):1;
  };

  // Presupuesto ajustado: cada ítem × factor desde su fecha, sumados
  const presupAjustado=useMemo(()=>{
    if(indiceAjuste==="usd")return null;
    const data=indiceAjuste==="cac"?cacData:inflData;
    if(!data||!presup.length)return null;
    return Math.round(presup.reduce((sum,p)=>{
      const montoARS=p.moneda==="USD"?p.monto*tcRef:p.monto;
      return sum+montoARS*calcFactor(p.fecha,data);
    },0));
  },[presup,indiceAjuste,cacData,inflData,tcRef]);

  // Historial global: presupuesto inicial de obra (si existe y es distinto del total actual) + ítems
  const presupInicialObra=obra.presupuesto_total>0?{
    id:"_inicial",
    fecha:obra.created_at?.slice(0,10)||null,
    monto:obra.presupuesto_total,
    moneda:obra.moneda_presupuesto||"ARS",
    descripcion:"Presupuesto inicial de obra",
    esInicial:true,
  }:null;

  // Solo mostrarlo si difiere del total actual de categorías
  const mostrarInicial=presupInicialObra&&Math.abs((presupInicialObra.moneda==="USD"?presupInicialObra.monto*tcRef:presupInicialObra.monto)-presupBaseARS)>1000;

  const INDICES=[{v:"cac",label:"CAC 🏗️",color:"#5A3E1B"},{v:"ipc",label:"IPC 📉",color:C.amber},{v:"usd",label:"USD 💵",color:C.blue}];

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
      <div>
        <div style={{fontSize:16,fontWeight:700,color:C.t}}>Presupuesto por categoría</div>
        <div style={{fontSize:12,color:C.t3}}>Total presup: {fmt(totalPMV)}{puedeVerEjecutado?` · Ejecutado: ${fmt(totalEMV)}`:""}</div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        {/* Selector índice de ajuste */}
        <div style={{display:"flex",background:C.bg3,borderRadius:8,border:`1px solid ${C.bd2}`,padding:3,gap:2}}>
          {INDICES.map(idx=><button key={idx.v} onClick={()=>{setIndiceAjuste(idx.v);if(idx.v==="ipc"&&!inflData)fetchIPC();if(idx.v==="cac"&&!cacData)fetchCAC();}} style={{padding:"4px 10px",fontSize:11,border:"none",borderRadius:6,cursor:"pointer",background:indiceAjuste===idx.v?idx.color:"transparent",color:indiceAjuste===idx.v?"#fff":C.t2,fontWeight:indiceAjuste===idx.v?700:400,transition:"all .2s"}}>{idx.label}</button>)}
        </div>
        <Btn small onClick={doExport}>⬇ CSV</Btn>
        {esAdmin&&<Btn primary onClick={()=>{setDraft({cat_id:cats[0]?.id||"",sub_id:"",monto:"",moneda:"ARS",fecha:todayISO(),descripcion:""});setModal(true);}}>+ Agregar presupuesto</Btn>}
      </div>
    </div>

    {/* Resumen total */}
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
      <StatCard label={`Presupuesto total (${monedaVista})`} value={fmt(totalPMV)} color={C.blue} icon="📐"/>
      {puedeVerEjecutado&&<StatCard label={`Ejecutado (${monedaVista})`} value={fmt(totalEMV)} color={C.green} icon="💸"/>}
      {puedeVerEjecutado&&<StatCard label={`Disponible (${monedaVista})`} value={fmt(Math.max(0,totalPMV-totalEMV))} color={totalPMV-totalEMV<0?C.red:C.lima} icon="✅"/>}
      {presupAjustado&&<StatCard label={`Presup. ajustado (${INDICES.find(i=>i.v===indiceAjuste)?.label||indiceAjuste.toUpperCase()})`} value={fmt(enUSD?(presupAjustado/tcRef):presupAjustado)} color={INDICES.find(i=>i.v===indiceAjuste)?.color||C.amber} icon="📊" sub={totalPMV>0?`+${fmt(enUSD?((presupAjustado-totalPMV*tcRef)/tcRef):(presupAjustado-totalPMV))} vs original`:undefined}/>}
    </div>

    {/* Tabla por categoría con historial expandible */}
    <Card style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
          <th style={{padding:"8px 10px",textAlign:"left",color:C.t3,fontWeight:600,fontSize:11}}>Categoría</th>
          <th style={{padding:"8px 10px",textAlign:"right",color:C.t3,fontWeight:600,fontSize:11}}>Presupuestado</th>
          {puedeVerEjecutado&&<th style={{padding:"8px 10px",textAlign:"right",color:C.t3,fontWeight:600,fontSize:11}}>Ejecutado</th>}
          {puedeVerEjecutado&&<th style={{padding:"8px 10px",textAlign:"right",color:C.t3,fontWeight:600,fontSize:11}}>Diferencia</th>}
          {puedeVerEjecutado&&<th style={{padding:"8px 10px",minWidth:120,color:C.t3,fontWeight:600,fontSize:11}}>Avance</th>}
          <th style={{padding:"8px 10px",width:36}}/>
        </tr></thead>
        <tbody>
          {cats.map(c=>{
            const pMV=presupCat(c.id);
            const eMV=ejCat(c.id);
            const diff=pMV-eMV;
            const pct=pMV>0?Math.round((eMV/pMV)*100):null;
            const col=pct===null?C.t3:pct>100?C.red:pct>80?C.amber:C.green;
            const registros=presup.filter(p=>p.cat_id===c.id).sort((a,b)=>a.fecha>b.fecha?1:-1);
            const isExp=expandedCat[c.id];
            return <React.Fragment key={c.id}>
              <tr style={{borderBottom:`1px solid ${C.bd}`,background:"transparent"}}>
                <td style={{padding:"10px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:18}}>{c.icon||"📦"}</span>
                    <span style={{fontWeight:600,color:C.t}}>{c.label}</span>
                    {registros.length>0&&<button onClick={()=>setExpandedCat(v=>({...v,[c.id]:!v[c.id]}))} style={{background:C.bg3,border:`1px solid ${C.bd}`,borderRadius:5,padding:"2px 7px",fontSize:10,cursor:"pointer",color:C.t2}}>{isExp?"▲":"▼"} {registros.length}</button>}
                  </div>
                </td>
                <td style={{padding:"10px",textAlign:"right",fontWeight:600,color:C.blue}}>{pMV>0?fmt(pMV):"—"}</td>
                {puedeVerEjecutado&&<td style={{padding:"10px",textAlign:"right",fontWeight:600,color:C.green}}>{fmt(eMV)}</td>}
                {puedeVerEjecutado&&<td style={{padding:"10px",textAlign:"right",fontWeight:600,color:pMV>0?(diff>=0?C.green:C.red):C.t3,whiteSpace:"nowrap"}}>{pMV>0?fmt(diff):"—"}</td>}
                {puedeVerEjecutado&&<td style={{padding:"10px",minWidth:120}}>
                  {pct!==null?<><div style={{height:6,borderRadius:3,background:C.bg3,marginBottom:3}}><div style={{height:"100%",borderRadius:3,background:col,width:`${Math.min(pct,100)}%`,transition:"width .5s"}}/></div><span style={{fontSize:10,color:col,fontWeight:700}}>{pct}%</span></>:<span style={{fontSize:11,color:C.t3}}>Sin presup.</span>}
                </td>}
                <td style={{padding:"10px",textAlign:"right"}}/>
              </tr>
              {isExp&&registros.map((p,i)=>{
                const pMVr=presupToMV(p);
                const infl=ajusteDesde(p.fecha);
                const ajustado=infl!=null?pMVr*(1+infl):null;
                const subL=c.subs?.find(s=>s.id===p.sub_id)?.label;
                return <tr key={p.id} style={{background:C.bg3,borderBottom:`1px solid ${C.bd}`}}>
                  <td style={{padding:"6px 10px 6px 44px",color:C.t3,fontSize:12}}>
                    <span style={{marginRight:6}}>└</span>
                    <span style={{color:C.t2,fontWeight:600}}>#{i+1}</span>
                    {subL&&<span style={{marginLeft:8,background:C.blue+"18",color:C.blue,borderRadius:5,padding:"1px 7px",fontSize:10,fontWeight:600}}>{subL}</span>}
                    {p.fecha&&<span style={{marginLeft:8,color:C.t3}}>📅 {p.fecha}</span>}
                    {p.descripcion&&<span style={{marginLeft:8,color:C.t2,fontStyle:"italic"}}>· {p.descripcion}</span>}
                  </td>
                  <td style={{padding:"6px 10px",textAlign:"right",color:C.blue,fontSize:12,fontWeight:600}}>{fmt(pMVr)}</td>
                  <td style={{padding:"6px 10px",textAlign:"right",color:C.t3,fontSize:11}} colSpan={puedeVerEjecutado?2:1}>
                    {ajustado!=null&&<span style={{background:C.amber+"18",color:C.amber,borderRadius:5,padding:"1px 7px",fontSize:10,fontWeight:600}}>Ajustado: {fmt(ajustado)} (+{(infl*100).toFixed(1)}%)</span>}
                    {ajustado===null&&inflData&&<span style={{background:C.green+"18",color:C.green,borderRadius:5,padding:"1px 7px",fontSize:10,fontWeight:600}}>✓ Al día</span>}
                  </td>
                  {esAdmin&&<td style={{padding:"6px 10px"}} colSpan={puedeVerEjecutado?2:1}>
                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                      <button onClick={()=>deleteP(p.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:14,padding:"2px 6px"}}>×</button>
                    </div>
                  </td>}
                </tr>;
              })}
            </React.Fragment>;
          })}
        </tbody>
        <tfoot><tr style={{borderTop:`2px solid ${C.bd2}`,background:C.bg3}}>
          <td style={{padding:"10px",fontWeight:700,color:C.t}}>TOTAL</td>
          <td style={{padding:"10px",textAlign:"right",fontWeight:700,color:C.t}}>{fmt(totalPMV)}</td>
          {puedeVerEjecutado&&<td style={{padding:"10px",textAlign:"right",fontWeight:700,color:C.green}}>{fmt(totalEMV)}</td>}
          {puedeVerEjecutado&&<td style={{padding:"10px",textAlign:"right",fontWeight:700,color:totalPMV-totalEMV>=0?C.green:C.red}}>{fmt(totalPMV-totalEMV)}</td>}
          <td colSpan={puedeVerEjecutado?2:1}/>
        </tr></tfoot>
      </table>
    </Card>

    {/* Historial global: presupuesto inicial de obra vs actual */}
    {mostrarInicial&&<HistorialPresupuesto
      presupInicialObra={presupInicialObra} presup={presup}
      indiceAjuste={indiceAjuste} cacData={cacData} inflData={inflData}
      calcFactor={calcFactor} tcRef={tcRef} enUSD={enUSD} fmt={fmt}
      totalPMV={totalPMV} presupAjustado={presupAjustado} INDICES={INDICES}
    />}

    {/* Panel ajuste — debajo de la tabla */}
    <PanelAjuste
      indiceAjuste={indiceAjuste} inflData={inflData} cacData={cacData}
      tcOficial={tcOficial} obra={obra} presupBaseARS={presupBaseARS}
      presupAjustado={presupAjustado} ajusteAcum={ajusteAcum}
      calcAjusteGeneral={calcAjusteGeneral} showInfl={showInfl}
      handleShowInfl={handleShowInfl} fetchIPC={fetchIPC} fetchCAC={fetchCAC}
      setShowInfl={setShowInfl} INDICES={INDICES}
    />

    {modal&&<Modal title="Agregar presupuesto" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Categoría</div>
            <select style={SEL} value={draft.cat_id} onChange={e=>setDraft(d=>({...d,cat_id:e.target.value,sub_id:""}))}>
              {cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          <div>
            <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Subcategoría <span style={{color:C.t3,fontWeight:400}}>(opcional)</span></div>
            <select style={SEL} value={draft.sub_id} onChange={e=>setDraft(d=>({...d,sub_id:e.target.value}))}>
              <option value="">General (toda la categoría)</option>
              {(cats.find(c=>c.id===draft.cat_id)?.subs||[]).map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 90px",gap:8}}>
          <div>
            <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Monto</div>
            <input style={INP} type="number" placeholder="0" autoFocus value={draft.monto} onChange={e=>setDraft(d=>({...d,monto:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&save()}/>
          </div>
          <div>
            <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div>
            <select style={SEL} value={draft.moneda} onChange={e=>setDraft(d=>({...d,moneda:e.target.value}))}><option>ARS</option><option>USD</option></select>
          </div>
        </div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha del presupuesto</div>
          <input style={INP} type="date" value={draft.fecha} onChange={e=>setDraft(d=>({...d,fecha:e.target.value}))}/>
        </div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción (opcional)</div>
          <input style={INP} placeholder="Ej: Ampliación por cambio de materiales" value={draft.descripcion} onChange={e=>setDraft(d=>({...d,descripcion:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&save()}/>
        </div>
        <div style={{background:C.bg3,borderRadius:8,padding:"8px 12px",fontSize:11,color:C.t3}}>
          ℹ️ Se suma al presupuesto existente de la categoría. El historial queda guardado con fecha para ajuste por inflación.
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn primary onClick={save} loading={saving}>Agregar presupuesto</Btn>
          <Btn onClick={()=>setModal(false)}>Cancelar</Btn>
        </div>
      </div>
    </Modal>}
  </div>;
}

// ── FOTOS ─────────────────────────────────────────────────────────────────────
function FotosTab({obra,fotos,puedoCargar,esAdmin,user,toast,reload,obraEtapas}){
  const [modal,setModal]=useState(false);
  const [editFoto,setEditFoto]=useState(null);
  const [editDraft,setEditDraft]=useState({etapa:"",ambiente:"",titulo:""});
  const [editSaving,setEditSaving]=useState(false);
  const [draft,setDraft]=useState({titulo:"",fecha:todayISO(),etapa:"",ambiente:"",files:[],previews:[]});
  const [modoAgrup,setModoAgrup]=useState("ambiente");
  const [ordenLocal,setOrdenLocal]=useState({}); // {fotoId: orden}
  const [dragId,setDragId]=useState(null);
  const [dragOverId,setDragOverId]=useState(null);
  const [filtroG,setFiltroG]=useState("todas");
  const [saving,setSaving]=useState(false);
  const [lightboxIdx,setLightboxIdx]=useState(null);
  const [gestionModal,setGestionModal]=useState(false);
  const fileRef=useRef();
  const touchStartX=useRef(null);

  const etapasProy=(obraEtapas||[]).filter(x=>x.tipo==="etapa").map(x=>x.nombre);
  const ambientesProy=(obraEtapas||[]).filter(x=>x.tipo==="ambiente").map(x=>x.nombre);
  const etapasUsadas=[...new Set(fotos.map(f=>f.etapa).filter(Boolean))];
  const ambientesUsados=[...new Set(fotos.map(f=>f.ambiente).filter(Boolean))];
  const etapas=[...new Set([...etapasProy,...etapasUsadas])].sort();
  const ambientes=[...new Set([...ambientesProy,...ambientesUsados])].sort();
  const grupos=modoAgrup==="etapa"?etapas:ambientes;

  const filtradas=useMemo(()=>{
    if(filtroG==="todas")return fotos;
    if(filtroG==="sin_grupo")return fotos.filter(f=>!(modoAgrup==="etapa"?f.etapa:f.ambiente));
    return fotos.filter(f=>(modoAgrup==="etapa"?f.etapa:f.ambiente)===filtroG);
  },[fotos,filtroG,modoAgrup]);

  const lbFoto=lightboxIdx!=null?filtradas[lightboxIdx]:null;
  const lbPrev=()=>setLightboxIdx(i=>i>0?i-1:filtradas.length-1);
  const lbNext=()=>setLightboxIdx(i=>i<filtradas.length-1?i+1:0);
  const lbClose=()=>setLightboxIdx(null);

  useEffect(()=>{
    if(lightboxIdx===null)return;
    const h=e=>{if(e.key==="ArrowLeft")lbPrev();if(e.key==="ArrowRight")lbNext();if(e.key==="Escape")lbClose();};
    window.addEventListener("keydown",h);
    document.body.style.overflow="hidden";
    return()=>{window.removeEventListener("keydown",h);document.body.style.overflow="";};
  },[lightboxIdx,filtradas.length]);

  const handleFile=e=>{
    const files=Array.from(e.target.files);
    if(!files.length)return;
    const previews=files.map(f=>({file:f,preview:URL.createObjectURL(f),nombre:f.name}));
    setDraft(d=>({...d,files:previews}));
  };

  const save=async()=>{
    if(!draft.files.length||!draft.titulo.trim())return;
    setSaving(true);
    let errCount=0;
    for(let i=0;i<draft.files.length;i++){
      const{file,nombre}=draft.files[i];
      const ext=nombre.split(".").pop();
      const path=`${user.id}/${obra.id}/${Date.now()}_${i}.${ext}`;
      const{error:upErr}=await supabase.storage.from("obra-fotos").upload(path,file);
      if(upErr){errCount++;continue;}
      const{data:{publicUrl}}=supabase.storage.from("obra-fotos").getPublicUrl(path);
      const titulo=draft.files.length===1?draft.titulo.trim():`${draft.titulo.trim()} ${i+1}`;
      await supabase.from("fotos").insert({obra_id:obra.id,titulo,fecha:draft.fecha,etapa:draft.etapa||null,ambiente:draft.ambiente||null,storage_path:path,url:publicUrl,user_id:user.id,orden:i});
    }
    if(errCount)toast.error(`${errCount} foto(s) fallaron`);
    else toast.success(`${draft.files.length} foto${draft.files.length>1?"s":""} subida${draft.files.length>1?"s":""}`);
    await reload();
    setDraft({titulo:"",fecha:todayISO(),etapa:"",ambiente:"",files:[],previews:[]});
    setModal(false);setSaving(false);
  };

  const saveEdit=async()=>{
    if(!editFoto)return;setEditSaving(true);
    const{error}=await supabase.from("fotos").update({titulo:editDraft.titulo||editFoto.titulo,etapa:editDraft.etapa||null,ambiente:editDraft.ambiente||null}).eq("id",editFoto.id);
    if(error)toast.error("Error");else{toast.success("Actualizada");await reload();}
    setEditFoto(null);setEditSaving(false);
  };

  const deleteFoto=async(id,storagePath,e)=>{
    e.stopPropagation();
    if(storagePath)await supabase.storage.from("obra-fotos").remove([storagePath]);
    const{error}=await supabase.from("fotos").delete().eq("id",id);
    if(error)toast.error("Error");else{toast.success("Eliminada");await reload();}
  };

  const downloadFoto=async(f,e)=>{
    e&&e.stopPropagation();
    try{const res=await fetch(f.url);const blob=await res.blob();const ext=f.url.split(".").pop().split("?")[0]||"jpg";const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${f.titulo||"foto"}.${ext}`;a.click();}
    catch{toast.error("Error al descargar");}
  };

  // Orden local: override del campo orden de la DB
  const fotosOrdenadas=useMemo(()=>{
    return [...fotos].sort((a,b)=>{
      const oa=ordenLocal[a.id]??a.orden??0;
      const ob=ordenLocal[b.id]??b.orden??0;
      return oa-ob;
    });
  },[fotos,ordenLocal]);

  const seccionesAgrupadas=useMemo(()=>{
    const base=filtroG!=="todas"
      ?fotosOrdenadas.filter(f=>filtroG==="sin_grupo"?!(modoAgrup==="etapa"?f.etapa:f.ambiente):(modoAgrup==="etapa"?f.etapa:f.ambiente)===filtroG)
      :fotosOrdenadas;
    if(filtroG!=="todas")return [{grupo:filtroG==="sin_grupo"?"Sin clasificar":filtroG,fotos:base}];
    const mapa={};
    base.forEach(f=>{const k=(modoAgrup==="etapa"?f.etapa:f.ambiente)||"__sin__";if(!mapa[k])mapa[k]=[];mapa[k].push(f);});
    const secciones=grupos.map(g=>({grupo:g,fotos:mapa[g]||[]})).filter(s=>s.fotos.length>0);
    if(mapa["__sin__"]?.length)secciones.push({grupo:"Sin clasificar",fotos:mapa["__sin__"]});
    return secciones;
  },[fotosOrdenadas,filtroG,modoAgrup,grupos]);

  // Drag handlers
  const onDragStart=useCallback((id)=>setDragId(id),[]);
  const onDragOver=useCallback((e,id)=>{e.preventDefault();setDragOverId(id);},[]);
  const onDrop=useCallback(async(e,targetId,sectionFotos)=>{
    e.preventDefault();
    if(!dragId||dragId===targetId){setDragId(null);setDragOverId(null);return;}
    const ids=sectionFotos.map(f=>f.id);
    const fromIdx=ids.indexOf(dragId);
    const toIdx=ids.indexOf(targetId);
    if(fromIdx<0||toIdx<0){setDragId(null);setDragOverId(null);return;}
    const newIds=[...ids];
    newIds.splice(fromIdx,1);
    newIds.splice(toIdx,0,dragId);
    // Actualizar orden local inmediatamente
    const newOrden={...ordenLocal};
    newIds.forEach((id,i)=>{newOrden[id]=i;});
    setOrdenLocal(newOrden);
    setDragId(null);setDragOverId(null);
    // Persistir en DB
    await Promise.all(newIds.map((id,i)=>supabase.from("fotos").update({orden:i}).eq("id",id)));
  },[dragId,ordenLocal]);

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
      <div>
        <div style={{fontSize:16,fontWeight:700,color:C.t}}>Galeria de obra</div>
        <div style={{fontSize:12,color:C.t3}}>{fotos.length} foto{fotos.length!==1?"s":""} · {etapas.length} etapa{etapas.length!==1?"s":""} · {ambientes.length} ambiente{ambientes.length!==1?"s":""}</div>
      </div>
      <div style={{display:"flex",gap:8}}>
        {esAdmin&&<Btn small onClick={()=>setGestionModal(true)}>⚙ Etapas / Ambientes</Btn>}
        {puedoCargar&&<Btn primary onClick={()=>setModal(true)}>+ Subir foto</Btn>}
      </div>
    </div>

    <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
      <div style={{display:"flex",background:C.bg3,borderRadius:8,border:`1px solid ${C.bd2}`,padding:3}}>
        {[{v:"etapa",l:"Por etapa"},{v:"ambiente",l:"Por ambiente"}].map(o=><button key={o.v} onClick={()=>{setModoAgrup(o.v);setFiltroG("todas");}} style={{padding:"5px 14px",fontSize:12,border:"none",borderRadius:6,cursor:"pointer",background:modoAgrup===o.v?C.bg2:"transparent",color:modoAgrup===o.v?C.t:C.t3,fontWeight:modoAgrup===o.v?700:400,transition:"all .15s"}}>{o.l}</button>)}
      </div>
      <select style={{...SEL,width:"auto",fontSize:12}} value={filtroG} onChange={e=>setFiltroG(e.target.value)}>
        <option value="todas">Todos</option>
        {grupos.map(g=><option key={g} value={g}>{g}</option>)}
        {fotos.some(f=>!(modoAgrup==="etapa"?f.etapa:f.ambiente))&&<option value="sin_grupo">Sin clasificar</option>}
      </select>
    </div>

    {fotos.length===0&&<Card><div style={{textAlign:"center",padding:"48px 0",color:C.t3}}><div style={{fontSize:36,marginBottom:12}}>📷</div><div style={{fontSize:14,fontWeight:600,color:C.t2}}>Sin fotos todavía</div></div></Card>}

    {seccionesAgrupadas.map(({grupo,fotos:fs})=><div key={grupo} style={{marginBottom:28}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{height:1,width:16,background:C.bd2,flexShrink:0}}/>
        <span style={{fontSize:13,fontWeight:700,color:C.t2,whiteSpace:"nowrap"}}>{grupo}</span>
        <div style={{height:1,flex:1,background:C.bd2}}/>
        <span style={{fontSize:11,color:C.t3,flexShrink:0}}>{fs.length} foto{fs.length!==1?"s":""}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
        {fs.map(f=>{
          const globalIdx=fotosOrdenadas.indexOf(f);
          const isDragging=dragId===f.id;
          const isOver=dragOverId===f.id&&dragId!==f.id;
          const puedoEditarEsta=esAdmin||(puedoCargar&&f.user_id===user.id);
          return <div key={f.id} className="foto-card"
            draggable={puedoEditarEsta}
            onDragStart={()=>onDragStart(f.id)}
            onDragOver={e=>onDragOver(e,f.id)}
            onDrop={e=>onDrop(e,f.id,fs)}
            onDragEnd={()=>{setDragId(null);setDragOverId(null);}}
            onClick={()=>setLightboxIdx(globalIdx)}
            style={{borderRadius:12,overflow:"hidden",cursor:puedoEditarEsta?"grab":"pointer",background:"#000",border:`2px solid ${isOver?C.green:C.bd}`,position:"relative",aspectRatio:"4/3",transition:"transform .15s, box-shadow .15s, opacity .15s, border-color .15s",opacity:isDragging?.35:1,transform:isOver?"scale(1.03)":""}}>
            <img src={f.url} alt={f.titulo} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
            <div className="foto-overlay" style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.82) 0%,rgba(0,0,0,.1) 55%,transparent 100%)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"12px"}}>
              <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:2}}>{f.titulo}</div>
              <div style={{fontSize:10,color:"rgba(255,255,255,.65)"}}>{f.fecha}{f.etapa&&` · ${f.etapa}`}{f.ambiente&&` · ${f.ambiente}`}</div>
              <div style={{display:"flex",gap:5,marginTop:8}} onClick={e=>e.stopPropagation()}>
                <button onClick={e=>downloadFoto(f,e)} style={{background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.25)",borderRadius:5,padding:"4px 9px",cursor:"pointer",color:"#fff",fontSize:11}}>⬇</button>
                {puedoEditarEsta&&<><button onClick={e=>{e.stopPropagation();setEditFoto(f);setEditDraft({etapa:f.etapa||"",ambiente:f.ambiente||"",titulo:f.titulo||""});}} style={{background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.25)",borderRadius:5,padding:"4px 9px",cursor:"pointer",color:"#fff",fontSize:11}}>✎</button>
                <button onClick={e=>deleteFoto(f.id,f.storage_path,e)} style={{background:"rgba(180,40,40,.5)",border:"1px solid rgba(255,255,255,.2)",borderRadius:5,padding:"4px 9px",cursor:"pointer",color:"#fff",fontSize:11}}>×</button></>}
              </div>
            </div>
            {puedoEditarEsta&&<div style={{position:"absolute",top:8,left:8,background:"rgba(0,0,0,.4)",borderRadius:5,padding:"2px 5px",fontSize:10,color:"rgba(255,255,255,.5)",backdropFilter:"blur(4px)"}}>⠿</div>}
            {modoAgrup==="etapa"&&f.ambiente&&<div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.55)",borderRadius:20,padding:"2px 8px",fontSize:9,color:"#fff",fontWeight:600}}>{f.ambiente}</div>}
            {modoAgrup==="ambiente"&&f.etapa&&<div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,.55)",borderRadius:20,padding:"2px 8px",fontSize:9,color:"#fff",fontWeight:600}}>{f.etapa}</div>}
          </div>;
        })}
      </div>
    </div>)}

    {lbFoto&&createPortal(<div
      style={{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:9999,background:"#080c08",display:"flex",flexDirection:"column"}}
      onTouchStart={e=>{touchStartX.current=e.touches[0].clientX;}}
      onTouchEnd={e=>{if(touchStartX.current===null)return;const dx=e.changedTouches[0].clientX-touchStartX.current;if(dx>60)lbPrev();else if(dx<-60)lbNext();touchStartX.current=null;}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",background:"rgba(0,0,0,.6)",backdropFilter:"blur(12px)",flexShrink:0}}>
        <span style={{color:"rgba(255,255,255,.4)",fontSize:12}}>{lightboxIdx+1} / {filtradas.length}</span>
        <span style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,.9)"}}>{lbFoto.titulo}</span>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>downloadFoto(lbFoto)} style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:7,padding:"5px 14px",cursor:"pointer",color:"rgba(255,255,255,.8)",fontSize:12}}>⬇ Descargar</button>
          <button onClick={lbClose} style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:7,width:34,height:32,cursor:"pointer",color:"rgba(255,255,255,.7)",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
      </div>
      <div style={{flex:1,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",minHeight:0,overflow:"hidden"}}>
        <button onClick={lbPrev} style={{position:"absolute",left:16,zIndex:1,width:48,height:48,borderRadius:"50%",background:"rgba(0,0,0,.55)",border:"1px solid rgba(255,255,255,.2)",cursor:"pointer",color:"#fff",fontSize:26,display:"flex",alignItems:"center",justifyContent:"center"}}>&#8249;</button>
        <img src={lbFoto.url} alt={lbFoto.titulo} style={{maxWidth:"100%",maxHeight:"100%",objectFit:"contain",userSelect:"none",pointerEvents:"none"}}/>
        <button onClick={lbNext} style={{position:"absolute",right:16,zIndex:1,width:48,height:48,borderRadius:"50%",background:"rgba(0,0,0,.55)",border:"1px solid rgba(255,255,255,.2)",cursor:"pointer",color:"#fff",fontSize:26,display:"flex",alignItems:"center",justifyContent:"center"}}>&#8250;</button>
      </div>
      <div style={{background:"rgba(0,0,0,.6)",backdropFilter:"blur(12px)",padding:"10px 20px 16px",flexShrink:0}}>
        <div style={{display:"flex",gap:14,justifyContent:"center",fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:10}}>
          <span>📅 {lbFoto.fecha}</span>
          {lbFoto.etapa&&<span>🏗 {lbFoto.etapa}</span>}
          {lbFoto.ambiente&&<span>🏠 {lbFoto.ambiente}</span>}
        </div>
        <div style={{display:"flex",gap:5,justifyContent:"center",overflowX:"auto",paddingBottom:2}}>
          {filtradas.slice(Math.max(0,lightboxIdx-5),lightboxIdx+6).map(f=>{
            const idx=filtradas.indexOf(f);const active=idx===lightboxIdx;
            return <div key={f.id} onClick={()=>setLightboxIdx(idx)} style={{flexShrink:0,width:active?58:42,height:active?58:42,borderRadius:6,overflow:"hidden",border:`2px solid ${active?"#fff":"rgba(255,255,255,.15)"}`,cursor:"pointer",transition:"all .18s",opacity:active?1:.5}}>
              <img src={f.url} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>;
          })}
        </div>
        <div style={{textAlign:"center",marginTop:8,fontSize:10,color:"rgba(255,255,255,.2)"}}>← → teclado · swipe · ESC</div>
      </div>
    </div>, document.body)}

    {gestionModal&&<GestionEtapasModal obra={obra} obraEtapas={obraEtapas||[]} toast={toast} reload={reload} onClose={()=>setGestionModal(false)}/>}

    {editFoto&&<Modal title="Editar foto" onClose={()=>setEditFoto(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <img src={editFoto.url} alt="" style={{width:"100%",maxHeight:150,objectFit:"cover",borderRadius:8}}/>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Título</div><input style={INP} value={editDraft.titulo} onChange={e=>setEditDraft(d=>({...d,titulo:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Etapa</div>
          <select style={SEL} value={editDraft.etapa} onChange={e=>setEditDraft(d=>({...d,etapa:e.target.value}))}>
            <option value="">— Sin etapa —</option>
            {etapas.map(e=><option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Ambiente</div>
          <select style={SEL} value={editDraft.ambiente} onChange={e=>setEditDraft(d=>({...d,ambiente:e.target.value}))}>
            <option value="">— Sin ambiente —</option>
            {ambientes.map(a=><option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={saveEdit} loading={editSaving}>Guardar</Btn><Btn onClick={()=>setEditFoto(null)}>Cancelar</Btn></div>
      </div>
    </Modal>}

    {modal&&<Modal title="Subir fotos" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${draft.files.length?C.green:C.bd2}`,borderRadius:12,padding:"16px",textAlign:"center",cursor:"pointer",background:draft.files.length?C.limaBg:C.bg3,transition:"all .2s"}}>
          {draft.files.length===0&&<><div style={{fontSize:36,marginBottom:8}}>📷</div><div style={{fontSize:13,fontWeight:600,color:C.t2}}>Seleccionar fotos</div><div style={{fontSize:11,color:C.t3}}>Podés seleccionar varias a la vez · JPG, PNG, WEBP</div></>}
          {draft.files.length>0&&<>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",maxHeight:120,overflow:"hidden"}}>
              {draft.files.slice(0,8).map((p,i)=><img key={i} src={p.preview} alt="" style={{width:60,height:60,objectFit:"cover",borderRadius:6}}/>)}
              {draft.files.length>8&&<div style={{width:60,height:60,borderRadius:6,background:C.bg3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.t2}}>+{draft.files.length-8}</div>}
            </div>
            <div style={{fontSize:12,color:C.green,fontWeight:600,marginTop:8}}>✓ {draft.files.length} foto{draft.files.length>1?"s":""} seleccionada{draft.files.length>1?"s":""}</div>
          </>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handleFile}/>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Título base *</div>
          <input style={INP} placeholder="Ej: Losa planta baja" value={draft.titulo} onChange={e=>setDraft(d=>({...d,titulo:e.target.value}))}/>
          {draft.files.length>1&&<div style={{fontSize:10,color:C.t3,marginTop:3}}>Se numerarán automáticamente: "{draft.titulo||"Foto"} 1", "{draft.titulo||"Foto"} 2"...</div>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha</div><input style={INP} type="date" value={draft.fecha} onChange={e=>setDraft(d=>({...d,fecha:e.target.value}))}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Etapa</div>
            <select style={SEL} value={draft.etapa} onChange={e=>setDraft(d=>({...d,etapa:e.target.value}))}>
              <option value="">— Sin etapa —</option>
              {etapas.map(e=><option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Ambiente <span style={{color:C.t3,fontWeight:400}}>(opcional)</span></div>
          <select style={SEL} value={draft.ambiente} onChange={e=>setDraft(d=>({...d,ambiente:e.target.value}))}>
            <option value="">— Sin ambiente —</option>
            {ambientes.map(a=><option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        {saving&&<div style={{background:C.bg3,borderRadius:8,padding:"8px 12px",fontSize:12,color:C.t2}}>Subiendo fotos... por favor esperá.</div>}
        <div style={{display:"flex",gap:8}}><Btn primary onClick={save} disabled={!draft.files.length||!draft.titulo.trim()} loading={saving}>Subir {draft.files.length>1?`${draft.files.length} fotos`:"foto"}</Btn><Btn onClick={()=>setModal(false)}>Cancelar</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── GESTION ETAPAS/AMBIENTES ──────────────────────────────────────────────────
function GestionEtapasModal({obra,obraEtapas,toast,reload,onClose}){
  const [tab,setTab]=useState("etapa");
  const [nuevo,setNuevo]=useState("");
  const [saving,setSaving]=useState(false);
  const lista=obraEtapas.filter(x=>x.tipo===tab);

  const add=async()=>{
    const n=nuevo.trim();
    if(!n)return;
    if(obraEtapas.find(x=>x.tipo===tab&&x.nombre.toLowerCase()===n.toLowerCase()))return toast.error("Ya existe");
    setSaving(true);
    const{error}=await supabase.from("obra_etapas").insert({obra_id:obra.id,nombre:n,tipo:tab,orden:lista.length});
    if(error)toast.error("Error");else{toast.success("Agregado");setNuevo("");await reload();}
    setSaving(false);
  };

  const del=async(id)=>{
    const{error}=await supabase.from("obra_etapas").delete().eq("id",id);
    if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}
  };

  return <Modal title="Etapas y ambientes del proyecto" onClose={onClose}>
    <div style={{display:"flex",gap:0,marginBottom:16,background:C.bg3,borderRadius:8,padding:3}}>
      {[{v:"etapa",l:"Etapas 🏗️"},{v:"ambiente",l:"Ambientes 🏠"}].map(o=><button key={o.v} onClick={()=>setTab(o.v)} style={{flex:1,padding:"6px",fontSize:12,border:"none",borderRadius:6,cursor:"pointer",background:tab===o.v?C.bg2:"transparent",color:tab===o.v?C.t:C.t3,fontWeight:tab===o.v?700:400}}>{o.l}</button>)}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:14}}>
      <input style={{...INP,flex:1}} placeholder={`Nueva ${tab==="etapa"?"etapa":"ambiente"}...`} value={nuevo} onChange={e=>setNuevo(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}/>
      <Btn primary onClick={add} loading={saving}>+ Agregar</Btn>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:280,overflowY:"auto"}}>
      {lista.length===0&&<div style={{textAlign:"center",padding:"16px 0",color:C.t3,fontSize:12}}>No hay {tab==="etapa"?"etapas":"ambientes"} cargadas para este proyecto.</div>}
      {lista.map(x=><div key={x.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",background:C.bg3,borderRadius:8,border:`1px solid ${C.bd}`}}>
        <span style={{fontSize:13,color:C.t,fontWeight:500}}>{x.nombre}</span>
        <button onClick={()=>del(x.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:18,lineHeight:1}}>×</button>
      </div>)}
    </div>
    <div style={{marginTop:14,fontSize:11,color:C.t3,background:C.bg3,borderRadius:8,padding:"8px 12px"}}>
      Las {tab==="etapa"?"etapas":"ambientes"} eliminadas no afectan las fotos ya clasificadas.
    </div>
  </Modal>;
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

  return <Modal title={`💬 Notas — ${gasto.descripcion||"Gasto"}`} onClose={onClose} wide>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{maxHeight:260,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
        {visComments.length===0&&<div style={{textAlign:"center",padding:"20px 0",color:C.t3,fontSize:12}}>Sin notas todavía.</div>}
        {visComments.map(c=>(
          <div key={c.id} style={{background:c.visibilidad==="privado"?C.bg3:C.bg2,border:`1px solid ${c.visibilidad==="privado"?C.amber+"44":C.bd}`,borderRadius:10,padding:"10px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
              <div style={{fontSize:11,color:C.t3}}><span style={{fontWeight:600,color:C.t2}}>{c.autor}</span> · {c.created_at?.slice(0,10)}</div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                {c.visibilidad!=="publico"&&<Tag label={c.visibilidad==="privado"?"🔒":"👷"} color={c.visibilidad==="privado"?C.amber:C.blue}/>}
                {esAdmin&&<button onClick={()=>del(c.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:16}}>×</button>}
              </div>
            </div>
            <div style={{fontSize:13,color:C.t,lineHeight:1.5}}>{c.texto}</div>
          </div>
        ))}
      </div>
      <div>
        <textarea ref={textRef} style={{...INP,resize:"vertical",minHeight:70}} placeholder="Escribí una nota..." value={texto} onChange={e=>setTexto(e.target.value)}/>
      </div>
      {esAdmin&&<div style={{display:"flex",gap:6}}>
        {[{v:"publico",label:"🌐 Público"},{v:"solo_admin",label:"👷 Equipo"},{v:"privado",label:"🔒 Solo yo"}].map(o=>(
          <button key={o.v} onClick={()=>setVisib(o.v)} style={{padding:"5px 10px",fontSize:11,border:`1px solid ${visib===o.v?C.green:C.bd2}`,borderRadius:6,cursor:"pointer",background:visib===o.v?C.green+"18":"transparent",color:visib===o.v?(o.v==="privado"?C.amber:C.green):C.t2,fontWeight:visib===o.v?700:400}}>{o.label}</button>
        ))}
      </div>}
      <div style={{display:"flex",gap:8,marginTop:4}}>
        <Btn primary onClick={save} loading={saving} disabled={!texto.trim()}>Guardar nota</Btn>
        <Btn onClick={onClose}>Cerrar</Btn>
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
        <div style={{fontSize:16,fontWeight:700,color:C.t}}>Objetivos de Obra</div>
        <div style={{fontSize:12,color:C.t3}}>{completados}/{hitos.length} completados · {pct}% avanzado</div>
      </div>
      {esAdmin&&<Btn primary onClick={()=>setModal(true)}>+ Nuevo hito</Btn>}
    </div>

    {hitos.length>0&&<Card style={{marginBottom:16}}>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,fontWeight:600}}>Avance general de obra</div>
      <div style={{height:10,borderRadius:5,background:C.bg3,overflow:"hidden",marginBottom:6}}>
        <div style={{height:"100%",borderRadius:5,background:pct===100?C.green:C.lima,width:`${pct}%`,transition:"width .6s ease"}}/>
      </div>
      <div style={{fontSize:11,textAlign:"right",fontWeight:600,color:pct===100?C.green:C.t3}}>{pct}%{pct===100?" ✓ Completado":""}</div>
    </Card>}

    {hitos.length===0&&<Card><div style={{textAlign:"center",padding:"40px 0",color:C.t3}}>Sin objetivos todavía.</div></Card>}

    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {Object.entries(EC).map(([estado,ec])=>{
        const grupo=hitos.filter(h=>h.estado===estado);
        if(grupo.length===0)return null;
        return <div key={estado}>
          <div style={{fontSize:11,color:ec.color,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:6}}>{ec.dot} {ec.label} ({grupo.length})</div>
          {grupo.map(h=>(
            <Card key={h.id} style={{marginBottom:8,borderLeft:`3px solid ${ec.color}`,padding:"12px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.t,textDecoration:h.estado==="completado"?"line-through":"none"}}>{h.titulo}</div>
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
          ))}
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
  const presupCatARS=presup.reduce((s,p)=>s+(p.moneda==="USD"?p.monto*tcRef:p.monto),0);
  const presupBaseARS=presupCatARS>0?presupCatARS:presupTotalARS;
  const presupMV=enUSD?(tcRef>0?presupBaseARS/tcRef:0):presupBaseARS;
  const pct=presupMV>0?Math.min(Math.round((totalGastado/presupMV)*100),999):null;
  const completados=hitos.filter(h=>h.estado==="completado").length;
  const pctHitos=hitos.length>0?Math.round((completados/hitos.length)*100):0;
  const porCat=cats.map(c=>({...c,total:gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0)})).filter(c=>c.total>0).sort((a,b)=>b.total-a.total);

  return <div className="fu">
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
      <StatCard label={`Total gastado (${monedaVista})`} value={fmt(totalGastado)} color={C.green} icon="💸"/>
      {presupMV>0&&<StatCard label={`Presupuesto (${monedaVista})`} value={fmt(presupMV)} color={C.blue} icon="📐"/>}
      {pct!==null&&<StatCard label="Avance presupuesto" value={`${pct}%`} color={pct>100?C.red:pct>80?C.amber:C.green} icon="📊"/>}
      {hitos.length>0&&<StatCard label="Avance objetivos" value={`${pctHitos}%`} color={pctHitos===100?C.green:C.lima} icon="🏁"/>}
    </div>

    {presupMV>0&&<Card style={{marginBottom:14}}>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,fontWeight:600}}>Avance de presupuesto</div>
      <div style={{height:12,borderRadius:6,background:C.bg3,overflow:"hidden",marginBottom:6}}>
        <div style={{height:"100%",borderRadius:6,background:pct>100?C.red:pct>80?C.amber:C.green,width:`${Math.min(pct||0,100)}%`,transition:"width .6s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.t3}}>
        <span>Ejecutado: {fmt(totalGastado)}</span>
        <span style={{fontWeight:700,color:pct>100?C.red:C.green}}>{pct}%</span>
        <span>Presupuesto: {fmt(presupMV)}</span>
      </div>
    </Card>}

    <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
      <Card style={{flex:"2 1 280px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Gastos por categoría</div>
        {porCat.length===0&&<div style={{color:C.t3,fontSize:12,textAlign:"center",padding:"16px 0"}}>Sin gastos</div>}
        {porCat.map(c=>{const p=totalGastado>0?Math.round((c.total/totalGastado)*100):0;return <div key={c.id} style={{marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,color:C.t}}>{c.icon} {c.label}</span><span style={{fontSize:12,fontWeight:600,color:c.color||C.green}}>{fmt(c.total)} · {p}%</span></div>
          <div style={{height:5,borderRadius:3,background:C.bg3}}><div style={{height:"100%",borderRadius:3,background:c.color||C.green,width:`${p}%`,transition:"width .5s"}}/></div>
        </div>;})}
      </Card>

      {fotos.length>0&&<Card style={{flex:"1 1 200px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Última foto</div>
        <img src={fotos[0].url} alt={fotos[0].titulo} style={{width:"100%",borderRadius:10,objectFit:"cover",maxHeight:160}}/>
        <div style={{marginTop:8,fontSize:12,fontWeight:600,color:C.t}}>{fotos[0].titulo}</div>
        <div style={{fontSize:11,color:C.t3,marginTop:2}}>{fotos[0].fecha}</div>
      </Card>}
    </div>
  </div>;
}

// ── REPORTES ──────────────────────────────────────────────────────────────────
function ReportesTab({obra,gastos,presup,tcRef,cats,esAdmin,monedaVista}){
  const [vistaR,setVistaR]=useState("mensual");
  const enUSD=monedaVista==="USD";
  const conv=useCallback(g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef),[enUSD,tcRef]);
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);
  const totalGlobal=gastos.reduce((s,g)=>s+conv(g),0);

  const porMes=useMemo(()=>{
    const m={};
    gastos.forEach(g=>{const ym=g.fecha?.slice(0,7)||"";if(!m[ym])m[ym]={ym,total:0,count:0};m[ym].total+=conv(g);m[ym].count++;});
    return Object.values(m).sort((a,b)=>a.ym>b.ym?1:-1);
  },[gastos,conv]);

  const porAnio=useMemo(()=>{
    const a={};
    gastos.forEach(g=>{const y=g.fecha?.slice(0,4)||"";if(!a[y])a[y]={anio:y,total:0,count:0};a[y].total+=conv(g);a[y].count++;});
    return Object.values(a).sort((a,b)=>a.anio>b.anio?1:-1);
  },[gastos,conv]);

  const porCat=useMemo(()=>
    cats.map(c=>({...c,
      total:gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0),
      count:gastos.filter(g=>g.cat_id===c.id).length,
      presup:presup.filter(p=>p.cat_id===c.id).reduce((s,p)=>s+(p.moneda==="USD"?p.monto*tcRef:p.monto),0),
    })).filter(c=>c.total>0||c.presup>0).sort((a,b)=>b.total-a.total)
  ,[gastos,cats,conv,presup,tcRef]);

  const totalPresup=presup.reduce((s,p)=>s+(p.moneda==="USD"?p.monto*tcRef:p.monto),0);
  const pctAvance=totalPresup>0?Math.round((totalGlobal/totalPresup)*100):null;

  // Gráfico de línea para evolución mensual
  const LineChart=({data})=>{
    if(!data.length)return null;
    const W=560,PL=58,PR=16,PT=16,PB=32,H=140;
    const maxV=Math.max(...data.map(d=>d.total),1);
    const x=i=>PL+(i/(Math.max(data.length-1,1)))*(W-PL-PR);
    const y=v=>PT+(1-v/maxV)*(H-PT-PB);
    const pts=data.map((d,i)=>`${x(i)},${y(d.total)}`).join(" ");
    const area=`M${x(0)},${H-PB} ${data.map((d,i)=>`L${x(i)},${y(d.total)}`).join(" ")} L${x(data.length-1)},${H-PB} Z`;
    const ticks=[0,0.25,0.5,0.75,1].map(f=>({v:maxV*f,y:y(maxV*f)}));
    return <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
      {ticks.map((t,i)=><g key={i}>
        <line x1={PL} y1={t.y} x2={W-PR} y2={t.y} stroke={C.bd} strokeWidth=".6" strokeDasharray="3,3"/>
        <text x={PL-6} y={t.y+4} textAnchor="end" fill={C.t3} fontSize="9" fontFamily="sans-serif">
          {enUSD?`$${Math.round(t.v/1000)}k`:`$${(t.v/1000000).toFixed(1)}M`}
        </text>
      </g>)}
      <path d={area} fill={C.green} opacity=".08"/>
      <polyline points={pts} fill="none" stroke={C.green} strokeWidth="2" strokeLinejoin="round"/>
      {data.map((d,i)=><g key={i}>
        <circle cx={x(i)} cy={y(d.total)} r="3.5" fill={C.green} stroke="#fff" strokeWidth="1.5"/>
        {(i===0||i===data.length-1||data.length<=6)&&<text x={x(i)} y={H-PB+14} textAnchor="middle" fill={C.t3} fontSize="9" fontFamily="sans-serif">
          {d.ym?.slice(5,7)+"/"+d.ym?.slice(2,4)}
        </text>}
      </g>)}
    </svg>;
  };

  const VISTAS=[{v:"mensual",l:"Evolución mensual"},{v:"cat",l:"Por rubro"},{v:"anual",l:"Por año"}];

  return <div className="fu">
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,flexWrap:"wrap",gap:10}}>
      <div>
        <div style={{fontSize:17,fontWeight:700,color:C.t}}>{obra.nombre} — Reporte de obra</div>
        <div style={{fontSize:12,color:C.t3,marginTop:2}}>Generado el {new Date().toLocaleDateString("es-AR",{day:"2-digit",month:"long",year:"numeric"})} · {gastos.length} movimientos registrados</div>
      </div>
      <button onClick={()=>exportCSV(gastos.map(g=>{const cat=cats.find(c=>c.id===g.cat_id);const sub=cat?.subs?.find(s=>s.id===g.sub_id);return{Fecha:g.fecha,Rubro:cat?.label||"",Subrubro:sub?.label||"",Descripcion:g.descripcion||"",Monto:g.monto,Moneda:g.moneda,Monto_ARS:Math.round(toARS(g,tcRef))};}),`reporte_${obra.nombre.replace(/\s+/g,"_")}.csv`)} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:8,padding:"7px 14px",cursor:"pointer",color:C.t2,fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>⬇ Exportar CSV</button>
    </div>

    {/* KPIs siempre visibles */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:20}}>
      <div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:12,padding:"16px 18px"}}>
        <div style={{fontSize:10,color:C.t3,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>Total ejecutado</div>
        <div style={{fontSize:20,fontWeight:800,color:C.green}}>{fmt(totalGlobal)}</div>
        {totalPresup>0&&<div style={{fontSize:11,color:C.t3,marginTop:4}}>{pctAvance}% del presupuesto</div>}
      </div>
      {totalPresup>0&&<div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:12,padding:"16px 18px"}}>
        <div style={{fontSize:10,color:C.t3,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>Presupuestado</div>
        <div style={{fontSize:20,fontWeight:800,color:C.blue}}>{fmt(enUSD?totalPresup/tcRef:totalPresup)}</div>
        <div style={{fontSize:11,color:totalGlobal>totalPresup?C.red:C.green,marginTop:4}}>{fmt(enUSD?(totalPresup-totalGlobal)/tcRef:totalPresup-totalGlobal)} disponible</div>
      </div>}
      <div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:12,padding:"16px 18px"}}>
        <div style={{fontSize:10,color:C.t3,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>Promedio mensual</div>
        <div style={{fontSize:20,fontWeight:800,color:C.t}}>{porMes.length>0?fmt(totalGlobal/porMes.length):"—"}</div>
        <div style={{fontSize:11,color:C.t3,marginTop:4}}>en {porMes.length} {porMes.length===1?"mes":"meses"}</div>
      </div>
      <div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:12,padding:"16px 18px"}}>
        <div style={{fontSize:10,color:C.t3,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",marginBottom:6}}>Rubros activos</div>
        <div style={{fontSize:20,fontWeight:800,color:C.t}}>{porCat.filter(c=>c.total>0).length}</div>
        <div style={{fontSize:11,color:C.t3,marginTop:4}}>de {cats.length} categorías</div>
      </div>
    </div>

    {/* Navegación */}
    <div style={{display:"flex",gap:6,marginBottom:16,borderBottom:`1px solid ${C.bd}`,paddingBottom:0}}>
      {VISTAS.map(o=><button key={o.v} onClick={()=>setVistaR(o.v)} style={{padding:"8px 16px",fontSize:12,border:"none",borderBottom:vistaR===o.v?`2px solid ${C.green}`:"2px solid transparent",cursor:"pointer",background:"transparent",color:vistaR===o.v?C.green:C.t3,fontWeight:vistaR===o.v?700:400,whiteSpace:"nowrap",marginBottom:-1}}>{o.l}</button>)}
    </div>

    {/* EVOLUCIÓN MENSUAL */}
    {vistaR==="mensual"&&<>
      <Card style={{marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:14}}>Evolución del gasto mensual</div>
        <LineChart data={porMes}/>
      </Card>
      <Card>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
            <th style={{padding:"8px 12px",textAlign:"left",fontSize:11,color:C.t3,fontWeight:700}}>Período</th>
            <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>Movimientos</th>
            <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>Total del mes</th>
            <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>Acumulado</th>
          </tr></thead>
          <tbody>
            {porMes.map((m,i,arr)=>{
              const acum=arr.slice(0,i+1).reduce((s,x)=>s+x.total,0);
              const mesLabel=new Date(m.ym+"-15").toLocaleDateString("es-AR",{month:"long",year:"numeric"});
              return <tr key={m.ym} style={{borderBottom:`1px solid ${C.bd}`}}>
                <td style={{padding:"10px 12px",fontWeight:600,color:C.t,textTransform:"capitalize"}}>{mesLabel}</td>
                <td style={{padding:"10px 12px",textAlign:"right",color:C.t3}}>{m.count}</td>
                <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.green}}>{fmt(m.total)}</td>
                <td style={{padding:"10px 12px",textAlign:"right",color:C.t2}}>{fmt(acum)}</td>
              </tr>;
            })}
          </tbody>
          <tfoot><tr style={{borderTop:`2px solid ${C.bd2}`,background:C.bg3}}>
            <td style={{padding:"10px 12px",fontWeight:700,color:C.t}}>TOTAL</td>
            <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.t}}>{gastos.length}</td>
            <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.green}}>{fmt(totalGlobal)}</td>
            <td/>
          </tr></tfoot>
        </table>
      </Card>
    </>}

    {/* POR RUBRO */}
    {vistaR==="cat"&&<Card>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:14}}>Detalle por rubro de obra</div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
          <th style={{padding:"8px 12px",textAlign:"left",fontSize:11,color:C.t3,fontWeight:700}}>Rubro</th>
          <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>Movimientos</th>
          <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>Ejecutado</th>
          <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>% del total</th>
          <th style={{padding:"8px 12px",minWidth:120,fontSize:11,color:C.t3,fontWeight:700}}>Participación</th>
        </tr></thead>
        <tbody>
          {porCat.map(c=>{
            const p=totalGlobal>0?Math.round((c.total/totalGlobal)*100):0;
            return <tr key={c.id} style={{borderBottom:`1px solid ${C.bd}`}}>
              <td style={{padding:"10px 12px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:7,background:(c.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>{c.icon}</div>
                  <span style={{fontWeight:600,color:C.t}}>{c.label}</span>
                </div>
              </td>
              <td style={{padding:"10px 12px",textAlign:"right",color:C.t3}}>{c.count}</td>
              <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:c.color||C.green}}>{fmt(c.total)}</td>
              <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.t}}>{p}%</td>
              <td style={{padding:"10px 12px"}}>
                <div style={{height:6,borderRadius:3,background:C.bg3}}>
                  <div style={{height:"100%",borderRadius:3,background:c.color||C.green,width:`${p}%`}}/>
                </div>
              </td>
            </tr>;
          })}
        </tbody>
        <tfoot><tr style={{borderTop:`2px solid ${C.bd2}`,background:C.bg3}}>
          <td style={{padding:"10px 12px",fontWeight:700,color:C.t}}>TOTAL</td>
          <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.t}}>{gastos.length}</td>
          <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.green}}>{fmt(totalGlobal)}</td>
          <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.t}}>100%</td>
          <td/>
        </tr></tfoot>
      </table>
    </Card>}

    {/* POR AÑO */}
    {vistaR==="anual"&&<Card>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:14}}>Resumen anual</div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
          <th style={{padding:"8px 12px",textAlign:"left",fontSize:11,color:C.t3,fontWeight:700}}>Año</th>
          <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>Movimientos</th>
          <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>Total ejecutado</th>
          <th style={{padding:"8px 12px",textAlign:"right",fontSize:11,color:C.t3,fontWeight:700}}>Promedio mensual</th>
          <th style={{padding:"8px 12px",minWidth:120,fontSize:11,color:C.t3,fontWeight:700}}>Proporción</th>
        </tr></thead>
        <tbody>
          {porAnio.map(a=>{
            const meses=porMes.filter(m=>m.ym?.slice(0,4)===a.anio).length;
            const p=totalGlobal>0?Math.round((a.total/totalGlobal)*100):0;
            return <tr key={a.anio} style={{borderBottom:`1px solid ${C.bd}`}}>
              <td style={{padding:"10px 12px",fontWeight:700,color:C.t}}>{a.anio}</td>
              <td style={{padding:"10px 12px",textAlign:"right",color:C.t3}}>{a.count}</td>
              <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.blue}}>{fmt(a.total)}</td>
              <td style={{padding:"10px 12px",textAlign:"right",color:C.t2}}>{meses>0?fmt(a.total/meses):"—"}</td>
              <td style={{padding:"10px 12px"}}>
                <div style={{height:6,borderRadius:3,background:C.bg3,marginBottom:3}}>
                  <div style={{height:"100%",borderRadius:3,background:C.blue,width:`${p}%`}}/>
                </div>
                <span style={{fontSize:10,color:C.t3}}>{p}%</span>
              </td>
            </tr>;
          })}
        </tbody>
        <tfoot><tr style={{borderTop:`2px solid ${C.bd2}`,background:C.bg3}}>
          <td style={{padding:"10px 12px",fontWeight:700,color:C.t}}>TOTAL</td>
          <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.t}}>{gastos.length}</td>
          <td style={{padding:"10px 12px",textAlign:"right",fontWeight:700,color:C.blue}}>{fmt(totalGlobal)}</td>
          <td style={{padding:"10px 12px",textAlign:"right",color:C.t2}}>{porMes.length>0?fmt(totalGlobal/porMes.length):"—"}</td>
          <td/>
        </tr></tfoot>
      </table>
    </Card>}
  </div>;
}

// ── CATEGORIAS TAB ────────────────────────────────────────────────────────────
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

// ── ACCESOS TAB ───────────────────────────────────────────────────────────────
function AccesosTab({obra,partic,toast,reload}){
  const TABS_DISPONIBLES=[
    {id:"dashboard",label:"Dashboard",icon:"📊",desc:"Resumen general de la obra"},
    {id:"gastos",label:"Gastos",icon:"💸",desc:"Lista de gastos (solo los marcados como públicos)"},
    {id:"presupuesto",label:"Presupuesto",icon:"📐",desc:"Presupuesto por categoría y ajustes por índice"},
    {id:"fotos",label:"Fotos",icon:"📷",desc:"Galería de fotos de avance"},
    {id:"objetivos",label:"Objetivos",icon:"🏁",desc:"Hitos y avance de obra"},
    {id:"reportes",label:"Reportes",icon:"📈",desc:"Gráficos y reportes de gastos"},
    {id:"resumen",label:"Mi Resumen",icon:"📋",desc:"Vista simplificada del cliente"},
    {id:"ipc",label:"IPC",icon:"📉",desc:"Índice de inflación (INDEC)"},
    {id:"usd",label:"USD / Dólar",icon:"💵",desc:"Cotizaciones y evolución del dólar"},
    {id:"cac",label:"CAC",icon:"🏗️",desc:"Índice costo de construcción"},
  ];
  const DEFAULT=["dashboard","gastos","fotos","objetivos","reportes","resumen","ipc","usd","cac"];
  const clientes=partic.filter(p=>p.rol==="cliente");
  const [selId,setSelId]=useState(()=>clientes[0]?.id||null);
  useEffect(()=>{if(!clientes.find(c=>c.id===selId))setSelId(clientes[0]?.id||null);},[clientes.map(c=>c.id).join(",")]);
  const sel=clientes.find(c=>c.id===selId);
  const [tabs,setTabs]=useState(()=>sel?.tabs_permitidas||DEFAULT);
  const [verEj,setVerEj]=useState(()=>sel?.ve_ejecutado!==false);
  const [saving,setSaving]=useState(false);

  useEffect(()=>{if(sel){setTabs(sel.tabs_permitidas||DEFAULT);setVerEj(sel.ve_ejecutado!==false);}},[selId]);

  const toggle=id=>setTabs(prev=>prev.includes(id)?prev.filter(t=>t!==id):[...prev,id]);

  const save=async()=>{
    if(!sel)return;setSaving(true);
    const{error}=await supabase.from("participantes").update({tabs_permitidas:tabs,ve_ejecutado:verEj}).eq("id",sel.id);
    if(error)toast.error("Error: "+error.message);
    else{toast.success(`✓ Accesos de ${sel.nombre} guardados`);await reload();}
    setSaving(false);
  };

  const resetAll=()=>setTabs(DEFAULT);

  if(!clientes.length)return <div className="fu"><Card><div style={{textAlign:"center",padding:"30px 0",color:C.t3}}>No hay clientes en esta obra todavía. Invitá uno desde <b style={{color:C.t}}>Participantes</b>.</div></Card></div>;

  return <div className="fu">
    <div style={{marginBottom:18}}>
      <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>🔐 Control de accesos</div>
      <div style={{fontSize:12,color:C.t3}}>Configurá qué puede ver <b style={{color:C.lima}}>cada cliente</b> — cada uno tiene su propia configuración, no es global para la obra.</div>
    </div>

    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
      {clientes.map(c=><button key={c.id} onClick={()=>setSelId(c.id)} style={{padding:"8px 14px",borderRadius:20,border:`2px solid ${selId===c.id?C.green:C.bd2}`,background:selId===c.id?C.green+"14":"transparent",cursor:"pointer",fontSize:12,fontWeight:600,color:selId===c.id?C.green:C.t2}}>{c.nombre}</button>)}
    </div>

    {sel&&<>
      <Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:14,fontWeight:600}}>Solapas visibles para {sel.nombre}</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {TABS_DISPONIBLES.map(t=>{
            const activo=tabs.includes(t.id);
            return <div key={t.id} onClick={()=>toggle(t.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",borderRadius:10,border:`2px solid ${activo?C.green:C.bd}`,background:activo?C.green+"08":"transparent",cursor:"pointer",transition:"all .2s"}}>
              <div style={{width:36,height:36,borderRadius:9,background:activo?C.green+"18":C.bg3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{t.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:activo?C.t:C.t2}}>{t.label}</div>
                <div style={{fontSize:11,color:C.t3,marginTop:2}}>{t.desc}</div>
              </div>
              <div style={{flexShrink:0}}>
                <div style={{width:44,height:24,borderRadius:12,background:activo?C.green:C.bd2,position:"relative",transition:"background .2s"}}>
                  <div style={{position:"absolute",top:3,left:activo?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
                </div>
              </div>
            </div>;
          })}
        </div>
      </Card>

      {tabs.includes("presupuesto")&&<Card style={{marginBottom:14,borderColor:C.blue+"44"}}>
        <div onClick={()=>setVerEj(v=>!v)} style={{display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:C.t}}>📐 Ver montos ejecutados en Presupuesto</div>
            <div style={{fontSize:11,color:C.t3,marginTop:2}}>Si está apagado, {sel.nombre} ve el presupuesto y los ajustes por índice, pero no cuánto se gastó realmente.</div>
          </div>
          <div style={{width:44,height:24,borderRadius:12,background:verEj?C.green:C.bd2,position:"relative",transition:"background .2s",flexShrink:0}}>
            <div style={{position:"absolute",top:3,left:verEj?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
          </div>
        </div>
      </Card>}

      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
        <Btn primary onClick={save} loading={saving}>💾 Guardar accesos de {sel.nombre}</Btn>
        <Btn onClick={resetAll}>Restablecer</Btn>
        <span style={{fontSize:11,color:C.t3,marginLeft:4}}>{tabs.length} de {TABS_DISPONIBLES.length} solapas activas</span>
      </div>
    </>}

    <div style={{marginTop:16,background:C.bg3,border:`1px solid ${C.bd}`,borderRadius:10,padding:"12px 16px",fontSize:12,color:C.t3}}>
      ℹ️ Cada cliente tiene su propia configuración de accesos. Las solapas de administración (Categorías, Participantes, Accesos) nunca son visibles para clientes.
    </div>
  </div>;
}

// ── PARTICIPANTES ─────────────────────────────────────────────────────────────
function ParticipantesTab({obra,partic,toast,reload}){
  const [modal,setModal]=useState(false);const [draft,setDraft]=useState({email:"",nombre:"",rol:"cliente",puede_cargar:false});const [saving,setSaving]=useState(false);
  const save=async()=>{if(!draft.email.trim()||!draft.nombre.trim())return;setSaving(true);const{data:{session}}=await supabase.auth.getSession();if(!session){toast.error("Sesión inválida, volvé a loguearte");setSaving(false);return;}const{data,error}=await supabase.functions.invoke("invite-user",{body:{email:draft.email.trim(),nombre:draft.nombre.trim(),rol:draft.rol,puede_cargar:draft.rol!=="cliente"?true:draft.puede_cargar,obra_id:obra.id,obra_nombre:obra.nombre}});if(error||data?.error){let msg=data?.error||error?.message||"Error desconocido";if(error?.context?.json){try{const body=await error.context.json();if(body?.error)msg=body.error;}catch{}}toast.error("Error: "+msg);setSaving(false);return;}toast.success(`Invitación enviada a ${draft.email}`);setDraft({email:"",nombre:"",rol:"cliente",puede_cargar:false});setModal(false);await reload();setSaving(false);};
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

// ── CAC TAB ───────────────────────────────────────────────────────────────────
function CACTab({cacData,fetchCAC,esAdmin,toast,refreshCAC}){
  useEffect(()=>{fetchCAC();},[]);
  const CAC_COLOR="#5A3E1B";
  const hoy=new Date();
  const [draft,setDraft]=useState({fecha:"",valor:""});
  const [saving,setSaving]=useState(false);
  const [editId,setEditId]=useState(null);

  // Próximo mes a cargar (el siguiente al último dato)
  const proximoMes=useMemo(()=>{
    if(!cacData?.length)return "";
    const last=[...cacData].sort((a,b)=>a.fecha>b.fecha?1:-1).pop();
    const[y,m]=last.fecha.split("-").map(Number);
    const next=new Date(y,m,1);
    return next.getFullYear()+"-"+String(next.getMonth()+1).padStart(2,"0");
  },[cacData]);

  useEffect(()=>{if(proximoMes)setDraft(d=>({...d,fecha:proximoMes}));},[proximoMes]);

  const saveNuevo=async()=>{
    const v=parseFloat(draft.valor);
    if(!draft.fecha||isNaN(v)||v<0||v>100)return toast.error("Fecha y valor (0-100) requeridos");
    setSaving(true);
    const{error}=await supabase.from("cac_historico").upsert({fecha:draft.fecha.slice(0,7),valor:v},{onConflict:"fecha"});
    if(error)toast.error("Error: "+error.message);
    else{toast.success(`CAC ${draft.fecha.slice(0,7)} guardado (${v}%)`);setDraft(d=>({...d,valor:""}));await refreshCAC();}
    setSaving(false);
  };

  const deleteCAC=async(fecha)=>{
    const{error}=await supabase.from("cac_historico").delete().eq("fecha",fecha);
    if(error)toast.error("Error");else{toast.success("Eliminado");await refreshCAC();}
  };

  const serie24=[];
  for(let i=23;i>=0;i--){
    const d=new Date(hoy.getFullYear(),hoy.getMonth()-i,1);
    const ym=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");
    const f=cacData?.find(x=>x.fecha.slice(0,7)===ym);
    if(f)serie24.push(f);
  }
  const last=serie24[serie24.length-1];
  const acumAnio=cacData?.filter(x=>x.fecha.slice(0,4)===String(hoy.getFullYear())).reduce((s,x)=>s*(1+x.valor/100),1);
  const acumAnioP=acumAnio?+(((acumAnio-1)*100).toFixed(1)):null;
  const acum12=serie24.slice(-12).reduce((s,x)=>s*(1+x.valor/100),1);
  const acum12p=+(((acum12-1)*100).toFixed(1));
  const W=500,PL=36,PR=12,PT=20,PB=28,cH=100,H=PT+cH+PB;
  const maxV=Math.max(...serie24.map(x=>x.valor),1);
  const porAnio={};
  cacData?.forEach(x=>{const y=x.fecha.slice(0,4);if(!porAnio[y])porAnio[y]=[];porAnio[y].push(x.valor);});
  const acumAnios=Object.entries(porAnio).map(([y,v])=>({anio:y,pct:+(((v.reduce((f,x)=>f*(1+x/100),1)-1)*100).toFixed(1))})).sort((a,b)=>a.anio>b.anio?1:-1);

  return <div className="fu">
    <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>🏗️ Índice CAC — Costo de la Construcción</div>
    <div style={{fontSize:12,color:C.t3,marginBottom:6}}>Cámara Argentina de la Construcción · Variación % mensual</div>
    <div style={{fontSize:11,color:C.t3,marginBottom:16,background:C.bg3,borderRadius:8,padding:"8px 12px",border:`1px solid ${C.bd}`}}>
      El CAC mide la variación del costo de un edificio tipo en CABA, combinando <b style={{color:C.t}}>materiales</b> y <b style={{color:C.t}}>mano de obra</b> (UOCRA). Es el índice estándar para ajustar presupuestos de obra en Argentina.
    </div>

    {/* Panel de carga — solo arquitecto */}
    {esAdmin&&<Card style={{marginBottom:16,border:`2px solid ${CAC_COLOR}33`,background:CAC_COLOR+"06"}}>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
        <span>📥</span> Cargar nuevo dato mensual CAC
        <span style={{fontSize:11,color:C.t3,fontWeight:400}}>· Publicado por Camarco cada mes</span>
      </div>
      <div style={{display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Año</div>
          <select style={{...SEL,width:90}} value={draft.fecha.slice(0,4)} onChange={e=>{const m=draft.fecha.slice(5,7)||"01";setDraft(d=>({...d,fecha:`${e.target.value}-${m}`}));}}>
            {[2022,2023,2024,2025,2026,2027].map(y=><option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Mes</div>
          <select style={{...SEL,width:120}} value={draft.fecha.slice(5,7)} onChange={e=>{const y=draft.fecha.slice(0,4)||"2026";setDraft(d=>({...d,fecha:`${y}-${e.target.value}`}));}}>
            {[["01","Enero"],["02","Febrero"],["03","Marzo"],["04","Abril"],["05","Mayo"],["06","Junio"],["07","Julio"],["08","Agosto"],["09","Septiembre"],["10","Octubre"],["11","Noviembre"],["12","Diciembre"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Variación % mensual</div>
          <input style={{...INP,width:110}} type="number" step="0.1" min="0" max="100" placeholder="Ej: 2.1" value={draft.valor} onChange={e=>setDraft(d=>({...d,valor:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&saveNuevo()}/>
        </div>
        <Btn primary onClick={saveNuevo} loading={saving}>Guardar</Btn>
      </div>
      {proximoMes&&<div style={{marginTop:10,fontSize:11,color:CAC_COLOR,fontWeight:600}}>
        Próximo mes a cargar: <b>{proximoMes}</b> · Verificá el dato en <a href="https://www.camarco.org.ar" target="_blank" rel="noreferrer" style={{color:CAC_COLOR}}>camarco.org.ar</a>
      </div>}
    </Card>}

    {!cacData&&<Card><div style={{textAlign:"center",padding:"32px 0",color:C.t3}}>Cargando datos CAC...</div></Card>}
    {cacData&&<>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
        <StatCard label="Último mes" value={last?`${last.valor}%`:"—"} color={CAC_COLOR} icon="📅" sub={last?.fecha?.slice(0,7)}/>
        <StatCard label="Acum. 12 meses" value={`${acum12p}%`} color={CAC_COLOR} icon="📈"/>
        {acumAnioP!==null&&<StatCard label={`Acum. ${hoy.getFullYear()}`} value={`${acumAnioP}%`} color={C.blue} icon="📆"/>}
      </div>

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
        {acumAnios.slice(-6).map(a=><div key={a.anio} style={{flex:"1 1 80px",background:C.bg2,border:`1px solid ${CAC_COLOR}33`,borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
          <div style={{fontSize:11,color:C.t3,marginBottom:4,fontWeight:600}}>{a.anio}</div>
          <div style={{fontSize:18,fontWeight:700,color:a.pct>50?C.red:a.pct>20?C.amber:CAC_COLOR}}>{a.pct}%</div>
          <div style={{fontSize:10,color:C.t3}}>acumulado</div>
        </div>)}
      </div>

      <Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Variación mensual CAC — últimos 24 meses</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          {[2,4,6,8,10].map(v=>{const y=PT+(1-v/maxV)*cH;return <line key={v} x1={PL} y1={y} x2={W-PR} y2={y} stroke={C.bd} strokeWidth=".5"/>;})}
          {serie24.map((d,i)=>{
            const bW=Math.max(6,(W-PL-PR)/serie24.length-3);
            const x=PL+(i/serie24.length)*(W-PL-PR)+(W-PL-PR)/serie24.length/2-bW/2;
            const bH=Math.max(2,(d.valor/maxV)*cH);
            const col=d.valor>10?C.red:d.valor>5?C.amber:CAC_COLOR;
            const show=i===0||i===serie24.length-1||i%4===0;
            return <g key={i}>
              <rect x={x} y={PT+cH-bH} width={bW} height={bH} rx="2" fill={col} opacity=".85"/>
              {show&&<text x={x+bW/2} y={H-4} textAnchor="middle" fill={C.t3} fontSize="7" fontFamily="sans-serif">{d.fecha.slice(2,7)}</text>}
            </g>;
          })}
        </svg>
      </Card>

      <Card style={{padding:0,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
            {["Mes","CAC %","Barra","Acum. 12m",esAdmin?"":""].filter(Boolean).map((h,i)=><th key={i} style={{padding:"8px 12px",textAlign:i>=1?"right":"left",color:C.t3,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[...serie24].reverse().map((d,i,arr)=>{
              const slice=arr.slice(i).reverse();
              const a12=slice.slice(-12).reduce((s,x)=>s*(1+x.valor/100),1);
              return <tr key={d.fecha} style={{borderBottom:`1px solid ${C.bd}`}}>
                <td style={{padding:"8px 12px",color:C.t2,fontWeight:500}}>{d.fecha.slice(0,7)}</td>
                <td style={{padding:"8px 12px",textAlign:"right",fontWeight:700,color:d.valor>10?C.red:d.valor>5?C.amber:CAC_COLOR}}>{d.valor?.toFixed(1)}%</td>
                <td style={{padding:"8px 12px",textAlign:"right"}}>
                  <div style={{width:80,height:5,background:C.bg3,borderRadius:2,marginLeft:"auto"}}>
                    <div style={{height:"100%",borderRadius:2,background:d.valor>10?C.red:d.valor>5?C.amber:CAC_COLOR,width:`${Math.min((d.valor/15)*100,100)}%`}}/>
                  </div>
                </td>
                <td style={{padding:"8px 12px",textAlign:"right",color:CAC_COLOR,fontWeight:600}}>{+(((a12-1)*100).toFixed(1))}%</td>
                {esAdmin&&<td style={{padding:"8px 12px",textAlign:"right"}}>
                  <button onClick={()=>deleteCAC(d.fecha)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:14,padding:"2px 6px"}}>×</button>
                </td>}
              </tr>;
            })}
          </tbody>
        </table>
      </Card>
    </>}
  </div>;
}

// ── IPC TAB ───────────────────────────────────────────────────────────────────
function IPCTab({inflData}){
  const u24=inflData?inflData.filter(x=>x.fecha>=(new Date().getFullYear()-1)+"-01").reduce((s,x)=>s+x.valor,0).toFixed(1):null;
  const last=inflData?.[inflData.length-1];
  const hoy=new Date();
  const serie12=[];
  for(let i=11;i>=0;i--){const d=new Date(hoy.getFullYear(),hoy.getMonth()-i,1);const ym=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");const f=inflData?.find(x=>x.fecha.slice(0,7)===ym);if(f)serie12.push(f);}

  const W=500,PL=36,PR=12,PT=20,PB=28,cH=100,H=PT+cH+PB;
  const maxV=Math.max(...serie12.map(x=>x.valor),1);
  const bW=Math.max(6,Math.floor((W-PL-PR)/serie12.length)-3);

  return <div className="fu">
    <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>📉 Inflación IPC (INDEC)</div>
    <div style={{fontSize:12,color:C.t3,marginBottom:16}}>argentinadatos.com</div>
    {!inflData&&<Card><div style={{textAlign:"center",padding:"32px 0",color:C.t3}}>Cargando datos IPC...</div></Card>}
    {inflData&&<>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
        <StatCard label="Último mes" value={last?`${last.valor}%`:"—"} color={C.amber} icon="📅" sub={last?.fecha?.slice(0,7)}/>
        <StatCard label="Acum. últimos 12m" value={u24?`${u24}%`:"—"} color={C.red} icon="📈"/>
      </div>
      <Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Inflación mensual (últimos 12 meses)</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          {[2,4,6,8,10].map(v=>{const y=PT+(1-v/maxV)*cH;return <line key={v} x1={PL} y1={y} x2={W-PR} y2={y} stroke={C.bd} strokeWidth=".5"/>;})}
          {serie12.map((d,i)=>{
            const x=PL+(i*(W-PL-PR)/serie12.length)+(W-PL-PR)/serie12.length/2-bW/2;
            const bH=Math.max(2,(d.valor/maxV)*cH);
            return <g key={i}>
              <rect x={x} y={PT+cH-bH} width={bW} height={bH} rx={2} fill={d.valor>6?C.red:d.valor>4?C.amber:C.green} opacity={.85}/>
              {serie12.length<=14&&<text x={x+bW/2} y={H-4} textAnchor="middle" fill={C.t3} fontSize="7" fontFamily="sans-serif">{d.fecha.slice(5,7)}/{d.fecha.slice(2,4)}</text>}
            </g>;
          })}
        </svg>
      </Card>
      <Card style={{padding:0,overflow:"hidden"}}>
        {[...inflData].reverse().slice(0,24).map(x=><div key={x.fecha} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 16px",borderBottom:`1px solid ${C.bd}`}}>
          <span style={{fontSize:12,color:C.t2}}>{x.fecha?.slice(0,7)}</span>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:80,height:4,borderRadius:2,background:C.bg3}}>
              <div style={{height:"100%",borderRadius:2,background:x.valor>6?C.red:x.valor>4?C.amber:C.green,width:`${Math.min((x.valor/15)*100,100)}%`}}/>
            </div>
            <span style={{fontSize:13,fontWeight:700,color:x.valor>6?C.red:x.valor>4?C.amber:C.green,minWidth:44,textAlign:"right"}}>{x.valor?.toFixed(1)}%</span>
          </div>
        </div>)}
      </Card>
    </>}
  </div>;
}

// ── USD TAB ───────────────────────────────────────────────────────────────────
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
  const maxBl=Math.max(...br.map(b=>b.bl||0),1);

  return <div className="fu">
    <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>💵 Dólar & Tipo de Cambio</div>
    <div style={{fontSize:12,color:C.t3,marginBottom:16}}>dolarapi.com & argentinadatos.com</div>
    {!tcHistData&&<Card><div style={{textAlign:"center",padding:"32px 0",color:C.t3}}>Cargando cotizaciones...</div></Card>}
    {tcHistData&&<>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
        <StatCard label="Oficial hoy" value={tcOficial?("$"+tcOficial.toLocaleString("es-AR")):last?.of?("$"+last.of.toLocaleString("es-AR")):"—"} color={C.green} icon="🏛️"/>
        <StatCard label="Blue hoy" value={tcBlue?("$"+tcBlue.toLocaleString("es-AR")):last?.bl?("$"+last.bl.toLocaleString("es-AR")):"—"} color={C.lima} icon="💵"/>
        <StatCard label="Brecha" value={last?.gap!=null?(last.gap+"%"):"—"} color={brechaColor} icon="📊"/>
        <StatCard label="IPC último mes" value={last?.ipc!=null?(last.ipc+"%"):"—"} color={C.amber} icon="📉"/>
      </div>
      <Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Evolución dólar (24 meses)</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          {[25,50,75,100].map(p=>{const v=maxBl*(p/100);const y=PT+(1-p/100)*cH;return <g key={p}><line x1={PL} y1={y} x2={W-PR} y2={y} stroke={C.bd} strokeWidth=".5"/><text x={PL-4} y={y+4} textAnchor="end" fill={C.t3} fontSize="8" fontFamily="sans-serif">{Math.round(v/1000)}k</text></g>;})}
          {br.length>1&&<>
            <polyline points={br.map((b,i)=>b.of?`${PL+(i/(br.length-1))*(W-PL-PR)},${PT+(1-b.of/maxBl)*cH}`:null).filter(Boolean).join(" ")} fill="none" stroke={C.green} strokeWidth="1.5" strokeLinejoin="round"/>
            <polyline points={br.map((b,i)=>b.bl?`${PL+(i/(br.length-1))*(W-PL-PR)},${PT+(1-b.bl/maxBl)*cH}`:null).filter(Boolean).join(" ")} fill="none" stroke={C.lima} strokeWidth="1.5" strokeLinejoin="round"/>
          </>}
          {br.map((b,i)=>b.label&&br.length<=14?<text key={i} x={PL+(i/(br.length-1))*(W-PL-PR)} y={H-4} textAnchor="middle" fill={C.t3} fontSize="8" fontFamily="sans-serif">{b.label}</text>:null)}
        </svg>
        <div style={{display:"flex",gap:14,fontSize:11,color:C.t2,marginTop:6}}>
          <span><span style={{display:"inline-block",width:14,height:2,background:C.green,borderRadius:2,marginRight:5,verticalAlign:"middle"}}/>Oficial</span>
          <span><span style={{display:"inline-block",width:14,height:2,background:C.lima,borderRadius:2,marginRight:5,verticalAlign:"middle"}}/>Blue</span>
        </div>
      </Card>
      <Card style={{padding:0,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>{["Mes","Oficial","Blue","Brecha","IPC"].map((h,i)=><th key={i} style={{padding:"8px 12px",textAlign:i===0?"left":"right",color:C.t3,fontWeight:600,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>{[...br].reverse().slice(0,18).map(b=><tr key={b.ym} style={{borderBottom:`1px solid ${C.bd}`}}>
            <td style={{padding:"8px 12px",color:C.t2,fontWeight:500}}>{b.label}</td>
            <td style={{padding:"8px 12px",textAlign:"right",color:C.green,fontWeight:600}}>{b.of?`$${b.of.toLocaleString("es-AR")}`:"—"}</td>
            <td style={{padding:"8px 12px",textAlign:"right",color:C.lima,fontWeight:600}}>{b.bl?`$${b.bl.toLocaleString("es-AR")}`:"—"}</td>
            <td style={{padding:"8px 12px",textAlign:"right",fontWeight:700,color:b.gap>100?C.red:b.gap>50?C.amber:C.green}}>{b.gap!=null?`${b.gap}%`:"—"}</td>
            <td style={{padding:"8px 12px",textAlign:"right",color:C.amber,fontWeight:600}}>{b.ipc!=null?`${b.ipc}%`:"—"}</td>
          </tr>)}
          </tbody>
        </table>
      </Card>
    </>}
  </div>;
}
