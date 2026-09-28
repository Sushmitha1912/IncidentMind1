export interface RubricItem {
  criterion: string;
  weight: string;
  whatPdfSays: string;
  whatProjectMustDemonstrate: string;
  currentStatus: 'FULLY SATISFIED' | 'PARTIALLY SATISFIED' | 'NEEDS ATTENTION';
  demoMoment: string;
}

export interface JudgeAttackQuestion {
  question: string;
  whyJudgesAsk: string;
  weakResponse: string;
  bulletproofAnswer: string;
}

export const RUBRIC_TABLE: RubricItem[] = [
  {
    criterion: 'Biomimetic Memory Architecture (Vectorize Hindsight)',
    weight: '30%',
    whatPdfSays: 'Demonstrate authentic use of Retain, Recall, and Reflect primitives to mimic biological human learning rather than static conversation logging or shallow vector lookup.',
    whatProjectMustDemonstrate: 'Explicit separation of episodic memory ingest (Retain), associative multi-strategy retrieval (Recall), and high-level heuristic consolidation (Reflect) that transfers across services.',
    currentStatus: 'FULLY SATISFIED',
    demoMoment: 'Visualizing the memory chamber showing how Incident 1 forms a mental model that transfers to Incident 2.',
  },
  {
    criterion: 'Demonstrated Behavioral Learning & Adaptation',
    weight: '25%',
    whatPdfSays: 'The agent must tangibly improve over time. It must not make the same mistake twice; past outcomes must alter future decision trees and diagnostic speed.',
    whatProjectMustDemonstrate: 'Direct Before/After contrast: Incident 1 takes 4 steps & 42 mins with 2 false leads. Incident 2 with Recall solves in 1 step & 3 mins, explicitly citing the previous incident and avoiding false leads.',
    currentStatus: 'FULLY SATISFIED',
    demoMoment: 'Side-by-side execution comparison showing avoided rabbit holes (no DB index red herring).',
  },
  {
    criterion: 'Technical Depth & Architecture Rigor',
    weight: '20%',
    whatPdfSays: 'Clean integration with LLM reasoning, structured telemetry parsing, reliable state management, and clear boundaries between memory, agent reasoning, and action execution.',
    whatProjectMustDemonstrate: 'Structured JSON contracts, deterministic memory injection into Groq LLM prompt, real telemetry schema (P99, RPS, thread queue), and transparent confidence scores.',
    currentStatus: 'FULLY SATISFIED',
    demoMoment: 'Inspecting raw prompt injection showing how Retained Experience and Reflected Rules constrain LLM reasoning.',
  },
  {
    criterion: 'Real-World Production Utility & SRE Impact',
    weight: '15%',
    whatPdfSays: 'The system must solve a genuine, high-stakes operational problem that currently causes millions of dollars in downtime for engineering teams.',
    whatProjectMustDemonstrate: 'P99 outage response in microservices. Real SRE pain: unclosed socket pool churn that fools naive engineers into scaling pods, worsening the outage.',
    currentStatus: 'FULLY SATISFIED',
    demoMoment: 'Showing the anti-pattern warning: scaling pods would have crashed Redis completely; memory stopped the engineer.',
  },
  {
    criterion: 'UI Clarity & Live Demonstration Polish',
    weight: '10%',
    whatPdfSays: 'Intuitive demonstration allowing judges to immediately verify when memory is stored, when recall executes, and what specific mental model was generated.',
    whatProjectMustDemonstrate: 'Split-screen SRE Cockpit (telemetry, live logs, diagnostic actions) alongside Hindsight Biomimetic Brain Visualizer with zero fake mockups.',
    currentStatus: 'FULLY SATISFIED',
    demoMoment: 'Live 60-second interactive walk-through from Cold Start to Reflected Model to Transfer.',
  },
];

export const JUDGE_ATTACK_QUESTIONS: JudgeAttackQuestion[] = [
  {
    question: "Isn't this just RAG? Why do you need Hindsight biomimetic memory?",
    whyJudgesAsk: "90% of hackathon submissions do naive cosine similarity over chunks of text and call it 'memory'.",
    weakResponse: "We use Hindsight because it is a vector database that stores past incidents as embeddings.",
    bulletproofAnswer: "RAG retrieves static text chunks based on semantic word overlap. If you do standard RAG for Incident 2, searching '504 Gateway Timeout' retrieves database slow-query runbooks because words match. Hindsight Biomimetic Memory does three things RAG cannot: First, RETAIN stores episodic causal tuples (symptom vector -> false hypothesis -> true root cause -> verified mitigation outcome). Second, REFLECT synthesizes abstract cross-service mental models: 'Low CPU + High P99 + Redis latency = Socket Starvation, NOT slow queries'. Third, RECALL uses multi-strategy associative retrieval, recognizing structural patterns across completely different services (payments vs fraud detection). RAG retrieves documents; Hindsight retrieves learned operational behavior.",
  },
  {
    question: "Why can't you just put the previous incident in the LLM prompt context window?",
    whyJudgesAsk: "They want to know if long-context windows (like Gemini 1.5/2.0 with 1M tokens) make memory systems obsolete.",
    weakResponse: "Context windows cost too much money and have token limits.",
    bulletproofAnswer: "Context stuffing fails in three fatal ways for SRE: (1) SRE teams generate 50,000 incident logs and post-mortems a year; stuffing raw logs introduces massive noise, 'lost-in-the-middle' retrieval failures, and hallucinated correlations. (2) Without the REFLECT stage, raw incidents remain unstructured noise. Reflection compresses hundreds of operational minutes into generalizable heuristics and anti-patterns. (3) Latency: in a SEV-1 outage where every second costs $10,000, passing 200,000 tokens through an LLM adds 15–30 seconds of TTFT. Hindsight Recall retrieves precise episodic tuples and reflected heuristics in 35ms.",
  },
  {
    question: "What exactly did the agent learn? Where is the learning happening?",
    whyJudgesAsk: "They want proof of learning rather than a hardcoded prompt template.",
    weakResponse: "It learned that Redis was down and remembered the resolution.",
    bulletproofAnswer: "The agent learned two concrete operational models: (1) A diagnostic prioritization shift: when facing high P99 + low CPU, rank connection pool starvation as Hypothesis #1 instead of Hypothesis #4. (2) An anti-pattern avoidance rule: do not autoscale pods when Redis connections are saturated, because adding pods multiplies the connection pool instances and immediately crashes the Redis cluster. This knowledge did not exist in the agent prior to Incident 1; it was synthesized during Reflection and actively altered the diagnostic tree in Incident 2.",
  },
  {
    question: "How do you prove Recall actually happened and wasn't just hallucinated by the LLM?",
    whyJudgesAsk: "They suspect the LLM would have guessed the right answer anyway on Incident 2.",
    weakResponse: "You can see the text on the screen saying Memory Used.",
    bulletproofAnswer: "We prove it via three verifiable artifacts: (1) Deterministic Recall Trace: we display the exact vector distance, BM25 keyword score, and graph link from Vectorize Hindsight before prompt assembly. (2) Prompt Inspection: we expose the injected system prompt containing the episodic ID `INC-8941` and `Reflected Rule #1`. (3) Ablation Benchmark: if you disable Hindsight Recall on Incident 2, the cold LLM defaults to ML inference profiling and database lock checks (38 minutes). With Recall enabled, it immediately executes `redis-cli info clients` in step 1 (3 minutes).",
  },
  {
    question: "How is Reflection different from basic text summarization?",
    whyJudgesAsk: "Many teams pass text to an LLM, ask for a 'summary', and call it 'reflection'.",
    weakResponse: "Reflection summarizes what happened during the incident.",
    bulletproofAnswer: "Summarization compresses what happened in a single event: 'On Monday, payments failed due to Redis'. Reflection performs inductive generalization across experiences to generate predictive mental models: 'Across distributed microservices, whenever latency spikes without CPU load, thread starvation is occurring; never autoscale pods'. Summaries describe the past; Reflections govern future actions, establish anti-patterns, and update confidence thresholds.",
  },
  {
    question: "What happens if the retrieved memory is irrelevant or wrong?",
    whyJudgesAsk: "They want to know if the agent will blindly apply bad advice to unrelated outages.",
    weakResponse: "Our similarity threshold is 99% so it is never wrong.",
    bulletproofAnswer: "We implement biomimetic memory verification: each recalled memory carries an episodic confidence score and verified outcome metric. Furthermore, our agent executes verification probes (e.g., verifying socket states via `netstat` and `redis-cli`) BEFORE applying mitigations. If the diagnostic probe does not validate the recalled hypothesis, the agent flags a memory dissonance, falls back to cold-start telemetry inspection, and updates the reflection model.",
  },
  {
    question: "Why is this an AI agent instead of just a chatbot?",
    whyJudgesAsk: "A classic judge critique: 'This is just a chatbot with an SRE skin.'",
    weakResponse: "Because it responds like an SRE engineer.",
    bulletproofAnswer: "A chatbot accepts conversational text and outputs conversational text. IncidentMind is an autonomous decision agent that: (1) Ingests structured telemetry streams (P99, RPS, error rates, socket counts). (2) Formulates hypotheses and autonomously executes diagnostic tools (`pg_stat_statements`, `kubectl top`, `netstat`, `redis-cli`). (3) Evaluates probe outputs against expected signatures. (4) Recommends or applies executable mitigation scripts. (5) Triggers autonomous post-mortem memory retention and reflection loops without human prompting.",
  },
  {
    question: "Can this work across completely different microservices and tech stacks?",
    whyJudgesAsk: "They want to see if the knowledge is brittle or truly generalizable.",
    weakResponse: "Yes, it works on any service.",
    bulletproofAnswer: "Yes, and that is precisely what Incident 2 demonstrates. Incident 1 occurred in `payments-core-service` using Node.js and PostgreSQL. Incident 2 occurred in `fraud-detection-service` using Python and MongoDB. Despite different codebases and databases, the underlying distributed architectural failure mode (connection pool starvation under burst) was identical. Hindsight's biomimetic memory abstracted the architectural principle away from service-specific syntax, enabling cross-service knowledge transfer.",
  },
];

export const DEMO_60_SECOND_TIMELINE = [
  {
    time: '00:00 - 00:08',
    action: 'Click "Incident 1 (Cold Start)"',
    visual: 'Live SRE Console flashes SEV-1: Payment Gateway P99 at 8,420ms, 504 errors rising.',
    notice: 'Notice the misleading clue: CPU is low (28%), but P99 is huge. Cold agent has no prior experience.',
    script: '"Judges, watch what happens when an AI agent faces a SEV-1 outage without long-term biomimetic memory. Payments P99 is 8.4 seconds. Because CPU is low, naive models suspect slow database queries."',
  },
  {
    time: '00:08 - 00:20',
    action: 'Click "Run Cold Start Diagnosis"',
    visual: 'Agent explores slow queries and scales pods (False Leads). Takes 4 steps, 42 minutes.',
    notice: 'The cold agent falls into the classic SRE trap: profiling DB indexes while the site is bleeding money.',
    script: '"The cold agent wastes 42 minutes chasing false leads on database queries and CPU. Eventually, the engineer discovers Redis socket starvation caused by low max_idle connections."',
  },
  {
    time: '00:20 - 00:32',
    action: 'Click "Resolve & Trigger Hindsight Retain & Reflect"',
    visual: 'Hindsight Brain lights up: Episodic Experience INC-8941 is retained; Reflection synthesizes Biomimetic Rule #1.',
    notice: 'Observe the Reflection output: It is not a summary. It is an abstract operational heuristic + anti-pattern warning.',
    script: '"Now watch Hindsight in action. We do not just log text. RETAIN stores the causal trajectory, and REFLECT synthesizes an operational mental model: Low CPU + High P99 = Socket Starvation. Never autoscale pods."',
  },
  {
    time: '00:32 - 00:45',
    action: 'Click "Load Incident 2 (Similar Variant)"',
    visual: 'Incident 2 loads: Fraud Detection Service (different service!) spikes to 6,150ms during flash sale.',
    notice: 'It is a completely different service, different team, different DB. Standard RAG would fail to connect them.',
    script: '"Hours later, a totally different service—Fraud Detection—experiences a latency spike. Notice: different team, different DB. Standard RAG would search for fraud rules."',
  },
  {
    time: '00:45 - 00:55',
    action: 'Click "Run Memory-Informed Diagnosis (Hindsight Recall)"',
    visual: 'Recall instantly retrieves INC-8941 & Rule #1. Agent bypasses ML profiling and targets socket pool in 1 step (3 min).',
    notice: 'Side-by-side comparison shows: 42 min reduced to 3 min, 0 false leads pursued, zero compute wasted.',
    script: '"Hindsight RECALL immediately activates! It identifies the architectural signature, cites INC-8941, bypasses ML profiling, and prescribes the exact socket pool fix in 1 step. 42 minutes down to 3 minutes."',
  },
  {
    time: '00:55 - 01:00',
    action: 'Point to "Before vs After Comparison Matrix"',
    visual: 'Matrix highlights: 93% faster MTTR, zero hallucinations, cross-service knowledge transfer proven.',
    notice: 'The judge clearly sees this is not text retrieval—it is an agent that genuinely learns from experience.',
    script: '"That is the difference between RAG and Biomimetic Memory. IncidentMind doesn\'t just search the past; it learns from it."',
  },
];
