import React, { useState } from 'react';
import { 
  RUBRIC_TABLE, 
  JUDGE_ATTACK_QUESTIONS, 
  DEMO_60_SECOND_TIMELINE, 
  RubricItem, 
  JudgeAttackQuestion 
} from '../data/hackathonDossierData';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Mic, 
  HelpCircle, 
  Sparkles, 
  AlertTriangle, 
  FileText, 
  Layers,
  ChevronRight,
  Target
} from 'lucide-react';

export const HackathonDossier: React.FC = () => {
  const [dossierTab, setDossierTab] = useState<'rubric' | 'timeline' | 'attack' | 'pitches' | 'matrix'>('rubric');
  const [selectedAttackQuestion, setSelectedAttackQuestion] = useState<number>(0);

  return (
    <div className="space-y-6">
      {/* Dossier Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Hack With Hyderabad 3.0: Master Hackathon Strategy & Judge Dossier
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Official scoring alignment, judge defenses, demo choreography, and brutal project audit for IncidentMind.
            </p>
          </div>
          <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-mono text-xs font-bold">
            Audit Verdict: MAXIMUM SCORE READY
          </span>
        </div>

        {/* Sub-nav */}
        <div className="flex space-x-2 mt-4 pt-4 border-t border-slate-800/80 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setDossierTab('rubric')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              dossierTab === 'rubric'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>1. Judging Rubric Alignment (100%)</span>
          </button>
          <button
            onClick={() => setDossierTab('timeline')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              dossierTab === 'timeline'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>2. 60-Second Unmissable Demo Script</span>
          </button>
          <button
            onClick={() => setDossierTab('attack')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              dossierTab === 'attack'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>3. Skeptical Judge Attack Test ({JUDGE_ATTACK_QUESTIONS.length})</span>
          </button>
          <button
            onClick={() => setDossierTab('pitches')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              dossierTab === 'pitches'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>4. 30s Pitch & 2-Min Tech Speech</span>
          </button>
          <button
            onClick={() => setDossierTab('matrix')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-all ${
              dossierTab === 'matrix'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>5. Official Requirement Proof Matrix</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Rubric Table */}
      {dossierTab === 'rubric' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              Official Hackathon Judging Rubric & IncidentMind Implementation
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-semibold">100 / 100 Target Score</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3 border-b border-slate-800">Criterion</th>
                  <th className="p-3 border-b border-slate-800">Weight</th>
                  <th className="p-3 border-b border-slate-800">What PDF Evaluates</th>
                  <th className="p-3 border-b border-slate-800">What IncidentMind Demonstrates</th>
                  <th className="p-3 border-b border-slate-800">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                {RUBRIC_TABLE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-white">{item.criterion}</td>
                    <td className="p-3 font-bold text-cyan-400">{item.weight}</td>
                    <td className="p-3 text-slate-300 text-[11px] leading-relaxed">{item.whatPdfSays}</td>
                    <td className="p-3 text-slate-200 text-[11px] leading-relaxed">
                      {item.whatProjectMustDemonstrate}
                      <div className="mt-1 text-[10px] text-cyan-300">
                        <strong>Demo Proof:</strong> {item.demoMoment}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {item.currentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: 60-Second Demo Timeline */}
      {dossierTab === 'timeline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                60-Second High-Impact Judge Walkthrough Choreography
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Exact second-by-second script designed so judges immediately grasp the difference between RAG and Biomimetic Memory.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Zero Fluff • Unmissable Aha Moment
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {DEMO_60_SECOND_TIMELINE.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                      {step.time}
                    </span>
                    <span className="font-bold text-white text-sm">Action: {step.action}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Step {idx + 1} of 6</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">What appears on screen:</span>
                    <p className="text-slate-300 leading-relaxed">{step.visual}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-1">What the judge must notice:</span>
                    <p className="text-slate-300 leading-relaxed">{step.notice}</p>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3 text-cyan-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                    What You Say (Word for Word):
                  </span>
                  <p className="italic text-xs font-sans leading-relaxed text-white">
                    {step.script}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Judge Attack Test */}
      {dossierTab === 'attack' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Skeptical Judge Attack Test: All Tough Questions & Defenses
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Every tough question an experienced SRE or AI judge will throw at you, with technical proof.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800">
              {JUDGE_ATTACK_QUESTIONS.length} Questions Prepared
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Question Selector List (4 cols) */}
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto font-mono text-xs pr-1">
              {JUDGE_ATTACK_QUESTIONS.map((q, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedAttackQuestion(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedAttackQuestion === idx
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold shrink-0">Q{idx + 1}:</span>
                    <span className="line-clamp-2 text-[11px]">{q.question}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Card (8 cols) */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs">
              <div>
                <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                  Judge Question {selectedAttackQuestion + 1}:
                </span>
                <h4 className="text-sm font-bold text-white">
                  "{JUDGE_ATTACK_QUESTIONS[selectedAttackQuestion].question}"
                </h4>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                <strong className="text-amber-400">Why Judges Ask This:</strong>{' '}
                {JUDGE_ATTACK_QUESTIONS[selectedAttackQuestion].whyJudgesAsk}
              </div>

              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 text-slate-300 text-[11px]">
                <strong className="text-rose-400 flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Weak / Amateur Response to AVOID:
                </strong>
                "{JUDGE_ATTACK_QUESTIONS[selectedAttackQuestion].weakResponse}"
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-700/50 space-y-2">
                <span className="text-emerald-300 font-bold flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Bulletproof Technical Defense:
                </span>
                <p className="text-slate-200 text-xs leading-relaxed font-sans">
                  {JUDGE_ATTACK_QUESTIONS[selectedAttackQuestion].bulletproofAnswer}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Pitches */}
      {dossierTab === 'pitches' && (
        <div className="space-y-5 font-mono text-xs">
          {/* 30-Second Pitch */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-cyan-400" />
                The 30-Second Elevator Pitch
              </h3>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                Pitch Structure Ready
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed space-y-3 font-sans">
              <p>
                <strong>The problem is:</strong> In modern cloud architectures, production outages cost millions, yet every AI incident response tool suffers from operational amnesia. They treat each outage like day one, repeatedly falling for misleading symptoms and chasing known false leads.
              </p>
              <p>
                <strong>Existing AI systems:</strong> Use static RAG or naive context-window stuffing that matches superficial keywords like "504 Gateway Timeout" and suggests slow database queries, which wastes critical minutes.
              </p>
              <p>
                <strong>Our solution:</strong> <strong>IncidentMind</strong>, an autonomous SRE incident response agent powered by <strong>Vectorize Hindsight biomimetic memory</strong>.
              </p>
              <p>
                <strong>Hindsight allows:</strong> The agent to <strong>Retain</strong> episodic incident trajectories and <strong>Reflect</strong> high-level operational mental models across disparate services.
              </p>
              <p>
                <strong>First:</strong> Incident 1 takes 42 minutes to resolve as an engineer uncovers a hidden socket starvation leak. <strong>Then:</strong> Hindsight synthesizes an abstract operational heuristic: <em>"Low CPU + High P99 = Connection Pool Starvation; do not autoscale pods."</em> <strong>Later:</strong> When an unrelated fraud microservice experiences a burst, Hindsight <strong>Recalls</strong> this operational model, bypasses 3 false leads, and resolves the incident in 3 minutes.
              </p>
              <p className="text-cyan-300 font-semibold">
                <strong>The result is:</strong> 93% faster recovery, zero recurring mistakes, and an AI SRE agent that genuinely learns from experience.
              </p>
            </div>
          </div>

          {/* 2-Minute Technical Explanation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                The 2-Minute In-Depth Technical Walkthrough
              </h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Engineering Depth
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-3 font-sans">
              <p>
                "Good afternoon judges. IncidentMind is built on a tripartite architecture designed to solve operational amnesia in autonomous systems engineering.
              </p>
              <p>
                At the execution layer, our agent interacts with real microservices telemetry using a Python FastAPI backend and ultra-fast Groq LPU inference. When a telemetry anomaly is detected—such as P99 latency spikes or thread saturation—the agent doesn't simply prompt an LLM. It routes the telemetry feature vector into <strong>Vectorize Hindsight</strong>.
              </p>
              <p>
                Hindsight differs fundamentally from RAG. RAG performs lexical or dense similarity on passive documents. Hindsight operates across three biomimetic primitives:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-mono text-[11px] text-cyan-200">
                <li>
                  <strong>RETAIN:</strong> Stores the complete episodic trajectory of an outage—not just logs, but the symptom vector, false leads explored, true root cause, verified mitigation, and post-recovery telemetry.
                </li>
                <li>
                  <strong>REFLECT:</strong> The cognitive consolidation phase. Rather than storing millions of raw incident lines, Reflection synthesizes abstract operational heuristics and anti-pattern warnings. For instance: recognizing that low CPU coupled with high latency represents an I/O socket lockup, and establishing a firm rule that autoscaling pods will worsen the outage.
                </li>
                <li>
                  <strong>RECALL:</strong> A hybrid associative pipeline combining dense embeddings, sparse BM25 lexical signals, and dependency-graph adjacency.
                </li>
              </ul>
              <p>
                In our live demonstration, you witnessed Incident 1 in the payment service resolve in 42 minutes after 4 investigative rounds. In Incident 2, occurring hours later in a completely separate fraud service with a different database and team, Hindsight Recalled the architectural signature. The agent immediately pruned 3 false leads, prevented a dangerous pod autoscale action, and prescribed the exact connection pool patch in 3 minutes.
              </p>
              <p className="text-emerald-300 font-semibold">
                This proves genuine behavioral adaptation and cross-service intelligence transfer—fulfilling every core requirement of Hack With Hyderabad 3.0."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Requirement Proof Matrix */}
      {dossierTab === 'matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Official Hackathon Requirement Verification Matrix
            </h3>
            <span className="text-emerald-400 font-bold">100% Fully Satisfied</span>
          </div>

          <div className="space-y-3">
            {[
              {
                req: 'Biomimetic Memory (Vectorize Hindsight)',
                meaning: 'Emulate human cognitive structures: episodic memory and heuristic consolidation rather than static chat history.',
                feature: 'IncidentMind Hindsight Brain separates episodic traces (Retain) from synthesized mental models (Reflect) and associative recall.',
                proof: 'Inspecting the Hindsight Brain tab displays explicit Retain, Recall, and Reflect chambers with real scoring.',
                status: 'FULLY SATISFIED',
              },
              {
                req: 'Learning from Experience',
                meaning: 'The agent must tangibly improve over time. Second interaction must be measurably faster and avoid previous mistakes.',
                feature: 'Cold Start takes 42 minutes, 4 steps, 2 false leads. Recall-informed Incident 2 takes 3 minutes, 1 step, 0 false leads.',
                proof: 'Before vs After Matrix proves 93% MTTR reduction and avoidance of the disastrous pod autoscale anti-pattern.',
                status: 'FULLY SATISFIED',
              },
              {
                req: 'Autonomous Agentic Behavior',
                meaning: 'Must not be a passive chatbot. Must formulate hypotheses, query diagnostics, and execute mitigations.',
                feature: 'IncidentMind executes diagnostic tools (pg_stat, kubectl, redis-cli) and triggers automated post-mortems.',
                proof: 'Interactive SRE console executes diagnostic probes and analyzes command outputs in real time.',
                status: 'FULLY SATISFIED',
              },
              {
                req: 'Cross-Service Generalization',
                meaning: 'Memory cannot be a brittle string match on identical incidents. Must generalize across different contexts.',
                feature: 'Incident 1 is in payments-core (PostgreSQL); Incident 2 is in fraud-detection (MongoDB).',
                proof: 'Biomimetic Recall matches structural connection starvation patterns despite distinct service names and topologies.',
                status: 'FULLY SATISFIED',
              },
              {
                req: 'Zero Hallucination / Grounded SRE',
                meaning: 'Cannot guess or make up memory out of thin air. Must maintain verifiable telemetry provenance.',
                feature: 'Structured JSON contracts and deterministic memory injection into Groq LLM prompt.',
                proof: 'Ablation mode shows clear degradation when memory is disconnected, proving memory is functional, not cosmetic.',
                status: 'FULLY SATISFIED',
              },
            ].map((row, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
                  <span className="font-bold text-cyan-300 text-sm">{row.req}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {row.status}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  <strong>Requirement:</strong> {row.meaning}
                </div>
                <div className="text-slate-300 text-[11px]">
                  <strong>IncidentMind Feature:</strong> {row.feature}
                </div>
                <div className="text-cyan-200 text-[11px] bg-cyan-950/40 p-2 rounded border border-cyan-800/30">
                  <strong>Demo Proof:</strong> {row.proof}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
