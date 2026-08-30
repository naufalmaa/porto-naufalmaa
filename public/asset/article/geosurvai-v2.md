# GeoSurvai: A New Standard for Oil & Gas Exploration Monitoring

[Insert Image: GeoSurvai Hero — Dashboard Overview with Map and Analytics]

*Disclaimer: All data, screenshots, and project information shown in this article are anonymized or use dummy data for demonstration purposes.*

---

## The Problem

Imagine you're a regulator at SKK Migas Exploration Division — the national body overseeing upstream oil & gas exploration in Indonesia. Your job is to monitor dozens of exploration projects happening simultaneously: seismic surveys stretching across Sumatra, Kalimantan, Papua, and everywhere in between. Each project involves a different contractor, a different budget, a different timeline.

Now imagine how that oversight actually worked before GeoSurvai.

**Every update came through email.** A contractor in Kalimantan sends a progress report as a PDF attachment. Another contractor in Papua sends a budget revision in an Excel spreadsheet. A third emails a permit status update in the body of an email — no attachment, just text.

**Every comparison required manual work.** Want to know how much money has been spent across all active seismic projects this year? Open each email, find the budget file, copy the numbers into a master spreadsheet, and calculate. Want to know which projects are behind schedule? Same process — but now with dates.

**Every cycle repeated itself.** Weekly reporting meant the same manual aggregation, every single week. The same copy-paste. The same formulas. The same risk of human error. For a division managing billions of rupiah in exploration investments, this repetition wasn't just tedious — it was a real cost.

The pain had three dimensions:

- **Time** — Hours lost every week to manual data gathering and reporting that could have been spent on analysis and decision-making.
- **Money** — Delayed cost visibility meant budget overruns were discovered too late. When you can't see spending in real time, you can't intervene in time.
- **Accuracy** — Scattered data across emails and spreadsheets meant no single source of truth. Different people had different numbers. Reconciliation was a project in itself.

This wasn't a technology problem at its core. It was a **workflow problem** — the right information existed, but the way it moved between people made it slow, fragile, and exhausting.

When I first sat down with the stakeholders at SKK Migas to map out their processes, this became clear within the first few sessions. The information was there. The system to hold it together wasn't.

---

## The Idea

The design philosophy was straightforward:

> What if contractors could submit their data directly into a system — and regulators could see the results instantly, without waiting for emails?

Not just a database. Not just a dashboard. But a **complete workflow** — from data submission through monitoring, analysis, reporting, and institutional knowledge — all in one place.

Three principles guided the product design I shaped for this project:

**Centralize.** When project budget, timeline, permits, and geospatial data live in the same system, patterns emerge. A delayed permit affects the schedule. The schedule affects the budget. The budget feeds the dashboard. When these connections are visible, better decisions follow.

**Automate the boring parts.** If a weekly report can be generated from data that's already in the system, no human should have to build it by hand. If a cost comparison can be computed on the fly, no one should be copying numbers into a spreadsheet.

**Adapt to them, not the other way around.** We didn't ask SKK Migas to change how they think about exploration management. I spent time studying their existing processes — the forms they used, the categories they cared about, the language they spoke — and designed the system around their world.

---

## How It Works

Here's the journey, simplified:

```
Contractor fills project data     ──▶  Data lands in the system
        │                                         │
        ▼                                         ▼
No more email attachments         ──▶  Dashboard updates in real time
                                                  │
                                                  ▼
                                  Stakeholder monitors progress, cost, timeline
                                                  │
                                                  ▼
                                  System auto-generates weekly reports
                                                  │
                                                  ▼
                                  AI assistant answers quick questions
                                                  │
                                                  ▼
                                  Everyone saves hours — every week
```

**Step 1: Contractors submit data through smart forms.** Instead of sending emails with attachments, contractors log into GeoSurvai and fill in structured forms — project details, budget figures, progress updates, and uploaded documents. The data is validated on entry, so no more chasing down missing fields.

**Step 2: Dashboards update in real time.** The moment a contractor submits data, it appears on the stakeholder's monitoring dashboard. Budget vs. actual. Plan vs. progress. All filterable by year, region, contractor, and project type.

**Step 3: Stakeholders monitor without asking.** No more "can you send me the latest numbers?" emails. The numbers are already there — visualized on maps, charts, and timelines. Stakeholders can drill down from a national overview to a single project in two clicks.

**Step 4: Reports generate themselves.** Weekly status reports are automated. The system pulls the latest data, formats it, and delivers it — saving hours of manual compilation every single week.

**Step 5: AI answers the quick questions.** "How many seismic surveys were completed in Sumatra this year?" Instead of querying a database or asking a colleague, stakeholders ask Zara — the AI assistant — and get a data-backed answer in seconds.

This workflow didn't just digitize the old process. It **eliminated the repetitive parts** and gave everyone more time for the work that actually matters: analysis, strategy, and decision-making.

---

## Key Features

### Live Exploration Map

[Insert Image: Interactive Map — Survey Coverage with WK Boundaries and Activity Points]

**See every exploration project on a map of Indonesia — click any point to drill into the details.**

I designed the map to render working area boundaries and individual survey activity points simultaneously. Each marker is clickable: it shows the project name, survey type, operator, dates, and a direct link to the full project page. Users can toggle layers on and off — survey types, maritime boundaries, study points, infrastructure — to build exactly the view they need.

For geoscientists, there's an additional layer: a parameter-driven bubble map where each survey location is sized and colored by a selected seismic parameter (receiver spacing, fold coverage, cost per km², and others). Switch parameters from a dropdown and the map re-renders instantly — giving spatial intuition about acquisition quality across basins.

---

### Project Dashboard

[Insert Image: Survey Project Detail Page — Summary, Gantt Chart, and Progress Monitoring]

**One page per project. Budget, timeline, permits, progress — everything you need to know, in one place.**

Each exploration project has a dedicated detail page that brings together its entire lifecycle: core identity (project name, working area, operator, year), work program plans, realization data, technical parameters, permit readiness checklists, resource information, and a Gantt-based progress view.

The Gantt chart shows plan vs. actual timelines at the task level. Authorized users can edit dates and progress inline. Historical snapshots let users compare how the plan has evolved over time — critical for auditing whether schedule changes were justified.

This was where product design mattered most. I had to organize deeply complex, multi-dimensional data into a layout that feels simple. A regulator looking at 40 active projects shouldn't need training to understand any single one.

---

### Contractor Portal

[Insert Image: Contractor Form Interface — Data Entry and Document Upload]

**Contractors fill their data directly in the app — no more email chains.**

This was one of the most impactful features from a workflow perspective. Before GeoSurvai, contractors sent project updates via email — PDFs, spreadsheets, free-text descriptions. The regulator had to collect, organize, and reconcile all of it manually.

Now, each contractor has a dedicated portal showing only their assigned projects. They fill structured forms with validated fields — project progress, budget figures, technical parameters, and uploaded documents (reports, permits, shapefiles). The data is immediately available on the stakeholder's dashboard.

I designed the interface to be intentionally focused. Contractors see what they need to submit, not the full analytical dashboard. The role-based access controls I built ensure each contractor only sees their own working areas — enforced at both the interface and the API level.

---

### Cost Intelligence

[Insert Image: AFE Analytics — Benchmark Charts and Cost Composition]

**Compare costs across contractors, regions, and years — instantly.**

The AFE (Authorization for Expenditure) analytics module tracks exploration costs independently from operational data. It lets analysts answer questions that used to require hours of spreadsheet work:

- What's the average cost per kilometer for 3D offshore surveys in Eastern Indonesia?
- How does this year's Kalimantan seismic cost compare to previous years?
- Which cost component — acquisition, mobilization, or support services — is driving the total?

The dashboard breaks costs into components, supports multiple aggregation methods (average, min, max, sum), and is filterable by year, operator, region, and activity type. A **Budget Guidance** feature shows reference cost ranges based on historical data — giving procurement teams a data-driven anchor when evaluating new contractor bids.

This module turns raw cost data into **competitive intelligence** — something that simply wasn't possible when AFE data lived in scattered spreadsheets.

---

### Study Tracker

[Insert Image: Study Dashboard — Plan vs. Actual Cumulative S-Curves]

**Track technical studies alongside field surveys, all linked through a shared reference system.**

Exploration isn't just about field surveys. Technical studies — geological and geophysical analyses, lab work, seismic reprocessing — run in parallel and have their own timelines, budgets, and deliverables.

The Study dashboard displays cumulative S-curves of plan vs. actual completion. Each study record stores its type, working area, operator, budget, actual cost, dates, and software deliverables.

Connected to this is the SDC (Static Data Collection) module — a layer that tracks reserve estimates per working area: recoverable oil, gas, condensate, and geological confidence factors. Users can filter by resource magnitude to quickly zoom in on high-impact prospects without scrolling through hundreds of records.

A key design decision I made: surveys and studies are separate domains with different workflows, but they share the same working area reference system. A survey and its associated study are always linked — so the regulator gets a complete picture.

---

### Exploration Archive

[Insert Image: Exploration Catalog — Grid View with Thumbnails and Document Links]

**A searchable library of every completed exploration project.**

The Exploration Catalog is the institutional memory of the division. Unlike the operational dashboards — which track what's happening now — the catalog preserves what's already been done.

Each entry renders as a card in a responsive grid: thumbnail, activity type, year, working area, operator, and key parameters. Click through to access the full dataset and any attached documents — technical reports, survey parameters, shapefiles.

Access is layered: regular users can browse freely, contractors see only their authorized areas, and admins can edit and validate entries. The catalog is meant to be a trusted reference — a place where the knowledge a team builds about a working area doesn't disappear when people move on.

---

### Seismic Parameter Explorer

[Insert Image: Annual Seismic Map — Parameter Bubble Map with Color Scale]

**Visualize acquisition quality trends across years and basins.**

This is a dedicated analytical tool for geoscientists. Users select a seismic parameter — receiver spacing, shot spacing, fold coverage, charge size, cost per km² — choose one or more years, and optionally set a value range. The map renders every survey location as a bubble, sized by magnitude and colored from red (low) to green (high).

The result: a geoscientist can immediately see whether a particular basin has consistently used tight or loose receiver spacing, or whether costs in a region have been trending up or down over the past five years.

Behind the scenes, I built a dedicated data pipeline that computes derived parameters, applies confidentiality filters (current-year AFE costs are anonymized to prevent competitive disclosure), and returns enriched point data ready for visualization.

---

### Document Hub

**Meeting notes, publications, tutorials — all organized and accessible.**

Beyond operational data, GeoSurvai includes a lightweight document management layer:

- **Meeting Minutes** — Structured records linked to specific projects, with participant lists, agenda items, decisions, and attached documents.
- **Publications** — Technical papers, reports, and presentations shared across the organization.
- **Tutorials** — Versioned, contextual onboarding guides built directly into the platform. In a domain as specialized as upstream geophysics, generic help pages don't cut it.

No more digging through email threads to find what was decided in last month's meeting. It's already here.

---

### Auto-Reports

[Insert Image: Automated Weekly Report Output]

**Weekly status reports generated automatically — no more manual spreadsheets.**

This feature alone saves hours every week. The system pulls the latest project data — progress, budget, timeline status — formats it into a structured weekly report, and delivers it to stakeholders.

Before GeoSurvai, someone had to compile this report manually: opening each project file, copying the numbers, formatting the document, checking for errors. Every week. For dozens of projects. Now the system does it in seconds.

I designed the reporting automation as a deliberate product choice. Automation should target the tasks that are high-frequency, low-creativity, and high-error-risk. Weekly reporting checked all three boxes.

---

### Zara — AI Assistant

[Insert Image: Zara AI Assistant Interface — Chat Query with Data Response]

**Ask a question in plain language, get a data-backed answer.**

Zara is GeoSurvai's AI-powered assistant. Any stakeholder can ask a natural-language question like:

> *"How many seismic surveys were completed in Sumatra in 2024?"*

or

> *"What is the average cost per km for offshore 3D surveys?"*

and get an accurate, data-grounded answer — without writing a single query or opening a spreadsheet.

Under the hood, I architected Zara to sync the operational database into a structure optimized for AI reasoning, build rich context with domain-specific glossaries and example queries, and generate safe, read-only database queries to answer each question. Multiple layers of security ensure the AI can only read data, never modify it.

The intent wasn't to replace expertise. It was to make the first 80% of any data question — the gathering and counting part — instant. The expert's time should go toward interpretation and decision-making, not data retrieval.

---

## Behind the Scenes

GeoSurvai runs on a straightforward but well-structured architecture:

- **Frontend** — React with Vite. Interactive maps powered by Leaflet. Charts by Apache ECharts. Gantt charts by Syncfusion. State management with Zustand (persisted, so filters survive navigation).
- **Backend** — Node.js with Express. Clean separation: routes, business logic, data models, and utilities. Each domain (surveys, studies, dashboards, geospatial, AFE) has its own API module.
- **Database** — MongoDB. The document model was a natural fit — exploration records have deeply nested, heterogeneous structures (seismic parameters vary by survey type and area type) that would be awkward to normalize into rigid SQL tables.
- **AI Layer** — Python with Streamlit, running as a sidecar service. Connects to the operational data through a MongoDB → SQLite sync pipeline, keeping the AI infrastructure decoupled from the main API.
- **Auth** — JWT-based authentication with role-based access control (admin, user, contractor, guest) and data-level ACLs per working area.

The technical choices were driven by the product needs, not the other way around. MongoDB because the data is inherently nested. Leaflet because we needed flexible multi-layer geospatial rendering. Zustand because users shouldn't lose their filter context when navigating between views. Every choice had a reason rooted in user experience.

---

## Challenges & How I Solved Them

### Heterogeneous survey data

**The problem:** Different survey types (2D vs. 3D) and area types (onshore vs. offshore vs. airborne) require completely different parameter fields. A one-size-fits-all form breaks down immediately.

**What I did:** I designed a config-driven schema engine — a single configuration file that defines which fields apply to which survey and area types. The UI reads this config and renders only the relevant fields. Adding a new parameter or survey type means editing one file, not touching the UI code. This also required a backwards-compatibility layer to coexist with thousands of legacy records during the migration.

### Geospatial data consistency

**The problem:** Working areas in Indonesia don't have universally agreed-upon spellings. The same area might appear as "Blok Mahakam," "Mahakam," or "B. Mahakam" across different data sources.

**What I did:** I built a normalization pipeline that standardizes working area names and propagates fixes across all linked collections — surveys, studies, and geospatial boundaries. This became part of the operational runbook: any time a naming inconsistency is found, the pipeline resolves it everywhere.

### Complex filter state

**The problem:** Dashboard views have multi-dimensional filters — year, survey type, operator, region, status. Users lost their filter context every time they navigated away and came back.

**What I did:** I moved filter state to a persisted store that survives navigation and browser refreshes. This was a UX-driven decision, not a technical one — I observed users re-applying the same filters repeatedly and designed the state management around their actual workflow.

### AI safety

**The problem:** The AI assistant generates database queries from natural language. Without safeguards, a crafted prompt could induce harmful queries.

**What I did:** I implemented layered defenses: prompt injection detection at the input level, SQL sanitization at the output level (only read-only queries pass through), and explicit system-level constraints. No single safeguard is sufficient — multiple layers working together is the right approach.

---

## What I Learned

**Domain depth changes everything.** Early on, I didn't fully understand the difference between a survey program proposal and an AFE authorization. I didn't know what a PUPOS was. Over time, those distinctions stopped being foreign terms and started being natural parts of how I thought about the data model. Good product design in a specialized domain requires genuinely understanding the domain — not just the software.

**Referential integrity is a product decision.** In a document database, there's always a temptation to store everything as flat strings. But when a working area name changes, embedded strings don't update. We learned this the hard way and built a reference system. What to normalize isn't just a database question — it's a product question about what needs to stay consistent when things change.

**Config-driven UI pays off compoundingly.** The field registry approach — where a JSON file defines what fields exist, for what survey types, in what segments — meant that evolving the product didn't require rewriting UI components. It required updating one configuration file. That discipline pays off more with every iteration.

**Automation earns trust gradually.** The weekly reporting automation wasn't something stakeholders trusted immediately. We had to run manual and automated reports in parallel for weeks, showing they produced identical results, before the manual process was retired. Earning trust for automation requires patience and transparency.

**AI features require honesty.** Zara works well for straightforward aggregate queries. It struggles with multi-hop reasoning and domain-specific terminology. Being honest about what the AI can and can't do — and building confidence gradually through demonstrated reliability — was far more valuable than overpromising.

---

## Looking Ahead

A platform like GeoSurvai creates its own roadmap. The more data accumulates, the more questions become answerable.

**Smarter AI search across documents.** Right now, Zara queries structured data. The next step is making it queryable against unstructured content — the PDFs, technical reports, and meeting minutes in the document hub. Retrieval-augmented generation (RAG) would let a geoscientist ask "what were the main challenges reported in Mahakam Block surveys?" and get an answer synthesized from actual field reports.

**Mobile field reporting.** Field teams often work in areas with limited connectivity. A lightweight mobile interface with offline data entry and sync-on-reconnect would reduce the reporting lag between field events and dashboard visibility.

**Automated anomaly detection.** The historical data contains enough benchmarks for statistical outlier detection. A survey whose cost is 3× the regional average could be automatically flagged for review — turning the analytics layer into a proactive quality control tool.

**Workflow automation.** Adding triggers — notifications when a survey enters a new phase, alerts when costs approach the budget ceiling, reminders for permit renewals — would make GeoSurvai an active participant in the work, not just a record of it.

---

Every feature in GeoSurvai exists because someone was struggling to answer a question that should have been easy. The system grew by listening to those frustrations and building toward a world where exploration knowledge is accessible, connected, and trusted.

That's what I believe digital transformation in the energy sector looks like — not technology for its own sake, but technology that removes friction and lets people focus on the decisions that matter.

---

## Project Card

| | |
|---|---|
| **Project** | GeoSurvai — Exploration Project Management & Auditing Platform |
| **Client** | SKK Migas Exploration Division |
| **Company** | Waviv Technologies |
| **Timeline** | 2023 – present (actively updated) |
| **My Role** | Person In Charge: Product Design, Backend, UI/UX, Database Architecture |
| **Team** | Frontend engineers, DevOps — I served as the bridge between engineering and stakeholders |
| **Stack** | React · Vite · Leaflet · ECharts · Node.js · Express · MongoDB · Python · Streamlit |
| **Focus** | Data Science & Analytics · Fullstack Development · Digital Transformation in Energy & Mining |

---

## Want to See More?

This article covers the design thinking and key features, but there's a lot more under the hood — live dashboards, real-time monitoring, AI queries in action, and the workflows that power it all.

If you're interested in a deeper look or a live walkthrough, feel free to reach out via direct message. I'm happy to give you access and walk you through the platform firsthand.

---

*This article describes work performed as part of my contributions at Waviv Technologies. All data, screenshots, and project information shown are anonymized or use dummy data for demonstration purposes. Product and business details are presented at a general level consistent with public disclosure.*
