import React, { useState } from 'react';
import { Incident, DiagnosticAction } from '../types';
import { 
  AlertTriangle, 
  Terminal, 
  Activity, 
  Database, 
  Server, 
  ArrowRight, 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  TrendingUp,
  Cpu,
  Zap,
  Play
} from 'lucide-react';

interface IncidentConsoleProps {
  incident: Incident;
  isMemoryEnhanced: boolean;
  onCommitResolutionAndRetain: () => void;
  hasRetained: boolean;
}

export const IncidentConsole: React.FC<IncidentConsoleProps> = ({
  incident,
  isMemoryEnhanced,
  onCommitResolutionAndRetain,
  hasRetained,
}) => {
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticAction | null>(null);
  const [activeReasoningTab, setActiveReasoningTab] = useState<'agent' | 'logs' | 'diagnostics'>('agent');
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedStatus, setResolvedStatus] = useState<string | null>(null);

  const handleResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setResolvedStatus('Resolved & Retained in Biomimetic Memory');
      onCommitResolutionAndRetain();
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Incident Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1 ${
          incident.id === 'INC-8941' ? 'bg-rose-500' : 'bg-cyan-500'
        }`}></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                {incident.severity}
              </span>
              <span className="font-mono text-sm font-semibold text-slate-400">
                {incident.id}
              </span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-xs text-slate-400">
                Target Service: <span className="text-cyan-300 font-bold">{incident.service}</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-400">{incident.timestamp}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {incident.title}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            {resolvedStatus ? (
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{resolvedStatus}</span>
              </div>
            ) : (
              <button
                onClick={handleResolve}
                disabled={isResolving}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 shadow-lg ${
                  incident.id === 'INC-8941'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/30'
                }`}
              >
                {isResolving ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Processing Biomimetic Synthesis...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    <span>
                      {incident.id === 'INC-8941'
                        ? '1. Resolve & Retain Into Hindsight'
                        : '2. Execute Memory-Guided Fix'}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>P99 Latency</span>
              <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-xl font-bold font-mono text-rose-400">
              {incident.p99LatencyMs} <span className="text-xs text-slate-400">ms</span>
            </div>
            <div className="text-[10px] text-rose-400/80 font-mono mt-0.5">SLA Threshold: 200ms</div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>Host CPU</span>
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">
              {incident.cpuPercent}%
            </div>
            <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">Misleading Low Load!</div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>Redis Clients</span>
              <Zap className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-xl font-bold font-mono text-rose-400">
              {incident.redisConnections} <span className="text-xs text-slate-400">/ 1000</span>
            </div>
            <div className="text-[10px] text-rose-400 font-mono mt-0.5">Pool Near Exhaustion</div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>DB Pool Sat.</span>
              <Database className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-bold font-mono text-amber-400">
              {incident.dbPoolSaturationPct}%
            </div>
            <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">Wait Queue Saturated</div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>Traffic RPS</span>
              <Server className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-bold font-mono text-cyan-300">
              {incident.trafficRps.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">Burst Flash Event</div>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>5xx Error Rate</span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-xl font-bold font-mono text-rose-400">
              {incident.errorRatePct}%
            </div>
            <div className="text-[10px] text-rose-400 font-mono mt-0.5">504 Gateway Timeouts</div>
          </div>
        </div>
      </div>

      {/* Main Investigation Split: Agent Reasoning vs Diagnostic Probes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: SRE Agent Reasoning Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                  Autonomous SRE Reasoning Engine (Groq LPU)
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                {incident.id === 'INC-8941' ? (
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Cold Start Mode (Zero Memory)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Biomimetic Recall Active (INC-8941)
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 space-y-4">
              {incident.id === 'INC-8941' ? (
                /* Incident 1: Cold Start Reasoning */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        Initial Hypothesis (Naive SRE Trap)
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Step 1 of 4</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200">
                      {incident.coldStartReasoning.firstHypothesis}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono">
                      {incident.coldStartReasoning.explanation}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
                    <div className="flex items-center space-x-2 text-rose-300 text-xs font-mono font-semibold">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>False Leads Chased (Wasted Incident Time):</span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono">
                      {incident.coldStartReasoning.falseLead}
                    </p>
                    <div className="text-[11px] text-rose-400 font-mono">
                      Result: Scaling pods would spin up new connection pools, consuming the remaining 20 Redis sockets and completely crashing the cluster!
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-cyan-400 font-bold">Cold Start Diagnostic Metrics:</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-rose-400" />
                        Time to Identify: <strong className="text-rose-400">{incident.coldStartReasoning.timeToIdentifyMinutes} minutes</strong>
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono space-y-1">
                      <div>• Steps taken to isolate: <strong className="text-white">4 investigative rounds</strong></div>
                      <div>• Root Cause Found by Human SRE: <span className="text-emerald-400">{incident.actualRootCause}</span></div>
                      <div>• Applied Resolution: <span className="text-cyan-300">{incident.resolutionAction}</span></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Incident 2: Memory-Informed Reasoning */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                        <Brain className="w-4 h-4 text-cyan-400" />
                        Associative Biomimetic Recall Activated
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-200">
                        Match: {incident.memoryInformedReasoning?.recalledIncidentId} (94% Sim)
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {incident.memoryInformedReasoning?.firstHypothesis}
                    </p>
                    <div className="text-xs font-mono text-cyan-200/90 bg-cyan-950/60 p-2.5 rounded-lg border border-cyan-800/40">
                      <strong>Applied Reflected Mental Model:</strong><br />
                      "{incident.memoryInformedReasoning?.recalledReflectedRule}"
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-300 text-xs font-mono font-semibold">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>False Leads Avoided via Memory:</span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono">
                      {incident.memoryInformedReasoning?.avoidedFalseLead}
                    </p>
                    <div className="text-[11px] text-emerald-400 font-mono">
                      Saved 35+ minutes: Agent recognized the architectural symptom pattern across a completely different service (fraud vs payment)!
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="text-emerald-400 font-bold">Memory-Informed SRE Performance:</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        Time to Identify: <strong className="text-emerald-400">{incident.memoryInformedReasoning?.timeToIdentifyMinutes} minutes</strong>
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono space-y-1">
                      <div>• Steps taken to isolate: <strong className="text-emerald-400">1 step (Zero iteration overhead)</strong></div>
                      <div>• MTTR Reduction: <strong className="text-emerald-400">93% faster (42m down to 3m)</strong></div>
                      <div>• Proactive Resolution: <span className="text-cyan-300">{incident.memoryInformedReasoning?.proposedFix}</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Verified Outcome Banner */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-400">Post-Mitigation Status:</span>{' '}
                <span className="text-emerald-400 font-semibold">{incident.outcome}</span>
              </div>
            </div>
          </div>

          {/* Incident Symptoms Vector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Extracted Symptom Feature Vector (Biomimetic Ingest Payload)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {incident.symptoms.map((symptom, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800/80 text-xs font-mono text-slate-300 flex items-center space-x-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>{symptom}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Diagnostics & Real Terminal Logs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tab Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex space-x-2 text-xs font-mono">
                <button
                  onClick={() => setActiveReasoningTab('diagnostics')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeReasoningTab === 'diagnostics'
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Diagnostic Probes ({incident.diagnostics.length})
                </button>
                <button
                  onClick={() => setActiveReasoningTab('logs')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeReasoningTab === 'logs'
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Live Logs ({incident.logs.length})
                </button>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Interactive SRE Tools</span>
            </div>

            <div className="p-4">
              {activeReasoningTab === 'diagnostics' ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 font-mono mb-2">
                    Click any probe to execute diagnostic command and verify telemetry output:
                  </p>
                  {incident.diagnostics.map((diag) => (
                    <div
                      key={diag.id}
                      onClick={() => setSelectedDiagnostic(diag)}
                      className={`p-3 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                        selectedDiagnostic?.id === diag.id
                          ? 'bg-slate-800/90 border-cyan-500 shadow-md'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          {diag.name}
                        </span>
                        {diag.isHelpful ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            Key Signal
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            False Lead
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 bg-slate-950 p-1.5 rounded border border-slate-900 truncate">
                        $ {diag.command}
                      </div>
                    </div>
                  ))}

                  {/* Selected Diagnostic Output Drawer */}
                  {selectedDiagnostic && (
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-1.5">
                        <span className="text-cyan-400 font-bold">$ {selectedDiagnostic.command}</span>
                      </div>
                      <div className="text-slate-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 text-[11px] whitespace-pre-wrap leading-relaxed">
                        {selectedDiagnostic.output}
                      </div>
                      <div className={`p-2 rounded text-[11px] font-semibold ${
                        selectedDiagnostic.isHelpful
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                          : 'bg-rose-950/40 text-rose-300 border border-rose-800/40'
                      }`}>
                        {selectedDiagnostic.reveals}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Live Log Viewer */
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-2 max-h-[380px] overflow-y-auto">
                  {incident.logs.map((log, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px]">
                      <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                      <span className={`px-1 rounded text-[9px] font-bold shrink-0 ${
                        log.level === 'ERROR'
                          ? 'bg-rose-500/20 text-rose-400'
                          : log.level === 'WARN'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {log.level}
                      </span>
                      <span className="text-slate-400 shrink-0">[{log.service}]</span>
                      <span className="text-slate-300">{log.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Explainer Box for Judges */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-800/30 text-xs font-mono space-y-2">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Biomimetic Memory Loop Explained:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              When Incident 1 resolves, Hindsight performs <strong>RETAIN</strong> (structured episodic capture) and <strong>REFLECT</strong> (abstract rule synthesis). When Incident 2 occurs, <strong>RECALL</strong> matches the underlying socket starvation signature, transferring operational intelligence across decoupled services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
