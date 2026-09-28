import React from 'react';
import { Activity, Brain, ShieldAlert, Cpu, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ConsoleHeaderProps {
  activeTab: 'cockpit' | 'brain' | 'comparison' | 'dossier' | 'code';
  setActiveTab: (tab: 'cockpit' | 'brain' | 'comparison' | 'dossier' | 'code') => void;
  activeIncidentId: string;
  onSelectIncident: (id: string) => void;
  hasRetained: boolean;
  onResetMemory: () => void;
}

export const ConsoleHeader: React.FC<ConsoleHeaderProps> = ({
  activeTab,
  setActiveTab,
  activeIncidentId,
  onSelectIncident,
  hasRetained,
  onResetMemory,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-rose-500 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-lg font-bold tracking-tight text-white">
                  INCIDENT<span className="text-cyan-400">MIND</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
                  Biomimetic SRE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Hack With Hyderabad 3.0
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Autonomous SRE Incident Response & Post-Mortem Learning via Vectorize Hindsight
              </p>
            </div>
          </div>

          {/* Quick Scenario Selector */}
          <div className="flex items-center space-x-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onSelectIncident('INC-8941')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center space-x-1.5 ${
                activeIncidentId === 'INC-8941'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Incident 1: Cold Start</span>
            </button>
            <button
              onClick={() => onSelectIncident('INC-9102')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center space-x-1.5 ${
                activeIncidentId === 'INC-9102'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Incident 2: Recall & Transfer</span>
              {hasRetained && (
                <span className="w-2 h-2 rounded-full bg-cyan-400" title="Memory Armed"></span>
              )}
            </button>
            <button
              onClick={onResetMemory}
              title="Reset Simulated Memory"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* System Health Indicators */}
          <div className="hidden lg:flex items-center space-x-3 text-xs font-mono">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Groq Llama-3.3 70B</span>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hindsight: {hasRetained ? '1 Exp, 1 Model' : 'Cold Start'}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60 text-xs font-mono">
          <button
            onClick={() => setActiveTab('cockpit')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'cockpit'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>1. SRE Incident Cockpit</span>
          </button>
          <button
            onClick={() => setActiveTab('brain')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'brain'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>2. Hindsight Biomimetic Brain</span>
            {hasRetained && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>3. Before vs After Proof Matrix</span>
          </button>
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'dossier'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>4. Master Hackathon Strategy & Judge Dossier</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-2 whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5. Technical Architecture & Python Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
