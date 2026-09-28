import React, { useState } from 'react';
import { ConsoleHeader } from './components/ConsoleHeader';
import { IncidentConsole } from './components/IncidentConsole';
import { HindsightBrain } from './components/HindsightBrain';
import { BeforeAfterMatrix } from './components/BeforeAfterMatrix';
import { HackathonDossier } from './components/HackathonDossier';
import { TechnicalCodeViewer } from './components/TechnicalCodeViewer';
import { 
  INCIDENT_1, 
  INCIDENT_2, 
  INITIAL_RETAINED_EXPERIENCES, 
  INITIAL_REFLECTED_INSIGHTS 
} from './data/incidentsData';
import { RetainedExperience, ReflectedInsight } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cockpit' | 'brain' | 'comparison' | 'dossier' | 'code'>('cockpit');
  const [activeIncidentId, setActiveIncidentId] = useState<string>('INC-8941');
  const [hasRetained, setHasRetained] = useState<boolean>(true);
  const [experiences, setExperiences] = useState<RetainedExperience[]>(INITIAL_RETAINED_EXPERIENCES);
  const [reflections, setReflections] = useState<ReflectedInsight[]>(INITIAL_REFLECTED_INSIGHTS);

  const currentIncident = activeIncidentId === 'INC-8941' ? INCIDENT_1 : INCIDENT_2;

  const handleCommitResolutionAndRetain = () => {
    setHasRetained(true);
    // If on Incident 1, prompt to move to Incident 2 to witness recall!
    if (activeIncidentId === 'INC-8941') {
      setTimeout(() => {
        setActiveIncidentId('INC-9102');
      }, 1200);
    }
  };

  const handleResetMemory = () => {
    setHasRetained(false);
    setActiveIncidentId('INC-8941');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation & Status Bar */}
      <ConsoleHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeIncidentId={activeIncidentId}
        onSelectIncident={(id) => setActiveIncidentId(id)}
        hasRetained={hasRetained}
        onResetMemory={handleResetMemory}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'cockpit' && (
          <IncidentConsole
            incident={currentIncident}
            isMemoryEnhanced={hasRetained && activeIncidentId === 'INC-9102'}
            onCommitResolutionAndRetain={handleCommitResolutionAndRetain}
            hasRetained={hasRetained}
          />
        )}

        {activeTab === 'brain' && (
          <HindsightBrain
            experiences={experiences}
            reflections={reflections}
            activeIncidentId={activeIncidentId}
          />
        )}

        {activeTab === 'comparison' && (
          <BeforeAfterMatrix />
        )}

        {activeTab === 'dossier' && (
          <HackathonDossier />
        )}

        {activeTab === 'code' && (
          <TechnicalCodeViewer />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800/80 py-4 text-center font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>IncidentMind: AI SRE Incident Response & Post-Mortem Biomimetic Memory Agent</span>
          </div>
          <span>Hack With Hyderabad 3.0 • Vectorize Hindsight (Retain, Recall, Reflect)</span>
        </div>
      </footer>
    </div>
  );
}
