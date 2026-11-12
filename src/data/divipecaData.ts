import { MetricItem, TimelineMilestone, LogisticsHub, FleetSpec } from '../types';

export const COMPANY_INFO = {
  name: 'DIVIPECA',
  legalName: 'Distribuidora Vito y Peppe, C.A.',
  rif: 'J-060038278',
  foundedOrigin: 1982,
  foundedFormal: 1990,
  mainClaim: 'Tu logística puntual, tus ventas en crecimiento.',
  description: 'Operador logístico 3PL integral y distribución exclusiva con más de 40 años de trayectoria ininterrumpida. Especialistas en consumo masivo y alimentos secos en los estados Anzoátegui, Bolívar, Guárico y Sucre.',
  primaryColor: '#1B5E20',
  accentColor: '#2E7D32',
  phone: '+58 (238) 779-1120',
  email: 'operaciones@divipeca.com.ve',
  addressMatrix: 'Zona Industrial La Pascua, Av. Principal con Calle Los Cedros, Valle de la Pascua, Edo. Guárico, Venezuela.'
};

export const IMAGES = {
  logo: '/divipeca_logo.svg',
  heroFleet: '/images/hero-fleet.jpg',
  warehouseValle: '/images/warehouse-valle.jpg',
  hubBarcelona: '/images/hub-barcelona.jpg',
  hubBolivar: '/images/hub-bolivar.jpg',
  heritage1982: '/images/heritage-1982.jpg',
};

export const KEY_METRICS: MetricItem[] = [
  {
    id: 'tons',
    value: '+400',
    unit: 'Tn / mes',
    label: 'Toneladas despachadas',
    detail: 'Carga de alimentos y consumo masivo movilizada mensualmente con trazabilidad por lote.',
    benchmark: 'Crecimiento sostenido desde 2024',
    trend: '+18% vs período anterior'
  },
  {
    id: 'otif',
    value: '99.8%',
    unit: 'OTIF',
    label: 'Nivel de servicio y puntualidad',
    detail: 'Entregas a tiempo y completas (On-Time In-Full) en todos los canales mayoristas e independientes.',
    benchmark: 'Estándar multinacional auditado',
    trend: 'Consistente en los 4 estados'
  },
  {
    id: 'clients',
    value: '+820',
    unit: 'Clientes',
    label: 'Puntos de venta activos',
    detail: 'Supermercados, cadenas regionales, abastos mayoristas y distribuidores atendidos con frecuencia semanal.',
    benchmark: 'Cobertura directa certificada',
    trend: 'Guárico, Anzoátegui, Bolívar y Sucre'
  },
  {
    id: 'boxes',
    value: '+29.000',
    unit: 'Cajas / mes',
    label: 'Cajas rotadas en almacén',
    detail: 'Flujo continuo de picking, cross-docking y paletizado bajo normas BPM estrictas.',
    benchmark: 'Capacidad de respuesta en <24h',
    trend: 'Alta rotación de secos'
  },
  {
    id: 'storage',
    value: '+3.700',
    unit: 'm² techados',
    label: 'Infraestructura de almacenamiento',
    detail: 'Capacidad consolidada en 3 centros de distribución estratégicos con control de temperatura y seguridad 24/7.',
    benchmark: '100% de propiedad operativa',
    trend: '3 hubs interconectados'
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '1982',
    title: 'El origen: Una sola camioneta y una promesa',
    subtitle: 'Ruta Caracas — Valle de la Pascua',
    description: 'El padre fundador inicia las operaciones de transporte terrestre con una sola camioneta, trasladando mortadela Giacomello y Pastas Capri desde la capital hasta el corazón de los Llanos en Valle de la Pascua.',
    achievement: 'Primer flete regular de alimentos y génesis del modelo de distribución confiable.',
    category: 'Origen',
    partners: ['Pastas Capri', 'Mortadela Giacomello']
  },
  {
    year: '1980s',
    title: 'Distribución exclusiva de Pastas Capri',
    subtitle: 'Consolidación en todo el Estado Guárico',
    description: 'Se concreta el acuerdo de distribución exclusiva de Pastas Capri para todo el territorio de Guárico. Es el inicio de una alianza estratégica ininterrumpida que hoy supera los 40 años de vigencia comercial.',
    achievement: 'Red pionera de cobertura mayorista en los llanos centrales.',
    category: 'Alianzas',
    partners: ['Pastas Capri (+40 años)']
  },
  {
    year: '1989 & 1993',
    title: 'Relevo generacional y fundación formal',
    subtitle: 'Nace DIVIPECA: “Vito y Peppe”',
    description: 'Vito Binaggia y Giuseppe Binaggia toman la conducción ejecutiva del negocio familiar. En 1990 se constituye formalmente DIVIPECA (Distribuidora Vito y Peppe, C.A.), institucionalizando la estructura jurídica y fiscal.',
    achievement: 'Formalización empresarial con RIF J-060038278 y visión corporativa de largo plazo.',
    category: 'Institucional'
  },
  {
    year: '1990 — 2000',
    title: 'Infraestructura propia y flota vehicular',
    subtitle: 'Independencia logística y solidez patrimonial',
    description: 'Adquisición y adecuación del almacén principal en Valle de la Pascua. Se inicia el plan de compra de camiones propios para garantizar autonomía operativa sin depender de fletes terceros.',
    achievement: 'Primer centro de acopio matriz con patio de maniobras y flota propia.',
    category: 'Infraestructura'
  },
  {
    year: '2004 — 2005',
    title: 'El salto al modelo 3PL dedicado',
    subtitle: 'Alianza transformadora con Galletas Puig',
    description: 'DIVIPECA propone e implementa un modelo de Operador Logístico Tercerizado (3PL) dedicado para Galletas Puig en la región central y oriental. Esta metodología optimiza fletes, control de inventarios y rotación en anaquel.',
    achievement: 'El modelo 3PL de DIVIPECA se convierte en el estándar de servicio para consumo masivo.',
    category: 'Alianzas',
    partners: ['Galletas Puig']
  },
  {
    year: '2006 — 2023',
    title: 'Expansión macro-regional: Oriente y Guayana',
    subtitle: 'Nuevas sedes en Ciudad Bolívar y Puerto La Cruz',
    description: 'Se inauguran los centros logísticos de Ciudad Bolívar (acceso a Guayana y sur) y Puerto La Cruz / Barcelona (eje costero oriente). Se suma el contrato de distribución de Café Fama de América y se amplía el alcance de Puig.',
    achievement: 'Cobertura integrada de 4 estados: Guárico, Anzoátegui, Bolívar y Sucre.',
    category: 'Expansión',
    partners: ['Fama de América', 'Galletas Puig']
  },
  {
    year: '2024 — Hoy',
    title: 'Escala industrial y +400 Tn mensuales',
    subtitle: 'Alimentos Botalón y modernización tecnológica',
    description: 'Incorporación al portafolio de Alimentos Botalón, superando las 400 toneladas despachadas al mes con 99.8% de efectividad OTIF. Implementación de control de despachos en tiempo real y protocolos de estiba avanzada.',
    achievement: '+820 clientes atendidos con precisión y solidez financiera.',
    category: 'Expansión',
    partners: ['Alimentos Botalón', 'Galletas Puig', 'Pastas Capri']
  }
];

export const LOGISTICS_HUBS: LogisticsHub[] = [
  {
    id: 'valle-pascua',
    city: 'Valle de la Pascua',
    state: 'Guárico',
    area: '1.400 m²',
    areaNumber: 1400,
    role: 'Centro Matriz de Operaciones y Consolidación',
    description: 'El corazón operativo e histórico de DIVIPECA. Almacén de alta capacidad para recepción de gandolas de planta, acopio central, paletizado masivo y cross-docking para despachos hacia los Llanos Centrales y Centro-Sur.',
    coverage: ['Valle de la Pascua', 'San Juan de los Morros', 'Calabozo', 'Altagracia de Orituco', 'Zaraza', 'Tucupido'],
    features: [
      'Almacenamiento techado con altura útil de 8.5 metros',
      'Racks selectivos para +1.200 posiciones de estibas',
      'Patio de maniobras y descarga simultánea para gandolas',
      'Taller central de mantenimiento preventivo de flota',
      'Seguridad física perimetral y circuito cerrado 24 horas'
    ],
    fleetStationed: '12 unidades asignadas',
    dispatchFrequency: 'Salidas diarias continuas',
    image: IMAGES.warehouseValle
  },
  {
    id: 'barcelona-plc',
    city: 'Puerto La Cruz / Barcelona',
    state: 'Anzoátegui & Sucre',
    area: '1.300 m²',
    areaNumber: 1300,
    role: 'Hub Costero Oriente & Intermodal',
    description: 'Ubicación estratégica en el principal nodo industrial y comercial del oriente venezolano. Diseñado para rotación rápida, atención inmediata a cadenas de supermercados costeras y conexión ágil hacia Cumaná, Carúpano y Sucre.',
    coverage: ['Barcelona', 'Puerto La Cruz', 'Lechería', 'Guanta', 'El Tigre', 'Anaco', 'Cumaná', 'Carúpano'],
    features: [
      'Andenes elevados para carga y descarga rápida',
      'Módulos de picking intensivo para entregas menores a 24h',
      'Punto de consolidación para despachos hacia Sucre y Margarita',
      'Control de humedad y ventilación para productos secos',
      'Área dedicada de logística inversa y verificación de devoluciones'
    ],
    fleetStationed: '10 unidades asignadas',
    dispatchFrequency: 'Rutas fijas 3 veces por semana por zona',
    image: IMAGES.hubBarcelona
  },
  {
    id: 'ciudad-bolivar',
    city: 'Ciudad Bolívar',
    state: 'Bolívar',
    area: '1.000 m²',
    areaNumber: 1000,
    role: 'Hub Estratégico Guayana & Cuenca del Sur',
    description: 'Puerta de entrada logística para el sur del país. Garantiza abastecimiento regular a los canales comerciales del estado Bolívar, sorteando distancias complejas mediante rutas programadas con extrema rigurosidad horaria.',
    coverage: ['Ciudad Bolívar', 'Puerto Ordaz / San Félix', 'Upata', 'Ciudad Piar', 'Soledad'],
    features: [
      'Bodega de almacenamiento seco con piso epóxico de alta resistencia',
      'Rampas niveladoras mecánicas de alta durabilidad',
      'Planta eléctrica de respaldo 100% autónoma',
      'Sistema de trazabilidad por bulto y número de lote',
      'Control estricto de estiba para trayectos de larga distancia'
    ],
    fleetStationed: '8 unidades asignadas',
    dispatchFrequency: 'Rutas quincenales y semanales programadas',
    image: IMAGES.hubBolivar
  }
];

export const FLEET_DETAILS: FleetSpec[] = [
  {
    model: 'Chevrolet NPR Turbo Diésel',
    payloadCapacity: '5.0 a 6.5 Toneladas',
    category: 'Distribución Urbana & Suburbana',
    useCase: 'Agilidad de reparto en cascos urbanos, supermercados independientes y canales tradicionales.',
    features: ['Furgones de aluminio termoaislados', 'Monitoreo satelital GPS en tiempo real', 'Compensación de carga para cero mermas']
  },
  {
    model: 'Encava Serie D',
    payloadCapacity: '7.5 a 8.5 Toneladas',
    category: 'Distribución Interurbana Media',
    useCase: 'Rutas entre centros de distribución y abastecimiento a mayoristas medianos en Anzoátegui y Guárico.',
    features: ['Chasis reforzado para carreteras troncales', 'Sistema de amarre de carga con rieles logísticos', 'Mantenimiento preventivo por kilometraje']
  },
  {
    model: 'JAC Búfalo Pesado',
    payloadCapacity: '10.0 a 12.0 Toneladas',
    category: 'Transferencia Troncal & Gran Volumen',
    useCase: 'Movilización intersedes entre Valle de la Pascua, Barcelona y Ciudad Bolívar con carga consolidada.',
    features: ['Frenos de aire y control de estabilidad', 'Capacidad para 18 a 22 estibas estándar', 'Conductores senior certificados en ruta']
  }
];

export const CLIENT_PARTNERS = [
  { name: 'Pastas Capri', relationship: 'Alianza exclusiva de distribución desde los años 80 (+40 años)' },
  { name: 'Galletas Puig', relationship: 'Operación 3PL dedicada desde 2004 en oriente y centro' },
  { name: 'Café Fama de América', relationship: 'Contrato de distribución regional desde 2006' },
  { name: 'Alimentos Botalón', relationship: 'Incorporación estratégica 2024 para gran escala' }
];
