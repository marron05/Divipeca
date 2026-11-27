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
  areaM2: number;
  areaM2Label: string;
  palletsNominal: number;
  palletsLabel: string;
  capacityShare: number;
  capacityShareLabel: string;
  securityTag: string;
  cardBullets: string[];
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

export interface BottleneckPair {
  id: string;
  step: number;
  bottleneckTitle: string;
  bottleneckDetail: string;
  solutionTitle: string;
  solutionDetail: string;
}

export interface OperationalPillar {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface CommercialAlliance {
  id: string;
  name: string;
  status: string;
  badge: string;
  description: string;
  logo: string;
}

export interface ProjectedLeadData {
  sedeId: string;
  sedeLabel: string;
  toneladasMes: number;
  paletasDisplay: string;
  ocupacionDisplay: string;
  frecuenciaRecomendada: string;
  timestamp: number;
}
