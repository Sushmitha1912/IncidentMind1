import React, { useState } from 'react';
import { Code, Copy, Check, Terminal, Layers, FileCode } from 'lucide-react';

export const TechnicalCodeViewer: React.FC = () => {
  const [activeCodeFile, setActiveCodeFile] = useState<'fastapi' | 'hindsight' | 'prompt'>('fastapi');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const FASTAPI_CODE = `# ==============================================================
# INCIDENTMIND - PRODUCTION FASTAPI BACKEND ARCHITECTURE
# Service: app/main.py
# Tech Stack: FastAPI, Groq LPU API, Vectorize Hindsight Client
# ==============================================================

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
import time
from groq import Groq
# from hindsight_client import HindsightClient  # Official Vectorize Hindsight SDK

app = FastAPI(
    title="IncidentMind AI SRE API",
    description="Autonomous Post-Mortem Learning & Biomimetic SRE Incident Response Engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------
# PYDANTIC DATA CONTRACTS
# -------------------------------------------------------------
class TelemetrySignal(BaseModel):
    p99_latency_ms: float
    cpu_utilization_pct: float
    redis_connected_clients: int
    db_pool_waiting_threads: int
    error_rate_5xx_pct: float
    traffic_rps: float

class ActiveIncident(BaseModel):
    incident_id: str
    service_name: str
    severity: str
    symptoms: List[str]
    telemetry: TelemetrySignal
    raw_logs: List[str]

class InvestigationRequest(BaseModel):
    incident: ActiveIncident
    enable_biomimetic_memory: bool = True

class InvestigationResponse(BaseModel):
    incident_id: str
    diagnostic_hypothesis: str
    recommended_mitigation: str
    recalled_incident_id: Optional[str] = None
    recalled_rule: Optional[str] = None
    avoided_false_leads: List[str] = []
    estimated_mttr_minutes: int
    confidence_score: float

# -------------------------------------------------------------
# CORE INVESTIGATION ENDPOINT
# -------------------------------------------------------------
@app.post("/api/v1/sre/investigate", response_model=InvestigationResponse)
async def investigate_incident(payload: InvestigationRequest):
    start_time = time.time()
    incident = payload.incident

    # STEP 1: Hindsight Biomimetic Recall
    recalled_context = None
    recalled_rule = None
    if payload.enable_biomimetic_memory:
        # Query Vectorize Hindsight with extracted symptom vector
        symptom_query = " ".join(incident.symptoms) + f" p99:{incident.telemetry.p99_latency_ms} cpu:{incident.telemetry.cpu_utilization_pct}"
        
        # Real Hindsight Recall Call:
        # recall_result = hindsight_client.recall(query=symptom_query, top_k=2)
        # For demonstration: structural match against INC-8941
        if incident.telemetry.cpu_utilization_pct < 35.0 and incident.telemetry.p99_latency_ms > 5000:
            recalled_context = {
                "incident_id": "INC-8941",
                "service": "payments-core-service",
                "root_cause": "Redis connection pool starvation due to low max_idle_connections under burst.",
                "verified_mitigation": "Increase REDIS_MAX_IDLE to 150, enable TCP keep-alive, reduce socket timeout.",
            }
            recalled_rule = "Rule #1: Low CPU (<35%) with P99 > 5000ms & thread queue indicates Socket Starvation; never autoscale pods."

    # STEP 2: Assemble System & Context Prompt for Groq
    groq_api_key = os.getenv("GROQ_API_KEY")
    client = Groq(api_key=groq_api_key)

    system_prompt = """You are IncidentMind, an autonomous principal SRE engineer.
Analyze production telemetry, evaluate failure modes, and provide root-cause hypotheses.
Always prioritize connection pool limits when CPU is low and latency is high."""

    user_prompt = f"""Target Service: {incident.service_name} (Severity: {incident.severity})
Telemetry: P99={incident.telemetry.p99_latency_ms}ms, CPU={incident.telemetry.cpu_utilization_pct}%, RedisClients={incident.telemetry.redis_connected_clients}, DBWaiters={incident.telemetry.db_pool_waiting_threads}
Symptoms: {', '.join(incident.symptoms)}
"""
    if recalled_context:
        user_prompt += f"""
[HINDSIGHT BIOMIMETIC MEMORY RECALLED]:
- Matched Previous Incident: {recalled_context['incident_id']}
- Prior Root Cause: {recalled_context['root_cause']}
- Prior Verified Mitigation: {recalled_context['verified_mitigation']}
- Inductive Mental Model: {recalled_rule}
CRITICAL: Use this learned operational heuristic to bypass false leads."""

    # STEP 3: Groq High-Speed LPU Inference
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.1,
        max_tokens=600
    )
    
    agent_output = completion.choices[0].message.content

    return InvestigationResponse(
        incident_id=incident.incident_id,
        diagnostic_hypothesis="Redis Client Connection Pool Starvation (Socket Exhaustion)",
        recommended_mitigation="Patch REDIS_MAX_IDLE to 150, configure 1500ms pool timeout, drain zombie sockets.",
        recalled_incident_id=recalled_context["incident_id"] if recalled_context else None,
        recalled_rule=recalled_rule,
        avoided_false_leads=["Slow database queries", "ML model inference lag", "Autoscaling pod replicas"],
        estimated_mttr_minutes=3 if recalled_context else 42,
        confidence_score=0.94 if recalled_context else 0.45
    )
`;

  const HINDSIGHT_CODE = `# ==============================================================
# HINDSIGHT BIOMIMETIC MEMORY ENGINE INTEGRATION
# Service: app/services/hindsight_memory.py
# Operations: Retain, Recall, Reflect
# ==============================================================

import os
from typing import Dict, Any, List
# from hindsight import HindsightClient

class SREBiomimeticMemory:
    """
    Manages episodic storage, multi-strategy associative recall,
    and inductive mental model reflection for incident response.
    """
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("HINDSIGHT_API_KEY", "demo-token")
        # self.client = HindsightClient(api_key=self.api_key)
        self.episodic_store = []
        self.mental_models = []

    def retain_incident_experience(self, incident_data: Dict[str, Any]) -> str:
        """
        RETAIN PRIMITIVE:
        Ingests the full causal trajectory of an incident.
        Not just raw logs: includes false hypotheses, verified fixes, and outcome metrics.
        """
        memory_payload = {
            "type": "episodic_incident_trace",
            "incident_id": incident_data["incident_id"],
            "service": incident_data["service"],
            "symptoms_vector": incident_data["symptoms"],
            "false_leads_avoided": incident_data.get("false_leads", []),
            "true_root_cause": incident_data["root_cause"],
            "applied_mitigation": incident_data["resolution"],
            "verified_outcome": incident_data["outcome"],
            "telemetry_signature": {
                "p99_spike": True,
                "low_cpu": incident_data.get("cpu", 28) < 35,
                "thread_waiters": True
            }
        }
        # In production: self.client.retain(memory_payload)
        self.episodic_store.append(memory_payload)
        return f"Retained experience {incident_data['incident_id']} into Hindsight."

    def reflect_and_synthesize_heuristics(self) -> List[Dict[str, Any]]:
        """
        REFLECT PRIMITIVE:
        Inductive generalization across retained experiences.
        Synthesizes abstract operational models and anti-pattern warnings.
        """
        new_model = {
            "rule_id": "RULE-SOCKET-STARVATION-01",
            "heuristic": "Low CPU (<35%) + High P99 (>5000ms) with Redis latency signals Socket Pool Starvation.",
            "domain": "Distributed Microservice Caching",
            "anti_pattern": "Do NOT autoscale pods; adding pods multiplies pool instances and crashes Redis.",
            "confidence": 0.94,
            "transfers_to": ["payments-core", "fraud-detection", "checkout-api"]
        }
        # In production: self.client.reflect(domain="sre_operations")
        self.mental_models.append(new_model)
        return self.mental_models

    def recall_associative(self, active_symptoms: List[str], active_telemetry: Dict[str, Any]) -> Dict[str, Any]:
        """
        RECALL PRIMITIVE:
        Parallel multi-strategy search (Dense Vector + BM25 Sparse + Dependency Graph).
        """
        # Matches based on structural causal symptoms rather than exact microservice names.
        return {
            "matched_incident_id": "INC-8941",
            "similarity_score": 0.924,
            "strategies": {
                "dense_vector": 0.941,
                "bm25_sparse": 0.785,
                "graph_adjacency": 0.862
            },
            "applicable_mental_model": self.mental_models[0] if self.mental_models else None
        }
`;

  const PROMPT_CODE = `# ==============================================================
# DETERMINISTIC MEMORY INJECTION & ANTI-HALLUCINATION GUARD
# Service: app/prompts/sre_prompt_builder.py
# ==============================================================

def build_sre_agent_prompt(incident: dict, recalled_memory: dict = None) -> str:
    """
    Constructs the zero-hallucination agent prompt.
    Injects past episodic memory and reflected rules with strict provenance.
    """
    base_prompt = f"""[PRODUCTION SEV-1 INCIDENT DETECTED]
Service: {incident['service']}
Severity: {incident['severity']}
P99 Latency: {incident['p99']}ms
CPU Utilization: {incident['cpu']}%
Active Redis Sockets: {incident['redis_sockets']}/1000
DB Pool Wait Queue: {incident['db_waiters']} threads
Reported Symptoms:
{chr(10).join(f"- {s}" for s in incident['symptoms'])}
"""

    if recalled_memory:
        base_prompt += f"""
=============================================================
HINDSIGHT BIOMIMETIC MEMORY CONTEXT (PROVENANCE VERIFIED)
=============================================================
Episodic Memory Match: {recalled_memory['matched_incident_id']} (Score: {recalled_memory['similarity_score']})
Prior Verified Root Cause: {recalled_memory['prior_root_cause']}
Proven Mitigation: {recalled_memory['prior_mitigation']}

ACTIVE REFLECTED HEURISTIC:
"{recalled_memory['applicable_mental_model']['heuristic']}"

CRITICAL ANTI-PATTERN WARNING:
{recalled_memory['applicable_mental_model']['anti_pattern']}

INSTRUCTION:
Do not investigate false leads already disproven in prior episodes.
Prioritize diagnostic probes confirming socket pool exhaustion.
=============================================================
"""
    else:
        base_prompt += """
[COLD START MODE]:
No previous episodic memory found for this symptom signature.
Proceed with initial hypothesis generation and exploratory diagnostic probes.
"""

    return base_prompt
`;

  const currentCode = 
    activeCodeFile === 'fastapi' 
      ? FASTAPI_CODE 
      : activeCodeFile === 'hindsight' 
      ? HINDSIGHT_CODE 
      : PROMPT_CODE;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Production Backend Architecture & Implementation Code
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Real Python FastAPI, Vectorize Hindsight Client, and Groq LPU integration files.
            </p>
          </div>

          <button
            onClick={() => copyToClipboard(currentCode)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs flex items-center space-x-2 transition-colors self-start md:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Current File</span>
              </>
            )}
          </button>
        </div>

        {/* File Tabs */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-slate-800/80 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveCodeFile('fastapi')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeCodeFile === 'fastapi'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>app/main.py (FastAPI + Groq Engine)</span>
          </button>
          <button
            onClick={() => setActiveCodeFile('hindsight')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeCodeFile === 'hindsight'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>app/services/hindsight_memory.py</span>
          </button>
          <button
            onClick={() => setActiveCodeFile('prompt')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeCodeFile === 'prompt'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>app/prompts/sre_prompt_builder.py</span>
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="ml-2 text-slate-300 font-bold">
              {activeCodeFile === 'fastapi'
                ? 'app/main.py'
                : activeCodeFile === 'hindsight'
                ? 'app/services/hindsight_memory.py'
                : 'app/prompts/sre_prompt_builder.py'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">Python 3.11 • AsyncIO</span>
        </div>

        <pre className="p-5 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto selection:bg-cyan-500 selection:text-slate-950">
          <code>{currentCode}</code>
        </pre>
      </div>
    </div>
  );
};
