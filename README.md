# 🧠 IncidentMind

### AI-Powered SRE Incident Response & Post-Mortem Learning Agent

IncidentMind is an AI-powered **Site Reliability Engineering (SRE) incident-response agent** that uses **Hindsight memory** to retain, recall, and reflect on previous incidents.

Instead of treating every production incident as a completely new problem, IncidentMind uses knowledge from previous incidents to improve the investigation of future incidents.

> **The important part isn't that the agent knows SRE.  
> It's that Incident 1 changes how it handles Incident 2.**

---

## 🚨 The Problem

Production incidents can have many possible causes.

When an application experiences high latency or errors, an SRE may need to investigate:

- Database performance
- Redis connection pools
- CPU utilization
- Network latency
- Application scaling
- Thread queues
- Connection timeouts
- Query performance

The challenge is not only identifying the root cause.

The bigger challenge is **learning from previous incidents and applying that knowledge to future incidents**.

Without persistent memory, an AI agent may repeatedly investigate similar problems from scratch.

IncidentMind addresses this by giving the agent a persistent operational memory.

---

# 💡 The Solution

IncidentMind follows a continuous learning loop:

```text
                 New Incident
                      │
                      ▼
              Recall Previous
                Experiences
                      │
                      ▼
               AI Investigation
                      │
                      ▼
             Root Cause Analysis
                      │
                      ▼
              Recommended Fix
                      │
                      ▼
              Incident Resolved
                      │
                      ▼
                  Retain
                      │
                      ▼
                  Reflect
                      │
                      ▼
          Reusable Mental Model
                      │
                      ▼
              Future Incident
                      │
                      └──────► Recall
```

The central memory workflow is:

**Retain → Reflect → Recall**

---

# 🧠 How Hindsight Is Used

Hindsight is the memory layer at the center of IncidentMind.

## 1. Retain

After an incident is resolved, IncidentMind retains useful information about the experience.

This can include:

- Incident symptoms
- Root cause
- Investigation path
- Resolution
- False leads
- Operational context

For example:

```text
Incident:
Payment API latency spike

Symptoms:
Low CPU
Very high P99 latency
Redis clients near maximum
Database thread pressure

Root Cause:
Redis connection pool starvation

Resolution:
Adjust connection-pool limits
Improve connection behavior
Recycle stale connections
```

---

## 2. Reflect

The retained experience can be transformed into a reusable operational mental model.

For example:

```text
Low CPU
+
Very High P99 Latency
+
Redis / DB Waiting
        ↓
Investigate Connection Pool Starvation
before:
- Autoscaling
- Query optimization
- Adding indexes
```

The important part is that the system does not only remember an incident ID.

It extracts a pattern that can potentially be reused for another service.

---

## 3. Recall

When a new incident occurs, IncidentMind recalls relevant previous experiences.

The recalled knowledge is then used as context during investigation.

This enables knowledge learned from one service to transfer to another service with a similar failure pattern.

---

# 🔥 Demonstration

## Incident 1 — Cold Start

**Incident:** `INC-8941`

**Service:** `payments-core-service`

The system experiences severe API latency.

### Example symptoms

```text
P99 Latency:       8420 ms
CPU:               28%
Redis Clients:     980 / 1000
DB Pool:           94%
Traffic:           4200 RPS
5xx Errors:        18.4%
```

Because the agent has no relevant previous memory, it investigates the incident from scratch.

The investigation eventually identifies:

**Redis connection pool starvation**

The mitigation involves adjusting connection-pool limits and connection behavior.

---

# 🧠 Hindsight Learning

After the first incident is resolved, the experience is retained in Hindsight.

The system can then derive a reusable operational mental model:

> When a distributed microservice shows very high P99 latency alongside low CPU utilization and Redis/database waiting, investigate connection pool exhaustion before assuming CPU, query, or autoscaling problems.

This knowledge is no longer limited to `payments-core-service`.

It can be recalled for future services.

---

# ⚡ Incident 2 — Recall & Transfer

**Incident:** `INC-9102`

**Service:** `fraud-detection-service`

A different service experiences another latency spike.

### Example symptoms

```text
P99 Latency:       6150 ms
CPU:               Low
Redis Latency:     Elevated
DB Thread Queue:   Elevated
```

Instead of starting from zero, IncidentMind recalls the previous incident.

```text
INC-9102
    │
    ▼
Hindsight Recall
    │
    ▼
INC-8941
    │
    ▼
Similar Failure Pattern
    │
    ▼
Connection Pool Starvation
    │
    ▼
Memory-Informed Investigation
```

The previous operational knowledge is transferred from one service to another.

---

# 📊 Before vs After

The project demonstration compares a cold-start investigation with a memory-informed investigation.

| | Cold Start | Memory-Informed |
|---|---|---|
| Incident | INC-8941 | INC-9102 |
| Previous Memory | None | INC-8941 |
| Investigation | Multiple rounds | Direct recall |
| False Leads | Present | Avoided in demo |
| Knowledge Transfer | No | Yes |
| P99 in Demo | 8420 → 48 ms | 6150 → 42 ms |

> **Note:** These performance figures represent the controlled project demonstration and should not be interpreted as production SRE measurements.

---

# 🏗️ Architecture

```text
                 ┌──────────────────────┐
                 │    SRE Cockpit UI    │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Incident Analysis  │
                 │       Engine         │
                 └──────────┬───────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
     ┌─────────────────┐        ┌─────────────────┐
     │    Hindsight    │        │   AI Reasoning  │
     │     Memory      │        │      Layer      │
     └────────┬────────┘        └────────┬────────┘
              │                          │
              └───────────┬──────────────┘
                          │
                          ▼
                ┌─────────────────────┐
                │ SRE Recommendation  │
                │ & Mitigation        │
                └──────────┬──────────┘
                           │
                           ▼
                    Retain Experience
```

---

# 🔄 Memory Flow

```text
New Incident
     │
     ▼
Recall Previous Experiences
     │
     ▼
AI Investigation
     │
     ▼
Root Cause & Mitigation
     │
     ▼
Incident Resolution
     │
     ▼
Retain Experience
     │
     ▼
Reflect into Mental Model
     │
     ▼
Future Incident
     │
     └──────────────► Recall
```

This creates a continuous learning loop.

---

# ✨ Key Features

- 🤖 AI-powered incident investigation
- 🧠 Persistent Hindsight memory
- 🔄 Retain → Reflect → Recall workflow
- 🔍 Similar incident recall
- 🧩 Cross-service knowledge transfer
- 🚨 False-lead awareness
- 📊 Before/after incident comparison
- 🖥️ Interactive SRE incident cockpit
- 📚 Operational mental-model visualization

---

# 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Application development |
| Vite | Development and build tooling |
| Hindsight | Persistent agent memory |
| LLM reasoning | Incident analysis |
| Node.js / npm | Development environment |
| Git / GitHub | Version control |
| Google AI Studio | AI-assisted project development |

---

# 📁 Project Structure

```text
IncidentMind1/
│
├── src/
│   └── Application source code
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Install:

- Node.js
- npm
- Git

---

## 1. Clone the repository

```bash
git clone https://github.com/Sushmitha1912/IncidentMind1.git
```

Then:

```bash
cd IncidentMind1
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Use the provided environment template:

```text
.env.example
```

Create your local environment configuration as required by the application.

### Important

Never commit API keys or other secrets to GitHub.

---

## 4. Start the application

```bash
npm run dev
```

The Vite development server will provide a local URL, typically:

```text
http://localhost:5173
```

Open the URL in your browser.

---

# 🎬 Recommended Demo Flow

The project can be demonstrated through the following sequence:

```text
1. Introduce IncidentMind
        ↓
2. Show Incident 1 — Cold Start
        ↓
3. Investigate the incident
        ↓
4. Resolve the incident
        ↓
5. Retain the experience
        ↓
6. Show Hindsight memory
        ↓
7. Show the reflected mental model
        ↓
8. Trigger Incident 2
        ↓
9. Recall Incident 1
        ↓
10. Apply the learned pattern
        ↓
11. Show Before vs After
```

The key story is:

**The first incident creates knowledge that changes the second investigation.**

---

# 🔐 Security

Do not commit:

- API keys
- Passwords
- Access tokens
- Private credentials
- Production secrets

Use environment variables for sensitive configuration.

The repository includes `.env.example` for environment configuration.

---

# ⚠️ Limitations

IncidentMind is currently a demonstration of a memory-powered AI SRE workflow.

The incidents and performance comparisons shown in the demonstration are controlled scenarios rather than measurements from a live production environment.

A production deployment would require additional engineering, including:

- Real observability integrations
- Historical incident data
- Production authentication
- Human approval for remediation actions
- Safety controls
- Evaluation against real incident-response metrics
- Integration with incident-management systems

---

# 🔮 Future Improvements

Potential future improvements include:

- Real-time observability integration
- Prometheus integration
- Grafana integration
- Automated post-mortem ingestion
- Slack integration
- Incident-management integration
- Human-in-the-loop remediation
- Larger historical incident datasets
- Cross-service failure-pattern detection
- Evaluation using real MTTR measurements

---

# 🎯 Why Hindsight?

The central idea behind IncidentMind is that **memory should influence future reasoning**.

Without persistent memory:

```text
Incident
   ↓
Reason
   ↓
Resolve
```

With Hindsight memory:

```text
Incident
   ↓
Recall
   ↓
Reason
   ↓
Resolve
   ↓
Retain
   ↓
Reflect
   ↓
Better Future Investigation
```

This makes memory part of the operational reasoning loop rather than simply a storage layer.

---

# 🌟 Core Idea

Incident response should not have to start from zero every time.

Previous incidents contain valuable operational knowledge.

IncidentMind explores how an AI SRE agent can use persistent memory to carry that knowledge forward.

The first incident teaches the system.

The second incident demonstrates whether that learning changes its behavior.

> **The important part isn't that the agent knows SRE.  
> It's that Incident 1 changes how it handles Incident 2.**

---

# 👩‍💻 Project

**IncidentMind**

AI-powered SRE incident response and post-mortem learning agent.

### GitHub

https://github.com/Sushmitha1912/IncidentMind1

---

## 📌 Project Status

This project is a functional demonstration of a memory-powered AI SRE workflow and can be extended toward production-grade incident-response systems.
