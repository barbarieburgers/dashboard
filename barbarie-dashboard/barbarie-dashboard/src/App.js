import React, { useState, useMemo } from 'react';
import './styles.css';
import { VENTAS, VENTAS_Q1, BURGERS, MENU_STATUS, TOP5, MARKETING_INSIGHTS } from './data';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, Legend
} from 'recharts';

const C = { gold: '#ffb000', red: '#c94a2b', green: '#4caf85', cream: '#fcefd3', petrol: '#0c262d' };

const fmt = (n) => '$' + Math.round(n).toLocaleString('es-AR');
const fmtM = (n) => '$' + (n / 1000000).toFixed(1) + 'M';
const fmtN = (n) => Math.round(n).toLocaleString('es-AR');

const FILTER_LABELS = { ene: 'enero', feb: 'febrero', mar: 'marzo', q1: 'Q1 total' };
const MONTH_LABELS  = { ene: 'Enero', feb: 'Febrero', mar: 'Marzo' };

const tooltipStyle = {
  backgroundColor: '#091e23', border: '1px solid rgba(255,176,0,0.3)',
  borderRadius: 8, fontSize: 12, color: C.cream,
};

function CustomTooltip({ active, payload, label, format }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <p style={{ color: C.gold, fontWeight: 500, padding: '8px 12px 4px' }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ padding: '2px 12px 8px', color: p.color || C.cream }}>
          {p.name ? `${p.name}: ` : ''}{format ? format(p.value) : fmtN(p.value)}
        </p>
      ))}
    </div>
  );
}

function BarRow({ rank, label, value, max, dim, red }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const fillClass = red ? 'bar-fill red' : dim ? 'bar-fill dim' : 'bar-fill';
  const valClass  = dim ? 'bar-val dim' : 'bar-val';
  return (
    <div className="bar-row">
      {rank !== undefined && <span className="bar-rank">{rank}</span>}
      <span className="bar-label">{label}</span>
      <div className="bar-track"><div className={fillClass} style={{ width: pct + '%' }} /></div>
      <span className={valClass}>{fmtN(value)}</span>
    </div>
  );
}

function InsightIcon({ tipo }) {
  const styles = {
    star:  { bg: 'rgba(255,176,0,0.15)',   color: C.gold },
    up:    { bg: 'rgba(76,175,133,0.15)',  color: C.green },
    info:  { bg: 'rgba(255,176,0,0.15)',   color: C.gold },
    alert: { bg: 'rgba(201,74,43,0.15)',   color: C.red },
  };
  const s = styles[tipo] || styles.info;
  return (
    <div className="insight-icon" style={{ background: s.bg }}>
      {tipo === 'star'  && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z" fill={s.color}/></svg>}
      {tipo === 'up'    && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><polyline points="2,11 6,7 10,9 14,4" stroke={s.color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
      {tipo === 'info'  && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke={s.color} strokeWidth="1.2" fill="none"/><line x1="8" y1="5" x2="8" y2="9" stroke={s.color} strokeWidth="1.2" strokeLinecap="round"/><circle cx="8" cy="11" r=".8" fill={s.color}/></svg>}
      {tipo === 'alert' && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><line x1="8" y1="3" x2="8" y2="9" stroke={s.color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="12" r="1" fill={s.color}/></svg>}
    </div>
  );
}

function TabVentas({ filter }) {
  const data = filter === 'q1' ? VENTAS_Q1 : VENTAS[filter];
  const maxSide = Math.max(data.burg, data.pp);

  const ventasMes = ['ene', 'feb', 'mar'].map(m => ({
    mes: MONTH_LABELS[m],
    venta: VENTAS[m].venta,
    ganancia: VENTAS[m].ganancia,
  }));

  const ticket = Math.round(data.venta / data.pedidos);

  return (
    <>
      <div className="grid-4">
        <div className="card card-accent">
          <div className="card-label">Venta del período</div>
          <div className="kpi-val gold">{fmt(data.venta)}</div>
          <div className="kpi-delta">{fmtN(data.pedidos)} pedidos</div>
        </div>
        <div className="card">
          <div className="card-label">Ganancia neta</div>
          <div className="kpi-val">{fmt(data.ganancia)}</div>
          <div className={`kpi-delta ${data.gananciaReal ? 'up' : ''}`}>
            {data.gananciaReal ? 'ganancia real' : 'ganancia bruta'}
          </div>
        </div>
        <div className="card">
          <div className="card-label">Pedidos</div>
          <div className="kpi-val">{fmtN(data.pedidos)}</div>
          <div className="kpi-delta">ticket prom. {fmt(ticket)}</div>
        </div>
        <div className="card">
          <div className="card-label">Productos vendidos</div>
          <div className="kpi-val">{fmtN(data.productos)}</div>
          <div className="kpi-delta">burgers + sides</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Desglose de productos</div>
          <BarRow label="Hamburguesas"  value={data.burg}  max={maxSide} />
          <BarRow label="Papas promo"   value={data.pp}    max={maxSide} />
          <BarRow label="Medallón extra" value={data.med}  max={maxSide} />
          <BarRow label="Coca Cola"     value={data.coca}  max={maxSide} dim />
          <BarRow label="Papas"         value={data.papas} max={maxSide} dim />
          <BarRow label="Frituras"      value={data.frit}  max={maxSide} dim />
          <BarRow label="Sandwiches"    value={data.sand}  max={maxSide} dim />
          <BarRow label="Dips"          value={data.dips}  max={maxSide} dim />
        </div>
        <div className="card">
          <div className="card-title">Mix de categorías</div>
          <div className="donut-wrap" style={{ marginBottom: 16 }}>
            <div style={{ width: 90, height: 90, flex: '0 0 90px' }}>
              <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(252,239,211,0.07)" strokeWidth="3.8"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={C.gold} strokeWidth="3.8" strokeDasharray="91 9" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(252,239,211,0.3)" strokeWidth="3.8" strokeDasharray="4 96" strokeDashoffset="-91" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={C.red} strokeWidth="3.8" strokeDasharray="3 97" strokeDashoffset="-95" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="donut-legend">
              <div className="legend-row"><div className="legend-dot" style={{ background: C.gold }}/><div className="legend-name">Burgers</div><div className="legend-pct">91%</div></div>
              <div className="legend-row"><div className="legend-dot" style={{ background: 'rgba(252,239,211,0.3)' }}/><div className="legend-name">Papas</div><div className="legend-pct">4%</div></div>
              <div className="legend-row"><div className="legend-dot" style={{ background: C.red }}/><div className="legend-name">Frituras</div><div className="legend-pct">3%</div></div>
              <div className="legend-row"><div className="legend-dot" style={{ background: 'rgba(252,239,211,0.1)' }}/><div className="legend-name">Otros</div><div className="legend-pct">2%</div></div>
            </div>
          </div>
          <div className="sep" />
          <div className="stat-row"><span className="stat-label">Venta Q1 total</span><span className="stat-val">{fmt(VENTAS_Q1.venta)}</span></div>
          <div className="stat-row"><span className="stat-label">Ganancia Q1</span><span className="stat-val">{fmt(VENTAS_Q1.ganancia)}</span></div>
          <div className="stat-row"><span className="stat-label">Pedidos Q1</span><span className="stat-val">{fmtN(VENTAS_Q1.pedidos)}</span></div>
        </div>
      </div>

      <div className="grid-half">
        <div className="card">
          <div className="card-title">Ventas mensuales — Q1 2026</div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ventasMes} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <XAxis dataKey="mes" tick={{ fill: 'rgba(252,239,211,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(252,239,211,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtM} width={48} />
                <Tooltip content={<CustomTooltip format={fmt} />} />
                <Bar dataKey="venta" radius={[4,4,0,0]} name="Venta">
                  {ventasMes.map((e, i) => <Cell key={i} fill={e.venta < 12000000 ? C.red : C.gold} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Venta vs ganancia — Q1 2026</div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ventasMes} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
                <XAxis dataKey="mes" tick={{ fill: 'rgba(252,239,211,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(252,239,211,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtM} width={48} />
                <Tooltip content={<CustomTooltip format={fmt} />} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(252,239,211,0.5)' }} />
                <Line type="monotone" dataKey="venta"    name="Venta"    stroke={C.gold}  strokeWidth={2} dot={{ fill: C.gold, r: 4 }} />
                <Line type="monotone" dataKey="ganancia" name="Ganancia" stroke={C.green} strokeWidth={2} dot={{ fill: C.green, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

function TabProductos({ filter }) {
  const sorted = useMemo(() => [...BURGERS[filter]].sort((a, b) => b.v - a.v), [filter]);
  const max = sorted[0]?.v || 1;
  const totalBurgers = sorted.reduce((s, x) => s + x.v, 0);

  const top5Data = ['ene', 'feb', 'mar'].map(m => {
    const row = { mes: MONTH_LABELS[m] };
    TOP5.forEach(name => {
      const found = BURGERS[m].find(b => b.n === name);
      row[name] = found ? found.v : 0;
    });
    return row;
  });

  const top5Colors = [C.gold, C.red, 'rgba(252,239,211,0.45)', 'rgba(252,239,211,0.25)', 'rgba(255,176,0,0.35)'];

  return (
    <>
      <div className="grid-half">
        <div className="card">
          <div className="card-title">Ranking burgers — {FILTER_LABELS[filter]}</div>
          {sorted.map((b, i) => (
            <BarRow key={b.n} rank={i + 1} label={b.n} value={b.v} max={max} dim={i >= 5} />
          ))}
          <div className="sep" />
          <div className="stat-row">
            <span className="stat-label">Total burgers {FILTER_LABELS[filter]}</span>
            <span className="stat-val">{fmtN(totalBurgers)}</span>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Estado del menú</div>
          {MENU_STATUS.map(m => (
            <div className="menu-row" key={m.nombre}>
              <span className="menu-name">{m.nombre}</span>
              <span className={`badge ${m.estado}`}>{m.label}</span>
            </div>
          ))}
          <div className="sep" />
          <div className="stat-row"><span className="stat-label">Total burgers Q1</span><span className="stat-val">3.369</span></div>
          <div className="stat-row"><span className="stat-label">Total ítems en menú</span><span className="stat-val">14</span></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Evolución top 5 burgers por mes</div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top5Data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <XAxis dataKey="mes" tick={{ fill: 'rgba(252,239,211,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(252,239,211,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(252,239,211,0.5)' }} />
              {TOP5.map((name, i) => (
                <Bar key={name} dataKey={name} fill={top5Colors[i]} radius={[3,3,0,0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

function TabMarketing() {
  return (
    <div className="card">
      <div className="card-title">Inteligencia comercial — Q1 2026</div>
      {MARKETING_INSIGHTS.map((ins, i) => (
        <div className="insight" key={i}>
          <InsightIcon tipo={ins.tipo} />
          <div>
            <div className="insight-text">{ins.texto}</div>
            <div className="insight-sub">{ins.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('ventas');
  const [filter, setFilter] = useState('ene');

  return (
    <div className="app">
      <div className="topbar">
        <div className="logo">
          BARBARIE
          <span className="logo-sub">HAMBURGUESAS · Q1 2026</span>
        </div>
        <div className="nav">
          {['ventas','productos','marketing'].map(t => (
            <button key={t} className={`nav-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="body">
        <div className="filter-row">
          {[['ene','Enero'],['feb','Febrero'],['mar','Marzo'],['q1','Q1 Total']].map(([k,l]) => (
            <button key={k} className={`filter-chip ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>{l}</button>
          ))}
        </div>

        {tab === 'ventas'    && <TabVentas    filter={filter} />}
        {tab === 'productos' && <TabProductos filter={filter} />}
        {tab === 'marketing' && <TabMarketing />}
      </div>
    </div>
  );
}
