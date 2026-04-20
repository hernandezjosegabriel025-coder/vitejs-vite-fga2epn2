import { useState, useEffect, useMemo } from "react";

// ─── DATOS DEL PRÉSTAMO DE GABRIEL ───────────────────────────────────────────
const PAGOS_GABRIEL = [
  [1,"15/12/2025",4179.25,6666.67,1066.67,11912.59,813938.68,495820.75],
  [2,"30/12/2025",4234.98,6610.94,1057.75,11903.67,802035.01,491585.77],
  [3,"15/1/2026",4291.44,6554.48,1048.72,11894.64,790140.37,487294.33],
  [4,"30/1/2026",4348.66,6497.26,1039.56,11885.48,778254.89,482945.66],
  [5,"15/2/2026",4406.64,6439.28,1030.28,11876.20,766378.68,478539.02],
  [6,"28/2/2026",4465.40,6380.52,1020.88,11866.80,754511.88,474073.62],
  [7,"15/3/2026",4524.94,6320.98,1011.36,11857.28,742654.60,469548.68],
  [8,"30/3/2026",4585.27,6260.65,1001.70,11847.62,730806.98,464963.41],
  [9,"15/4/2026",4646.41,6199.51,991.92,11837.84,718969.14,460317.00],
  [10,"30/4/2026",4708.36,6137.56,982.01,11827.93,707141.21,455608.64],
  [11,"15/5/2026",4771.14,6074.78,971.97,11817.89,695323.32,450837.50],
  [12,"30/5/2026",4834.75,6011.17,961.79,11807.71,683515.61,446002.75],
  [13,"15/6/2026",4899.22,5946.70,951.47,11797.39,671718.22,441103.53],
  [14,"30/6/2026",4964.54,5881.38,941.02,11786.94,659931.28,436138.99],
  [15,"15/7/2026",5030.73,5815.19,930.43,11776.35,648154.93,431108.26],
  [16,"30/7/2026",5097.81,5748.11,919.70,11765.62,636389.31,426010.45],
  [17,"15/8/2026",5165.78,5680.14,908.82,11754.74,624634.57,420844.67],
  [18,"30/8/2026",5234.66,5611.26,897.80,11743.72,612890.85,415610.01],
  [19,"15/9/2026",5304.45,5541.47,886.63,11732.55,601158.29,410305.55],
  [20,"30/9/2026",5375.18,5470.74,875.32,11721.24,589437.05,404930.38],
  [21,"15/10/2026",5446.85,5399.07,863.85,11709.77,577727.28,399483.53],
  [22,"30/10/2026",5519.47,5326.45,852.23,11698.15,566029.13,393964.05],
  [23,"15/11/2026",5593.07,5252.85,840.46,11686.38,554342.75,388370.99],
  [24,"30/11/2026",5667.64,5178.28,828.52,11674.45,542668.31,382703.35],
  [25,"15/12/2026",5743.21,5102.71,816.43,11662.35,531005.95,376960.14],
  [26,"30/12/2026",5819.79,5026.14,804.18,11650.10,519355.85,371140.35],
  [27,"15/1/2027",5897.38,4948.54,791.77,11637.69,507718.16,365242.97],
  [28,"30/1/2027",5976.01,4869.91,779.19,11625.11,496093.06,359266.96],
  [29,"15/2/2027",6055.69,4790.23,766.44,11612.36,484480.70,353211.26],
  [30,"28/2/2027",6136.44,4709.48,753.52,11599.44,472881.27,347074.82],
  [31,"15/3/2027",6218.26,4627.66,740.43,11586.35,461294.92,340856.57],
  [32,"30/3/2027",6301.17,4544.75,727.16,11573.08,449721.84,334555.40],
  [33,"15/4/2027",6385.18,4460.74,713.72,11559.64,438162.20,328170.22],
  [34,"30/4/2027",6470.32,4375.60,700.10,11546.02,426616.18,321699.90],
  [35,"15/5/2027",6556.59,4289.33,686.29,11532.21,415083.97,315143.32],
  [36,"30/5/2027",6644.01,4201.91,672.31,11518.23,403565.74,308499.31],
  [37,"15/6/2027",6732.60,4113.32,658.13,11504.05,392061.69,301766.71],
  [38,"30/6/2027",6822.36,4023.56,643.77,11489.69,380572.00,294944.35],
  [39,"15/7/2027",6913.33,3932.59,629.21,11475.13,369096.87,288031.02],
  [40,"30/7/2027",7005.51,3840.41,614.47,11460.39,357636.48,281025.51],
  [41,"15/8/2027",7098.91,3747.01,599.52,11445.44,346191.04,273926.60],
  [42,"30/8/2027",7193.57,3652.35,584.38,11430.30,334760.74,266733.03],
  [43,"15/9/2027",7289.48,3556.44,569.03,11414.95,323345.79,259443.55],
  [44,"30/9/2027",7386.67,3459.25,553.48,11399.40,311946.39,252056.88],
  [45,"15/10/2027",7485.16,3360.76,537.72,11383.64,300562.75,244571.72],
  [46,"30/10/2027",7584.96,3260.96,521.75,11367.67,289195.08,236986.75],
  [47,"15/11/2027",7686.10,3159.82,505.57,11351.49,277843.58,229300.66],
  [48,"30/11/2027",7788.58,3057.34,489.17,11335.10,266508.49,221512.08],
  [49,"15/12/2027",7892.43,2953.49,472.56,11318.48,255190.01,213619.65],
  [50,"30/12/2027",7997.66,2848.26,455.72,11301.64,243888.37,205621.99],
  [51,"15/1/2028",8104.29,2741.63,438.66,11284.58,232603.79,197517.70],
  [52,"30/1/2028",8212.35,2633.57,421.37,11267.29,221336.50,189305.35],
  [53,"15/2/2028",8321.85,2524.07,403.85,11249.77,210086.72,180983.50],
  [54,"29/2/2028",8432.81,2413.11,386.10,11232.02,198854.71,172550.69],
  [55,"15/3/2028",8545.24,2300.68,368.11,11214.03,187640.68,164005.45],
  [56,"30/3/2028",8659.18,2186.74,349.88,11195.80,176444.88,155346.27],
  [57,"15/4/2028",8774.64,2071.28,331.41,11177.33,165267.55,146571.63],
  [58,"30/4/2028",8891.63,1954.29,312.69,11158.61,154108.95,137680.00],
  [59,"15/5/2028",9010.19,1835.73,293.72,11139.64,142969.31,128669.81],
  [60,"30/5/2028",9130.32,1715.60,274.50,11120.42,131848.89,119539.49],
  [61,"15/6/2028",9252.06,1593.86,255.02,11100.94,120747.95,110287.43],
  [62,"30/6/2028",9375.42,1470.50,235.28,11081.20,109666.75,100912.01],
  [63,"15/7/2028",9500.43,1345.49,215.28,11061.20,98605.56,91411.58],
  [64,"30/7/2028",9627.10,1218.82,195.01,11040.93,87564.62,81784.48],
  [65,"15/8/2028",9755.46,1090.46,174.47,11020.39,76544.23,72029.02],
  [66,"30/8/2028",9885.53,960.39,153.66,10999.58,65544.65,62143.49],
  [67,"15/9/2028",10017.34,828.58,132.57,10978.49,54566.15,52126.15],
  [68,"30/9/2028",10150.91,695.02,111.20,10957.12,43609.03,41975.24],
  [69,"15/10/2028",10286.25,559.67,89.55,10935.47,32673.56,31688.99],
  [70,"30/10/2028",10423.40,422.52,67.60,10913.52,21760.04,21265.59],
  [71,"15/11/2028",10562.38,283.54,45.37,10891.29,10868.75,10703.21],
  [72,"30/11/2028",10703.21,142.71,22.83,10868.75,0.00,0.00],
].map(r => ({ num:r[0], fecha:r[1], capital:r[2], interes:r[3], iva:r[4], total:r[5], saldo:r[6], pagoAnticipado:r[7] }));

const PRESTAMO_GABRIEL = {
  id: "gabriel-001",
  nombre: "Préstamo Personal",
  titular: "José Gabriel Hernández",
  capital: 500000,
  tasaAnual: 32,
  años: 3,
  formaPago: "quincenal",
  totalPagos: 72,
  fechaInicio: "20/11/2025",
  fechaFin: "15/12/2028",
  totalIntereses: 280906.26,
  iva: 44945.00,
  costoTotal: 825851.26,
  pagos: PAGOS_GABRIEL,
  color: "#0ea5e9",
  emoji: "🏦",
  precargado: true,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const mxn = n => new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:2}).format(n||0);
const todayStr = () => new Date().toISOString().split("T")[0];
const COLORES = ["#0ea5e9","#a78bfa","#34d399","#fb923c","#f472b6","#facc15","#60a5fa","#f87171"];
const EMOJIS = ["🏦","🏠","🚗","💳","📱","🎓","💼","🏥"];

function generarAmortizacion(capital, tasaAnual, totalPagos, frecuencia, fechaInicio) {
  const periodosPorAño = frecuencia === "quincenal" ? 24 : frecuencia === "mensual" ? 12 : frecuencia === "semanal" ? 52 : 12;
  const tasaPeriodo = tasaAnual / 100 / periodosPorAño;
  const pago = capital * (tasaPeriodo * Math.pow(1+tasaPeriodo, totalPagos)) / (Math.pow(1+tasaPeriodo, totalPagos) - 1);
  
  let saldo = capital;
  const pagos = [];
  let fecha = new Date(fechaInicio);
  const diasPeriodo = frecuencia === "quincenal" ? 15 : frecuencia === "mensual" ? 30 : frecuencia === "semanal" ? 7 : 30;

  for (let i = 1; i <= totalPagos; i++) {
    fecha = new Date(fecha.getTime() + diasPeriodo * 24*60*60*1000);
    const interes = saldo * tasaPeriodo;
    const iva = interes * 0.16;
    const cap = pago - interes;
    saldo = Math.max(0, saldo - cap);
    const dd = String(fecha.getDate()).padStart(2,"0");
    const mm = String(fecha.getMonth()+1).padStart(2,"0");
    const yy = fecha.getFullYear();
    pagos.push({
      num: i,
      fecha: `${dd}/${mm}/${yy}`,
      capital: +cap.toFixed(2),
      interes: +interes.toFixed(2),
      iva: +iva.toFixed(2),
      total: +(pago + iva).toFixed(2),
      saldo: +saldo.toFixed(2),
      pagoAnticipado: +(saldo).toFixed(2),
    });
  }
  return pagos;
}

const Badge = ({children, color}) => (
  <span style={{
    display:"inline-block", padding:"2px 8px", borderRadius:20,
    fontSize:10, fontWeight:700, letterSpacing:0.5,
    background: color+"22", color
  }}>{children}</span>
);

export default function App() {
  const [prestamos, setPrestamos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("prestamos_v2") || "null");
      if (saved) return saved;
    } catch {}
    return [PRESTAMO_GABRIEL];
  });

  const [pagadosMap, setPagadosMap] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pagados_v2") || "{}"); } catch { return {}; }
  });

  const [pantalla, setPantalla] = useState("inicio");
  const [prestamoActivo, setPrestamoActivo] = useState(null);
  const [tab, setTab] = useState("resumen");
  const [liquidarNum, setLiquidarNum] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const [form, setForm] = useState({
    nombre:"", titular:"", capital:"", tasaAnual:"", años:"",
    formaPago:"mensual", fechaInicio: todayStr(),
    color: COLORES[1], emoji: EMOJIS[0]
  });

  useEffect(() => { localStorage.setItem("prestamos_v2", JSON.stringify(prestamos)); }, [prestamos]);
  useEffect(() => { localStorage.setItem("pagados_v2", JSON.stringify(pagadosMap)); }, [pagadosMap]);

  const getPagados = (id) => pagadosMap[id] || [];
  const togglePago = (id, num) => {
    setPagadosMap(m => {
      const prev = m[id] || [];
      return { ...m, [id]: prev.includes(num) ? prev.filter(x=>x!==num) : [...prev, num] };
    });
  };

  const prestamo = prestamoActivo ? prestamos.find(p=>p.id===prestamoActivo) : null;
  const pagados = prestamo ? getPagados(prestamo.id) : [];
  const pagosData = prestamo?.pagos || [];
  const siguientePago = pagosData.find(p => !pagados.includes(p.num));
  const progreso = prestamo ? (pagados.length / prestamo.totalPagos) * 100 : 0;

  const totalDeuda = prestamos.reduce((s, p) => {
    const pags = getPagados(p.id);
    const sig = p.pagos.find(x => !pags.includes(x.num));
    return s + (sig?.saldo || 0);
  }, 0);
  const totalPagosProximos = prestamos.reduce((s, p) => {
    const pags = getPagados(p.id);
    const sig = p.pagos.find(x => !pags.includes(x.num));
    return s + (sig?.total || 0);
  }, 0);

  const agregarPrestamo = () => {
    if (!form.nombre || !form.capital || !form.tasaAnual || !form.años) return;
    const totalPagos = Math.round(form.años * (form.formaPago==="quincenal"?24:form.formaPago==="semanal"?52:12));
    const pagos = generarAmortizacion(+form.capital, +form.tasaAnual, totalPagos, form.formaPago, form.fechaInicio);
    const totalIntereses = pagos.reduce((s,p)=>s+p.interes,0);
    const totalIva = pagos.reduce((s,p)=>s+p.iva,0);
    const nuevo = {
      id: "prestamo-"+Date.now(),
      nombre: form.nombre, titular: form.titular || "Sin titular",
      capital: +form.capital, tasaAnual: +form.tasaAnual,
      años: +form.años, formaPago: form.formaPago,
      totalPagos, fechaInicio: form.fechaInicio, fechaFin: pagos[pagos.length-1]?.fecha || "",
      totalIntereses: +totalIntereses.toFixed(2), iva: +totalIva.toFixed(2),
      costoTotal: +(+form.capital + totalIntereses + totalIva).toFixed(2),
      pagos, color: form.color, emoji: form.emoji,
    };
    setPrestamos(p => [...p, nuevo]);
    setForm({ nombre:"", titular:"", capital:"", tasaAnual:"", años:"", formaPago:"mensual", fechaInicio:todayStr(), color:COLORES[1], emoji:EMOJIS[0] });
    setPantalla("inicio");
  };

  const eliminarPrestamo = (id) => {
    setPrestamos(p => p.filter(x => x.id !== id));
    setPagadosMap(m => { const n={...m}; delete n[id]; return n; });
    setPantalla("inicio");
    setPrestamoActivo(null);
  };

  const abrirDetalle = (id) => {
    setPrestamoActivo(id);
    setTab("resumen");
    setLiquidarNum(null);
    setShowAll(false);
    setPantalla("detalle");
  };

  const S = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#060810;}
    ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#1e293b;}
    .card{background:#0d1117;border:1px solid #161d2b;border-radius:16px;padding:16px;}
    .input{background:#0d1117;border:1.5px solid #1e293b;border-radius:12px;color:#f0f2ff;
      padding:13px 16px;font-size:15px;font-family:inherit;width:100%;margin-bottom:12px;}
    .input:focus{outline:none;border-color:#0ea5e9;}
    .input option{background:#0d1117;}
    .btn{border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;
      padding:14px 20px;transition:transform .15s,opacity .15s;}
    .btn:active{transform:scale(.96);opacity:.9;}
    .btn-primary{background:linear-gradient(135deg,#0369a1,#0ea5e9);color:#fff;}
    .btn-danger{background:linear-gradient(135deg,#7f1d1d,#ef4444);color:#fff;}
    .btn-ghost{background:#0d1117;border:1px solid #1e293b!important;color:#94a3b8;border:none;}
    .tab-bar{display:flex;background:#0c0f1a;border-bottom:1px solid #111827;position:sticky;top:0;z-index:50;}
    .tab-btn{flex:1;padding:14px 4px;background:none;border:none;color:#4b5563;font-size:11px;
      font-weight:700;cursor:pointer;font-family:inherit;border-bottom:2px solid transparent;
      letter-spacing:.3px;text-transform:uppercase;}
    .tab-btn.active{border-bottom-color:var(--ac);color:var(--ac);}
    .pago-row{display:flex;align-items:center;gap:12px;padding:13px 16px;
      border-bottom:1px solid #0a0f18;cursor:pointer;transition:background .15s;}
    .pago-row:active{background:#0d1117;}
    .check{width:24px;height:24px;border-radius:6px;border:2px solid #1e3a5f;
      display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;}
    .label-xs{font-size:10px;color:#4b5563;font-weight:700;letter-spacing:.8px;text-transform:uppercase;}
    .mono{font-family:'DM Mono',monospace;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .anim{animation:fadeUp .25s ease;}
  `;

  if (pantalla === "inicio") return (
    <div style={{minHeight:"100vh",background:"#060810",color:"#f0f2ff",fontFamily:"'DM Sans',sans-serif",maxWidth:430,margin:"0 auto",paddingBottom:80}}>
      <style>{S}</style>
      <div style={{background:"linear-gradient(160deg,#0a1220,#060810)",padding:"40px 20px 24px",borderBottom:"1px solid #0f1520"}}>
        <div className="label-xs" style={{color:"#0ea5e9",marginBottom:6}}>💰 MIS PRÉSTAMOS</div>
        <div style={{fontSize:26,fontWeight:800,letterSpacing:-0.5}}>Control Financiero</div>
        <div style={{display:"flex",gap:10,marginTop:18}}>
          {[
            {l:"Deuda total",v:mxn(totalDeuda),c:"#f87171"},
            {l:"Próx. pagos",v:mxn(totalPagosProximos),c:"#fbbf24"},
            {l:"Préstamos",v:prestamos.length,c:"#34d399"},
          ].map(({l,v,c})=>(
            <div key={l} className="card" style={{flex:1,padding:"10px 12px"}}>
              <div className="label-xs" style={{marginBottom:5}}>{l}</div>
              <div style={{fontSize:15,fontWeight:800,color:c}} className="mono">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:"14px 0 0"}}>
        {prestamos.map(p => {
          const pags = getPagados(p.id);
          const sig = p.pagos.find(x=>!pags.includes(x.num));
          const prog = (pags.length/p.totalPagos)*100;
          const terminado = pags.length >= p.totalPagos;
          return (
            <div key={p.id} className="anim" style={{margin:"0 16px 12px",cursor:"pointer"}} onClick={()=>abrirDetalle(p.id)}>
              <div style={{background:"#0d1117",border:`1.5px solid ${p.color}33`,borderRadius:18,padding:18,borderLeft:`4px solid ${p.color}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                      <span style={{fontSize:20}}>{p.emoji}</span>
                      <span style={{fontSize:16,fontWeight:700}}>{p.nombre}</span>
                      {terminado && <Badge color="#34d399">LIQUIDADO</Badge>}
                    </div>
                    <div style={{fontSize:12,color:"#4b5563"}}>{p.titular} · {p.formaPago}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,color:"#4b5563"}}>Saldo capital</div>
                    <div style={{fontSize:18,fontWeight:800,color:p.color}} className="mono">{mxn(sig?.saldo||0)}</div>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#6b7280",marginBottom:8}}>
                  <span>Progreso: {pags.length}/{p.totalPagos} pagos</span>
                  <span style={{color:p.color,fontWeight:700}}>{prog.toFixed(0)}%</span>
                </div>
                <div style={{height:6,background:"#111827",borderRadius:6,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:6,background:`linear-gradient(90deg,${p.color}88,${p.color})`,width:`${prog}%`,transition:"width .5s"}}/>
                </div>
                {sig && (
                  <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #111827",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:12,color:"#6b7280"}}>Próximo pago · {sig.fecha}</div>
                    <div style={{fontSize:16,fontWeight:800}} className="mono">{mxn(sig.total)}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={()=>setPantalla("nuevo")} style={{
        position:"fixed",bottom:24,right:24,width:58,height:58,borderRadius:"50%",
        background:"linear-gradient(135deg,#0369a1,#0ea5e9)",border:"none",color:"#fff",
        fontSize:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 8px 24px #0ea5e940",zIndex:100,fontWeight:300
      }}>+</button>
    </div>
  );

  if (pantalla === "nuevo") return (
    <div style={{minHeight:"100vh",background:"#060810",color:"#f0f2ff",fontFamily:"'DM Sans',sans-serif",maxWidth:430,margin:"0 auto",paddingBottom:40}}>
      <style>{S}</style>
      <div style={{background:"#0a0f1a",padding:"36px 20px 20px",borderBottom:"1px solid #111827",display:"flex",alignItems:"center",gap:12}}>
        <button className="btn btn-ghost" style={{padding:"8px 12px",fontSize:20}} onClick={()=>setPantalla("inicio")}>←</button>
        <div style={{fontSize:20,fontWeight:800}}>Nuevo Préstamo</div>
      </div>

      <div style={{padding:"20px 16px"}}>
        <div className="label-xs" style={{marginBottom:8}}>Ícono</div>
        <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
          {EMOJIS.map(e=>(
            <button key={e} onClick={()=>setForm(f=>({...f,emoji:e}))} style={{
              width:40,height:40,borderRadius:10,border:`2px solid ${form.emoji===e?"#0ea5e9":"#1e293b"}`,
              background:form.emoji===e?"#0ea5e922":"#0d1117",fontSize:20,cursor:"pointer"
            }}>{e}</button>
          ))}
        </div>

        <div className="label-xs" style={{marginBottom:8}}>Color</div>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {COLORES.map(c=>(
            <button key={c} onClick={()=>setForm(f=>({...f,color:c}))} style={{
              width:28,height:28,borderRadius:"50%",background:c,border:`3px solid ${form.color===c?"#fff":"transparent"}`,cursor:"pointer"
            }}/>
          ))}
        </div>

        <div className="label-xs" style={{marginBottom:6}}>Nombre del préstamo *</div>
        <input className="input" placeholder="Ej. Crédito INFONAVIT, Auto, etc." value={form.nombre}
          onChange={e=>setForm(f=>({...f,nombre:e.target.value}))}/>

        <div className="label-xs" style={{marginBottom:6}}>Titular / Institución</div>
        <input className="input" placeholder="Ej. Banco Azteca, HSBC..." value={form.titular}
          onChange={e=>setForm(f=>({...f,titular:e.target.value}))}/>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div>
            <div className="label-xs" style={{marginBottom:6}}>Capital (MXN) *</div>
            <input className="input" type="number" placeholder="0" value={form.capital}
              onChange={e=>setForm(f=>({...f,capital:e.target.value}))}/>
          </div>
          <div>
            <div className="label-xs" style={{marginBottom:6}}>Tasa anual % *</div>
            <input className="input" type="number" placeholder="0" value={form.tasaAnual}
              onChange={e=>setForm(f=>({...f,tasaAnual:e.target.value}))}/>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div>
            <div className="label-xs" style={{marginBottom:6}}>Plazo (años) *</div>
            <input className="input" type="number" placeholder="1" value={form.años}
              onChange={e=>setForm(f=>({...f,años:e.target.value}))}/>
          </div>
          <div>
            <div className="label-xs" style={{marginBottom:6}}>Forma de pago</div>
            <select className="input" value={form.formaPago} onChange={e=>setForm(f=>({...f,formaPago:e.target.value}))}>
              <option value="semanal">Semanal</option>
              <option value="quincenal">Quincenal</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>
        </div>

        <div className="label-xs" style={{marginBottom:6}}>Fecha de inicio</div>
        <input className="input" type="date" value={form.fechaInicio}
          onChange={e=>setForm(f=>({...f,fechaInicio:e.target.value}))}/>

        {form.capital && form.tasaAnual && form.años && (
          <div style={{background:"#0a1220",borderRadius:14,padding:14,marginBottom:16,border:"1px solid #1e3a5f"}}>
            <div className="label-xs" style={{color:"#0ea5e9",marginBottom:10}}>Vista previa calculada</div>
            {(() => {
              const pp = form.formaPago==="quincenal"?24:form.formaPago==="semanal"?52:12;
              const tot = Math.round(form.años*pp);
              const tp = form.tasaAnual/100/pp;
              const pago = +form.capital*(tp*Math.pow(1+tp,tot))/(Math.pow(1+tp,tot)-1);
              const totInt = pago*tot - +form.capital;
              return (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[
                    ["Pago "+form.formaPago,mxn(pago*(1.16)),"#f0f2ff"],
                    ["Total pagos",tot,"#fbbf24"],
                    ["Total intereses",mxn(totInt),"#f87171"],
                    ["Costo total",mxn(+form.capital+totInt*(1.16)),"#34d399"],
                  ].map(([l,v,c])=>(
                    <div key={l} style={{background:"#060810",borderRadius:10,padding:"10px 12px"}}>
                      <div className="label-xs" style={{marginBottom:4}}>{l}</div>
                      <div style={{fontSize:14,fontWeight:800,color:c}} className="mono">{v}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        <button className="btn btn-primary" style={{width:"100%"}} onClick={agregarPrestamo}>
          ➕ Agregar préstamo
        </button>
      </div>
    </div>
  );

  if (pantalla === "detalle" && prestamo) {
    const ac = prestamo.color;
    const capitalPagado = pagosData.filter(p=>pagados.includes(p.num)).reduce((s,p)=>s+p.capital,0);
    const pagosVis = showAll ? pagosData : pagosData.slice(0,25);

    return (
      <div style={{minHeight:"100vh",background:"#060810",color:"#f0f2ff",fontFamily:"'DM Sans',sans-serif",maxWidth:430,margin:"0 auto",paddingBottom:30}}>
        <style>{`${S}.tab-btn.active{--ac:${ac};}`}</style>

        <div style={{background:`linear-gradient(160deg,#0a1220,#060810)`,padding:"36px 20px 20px",borderBottom:"1px solid #111827",borderTop:`3px solid ${ac}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <button className="btn btn-ghost" style={{padding:"6px 10px",fontSize:18}} onClick={()=>setPantalla("inicio")}>←</button>
            <span style={{fontSize:22}}>{prestamo.emoji}</span>
            <div>
              <div style={{fontSize:17,fontWeight:800}}>{prestamo.nombre}</div>
              <div style={{fontSize:12,color:"#4b5563"}}>{prestamo.titular}</div>
            </div>
            <button className="btn btn-ghost" style={{marginLeft:"auto",padding:"6px 10px",fontSize:16,color:"#ef4444"}}
              onClick={()=>{ if(window.confirm("¿Eliminar este préstamo?")) eliminarPrestamo(prestamo.id); }}>🗑</button>
          </div>

          <div style={{display:"flex",gap:10}}>
            <div className="card" style={{flex:1,padding:"10px 12px"}}>
              <div className="label-xs" style={{marginBottom:4}}>Saldo capital</div>
              <div style={{fontSize:18,fontWeight:800,color:ac}} className="mono">{mxn(siguientePago?.saldo||0)}</div>
            </div>
            <div className="card" style={{flex:1,padding:"10px 12px"}}>
              <div className="label-xs" style={{marginBottom:4}}>Capital original</div>
              <div style={{fontSize:18,fontWeight:800}} className="mono">{mxn(prestamo.capital)}</div>
            </div>
          </div>

          <div style={{marginTop:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:12,color:"#4b5563"}}>Progreso</span>
              <span style={{fontSize:12,fontWeight:700,color:ac}}>{pagados.length}/{prestamo.totalPagos} ({progreso.toFixed(1)}%)</span>
            </div>
            <div style={{height:7,background:"#111827",borderRadius:8,overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:8,background:`linear-gradient(90deg,${ac}88,${ac})`,width:`${progreso}%`,transition:"width .5s"}}/>
            </div>
          </div>
        </div>

        <div className="tab-bar">
          {[["resumen","📊 Resumen"],["tabla","📋 Pagos"],["liquidar","⚡ Liquidar"]].map(([id,label])=>(
            <button key={id} className={`tab-btn${tab===id?" active":""}`} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </div>

        {tab==="resumen" && (
          <div style={{padding:"14px 16px"}}>
            {siguientePago && (
              <div style={{background:`linear-gradient(135deg,#0a1628,#0d1117)`,border:`1.5px solid ${ac}55`,borderRadius:18,padding:18,marginBottom:14}}>
                <div className="label-xs" style={{color:ac,marginBottom:10}}>⏰ PRÓXIMO PAGO #{siguientePago.num}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:12,color:"#6b7280"}}>{siguientePago.fecha}</div>
                    <div style={{fontSize:30,fontWeight:800,color:ac,marginTop:4}} className="mono">{mxn(siguientePago.total)}</div>
                  </div>
                  <button className="btn" style={{background:`${ac}22`,color:ac,border:`1px solid ${ac}44`,padding:"10px 14px",fontSize:13}}
                    onClick={()=>togglePago(prestamo.id,siguientePago.num)}>✓ Pagado</button>
                </div>
                <div style={{display:"flex",gap:14,marginTop:14,paddingTop:14,borderTop:`1px solid ${ac}22`}}>
                  {[["Capital",mxn(siguientePago.capital)],["Interés",mxn(siguientePago.interes)],["IVA",mxn(siguientePago.iva)]].map(([l,v])=>(
                    <div key={l}><div className="label-xs">{l}</div><div style={{fontSize:13,fontWeight:700,marginTop:3}} className="mono">{v}</div></div>
                  ))}
                </div>
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                ["Pagos hechos",pagados.length,"#34d399"],
                ["Pagos restantes",prestamo.totalPagos-pagados.length,"#fbbf24"],
                ["Capital pagado",mxn(capitalPagado),"#34d399"],
                ["Tasa anual",prestamo.tasaAnual+"%","#f0f2ff"],
                ["Total intereses",mxn(prestamo.totalIntereses),"#f87171"],
                ["Costo total",mxn(prestamo.costoTotal),"#fb923c"],
              ].map(([l,v,c])=>(
                <div key={l} className="card" style={{padding:"12px"}}>
                  <div className="label-xs" style={{marginBottom:6}}>{l}</div>
                  <div style={{fontSize:16,fontWeight:800,color:c}} className="mono">{v}</div>
                </div>
              ))}
            </div>

            <div style={{marginTop:14,background:"#0a1220",borderRadius:14,padding:14,border:`1px solid ${ac}33`}}>
              <div className="label-xs" style={{color:"#fbbf24",marginBottom:8}}>💡 LIQUIDACIÓN HOY</div>
              <div style={{fontSize:14,color:"#9ca3af",lineHeight:1.7}}>
                Saldo a liquidar ahora:{" "}
                <span style={{color:ac,fontWeight:800}} className="mono">{mxn(siguientePago?.saldo||0)}</span>
                {" "}— sin intereses futuros.
              </div>
              <button className="btn btn-ghost" style={{marginTop:10,width:"100%",color:ac}} onClick={()=>setTab("liquidar")}>
                Ver calculadora de liquidación →
              </button>
            </div>
          </div>
        )}

        {tab==="tabla" && (
          <div>
            <div style={{padding:"10px 16px 4px",fontSize:12,color:"#4b5563"}}>Toca para marcar como pagado</div>
            {pagosVis.map(p=>{
              const isPag = pagados.includes(p.num);
              const esProx = !isPag && p.num===siguientePago?.num;
              return (
                <div key={p.num} className="pago-row" style={{opacity:isPag?.55:1}} onClick={()=>togglePago(prestamo.id,p.num)}>
                  <div className="check" style={isPag?{background:"#15803d",borderColor:"#15803d"}:esProx?{borderColor:ac}:{}}>
                    {isPag && <span style={{color:"#fff",fontSize:13,fontWeight:800}}>✓</span>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <span style={{fontSize:13,fontWeight:700}}>Pago #{p.num}</span>
                      {esProx && <Badge color={ac}>PRÓXIMO</Badge>}
                      {isPag && <Badge color="#34d399">PAGADO</Badge>}
                    </div>
                    <div style={{fontSize:11,color:"#4b5563"}}>{p.fecha} · Cap: {mxn(p.capital)}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:15,fontWeight:800,color:isPag?"#34d399":esProx?ac:"#f0f2ff"}} className="mono">{mxn(p.total)}</div>
                    <div style={{fontSize:10,color:"#374151"}}>Saldo: {mxn(p.saldo)}</div>
                  </div>
                </div>
              );
            })}
            {!showAll && pagosData.length>25 && (
              <div style={{padding:"16px",textAlign:"center"}}>
                <button className="btn btn-ghost" onClick={()=>setShowAll(true)}>Ver todos los {pagosData.length} pagos ↓</button>
              </div>
            )}
          </div>
        )}

        {tab==="liquidar" && (
          <div style={{padding:"14px 16px"}}>
            <div className="label-xs" style={{color:ac,marginBottom:12}}>⚡ LIQUIDACIÓN ANTICIPADA</div>
            <div style={{background:"#0d1117",borderRadius:16,border:"1px solid #161d2b",overflow:"hidden",marginBottom:14}}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid #0a0d14",fontSize:13,color:"#6b7280"}}>
                Selecciona el pago en que quieres liquidar:
              </div>
              {pagosData.filter(p=>!pagados.includes(p.num)).map(p=>{
                const isSel = liquidarNum===p.num;
                const esProx = p.num===siguientePago?.num;
                return (
                  <div key={p.num} onClick={()=>setLiquidarNum(isSel?null:p.num)} style={{
                    padding:"13px 16px",borderBottom:"1px solid #0a0d14",
                    background:isSel?"#0a1628":"transparent",cursor:"pointer",
                    display:"flex",alignItems:"center",gap:12
                  }}>
                    <div style={{width:10,height:10,borderRadius:"50%",flexShrink:0,
                      background:isSel?ac:esProx?"#fbbf24":"#1e3a5f",
                      boxShadow:isSel?`0 0 8px ${ac}`:"none"}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600}}>Pago #{p.num} — {p.fecha}
                        {esProx && <Badge color="#fbbf24"> PRÓXIMO</Badge>}
                      </div>
                      <div style={{fontSize:11,color:"#4b5563",marginTop:2}}>Saldo: {mxn(p.saldo)}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:14,fontWeight:800,color:isSel?ac:"#6b7280"}} className="mono">{mxn(p.pagoAnticipado||p.saldo)}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {liquidarNum && (()=>{
              const p = pagosData.find(x=>x.num===liquidarNum);
              const ahorro = pagosData.filter(x=>x.num>liquidarNum).reduce((s,x)=>s+x.interes+x.iva,0);
              const evitas = prestamo.totalPagos - liquidarNum;
              return (
                <div style={{background:`linear-gradient(135deg,#0a1628,#0d1117)`,borderRadius:20,border:`1.5px solid ${ac}`,padding:20,animation:"fadeUp .2s ease"}}>
                  <div className="label-xs" style={{color:ac,marginBottom:12}}>💰 LIQUIDAR EN PAGO #{liquidarNum} — {p.fecha}</div>
                  <div style={{fontSize:12,color:"#6b7280",marginBottom:4}}>Monto a pagar:</div>
                  <div style={{fontSize:34,fontWeight:800,color:ac,marginBottom:16}} className="mono">{mxn(p.pagoAnticipado||p.saldo)}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                    {[
                      ["Saldo capital",mxn(p.saldo),"#f0f2ff"],
                      ["Pagos que evitas",evitas,"#fbbf24"],
                      ["Ahorras en intereses",mxn(ahorro),"#34d399"],
                      ["Tasa anual",prestamo.tasaAnual+"%","#f0f2ff"],
                    ].map(([l,v,c])=>(
                      <div key={l} style={{background:"#060810",borderRadius:12,padding:"10px 12px",border:"1px solid #111827"}}>
                        <div className="label-xs" style={{marginBottom:5}}>{l}</div>
                        <div style={{fontSize:15,fontWeight:800,color:c}} className="mono">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{fontSize:12,color:"#374151",padding:12,background:"#060810",borderRadius:12,border:"1px solid #0f1520",lineHeight:1.7}}>
                    ⚠️ Confirma el monto exacto con tu institución antes de liquidar.
                  </div>
                </div>
              );
            })()}
            {!liquidarNum && <div style={{textAlign:"center",padding:"24px 0",color:"#374151",fontSize:13}}>👆 Selecciona un pago para ver el detalle</div>}
          </div>
        )}
      </div>
    );
  }

  return null;
}
