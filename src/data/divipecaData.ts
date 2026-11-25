import { MetricItem, LogisticsHub, FleetSpec } from '../types';

export const COMPANY_INFO = {
  name: 'DIVIPECA',
  legalName: 'Distribuidora Vito y Peppe, C.A.',
  rif: 'J-060038278',
  foundedOrigin: 1982,
  foundedFormal: 1990,
  traditionLabel: 'Desde 1990',
  experienceBadge: 'Trayectoria ininterrumpida desde 1990 · +36 años de experiencia',
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
  addressMatrix:
    'Zona Industrial La Pascua, Av. Principal con Calle Los Cedros, Valle de la Pascua, Edo. Guárico, Venezuela.',
};

export const IMAGES = {
  logoPlaque: '/assets/aistudio/Divipeca_fondo_blanco_15da3550.png',
  heroFleet: '/assets/aistudio/Fachada_09f64ac1.jpeg',
  warehouseValle: '/assets/aistudio/Valle_de_la_Pascua_perfil_fe6fcbb0.jpeg',
  hubBarcelona: '/assets/aistudio/Anzoategui_perfil_58bde3d1.jpeg',
  hubBolivar: '/assets/aistudio/Bolivar_perfil_20c26f4b.jpeg',
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
  benchmarkLabel: 'Óptimo 24 h',
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
        'Salida programada desde cada centro hacia Guárico, Anzoátegui, Sucre y Bolívar en unidades propias de 5T a 12T con GPS.',
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
    unit: 'Ton / Mes',
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
      'Supermercados, cadenas regionales, abastos mayoristas y puntos de venta atendidos con frecuencia semanal.',
    benchmark: 'Cobertura directa en 4 estados',
    trend: 'Guárico, Anzoátegui, Sucre y Bolívar',
  },
  {
    id: 'storage',
    value: '3.200',
    unit: 'm² propios',
    label: 'Infraestructura total',
    detail:
      'Capacidad consolidada en 3 centros logísticos propios estratégicamente ubicados y equipados con protocolos de sanidad.',
    benchmark: '3 centros propios',
    trend: 'Valle de la Pascua · Barcelona · Bolívar',
  },
  {
    id: 'pallets',
    value: '+1.200',
    unit: 'Paletas',
    label: 'Capacidad de estiba',
    detail:
      'Más de 1.200 posiciones de paleta en racks selectivos y áreas de pre-despacho bajo normas BPM e inocuidad.',
    benchmark: 'Control estricto BPM',
    trend: 'Rotación ágil de inventario',
  },
];

export const LOGISTICS_HUBS: LogisticsHub[] = [
  {
    id: 'valle-pascua',
    city: 'Valle de la Pascua',
    state: 'Estado Guárico',
    zoneTag: 'Centro Matriz',
    role: 'Centro Matriz de Operaciones y Consolidación',
    description:
      'Sede matriz operativa de DIVIPECA desde 1990. Punto central de recepción, estiba en paletas y despacho directo hacia todo el Estado Guárico como parte de la red de 3.200 m² y +1.200 paletas.',
    coverage: [
      'Valle de la Pascua',
      'San Juan de los Morros',
      'Calabozo',
      'Altagracia de Orituco',
      'Zaraza',
      'Tucupido',
    ],
    features: [
      'Almacenamiento seco techado con protocolos de sanidad vigentes',
      'Racks selectivos y áreas de pre-despacho señalizadas',
      'Patio de maniobras y descarga para flota propia (5T a 12T)',
      'Mantenimiento preventivo vehicular para continuidad de ruta',
      'Resguardo operativo y control de accesos las 24 horas',
    ],
    fleetStationed: 'Flota propia dedicada (5T–12T)',
    dispatchFrequency: 'Salidas continuas programadas',
    image: IMAGES.warehouseValle,
  },
  {
    id: 'barcelona-plc',
    city: 'Puerto La Cruz / Barcelona',
    state: 'Anzoátegui y Sucre',
    zoneTag: 'Nodo Costero Oriente',
    role: 'Centro Logístico Costero Oriente',
    description:
      'Centro propio estratégico en el corredor costero de Anzoátegui. Diseñado para rotación ágil de consumo masivo y alimentos, atendiendo directamente a cadenas y mayoristas en Anzoátegui y Sucre.',
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
      'Andenes para carga y descarga eficiente',
      'Módulos de picking orientados a lead time de 0,70 días',
      'Cobertura directa hacia los estados Anzoátegui y Sucre',
      'Control de ventilación y protocolos sanitarios para secos',
      'Área de verificación y conciliación por guía de despacho',
    ],
    fleetStationed: 'Flota propia asignada al corredor',
    dispatchFrequency: 'Rutas fijas semanales por zona',
    image: IMAGES.hubBarcelona,
  },
  {
    id: 'ciudad-bolivar',
    city: 'Ciudad Bolívar',
    state: 'Estado Bolívar',
    zoneTag: 'Nodo Sur / Guayana',
    role: 'Centro de Distribución Sur',
    description:
      'Centro propio ubicado en Ciudad Bolívar, Estado Bolívar. Garantiza almacenamiento seco con mezzanine operativo y despacho programado hacia los principales canales comerciales y mayoristas del sur.',
    coverage: [
      'Ciudad Bolívar',
      'Upata',
      'Ciudad Piar',
      'Soledad',
      'Canales del Estado Bolívar',
    ],
    features: [
      'Bodega de almacenamiento seco con mezzanine y control sanitario',
      'Rampas de carga y descarga para unidades dedicadas',
      'Respaldo operativo para continuidad de despacho',
      'Trazabilidad por bulto, paleta y número de lote',
      'Unidades propias asignadas para salidas en el Estado Bolívar',
    ],
    fleetStationed: 'Flota propia asignada al sur',
    dispatchFrequency: 'Rutas programadas en el estado',
    image: IMAGES.hubBolivar,
  },
];

export const FLEET_DETAILS: FleetSpec[] = [
  {
    model: 'Chevrolet NPR / Furgón Urbano',
    payloadCapacity: '5.0 a 6.5 Toneladas',
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
    payloadCapacity: '7.5 a 8.5 Toneladas',
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
    payloadCapacity: '10.0 a 12.0 Toneladas',
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
