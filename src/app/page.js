"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const LOGO_IMG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGgcAigAYkZCTUQwYTAwMGFlNzAxMDAwMDY3MDMwMDAwOGYwNTAwMDBlMjA1MDAwMDJmMDYwMDAwMDYwYTAwMDBhMjBkMDAwMGZiMGQwMDAwNzAwZTAwMDBiMjBlMDAwMDViMTIwMDAwAP/bAIQABQYGCwgLCwsLCw0LCwsNDg4NDQ4ODw0ODg4NDxAQEBEREBAQEA8TEhMPEBETFBQTERMWFhYTFhUVFhkWGRYWEgEFBQUKBwoICQkICwgKCAsKCgkJCgoMCQoJCgkMDQsKCwsKCw0MCwsICwsMDAwNDQwMDQoLCg0MDQ0MExQTExOc/8IAEQgAlgCWAwEiAAIRAQMRAf/EALIAAQABBQEAAAAAAAAAAAAAAAAHAQMEBQYCEAABBAAFAAcGAwkAAAAAAAADAAECBBESExQVBRAgYoGR4SUxQVBxkkBCUiMkMDRRYaKj8BEAAQIBBggLBwQDAAAAAAAAAQACEQMSITGRoTIzNEFRYdHSBBATIkJxgaKxweEgI1JicpPwQ1CS8xQwshIAAQMBBwQDAQEBAAAAAAAAAQARITFBUWFxgZHwECCh8bHB0TBQ4f/aAAwDAQACAAMAAAABmUAAAAAAAACGplhomWlcAznNqU6RzesO3RdSlJSRd1Va9Qx8itQAAENTLDRMuq2urU0RTzSus2WsNQ8qU9dRyvV1r0921aMlzNu1Y6qmjzfdzPvarYevWRDUyw169zLg52DRznJ9byFPPp5Up1mwwM/16A3Vu7apTTeNwt2dVl6vxbtbzYaXdXsi9DUyw1cuzLgZ+FRzfI9rzdPOubEWvfpR5rVVIfj3r6UvtQtWLfi8t2szdafcZGTehqZYauXplwc7BNDzvRc5581UFVBVSpIeDnYHnzgPCxi+3mhsdtptxfyb0NTLDVy7MoOXyOYkalNPuIx7gZcdSccxvsHVnV+o2kQ8X45yzvMTlOmNhWOJGKw1MsNVrMoI2kfVeKU5vO6vDOJ6rc6g53eMo0mJ3WvOIvdhlHBSHY15zvecZdOvhqU4srWZQAAAAAAAKVFIbmWGiZUNCZUNCZUNCZUNCZUNCZUNCZUNCZUNCZUNCZYaD//aAAgBAQABBQL50YMStx4lx4lx4lY6LaTcOVcOVcOVN0cNDg0G/g2ICk2hTWhTWhTR6NUq4iuuIrriK6avTZBaDRebMtSK1IrUitSK1Ipnx67ExRbXprcU1uKasbEzbOgtlQWyoJjU2QXg8ZyHjIVd30K6HEEFnEs4lB2duoxoiY9yvOPs1ezV7NQLdaEd+Jb8S34kObTaRWipRC76YFAwBreCTWoOoyzdZi6bHuwybygt5QW8oKvdHk3q3q3qHPO0iYLWWsnOBa9dBNBRfHrNOUGNcnCPLgXLgXLgTdPQZc/Bc/Bc/BCnnjKcmWpNak09uK3kEKxmUXx6yvNkU9gceWMuWMuWMuWMuWMuWMuWMhSeUTmnB92Rbsi3c1u5oZiTUcesspsi2TjjzJFzJFzJFzJFzJFzJFzJEGTyiaZYvq2Fq2Fq2Fq2EORpKOPWbUwLO1CO/uLf3Fv7i39xb+4t/cW/uILyeJyEi+4Otwdbg63B0OZpKOPYsXtGc7M4KtbHYZAsxM5iacS3JjiEsSxx6tSKZ8erWhj2ekP5pXG29u2XSGMexsu2KvTaAeiBOOv0iSeaEmm0RRleALTt2jOQ+2HgCb1bPY6Rf96U47uwdtwbpOj+yq2mKGRR2XldhkHSnp9Dldo5M98JXplvNoWWlimHr2+wSmIj7ESaLM0K0IPKLSbYhwpackage-lock.json";

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

// ── COMPONENTES BASE ──────────────────────────────────────────────────────────
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
function Modal({title,onClose,children,wide}){
  useEffect(()=>{
    const h=e=>{if(e.key==="Escape")onClose();};
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[onClose]);
  return <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:"fixed",inset:0,background:"rgba(10,30,5,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}>
    <div onClick={e=>e.stopPropagation()} style={{background:C.bg2,border:`1px solid ${C.bd2}`,borderRadius:16,width:"100%",maxWidth:wide?720:480,maxHeight:"calc(100vh - 32px)",display:"flex",flexDirection:"column",boxShadow:"0 8px 32px rgba(0,0,0,.18)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",borderBottom:`1px solid ${C.bd}`,flexShrink:0}}>
        <span style={{fontWeight:700,fontSize:15,color:C.t}}>{title}</span>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:24,lineHeight:1,padding:"0 4px"}}>×</button>
      </div>
      <div style={{overflowY:"auto",padding:"16px 20px 20px",flex:1}}>
        {children}
      </div>
    </div>
  </div>;
}
function Donut({data,size=120}){const total=data.reduce((s,x)=>s+x.val,0);if(!total)return <div style={{width:size,height:size,borderRadius:"50%",background:C.bg3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:C.t3}}>Sin datos</div>;let ang=-Math.PI/2;const r=size/2,ir=r*.58,cx=r,cy=r;return <svg width={size} height={size}>{data.map((d,i)=>{const a=(d.val/total)*2*Math.PI;const x1=cx+r*Math.cos(ang),y1=cy+r*Math.sin(ang);ang+=a;const x2=cx+r*Math.cos(ang),y2=cy+r*Math.sin(ang);const ix1=cx+ir*Math.cos(ang-a),iy1=cy+ir*Math.sin(ang-a);const ix2=cx+ir*Math.cos(ang),iy2=cy+ir*Math.sin(ang);return <path key={i} d={`M${x1},${y1} A${r},${r},0,${a>Math.PI?1:0},1,${x2},${y2} L${ix2},${iy2} A${ir},${ir},0,${a>Math.PI?1:0},0,${ix1},${iy1} Z`} fill={d.color} opacity={.88}/>;})}<circle cx={cx} cy={cy} r={ir-2} fill={C.bg2}/></svg>;}

// ── PDF EXPORT ────────────────────────────────────────────────────────────────
async function generarPDFInforme({obra,gastos,fotos,hitos,cats,presup,tcRef,monedaVista,partic}){
  const enUSD=monedaVista==="USD";
  const conv=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);
  const totalGastos=gastos.reduce((s,g)=>s+conv(g),0);
  const totalPresupCats=presup.reduce((s,p)=>s+(p.moneda==="USD"?p.monto*(enUSD?1:tcRef):enUSD?p.monto/tcRef:p.monto),0);
  const presupTotal=totalPresupCats>0?totalPresupCats:(obra.presupuesto_total?(obra.moneda_presupuesto==="USD"?obra.presupuesto_total*(enUSD?1:tcRef):enUSD?obra.presupuesto_total/tcRef:obra.presupuesto_total):0);
  const pct=presupTotal>0?Math.min(Math.round((totalGastos/presupTotal)*100),200):null;
  const hitosComp=hitos.filter(h=>h.estado==="completado").length;
  const hPct=hitos.length>0?Math.round((hitosComp/hitos.length)*100):null;
  const now=new Date();
  const fecha=now.toLocaleDateString("es-AR",{day:"2-digit",month:"long",year:"numeric"});
  const byCat=cats.map(c=>({...c,total:gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0),presup:(()=>{const p=presup.find(x=>x.cat_id===c.id);if(!p)return 0;return p.moneda==="USD"?p.monto*(enUSD?1:tcRef):enUSD?p.monto/tcRef:p.monto;})()})).filter(c=>c.total>0||c.presup>0).sort((a,b)=>b.total-a.total);

  // Construcción HTML para impresión
  const pctBar=(pct,color)=>`<div style="height:10px;background:#eee;border-radius:5px;overflow:hidden;margin-top:4px"><div style="height:100%;width:${Math.min(pct||0,100)}%;background:${color};border-radius:5px"></div></div>`;
  const catRows=byCat.map(c=>{const p=c.presup>0?Math.min(Math.round((c.total/c.presup)*100),200):null;const col=p===null?"#888":p>=100?"#B84A3A":p>=80?"#7A6A1A":"#2E6E18";return `<tr><td style="padding:8px 10px;border-bottom:1px solid #eee">${c.icon||""} ${c.label}</td><td style="padding:8px 10px;text-align:right;border-bottom:1px solid #eee">${c.presup>0?fmt(c.presup):"—"}</td><td style="padding:8px 10px;text-align:right;font-weight:600;border-bottom:1px solid #eee;color:${c.color||C.green}">${fmt(c.total)}</td><td style="padding:8px 10px;text-align:right;border-bottom:1px solid #eee;color:${col}">${p!==null?p+"%":"—"}</td></tr>`;}).join("");
  const hitosRows=hitos.slice(0,10).map(h=>{const col=h.estado==="completado"?"#2E6E18":h.estado==="en_progreso"?"#7A6A1A":"#888";return `<tr><td style="padding:7px 10px;border-bottom:1px solid #eee">${h.titulo}</td><td style="padding:7px 10px;border-bottom:1px solid #eee">${h.fecha_estimada||"—"}</td><td style="padding:7px 10px;font-weight:600;color:${col};border-bottom:1px solid #eee">${h.estado==="completado"?"✓ Completado":h.estado==="en_progreso"?"En progreso":"Pendiente"}</td></tr>`;}).join("");

  const html=`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Informe de Obra — ${obra.nombre}</title><style>
    *{box-sizing:border-box;margin:0;padding:0}body{font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#182810;background:#fff;padding:32px}
    h1{font-size:22px;font-weight:800;color:#182810;margin-bottom:4px}h2{font-size:15px;font-weight:700;color:#2E6E18;margin:24px 0 12px;border-bottom:2px solid #EBF0E4;padding-bottom:6px}
    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px;border-bottom:3px solid #2E6E18;padding-bottom:20px}
    .badge{display:inline-block;padding:3px 12px;border-radius:20px;font-size:11px;font-weight:600;background:#EBF5DF;color:#2E6E18;border:1px solid #7CBF3A33}
    .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
    .stat{border:1px solid #e0e8d8;border-top:3px solid #2E6E18;border-radius:10px;padding:12px 14px}
    .stat-label{font-size:10px;color:#7A9060;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
    .stat-value{font-size:18px;font-weight:700;color:#182810}
    table{width:100%;border-collapse:collapse;font-size:12px}
    thead th{padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:#7A9060;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #d0dcc8}
    .footer{margin-top:32px;padding-top:16px;border-top:1px solid #e0e8d8;font-size:11px;color:#7A9060;display:flex;justify-content:space-between}
    @media print{body{padding:16px}@page{margin:12mm}}
  </style></head><body>
  <div class="header">
    <div>
      <h1>${obra.nombre}</h1>
      <div style="font-size:13px;color:#3D5C2A;margin-top:4px">${obra.direccion||""}</div>
      <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
        <span class="badge">${obra.estado||"En ejecución"}</span>
        <span style="font-size:12px;color:#7A9060;align-self:center">Informe al ${fecha}</span>
      </div>
    </div>
    <div style="text-align:right">
      <div style="font-size:22px;font-weight:900;color:#2E6E18;letter-spacing:-.04em">DA2ARQ</div>
      <div style="font-size:11px;color:#7A9060">Gestión de obra</div>
    </div>
  </div>

  <h2>📊 Resumen financiero</h2>
  <div class="stats">
    <div class="stat"><div class="stat-label">Total ejecutado</div><div class="stat-value">${fmt(totalGastos)}</div></div>
    <div class="stat" style="border-top-color:#2A6A5A"><div class="stat-label">Presupuesto</div><div class="stat-value" style="color:#2A6A5A">${presupTotal>0?fmt(presupTotal):"—"}</div></div>
    <div class="stat" style="border-top-color:${pct>=100?"#B84A3A":"#7CBF3A"}"><div class="stat-label">Avance presup.</div><div class="stat-value" style="color:${pct>=100?"#B84A3A":"#2E6E18"}">${pct!==null?pct+"%":"—"}</div></div>
    <div class="stat" style="border-top-color:#7A6A1A"><div class="stat-label">Objetivos</div><div class="stat-value" style="color:#7A6A1A">${hPct!==null?hPct+"%":"—"}</div></div>
  </div>
  ${presupTotal>0?`<div>${pctBar(pct,pct>=100?"#B84A3A":pct>=80?"#7A6A1A":"#2E6E18")}</div><div style="display:flex;justify-content:space-between;font-size:11px;color:#7A9060;margin-top:4px"><span>Inicio</span><span><b>${pct||0}% ejecutado</b></span><span>Presupuesto: ${fmt(presupTotal)}</span></div>`:""}

  ${byCat.length>0?`<h2>📂 Gastos por categoría</h2>
  <table><thead><tr><th>Categoría</th><th style="text-align:right">Presupuesto</th><th style="text-align:right">Ejecutado</th><th style="text-align:right">Avance</th></tr></thead><tbody>${catRows}<tr style="background:#f5f8f0;font-weight:700"><td style="padding:10px">TOTAL</td><td style="padding:10px;text-align:right">${presupTotal>0?fmt(presupTotal):"—"}</td><td style="padding:10px;text-align:right;color:#2E6E18">${fmt(totalGastos)}</td><td style="padding:10px;text-align:right;color:${pct>=100?"#B84A3A":"#2E6E18"}">${pct!==null?pct+"%":"—"}</td></tr></tbody></table>`:""}

  ${hitos.length>0?`<h2>🏁 Objetivos de obra</h2>
  <table><thead><tr><th>Objetivo</th><th>Fecha estimada</th><th>Estado</th></tr></thead><tbody>${hitosRows}</tbody></table>`:""}

  ${fotos.length>0?`<h2>📷 Registro fotográfico</h2><div style="font-size:12px;color:#7A9060">${fotos.length} foto${fotos.length!==1?"s":""} registradas · última actualización ${fotos[0]?.fecha||"—"}</div>`:""}

  <div class="footer">
    <span>DA2ARQ — Gestión profesional de obras</span>
    <span>Generado el ${fecha}</span>
  </div>
  </body></html>`;

  const win=window.open("","_blank");
  if(!win){alert("Bloqueado popup. Permitir popups para este sitio.");return;}
  win.document.write(html);
  win.document.close();
  setTimeout(()=>{win.focus();win.print();},400);
}

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
  const [recoveryMode,setRecoveryMode]=useState(false);
  const toast=useToast();

  useEffect(()=>{
    // Detectar si la URL tiene #type=recovery (link de "crear contraseña")
    const hash=window.location.hash;
    if(hash.includes("type=recovery")||hash.includes("type=invite")){
      setRecoveryMode(true);
    }
    supabase.auth.getSession().then(({data:{session}})=>{setUser(session?.user??null);setAuthLoading(false);});
    const{data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{
      setUser(session?.user??null);
      // Cuando Supabase procesa el link de recovery, dispara PASSWORD_RECOVERY
      if(event==="PASSWORD_RECOVERY")setRecoveryMode(true);
      if(event==="SIGNED_IN"&&recoveryMode){/* esperar a que cambie la contraseña */}
    });
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
  // Pantalla de nueva contraseña (recovery/invite)
  if(recoveryMode)return <><style>{gCSS}</style><SetPasswordScreen onDone={()=>{setRecoveryMode(false);}} toast={toast}/><ToastContainer toasts={toast.toasts}/></>;
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

// ── SET PASSWORD SCREEN (recovery / invite) ───────────────────────────────────
function SetPasswordScreen({onDone,toast}){
  const [pass,setPass]=useState("");
  const [pass2,setPass2]=useState("");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const [ok,setOk]=useState(false);

  const handleSetPassword=async()=>{
    if(!pass||!pass2)return setErr("Completá los dos campos.");
    if(pass.length<6)return setErr("La contraseña debe tener al menos 6 caracteres.");
    if(pass!==pass2)return setErr("Las contraseñas no coinciden.");
    setLoading(true);setErr("");
    const{error}=await supabase.auth.updateUser({password:pass});
    if(error){setErr(error.message);setLoading(false);return;}
    setOk(true);toast.success("Contraseña creada. Ya podés ingresar.");
    // Limpiar el hash de la URL
    window.history.replaceState(null,"",window.location.pathname);
    setTimeout(()=>onDone(),2000);
    setLoading(false);
  };

  return <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{width:"100%",maxWidth:380}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><Logo size={90}/></div>
        <div style={{fontWeight:800,fontSize:24,letterSpacing:"-.04em",color:C.t}}>DA2ARQ</div>
        <div style={{color:C.t3,fontSize:13,marginTop:3}}>Creá tu contraseña de acceso</div>
      </div>
      <Card>
        {ok
          ?<div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:40,marginBottom:12}}>✅</div>
            <div style={{fontSize:15,fontWeight:700,color:C.green,marginBottom:6}}>¡Contraseña creada!</div>
            <div style={{fontSize:13,color:C.t3}}>Redirigiendo al inicio de sesión...</div>
          </div>
          :<div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{background:C.green+"12",border:`1px solid ${C.green}33`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.green}}>
              🔐 Elegí una contraseña para ingresar siempre a DA2ARQ con tu email.
            </div>
            <div>
              <div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Nueva contraseña</div>
              <input style={INP} type="password" placeholder="Mínimo 6 caracteres" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSetPassword()}/>
            </div>
            <div>
              <div style={{fontSize:11,color:C.t2,marginBottom:5,fontWeight:600}}>Repetir contraseña</div>
              <input style={INP} type="password" placeholder="••••••••" value={pass2} onChange={e=>setPass2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSetPassword()}/>
            </div>
            {err&&<div style={{background:C.red+"18",border:`1px solid ${C.red}33`,borderRadius:7,padding:"8px 12px",fontSize:12,color:C.red}}>{err}</div>}
            <Btn primary full onClick={handleSetPassword} loading={loading}>Crear contraseña</Btn>
          </div>
        }
      </Card>
    </div>
  </div>;
}

// ── OBRAS SCREEN ──────────────────────────────────────────────────────────────
const ESTADOS_OBRA=["Relevamiento","En proyecto","En ejecución","Finalizada"];
const ESTADO_COLOR={"Relevamiento":C.amber,"En proyecto":C.blue,"En ejecución":C.green,"Finalizada":C.t3};

function ObrasScreen({user,onSelect,onLogout,toast}){
  const [obras,setObras]=useState([]);
  const [loading,setLoading]=useState(true);
  const [modal,setModal]=useState(false);
  const [saving,setSaving]=useState(false);
  const [draft,setDraft]=useState({nombre:"",direccion:"",estado:"En ejecución",presupuesto_total:"",moneda_presupuesto:"ARS",presup_tipo:"total"});
  const [confirmDel,setConfirmDel]=useState(null);
  const loadObras=useCallback(async()=>{
    setLoading(true);
    const{data,error}=await supabase.from("obras").select("*, participantes!inner(rol,puede_cargar,user_id)").eq("participantes.user_id",user.id).order("created_at",{ascending:false});
    if(!error&&data){
      const ids=data.map(o=>o.id);
      const[{data:gData},{data:fData},{data:hData}]=await Promise.all([
        supabase.from("gastos").select("obra_id,monto,moneda,tc_valor").in("obra_id",ids),
        supabase.from("fotos").select("obra_id").in("obra_id",ids),
        supabase.from("hitos").select("obra_id,estado").in("obra_id",ids),
      ]);
      setObras(data.map(o=>({
        ...o,
        _gastos:gData?.filter(g=>g.obra_id===o.id)||[],
        _fotos:(fData?.filter(f=>f.obra_id===o.id)||[]).length,
        _hitos:hData?.filter(h=>h.obra_id===o.id)||[],
      })));
    }
    setLoading(false);
  },[user.id]);
  useEffect(()=>{loadObras();},[loadObras]);
  const save=async()=>{
    if(!draft.nombre.trim())return;setSaving(true);
    const{data:obra,error:obraErr}=await supabase.from("obras").insert({nombre:draft.nombre.trim(),direccion:draft.direccion,estado:draft.estado,presupuesto_total:parseFloat(draft.presupuesto_total)||0,moneda_presupuesto:draft.moneda_presupuesto,created_by:user.id}).select().single();
    if(obraErr){toast.error("Error: "+obraErr.message);setSaving(false);return;}
    const profile=await supabase.from("profiles").select("nombre").eq("id",user.id).single();
    await supabase.from("participantes").insert({obra_id:obra.id,user_id:user.id,email:user.email,nombre:profile.data?.nombre||user.email,rol:"arquitecto",puede_cargar:true});
    await supabase.rpc("crear_categorias_default",{p_obra_id:obra.id});
    // Si eligió "por categorías" y cargó montos, guardarlos
    if(draft.presup_tipo==="categorias"&&draft.cats_presup?.length){
      // Obtener las categorías recién creadas
      const{data:catsCreadas}=await supabase.from("categorias").select("id,label").eq("obra_id",obra.id);
      if(catsCreadas){
        const rows=draft.cats_presup.filter(cp=>cp.label&&parseFloat(cp.monto)>0).map(cp=>{
          const cat=catsCreadas.find(c=>c.label.toLowerCase()===cp.label.toLowerCase())||catsCreadas[0];
          return{obra_id:obra.id,cat_id:cat?.id||null,monto:parseFloat(cp.monto),moneda:draft.moneda_presupuesto,label:cp.label};
        }).filter(r=>r.cat_id);
        if(rows.length)await supabase.from("presupuestos").insert(rows);
      }
    }
    toast.success("Obra creada");
    setDraft({nombre:"",direccion:"",estado:"En ejecución",presupuesto_total:"",moneda_presupuesto:"ARS",presup_tipo:"total",cats_presup:[{label:"Mano de Obra",monto:""},{label:"Obra / Materiales",monto:""},{label:"Varios",monto:""}]});
    setModal(false);loadObras();setSaving(false);
  };
  const miRol=obra=>obra.participantes?.find(p=>p.user_id===user.id)?.rol||"cliente";
  const esAdminObra=o=>{const r=miRol(o);return r==="arquitecto"||r==="ayudante";};
  const changeEstado=async(e,obraId,nuevoEstado)=>{e.stopPropagation();const{error}=await supabase.from("obras").update({estado:nuevoEstado}).eq("id",obraId);if(error)toast.error("Error al cambiar estado");else{toast.success("Estado actualizado");loadObras();}};
  const deleteObra=async()=>{if(!confirmDel)return;const{error}=await supabase.from("obras").delete().eq("id",confirmDel.id);if(error)toast.error("Error al eliminar: "+error.message);else{toast.success("Obra eliminada");loadObras();}setConfirmDel(null);};
  // Un usuario es "solo cliente" si en todas sus obras tiene rol cliente
  const esSoloCliente=obras.length>0&&obras.every(o=>miRol(o)==="cliente");
  const puedeCrearObra=!esSoloCliente||(obras.length===0&&!esSoloCliente);
  // Si no tiene obras y llegó por invitación, detectarlo
  const sinObrasCliente=!loading&&obras.length===0;

  return <div style={{minHeight:"100vh",background:C.bg}}>
    <div style={{background:C.bg2,borderBottom:`1px solid ${C.bd}`,padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:54}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><Logo size={40}/><div><div style={{fontWeight:800,fontSize:15,color:C.t}}>DA2ARQ</div><div style={{fontSize:10,color:C.t3}}>Gestión de obra</div></div></div>
      <div style={{display:"flex",alignItems:"center",gap:10}}><span className="hide-mobile" style={{fontSize:12,color:C.t2}}>{user.email}</span><Btn small onClick={onLogout}>Salir</Btn></div>
    </div>
    <div style={{padding:24,maxWidth:960,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
        <div><div style={{fontSize:20,fontWeight:700,color:C.t}}>Mis Obras</div><div style={{fontSize:12,color:C.t3,marginTop:2}}>{obras.length} obra{obras.length!==1?"s":""}</div></div>
        {!esSoloCliente&&<Btn primary onClick={()=>setModal(true)}>+ Nueva obra</Btn>}
      </div>
      {loading&&<Spinner/>}
      {sinObrasCliente&&esSoloCliente&&<Card style={{textAlign:"center",padding:"48px 24px"}}>
        <div style={{fontSize:48,marginBottom:12}}>⏳</div>
        <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:6}}>Todavía no tenés obras asignadas</div>
        <div style={{fontSize:13,color:C.t3,maxWidth:360,margin:"0 auto"}}>El arquitecto todavía no te asignó a ninguna obra. Una vez que lo haga, vas a ver el avance acá.</div>
      </Card>}
      {sinObrasCliente&&!esSoloCliente&&<Card style={{textAlign:"center",padding:"48px 24px"}}>
        <div style={{fontSize:48,marginBottom:12}}>🏗️</div>
        <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:6}}>No tenés obras todavía</div>
        <div style={{fontSize:13,color:C.t3,maxWidth:320,margin:"0 auto 20px"}}>Creá tu primera obra para empezar a registrar gastos, fotos y el avance con tus clientes.</div>
        <Btn primary onClick={()=>setModal(true)}>+ Crear primera obra</Btn>
      </Card>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {obras.map(o=>{
          const rol=miRol(o);
          const esAdmin=esAdminObra(o);
          const estadoColor=ESTADO_COLOR[o.estado]||C.green;
          return <div key={o.id} className="fu" onClick={()=>onSelect(o)} style={{background:C.bg2,border:`1px solid ${C.bd2}`,borderLeft:`4px solid ${estadoColor}`,borderRadius:12,padding:"18px 20px",cursor:"pointer",transition:"box-shadow .2s",position:"relative"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(42,110,24,.13)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            {esAdmin&&<button onClick={e=>{e.stopPropagation();setConfirmDel(o);}} style={{position:"absolute",top:10,right:10,background:"none",border:"none",cursor:"pointer",fontSize:15,color:C.t3,lineHeight:1,padding:4,borderRadius:6}} title="Eliminar obra">✕</button>}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,paddingRight:esAdmin?20:0}}>
              <div style={{width:40,height:40,borderRadius:10,background:C.limaBg,border:`1px solid ${C.lima}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🏗️</div>
              {esAdmin
                ?<select value={o.estado} onClick={e=>e.stopPropagation()} onChange={e=>changeEstado(e,o.id,e.target.value)} style={{fontSize:11,fontWeight:700,color:estadoColor,background:estadoColor+"18",border:`1px solid ${estadoColor}44`,borderRadius:20,padding:"3px 10px",cursor:"pointer",outline:"none",appearance:"none",WebkitAppearance:"none"}}>
                    {ESTADOS_OBRA.map(s=><option key={s} value={s} style={{color:C.t,background:C.bg2,fontWeight:400}}>{s}</option>)}
                  </select>
                :<Tag label={o.estado} color={estadoColor}/>
              }
            </div>
            <div style={{fontWeight:700,fontSize:14,color:C.t,marginBottom:3}}>{o.nombre}</div>
            <div style={{fontSize:12,color:C.t3,marginBottom:10}}>{o.direccion||<span style={{fontStyle:"italic",opacity:.5}}>Sin dirección</span>}</div>
            {(()=>{
              const totalARS=(o._gastos||[]).reduce((s,g)=>s+(g.moneda==="USD"?g.monto*(g.tc_valor||1300):g.monto),0);
              const presupARS=o.presupuesto_total?(o.moneda_presupuesto==="USD"?o.presupuesto_total*1300:o.presupuesto_total):0;
              const pct=presupARS>0?Math.min(Math.round((totalARS/presupARS)*100),999):null;
              if(pct===null)return null;
              const barColor=pct>=100?C.red:pct>=80?C.amber:C.green;
              return <div style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.t3,marginBottom:3}}>
                  <span>Presupuesto ejecutado</span>
                  <span style={{fontWeight:700,color:barColor}}>{pct}%</span>
                </div>
                <div style={{height:5,borderRadius:3,background:C.bg3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${Math.min(pct,100)}%`,borderRadius:3,background:barColor,transition:"width .6s"}}/>
                </div>
              </div>;
            })()}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
              <Tag label={ROL_LABEL[rol]} color={ROL_COLOR[rol]}/>
              <div style={{display:"flex",gap:10}}>
                {(o._gastos?.length>0)&&<span style={{fontSize:11,color:C.t3}}>💸 {o._gastos.length}</span>}
                {(o._fotos>0)&&<span style={{fontSize:11,color:C.t3}}>📷 {o._fotos}</span>}
                {(o._hitos?.length>0)&&<span style={{fontSize:11,color:C.t3}}>🏁 {o._hitos.filter(h=>h.estado==="completado").length}/{o._hitos.length}</span>}
              </div>
            </div>
          </div>;
        })}
      </div>
    </div>
    {confirmDel&&<Modal title="Eliminar obra" onClose={()=>setConfirmDel(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div style={{fontSize:13,color:C.t}}>¿Seguro que querés eliminar <b>{confirmDel.nombre}</b>? Se borrarán todos sus gastos, fotos, presupuestos y participantes. Esta acción no se puede deshacer.</div>
        <div style={{background:C.red+"12",border:`1px solid ${C.red}33`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.red}}>⚠ Acción irreversible</div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={deleteObra} style={{flex:1,padding:"9px",fontSize:13,fontWeight:700,background:C.red,color:"#fff",border:"none",borderRadius:8,cursor:"pointer"}}>Sí, eliminar</button>
          <Btn onClick={()=>setConfirmDel(null)}>Cancelar</Btn>
        </div>
      </div>
    </Modal>}
    {!esSoloCliente&&modal&&<Modal title="Nueva Obra" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Nombre *</div><input style={INP} placeholder="Ej: Residencia Palermo" value={draft.nombre} onChange={e=>setDraft(d=>({...d,nombre:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Dirección</div><input style={INP} placeholder="Calle y número" value={draft.direccion} onChange={e=>setDraft(d=>({...d,direccion:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Estado</div><select style={SEL} value={draft.estado} onChange={e=>setDraft(d=>({...d,estado:e.target.value}))}>{["Relevamiento","En proyecto","En ejecución","Finalizada"].map(s=><option key={s}>{s}</option>)}</select></div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:8,fontWeight:600}}>Tipo de presupuesto</div>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {[{v:"total",label:"💰 Monto total",desc:"Un presupuesto global para toda la obra"},{v:"categorias",label:"📂 Por categorías",desc:"Desglose por rubro, definilo ahora"}].map(op=>(
              <div key={op.v} onClick={()=>setDraft(d=>({...d,presup_tipo:op.v}))} style={{flex:1,border:`2px solid ${draft.presup_tipo===op.v?C.green:C.bd2}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",background:draft.presup_tipo===op.v?C.limaBg:"transparent",transition:"all .2s"}}>
                <div style={{fontSize:12,fontWeight:700,color:draft.presup_tipo===op.v?C.green:C.t,marginBottom:3}}>{op.label}</div>
                <div style={{fontSize:10,color:C.t3}}>{op.desc}</div>
              </div>
            ))}
          </div>
          {draft.presup_tipo==="total"&&<div style={{display:"grid",gridTemplateColumns:"1fr 90px",gap:8}}>
            <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Monto</div><input style={INP} type="number" placeholder="0" value={draft.presupuesto_total} onChange={e=>setDraft(d=>({...d,presupuesto_total:e.target.value}))}/></div>
            <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div><select style={SEL} value={draft.moneda_presupuesto} onChange={e=>setDraft(d=>({...d,moneda_presupuesto:e.target.value}))}><option>ARS</option><option>USD</option></select></div>
          </div>}
          {draft.presup_tipo==="categorias"&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
            <div style={{display:"flex",gap:8}}>
              <select style={{...SEL,flex:1}} value={draft.moneda_presupuesto} onChange={e=>setDraft(d=>({...d,moneda_presupuesto:e.target.value}))}>
                <option value="ARS">ARS</option><option value="USD">USD</option>
              </select>
            </div>
            {(draft.cats_presup||[{label:"Mano de Obra",monto:""},{label:"Obra / Materiales",monto:""},{label:"Varios",monto:""}]).map((cp,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 130px 28px",gap:6,alignItems:"center"}}>
                <input style={INP} placeholder={`Rubro ${i+1}`} value={cp.label} onChange={e=>{const arr=[...(draft.cats_presup||[{label:"Mano de Obra",monto:""},{label:"Obra / Materiales",monto:""},{label:"Varios",monto:""}])];arr[i]={...arr[i],label:e.target.value};setDraft(d=>({...d,cats_presup:arr}));}}/>
                <input style={INP} type="number" placeholder="Monto" value={cp.monto} onChange={e=>{const arr=[...(draft.cats_presup||[{label:"Mano de Obra",monto:""},{label:"Obra / Materiales",monto:""},{label:"Varios",monto:""}])];arr[i]={...arr[i],monto:e.target.value};setDraft(d=>({...d,cats_presup:arr}));}}/>
                <button onClick={()=>{const arr=(draft.cats_presup||[]).filter((_,j)=>j!==i);setDraft(d=>({...d,cats_presup:arr}));}} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:18,lineHeight:1}}>×</button>
              </div>
            ))}
            <button onClick={()=>setDraft(d=>({...d,cats_presup:[...(d.cats_presup||[{label:"Mano de Obra",monto:""},{label:"Obra / Materiales",monto:""},{label:"Varios",monto:""}]),{label:"",monto:""}]}))} style={{background:"none",border:`1px dashed ${C.bd2}`,borderRadius:8,padding:"7px",cursor:"pointer",fontSize:12,color:C.t3}}>+ Agregar rubro</button>
          </div>}
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
  const [notifVistas,setNotifVistas]=useState(()=>{try{return JSON.parse(localStorage.getItem("nv_"+obra.id)||"{}")}catch{return {};}});

  const [permisosCliente,setPermisosCliente]=useState({gastos:true,fotos:true,objetivos:true,reportes:false,resumen:true,ipc:false,usd:false});

  const loadAll=useCallback(async()=>{
    setLoadingData(true);
    const[gRes,prRes,cRes,fRes,partRes,hRes,cRes2,pермRes]=await Promise.all([
      supabase.from("gastos").select("*").eq("obra_id",obra.id).order("fecha",{ascending:false}),
      supabase.from("presupuestos").select("*").eq("obra_id",obra.id),
      supabase.from("categorias").select("*, subcategorias(*)").eq("obra_id",obra.id).order("orden"),
      supabase.from("fotos").select("*").eq("obra_id",obra.id).order("fecha",{ascending:false}),
      supabase.from("participantes").select("*").eq("obra_id",obra.id),
      supabase.from("hitos").select("*").eq("obra_id",obra.id).order("fecha_estimada"),
      supabase.from("comentarios_gasto").select("*").eq("obra_id",obra.id).order("created_at"),
      supabase.from("permisos_cliente").select("*").eq("obra_id",obra.id).single(),
    ]);
    setGastos(gRes.data||[]);setPresup(prRes.data||[]);
    setCats((cRes.data||[]).map(c=>({...c,subs:c.subcategorias||[]})));
    setFotos(fRes.data||[]);setPartic(partRes.data||[]);
    setHitos(hRes.data||[]);setComentarios(cRes2.data||[]);
    if(pермRes.data)setPermisosCliente(p=>({...p,...pермRes.data}));
    setLoadingData(false);
  },[obra.id]);
  useEffect(()=>{loadAll();},[loadAll]);

  const miP=partic.find(p=>p.user_id===user.id);
  const miRol=miP?.rol||"cliente";
  const puedoCargar=miP?.puede_cargar||false;
  const esAdmin=miRol==="arquitecto"||miRol==="ayudante";
  const esArquitecto=miRol==="arquitecto";
  const tcRef=tcOficial||tcManual;
  const gastosVis=esAdmin?gastos:gastos.filter(g=>g.visibilidad==="publico");

  const gastosNuevos=gastosVis.filter(g=>!notifVistas[g.id]).length;
  const totalNotifs=gastosNuevos;
  const marcarTodosVistos=()=>{const nv={...notifVistas};gastosVis.forEach(g=>{nv[g.id]=1;});comentarios.forEach(c=>{nv["c_"+c.id]=1;});setNotifVistas(nv);try{localStorage.setItem("nv_"+obra.id,JSON.stringify(nv));}catch{}};

  const pc=permisosCliente;
  const TABS=[
    {id:"dashboard",label:"Dashboard",icon:"📊"},
    ...(esAdmin||pc.gastos?[{id:"gastos",label:"Gastos",icon:"💸",badge:esAdmin?totalNotifs:0}]:[]),
    ...(esAdmin?[{id:"presupuesto",label:"Presupuesto",icon:"📐"}]:[]),
    ...(esAdmin||pc.fotos?[{id:"fotos",label:"Fotos",icon:"📷"}]:[]),
    ...(esAdmin||pc.objetivos?[{id:"objetivos",label:"Objetivos",icon:"🏁"}]:[]),
    ...(esAdmin||pc.reportes?[{id:"reportes",label:"Reportes",icon:"📈"}]:[]),
    ...(!esAdmin&&pc.resumen?[{id:"resumen",label:"Mi Resumen",icon:"📋"}]:[]),
    ...(esAdmin?[{id:"categorias",label:"Categorías",icon:"🏷️"}]:[]),
    ...(esAdmin?[{id:"participantes",label:"Participantes",icon:"👥"}]:[]),
    ...(esArquitecto?[{id:"permisos",label:"Permisos",icon:"🔐"}]:[]),
    ...(esAdmin||pc.ipc?[{id:"ipc",label:"IPC",icon:"📉"}]:[]),
    ...(esAdmin||pc.usd?[{id:"usd",label:"USD",icon:"💵"}]:[]),
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
          <div style={{display:"flex",background:C.bg3,borderRadius:20,padding:3,border:`1px solid ${C.bd2}`}}>
            {["ARS","USD"].map(m=><button key={m} onClick={()=>setMonedaVista(m)} style={{padding:"4px 12px",fontSize:11,border:"none",borderRadius:16,cursor:"pointer",background:monedaVista===m?C.green:"transparent",color:monedaVista===m?"#fff":C.t2,fontWeight:monedaVista===m?700:400,transition:"all .2s"}}>{m}</button>)}
          </div>
          <Tag label={ROL_LABEL[miRol]} color={ROL_COLOR[miRol]}/>
          {<Btn small onClick={()=>generarPDFInforme({obra,gastos:gastosVis,fotos,hitos,cats,presup,tcRef,monedaVista,partic}).catch(e=>toast.error("Error PDF: "+e.message))}>📄 PDF</Btn>}
          <Btn small onClick={onLogout}>Salir</Btn>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,paddingBottom:8,flexWrap:"wrap",borderTop:`1px solid ${C.bg3}`}}>
        <span style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:".06em",fontWeight:600}}>TC</span>
        <div style={{display:"flex",alignItems:"center",gap:5,background:C.bg3,borderRadius:7,padding:"3px 10px",border:`1px solid ${C.bd}`}}>
          <span style={{fontSize:10,color:C.t3}}>Oficial</span>
          <span style={{fontSize:12,fontWeight:700,color:C.green}}>{tcLoading?"…":tcOficial?("$"+tcOficial.toLocaleString("es-AR")):"—"}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:5,background:C.bg3,borderRadius:7,padding:"3px 10px",border:`1px solid ${C.bd}`}}>
          <span style={{fontSize:10,color:C.t3}}>Blue</span>
          <span style={{fontSize:12,fontWeight:700,color:C.lima}}>{tcLoading?"…":tcBlue?("$"+tcBlue.toLocaleString("es-AR")):"—"}</span>
        </div>
        <button onClick={fetchTCs} title="Actualizar TC" style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:C.t3}}>🔄</button>
        {esAdmin&&<div style={{fontSize:10,color:C.t3}}>Manual: <input type="number" value={tcManual} onChange={e=>setTcManual(+e.target.value)} style={{...INP,width:70,padding:"2px 6px",fontSize:11,display:"inline-block"}}/></div>}
        {!esAdmin&&tcOficial&&tcBlue&&<div style={{display:"flex",alignItems:"center",gap:5,background:C.bg3,borderRadius:7,padding:"3px 10px",border:`1px solid ${C.bd}`}}>
          <span style={{fontSize:10,color:C.t3}}>Prom.</span>
          <span style={{fontSize:12,fontWeight:700,color:C.blue}}>${Math.round((tcOficial+tcBlue)/2).toLocaleString("es-AR")}</span>
        </div>}
        <div style={{marginLeft:"auto",display:"flex",gap:6,alignItems:"center"}}>
          <span className="show-mobile"><button onClick={()=>setMobileMenu(v=>!v)} style={{background:C.bg3,border:`1px solid ${C.bd2}`,borderRadius:7,padding:"4px 10px",cursor:"pointer",fontSize:11,color:C.t2,fontWeight:600}}>☰ Menú</button></span>
        </div>
      </div>
      <div className="hide-mobile" style={{display:"flex",gap:0,overflowX:"auto",paddingBottom:0,borderTop:`1px solid ${C.bg3}`}}>
        {TABS.map(t=><button key={t.id} onClick={()=>goTab(t.id)} style={{padding:"9px 14px",fontSize:12,border:"none",borderBottom:`2px solid ${tab===t.id?C.green:"transparent"}`,cursor:"pointer",background:"transparent",color:tab===t.id?C.green:C.t2,fontWeight:tab===t.id?600:400,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
          <span>{t.icon}</span>{t.label}
          {t.badge>0&&<span style={{background:C.red,color:"#fff",fontSize:9,fontWeight:700,borderRadius:10,padding:"1px 5px",lineHeight:1.4}}>{t.badge}</span>}
        </button>)}
      </div>
      {mobileMenu&&<div style={{background:C.bg2,border:`1px solid ${C.bd2}`,borderRadius:10,padding:8,display:"flex",flexWrap:"wrap",gap:4}}>
        {TABS.map(t=><button key={t.id} onClick={()=>goTab(t.id)} style={{padding:"7px 12px",fontSize:12,border:`1px solid ${tab===t.id?C.green:C.bd}`,borderRadius:20,cursor:"pointer",background:tab===t.id?C.green+"18":"transparent",color:tab===t.id?C.green:C.t2,fontWeight:tab===t.id?600:400,display:"flex",alignItems:"center",gap:5}}>
          <span>{t.icon}</span>{t.label}
          {t.badge>0&&<span style={{background:C.red,color:"#fff",fontSize:9,fontWeight:700,borderRadius:10,padding:"1px 5px",lineHeight:1.4}}>{t.badge}</span>}
        </button>)}
      </div>}
    </div>

    <div style={{padding:20,paddingBottom:100,maxWidth:1040,margin:"0 auto"}}>
      {loadingData?<Spinner/>:<>
        {tab==="dashboard"&&<DashboardTab obra={obra} gastos={gastosVis} esAdmin={esAdmin} presup={presup} tcRef={tcRef} partic={partic} cats={cats} fotos={fotos} hitos={hitos} monedaVista={monedaVista}/>}
        {tab==="gastos"&&<GastosTab user={user} obra={obra} gastos={gastos} esAdmin={esAdmin} miRol={miRol} puedoCargar={puedoCargar} tcOficial={tcOficial} tcBlue={tcBlue} tcManual={tcManual} setTcManual={setTcManual} cats={cats} toast={toast} reload={loadAll} monedaVista={monedaVista} externalOpen={showGastoModal} onExternalClose={()=>setShowGastoModal(false)} comentarios={comentarios} miUserId={user.id}/>}
        {tab==="presupuesto"&&esAdmin&&<PresupuestoTab obra={obra} gastos={gastos} presup={presup} tcRef={tcRef} cats={cats} toast={toast} reload={loadAll} monedaVista={monedaVista} inflData={inflData} fetchIPC={fetchIPC}/>}
        {tab==="fotos"&&<FotosTab obra={obra} fotos={fotos} puedoCargar={puedoCargar||esAdmin} user={user} toast={toast} reload={loadAll}/>}
        {tab==="objetivos"&&<HitosTab obra={obra} hitos={hitos} esAdmin={esAdmin} toast={toast} reload={loadAll}/>}
        {tab==="reportes"&&<ReportesTab obra={obra} gastos={gastosVis} presup={presup} tcRef={tcRef} cats={cats} esAdmin={esAdmin} monedaVista={monedaVista}/>}
        {tab==="resumen"&&!esAdmin&&<ResumenClienteTab obra={obra} gastos={gastosVis} presup={presup} tcRef={tcRef} cats={cats} fotos={fotos} hitos={hitos} monedaVista={monedaVista}/>}
        {tab==="categorias"&&esAdmin&&<CategoriasTab cats={cats} obra={obra} toast={toast} reload={loadAll}/>}
        {tab==="participantes"&&esAdmin&&<ParticipantesTab obra={obra} partic={partic} toast={toast} reload={loadAll}/>}
        {tab==="permisos"&&esArquitecto&&<PermisosClienteTab obra={obra} permisos={permisosCliente} setPermisos={setPermisosCliente} toast={toast}/>}
        {tab==="ipc"&&<IPCTab inflData={inflData}/>}
        {tab==="usd"&&<USDTab tcHistData={tcHistData} inflData={inflData} tcOficial={tcOficial} tcBlue={tcBlue}/>}
      </>}
    </div>

    {(puedoCargar||esAdmin)&&<>
      <button onClick={()=>setShowGastoModal(true)}
        style={{position:"fixed",bottom:28,right:28,width:56,height:56,borderRadius:"50%",background:C.green,color:"#fff",border:"none",cursor:"pointer",fontSize:28,boxShadow:"0 4px 20px rgba(46,110,24,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:150,transition:"transform .2s"}}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        title="Cargar gasto">+</button>
      {showGastoModal&&<GastoRapidoModal user={user} obra={obra} cats={cats} tcOficial={tcOficial} tcBlue={tcBlue} tcManual={tcManual} setTcManual={setTcManual} esAdmin={esAdmin} toast={toast} reload={loadAll} onClose={()=>setShowGastoModal(false)}/>}
    </>}
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardTab({obra,gastos,esAdmin,presup,tcRef,partic,cats,fotos,hitos=[],monedaVista}){
  const enUSD=monedaVista==="USD";
  // Para el dashboard siempre usamos el monto que ve el cliente (monto_cliente si existe)
  const convG=g=>{const mc=g.monto_cliente!=null?g.monto_cliente:g.monto;return enUSD?toUSD({...g,monto:mc},tcRef):toARS({...g,monto:mc},tcRef);};
  const conv=convG;
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);

  // ── KPIs ──
  const totalGastado=gastos.reduce((s,g)=>s+conv(g),0);
  const totalPresupCatsMV=presup.reduce((s,p)=>{
    const pMV=p.moneda==="USD"?(enUSD?p.monto:p.monto*tcRef):(enUSD?p.monto/tcRef:p.monto);
    return s+pMV;
  },0);
  const presupTotalObraMV=obra.presupuesto_total?(obra.moneda_presupuesto==="USD"?(enUSD?obra.presupuesto_total:obra.presupuesto_total*tcRef):(enUSD?obra.presupuesto_total/tcRef:obra.presupuesto_total)):0;
  const presupTotalMV=totalPresupCatsMV>0?totalPresupCatsMV:presupTotalObraMV;
  const pct=presupTotalMV>0?Math.min(Math.round((totalGastado/presupTotalMV)*100),999):null;
  const restante=Math.max(0,presupTotalMV-totalGastado);
  const colorPct=p=>p>=100?C.red:p>=80?C.amber:C.green;

  // ── Gastos por categoría con barra de presupuesto ──
  const gastosPorCat=cats.map(c=>{
    const total=gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0);
    const presupCat=presup.find(p=>p.cat_id===c.id);
    const presupCatMV=presupCat?(presupCat.moneda==="USD"?(enUSD?presupCat.monto:presupCat.monto*tcRef):(enUSD?presupCat.monto/tcRef:presupCat.monto)):0;
    const pctCat=presupCatMV>0?Math.min(Math.round((total/presupCatMV)*100),100):0;
    return {...c,total,presupCatMV,pctCat};
  }).filter(c=>c.total>0||c.presupCatMV>0);

  // ── Gastos por subcategoría ordenados de mayor a menor ──
  const gastosPorSub=cats.flatMap(cat=>
    (cat.subs||[]).map(sub=>{
      const total=gastos.filter(g=>g.sub_id===sub.id).reduce((s,g)=>s+conv(g),0);
      return {id:sub.id,label:sub.label,catLabel:cat.label,catIcon:cat.icon||"📦",catColor:cat.color,total};
    })
  ).filter(s=>s.total>0).sort((a,b)=>b.total-a.total);

  // ── Actividad reciente ──
  const actGastos=gastos.slice(0,15).map(g=>{
    const cat=cats.find(c=>c.id===g.cat_id);
    const sub=cat?.subs?.find(s=>s.id===g.sub_id);
    return {tipo:"gasto",created_at:g.created_at,fecha:g.fecha,label:g.descripcion||sub?.label||cat?.label||"Gasto",monto:fmt(conv(g)),icon:"💸",catColor:cat?.color};
  });
  const actFotos=fotos.slice(0,5).map(f=>({tipo:"foto",created_at:f.created_at,fecha:f.fecha,label:f.titulo||"Foto subida",icon:"📷",catColor:null,monto:null}));
  const actHitos=hitos.filter(h=>h.estado==="completado").slice(0,5).map(h=>({tipo:"hito",created_at:h.updated_at||h.created_at,fecha:h.fecha_estimada,label:`Objetivo completado: ${h.titulo}`,icon:"🏁",catColor:null,monto:null}));
  const actividad=[...actGastos,...actFotos,...actHitos].sort((a,b)=>(b.created_at||"")>(a.created_at||"")?1:-1).slice(0,6);

  const EC={completado:{label:"Completado",color:C.green},en_progreso:{label:"En curso",color:C.amber},pendiente:{label:"Pendiente",color:C.t3},cancelado:{label:"Cancelado",color:C.red}};

  return <div className="fu" style={{display:"flex",flexDirection:"column",gap:14}}>

    {/* ── FILA 1: KPIs ── */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
      {[
        {label:"Ejecutado",value:pct!==null?`${pct}%`:"—",sub:"del presupuesto",color:pct!==null?colorPct(pct):C.t},
        {label:"Gasto real",value:fmt(totalGastado),sub:`acumulado ${monedaVista}`,color:C.t},
        {label:"Presupuesto restante",value:presupTotalMV>0?fmt(restante):"—",sub:"según presup.",color:presupTotalMV>0?(restante<presupTotalMV*0.15?C.red:C.amber):C.t3},
        {label:"Disponible",value:presupTotalMV>0?fmt(restante):"—",sub:"saldo vs presup.",color:presupTotalMV>0?C.green:C.t3},
      ].map((k,i)=>(
        <div key={i} style={{background:C.bg2,borderRadius:10,padding:"12px 14px",border:`1px solid ${C.bd2}`}}>
          <div style={{fontSize:10,color:C.t3,marginBottom:5,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em"}}>{k.label}</div>
          <div style={{fontSize:20,fontWeight:700,color:k.color,lineHeight:1.1}}>{k.value}</div>
          <div style={{fontSize:10,color:C.t3,marginTop:3}}>{k.sub}</div>
        </div>
      ))}
    </div>

    {/* ── FILA 2: Categorías | Fotos ── */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>

      {/* Gastos por categoría */}
      <Card>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Gastos por categoría</div>
        {gastosPorCat.length===0
          ?<div style={{textAlign:"center",padding:"20px 0",color:C.t3,fontSize:12}}>Sin gastos aún</div>
          :gastosPorCat.map(c=>(
            <div key={c.id} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:14}}>{c.icon||"📦"}</span>
                  <span style={{fontSize:12,color:C.t,fontWeight:600}}>{c.label}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:11,color:C.t2}}>{fmt(c.total)}</span>
                  {c.presupCatMV>0&&<span style={{fontSize:11,fontWeight:700,color:colorPct(c.pctCat)}}>{c.pctCat}%</span>}
                </div>
              </div>
              {c.presupCatMV>0&&(
                <div style={{height:6,background:C.bg3,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${c.pctCat}%`,background:colorPct(c.pctCat),borderRadius:3,transition:"width .4s"}}/>
                </div>
              )}
            </div>
          ))
        }
      </Card>

      {/* Últimas fotos */}
      <Card>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Últimas fotos</div>
        {fotos.length===0
          ?<div style={{textAlign:"center",padding:"20px 0",color:C.t3,fontSize:12}}>Sin fotos aún</div>
          :<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {fotos.slice(0,4).map(f=>(
                <div key={f.id} style={{borderRadius:8,overflow:"hidden",border:`1px solid ${C.bd2}`,aspectRatio:"4/3",background:C.bg3,position:"relative"}}>
                  <img src={f.url} alt={f.titulo||""} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";}}/>
                  {f.fecha&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,.45)",padding:"3px 6px",fontSize:10,color:"#fff"}}>{f.fecha}</div>}
                </div>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:8,fontSize:11,color:C.t3}}>{fotos.length} foto{fotos.length!==1?"s":""} en total</div>
          </>
        }
      </Card>
    </div>

    {/* ── FILA 3: Gastos por subcategoría ── */}
    {gastosPorSub.length>0&&(
      <Card>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Gastos por subcategoría</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:8}}>
          {gastosPorSub.map(s=>{
            const maxTotal=gastosPorSub[0].total;
            const pctBar=maxTotal>0?Math.round((s.total/maxTotal)*100):0;
            return (
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:C.bg3,borderRadius:8,border:`1px solid ${C.bd}`}}>
                <div style={{width:24,height:24,borderRadius:6,background:(s.catColor||C.green)+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{s.catIcon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                    <span style={{fontSize:12,color:C.t,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.label}</span>
                    <span style={{fontSize:11,fontWeight:700,color:s.catColor||C.green,flexShrink:0,marginLeft:8}}>{fmt(s.total)}</span>
                  </div>
                  <div style={{height:4,background:C.bg2,borderRadius:2,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pctBar}%`,background:s.catColor||C.green,borderRadius:2}}/>
                  </div>
                  <div style={{fontSize:10,color:C.t3,marginTop:2}}>{s.catLabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    )}

    {/* ── FILA 4: Actividad reciente ── */}
    <Card>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Actividad reciente</div>
      {actividad.length===0
        ?<div style={{textAlign:"center",padding:"16px 0",color:C.t3,fontSize:12}}>Sin actividad aún</div>
        :actividad.map((a,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<actividad.length-1?`1px solid ${C.bd}`:"none"}}>
            <div style={{width:30,height:30,borderRadius:8,background:C.bg3,border:`1px solid ${C.bd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{a.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,color:C.t,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.label}</div>
              <div style={{fontSize:11,color:C.t3,marginTop:1}}>{a.fecha}</div>
            </div>
            {a.monto&&<div style={{fontSize:12,fontWeight:700,color:a.catColor||C.green,flexShrink:0}}>{a.monto}</div>}
          </div>
        ))
      }
    </Card>

    {/* ── FILA 5: Objetivos de obra ── */}
    {hitos.length>0&&(
      <Card>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:12,fontWeight:600}}>Objetivos de obra</div>
        {hitos.map((h,i)=>{
          const ec=EC[h.estado]||EC.pendiente;
          const dotColor=h.estado==="completado"?C.green:h.estado==="en_progreso"?C.amber:C.bd2;
          return (
            <div key={h.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<hitos.length-1?`1px solid ${C.bd}`:"none"}}>
              <div style={{width:12,height:12,borderRadius:"50%",background:dotColor,border:`2px solid ${dotColor}`,flexShrink:0}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:h.estado==="cancelado"?C.t3:C.t,textDecoration:h.estado==="cancelado"?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.titulo}</div>
                {h.descripcion&&<div style={{fontSize:11,color:C.t3,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.descripcion}</div>}
              </div>
              <div style={{flexShrink:0,textAlign:"right"}}>
                <div style={{fontSize:10,color:C.t3,marginBottom:3}}>{h.fecha_estimada}</div>
                <Tag label={ec.label} color={ec.color}/>
              </div>
            </div>
          );
        })}
      </Card>
    )}

  </div>;
}

// ── GASTOS TAB ────────────────────────────────────────────────────────────────
function GastosTab({user,obra,gastos,esAdmin,miRol,puedoCargar,tcOficial,tcBlue,tcManual,setTcManual,cats,toast,reload,monedaVista,externalOpen,onExternalClose,comentarios=[],miUserId}){
  const vis=gastos.filter(g=>esAdmin||(miRol==="ayudante"&&g.visibilidad!=="privado")||g.visibilidad==="publico");
  const [showForm,setShowForm]=useState(false);
  const [filtro,setFiltro]=useState({cat:"todas",moneda:"todas",vis:"todas",q:""});
  const [tcTipo,setTcTipo]=useState("oficial");
  const [editM,setEditM]=useState(null);
  const [saving,setSaving]=useState(false);
  const [gastoComent,setGastoComent]=useState(null);
  const [vistaReal,setVistaReal]=useState(false); // toggle arquitecto: ver montos reales
  const tcProm=tcOficial&&tcBlue?Math.round((tcOficial+tcBlue)/2):null;
  const tcRef=tcOficial||tcManual;
  const tcVal=tcTipo==="oficial"?(tcOficial||tcManual):tcTipo==="blue"?(tcBlue||tcManual):tcTipo==="prom"?(tcProm||tcManual):tcManual;
  const enUSD=monedaVista==="USD";
  const conv=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);

  useEffect(()=>{if(externalOpen){setShowForm(true);onExternalClose();}},[externalOpen]);

  const initD=()=>({fecha:todayISO(),cat_id:cats[0]?.id||"",sub_id:cats[0]?.subs?.[0]?.id||"",descripcion:"",monto:"",monto_cliente:"",moneda:"ARS",visibilidad:"publico"});
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
  // convReal: monto real del gasto (lo que pagó el arquitecto)
  const convReal=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);
  // convCliente: monto que ve el cliente (monto_cliente si existe, sino el real)
  const convCliente=g=>{
    const mc=g.monto_cliente!=null?g.monto_cliente:g.monto;
    return enUSD?toUSD({...g,monto:mc},tcRef):toARS({...g,monto:mc},tcRef);
  };
  // convVis: lo que se muestra según rol
  const conv=convReal;
  const convVis=g=>esAdmin?convCliente(g):convCliente(g);
  const tieneClienteG=g=>g.monto_cliente!=null&&g.monto_cliente!==g.monto;

  const total=filtered.reduce((s,g)=>s+convCliente(g),0);
  const totalReal=esAdmin?filtered.reduce((s,g)=>s+convReal(g),0):null;
  const margen=esAdmin?filtered.reduce((s,g)=>s+(convCliente(g)-convReal(g)),0):null;

  const save=async()=>{
    if(!draft.monto||parseFloat(draft.monto)<=0)return;setSaving(true);
    const montoNum=parseFloat(draft.monto);
    const{error}=await supabase.from("gastos").insert({obra_id:obra.id,cat_id:draft.cat_id,sub_id:draft.sub_id||null,fecha:draft.fecha,monto:montoNum,monto_cliente:draft.monto_cliente?parseFloat(draft.monto_cliente):null,moneda:draft.moneda,tc_valor:tcVal,descripcion:draft.descripcion,visibilidad:draft.visibilidad,cargado_por:user.email});
    if(error)toast.error("Error: "+error.message);else{toast.success("Gasto guardado");await reload();}
    setDraft(initD());setSaving(false);setShowForm(false);
  };
  const saveEdit=async()=>{
    if(!editM)return;setSaving(true);
    const{error}=await supabase.from("gastos").update({cat_id:editM.cat_id,sub_id:editM.sub_id||null,fecha:editM.fecha,monto:parseFloat(editM.monto),monto_cliente:editM.monto_cliente?parseFloat(editM.monto_cliente):null,moneda:editM.moneda,descripcion:editM.descripcion,visibilidad:editM.visibilidad}).eq("id",editM.id);
    if(error)toast.error("Error");else{toast.success("Gasto actualizado");await reload();}
    setEditM(null);setSaving(false);
  };
  const deleteG=async(id)=>{const{error}=await supabase.from("gastos").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}};
  const montoNum=parseFloat(draft.monto)||0;

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
      <div>
        <div style={{fontSize:16,fontWeight:700,color:C.t}}>Gastos</div>
        <div style={{fontSize:12,color:C.t3,marginTop:2,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <span>{filtered.length} movimientos</span>
          {esAdmin
            ?<>
              <span style={{color:vistaReal?C.t2:C.t3}}>🔒 real: <b style={{color:C.t2}}>{fmt(totalReal??total)}</b></span>
              <span style={{color:vistaReal?C.t3:C.lima}}>🌐 cliente: <b style={{color:C.lima}}>{fmt(total)}</b></span>
              {margen!==null&&margen!==0&&<span style={{color:margen>0?C.green:C.red,fontWeight:700}}>{margen>0?"▲":"▼"} {fmt(Math.abs(margen))}</span>}
            </>
            :<span>{fmt(total)}</span>
          }
        </div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        {esAdmin&&<div onClick={()=>setVistaReal(v=>!v)} style={{display:"flex",alignItems:"center",gap:6,background:vistaReal?C.t2+"18":C.limaBg,border:`1px solid ${vistaReal?C.t2+"44":C.lima+"44"}`,borderRadius:20,padding:"4px 12px",cursor:"pointer",userSelect:"none"}}>
          <span style={{fontSize:11,fontWeight:600,color:vistaReal?C.t2:C.lima}}>{vistaReal?"🔒 Vista real":"🌐 Vista cliente"}</span>
        </div>}
        {(puedoCargar||esAdmin)&&<Btn primary onClick={()=>setShowForm(v=>!v)}>{showForm?"✕ Cerrar":"+ Nuevo gasto"}</Btn>}
      </div>
    </div>

    {showForm&&<Card style={{marginBottom:16}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10,marginBottom:12}}>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={{fontSize:11,color:C.t2,fontWeight:600}}>Monto *</span>
            <div style={{display:"flex",gap:4}}>
              {["ARS","USD"].map(m=><button key={m} onClick={()=>setDraft(d=>({...d,moneda:m}))} style={{padding:"2px 8px",fontSize:10,border:`1px solid ${draft.moneda===m?C.green:C.bd2}`,borderRadius:5,cursor:"pointer",background:draft.moneda===m?C.green:"transparent",color:draft.moneda===m?"#fff":C.t3,fontWeight:600}}>{m}</button>)}
            </div>
          </div>
          <input style={INP} type="number" placeholder="0" autoFocus value={draft.monto} onChange={e=>setDraft(d=>({...d,monto:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&save()}/>
          {montoNum>0&&<div style={{fontSize:10,color:C.t3,marginTop:2}}>{draft.moneda==="USD"?`≈ ${fmtARS(montoNum*(tcVal||tcRef))} al TC $${(tcVal||tcRef)?.toLocaleString("es-AR")}`:`≈ ${fmtUSD(montoNum/(tcVal||tcRef))}`}</div>}
        </div>
        {esAdmin&&<div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Monto cliente <span style={{color:C.t3,fontWeight:400,fontSize:10}}>(opc.)</span></div>
          <input style={INP} type="number" placeholder="igual al real" value={draft.monto_cliente} onChange={e=>setDraft(d=>({...d,monto_cliente:e.target.value}))}/>
        </div>}
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
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>TC</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {(esAdmin
              ?[{id:"oficial",label:`Ofic. $${tcOficial?.toLocaleString("es-AR")||"—"}`,color:C.green},{id:"blue",label:`Blue $${tcBlue?.toLocaleString("es-AR")||"—"}`,color:C.lima},{id:"prom",label:`Prom. $${tcProm?.toLocaleString("es-AR")||"—"}`,color:C.blue},{id:"manual",label:"Manual",color:C.t2}]
              :[{id:"oficial",label:`Ofic. $${tcOficial?.toLocaleString("es-AR")||"—"}`,color:C.green},{id:"blue",label:`Blue $${tcBlue?.toLocaleString("es-AR")||"—"}`,color:C.lima},{id:"prom",label:`Prom. $${tcProm?.toLocaleString("es-AR")||"—"}`,color:C.blue}]
            ).map(t=>(
              <button key={t.id} onClick={()=>setTcTipo(t.id)} style={{padding:"4px 8px",fontSize:10,border:`1px solid ${tcTipo===t.id?t.color:C.bd2}`,borderRadius:16,cursor:"pointer",background:tcTipo===t.id?t.color+"18":"transparent",color:tcTipo===t.id?t.color:C.t2,fontWeight:tcTipo===t.id?700:400}}>{t.label}</button>
            ))}
            {tcTipo==="manual"&&esAdmin&&<input type="number" value={tcManual} onChange={e=>setTcManual(+e.target.value)} style={{...INP,width:80,padding:"4px 8px",fontSize:11}}/>}
          </div>
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
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción (opcional)</div>
        <input style={INP} placeholder="Ej: Cuadrilla lunes..." value={draft.descripcion} onChange={e=>setDraft(d=>({...d,descripcion:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&save()}/>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn primary onClick={save} loading={saving} disabled={montoNum<=0}>Guardar gasto</Btn>
        <Btn onClick={()=>setShowForm(false)}>Cancelar</Btn>
      </div>
    </Card>}

    {/* Filtros */}
    <Card style={{marginBottom:14,padding:"12px 16px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
        <input style={{...INP,fontSize:12}} placeholder="🔍 Buscar..." value={filtro.q} onChange={e=>setFiltro(f=>({...f,q:e.target.value}))}/>
        <select style={{...SEL,fontSize:12}} value={filtro.cat} onChange={e=>setFiltro(f=>({...f,cat:e.target.value}))}>
          <option value="todas">Todas las categorías</option>
          {cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
        </select>
        <select style={{...SEL,fontSize:12}} value={filtro.moneda} onChange={e=>setFiltro(f=>({...f,moneda:e.target.value}))}>
          <option value="todas">ARS + USD</option>
          <option value="ARS">Solo ARS</option>
          <option value="USD">Solo USD</option>
        </select>
        {esAdmin&&<select style={{...SEL,fontSize:12}} value={filtro.vis} onChange={e=>setFiltro(f=>({...f,vis:e.target.value}))}>
          <option value="todas">Todas</option>
          <option value="publico">🌐 Públicos</option>
          <option value="solo_admin">👷 Solo equipo</option>
          <option value="privado">🔒 Privados</option>
        </select>}
        <Btn small onClick={()=>exportCSV(filtered.map(g=>({Fecha:g.fecha,Categoria:cats.find(c=>c.id===g.cat_id)?.label||"",Sub:cats.find(c=>c.id===g.cat_id)?.subs?.find(s=>s.id===g.sub_id)?.label||"",Descripcion:g.descripcion||"",Monto:g.monto,Moneda:g.moneda,TC:g.tc_valor,Monto_ARS:toARS(g,tcRef),Visibilidad:g.visibilidad,Cargado_por:g.cargado_por})),`gastos_${obra.nombre.replace(/\s+/g,"_")}.csv`)}>⬇ CSV</Btn>
      </div>
    </Card>

    {filtered.length===0&&<Card>
      <div style={{textAlign:"center",padding:"40px 0"}}>
        {gastos.length===0
          ?<>
            <div style={{fontSize:44,marginBottom:12}}>💸</div>
            <div style={{fontSize:14,fontWeight:600,color:C.t2,marginBottom:6}}>Sin gastos registrados</div>
            <div style={{fontSize:12,color:C.t3,marginBottom:16}}>Usá el botón <b style={{color:C.green}}>+</b> para cargar el primer gasto de esta obra.</div>
            {(puedoCargar||esAdmin)&&<Btn primary onClick={()=>setShowForm(true)}>+ Cargar primer gasto</Btn>}
          </>
          :<>
            <div style={{fontSize:36,marginBottom:10}}>🔍</div>
            <div style={{fontSize:13,fontWeight:600,color:C.t2,marginBottom:4}}>Sin resultados</div>
            <div style={{fontSize:12,color:C.t3}}>Ningún gasto coincide con los filtros aplicados.</div>
          </>
        }
      </div>
    </Card>}
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {filtered.map(g=>{
        const cat=cats.find(c=>c.id===g.cat_id);
        const sub=cat?.subs?.find(s=>s.id===g.sub_id);
        const comsCount=comentarios.filter(c=>c.gasto_id===g.id).length;
        const tieneCliente=tieneClienteG(g);
        return <div key={g.id} style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:12,padding:"12px 16px",display:"flex",gap:12,alignItems:"center"}}>
          <div style={{width:38,height:38,borderRadius:9,background:(cat?.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{cat?.icon||"📦"}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:600,fontSize:13,color:C.t,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{g.descripcion||sub?.label||cat?.label||"—"}</div>
            <div style={{fontSize:11,color:C.t3,marginTop:2,display:"flex",gap:8,flexWrap:"wrap"}}>
              <span>{g.fecha}</span>
              {cat&&<span>{cat.icon} {cat.label}{sub?` · ${sub.label}`:""}</span>}
              {g.cargado_por&&<span style={{color:C.blue,fontWeight:500}}>👤 {g.cargado_por.split("@")[0]}</span>}
              {esAdmin&&<Tag label={g.visibilidad==="privado"?"🔒 Solo yo":g.visibilidad==="solo_admin"?"👷 Equipo":"🌐"} color={g.visibilidad==="privado"?C.t3:g.visibilidad==="solo_admin"?C.blue:C.green}/>}
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0,minWidth:110}}>
            {(()=>{
              const real=convReal(g);
              const cliente=convCliente(g);
              const diff=cliente-real;
              const hayDiff=tieneClienteG(g)&&Math.abs(diff)>0.5;
              if(esAdmin&&hayDiff){
                return vistaReal
                  ?<>
                    <div style={{fontSize:10,color:C.t3,marginBottom:1}}>🔒 real</div>
                    <div style={{fontSize:15,fontWeight:700,color:C.t2}}>{fmt(real)}</div>
                    <div style={{fontSize:10,color:C.lima}}>🌐 cliente: {fmt(cliente)}</div>
                  </>
                  :<>
                    <div style={{fontSize:10,color:C.t3,marginBottom:1}}>🌐 cliente</div>
                    <div style={{fontSize:15,fontWeight:700,color:C.lima}}>{fmt(cliente)}</div>
                    <div style={{fontSize:10,color:C.t3}}>🔒 real: {fmt(real)}</div>
                    <div style={{fontSize:10,fontWeight:700,color:diff>0?C.green:C.red}}>{diff>=0?"+":""}{fmt(diff)}</div>
                  </>;
              }
              return <div style={{fontSize:15,fontWeight:700,color:cat?.color||C.green}}>{fmt(vistaReal?real:cliente)}</div>;
            })()}
            <div style={{fontSize:10,color:C.t3}}>{g.moneda}{g.tc_valor?` · TC $${g.tc_valor.toLocaleString("es-AR")}`:""}</div>
          </div>
          <div style={{display:"flex",gap:4,flexShrink:0}}>
            <button onClick={()=>setGastoComent(g)} style={{background:"none",border:`1px solid ${C.bd2}`,borderRadius:7,padding:"4px 8px",cursor:"pointer",color:C.t3,fontSize:11}}>{comsCount>0?`💬 ${comsCount}`:"💬"}</button>
            {(esAdmin||g.cargado_por===user?.email)&&<>
              <button onClick={()=>setEditM({...g})} style={{background:"none",border:`1px solid ${C.bd2}`,borderRadius:7,padding:"4px 8px",cursor:"pointer",color:C.t3,fontSize:11}}>✎</button>
              {esAdmin&&<button onClick={()=>deleteG(g.id)} style={{background:"none",border:`1px solid ${C.red}22`,borderRadius:7,padding:"4px 8px",cursor:"pointer",color:C.red,fontSize:11}}>×</button>}
            </>}
          </div>
        </div>;
      })}
    </div>

    {editM&&<Modal title="Editar gasto" onClose={()=>setEditM(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {/* Montos arriba */}
        <div style={{background:"#1a3d0a18",border:`1px solid ${C.green}33`,borderRadius:10,padding:"12px 14px"}}>
          <div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:10}}>💰 Montos</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>🔒 Monto real</div>
              <input style={{...INP,borderColor:C.green+"66"}} type="number" value={editM.monto} onChange={e=>setEditM(m=>({...m,monto:e.target.value}))}/>
            </div>
            <div>
              <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>🌐 Monto cliente <span style={{color:C.t3,fontWeight:400}}>(opc.)</span></div>
              <input style={{...INP,borderColor:C.lima+"66"}} type="number" placeholder="igual al real" value={editM.monto_cliente||""} onChange={e=>setEditM(m=>({...m,monto_cliente:e.target.value}))}/>
            </div>
          </div>
        </div>
        {/* Resto de campos */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
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
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div>
            <select style={SEL} value={editM.moneda} onChange={e=>setEditM(m=>({...m,moneda:e.target.value}))}><option>ARS</option><option>USD</option></select>
          </div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha</div>
            <input style={INP} type="date" value={editM.fecha} onChange={e=>setEditM(m=>({...m,fecha:e.target.value}))}/>
          </div>
          {esAdmin&&<div style={{gridColumn:"1/-1"}}><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Visibilidad</div>
            <select style={SEL} value={editM.visibilidad} onChange={e=>setEditM(m=>({...m,visibilidad:e.target.value}))}>
              <option value="publico">🌐 Público (todos)</option>
              <option value="solo_admin">👷 Solo equipo (arq. + ayudante)</option>
              <option value="privado">🔒 Solo yo (arquitecto)</option>
            </select>
          </div>}
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción</div>
            <input style={INP} placeholder="Ej: Cuadrilla lunes..." value={editM.descripcion||""} onChange={e=>setEditM(m=>({...m,descripcion:e.target.value}))}/>
          </div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={saveEdit} loading={saving}>Guardar</Btn><Btn onClick={()=>setEditM(null)}>Cancelar</Btn></div>
      </div>
    </Modal>}
    {gastoComent&&<ComentariosModal gasto={gastoComent} comentarios={comentarios.filter(c=>c.gasto_id===gastoComent.id)} obra={obra} user={user} esAdmin={esAdmin} toast={toast} reload={reload} onClose={()=>setGastoComent(null)}/>}
  </div>;
}

// ── GASTO RÁPIDO MODAL (FAB) ──────────────────────────────────────────────────
function GastoRapidoModal({user,obra,cats,tcOficial,tcBlue,tcManual,setTcManual,esAdmin,toast,reload,onClose}){
  const [tcTipo,setTcTipo]=useState("oficial");
  const tcProm=tcOficial&&tcBlue?Math.round((tcOficial+tcBlue)/2):null;
  const tcRef=tcOficial||tcManual;
  const tcVal=tcTipo==="oficial"?(tcOficial||tcManual):tcTipo==="blue"?(tcBlue||tcManual):tcTipo==="prom"?(tcProm||tcManual):tcManual;
  const initD=()=>({fecha:todayISO(),cat_id:cats[0]?.id||"",sub_id:cats[0]?.subs?.[0]?.id||"",descripcion:"",monto:"",monto_cliente:"",moneda:"ARS",visibilidad:"publico"});
  const [draft,setDraft]=useState(initD());
  const [saving,setSaving]=useState(false);
  const catD=cats.find(c=>c.id===draft.cat_id)||cats[0];
  const montoNum=parseFloat(draft.monto)||0;

  const save=async()=>{
    if(montoNum<=0)return;setSaving(true);
    const{error}=await supabase.from("gastos").insert({obra_id:obra.id,cat_id:draft.cat_id,sub_id:draft.sub_id||null,fecha:draft.fecha,monto:montoNum,monto_cliente:draft.monto_cliente?parseFloat(draft.monto_cliente):null,moneda:draft.moneda,tc_valor:tcVal,descripcion:draft.descripcion,visibilidad:draft.visibilidad,cargado_por:user.email});
    if(error)toast.error("Error: "+error.message);else{toast.success("Gasto guardado");await reload();onClose();}
    setSaving(false);
  };

  return <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:"fixed",inset:0,background:"rgba(10,30,5,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}>
    <div style={{background:C.bg2,border:`1px solid ${C.bd2}`,borderRadius:20,padding:24,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 8px 40px rgba(0,0,0,.22)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <span style={{fontWeight:700,fontSize:15,color:C.t}}>Cargar gasto rápido</span>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.t3,cursor:"pointer",fontSize:24,lineHeight:1}}>×</button>
      </div>
      <div style={{textAlign:"center",marginBottom:18}}>
        {!esAdmin&&<div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginBottom:4}}>
          <span style={{fontSize:32,color:C.t}}>{draft.moneda==="USD"?"US$":"$"}</span>
          <input type="number" value={draft.monto} onChange={e=>setDraft(d=>({...d,monto:e.target.value}))} placeholder="0" autoFocus onKeyDown={e=>e.key==="Enter"&&save()} style={{background:"transparent",border:"none",outline:"none",fontSize:42,fontWeight:700,color:C.t,width:"160px",textAlign:"center"}}/>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {["ARS","USD"].map(m=><button key={m} onClick={()=>setDraft(d=>({...d,moneda:m}))} style={{padding:"3px 8px",fontSize:10,border:`1px solid ${draft.moneda===m?C.green:C.bd2}`,borderRadius:6,cursor:"pointer",background:draft.moneda===m?C.green:"transparent",color:draft.moneda===m?"#fff":C.t3,fontWeight:600}}>{m}</button>)}
          </div>
        </div>}
        {esAdmin&&<div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:4}}>
          {["ARS","USD"].map(m=><button key={m} onClick={()=>setDraft(d=>({...d,moneda:m}))} style={{padding:"5px 16px",fontSize:12,border:`1px solid ${draft.moneda===m?C.green:C.bd2}`,borderRadius:8,cursor:"pointer",background:draft.moneda===m?C.green:"transparent",color:draft.moneda===m?"#fff":C.t3,fontWeight:600}}>{m}</button>)}
        </div>}
        {!esAdmin&&montoNum>0&&<div style={{fontSize:12,color:C.t3}}>{draft.moneda==="USD"?`≈ ${fmtARS(montoNum*tcVal)} al TC $${tcVal?.toLocaleString("es-AR")}`:`≈ ${fmtUSD(montoNum/tcVal)}`}</div>}
      </div>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:16,flexWrap:"wrap"}}>
        {(esAdmin
          ?[{id:"oficial",label:`Oficial $${tcOficial?.toLocaleString("es-AR")||"—"}`,color:C.green},{id:"blue",label:`Blue $${tcBlue?.toLocaleString("es-AR")||"—"}`,color:C.lima},{id:"prom",label:`Prom. $${tcProm?.toLocaleString("es-AR")||"—"}`,color:C.blue},{id:"manual",label:"Manual",color:C.t2}]
          :[{id:"oficial",label:`Oficial $${tcOficial?.toLocaleString("es-AR")||"—"}`,color:C.green},{id:"blue",label:`Blue $${tcBlue?.toLocaleString("es-AR")||"—"}`,color:C.lima},{id:"prom",label:`Prom. $${tcProm?.toLocaleString("es-AR")||"—"}`,color:C.blue}]
        ).map(t=>(
          <button key={t.id} onClick={()=>setTcTipo(t.id)} style={{padding:"5px 12px",fontSize:11,border:`1px solid ${tcTipo===t.id?t.color:C.bd2}`,borderRadius:20,cursor:"pointer",background:tcTipo===t.id?t.color+"18":"transparent",color:tcTipo===t.id?t.color:C.t2,fontWeight:tcTipo===t.id?700:400}}>{t.label}</button>
        ))}
        {tcTipo==="manual"&&esAdmin&&<input type="number" value={tcManual} onChange={e=>setTcManual(+e.target.value)} style={{...INP,width:88,padding:"4px 8px",fontSize:11}}/>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        {esAdmin&&<div style={{gridColumn:"1/-1",background:"#1a3d0a12",border:`1px solid ${C.green}33`,borderRadius:10,padding:"12px 14px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.green,marginBottom:8}}>💰 Montos</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>🔒 Monto real <span style={{color:C.t3,fontWeight:400}}>(solo vos)</span></div>
              <input style={{...INP,borderColor:C.green+"66"}} type="number" placeholder="0" value={draft.monto} autoFocus onChange={e=>setDraft(d=>({...d,monto:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&save()}/>
              {parseFloat(draft.monto)>0&&<div style={{fontSize:10,color:C.t3,marginTop:3}}>{draft.moneda==="USD"?`≈ ${fmtARS(parseFloat(draft.monto)*tcVal)}`:`≈ ${fmtUSD(parseFloat(draft.monto)/tcVal)}`}</div>}
            </div>
            <div>
              <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>🌐 Monto cliente <span style={{color:C.t3,fontWeight:400}}>(opc.)</span></div>
              <input style={{...INP,borderColor:C.lima+"66"}} type="number" placeholder={draft.monto||"igual al real"} value={draft.monto_cliente} onChange={e=>setDraft(d=>({...d,monto_cliente:e.target.value}))}/>
              {parseFloat(draft.monto_cliente)>0&&parseFloat(draft.monto)>0&&<div style={{fontSize:10,marginTop:3,color:parseFloat(draft.monto_cliente)>parseFloat(draft.monto)?C.lima:C.red,fontWeight:600}}>
                Dif: {parseFloat(draft.monto_cliente)>parseFloat(draft.monto)?"+":""}{fmtARS(parseFloat(draft.monto_cliente)-parseFloat(draft.monto))}
              </div>}
            </div>
          </div>
        </div>}
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
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Descripción (opcional)</div>
        <input style={INP} placeholder="Ej: Cuadrilla lunes..." value={draft.descripcion} onChange={e=>setDraft(d=>({...d,descripcion:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&save()}/>
      </div>
      <Btn primary full onClick={save} loading={saving} disabled={montoNum<=0}>
        {saving?"Guardando...":"Guardar gasto"}
      </Btn>
      <div style={{textAlign:"center",fontSize:11,color:C.t3,marginTop:8}}>TC al guardar: ${tcVal?.toLocaleString("es-AR")} · Enter para guardar</div>
    </div>
  </div>;
}

// ── COMENTARIOS MODAL ─────────────────────────────────────────────────────────
function ComentariosModal({gasto,comentarios,obra,user,esAdmin,toast,reload,onClose}){
  const [texto,setTexto]=useState("");
  const [saving,setSaving]=useState(false);
  const [visib,setVisib]=useState("publico");
  const VISIB_MAP={"publico":"publico","solo_admin":"equipo","privado":"privado"};
  const save=async()=>{
    if(!texto.trim())return;setSaving(true);
    const{error}=await supabase.from("comentarios_gasto").insert({
      obra_id:obra.id,
      gasto_id:gasto.id,
      user_id:user.id,
      texto:texto.trim(),
      visibilidad:VISIB_MAP[visib]||visib,
      autor:user.email,
    });
    if(error){toast.error("Error al guardar: "+error.message);setSaving(false);return;}
    toast.success("Comentario guardado");
    setTexto("");setSaving(false);
    await reload();
  };
  const deleteC=async(id)=>{
    const{error}=await supabase.from("comentarios_gasto").delete().eq("id",id);
    if(error)toast.error("Error: "+error.message);else{toast.success("Comentario eliminado");await reload();}
  };
  return <Modal title={`Comentarios — ${gasto.descripcion||"Gasto"}`} onClose={onClose}>
    <div style={{display:"flex",flexDirection:"column",gap:12,maxHeight:"60vh",overflow:"auto"}}>
      {comentarios.length===0&&<div style={{textAlign:"center",padding:"16px 0",color:C.t3,fontSize:12}}>Sin comentarios aún</div>}
      {comentarios.map(c=>{
        const esPropio=c.user_id===user.id;
        return <div key={c.id} style={{background:esPropio?C.limaBg:C.bg3,borderRadius:10,padding:"10px 14px",border:`1px solid ${esPropio?C.lima+"44":C.bd}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={{fontSize:11,fontWeight:600,color:esPropio?C.green:C.t2}}>
              {esPropio?"Yo":(c.autor||"").split("@")[0]||"Usuario"}
            </span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:10,color:C.t3}}>{c.created_at?.slice(0,10)}{c.visibilidad!=="publico"&&<span style={{marginLeft:6,color:C.amber}}>🔒</span>}</span>
              {(esPropio||esAdmin)&&<button onClick={()=>deleteC(c.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.red,fontSize:14,lineHeight:1,padding:"0 2px"}} title="Eliminar">×</button>}
            </div>
          </div>
          <div style={{fontSize:13,color:C.t,lineHeight:1.5}}>{c.texto}</div>
        </div>;
      })}
      <textarea style={{...INP,minHeight:80,resize:"vertical"}} placeholder="Escribí un comentario..." value={texto} onChange={e=>setTexto(e.target.value)}/>
      {esAdmin&&<div style={{display:"flex",gap:6}}>
        {[{v:"publico",label:"🌐 Todos"},{v:"solo_admin",label:"👷 Equipo"},{v:"privado",label:"🔒 Solo yo"}].map(o=>(
          <button key={o.v} onClick={()=>setVisib(o.v)} style={{padding:"4px 10px",fontSize:11,border:`1px solid ${visib===o.v?C.green:C.bd2}`,borderRadius:16,cursor:"pointer",background:visib===o.v?C.green+"18":"transparent",color:visib===o.v?C.green:C.t2}}>{o.label}</button>
        ))}
      </div>}
      <div style={{display:"flex",gap:8}}>
        <Btn primary onClick={save} loading={saving} disabled={!texto.trim()}>Guardar nota</Btn>
        <Btn onClick={onClose}>Cerrar</Btn>
      </div>
    </div>
  </Modal>;
}

// ── PRESUPUESTO TAB ────────────────────────────────────────────────────────────
function PresupuestoTab({obra,gastos,presup,tcRef,cats,toast,reload,monedaVista,inflData,fetchIPC}){
  const [modal,setModal]=useState(false);
  const [draft,setDraft]=useState({cat_id:cats[0]?.id||"",monto:"",moneda:"ARS"});
  const [saving,setSaving]=useState(false);
  const [showInfl,setShowInfl]=useState(false);
  const enUSD=monedaVista==="USD";
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);

  // ── Conversión presupuesto a moneda de vista ──
  // p = registro de la tabla presupuestos {monto, moneda}
  const pToMV=p=>{
    if(enUSD) return p.moneda==="USD"?p.monto:p.monto/tcRef;
    return p.moneda==="USD"?p.monto*tcRef:p.monto;
  };
  // Gasto a moneda de vista
  const gToMV=g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef);

  // ── UNA SOLA FUENTE DE VERDAD: presupuesto total ──
  // Regla: si hay presupuestos por categoría → esos mandan.
  //        Si no → usa presupuesto_total de la obra.
  //        En ningún caso se suman ambos.
  const totalPMV=presup.length>0
    ? presup.reduce((s,p)=>s+pToMV(p),0)
    : obra.presupuesto_total
      ? (obra.moneda_presupuesto==="USD"
          ?(enUSD?obra.presupuesto_total:obra.presupuesto_total*tcRef)
          :(enUSD?obra.presupuesto_total/tcRef:obra.presupuesto_total))
      : 0;

  const totalEMV=gastos.reduce((s,g)=>s+gToMV(g),0);
  const disponibleMV=totalPMV-totalEMV;
  // pct = ejecutado / presupuesto (no al revés, no invertido)
  const pct=totalPMV>0?Math.round((totalEMV/totalPMV)*100):null;
  const pctCapped=pct!==null?Math.min(pct,100):null;
  const colorSemaforo=pct===null?C.t3:pct>=100?C.red:pct>=80?C.amber:C.green;

  // Presup. base ARS para cálculo de inflación
  const presupBaseARS=useMemo(()=>{
    if(presup.length>0) return presup.reduce((s,p)=>s+(p.moneda==="USD"?p.monto*tcRef:p.monto),0);
    if(obra.presupuesto_total) return obra.moneda_presupuesto==="USD"?obra.presupuesto_total*tcRef:obra.presupuesto_total;
    return 0;
  },[presup,obra,tcRef]);

  const calcInflacion=useMemo(()=>{
    if(!inflData||!obra.created_at)return null;
    const inicio=obra.created_at.slice(0,7);
    const ipcFilt=inflData.filter(x=>x.fecha?.slice(0,7)>=inicio).sort((a,b)=>a.fecha>b.fecha?1:-1);
    if(!ipcFilt.length)return null;
    const serie=[];let acum=1;
    ipcFilt.forEach(x=>{acum*=(1+x.valor/100);serie.push({ym:x.fecha.slice(0,7),ipc:x.valor,acum:Math.round((acum-1)*100*10)/10,factor:acum});});
    return serie;
  },[inflData,obra.created_at]);
  const inflAcum=calcInflacion?calcInflacion[calcInflacion.length-1]?.acum:null;
  const presupAjustado=presupBaseARS>0&&inflAcum!=null?Math.round(presupBaseARS*(1+inflAcum/100)):null;

  const save=async()=>{
    if(!draft.monto||parseFloat(draft.monto)<=0)return;setSaving(true);
    const ex=presup.find(p=>p.cat_id===draft.cat_id);
    if(ex){const{error}=await supabase.from("presupuestos").update({monto:parseFloat(draft.monto),moneda:draft.moneda}).eq("id",ex.id);if(error){toast.error("Error");setSaving(false);return;}}
    else{const{error}=await supabase.from("presupuestos").insert({obra_id:obra.id,cat_id:draft.cat_id,monto:parseFloat(draft.monto),moneda:draft.moneda});if(error){toast.error("Error");setSaving(false);return;}}
    toast.success("Presupuesto guardado");await reload();setModal(false);setSaving(false);
  };
  const deleteP=async(id)=>{const{error}=await supabase.from("presupuestos").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}};

  const doExport=()=>{
    const rows=cats.map(cat=>{
      const p=presup.find(x=>x.cat_id===cat.id);
      const ejMV=gastos.filter(g=>g.cat_id===cat.id).reduce((s,g)=>s+gToMV(g),0);
      const pMV=p?pToMV(p):0;
      const pctCat=pMV>0?Math.round((ejMV/pMV)*100):null;
      return{Categoria:cat.label,Presupuesto_orig:p?p.monto:"—",Moneda:p?p.moneda:"—",[`Presupuesto_${monedaVista}`]:pMV>0?Math.round(pMV):"—",[`Ejecutado_${monedaVista}`]:Math.round(ejMV),[`Diferencia_${monedaVista}`]:pMV>0?Math.round(pMV-ejMV):"—",Avance:pctCat!==null?pctCat+"%":"—"};
    }).filter(r=>r[`Ejecutado_${monedaVista}`]>0||r[`Presupuesto_${monedaVista}`]!=="—");
    rows.push({Categoria:"TOTAL",[`Presupuesto_${monedaVista}`]:Math.round(totalPMV),[`Ejecutado_${monedaVista}`]:Math.round(totalEMV),[`Diferencia_${monedaVista}`]:Math.round(disponibleMV),Avance:pct!==null?pct+"%":"—"});
    exportCSV(rows,`presupuesto_${obra.nombre.replace(/\s+/g,"_")}.csv`);
  };

  return <div className="fu">
    {/* Encabezado */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:8}}>
      <div>
        <div style={{fontSize:17,fontWeight:700,color:C.t}}>📐 Presupuesto de obra</div>
        <div style={{fontSize:12,color:C.t3,marginTop:2}}>{obra.nombre} · {monedaVista}</div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn small onClick={doExport}>⬇ CSV</Btn>
        <Btn primary onClick={()=>{setDraft({cat_id:cats[0]?.id||"",monto:"",moneda:"ARS"});setModal(true);}}>+ Agregar categoría</Btn>
      </div>
    </div>

    {/* ── BLOQUE CENTRAL: un solo número de presupuesto ── */}
    <Card style={{marginBottom:16,borderLeft:`4px solid ${colorSemaforo}`}}>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"center",marginBottom:totalPMV>0?16:0}}>
        {/* Presupuesto total */}
        <div style={{flex:"1 1 150px"}}>
          <div style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:".08em",fontWeight:600,marginBottom:5}}>
            Presupuesto total {presup.length>0?"(suma de categorías)":"(general de obra)"}
          </div>
          <div style={{fontSize:26,fontWeight:800,color:C.blue,letterSpacing:"-.03em"}}>{totalPMV>0?fmt(totalPMV):"Sin definir"}</div>
          {presup.length>0&&obra.presupuesto_total>0&&<div style={{fontSize:11,color:C.t3,marginTop:3}}>
            Presup. original de obra: {fmtM(obra.presupuesto_total,obra.moneda_presupuesto)} (reemplazado por categorías)
          </div>}
        </div>
        {/* Ejecutado */}
        <div style={{flex:"1 1 130px"}}>
          <div style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:".08em",fontWeight:600,marginBottom:5}}>Gastado hasta hoy</div>
          <div style={{fontSize:26,fontWeight:800,color:C.green,letterSpacing:"-.03em"}}>{fmt(totalEMV)}</div>
          <div style={{fontSize:11,color:C.t3,marginTop:3}}>{gastos.length} movimiento{gastos.length!==1?"s":""}</div>
        </div>
        {/* Disponible */}
        {totalPMV>0&&<div style={{flex:"1 1 130px"}}>
          <div style={{fontSize:10,color:C.t3,textTransform:"uppercase",letterSpacing:".08em",fontWeight:600,marginBottom:5}}>
            {disponibleMV>=0?"Disponible":"Excedido en"}
          </div>
          <div style={{fontSize:26,fontWeight:800,color:disponibleMV>=0?C.lima:C.red,letterSpacing:"-.03em"}}>{fmt(Math.abs(disponibleMV))}</div>
          {pct!==null&&<div style={{fontSize:11,color:colorSemaforo,fontWeight:700,marginTop:3}}>
            {pct<=100?`Usaste el ${pct}% del presupuesto`:`Superaste en ${pct-100}%`}
          </div>}
        </div>}
      </div>

      {/* Barra de progreso — siempre de 0 a 100% */}
      {totalPMV>0&&pct!==null&&<div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.t3,marginBottom:4}}>
          <span>0%</span>
          <span style={{fontWeight:700,color:colorSemaforo,fontSize:13}}>
            {pct<=100?`${pct}% ejecutado`:pct===200?"Presupuesto duplicado":`${pct}% (excedido)`}
          </span>
          <span>100%</span>
        </div>
        <div style={{height:16,borderRadius:8,background:C.bg3,overflow:"hidden",position:"relative"}}>
          <div style={{
            height:"100%",
            borderRadius:8,
            background:colorSemaforo,
            width:`${pctCapped}%`,
            transition:"width .7s ease",
            position:"relative",
          }}/>
          {pct>100&&<div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",paddingLeft:8}}>
            <span style={{fontSize:10,color:"#fff",fontWeight:700}}>¡Presupuesto superado!</span>
          </div>}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.t3,marginTop:4}}>
          <span>Gastado: <b style={{color:C.t}}>{fmt(totalEMV)}</b></span>
          <span>Presupuesto: <b style={{color:C.t}}>{fmt(totalPMV)}</b></span>
        </div>
      </div>}
    </Card>

    {/* ── TABLA POR CATEGORÍA ── */}
    <Card style={{marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:14}}>Desglose por categoría</div>
      {presup.length===0&&gastos.length===0&&<div style={{textAlign:"center",padding:"24px 0",color:C.t3,fontSize:12}}>
        No hay presupuestos por categoría definidos.<br/>Presupuesto general de obra: <b style={{color:C.t}}>{obra.presupuesto_total>0?fmtM(obra.presupuesto_total,obra.moneda_presupuesto):"Sin definir"}</b>
      </div>}
      {(presup.length>0||gastos.length>0)&&<div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:480}}>
          <thead>
            <tr style={{borderBottom:`2px solid ${C.bd2}`}}>
              <th style={{padding:"8px 12px",textAlign:"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>Categoría</th>
              <th style={{padding:"8px 12px",textAlign:"right",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>Presupuesto</th>
              <th style={{padding:"8px 12px",textAlign:"right",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>Gastado</th>
              <th style={{padding:"8px 12px",textAlign:"right",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>Saldo</th>
              <th style={{padding:"8px 12px",textAlign:"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em",minWidth:140}}>Avance</th>
              <th style={{width:28}}/>
            </tr>
          </thead>
          <tbody>
            {cats.map(cat=>{
              const p=presup.find(x=>x.cat_id===cat.id);
              const ejMV=gastos.filter(g=>g.cat_id===cat.id).reduce((s,g)=>s+gToMV(g),0);
              if(!p&&ejMV===0)return null;
              const pMV=p?pToMV(p):0;
              // pct = gastado / presupuesto (jamás al revés)
              const pctCat=pMV>0?Math.round((ejMV/pMV)*100):null;
              const pctCapCat=pctCat!==null?Math.min(pctCat,100):null;
              const saldo=pMV-ejMV;
              const colCat=pctCat===null?C.t3:pctCat>=100?C.red:pctCat>=80?C.amber:C.green;
              return <tr key={cat.id} style={{borderBottom:`1px solid ${C.bd}`}}>
                <td style={{padding:"12px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{width:32,height:32,borderRadius:9,background:(cat.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{cat.icon}</span>
                    <span style={{fontWeight:600,color:C.t,fontSize:13}}>{cat.label}</span>
                  </div>
                </td>
                <td style={{padding:"12px",textAlign:"right",color:C.t2,whiteSpace:"nowrap"}}>{p?fmt(pMV):<span style={{color:C.t3,fontSize:11}}>—</span>}</td>
                <td style={{padding:"12px",textAlign:"right",fontWeight:700,color:cat.color||C.green,whiteSpace:"nowrap"}}>{fmt(ejMV)}</td>
                <td style={{padding:"12px",textAlign:"right",whiteSpace:"nowrap",fontWeight:600,color:pMV>0?(saldo>=0?C.green:C.red):C.t3}}>{pMV>0?fmt(saldo):<span style={{color:C.t3,fontSize:11}}>—</span>}</td>
                <td style={{padding:"12px"}}>
                  {pctCat!==null?<div>
                    <div style={{height:8,borderRadius:4,background:C.bg3,overflow:"hidden",marginBottom:4}}>
                      <div style={{height:"100%",borderRadius:4,background:colCat,width:`${pctCapCat}%`,transition:"width .5s ease"}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:11,fontWeight:700,color:colCat}}>
                        {pctCat<=100?`${pctCat}%`:`${pctCat}% ⚠`}
                      </span>
                      {pctCat>=100&&<span style={{fontSize:10,color:C.red,fontWeight:600}}>Excedido</span>}
                    </div>
                  </div>:<span style={{fontSize:11,color:C.t3}}>Sin presupuesto</span>}
                </td>
                <td style={{padding:"12px",textAlign:"right"}}>
                  {p&&<button onClick={()=>deleteP(p.id)} title="Quitar presupuesto de esta categoría" style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:16,lineHeight:1}}>×</button>}
                </td>
              </tr>;
            })}
          </tbody>
          {/* Fila TOTAL — mismos números que las cards de arriba */}
          <tfoot>
            <tr style={{borderTop:`2px solid ${C.bd2}`,background:C.bg3}}>
              <td style={{padding:"12px",fontWeight:800,color:C.t,fontSize:13}}>TOTAL</td>
              <td style={{padding:"12px",textAlign:"right",fontWeight:700,color:C.blue,fontSize:13}}>{totalPMV>0?fmt(totalPMV):"—"}</td>
              <td style={{padding:"12px",textAlign:"right",fontWeight:700,color:C.green,fontSize:13}}>{fmt(totalEMV)}</td>
              <td style={{padding:"12px",textAlign:"right",fontWeight:700,color:disponibleMV>=0?C.green:C.red,fontSize:13}}>{totalPMV>0?fmt(disponibleMV):"—"}</td>
              <td style={{padding:"12px"}}>
                {pct!==null&&<div>
                  <div style={{height:8,borderRadius:4,background:C.bg3,overflow:"hidden",marginBottom:4}}>
                    <div style={{height:"100%",borderRadius:4,background:colorSemaforo,width:`${pctCapped}%`,transition:"width .7s ease"}}/>
                  </div>
                  <span style={{fontSize:11,fontWeight:800,color:colorSemaforo}}>{pct}%</span>
                </div>}
              </td>
              <td/>
            </tr>
          </tfoot>
        </table>
      </div>}
    </Card>

    {/* ── AJUSTE POR INFLACIÓN (colapsable) ── */}
    <Card style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:C.t}}>📉 Ajuste por inflación</div>
          <div style={{fontSize:11,color:C.t3,marginTop:2}}>Desde inicio de obra ({obra.created_at?.slice(0,7)}) · IPC INDEC</div>
        </div>
        <Btn small onClick={()=>{if(!inflData)fetchIPC();setShowInfl(v=>!v);}}>
          {showInfl?"Ocultar":inflData?"Ver tabla":"Cargar datos IPC"}
        </Btn>
      </div>
      {inflData&&<div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:14}}>
        {presupBaseARS>0&&<div style={{flex:"1 1 160px",background:C.bg3,borderRadius:10,padding:"12px 14px"}}>
          <div style={{fontSize:10,color:C.t3,marginBottom:4,fontWeight:700,textTransform:"uppercase"}}>Presup. original (ARS)</div>
          <div style={{fontSize:18,fontWeight:700,color:C.blue}}>{fmtARS(presupBaseARS)}</div>
          <div style={{fontSize:10,color:C.t3,marginTop:2}}>al inicio de obra</div>
        </div>}
        {presupAjustado&&<div style={{flex:"1 1 160px",background:C.bg2,borderRadius:10,padding:"12px 14px",border:`2px solid ${C.amber}`}}>
          <div style={{fontSize:10,color:C.amber,marginBottom:4,fontWeight:700,textTransform:"uppercase"}}>Presup. ajustado hoy (ARS)</div>
          <div style={{fontSize:18,fontWeight:700,color:C.amber}}>{fmtARS(presupAjustado)}</div>
          <div style={{fontSize:10,color:C.t3,marginTop:2}}>+{fmtARS(presupAjustado-presupBaseARS)} vs original · {inflAcum}% IPC acum.</div>
        </div>}
      </div>}
      {!inflData&&<div style={{fontSize:12,color:C.t3,marginTop:10}}>
        Presioná "Cargar datos IPC" para ver cuánto debería valer hoy el presupuesto ajustado por inflación.
      </div>}
      {showInfl&&calcInflacion&&calcInflacion.length>0&&<div style={{marginTop:14,overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:480}}>
          <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
            {["Mes","IPC mes","IPC acumulado","Presup. ajustado","Diferencia vs original"].map((h,i)=><th key={i} style={{padding:"6px 10px",textAlign:i>=2?"right":"left",fontSize:9,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em",whiteSpace:"nowrap"}}>{h}</th>)}
          </tr></thead>
          <tbody>{[...calcInflacion].reverse().slice(0,18).map(r=>{
            const ajust=presupBaseARS>0?Math.round(presupBaseARS*r.factor):null;
            const incr=ajust&&presupBaseARS>0?ajust-presupBaseARS:null;
            return <tr key={r.ym} style={{borderBottom:`1px solid ${C.bd}`}}>
              <td style={{padding:"7px 10px",fontWeight:600,color:C.t}}>{r.ym}</td>
              <td style={{padding:"7px 10px",color:r.ipc>10?C.red:r.ipc>5?C.amber:C.t2}}>{r.ipc}%</td>
              <td style={{padding:"7px 10px",textAlign:"right",fontWeight:700,color:C.amber}}>{r.acum}%</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.t}}>{ajust?fmtARS(ajust):"—"}</td>
              <td style={{padding:"7px 10px",textAlign:"right",color:C.red}}>{incr?"+"+fmtARS(incr):"—"}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>}
    </Card>

    {/* Modal agregar */}
    {modal&&<Modal title="Agregar / actualizar presupuesto" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{background:C.bg3,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.t3,lineHeight:1.6}}>
          Al cargar presupuestos por categoría, <b style={{color:C.t}}>el total de esas categorías reemplaza al presupuesto general de la obra</b>. Todos los porcentajes se calculan sobre este total.
        </div>
        <div>
          <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Categoría</div>
          <select style={SEL} value={draft.cat_id} onChange={e=>setDraft(d=>({...d,cat_id:e.target.value}))}>
            {cats.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 90px",gap:8}}>
          <div>
            <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Monto</div>
            <input style={INP} type="number" placeholder="0" autoFocus value={draft.monto} onChange={e=>setDraft(d=>({...d,monto:e.target.value}))}/>
          </div>
          <div>
            <div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Moneda</div>
            <select style={SEL} value={draft.moneda} onChange={e=>setDraft(d=>({...d,moneda:e.target.value}))}>
              <option>ARS</option><option>USD</option>
            </select>
          </div>
        </div>
        {presup.find(p=>p.cat_id===draft.cat_id)&&<div style={{background:C.amber+"18",border:`1px solid ${C.amber}33`,borderRadius:8,padding:"8px 12px",fontSize:12,color:C.amber}}>
          ⚠ Esta categoría ya tiene presupuesto. Se va a actualizar con el nuevo monto.
        </div>}
        <div style={{display:"flex",gap:8}}>
          <Btn primary onClick={save} loading={saving} disabled={!draft.monto||parseFloat(draft.monto)<=0}>Guardar</Btn>
          <Btn onClick={()=>setModal(false)}>Cancelar</Btn>
        </div>
      </div>
    </Modal>}
  </div>;
}

// ── LIGHTBOX (CORREGIDO — imagen centrada, scroll deshabilitado) ───────────────
function LightboxViewer({foto,fotos,onClose,onNav}){
  const idx=fotos.findIndex(f=>f.id===foto.id);
  const hasPrev=idx>0,hasNext=idx<fotos.length-1;

  useEffect(()=>{
    const h=e=>{
      if(e.key==="Escape")onClose();
      if(e.key==="ArrowLeft"&&hasPrev)onNav(fotos[idx-1]);
      if(e.key==="ArrowRight"&&hasNext)onNav(fotos[idx+1]);
    };
    window.addEventListener("keydown",h);
    // Prevenir scroll del body
    const prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{window.removeEventListener("keydown",h);document.body.style.overflow=prev;};
  },[idx,hasPrev,hasNext,onClose]);

  const download=async()=>{
    try{const res=await fetch(foto.url);const blob=await res.blob();const ext=foto.url.split(".").pop().split("?")[0]||"jpg";const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${foto.titulo||"foto"}.${ext}`;a.click();}
    catch{window.open(foto.url,"_blank");}
  };

  return (
    <div
      onClick={onClose}
      style={{
        position:"fixed",left:0,top:0,right:0,bottom:0,
        zIndex:9000,
        background:"rgba(0,0,0,.94)",
        display:"flex",
        flexDirection:"column",
        overflow:"hidden",
      }}
    >
      {/* Header */}
      <div
        onClick={e=>e.stopPropagation()}
        style={{
          flexShrink:0,
          padding:"12px 16px",
          display:"flex",justifyContent:"space-between",alignItems:"center",
          background:"linear-gradient(to bottom, rgba(0,0,0,.75), transparent)",
          zIndex:10,
        }}
      >
        <div>
          <div style={{color:"#fff",fontWeight:700,fontSize:14}}>{foto.titulo}</div>
          <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>
            {foto.fecha}{foto.etapa&&` · ${foto.etapa}`}{fotos.length>1&&` · ${idx+1}/${fotos.length}`}
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={download} title="Descargar" style={{background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.3)",borderRadius:8,width:42,height:42,cursor:"pointer",color:"#fff",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>⬇</button>
          <button onClick={()=>window.open(foto.url,"_blank")} title="Abrir en nueva pestaña" style={{background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.3)",borderRadius:8,width:42,height:42,cursor:"pointer",color:"#fff",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>⤢</button>
          <button onClick={onClose} title="Cerrar (ESC)" style={{background:"rgba(200,40,40,.85)",border:"none",borderRadius:8,width:42,height:42,cursor:"pointer",color:"#fff",fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>×</button>
        </div>
      </div>

      {/* Zona imagen — ocupa todo el espacio restante */}
      <div
        onClick={onClose}
        style={{
          flex:1,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          padding:"0 60px",
          minHeight:0,
          cursor:"pointer",
        }}
      >
        <img
          src={foto.url}
          alt={foto.titulo}
          onClick={e=>e.stopPropagation()}
          style={{
            maxWidth:"100%",
            maxHeight:"100%",
            objectFit:"contain",
            borderRadius:8,
            cursor:"default",
            userSelect:"none",
            boxShadow:"0 8px 40px rgba(0,0,0,.6)",
            display:"block",
          }}
        />
      </div>

      {/* Hint footer */}
      <div style={{flexShrink:0,textAlign:"center",padding:"10px 0 16px",color:"rgba(255,255,255,.3)",fontSize:11,pointerEvents:"none"}}>
        Click en el fondo para cerrar · ESC{fotos.length>1?" · ← → navegar":""}
      </div>

      {/* Botones prev/next — posicionados con absolute sobre el overlay */}
      {hasPrev&&<button
        onClick={e=>{e.stopPropagation();onNav(fotos[idx-1]);}}
        style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.3)",borderRadius:10,width:48,height:48,cursor:"pointer",color:"#fff",fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",zIndex:9010}}
      >‹</button>}
      {hasNext&&<button
        onClick={e=>{e.stopPropagation();onNav(fotos[idx+1]);}}
        style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.3)",borderRadius:10,width:48,height:48,cursor:"pointer",color:"#fff",fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",zIndex:9010}}
      >›</button>}
    </div>
  );
}

// ── FOTOS TAB ─────────────────────────────────────────────────────────────────
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
  const porEtapa=etapas.reduce((acc,e)=>{acc[e]=filtradas.filter(f=>f.etapa===e);return acc;},{});
  const sinEtapa=filtradas.filter(f=>!f.etapa);
  const downloadFoto=async(f,e)=>{e.stopPropagation();try{const res=await fetch(f.url);const blob=await res.blob();const ext=f.url.split(".").pop().split("?")[0]||"jpg";const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${f.titulo||"foto"}.${ext}`;a.click();}catch{window.open(f.url,"_blank");}};

  const FotoCard=({f})=>(
    <div style={{background:C.bg2,border:`1px solid ${C.bd}`,borderRadius:14,overflow:"hidden",boxShadow:"0 1px 6px rgba(42,80,28,.07)"}}>
      <div style={{position:"relative",cursor:"zoom-in"}} onClick={()=>setLightbox(f)}>
        <img src={f.url} alt={f.titulo} style={{width:"100%",height:175,objectFit:"cover",display:"block"}}/>
        {f.etapa&&<div style={{position:"absolute",top:8,left:8}}><Tag label={f.etapa} color={C.green}/></div>}
        <div style={{position:"absolute",top:8,right:8,display:"flex",gap:4}}>
          <button onClick={e=>downloadFoto(f,e)} title="Descargar" style={{background:"rgba(0,0,0,.55)",border:"none",borderRadius:6,padding:"4px 8px",cursor:"pointer",color:"#fff",fontSize:12}}>⬇</button>
          {puedoCargar&&<button onClick={e=>{e.stopPropagation();deleteFoto(f);}} style={{background:"rgba(0,0,0,.55)",border:"none",borderRadius:6,padding:"3px 8px",cursor:"pointer",color:"#fff",fontSize:12}}>×</button>}
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.55))",padding:"20px 12px 8px"}}>
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

    {etapas.length>0&&<div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
      {["todas",...etapas].map(e=><button key={e} onClick={()=>setEtapaF(e)} style={{padding:"5px 14px",fontSize:12,border:`1px solid ${etapaF===e?C.green:C.bd2}`,borderRadius:20,cursor:"pointer",background:etapaF===e?C.green+"18":"transparent",color:etapaF===e?C.green:C.t2,fontWeight:etapaF===e?700:400,display:"flex",alignItems:"center",gap:5}}>
        {e==="todas"?"📷 Todas":e}
        <span style={{fontSize:10,color:etapaF===e?C.green:C.t3}}>{e==="todas"?fotos.length:fotos.filter(f=>f.etapa===e).length}</span>
      </button>)}
    </div>}

    {filtradas.length===0&&<Card><div style={{textAlign:"center",padding:"48px 0"}}><div style={{fontSize:44,marginBottom:12}}>📷</div><div style={{fontSize:14,fontWeight:600,color:C.t2,marginBottom:6}}>Sin fotos cargadas</div><div style={{fontSize:12,color:C.t3,marginBottom:16}}>Subí fotos para registrar el avance</div>{puedoCargar&&<Btn primary onClick={()=>setModal(true)}>+ Subir primera foto</Btn>}</div></Card>}

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

    {lightbox&&<LightboxViewer foto={lightbox} fotos={filtradas} onClose={()=>setLightbox(null)} onNav={setLightbox}/>}

    {modal&&<Modal title="Subir foto" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <div onClick={()=>fileRef.current.click()} style={{border:`2px dashed ${draft.preview?C.green:C.bd2}`,borderRadius:12,padding:"24px 16px",textAlign:"center",cursor:"pointer",background:draft.preview?C.bg3:"transparent"}}>
          {draft.preview?<><img src={draft.preview} alt="" style={{maxHeight:150,maxWidth:"100%",borderRadius:8,objectFit:"contain",marginBottom:8}}/><div style={{fontSize:12,color:C.green,fontWeight:600}}>✓ {draft.nombre}</div></>:<><div style={{fontSize:40,marginBottom:8}}>📷</div><div style={{fontSize:13,fontWeight:600,color:C.t2}}>Seleccionar foto</div><div style={{fontSize:11,color:C.t3}}>JPG, PNG, WEBP</div></>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Título *</div><input style={INP} placeholder="Ej: Losa planta baja" value={draft.titulo} onChange={e=>setDraft(d=>({...d,titulo:e.target.value}))}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Fecha</div><input style={INP} type="date" value={draft.fecha} onChange={e=>setDraft(d=>({...d,fecha:e.target.value}))}/></div>
          <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Etapa <span style={{color:C.t3,fontWeight:400}}>(libre)</span></div><input style={INP} list="etapas-dl" placeholder="Ej: Estructura, Pintura..." value={draft.etapa} onChange={e=>setDraft(d=>({...d,etapa:e.target.value}))}/><datalist id="etapas-dl">{[...new Set(["Demolición","Excavación","Estructura","Mampostería","Instalaciones","Carpintería","Terminaciones","Exterior","Final",...etapas])].map(e=><option key={e} value={e}/>)}</datalist></div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn primary onClick={save} disabled={!draft.file||!draft.titulo.trim()} loading={saving}>Subir</Btn><Btn onClick={()=>setModal(false)}>Cancelar</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── HITOS TAB ─────────────────────────────────────────────────────────────────
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
  const updateEstado=async(id,nuevoEstado)=>{
    if(nuevoEstado==="en_progreso"){setProgresoModal({id,progreso:25});return;}
    const upd={estado:nuevoEstado,progreso:nuevoEstado==="completado"?100:0};
    const{error}=await supabase.from("hitos").update(upd).eq("id",id);
    if(error)toast.error("Error");else await reload();
  };
  const confirmarProgreso=async()=>{
    if(!progresoModal)return;
    const{error}=await supabase.from("hitos").update({estado:"en_progreso",progreso:progresoModal.progreso}).eq("id",progresoModal.id);
    if(error)toast.error("Error");else{toast.success("Progreso actualizado");await reload();}
    setProgresoModal(null);
  };
  const deleteH=async(id)=>{const{error}=await supabase.from("hitos").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}};
  const [progresoModal,setProgresoModal]=useState(null);
  const EC={pendiente:{color:C.t3,label:"Pendiente",dot:"○"},en_progreso:{color:C.amber,label:"En progreso",dot:"◑"},completado:{color:C.green,label:"Completado",dot:"●"}};
  const completados=hitos.filter(h=>h.estado==="completado").length;
  const enProgresoHits=hitos.filter(h=>h.estado==="en_progreso");
  const pctParcial=enProgresoHits.reduce((s,h)=>s+(h.progreso||0)/100,0);
  const pct=hitos.length>0?Math.round(((completados+pctParcial)/hitos.length)*100):0;

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
      <div style={{fontSize:11,color:pct===100?C.green:C.t3,textAlign:"right",fontWeight:600}}>{pct}%{pct===100?" ✓ Obra finalizada":""}</div>
    </Card>}

    {hitos.length===0&&<Card><div style={{textAlign:"center",padding:"48px 0"}}>
      <div style={{fontSize:44,marginBottom:12}}>🏁</div>
      <div style={{fontSize:14,fontWeight:600,color:C.t2,marginBottom:6}}>Sin objetivos definidos</div>
      <div style={{fontSize:12,color:C.t3,marginBottom:16}}>Los objetivos marcan las etapas clave de la obra y son visibles para todos</div>
      {esAdmin&&<Btn primary onClick={()=>setModal(true)}>+ Crear primer hito</Btn>}
    </div></Card>}

    <div style={{display:"flex",flexDirection:"column",gap:0}}>
      {hitos.map((h,i)=>{
        const ec=EC[h.estado]||EC.pendiente;
        const isLast=i===hitos.length-1;
        return <div key={h.id} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,width:28}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:ec.color+"22",border:`2px solid ${ec.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:ec.color,fontWeight:700,zIndex:1}}>{ec.dot}</div>
            {!isLast&&<div style={{width:2,flexGrow:1,background:C.bd2,minHeight:24,marginTop:2}}/>}
          </div>
          <div style={{flex:1,paddingBottom:isLast?0:16}}>
            <Card style={{padding:"12px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:13,color:h.estado==="completado"?C.t3:C.t,textDecoration:h.estado==="completado"?"line-through":"none"}}>{h.titulo}</div>
                  {h.descripcion&&<div style={{fontSize:12,color:C.t3,marginTop:3}}>{h.descripcion}</div>}
                  <div style={{fontSize:11,color:C.t3,marginTop:5}}>📅 Estimado: {h.fecha_estimada}</div>
                  {h.estado==="en_progreso"&&<div style={{marginTop:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.amber,marginBottom:3,fontWeight:600}}>
                      <span>Progreso</span><span>{h.progreso||0}%</span>
                    </div>
                    <div style={{height:5,borderRadius:3,background:C.bg3,overflow:"hidden"}}>
                      <div style={{height:"100%",borderRadius:3,background:C.amber,width:`${h.progreso||0}%`,transition:"width .5s"}}/>
                    </div>
                  </div>}
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                  {esAdmin
                    ?<div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                        {Object.entries(EC).map(([k,v])=><button key={k} onClick={()=>updateEstado(h.id,k)} style={{padding:"4px 10px",fontSize:11,fontWeight:600,borderRadius:20,border:`1px solid ${h.estado===k?v.color:C.bd2}`,background:h.estado===k?v.color+"18":"transparent",color:h.estado===k?v.color:C.t3,cursor:"pointer"}}>{v.label}</button>)}
                      </div>
                    :<Tag label={ec.label} color={ec.color}/>
                  }
                  {esAdmin&&<button onClick={()=>deleteH(h.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:18}}>×</button>}
                </div>
              </div>
            </Card>
          </div>
        </div>;
      })}
    </div>

    {progresoModal&&<Modal title="¿Cuánto avanzó este objetivo?" onClose={()=>setProgresoModal(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div style={{fontSize:13,color:C.t3}}>Seleccioná el porcentaje de avance:</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
          {[0,25,50,75,100].map(p=><button key={p} onClick={()=>setProgresoModal(m=>({...m,progreso:p}))} style={{padding:"14px 0",fontSize:14,fontWeight:700,borderRadius:10,border:`2px solid ${progresoModal.progreso===p?C.amber:C.bd2}`,background:progresoModal.progreso===p?C.amber+"18":"transparent",color:progresoModal.progreso===p?C.amber:C.t2,cursor:"pointer",transition:"all .15s"}}>{p}%</button>)}
        </div>
        <div style={{height:10,borderRadius:5,background:C.bg3,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:5,background:C.amber,width:`${progresoModal.progreso}%`,transition:"width .4s"}}/>
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn primary onClick={confirmarProgreso}>Confirmar</Btn>
          <Btn onClick={()=>setProgresoModal(null)}>Cancelar</Btn>
        </div>
      </div>
    </Modal>}

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

// ── REPORTES TAB (con gráfico de evolución temporal) ─────────────────────────
function ReportesTab({obra,gastos,presup,tcRef,cats,esAdmin,monedaVista}){
  const [vistaR,setVistaR]=useState("evolucion");
  const enUSD=monedaVista==="USD";
  const conv=useCallback(g=>enUSD?toUSD(g,tcRef):toARS(g,tcRef),[enUSD,tcRef]);
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);

  const porMes=useMemo(()=>{
    const m={};
    gastos.forEach(g=>{const ym=g.fecha?.slice(0,7)||"";if(!m[ym])m[ym]={ym,total:0,items:[]};m[ym].total+=conv(g);m[ym].items.push(g);});
    return Object.values(m).sort((a,b)=>a.ym>b.ym?1:-1);
  },[gastos,conv]);

  // Gráfico de evolución acumulada
  const evolucionData=useMemo(()=>{
    let acum=0;
    return porMes.map(m=>{acum+=m.total;return{ym:m.ym,mes:m.total,acum};});
  },[porMes]);

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

  // Presupuesto total en moneda de vista
  const totalPresupMV=presup.reduce((s,p)=>{
    const pMV=p.moneda==="USD"?(enUSD?p.monto:p.monto*tcRef):(enUSD?p.monto/tcRef:p.monto);
    return s+pMV;
  },0);

  const VISTAS=[{id:"evolucion",label:"📈 Evolución"},{id:"mensual",label:"Por mes"},{id:"categorias",label:"Por categoría"},{id:"top",label:"Top gastos"}];

  // ── GRÁFICO EVOLUCIÓN ACUMULADA ──
  const EvolucionChart=()=>{
    if(evolucionData.length<2)return <div style={{textAlign:"center",padding:"32px 0",color:C.t3}}>Se necesitan al menos 2 meses de datos para el gráfico.</div>;
    const W=560,PL=60,PR=20,PT=20,PB=40,H=180;
    const maxAcum=Math.max(...evolucionData.map(d=>d.acum),1);
    const maxMesSingle=Math.max(...evolucionData.map(d=>d.mes),1);
    const n=evolucionData.length;
    const xScale=i=>(i/(n-1))*(W-PL-PR)+PL;
    const yScale=v=>PT+((H-PT-PB)*(1-v/maxAcum));
    const yScaleBar=v=>PT+((H-PT-PB)*(1-v/maxAcum));
    const barW=Math.max(4,Math.min(24,(W-PL-PR)/n-4));

    // Línea acumulada
    const pts=evolucionData.map((d,i)=>`${xScale(i)},${yScale(d.acum)}`).join(" ");

    // Línea presupuesto si existe
    const presupY=totalPresupMV>0?yScale(totalPresupMV):null;

    return <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
      {/* Barras por mes */}
      {evolucionData.map((d,i)=>{
        const bh=Math.max(2,(H-PT-PB)*(d.mes/maxAcum));
        const bx=xScale(i)-barW/2;
        const by=H-PB-bh;
        return <rect key={i} x={bx} y={by} width={barW} height={bh} fill={C.lima} opacity={.4} rx={2}/>;
      })}
      {/* Línea presupuesto */}
      {presupY&&<>
        <line x1={PL} y1={presupY} x2={W-PR} y2={presupY} stroke={C.blue} strokeWidth={1.5} strokeDasharray="5 4" opacity={.7}/>
        <text x={W-PR-2} y={presupY-4} fontSize={9} fill={C.blue} textAnchor="end" opacity={.8}>Presup. {fmt(totalPresupMV)}</text>
      </>}
      {/* Línea acumulada */}
      <polyline points={pts} fill="none" stroke={C.green} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round"/>
      {/* Puntos */}
      {evolucionData.map((d,i)=><circle key={i} cx={xScale(i)} cy={yScale(d.acum)} r={3} fill={C.green}/>)}
      {/* Último valor */}
      {evolucionData.length>0&&<text x={xScale(n-1)+4} y={yScale(evolucionData[n-1].acum)-4} fontSize={10} fill={C.green} fontWeight="700">{fmt(evolucionData[n-1].acum)}</text>}
      {/* Eje X: etiquetas de mes */}
      {evolucionData.map((d,i)=>{
        if(n>8&&i%Math.ceil(n/8)!==0&&i!==n-1)return null;
        return <text key={i} x={xScale(i)} y={H-PB+14} fontSize={9} fill={C.t3} textAnchor="middle">{d.ym.slice(2)}</text>;
      })}
      {/* Eje Y: mínimo y máximo */}
      <text x={PL-4} y={PT+4} fontSize={9} fill={C.t3} textAnchor="end">{fmt(maxAcum)}</text>
      <text x={PL-4} y={H-PB} fontSize={9} fill={C.t3} textAnchor="end">0</text>
      <line x1={PL} y1={PT} x2={PL} y2={H-PB} stroke={C.bd2} strokeWidth={1}/>
      <line x1={PL} y1={H-PB} x2={W-PR} y2={H-PB} stroke={C.bd2} strokeWidth={1}/>
    </svg>;
  };

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
      <div><div style={{fontSize:16,fontWeight:700,color:C.t}}>📈 Reportes</div><div style={{fontSize:12,color:C.t3}}>{gastos.length} movimientos · {fmt(totalGlobal)} total</div></div>
      <Btn small onClick={()=>exportCSV(gastos.map(g=>({Fecha:g.fecha,Categoria:cats.find(c=>c.id===g.cat_id)?.label||"",Monto:g.monto,Moneda:g.moneda,TC:g.tc_valor,Monto_ARS:toARS(g,tcRef),Descripcion:g.descripcion||"",Cargado_por:g.cargado_por})),`reporte_${obra.nombre.replace(/\s+/g,"_")}.csv`)}>⬇ Exportar todo</Btn>
    </div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
      <StatCard label="Total ejecutado" value={fmt(totalGlobal)} sub={`${gastos.length} movimientos`} color={C.green} icon="💸"/>
      <StatCard label="Promedio mensual" value={fmt(promMensual)} sub={`${porMes.length} meses activos`} color={C.blue} icon="📅"/>
      {maxMes&&<StatCard label="Mes más alto" value={maxMes.ym} sub={fmt(maxMes.total)} color={C.amber} icon="📌"/>}
      {porCat[0]&&<StatCard label="Categoría #1" value={porCat[0].label} sub={`${fmt(porCat[0].total)} · ${totalGlobal>0?Math.round((porCat[0].total/totalGlobal)*100):0}%`} color={porCat[0].color||C.green} icon={porCat[0].icon}/>}
    </div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
      {VISTAS.map(v=><button key={v.id} onClick={()=>setVistaR(v.id)} style={{padding:"6px 16px",fontSize:12,border:`1px solid ${vistaR===v.id?C.green:C.bd2}`,borderRadius:20,cursor:"pointer",background:vistaR===v.id?C.green:"transparent",color:vistaR===v.id?"#fff":C.t2,fontWeight:vistaR===v.id?700:400}}>{v.label}</button>)}
    </div>

    {/* EVOLUCIÓN TEMPORAL */}
    {vistaR==="evolucion"&&<Card>
      <div style={{fontSize:12,fontWeight:700,color:C.t,marginBottom:4}}>Gastos acumulados en el tiempo</div>
      <div style={{display:"flex",gap:16,fontSize:11,color:C.t3,marginBottom:12,flexWrap:"wrap"}}>
        <span><span style={{display:"inline-block",width:14,height:3,background:C.green,borderRadius:2,marginRight:4,verticalAlign:"middle"}}/>Acumulado</span>
        <span><span style={{display:"inline-block",width:14,height:10,background:C.lima,opacity:.5,borderRadius:2,marginRight:4,verticalAlign:"middle"}}/>Por mes</span>
        {totalPresupMV>0&&<span><span style={{display:"inline-block",width:14,height:2,background:C.blue,borderRadius:2,marginRight:4,verticalAlign:"middle",borderTop:`1px dashed ${C.blue}`}}/>Presupuesto</span>}
      </div>
      <EvolucionChart/>
    </Card>}

    {/* POR MES */}
    {vistaR==="mensual"&&<Card>
      {porMes.length===0&&<div style={{textAlign:"center",padding:"24px 0",color:C.t3}}>Sin datos</div>}
      {porMes.length>0&&<>
        <div style={{overflowX:"auto",marginBottom:14}}>
          <div style={{display:"flex",gap:4,alignItems:"flex-end",minWidth:400,height:100}}>
            {porMes.map((m,i)=>{
              const maxBar=Math.max(...porMes.map(x=>x.total),1);
              const hpx=Math.max(4,Math.round((m.total/maxBar)*90));
              return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <div style={{width:"100%",maxWidth:32,height:hpx,background:C.green,borderRadius:"3px 3px 0 0",minHeight:4}}/>
                <div style={{fontSize:9,color:C.t3,textAlign:"center",lineHeight:1.2}}>{m.ym.slice(5)}/{m.ym.slice(2,4)}</div>
              </div>;
            })}
          </div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>{["Mes","Movimientos","Total","% del total"].map((h,i)=><th key={i} style={{padding:"7px 10px",textAlign:i>=1?"right":"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}</tr></thead>
          <tbody>{[...porMes].reverse().map((m,i)=>{const p=totalGlobal>0?Math.round((m.total/totalGlobal)*100):0;return <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}}><td style={{padding:"8px 10px",fontWeight:600,color:C.t}}>{m.ym}</td><td style={{padding:"8px 10px",textAlign:"right",color:C.t3}}>{m.items.length}</td><td style={{padding:"8px 10px",textAlign:"right",fontWeight:700,color:C.green}}>{fmt(m.total)}</td><td style={{padding:"8px 10px",textAlign:"right",color:C.t2}}>{p}%</td></tr>;})}
          </tbody>
        </table>
      </>}
    </Card>}

    {/* POR CATEGORÍA */}
    {vistaR==="categorias"&&<Card>
      {porCat.length===0&&<div style={{textAlign:"center",padding:"24px 0",color:C.t3}}>Sin datos</div>}
      <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:16}}>
        <Donut data={porCat.map(c=>({label:c.label,val:c.total,color:c.color||C.green}))} size={120}/>
        <div style={{flex:1,minWidth:200}}>
          {porCat.map(c=>{const p=totalGlobal>0?Math.round((c.total/totalGlobal)*100):0;return <div key={c.id} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
            <span style={{fontSize:12,color:C.t,display:"flex",alignItems:"center",gap:6}}><span style={{width:20,height:20,borderRadius:5,background:c.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{c.icon}</span>{c.label}</span>
            <span style={{fontSize:11,fontWeight:700,color:c.color||C.green}}>{fmt(c.total)} · {p}%</span>
          </div>
          <div style={{height:5,borderRadius:3,background:C.bg3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:c.color||C.green,width:`${p}%`,transition:"width .5s ease"}}/></div>
          </div>;})}
        </div>
      </div>
      <div style={{textAlign:"right",fontSize:12,color:C.t3,fontWeight:700,borderTop:`1px solid ${C.bd}`,paddingTop:10}}>Total: <span style={{color:C.green}}>{fmt(totalGlobal)}</span></div>
    </Card>}

    {/* TOP GASTOS */}
    {vistaR==="top"&&<Card>
      {topGastos.length===0&&<div style={{textAlign:"center",padding:"24px 0",color:C.t3}}>Sin datos</div>}
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

// ── RESUMEN CLIENTE ───────────────────────────────────────────────────────────
function ResumenClienteTab({obra,gastos,presup,tcRef,cats,fotos,hitos=[],monedaVista}){
  const enUSD=monedaVista==="USD";
  // Cliente siempre ve monto_cliente si existe
  const conv=g=>{const mc=g.monto_cliente!=null?g.monto_cliente:g.monto;return enUSD?toUSD({...g,monto:mc},tcRef):toARS({...g,monto:mc},tcRef);};
  const fmt=n=>enUSD?fmtUSD(n):fmtARS(n);
  const totalGastado=gastos.reduce((s,g)=>s+conv(g),0);

  const totalPresupCatsMV=presup.reduce((s,p)=>{
    const pMV=p.moneda==="USD"?(enUSD?p.monto:p.monto*tcRef):(enUSD?p.monto/tcRef:p.monto);
    return s+pMV;
  },0);
  const presupTotalObraMV=obra.presupuesto_total?(obra.moneda_presupuesto==="USD"?(enUSD?obra.presupuesto_total:obra.presupuesto_total*tcRef):(enUSD?obra.presupuesto_total/tcRef:obra.presupuesto_total)):0;
  const presupTotalMV=totalPresupCatsMV>0?totalPresupCatsMV:presupTotalObraMV;

  const pct=presupTotalMV>0?Math.min(Math.round((totalGastado/presupTotalMV)*100),200):null;
  const hitosComp=hitos.filter(h=>h.estado==="completado").length;
  const hitoPct=hitos.length>0?Math.round((hitosComp/hitos.length)*100):null;
  const hitosActivos=hitos.filter(h=>h.estado!=="completado").slice(0,4);
  const ultimoGasto=gastos[0]||null;
  const ultimaFoto=fotos[0]||null;
  const byCat=cats.map(c=>({...c,total:gastos.filter(g=>g.cat_id===c.id).reduce((s,g)=>s+conv(g),0)})).filter(c=>c.total>0).sort((a,b)=>b.total-a.total);

  return <div className="fu">
    <div style={{marginBottom:20}}>
      <div style={{fontSize:18,fontWeight:700,color:C.t,marginBottom:4}}>📋 Tu resumen de obra</div>
      <div style={{fontSize:13,color:C.t3}}>{obra.nombre} · {obra.direccion}</div>
    </div>

    <Card style={{marginBottom:14,background:`linear-gradient(135deg, ${C.limaBg} 0%, #fff 100%)`,border:`1px solid ${C.lima}44`}}>
      <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{fontSize:44}}>🏗️</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:16,color:C.t,marginBottom:4}}>{obra.nombre}</div>
          <Tag label={obra.estado} color={obra.estado==="En ejecución"?C.green:obra.estado==="Finalizada"?C.blue:C.amber}/>
          <div style={{fontSize:12,color:C.t3,marginTop:6}}>{obra.direccion}</div>
        </div>
        {presupTotalMV>0&&<div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:C.t3}}>Presupuesto total</div>
          <div style={{fontSize:18,fontWeight:700,color:C.t}}>{fmt(presupTotalMV)}</div>
        </div>}
      </div>
    </Card>

    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}>
      <StatCard label="Total ejecutado" value={fmt(totalGastado)} sub={`${gastos.length} gastos`} color={C.green} icon="💸"/>
      {presupTotalMV>0&&<StatCard label="Disponible" value={fmt(Math.max(0,presupTotalMV-totalGastado))} color={totalGastado>presupTotalMV?C.red:C.lima} icon="✅"/>}
      {hitoPct!==null&&<StatCard label="Objetivos" value={`${hitosComp}/${hitos.length}`} sub={hitoPct+"%"} color={C.blue} icon="🏁"/>}
      <StatCard label="Fotos" value={fotos.length} color={C.amber} icon="📷"/>
    </div>

    {presupTotalMV>0&&pct!==null&&<Card style={{marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:12}}>💰 Avance financiero</div>
      <div style={{height:14,borderRadius:7,background:C.bg3,overflow:"hidden",marginBottom:6}}>
        <div style={{height:"100%",borderRadius:7,background:pct>=100?C.red:pct>=80?C.amber:C.green,width:`${Math.min(pct,100)}%`,transition:"width .6s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.t3}}>
        <span>Inicio</span>
        <span style={{fontWeight:700,color:pct>=100?C.red:pct>=80?C.amber:C.green}}>{pct}% ejecutado</span>
        <span>Presupuesto</span>
      </div>
    </Card>}

    {byCat.length>0&&<Card style={{marginBottom:14}}>
      <div style={{fontSize:13,fontWeight:700,color:C.t,marginBottom:12}}>📊 En qué se gastó</div>
      {byCat.map(c=>{
        const p=totalGastado>0?Math.round((c.total/totalGastado)*100):0;
        return <div key={c.id} style={{marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={{fontSize:12,color:C.t,display:"flex",alignItems:"center",gap:6}}><span style={{width:22,height:22,borderRadius:5,background:c.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>{c.icon}</span>{c.label}</span>
            <span style={{fontSize:11,fontWeight:700,color:c.color||C.green}}>{fmt(c.total)} · {p}%</span>
          </div>
          <div style={{height:6,borderRadius:3,background:C.bg3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:c.color||C.green,width:`${p}%`,transition:"width .5s ease"}}/></div>
        </div>;
      })}
    </Card>}

    <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:14}}>
      {ultimaFoto&&<Card style={{flex:"1 1 200px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Última actualización visual</div>
        <img src={ultimaFoto.url} alt={ultimaFoto.titulo} style={{width:"100%",borderRadius:10,objectFit:"cover",maxHeight:160}}/>
        <div style={{marginTop:8,fontSize:12,fontWeight:600,color:C.t}}>{ultimaFoto.titulo}</div>
        <div style={{fontSize:11,color:C.t3,marginTop:2}}>{ultimaFoto.fecha}{ultimaFoto.etapa&&` · ${ultimaFoto.etapa}`}</div>
      </Card>}
      {hitosActivos.length>0&&<Card style={{flex:"1 1 200px"}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Próximos objetivos</div>
        {hitosActivos.map(h=>{const col=h.estado==="en_progreso"?C.amber:C.t3;return <div key={h.id} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${C.bd}`}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:col,marginTop:4,flexShrink:0}}/>
          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.t}}>{h.titulo}</div><div style={{fontSize:10,color:C.t3,marginTop:1}}>📅 {h.fecha_estimada}</div></div>
          <Tag label={h.estado==="en_progreso"?"En curso":"Pendiente"} color={col}/>
        </div>;})}
      </Card>}
    </div>

    {ultimoGasto&&<Card>
      <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,fontWeight:600}}>Último movimiento registrado</div>
      {(()=>{const cat=cats.find(c=>c.id===ultimoGasto.cat_id);return <div style={{display:"flex",gap:12,alignItems:"center"}}>
        <div style={{width:40,height:40,borderRadius:10,background:(cat?.color||C.green)+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{cat?.icon||"📦"}</div>
        <div style={{flex:1}}><div style={{fontWeight:600,color:C.t}}>{ultimoGasto.descripcion||cat?.label||"—"}</div><div style={{fontSize:11,color:C.t3,marginTop:2}}>{ultimoGasto.fecha} · {cat?.label}</div></div>
        <div style={{fontSize:16,fontWeight:700,color:cat?.color||C.green}}>{fmt(conv(ultimoGasto))}</div>
      </div>;})()} 
    </Card>}
  </div>;
}

// ── CATEGORÍAS TAB ────────────────────────────────────────────────────────────
function CategoriasTab({cats,obra,toast,reload}){
  const [catM,setCatM]=useState(null);const [subM,setSubM]=useState(null);const [catD,setCatD]=useState({label:"",color:C.green,icon:"📦"});const [subD,setSubD]=useState({label:""});const [saving,setSaving]=useState(false);
  const ICONS=["🏗️","👷","📦","🔧","⚙️","🪵","🏠","💡","🛁","🪟","🚪","🔌","🪣","🏛️","📐","📋","🚛","🔨","🧱","🪚","🪜","🛠️","⛏️","🪛","🔩","🪤","🧲","🧰","🪞","🛋️","🪑","🛏️","🚿","🪠","🧴","🧹","🧺","🌡️","❄️","🔥","💧","⚡","☀️","🌿","🪴","🌳","🐝","🦺","🥽","🧤","📏","📌","📍","✏️","🗂️","📁","📊","💰","🏦","💳","🧾","📱","💻","📡","🔐","🔑","🗝️","🚧","⚠️","🚦","🗺️","📍","🏡","🏢","🏬","🏭","🏟️","🌆","🌇","🌉","🖼️","🎨","🪣","🧽","🪥","🫧","🧯","🪝","🔦","🕯️","💎","🪨","🌊","🏔️","⛰️"];
  const COLS=[C.green,C.lima,C.blue,C.amber,C.red,"#7A4A9A","#2A8A7A","#9A6A2A","#C05A7A","#3A7ACC","#8A5A3A","#4A9A5A"];
  const saveCat=async()=>{if(!catD.label.trim())return;setSaving(true);if(catM==="new"){const{error}=await supabase.from("categorias").insert({obra_id:obra.id,label:catD.label.trim(),color:catD.color,icon:catD.icon,orden:cats.length+1});if(error){toast.error("Error");setSaving(false);return;}toast.success("Categoría creada");}else{const{error}=await supabase.from("categorias").update({label:catD.label,color:catD.color,icon:catD.icon}).eq("id",catM);if(error){toast.error("Error");setSaving(false);return;}toast.success("Actualizada");}await reload();setCatM(null);setSaving(false);};
  const saveSub=async()=>{if(!subD.label.trim())return;setSaving(true);if(subM.mode==="new"){const{error}=await supabase.from("subcategorias").insert({cat_id:subM.catId,label:subD.label.trim(),orden:0});if(error){toast.error("Error");setSaving(false);return;}toast.success("Subcategoría creada");}else{const{error}=await supabase.from("subcategorias").update({label:subD.label}).eq("id",subM.subId);if(error){toast.error("Error");setSaving(false);return;}toast.success("Actualizada");}await reload();setSubM(null);setSaving(false);};
  const deleteCat=async(id)=>{const{error}=await supabase.from("categorias").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminada");await reload();}};
  const deleteSub=async(id)=>{const{error}=await supabase.from("subcategorias").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminada");await reload();}};
  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div><div style={{fontSize:16,fontWeight:700,color:C.t}}>Categorías</div><div style={{fontSize:12,color:C.t3}}>{cats.length} categorías</div></div><Btn primary onClick={()=>{setCatD({label:"",color:C.green,icon:"📦"});setCatM("new");}}>+ Nueva categoría</Btn></div>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {cats.map(cat=><Card key={cat.id} style={{padding:"14px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:34,height:34,borderRadius:9,background:cat.color+"18",border:`1px solid ${cat.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{cat.icon}</span><div><div style={{fontWeight:700,color:C.t,fontSize:13}}>{cat.label}</div><div style={{fontSize:11,color:C.t3}}>{cat.subs?.length||0} subcategorías</div></div></div>
          <div style={{display:"flex",gap:6}}>
            <Btn small onClick={()=>{setCatD({label:cat.label,color:cat.color,icon:cat.icon});setCatM(cat.id);}}>✎</Btn>
            <Btn small onClick={()=>{setSubD({label:""});setSubM({mode:"new",catId:cat.id});}}>+ Sub</Btn>
            <button onClick={()=>deleteCat(cat.id)} style={{background:"none",border:`1px solid ${C.red}33`,borderRadius:7,padding:"4px 8px",cursor:"pointer",color:C.red,fontSize:11}}>×</button>
          </div>
        </div>
        {cat.subs?.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {cat.subs.map(s=><div key={s.id} style={{display:"flex",alignItems:"center",gap:4,background:C.bg3,borderRadius:7,padding:"3px 10px"}}>
            <span style={{fontSize:12,color:C.t2}}>{s.label}</span>
            <button onClick={()=>{setSubD({label:s.label});setSubM({mode:"edit",catId:cat.id,subId:s.id});}} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:11,padding:0}}>✎</button>
            <button onClick={()=>deleteSub(s.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:12,padding:0}}>×</button>
          </div>)}
        </div>}
      </Card>)}
    </div>
    {catM&&<Modal title={catM==="new"?"Nueva categoría":"Editar categoría"} onClose={()=>setCatM(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Nombre</div><input style={INP} autoFocus placeholder="Ej: Estructura" value={catD.label} onChange={e=>setCatD(d=>({...d,label:e.target.value}))}/></div>
        <div><div style={{fontSize:11,color:C.t2,marginBottom:8,fontWeight:600}}>Ícono</div><div style={{display:"flex",flexWrap:"wrap",gap:5,maxHeight:200,overflowY:"auto",padding:"4px 2px",border:`1px solid ${C.bd}`,borderRadius:10,background:C.bg3}}>{ICONS.map(ic=><button key={ic} onClick={()=>setCatD(d=>({...d,icon:ic}))} style={{width:36,height:36,borderRadius:8,fontSize:18,border:`2px solid ${catD.icon===ic?C.green:"transparent"}`,background:catD.icon===ic?"#fff":"transparent",cursor:"pointer",flexShrink:0}}>{ic}</button>)}</div></div>
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

// ── PARTICIPANTES TAB ─────────────────────────────────────────────────────────
function ParticipantesTab({obra,partic,toast,reload}){
  const [modal,setModal]=useState(false);
  const [draft,setDraft]=useState({email:"",nombre:"",rol:"cliente",puede_cargar:false});
  const [saving,setSaving]=useState(false);
  const [invOk,setInvOk]=useState(null);

  const save=async()=>{
    if(!draft.email.trim()||!draft.nombre.trim())return;
    setSaving(true);
    // Llamar a la Edge Function con el token del arquitecto
    const{data:{session}}=await supabase.auth.getSession();
    const res=await fetch(`${supabase.supabaseUrl}/functions/v1/invite-user`,{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${session.access_token}`},
      body:JSON.stringify({
        email:draft.email.trim(),
        nombre:draft.nombre.trim(),
        rol:draft.rol,
        puede_cargar:draft.rol!=="cliente"?true:draft.puede_cargar,
        obra_id:obra.id,
        obra_nombre:obra.nombre,
      }),
    });
    const json=await res.json();
    if(!res.ok){toast.error(json.error||"Error al invitar");setSaving(false);return;}
    toast.success(`✉ Invitación enviada a ${draft.email}`);
    setInvOk(draft.email);
    setDraft({email:"",nombre:"",rol:"cliente",puede_cargar:false});
    await reload();setSaving(false);
  };

  const reenviar=async(email,nombre)=>{
    setSaving(true);
    const{data:{session}}=await supabase.auth.getSession();
    const res=await fetch(`${supabase.supabaseUrl}/functions/v1/invite-user`,{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${session.access_token}`},
      body:JSON.stringify({email,nombre,rol:"cliente",puede_cargar:false,obra_id:obra.id,obra_nombre:obra.nombre}),
    });
    const json=await res.json();
    if(!res.ok)toast.error(json.error||"Error");else toast.success("Invitación reenviada a "+email);
    setSaving(false);
  };

  const updateRol=async(id,rol)=>{const{error}=await supabase.from("participantes").update({rol}).eq("id",id);if(error)toast.error("Error");else{toast.success("Rol actualizado");await reload();}};
  const updatePC=async(id,puede_cargar)=>{await supabase.from("participantes").update({puede_cargar}).eq("id",id);await reload();};
  const deleteP=async(id)=>{const{error}=await supabase.from("participantes").delete().eq("id",id);if(error)toast.error("Error");else{toast.success("Eliminado");await reload();}};

  return <div className="fu">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <div><div style={{fontSize:16,fontWeight:700,color:C.t}}>Participantes</div><div style={{fontSize:12,color:C.t3}}>{partic.length} personas</div></div>
      <Btn primary onClick={()=>{setInvOk(null);setModal(true);}}>+ Invitar</Btn>
    </div>

    <Card style={{marginBottom:14}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:440}}>
          <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
            {["Nombre","Email","Rol","Puede cargar","Estado",""].map((h,i)=><th key={i} style={{padding:"8px 10px",textAlign:"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}
          </tr></thead>
          <tbody>{partic.map(p=>{
            const activo=!!p.user_id;
            return <tr key={p.id} style={{borderBottom:`1px solid ${C.bd}`}}>
              <td style={{padding:"10px",fontWeight:600,color:C.t}}>{p.nombre}</td>
              <td style={{padding:"10px",color:C.t3,fontSize:11}}>{p.email}</td>
              <td style={{padding:"10px"}}>
                <select style={{...SEL,width:"auto",padding:"4px 8px",fontSize:11}} value={p.rol} onChange={e=>updateRol(p.id,e.target.value)}>
                  <option value="arquitecto">Arquitecto</option>
                  <option value="ayudante">Ayudante</option>
                  <option value="cliente">Cliente</option>
                </select>
              </td>
              <td style={{padding:"10px"}}>
                {p.rol==="cliente"
                  ?<label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}>
                    <input type="checkbox" checked={p.puede_cargar} onChange={e=>updatePC(p.id,e.target.checked)} style={{accentColor:C.green,width:14,height:14}}/>
                    <span style={{color:p.puede_cargar?C.green:C.t3,fontWeight:p.puede_cargar?600:400}}>{p.puede_cargar?"Sí":"No"}</span>
                  </label>
                  :<span style={{color:C.green,fontWeight:600}}>✓ Sí</span>
                }
              </td>
              <td style={{padding:"10px"}}>
                {activo
                  ?<Tag label="✓ Activo" color={C.green}/>
                  :<div style={{display:"flex",gap:6,alignItems:"center"}}>
                    <Tag label="⏳ Pendiente" color={C.amber}/>
                    <button onClick={()=>reenviar(p.email,p.nombre)} style={{background:"none",border:`1px solid ${C.amber}44`,borderRadius:6,padding:"2px 7px",cursor:"pointer",fontSize:10,color:C.amber}}>Reenviar</button>
                  </div>
                }
              </td>
              <td style={{padding:"10px",textAlign:"right"}}>
                {p.rol!=="arquitecto"&&<button onClick={()=>deleteP(p.id)} style={{background:"none",border:"none",cursor:"pointer",color:C.t3,fontSize:16}}>×</button>}
              </td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </Card>

    <div style={{background:C.bg3,border:`1px solid ${C.bd}`,borderRadius:10,padding:"12px 16px",fontSize:12,color:C.t3,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
      <Tag label="Arquitecto" color={C.green}/><span>acceso total</span>
      <Tag label="Ayudante" color={C.blue}/><span>igual al arquitecto</span>
      <Tag label="Cliente" color={C.lima}/><span>según permisos configurados</span>
    </div>

    {modal&&<Modal title="Invitar participante" onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {invOk
          ?<>
            <div style={{background:C.green+"12",border:`1px solid ${C.green}33`,borderRadius:10,padding:"14px 16px"}}>
              <div style={{fontSize:14,fontWeight:700,color:C.green,marginBottom:6}}>✉ Invitación enviada</div>
              <div style={{fontSize:12,color:C.t2,lineHeight:1.7}}>
                Se envió un email a <b>{invOk}</b> con un link para crear su contraseña.<br/>
                Una vez que la cree, podrá ingresar siempre con email + contraseña.
              </div>
            </div>
            <div style={{background:C.bg3,borderRadius:8,padding:"10px 12px",fontSize:11,color:C.t3}}>
              💡 Si no recibe el email, revisá la carpeta de spam o usá el botón "Reenviar" en la tabla.
            </div>
            <Btn primary onClick={()=>setModal(false)}>Cerrar</Btn>
          </>
          :<>
            <div style={{background:C.blue+"10",border:`1px solid ${C.blue}33`,borderRadius:8,padding:"10px 12px",fontSize:12,color:C.blue}}>
              📧 El cliente recibirá un email para <b>crear su contraseña</b>. De ahí en adelante entra solo con email + contraseña, sin necesitar nada más.
            </div>
            <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Nombre</div><input style={INP} placeholder="Ej: Juan Pérez" value={draft.nombre} onChange={e=>setDraft(d=>({...d,nombre:e.target.value}))}/></div>
            <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Email</div><input style={INP} type="email" placeholder="juan@mail.com" value={draft.email} onChange={e=>setDraft(d=>({...d,email:e.target.value}))}/></div>
            <div><div style={{fontSize:11,color:C.t2,marginBottom:4,fontWeight:600}}>Rol</div>
              <select style={SEL} value={draft.rol} onChange={e=>setDraft(d=>({...d,rol:e.target.value}))}>
                <option value="arquitecto">Arquitecto</option>
                <option value="ayudante">Ayudante</option>
                <option value="cliente">Cliente</option>
              </select>
            </div>
            {draft.rol==="cliente"&&<label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",background:C.bg3,borderRadius:8,padding:"10px 12px"}}>
              <input type="checkbox" checked={draft.puede_cargar} onChange={e=>setDraft(d=>({...d,puede_cargar:e.target.checked}))} style={{accentColor:C.green,width:16,height:16}}/>
              <div><div style={{fontSize:12,fontWeight:600,color:C.t}}>Permitir cargar gastos</div><div style={{fontSize:11,color:C.t3}}>Si no, solo verá lo que configuraste en Permisos</div></div>
            </label>}
            <div style={{display:"flex",gap:8}}>
              <Btn primary onClick={save} loading={saving}>Enviar invitación</Btn>
              <Btn onClick={()=>setModal(false)}>Cancelar</Btn>
            </div>
          </>
        }
      </div>
    </Modal>}
  </div>;
}

// ── PERMISOS CLIENTE TAB ──────────────────────────────────────────────────────
function PermisosClienteTab({obra,permisos,setPermisos,toast}){
  const [saving,setSaving]=useState(false);
  const SECCIONES=[
    {id:"gastos",label:"Gastos",icon:"💸",desc:"Ver los gastos marcados como públicos"},
    {id:"fotos",label:"Fotos",icon:"📷",desc:"Ver las fotos de avance de obra"},
    {id:"objetivos",label:"Objetivos",icon:"🏁",desc:"Ver hitos y progreso de la obra"},
    {id:"reportes",label:"Reportes",icon:"📈",desc:"Ver gráficos y estadísticas de gastos"},
    {id:"resumen",label:"Mi Resumen",icon:"📋",desc:"Vista resumen con KPIs y últimas novedades"},
    {id:"ipc",label:"IPC / Inflación",icon:"📉",desc:"Ver datos de inflación INDEC"},
    {id:"usd",label:"USD / Tipo de cambio",icon:"💵",desc:"Ver histórico de tipo de cambio"},
  ];

  const toggle=(id)=>setPermisos(p=>({...p,[id]:!p[id]}));

  const guardar=async()=>{
    setSaving(true);
    const{error}=await supabase.from("permisos_cliente").upsert({obra_id:obra.id,...permisos},{onConflict:"obra_id"});
    if(error)toast.error("Error al guardar: "+error.message);
    else toast.success("Permisos guardados");
    setSaving(false);
  };

  return <div className="fu">
    <div style={{marginBottom:20}}>
      <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>🔐 Permisos del Cliente</div>
      <div style={{fontSize:12,color:C.t3}}>Decidí qué secciones puede ver el cliente en esta obra. Solo vos podés ver y modificar esto.</div>
    </div>

    <Card style={{marginBottom:16}}>
      <div style={{background:C.amber+"12",border:`1px solid ${C.amber}33`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.amber,marginBottom:16}}>
        ⚠ Esta sección es <b>exclusiva del arquitecto</b>. Los clientes y ayudantes nunca la verán.
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {SECCIONES.map((s,i)=><div key={s.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 4px",borderBottom:i<SECCIONES.length-1?`1px solid ${C.bd}`:"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:22,width:32,textAlign:"center"}}>{s.icon}</span>
            <div>
              <div style={{fontWeight:600,fontSize:13,color:C.t}}>{s.label}</div>
              <div style={{fontSize:11,color:C.t3,marginTop:2}}>{s.desc}</div>
            </div>
          </div>
          <div onClick={()=>toggle(s.id)} style={{width:44,height:24,borderRadius:12,background:permisos[s.id]?C.green:C.bd2,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
            <div style={{position:"absolute",top:3,left:permisos[s.id]?22:3,width:18,height:18,borderRadius:"50%",background:"#fff",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
          </div>
        </div>)}
      </div>
    </Card>

    <div style={{display:"flex",gap:10,alignItems:"center"}}>
      <Btn primary onClick={guardar} loading={saving}>Guardar permisos</Btn>
      <span style={{fontSize:11,color:C.t3}}>Los cambios se aplican inmediatamente al cliente.</span>
    </div>
  </div>;
}

// ── IPC TAB ───────────────────────────────────────────────────────────────────
function IPCTab({inflData}){
  const u24=inflData?inflData.slice(-24):[]; const u12=inflData?inflData.slice(-12):[];
  const acum12=u12.reduce((p,x)=>p*(1+x.valor/100),1)-1;
  const acum24=u24.reduce((p,x)=>p*(1+x.valor/100),1)-1;
  const maxIPC=u24.length>0?Math.max(...u24.map(x=>x.valor)):1;
  const W=560,PL=32,PR=12,PT=10,PB=28,cH=90,H=PT+cH+PB;
  return <div className="fu">
    <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>📉 IPC — Inflación Argentina</div>
    <div style={{fontSize:12,color:C.t3,marginBottom:16}}>Datos INDEC · Argentina</div>
    {!inflData&&<Card><div style={{textAlign:"center",padding:"32px 0",color:C.t3}}>Andá al tab <b>Presupuesto</b> y presioná "Cargar datos IPC" para cargar la serie histórica.</div></Card>}
    {inflData&&<>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
        <StatCard label="IPC último mes" value={(inflData[inflData.length-1]?.valor||0)+"%"} sub={inflData[inflData.length-1]?.fecha?.slice(0,7)} color={C.red} icon="📈"/>
        <StatCard label="Acum. 12 meses" value={Math.round(acum12*100)+"%"} color={C.amber} icon="📅"/>
        <StatCard label="Acum. 24 meses" value={Math.round(acum24*100)+"%"} color={C.red} icon="📆"/>
      </div>
      <Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>IPC mensual — últimos 24 meses</div>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
          {u24.map((x,i)=>{
            const bw=Math.floor((W-PL-PR)/u24.length)-1;
            const bx=PL+i*(bw+1);
            const bh=Math.max(2,Math.round((x.valor/maxIPC)*cH));
            const col=x.valor>10?C.red:x.valor>6?C.amber:C.green;
            return <g key={i}>
              <rect x={bx} y={PT+cH-bh} width={bw} height={bh} fill={col} rx={2} opacity={.85}/>
              {i===u24.length-1&&<text x={bx+bw/2} y={PT+cH-bh-4} fontSize={9} fill={col} textAnchor="middle" fontWeight="700">{x.valor}%</text>}
            </g>;
          })}
          {u24.filter((_,i)=>i%4===0||i===u24.length-1).map((x,i,arr)=>{
            const idx=u24.findIndex(y=>y===x);
            const bw=Math.floor((W-PL-PR)/u24.length)-1;
            const bx=PL+idx*(bw+1);
            return <text key={i} x={bx+bw/2} y={H-PB+14} fontSize={8} fill={C.t3} textAnchor="middle">{x.fecha?.slice(2,7)}</text>;
          })}
        </svg>
      </Card>
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:280}}>
            <thead><tr style={{borderBottom:`2px solid ${C.bd2}`}}>
              {["Mes","IPC %","Acumulado"].map((h,i)=><th key={i} style={{padding:"7px 10px",textAlign:i>=1?"right":"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {(()=>{let a=1;return[...inflData].reverse().slice(0,24).map((x,i)=>{a*=(1+x.valor/100);return <tr key={i} style={{borderBottom:`1px solid ${C.bd}`}}>
                <td style={{padding:"8px 10px",color:C.t2,fontWeight:500}}>{x.fecha?.slice(0,7)}</td>
                <td style={{padding:"8px 10px",textAlign:"right",color:x.valor>10?C.red:x.valor>6?C.amber:C.t2,fontWeight:600}}>{x.valor}%</td>
                <td style={{padding:"8px 10px",textAlign:"right",color:C.amber,fontWeight:700}}>+{Math.round((a-1)*100)}%</td>
              </tr>;});})()}
            </tbody>
          </table>
        </div>
      </Card>
    </>}
  </div>;
}

// ── USD / TC TAB ──────────────────────────────────────────────────────────────
function USDGrafico({br,W,PL,PR,PT,PB,cH,H}){
  const sF=br.filter(b=>b.of&&b.bl);
  if(sF.length<2)return null;
  const maxV=Math.max(...sF.map(b=>b.bl),1);
  const n=sF.length;
  const xS=i=>PL+(i/(n-1))*(W-PL-PR);
  const yS=v=>PT+((H-PT-PB)*(1-v/maxV));
  const ptsOf=sF.map((b,i)=>`${xS(i)},${yS(b.of)}`).join(" ");
  const ptsBl=sF.map((b,i)=>`${xS(i)},${yS(b.bl)}`).join(" ");
  return <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
    <polyline points={ptsOf} fill="none" stroke={C.green} strokeWidth={2} strokeLinejoin="round"/>
    <polyline points={ptsBl} fill="none" stroke={C.lima} strokeWidth={2} strokeLinejoin="round" strokeDasharray="4 2"/>
    {sF.filter((_,i)=>i%4===0||i===n-1).map((b,i,arr)=>{
      const idx=sF.findIndex(x=>x===b);
      return <text key={i} x={xS(idx)} y={H-PB+14} fontSize={8} fill={C.t3} textAnchor="middle">{b.ym?.slice(2,7)}</text>;
    })}
    <text x={W-PR} y={yS(sF[n-1].of)-4} fontSize={9} fill={C.green} textAnchor="end">${sF[n-1].of?.toLocaleString("es-AR")}</text>
    <text x={W-PR} y={yS(sF[n-1].bl)+12} fontSize={9} fill={C.lima} textAnchor="end">${sF[n-1].bl?.toLocaleString("es-AR")}</text>
    <line x1={PL} y1={PT} x2={PL} y2={H-PB} stroke={C.bd2} strokeWidth={1}/>
    <line x1={PL} y1={H-PB} x2={W-PR} y2={H-PB} stroke={C.bd2} strokeWidth={1}/>
  </svg>;
}

function USDTab({tcHistData,inflData,tcOficial,tcBlue}){
  const br=useMemo(()=>{
    if(!tcHistData)return [];
    const{oficial,blue}=tcHistData;
    const byYM={};
    oficial.forEach(x=>{const ym=x.fecha?.slice(0,7)||"";if(!byYM[ym])byYM[ym]={ym};byYM[ym].of=x.venta;});
    blue.forEach(x=>{const ym=x.fecha?.slice(0,7)||"";if(!byYM[ym])byYM[ym]={ym};byYM[ym].bl=x.venta;});
    return Object.values(byYM).filter(b=>b.ym&&b.of).sort((a,b)=>a.ym>b.ym?1:-1).slice(-24);
  },[tcHistData]);
  const brI=inflData?br.map(b=>{const ipc=inflData.find(x=>x.fecha?.slice(0,7)===b.ym);return {...b,ipc:ipc?.valor};}):br;
  const last=brI[brI.length-1];
  const sF=brI.filter(b=>b.of&&b.bl);
  const brechaColor=last?.gap>80?C.red:last?.gap>40?C.amber:C.green;
  const W=560,PL=44,PR=12,PT=16,PB=28,cH=100,H=PT+cH+PB;
  return <div className="fu">
    <div style={{fontSize:16,fontWeight:700,color:C.t,marginBottom:4}}>💵 Tipo de Cambio USD/ARS</div>
    <div style={{fontSize:12,color:C.t3,marginBottom:16}}>Histórico · Oficial y Blue</div>
    {!tcHistData&&<Card><div style={{textAlign:"center",padding:"32px 0",color:C.t3}}>Cargando datos históricos...</div></Card>}
    {tcHistData&&<>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
        <StatCard label="Oficial hoy" value={tcOficial?("$"+tcOficial.toLocaleString("es-AR")):last?.of?("$"+last.of.toLocaleString("es-AR")):"—"} color={C.green} icon="🏛️"/>
        <StatCard label="Blue hoy" value={tcBlue?("$"+tcBlue.toLocaleString("es-AR")):last?.bl?("$"+last.bl.toLocaleString("es-AR")):"—"} color={C.lima} icon="💵"/>
        <StatCard label="Brecha" value={last?.gap!=null?(last.gap+"%"):"—"} color={brechaColor} icon="📊"/>
        <StatCard label="IPC último mes" value={last?.ipc!=null?(last.ipc+"%"):"—"} color={C.amber} icon="📈"/>
      </div>
      {sF.length>1&&<Card style={{marginBottom:14}}>
        <div style={{fontSize:11,color:C.t3,textTransform:"uppercase",letterSpacing:".07em",marginBottom:10,fontWeight:600}}>Oficial vs Blue — últimos 24 meses</div>
        <div style={{display:"flex",gap:12,fontSize:11,color:C.t3,marginBottom:8}}><span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:16,height:2,background:C.green,display:"inline-block",borderRadius:1}}/> Oficial</span><span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:16,height:2,background:C.lima,display:"inline-block",borderRadius:1,borderTop:`2px dashed ${C.lima}`}}/> Blue</span></div>
        <USDGrafico br={brI} W={W} PL={PL} PR={PR} PT={PT} PB={PB} cH={cH} H={H}/>
      </Card>}
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:380}}>
            <thead><tr style={{borderBottom:"2px solid "+C.bd2}}>
              {["Mes","Oficial","Blue","Brecha","IPC"].map((h,i)=><th key={i} style={{padding:"7px 10px",textAlign:i>=1?"right":"left",fontSize:10,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[...brI].reverse().slice(0,18).map((b,i)=>{
                const gap=b.of&&b.bl?Math.round(((b.bl-b.of)/b.of)*100):null;
                const gapColor=gap>100?C.red:gap>50?C.amber:C.t2;
                return <tr key={i} style={{borderBottom:"1px solid "+C.bd}}>
                  <td style={{padding:"8px 10px",color:C.t2,fontWeight:500}}>{b.ym}</td>
                  <td style={{padding:"8px 10px",textAlign:"right",color:C.green,fontWeight:600}}>{b.of?("$"+b.of.toLocaleString("es-AR")):"—"}</td>
                  <td style={{padding:"8px 10px",textAlign:"right",color:C.lima,fontWeight:600}}>{b.bl?("$"+b.bl.toLocaleString("es-AR")):"—"}</td>
                  <td style={{padding:"8px 10px",textAlign:"right",color:gapColor,fontWeight:gap?600:400}}>{gap!=null?(gap+"%"):"—"}</td>
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
