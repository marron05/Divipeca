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
    area: '1.200 m²',
    areaNumber: 1200,
    role: 'Centro Matriz de Operaciones y Consolidación',
    description:
      'El corazón operativo e histórico de DIVIPECA desde 1990. Almacén de alta capacidad para recepción de planta, acopio central, estiba en paletas y despacho directo hacia todo el Estado Guárico.',
    coverage: [
      'Valle de la Pascua',
      'San Juan de los Morros',
      'Calabozo',
      'Altagracia de Orituco',
      'Zaraza',
      'Tucupido',
    ],
    features: [
      'Almacenamiento techado con protocolo sanitario BPM vigente',
      'Racks selectivos y áreas de pre-despacho señalizadas',
      'Patio de maniobras y descarga simultánea para flota propia',
      'Taller central de mantenimiento preventivo vehicular',
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
    area: '1.100 m²',
    areaNumber: 1100,
    role: 'Centro Logístico Costero Oriente',
    description:
      'Ubicación estratégica en el principal nodo industrial y comercial de Anzoátegui. Diseñado para rotación rápida, atención directa a cadenas costeras y cobertura regular hacia el Estado Sucre.',
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
      'Módulos de picking intensivo para lead time de 0,70 días',
      'Cobertura directa hacia los estados Anzoátegui y Sucre',
      'Control de humedad, ventilación y sanidad para secos',
      'Área dedicada de logística inversa y verificación',
    ],
    fleetStationed: '10 unidades asignadas',
    dispatchFrequency: 'Rutas fijas semanales por zona',
    image: IMAGES.hubBarcelona,
  },
  {
    id: 'ciudad-bolivar',
    city: 'Ciudad Bolívar',
    state: 'Estado Bolívar',
    area: '900 m²',
    areaNumber: 900,
    role: 'Centro de Distribución Estado Bolívar',
    description:
      'Sede propia ubicada en Ciudad Bolívar, Estado Bolívar. Garantiza almacenamiento seco con mezzanine operativo y despacho local programado hacia los principales canales mayoristas del Estado Bolívar.',
    coverage: [
      'Ciudad Bolívar',
      'Upata',
      'Ciudad Piar',
      'Soledad',
      'Canales del Estado Bolívar',
    ],
    features: [
      'Bodega de almacenamiento seco con mezzanine y control BPM',
      'Rampas de carga y descarga para unidades dedicadas',
      'Planta eléctrica de respaldo operativa',
      'Sistema de trazabilidad por bulto, paleta y número de lote',
      'Flota local asignada para salidas directas en el Estado Bolívar',
    ],
    fleetStationed: '8 unidades asignadas',
    dispatchFrequency: 'Rutas semanales y quincenales programadas',
    image: IMAGES.hubBolivar,
  },
];

export const FLEET_DETAILS: FleetSpec[] = [
  {
    model: 'Chevrolet NPR / Furgón Urbano',
    payloadCapacity: '5.0 a 6.5 Toneladas',
    category: 'Distribución Urbana & Suburbana',
    useCase:
      'Agilidad de reparto en cascos urbanos, supermercados independientes y canales tradicionales.',
    features: [
      'Furgones de aluminio termoaislados',
      'Monitoreo satelital GPS en tiempo real',
      'Protocolos sanitarios y fumigación al día',
    ],
  },
  {
    model: 'Encava ET-5 / Serie Media',
    payloadCapacity: '7.5 a 8.5 Toneladas',
    category: 'Distribución Regional Media',
    useCase:
      'Salidas desde cada centro hacia mayoristas medianos en Guárico, Anzoátegui, Sucre y Bolívar.',
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
      'Capacidad estibada de alto volumen',
      'Conductores senior certificados en ruta',
    ],
  },
];
