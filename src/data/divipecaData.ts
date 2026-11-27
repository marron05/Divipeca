import {
  MetricItem,
  LogisticsHub,
  FleetSpec,
  BottleneckPair,
  OperationalPillar,
  CommercialAlliance,
} from '../types';

export const COMPANY_INFO = {
  name: 'DIVIPECA',
  legalName: 'Distribuidora Vito y Peppe, C.A.',
  rif: 'J-060038278',
  website: 'divipeca.com.ve',
  foundedOrigin: 1982,
  foundedFormal: 1990,
  traditionLabel: 'Desde 1990',
  experienceBadge: 'Trayectoria ininterrumpida desde 1990 · +36 años de experiencia',
  operatingHours: 'Lunes a Viernes · 8:00 a.m. – 6:00 p.m.',
  coverageStatesText: 'Guárico, Anzoátegui, Sucre y Bolívar',
  mainClaim:
    'Eliminamos cuellos de botella logísticos para proteger sus ventas y participación de mercado.',
  description:
    'Operador logístico 3PL integral y distribución exclusiva desde 1990 respaldando fabricantes, importadores y marcas en Guárico, Anzoátegui, Sucre y Bolívar con 3.200 m², +1.200 posiciones de paleta, flota propia y protocolos de sanidad.',
  primaryColor: '#1B5E20',
  accentColor: '#2E7D32',
  phone: '+58 416-5480517',
  whatsappNumber: '584165480517',
  whatsappDisplay: '+58 416-5480517',
  whatsappUrl:
    'https://wa.me/584165480517?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20capacidad%203PL%20con%20DIVIPECA',
  email: 'Info@divipeca.com.ve',
  instagramHandle: '@divipeca_',
  instagramUrl:
    'https://www.instagram.com/divipeca_?utm_source=ig_web_button_share_sheet&fqnt=ZDNlZDc0MzIxNw==',
  addressMatrix:
    'Zona Industrial La Pascua, Av. Principal con Calle Los Cedros, Valle de la Pascua, Edo. Guárico, Venezuela.',
};

export const IMAGES = {
  logoPlaque: '/assets/aistudio/Divipeca_fondo_blanco_15da3550.png',
  heroFleet: '/assets/aistudio/Fachada_09f64ac1.jpeg',
  warehouseValle: '/assets/aistudio/valledelapascua_e2421766.jpeg',
  hubBarcelona: '/assets/aistudio/barcelona_081164ad.jpg',
  hubBolivar: '/assets/aistudio/ciudad-bolivar_1ce20cf4.jpg',
  fleetLineup: '/assets/aistudio/Perfil_de_los_camiones_df9a41d0.jpeg',
  truckCloseup: '/assets/aistudio/Cami_n_c472f57c.jpeg',
  forkliftOps: '/assets/aistudio/Monta_cargas_con_pacas_be3ad4ab.jpeg',
  warehouseRacks: '/assets/aistudio/Mercancia_c11ec1ce.jpeg',
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
  displayWithUnit: '0,70 días',
  label: 'Lead time promedio',
  scaleLabel: '1,0 = 24 horas',
  benchmarkLabel: '1,0 día',
  recentLabel: 'DIVIPECA (promedio real)',
  definition:
    'Tiempo promedio desde que se recibe la orden/factura hasta la entrega en el punto de venta (0,70 días).',
  message: 'Operamos de forma consistente por debajo de 24 horas.',
  microcopy:
    'Mientras el indicador se mantiene bajo 1,0, las entregas ocurren en menos de 24 horas (0,70 días promedio).',
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
      title: 'Preparación en centro (picking / estiba)',
      detail:
        'Picking por lote, verificación de unidades y estibado sobre +1.200 paletas en 3.200 m² distribuidos en 3 centros propios.',
      segmentShare: 'Fase 2 · Almacén',
    },
    {
      step: 3,
      title: 'Despacho con flota propia',
      detail:
        'Salida programada desde cada centro hacia Guárico, Anzoátegui, Sucre y Bolívar en unidades propias de 5T a 12T con monitoreo continuo.',
      segmentShare: 'Fase 3 · Ruta regional',
    },
    {
      step: 4,
      title: 'Entrega en punto de venta',
      detail:
        'Recepción conforme en anaquel o depósito en 0,70 días promedio, alcanzando un cumplimiento auditado de 99,5% OTIF.',
      segmentShare: 'Fase 4 · Cierre 0,70 días',
    },
  ] as LeadTimeStep[],
};

export const TERMINOLOGY_CLARIFIERS = [
  {
    term: '3PL',
    summary: 'Operamos almacenamiento, estiba en paletas, preparación y distribución por usted.',
  },
  {
    term: 'OTIF (99,5%)',
    summary: 'Pedidos entregados a tiempo y completos en los 4 estados de cobertura.',
  },
  {
    term: 'Lead time (0,70 días)',
    summary: 'Tiempo promedio desde la factura hasta la entrega en el punto de venta.',
  },
];

export const KEY_METRICS: MetricItem[] = [
  {
    id: 'otif',
    value: '99,5%',
    unit: 'OTIF',
    subtitle: 'On Time In Full — a tiempo y completo',
    label: 'Cumplimiento de entrega',
    detail:
      'Entregas a tiempo y completas (On Time In Full) en cadenas regionales, supermercados y canales mayoristas.',
    benchmark: 'Estándar auditado en ruta',
    trend: 'Guárico, Anzoátegui, Sucre y Bolívar',
  },
  {
    id: 'tons',
    value: '+550',
    unit: 'Ton/Mes',
    label: 'Volumen movilizado',
    detail:
      'Carga de alimentos y consumo masivo despachada mensualmente con trazabilidad por lote y guía.',
    benchmark: 'Operación continua desde 1990',
    trend: 'Flota propia dedicada',
  },
  {
    id: 'clients',
    value: '+850',
    unit: 'Clientes',
    label: 'Clientes atendidos',
    detail:
      'Supermercados, cadenas regionales, abastos mayoristas y puntos de venta atendidos con frecuencia semanal o quincenal.',
    benchmark: 'Cobertura directa en 4 estados',
    trend: 'Guárico, Anzoátegui, Sucre y Bolívar',
  },
  {
    id: 'storage',
    value: '3.200',
    unit: 'm² propios',
    label: 'Infraestructura total',
    detail:
      'Capacidad consolidada en 3 centros propios: Barcelona (1.200 m²), Ciudad Bolívar (1.100 m²) y Valle de la Pascua (900 m²).',
    benchmark: '3 centros propios',
    trend: '1.200 · 1.100 · 900 m²',
  },
  {
    id: 'pallets',
    value: '+1.200',
    unit: 'Paletas',
    label: 'Capacidad de estiba',
    detail:
      'Más de 1.200 posiciones de paleta (~450 Barcelona, ~410 Ciudad Bolívar, ~340 Valle de la Pascua) bajo normas BPM e inocuidad.',
    benchmark: 'Control FEFO/FIFO y BPM',
    trend: 'Rotación ágil de inventario',
  },
];

export const BOTTLENECK_PAIRS: BottleneckPair[] = [
  {
    id: 'stockout',
    step: 1,
    bottleneckTitle: 'Quiebres de stock en punto de venta y pérdida de cuota de mercado',
    bottleneckDetail:
      'Despachos lejanos o irregulares dejan góndolas vacías en momentos de demanda.',
    solutionTitle: 'Lead Time de 0,70 días y cobertura semanal/quincenal a +850 clientes',
    solutionDetail:
      'Inventario en 3 centros regionales para reponer con rapidez y proteger participación.',
  },
  {
    id: 'otif-loss',
    step: 2,
    bottleneckTitle: 'Pérdida de ventanas de recepción y pedidos incompletos',
    bottleneckDetail:
      'Retrasos en ruta o diferencias de alistamiento generan rechazos y reprogramaciones.',
    solutionTitle: '99,5% OTIF con flota propia monitoreada en todo el recorrido',
    solutionDetail:
      'Entrega a tiempo y completa con seguimiento en ruta y conciliación documental.',
  },
  {
    id: 'fixed-costs',
    step: 3,
    bottleneckTitle: 'Costos fijos rígidos de flota y almacenes propios',
    bottleneckDetail:
      'Galpones y unidades propias en varios estados inmovilizan capital.',
    solutionTitle: '3.200 m² (+1.200 paletas) y camiones de distintas capacidades',
    solutionDetail:
      'Escala regional con infraestructura desde 1990, adaptada al ritmo comercial del cliente.',
  },
  {
    id: 'shrinkage',
    step: 4,
    bottleneckTitle: 'Mermas por falta de control sanitario, plagas o rotación FEFO',
    bottleneckDetail:
      'Higiene deficiente o rotación desordenada deterioran empaques y alimentos.',
    solutionTitle: 'Protocolos sanitarios, control de plagas, FEFO/FIFO y CCTV 24h',
    solutionDetail:
      'Integridad física y sanitaria de cajas, bultos y empaques bajo normas auditables.',
  },
];

export const LOGISTICS_HUBS: LogisticsHub[] = [
  {
    id: 'barcelona-plc',
    city: 'Barcelona',
    state: 'Estado Anzoátegui',
    zoneTag: 'Hub Oriente',
    role: 'Hub Oriente & enlace Sucre',
    areaM2: 1200,
    areaM2Label: '1.200 m²',
    palletsNominal: 450,
    palletsLabel: '~450 paletas',
    capacityShare: 37.5,
    capacityShareLabel: '37,5%',
    securityTag: 'CCTV 24h',
    cardBullets: [
      'Enlace directo hacia Anzoátegui y Sucre (Cumaná y Carúpano)',
      'Control sanitario, plagas y rotación FEFO/FIFO auditable',
      'Picking ágil y andenes orientados a 0,70 días de lead time',
    ],
    description:
      'Centro logístico propio de 1.200 m² (~450 paletas, 37,5% de la red) en el eje Barcelona / Puerto La Cruz. Diseñado para rotación ágil de alimentos y consumo masivo con enlace directo hacia Anzoátegui y Sucre.',
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
      '1.200 m² con ~450 posiciones de paleta y seguridad CCTV 24h',
      'Enlace directo hacia los estados Anzoátegui y Sucre',
      'Módulos de picking orientados a lead time de 0,70 días',
      'Protocolos sanitarios, control de plagas y gestión FEFO/FIFO',
      'Área de verificación y conciliación por guía de despacho',
    ],
    fleetStationed: 'Flota propia asignada al corredor',
    dispatchFrequency: 'Rutas fijas semanales y quincenales',
    image: IMAGES.hubBarcelona,
  },
  {
    id: 'ciudad-bolivar',
    city: 'Ciudad Bolívar',
    state: 'Estado Bolívar',
    zoneTag: 'Eje Sur',
    role: 'Eje Sur & Guayana',
    areaM2: 1100,
    areaM2Label: '1.100 m²',
    palletsNominal: 410,
    palletsLabel: '~410 paletas',
    capacityShare: 34.4,
    capacityShareLabel: '34,4%',
    securityTag: 'CCTV 24h',
    cardBullets: [
      'Cobertura estructurada al Eje Sur y corredor Guayana',
      'Almacenamiento seco con mezzanine, normas BPM y control de plagas',
      'Trazabilidad por lote y conciliación documental de entregas',
    ],
    description:
      'Centro propio de 1.100 m² (~410 paletas, 34,4% de la red) en Ciudad Bolívar. Garantiza resguardo sanitario con mezzanine operativo y despacho programado hacia los principales canales comerciales del sur y Guayana.',
    coverage: [
      'Ciudad Bolívar',
      'Upata',
      'Ciudad Piar',
      'Soledad',
      'Corredor Guayana',
    ],
    features: [
      '1.100 m² con ~410 posiciones de paleta y vigilancia CCTV 24h',
      'Bodega de almacenamiento seco con mezzanine y control sanitario',
      'Rampas de carga y descarga para unidades propias dedicadas',
      'Trazabilidad por bulto, paleta y fecha de vencimiento (FEFO)',
      'Despacho programado hacia canales mayoristas y cadenas en Bolívar',
    ],
    fleetStationed: 'Flota propia asignada al sur',
    dispatchFrequency: 'Rutas programadas en el estado',
    image: IMAGES.hubBolivar,
  },
  {
    id: 'valle-pascua',
    city: 'Valle de la Pascua',
    state: 'Estado Guárico',
    zoneTag: 'Nodo Llanos',
    role: 'Nodo Llanos · Sede Matriz',
    areaM2: 900,
    areaM2Label: '900 m²',
    palletsNominal: 340,
    palletsLabel: '~340 paletas',
    capacityShare: 28.1,
    capacityShareLabel: '28,1%',
    securityTag: 'CCTV 24h',
    cardBullets: [
      'Sede matriz operativa desde 1990 con cobertura en todo Guárico',
      'Patio de maniobras y mantenimiento preventivo para flota de 5T a 12T',
      'Protocolos de sanidad, control de plagas y vigilancia CCTV 24h',
    ],
    description:
      'Sede matriz de DIVIPECA desde 1990 con 900 m² (~340 paletas, 28,1% de la red). Punto neurálgico de recepción, consolidación y despacho directo hacia el Estado Guárico como base del Nodo Llanos.',
    coverage: [
      'Valle de la Pascua',
      'San Juan de los Morros',
      'Calabozo',
      'Altagracia de Orituco',
      'Zaraza',
      'Tucupido',
    ],
    features: [
      '900 m² con ~340 posiciones de paleta y seguridad CCTV 24h',
      'Almacenamiento seco techado con protocolos de sanidad vigentes',
      'Racks selectivos y áreas de pre-despacho señalizadas',
      'Patio de maniobras y mantenimiento preventivo para flota (5T a 12T)',
      'Enlace troncal de consolidación para operaciones en los Llanos',
    ],
    fleetStationed: 'Flota propia dedicada (5T–12T)',
    dispatchFrequency: 'Salidas continuas programadas',
    image: IMAGES.warehouseValle,
  },
];

export const FLEET_DETAILS: FleetSpec[] = [
  {
    model: 'Chevrolet NPR / Furgón Urbano',
    payloadCapacity: '5,0 a 6,5 Toneladas',
    category: 'Distribución Urbana & Suburbana',
    useCase:
      'Agilidad de reparto de alimentos y consumo masivo en cascos urbanos, supermercados independientes y canales tradicionales.',
    features: [
      'Furgones cerrados para protección de carga seca',
      'Monitoreo satelital GPS en tiempo real',
      'Protocolos de sanidad y fumigación vigentes',
    ],
  },
  {
    model: 'Encava ET-5 / Serie Media',
    payloadCapacity: '7,5 a 8,5 Toneladas',
    category: 'Distribución Regional Media',
    useCase:
      'Salidas desde cada centro hacia mayoristas medianos y cadenas en Guárico, Anzoátegui, Sucre y Bolívar.',
    features: [
      'Chasis reforzado para carreteras troncales',
      'Control de estiba y sujeción segura de paletas',
      'Mantenimiento preventivo programado en flota propia',
    ],
  },
  {
    model: 'JAC Búfalo Pesado',
    payloadCapacity: '10,0 a 12,0 Toneladas',
    category: 'Gran Volumen & Abastecimiento Regional',
    useCase:
      'Despacho de pedidos de alto tonelaje de alimentos y consumo masivo hacia cadenas y mayoristas en los 4 estados.',
    features: [
      'Capacidad estibada de alto volumen para rutas regionales',
      'Monitoreo continuo en ruta y control de ventanas horarias',
      'Operación con conductores propios de amplia trayectoria',
    ],
  },
];

export const OPERATIONAL_PILLARS: OperationalPillar[] = [
  {
    id: 'monitored-fleet',
    title: 'Flota Propia Monitoreada',
    description:
      'Camiones de distintas capacidades (5T a 12T) con monitoreo continuo en todo el recorrido.',
    tag: 'Cobertura en ruta',
  },
  {
    id: 'sanitation-pest',
    title: 'Sanidad y Control de Plagas',
    description:
      'Protocolos sanitarios vigentes en 3.200 m² y en cada unidad para alimentos y consumo masivo.',
    tag: 'Normas BPM',
  },
  {
    id: 'fefo-traceability',
    title: 'Control FEFO/FIFO y Trazabilidad',
    description:
      'Gestión estricta de lotes y vencimientos, conciliación de entregas y control de devoluciones.',
    tag: '99,5% OTIF',
  },
  {
    id: 'cctv-security',
    title: 'Seguridad CCTV 24/7',
    description:
      'Vigilancia continua las 24 horas en Barcelona, Ciudad Bolívar y Valle de la Pascua.',
    tag: '3 centros propios',
  },
];

export const COMMERCIAL_ALLIANCES: CommercialAlliance[] = [
  {
    id: 'capri',
    name: 'Pastas Capri, C.A.',
    status: 'Relación comercial vigente',
    badge: 'Larga data',
    description:
      'Almacenamiento, control de rotación y distribución regional para consumo masivo.',
    logo: '/assets/aistudio/logo-Capri_3141981c.png',
  },
  {
    id: 'puig',
    name: 'C.A. Sucesora de José Puig & Cía',
    status: 'Relación comercial vigente',
    badge: 'Larga data',
    description:
      'Preparación exacta de pedidos y entregas puntuales en Oriente y Guárico.',
    logo: '/assets/aistudio/Logo-GalletasPuig_c0cf4f86.png',
  },
  {
    id: 'botalon',
    name: 'Grupo Botalón, C.A. / Alimentos Botalón',
    status: 'Relación comercial vigente',
    badge: 'Larga data',
    description:
      'Operación 3PL con resguardo sanitario y cobertura regional en 4 estados.',
    logo: '/assets/aistudio/Logo-Alimentos-Botal_n_b8a762ca.png',
  },
  {
    id: 'fama-america',
    name: 'Fama de América',
    status: 'Relación histórica comprobada',
    badge: 'Trayectoria',
    description:
      'Experiencia compartida en operaciones de alimentos en Venezuela desde 1990.',
    logo: '/assets/aistudio/famadeamerica-logo_8c45559e.jpg',
  },
];

export interface ProyectorSedeOption {
  id: string;
  label: string;
  tabLabel: string;
  paletasNominal: number;
  areaM2: number;
  nota: string;
}

export const PROYECTOR_CONFIG = {
  otifObjetivoTexto: '99,5% OTIF',
  leadTimeRefTexto: '0,70 días',
  paletasTotalesRed: 1200,
  m2TotalesRed: 3200,
  paletasPorTon: 1.5,
  tonMin: 20,
  tonMax: 550,
  tonStep: 5,
  tonDefault: 120,
  sedes: [
    {
      id: 'consolidado',
      label: 'Consolidado (3 Sedes)',
      tabLabel: 'Consolidado (3 Sedes)',
      paletasNominal: 1200,
      areaM2: 3200,
      nota: 'Red propia completa · 3.200 m² · 4 estados',
    },
    {
      id: 'barcelona-plc',
      label: 'Barcelona (1.200 m²)',
      tabLabel: 'Barcelona (1.200 m²)',
      paletasNominal: 450,
      areaM2: 1200,
      nota: 'Hub Oriente & enlace Sucre · 37,5% de red',
    },
    {
      id: 'ciudad-bolivar',
      label: 'Ciudad Bolívar (1.100 m²)',
      tabLabel: 'Ciudad Bolívar (1.100 m²)',
      paletasNominal: 410,
      areaM2: 1100,
      nota: 'Eje Sur & Guayana · 34,4% de red',
    },
    {
      id: 'valle-pascua',
      label: 'Valle de la Pascua (900 m²)',
      tabLabel: 'Valle de la Pascua (900 m²)',
      paletasNominal: 340,
      areaM2: 900,
      nota: 'Nodo Llanos · Guárico · 28,1% de red',
    },
  ] as ProyectorSedeOption[],
};
