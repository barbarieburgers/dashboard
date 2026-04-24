/ ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
const API_KEY = 'AIzaSyCuut5Q4YMj3cDDOUI7F2CNiaA_-Fsyeiw';

const SHEETS = {
  registroCompleto:   '1aO1um3QlRPy5EP-gGy5tEw5ZqSr3UDdjPC01WU_JIyM',
  productosMensuales: '1jO8f4jT29NrMcWbayCvPU0_bR7Gyqrp1mF6O-7H6SPU',
  ventaAbril:         '1LT3ZKJhzD3OcIwgv0iD6xKvBo-1lVPZp',
};

// ─── FUNCIÓN BASE ──────────────────────────────────────────────────────────────
async function fetchRange(spreadsheetId, range) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error leyendo ${range}: ${res.status}`);
  const data = await res.json();
  return data.values || [];
}

// ─── PARSEO DE MONEDA ─────────────────────────────────────────────────────────
function parseMoney(str) {
  if (!str) return 0;
  const clean = String(str).replace(/[$\s.]/g, '').replace(',', '.');
  return parseFloat(clean) || 0;
}

// ─── LEER VALORES FINALES (hoja 4 de REGISTRO COMPLETO) ──────────────────────
// Columnas: A=Producto, B=Costo producto, C=Costo producción total,
//           D=Precio venta óptimo, E=Ganancia utilidad,
//           F=Precio venta real, G=Ganancia utilidad real, H=Margen real
export async function fetchValoresFinales() {
  try {
    const rows = await fetchRange(SHEETS.registroCompleto, 'VALORES FINALES!A7:H80');
    const productos = {};

    rows.forEach(row => {
      const nombre = row[0]?.trim().toUpperCase();
      if (!nombre || nombre === 'PRODUCTO') return;

      const costoProduccion = parseMoney(row[2]);
      const precioVentaReal = parseMoney(row[5]);
      const gananciaReal    = parseMoney(row[6]);
      const margenReal      = parseFloat(row[7]) || 0;

      if (precioVentaReal > 0) {
        productos[nombre] = {
          costoProduccion,
          precioVentaReal,
          gananciaReal,
          margenReal,
        };
      }
    });

    return productos;
  } catch (err) {
    console.error('Error fetchValoresFinales:', err);
    return {};
  }
}

// ─── LEER PRODUCTOS MENSUALES ─────────────────────────────────────────────────
export async function fetchProductosMensuales() {
  try {
    const rows = await fetchRange(SHEETS.productosMensuales, 'A1:Z200');
    return rows;
  } catch (err) {
    console.error('Error fetchProductosMensuales:', err);
    return [];
  }
}

// ─── LEER VENTA ABRIL (hoja de hamburguesas) ──────────────────────────────────
export async function fetchVentaAbril() {
  try {
    // Sección hamburguesas por día
    const burgers = await fetchRange(SHEETS.ventaAbril, 'VENTA HAMBURGUESAS!A1:P35');
    // Sección totales generales
    const totales = await fetchRange(SHEETS.ventaAbril, 'VENTA MENSUAL!A1:U35');
    // Sección promos
    const promos  = await fetchRange(SHEETS.ventaAbril, 'PROMOS!A1:Q35');

    return { burgers, totales, promos };
  } catch (err) {
    console.error('Error fetchVentaAbril:', err);
    return { burgers: [], totales: [], promos: [] };
  }
}

// ─── CALCULAR GANANCIA POR BURGER EN UN MES ───────────────────────────────────
// Recibe: cantidades = { 'VALKYRIA': 172, 'CHEESE BURGER': 158, ... }
//         precios    = resultado de fetchValoresFinales()
export function calcularGananciaPorBurger(cantidades, precios) {
  return Object.entries(cantidades)
    .map(([nombre, cantidad]) => {
      const p = precios[nombre] || precios[nombre.toUpperCase()];
      if (!p || !cantidad) return null;
      const gananciaTotal = p.gananciaReal * cantidad;
      return {
        nombre,
        cantidad,
        precioVenta:   p.precioVentaReal,
        costoUnit:     p.costoProduccion,
        gananciaUnit:  p.gananciaReal,
        gananciaTotal,
        margen:        p.margenReal,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.gananciaTotal - a.gananciaTotal);
}
