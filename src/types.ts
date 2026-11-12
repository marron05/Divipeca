export interface MetricItem {
  id: string;
  value: string;
  unit?: string;
  label: string;
  detail: string;
  benchmark: string;
  trend: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  achievement: string;
  category: 'Origen' | 'Institucional' | 'Infraestructura' | 'Alianzas' | 'Expansión';
  partners?: string[];
  tag?: string;
}

export interface LogisticsHub {
  id: string;
  city: string;
  state: string;
  area: string;
  areaNumber: number;
  role: string;
  description: string;
  coverage: string[];
  features: string[];
  fleetStationed: string;
  dispatchFrequency: string;
  image: string;
}

export interface FleetSpec {
  model: string;
  payloadCapacity: string;
  category: string;
  useCase: string;
  features: string[];
}
