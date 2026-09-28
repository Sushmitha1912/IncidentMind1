import React, { useState } from 'react';
import { RetainedExperience, ReflectedInsight } from '../types';
import { 
  Brain, 
  Database, 
  Search, 
  Sparkles, 
  GitFork, 
  CheckCircle2, 
  ShieldAlert, 
  Layers, 
  Code,
  Tag,
  ArrowRight
} from 'lucide-react';

interface HindsightBrainProps {
  experiences: RetainedExperience[];
  reflections: ReflectedInsight[];
  activeIncidentId: string;
}

export const HindsightBrain: React.FC<HindsightBrainProps> = ({
  experiences,
  reflections,
  activeIncidentId,
}) => {
  const [activeMemoryTab, setActiveMemoryTab] = useState<'retain' | 'recall' | 'reflect' | 'raw'>('reflect');
  const [searchQuery, setSearchQuery] = useState(
    'HTTP 504 latency spike 6000ms low CPU Redis timeout'
  );

  return (
    <div className="space-y-6">
      {/* Chamber Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Vectorize Hindsight Biomimetic Memory Visualizer
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Live inspection of human-inspired episodic memory, multi-strategy associative recall, and inductive mental model reflection.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              Retained Experiences: <strong className="text-cyan-400">{experiences.length}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              Reflected Mental Models: <strong className="text-emerald-400">{reflections.length}</strong>
            </span>
          </div>
        </div>

        {/* Memory Sub-Tabs */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-slate-800/80 font-mono text-xs">
          <button
            onClick={() => setActiveMemoryTab('reflect')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeMemoryTab === 'reflect'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. REFLECT (Mental Models & Heuristics)</span>
          </button>
          <button
            onClick={() => setActiveMemoryTab('recall')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeMemoryTab === 'recall'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. RECALL (Multi-Strategy Retrieval)</span>
          </button>
          <button
            onClick={() => setActiveMemoryTab('retain')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeMemoryTab === 'retain'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>3. RETAIN (Episodic Experiences)</span>
          </button>
          <button
            onClick={() => setActiveMemoryTab('raw')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
              activeMemoryTab === 'raw'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw JSON Schema</span>
          </button>
        </div>
      </div>

      {/* Chamber Content */}
      <div className="space-y-6">
        {/* 1. REFLECT CHAMBER */}
        {activeMemoryTab === 'reflect' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Synthesized Operational Mental Models
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      How Hindsight turns raw episodic logs into high-level transferable operational wisdom.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                  Inductive Generalization
                </span>
              </div>

              {reflections.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                        {insight.domain}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{insight.title}</h4>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        Confidence: <strong className="text-emerald-400">{(insight.confidence * 100).toFixed(0)}%</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        Derived: <strong className="text-cyan-400">{insight.derivedFromExperiences.join(', ')}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Core Rule */}
                  <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4 font-mono">
                    <div className="text-xs font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Abstract Mental Model Rule (Injected into Agent Reasoning):</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                      "{insight.mentalModelRule}"
                    </p>
                  </div>

                  {/* Heuristic & Anti-Pattern */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                      <span className="text-cyan-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Why RAG Fails Here:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {insight.heuristicSummary}
                      </p>
                    </div>

                    <div className="bg-rose-950/20 p-3.5 rounded-xl border border-rose-800/40 space-y-1">
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Critical Anti-Pattern Avoided:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {insight.antiPatternWarning}
                      </p>
                    </div>
                  </div>

                  {/* Cross-Service Transferability */}
                  <div className="text-xs font-mono text-slate-400 pt-2 flex items-center flex-wrap gap-2">
                    <span className="text-slate-500">Learned Rule Transfers Across Services:</span>
                    {insight.applicableServices.map((svc, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-[11px] border ${
                          svc === 'fraud-detection-service' && activeIncidentId === 'INC-9102'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold animate-pulse'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. RECALL CHAMBER */}
        {activeMemoryTab === 'recall' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <Search className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Associative Multi-Strategy Recall Engine
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Hindsight does not just use cosine similarity. It combines dense embeddings, BM25 sparse cues, and graph adjacency.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
                  Hybrid Associative Retrieval
                </span>
              </div>

              {/* Interactive Query Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400">
                  Active Incident Telemetry & Symptom Vector Query:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                  <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-mono text-xs font-bold transition-colors">
                    Re-Score Memory
                  </button>
                </div>
              </div>

              {/* Match Strategy Breakdown */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <GitFork className="w-3.5 h-3.5" />
                    Top Recalled Match: INC-8941 (payments-core-service)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Composite Match Score: 92.4%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Dense Semantic Vector</div>
                    <div className="text-base font-bold text-cyan-300">0.941</div>
                    <div className="text-[10px] text-slate-500">Embedding similarity</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Sparse BM25 Tokens</div>
                    <div className="text-base font-bold text-indigo-300">0.785</div>
                    <div className="text-[10px] text-slate-500">Keywords: 504, Redis, CPU</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Graph Topology Distance</div>
                    <div className="text-base font-bold text-emerald-300">0.862</div>
                    <div className="text-[10px] text-slate-500">Shared Redis dependency</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[11px]">Temporal Decay Factor</div>
                    <div className="text-base font-bold text-amber-300">0.990</div>
                    <div className="text-[10px] text-slate-500">Occurred 2.5 hours ago</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                  <strong className="text-cyan-300">Why this proves cross-service learning:</strong> The query comes from <code>fraud-detection-service</code> (different microservice, different database, different authors). A dumb keyword search would look for fraud model errors. Hindsight's multi-strategy recall isolates the <strong>architectural symptom pattern</strong> (high latency + low CPU + thread queue) and bridges the operational gap!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. RETAIN CHAMBER */}
        {activeMemoryTab === 'retain' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                    <Database className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Retained Episodic Incident Traces
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Not plain text or markdown logs: structured episodic tuples capturing the complete causal arc of an outage.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
                  Causal Episodic Capture
                </span>
              </div>

              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 font-mono text-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-cyan-300">{exp.incidentId}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">{exp.service}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-indigo-400 font-semibold">{exp.category}</span>
                    </div>
                    <span className="text-slate-500 text-[11px]">{exp.timestamp}</span>
                  </div>

                  {/* Diagnostic Path */}
                  <div className="space-y-1.5">
                    <span className="text-slate-400 font-bold">Investigative Path & False Leads:</span>
                    <div className="space-y-1">
                      {exp.diagnosticPath.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2 text-slate-300 bg-slate-900/60 p-1.5 rounded"
                        >
                          <span className="text-slate-500 text-[10px]">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Root Cause & Resolution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/40">
                      <span className="text-rose-400 font-bold block mb-1">True Root Cause:</span>
                      <p className="text-slate-300">{exp.rootCause}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                      <span className="text-emerald-400 font-bold block mb-1">Verified Resolution:</span>
                      <p className="text-slate-300">{exp.resolution}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center space-x-1.5 pt-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                    {exp.tags.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. RAW JSON SCHEMA */}
        {activeMemoryTab === 'raw' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" />
                Hindsight Memory Representation Payload (Python / REST API Contract)
              </span>
              <span className="text-[10px] text-slate-500">Vectorize Hindsight Compatible</span>
            </div>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-cyan-300/90 overflow-x-auto text-[11px] leading-relaxed">
{JSON.stringify(
  {
    retained_experiences: experiences,
    reflected_mental_models: reflections,
  },
  null,
  2
)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
