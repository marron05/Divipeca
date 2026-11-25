export interface MetricItem {
  id: string;
  value: string;
  unit?: string;
  subtitle?: string;
  label: string;
  detail: string;
  benchmark: string;
  trend: string;
}

export interface LogisticsHub {
  id: string;
  city: string;
  state: string;
  zoneTag: string;
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
