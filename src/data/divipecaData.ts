import { MetricItem, TimelineMilestone, LogisticsHub, FleetSpec } from '../types';

export const COMPANY_INFO = {
  name: 'DIVIPECA',
  legalName: 'Distribuidora Vito y Peppe, C.A.',
  rif: 'J-060038278',
  foundedOrigin: 1982,
  foundedFormal: 1990,
  traditionLabel: 'Desde 1990',
  mainClaim: 'Tu logística puntual, tus ventas en crecimiento.',
  description:
    'Operador logístico 3PL integral y distribución exclusiva con trayectoria desde 1990 y orígenes en 1982. Especialistas en consumo masivo y alimentos secos en los estados Anzoátegui, Bolívar, Guárico y Sucre.',
  primaryColor: '#1B5E20',
  accentColor: '#2E7D32',
  phone: '+58 (238) 779-1120',
  whatsappNumber: '584140000000',
  whatsappDisplay: '+58 (414) 000-0000',
  email: 'operaciones@divipeca.com.ve',
  addressMatrix:
    'Zona Industrial La Pascua, Av. Principal con Calle Los Cedros, Valle de la Pascua, Edo. Guárico, Venezuela.',
};

export const IMAGES = {
  logo: '/divipeca_logo.svg',
  heroFleet: '/images/hero-fleet.jpg',
  warehouseValle: '/images/warehouse-valle.jpg',
  hubBarcelona: '/images/hub-barcelona.jpg',
  hubBolivar: '/images/hub-bolivar.jpg',
  heritage1982: '/images/heritage-1982.jpg',
};

export interface LeadTimeStep {
  step: number;
  title: string;
  detail: string;
  segmentShare: string;
}

export const LEAD_TIME_DATA = {
  value: 0.7,
  displayValue: '0,70',
  label: 'Lead time',
  scaleLabel: '1,0 = 24 horas',
  benchmarkLabel: 'Óptimo 24 h',
  recentLabel: 'DIVIPECA (promedio reciente)',
  definition:
    'Tiempo promedio desde que se recibe la orden/factura hasta la entrega en el punto de venta.',
  message: 'Operamos de forma consistente por debajo de 24 horas.',
  microcopy:
    'Mientras el indicador se mantiene bajo 1, la mayoría de las entregas ocurren en menos de 24 horas.',
  steps: [
    {
      step: 1,
      title: 'Recepción de orden / factura',
      detail:
        'Ingreso y validación inmediata de pedidos y guías para activar la ventana operativa sin cuellos de botella administrativos.',
      segmentShare: 'Fase 1 · Activación',
    },
    {
      step: 2,
      title: 'Preparación en centro (picking / consolidación)',
      detail:
        'Picking por lote, verificación de unidades y estibado en nuestros 3 centros propios para despacho sin faltantes.',
      segmentShare: 'Fase 2 · Almacén',
    },
    {
      step: 3,
      title: 'Despacho con flota propia',
      detail:
        'Salida programada desde cada centro hacia su zona de cobertura en unidades propias de 5T a 12T monitoreadas por GPS.',
      segmentShare: 'Fase 3 · Ruta local',
    },
    {
      step: 4,
      title: 'Entrega en punto de venta',
      detail:
        'Recepción conforme en anaquel o depósito del cliente por debajo de las 24 horas, completando un flujo 99,8% OTIF.',
      segmentShare: 'Fase 4 · Cierre < 24 h',
    },
  ] as LeadTimeStep[],
};

export const TERMINOLOGY_CLARIFIERS = [
  {
    term: '3PL',
    summary: 'Operamos almacenamiento, preparación y distribución por usted.',
  },
  {
    term: 'OTIF',
    summary: 'Pedidos entregados a tiempo y completos.',
  },
  {
    term: 'Lead time',
    summary: 'De la factura a la entrega en el punto de venta.',
  },
];

export const KEY_METRICS: MetricItem[] = [
  {
    id: 'tons',
    value: '+400',
    unit: 'Tn / mes',
    label: 'Toneladas despachadas',
    detail:
      'Carga de alimentos y consumo masivo movilizada mensualmente con trazabilidad por lote.',
    benchmark: 'Crecimiento sostenido desde 2024',
    trend: '+18% vs período anterior',
  },
  {
    id: 'otif',
    value: '99,8%',
    unit: 'OTIF',
    subtitle: 'On Time In Full — a tiempo y completo',
    label: 'Nivel de servicio y puntualidad',
    detail:
      'Entregas a tiempo y completas (On Time In Full — a tiempo y completo) en todos los canales mayoristas e independientes.',
    benchmark: 'Estándar multinacional auditado',
    trend: 'Consistente en los 4 estados',
  },
  {
    id: 'clients',
    value: '+820',
    unit: 'Clientes',
    label: 'Puntos de venta activos',
    detail:
      'Supermercados, cadenas regionales, abastos mayoristas y distribuidores atendidos con frecuencia semanal.',
    benchmark: 'Cobertura directa certificada',
    trend: 'Guárico, Anzoátegui, Bolívar y Sucre',
  },
  {
    id: 'boxes',
    value: '+29.000',
    unit: 'Cajas / mes',
    label: 'Cajas rotadas en almacén',
    detail:
      'Flujo continuo de picking, cross-docking y paletizado bajo normas BPM estrictas.',
    benchmark: 'Capacidad de respuesta en <24h',
    trend: 'Alta rotación de secos',
  },
  {
    id: 'storage',
    value: '+3.700',
    unit: 'm² techados',
    label: 'Infraestructura de almacenamiento',
    detail:
      'Capacidad consolidada en 3 centros de distribución estratégicos con control de temperatura y seguridad 24/7.',
    benchmark: '100% de propiedad operativa',
    trend: '3 sedes dedicadas por región',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '1982',
    title: 'El origen: Una sola camioneta y una promesa',
    subtitle: 'Ruta Caracas — Valle de la Pascua',
    description:
      'El padre fundador inicia las operaciones de transporte terrestre con una sola camioneta, trasladando mortadela Giacomello y Pastas Capri desde la capital hasta el corazón de los Llanos en Valle de la Pascua.',
    achievement:
      'Primer flete regular de alimentos y génesis del modelo de distribución confiable que dio pie a DIVIPECA.',
    category: 'Origen',
    partners: ['Pastas Capri', 'Mortadela Giacomello'],
    image: IMAGES.heritage1982,
    imageLabel: 'Valle de la Pascua, 1982 · Origen',
    imageCaption:
      'Espacio destinado a la fotografía histórica de la camioneta original en ruta Caracas — Valle de la Pascua.',
  },
  {
    year: '1980s',
    title: 'Distribución exclusiva de Pastas Capri',
    subtitle: 'Consolidación en todo el Estado Guárico',
    description:
      'Se concreta el acuerdo de distribución exclusiva de Pastas Capri para todo el territorio de Guárico. Es el inicio de una alianza estratégica ininterrumpida que supera los 40 años de vigencia comercial.',
    achievement: 'Red pionera de cobertura mayorista en los llanos centrales.',
    category: 'Alianzas',
    partners: ['Pastas Capri (+40 años)'],
    image: IMAGES.heritage1982,
    imageLabel: 'Años 80 · Guárico',
    imageCaption:
      'Consolidación comercial en los llanos centrales con entregas semanales directas al canal mayorista.',
  },
  {
    year: 'Desde 1990',
    title: 'Fundación formal y relevo generacional',
    subtitle: 'Nace DIVIPECA: “Vito y Peppe”',
    description:
      'Vito Binaggia y Giuseppe Binaggia asumen la conducción ejecutiva del negocio familiar. En 1990 se constituye formalmente DIVIPECA (Distribuidora Vito y Peppe, C.A.), institucionalizando la estructura corporativa que perdura hasta hoy.',
    achievement:
      'Formalización empresarial con RIF J-060038278 y continuidad operativa desde 1990.',
    category: 'Institucional',
    image: IMAGES.warehouseValle,
    imageLabel: 'Desde 1990 · Consolidación Institucional',
    imageCaption:
      'Base operativa matriz en Valle de la Pascua, pilar del crecimiento estructurado desde 1990.',
  },
  {
    year: '1990 — 2000',
    title: 'Infraestructura propia y flota vehicular',
    subtitle: 'Independencia logística y solidez patrimonial',
    description:
      'Adquisición y adecuación del almacén principal en Valle de la Pascua. Se ejecuta el plan de adquisición de flota propia para garantizar puntualidad y autonomía operativa sin depender de terceros.',
    achievement: 'Primer centro de acopio matriz con patio de maniobras y camiones propios.',
    category: 'Infraestructura',
    image: IMAGES.warehouseValle,
    imageLabel: '1990 — 2000 · Almacén y Flota Propia',
    imageCaption:
      'Crecimiento de capacidad instalada y unidades propias en Valle de la Pascua, Estado Guárico.',
  },
  {
    year: '2004 — 2005',
    title: 'El salto al modelo 3PL dedicado',
    subtitle: 'Alianza transformadora con Galletas Puig',
    description:
      'DIVIPECA propone e implementa un modelo de Operador Logístico Tercerizado (3PL) dedicado para Galletas Puig en la región central y oriental, optimizando inventarios, preparación y rotación en anaquel.',
    achievement:
      'El modelo 3PL de DIVIPECA se consolida como estándar de servicio para consumo masivo.',
    category: 'Alianzas',
    partners: ['Galletas Puig'],
    image: IMAGES.hubBarcelona,
    imageLabel: '2004 — 2005 · Modelo 3PL & Alianzas',
    imageCaption:
      'Operación de almacén y preparación dedicada para marcas líderes de alimentos y consumo masivo.',
  },
  {
    year: '2006 — 2023',
    title: 'Expansión regional: Oriente y Estado Bolívar',
    subtitle: 'Nuevas sedes en Ciudad Bolívar y Puerto La Cruz / Barcelona',
    description:
      'Se inauguran los centros logísticos de Ciudad Bolívar (Estado Bolívar) y Puerto La Cruz / Barcelona (Anzoátegui y Sucre). Se incorpora Café Fama de América y se amplía la cobertura regional.',
    achievement:
      'Cobertura integrada de 4 estados: Guárico, Anzoátegui, Bolívar y Sucre.',
    category: 'Expansión',
    partners: ['Fama de América', 'Galletas Puig'],
    image: IMAGES.hubBolivar,
    imageLabel: '2006 — 2023 · Expansión a 4 Estados',
    imageCaption:
      'Infraestructura propia en Ciudad Bolívar (Estado Bolívar) y eje costero de Anzoátegui y Sucre.',
  },
  {
    year: '2024 — Hoy',
    title: 'Escala industrial y Lead time bajo 24 horas',
    subtitle: 'Alimentos Botalón y modernización operativa',
    description:
      'Incorporación al portafolio de Alimentos Botalón, superando las 400 toneladas despachadas al mes con 99,8% de efectividad OTIF y un Lead time promedio de 0,70 sobre 24 horas.',
    achievement:
      '+820 puntos de venta atendidos con precisión, continuidad desde 1990 y solidez patrimonial.',
    category: 'Expansión',
    partners: ['Alimentos Botalón', 'Galletas Puig', 'Pastas Capri'],
    image: IMAGES.heroFleet,
    imageLabel: '2024 — Hoy · Operación Actual',
    imageCaption:
      'Flota activa y centros operando por debajo de 24 horas en los 4 estados de cobertura.',
  },
];

export const LOGISTICS_HUBS: LogisticsHub[] = [
  {
    id: 'valle-pascua',
    city: 'Valle de la Pascua',
    state: 'Estado Guárico',
    area: '1.400 m²',
    areaNumber: 1400,
    role: 'Centro Matriz de Operaciones y Consolidación',
    description:
      'El corazón operativo e histórico de DIVIPECA desde 1990. Almacén de alta capacidad para recepción de planta, acopio central, paletizado y despacho directo hacia los Llanos Centrales en todo el Estado Guárico.',
    coverage: [
      'Valle de la Pascua',
      'San Juan de los Morros',
      'Calabozo',
      'Altagracia de Orituco',
      'Zaraza',
      'Tucupido',
    ],
    features: [
      'Almacenamiento techado con altura útil de 8.5 metros',
      'Racks selectivos para +1.200 posiciones de estibas',
      'Patio de maniobras y descarga simultánea para unidades de carga',
      'Taller central de mantenimiento preventivo de flota',
      'Seguridad física perimetral y circuito cerrado 24 horas',
    ],
    fleetStationed: '12 unidades asignadas',
    dispatchFrequency: 'Salidas diarias continuas',
    image: IMAGES.warehouseValle,
  },
  {
    id: 'barcelona-plc',
    city: 'Puerto La Cruz / Barcelona',
    state: 'Anzoátegui y Sucre',
    area: '1.300 m²',
    areaNumber: 1300,
    role: 'Centro Logístico Costero Oriente',
    description:
      'Ubicación estratégica en el principal nodo industrial y comercial de Anzoátegui. Diseñado para rotación rápida, atención directa a cadenas de supermercados costeras y cobertura regular hacia Sucre.',
    coverage: [
      'Barcelona',
      'Puerto La Cruz',
      'Lechería',
      'Guanta',
      'El Tigre',
      'Anaco',
      'Cumaná',
      'Carúpano',
    ],
    features: [
      'Andenes elevados para carga y descarga rápida',
      'Módulos de picking intensivo para entregas menores a 24h',
      'Cobertura directa hacia los estados Anzoátegui y Sucre',
      'Control de humedad y ventilación para productos secos',
      'Área dedicada de logística inversa y verificación de devoluciones',
    ],
    fleetStationed: '10 unidades asignadas',
    dispatchFrequency: 'Rutas fijas 3 veces por semana por zona',
    image: IMAGES.hubBarcelona,
  },
  {
    id: 'ciudad-bolivar',
    city: 'Ciudad Bolívar',
    state: 'Estado Bolívar',
    area: '1.000 m²',
    areaNumber: 1000,
    role: 'Centro de Distribución Estado Bolívar',
    description:
      'Sede propia ubicada en Ciudad Bolívar, Estado Bolívar. Garantiza almacenamiento seco y despacho local programado hacia los principales canales mayoristas y puntos de venta del Estado Bolívar con estricto cumplimiento horario.',
    coverage: [
      'Ciudad Bolívar',
      'Upata',
      'Ciudad Piar',
      'Soledad',
      'Canales del Estado Bolívar',
    ],
    features: [
      'Bodega de almacenamiento seco con piso epóxico de alta resistencia',
      'Rampas niveladoras mecánicas de alta durabilidad',
      'Planta eléctrica de respaldo 100% autónoma',
      'Sistema de trazabilidad por bulto y número de lote',
      'Flota local asignada para salidas directas en el Estado Bolívar',
    ],
    fleetStationed: '8 unidades asignadas',
    dispatchFrequency: 'Rutas semanales y quincenales programadas',
    image: IMAGES.hubBolivar,
  },
];

export const FLEET_DETAILS: FleetSpec[] = [
  {
    model: 'Chevrolet NPR Turbo Diésel',
    payloadCapacity: '5.0 a 6.5 Toneladas',
    category: 'Distribución Urbana & Suburbana',
    useCase:
      'Agilidad de reparto en cascos urbanos, supermercados independientes y canales tradicionales.',
    features: [
      'Furgones de aluminio termoaislados',
      'Monitoreo satelital GPS en tiempo real',
      'Compensación de carga para cero mermas',
    ],
  },
  {
    model: 'Encava Serie D',
    payloadCapacity: '7.5 a 8.5 Toneladas',
    category: 'Distribución Regional Media',
    useCase:
      'Salidas desde cada centro hacia mayoristas medianos en sus zonas asignadas de cobertura.',
    features: [
      'Chasis reforzado para carreteras troncales',
      'Sistema de amarre de carga con rieles logísticos',
      'Mantenimiento preventivo por kilometraje',
    ],
  },
  {
    model: 'JAC Búfalo Pesado',
    payloadCapacity: '10.0 a 12.0 Toneladas',
    category: 'Gran Volumen & Abastecimiento Regional',
    useCase:
      'Despacho de pedidos de alto tonelaje hacia cadenas y mayoristas dentro de cada zona regional.',
    features: [
      'Frenos de aire y control de estabilidad',
      'Capacidad para 18 a 22 estibas estándar',
      'Conductores senior certificados en ruta',
    ],
  },
];

export const CLIENT_PARTNERS = [
  { name: 'Pastas Capri', relationship: 'Alianza exclusiva de distribución desde los años 80 (+40 años)' },
  { name: 'Galletas Puig', relationship: 'Operación 3PL dedicada desde 2004 en oriente y centro' },
  { name: 'Café Fama de América', relationship: 'Contrato de distribución regional desde 2006' },
  { name: 'Alimentos Botalón', relationship: 'Incorporación estratégica 2024 para gran escala' },
];
