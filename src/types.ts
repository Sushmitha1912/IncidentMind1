export interface IncidentMetric {
  name: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

export interface IncidentLog {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
}

export interface DiagnosticAction {
  id: string;
  name: string;
  command: string;
  output: string;
  reveals: string;
  isHelpful: boolean;
}

export interface Incident {
  id: string;
  title: string;
  service: string;
  severity: 'SEV-1' | 'SEV-2' | 'SEV-3';
  status: 'active' | 'investigating' | 'mitigating' | 'resolved';
  timestamp: string;
  p99LatencyMs: number;
  cpuPercent: number;
  redisConnections: number;
  dbPoolSaturationPct: number;
  errorRatePct: number;
  trafficRps: number;
  symptoms: string[];
  logs: IncidentLog[];
  diagnostics: DiagnosticAction[];
  coldStartReasoning: {
    firstHypothesis: string;
    falseLead: string;
    stepsTaken: number;
    timeToIdentifyMinutes: number;
    explanation: string;
    proposedFix: string;
  };
  memoryInformedReasoning?: {
    firstHypothesis: string;
    recalledIncidentId: string;
    recalledReflectedRule: string;
    avoidedFalseLead: string;
    stepsTaken: number;
    timeToIdentifyMinutes: number;
    explanation: string;
    proposedFix: string;
  };
  actualRootCause: string;
  resolutionAction: string;
  outcome: string;
}

export interface RetainedExperience {
  id: string;
  incidentId: string;
  service: string;
  category: 'connection_pool_exhaustion' | 'deadlock' | 'memory_leak' | 'dns_failure';
  timestamp: string;
  symptomsVector: string[];
  diagnosticPath: string[];
  falseLeadsAvoided: string[];
  rootCause: string;
  resolution: string;
  verificationMetric: string;
  outcome: string;
  tags: string[];
}

export interface ReflectedInsight {
  id: string;
  title: string;
  mentalModelRule: string;
  domain: string;
  confidence: number;
  derivedFromExperiences: string[];
  applicableServices: string[];
  heuristicSummary: string;
  antiPatternWarning: string;
}

export interface RecallMatch {
  experience: RetainedExperience;
  matchedScore: number;
  matchedFeatures: string[];
  retrievalStrategy: 'dense_semantic' | 'bm25_sparse' | 'graph_adjacency' | 'hybrid_biomimetic';
}

export interface MemoryState {
  experiences: RetainedExperience[];
  reflectedInsights: ReflectedInsight[];
  activeRecall: {
    query: string;
    matches: RecallMatch[];
    activeInsight?: ReflectedInsight;
  } | null;
}
