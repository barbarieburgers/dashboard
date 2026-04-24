export const VENTAS = {
  ene: { venta: 15316572, ganancia: 4315562, gananciaReal: true, pedidos: 690, productos: 1406, burg: 1280, pp: 1106, med: 452, coca: 242, papas: 51, frit: 49, sand: 23, dips: 47 },
  feb: { venta: 10236780, ganancia: 2070127, gananciaReal: false, pedidos: 461, productos: 915,  burg: 815,  pp: 701,  med: 299, coca: 173, papas: 49, frit: 30, sand: 14, dips: 39 },
  mar: { venta: 15523202, ganancia: 3832059, gananciaReal: true, pedidos: 646, productos: 1377, burg: 1274, pp: 1113, med: 351, coca: 199, papas: 48, frit: 30, sand: 13, dips: 68 },
};

export const VENTAS_Q1 = {
  venta: 41076554, ganancia: 12217788, gananciaReal: true, pedidos: 1797, productos: 3698,
  burg: 3369, pp: 2920, med: 1102, coca: 614, papas: 148, frit: 109, sand: 50, dips: 154
};

export const BURGERS = {
  abr: [
    { n: 'Valkyria',      v: 172 }, { n: 'Cheese Burger', v: 158 }, { n: 'Ragnarok',      v: 105 },
    { n: 'Whopper',       v: 94  }, { n: 'Vikinga',       v: 73  }, { n: 'California',    v: 62  },
    { n: 'Eggocéntrica',  v: 38  }, { n: 'Wisconsin',     v: 24  }, { n: 'Freyja',        v: 35  },
    { n: 'Wessex',        v: 29  }, { n: 'Tasty',         v: 40  }, { n: 'Oklahoma',      v: 30  },
    { n: 'Argenta',       v: 12  }, { n: 'Bellpepper',    v: 21  },
  ],
  ene: [
    { n: 'Cheese Burger', v: 237 }, { n: 'Valkyria', v: 204 }, { n: 'Tasty', v: 124 },
    { n: 'Ragnarok', v: 170 }, { n: 'California', v: 87 }, { n: 'Vikinga', v: 111 },
    { n: 'Eggocéntrica', v: 72 }, { n: 'Wessex', v: 55 }, { n: 'Freyja', v: 52 },
    { n: 'Argenta', v: 48 }, { n: 'Wisconsin', v: 42 }, { n: 'Bellpepper', v: 38 },
    { n: 'Oklahoma', v: 33 }, { n: 'Valhalla', v: 7 },
  ],
  feb: [
    { n: 'Cheese Burger', v: 146 }, { n: 'Valkyria', v: 133 }, { n: 'Ragnarok', v: 86 },
    { n: 'Tasty', v: 86 }, { n: 'Vikinga', v: 70 }, { n: 'California', v: 56 },
    { n: 'Eggocéntrica', v: 48 }, { n: 'Wisconsin', v: 44 }, { n: 'Wessex', v: 39 },
    { n: 'Argenta', v: 33 }, { n: 'Oklahoma', v: 32 }, { n: 'Freyja', v: 29 },
    { n: 'Bellpepper', v: 13 },
  ],
  mar: [
    { n: 'Valkyria', v: 220 }, { n: 'Cheese Burger', v: 219 }, { n: 'Ragnarok', v: 135 },
    { n: 'Whopper', v: 112 }, { n: 'Vikinga', v: 108 }, { n: 'California', v: 98 },
    { n: 'Eggocéntrica', v: 65 }, { n: 'Tasty', v: 63 }, { n: 'Freyja', v: 54 },
    { n: 'Wessex', v: 54 }, { n: 'Wisconsin', v: 47 }, { n: 'Oklahoma', v: 37 },
    { n: 'Argenta', v: 35 }, { n: 'Bellpepper', v: 27 },
  ],
  q1: [
    { n: 'Valkyria', v: 2107 }, { n: 'Cheese Burger', v: 1843 }, { n: 'Ragnarok', v: 1357 },
    { n: 'Vikinga', v: 974 },  { n: 'Tasty', v: 921 },  { n: 'Freyja', v: 723 },
    { n: 'Wessex', v: 639 },   { n: 'Eggocéntrica', v: 476 }, { n: 'Oklahoma', v: 398 },
    { n: 'Wisconsin', v: 352 }, { n: 'Argenta', v: 296 }, { n: 'Valhalla', v: 233 },
    { n: 'California', v: 241 }, { n: 'Bellpepper', v: 66 },
  ],
};

export const MENU_STATUS = [
  { nombre: 'Valkyria',     estado: 'top',     label: 'N° 1 histórico' },
  { nombre: 'Whopper',      estado: 'nuevo',   label: 'Nuevo en marzo' },
  { nombre: 'Tasty',        estado: 'nuevo',   label: 'Nueva en abril' },
  { nombre: 'Bellpepper',   estado: 'info',    label: 'Nueva en noviembre' },
  { nombre: 'Hela',         estado: 'baja',    label: 'Dada de baja' },
  { nombre: 'Ember',        estado: 'baja',    label: 'Ed. Halloween' },
];

export const TOP5 = ['Valkyria', 'Cheese Burger', 'Ragnarok', 'Vikinga', 'Tasty'];

export const MARKETING_INSIGHTS = [
  {
    tipo: 'star',
    texto: 'Valkyria es tu producto insignia: 2.107 unidades, 19% del total de burgers del trimestre.',
    sub: 'Destacala con precio ancla para subir el ticket promedio.',
  },
  {
    tipo: 'up',
    texto: 'Marzo recuperó el nivel de enero ($15.5M) tras la caída de febrero ($10.2M, -33%).',
    sub: 'Investigar qué pasó en febrero: apertura, clima, competencia.',
  },
  {
    tipo: 'up',
    texto: 'Papas promo: 2.920 unidades Q1, más vendidas que cualquier burger individual.',
    sub: 'Combo obligatorio burger + papas promo para subir ticket.',
  },
  {
    tipo: 'info',
    texto: 'Medallón extra en 1 de cada 2 pedidos (1.102 sobre 1.797 Q1): sugerirlo activamente.',
    sub: 'Alto impacto en ticket promedio con mínimo esfuerzo de venta.',
  },
  {
    tipo: 'alert',
    texto: 'Dips muy bajo (154 anuales vs 614 cocas): revisar precio o push en punto de venta.',
    sub: 'Oportunidad de upsell de bajo costo.',
  },
];
