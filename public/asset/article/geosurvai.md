# GeoSurvai: Building a Better Way to Manage Exploration Knowledge

[Insert Image: GeoSurvai Hero — Dashboard Overview with Map and Analytics]

*Disclaimer: All data, screenshots, and project information shown in this article are anonymized or use dummy data for demonstration purposes.*

---

## About GeoSurvai

One project I particularly enjoyed working on was GeoSurvai — a web-based platform developed as part of my work at WAVIV Technologies. The system was built for the upstream oil and gas sector, specifically to help regulators and operators manage the full lifecycle of exploration activities across Indonesia.

At its core, GeoSurvai is an exploration management system. It tracks geophysical surveys (seismic 2D, seismic 3D, and other survey types), technical studies (geoscience studies, lab analyses, reprocessing projects), and all the administrative and geospatial information that surrounds them. But more than a database — it functions as the operational memory of an exploration division: where every project lives, how it's progressing, what it's costing, and where it sits on a map of Indonesia.

As part of the engineering team at WAVIV Technologies, I contributed across the full stack — from the React frontend and its interactive GIS maps to the Node.js API layer, data modeling decisions, and the AI assistant layer built on top of it all.

---

## The Problem

Before talking about what GeoSurvai does, it helps to understand the world it was built for.

Upstream oil and gas exploration in Indonesia involves a large number of stakeholders: the national regulator, dozens of contractors (KKKS — Kontraktor Kontrak Kerja Sama), holding companies, and sub-contractors. At any given year, dozens of exploration survey activities are active simultaneously — seismic surveys happening across different islands, at different phases, managed by different organizations.

Every one of those activities generates paperwork. A lot of it.

There are AFE documents (Authorization for Expenditure), technical approval letters, work program and budget plans, operational progress reports, field monitoring data, permits, minutes of meetings, technical publications, and dozens of other deliverables. Each survey also produces geospatial outputs: shapefiles, coordinates, coverage maps.

And studies are separate from surveys. Technical studies — G&G studies, lab analyses, seismic reprocessing — run in parallel and have their own documentation, software deliverables, and resource allocations. There's also the SDC (Static Data Collection) layer, which tracks reserve estimates and geological parameters per working area.

For years, this information lived across spreadsheets, shared drives, email threads, and siloed databases. When a manager needed to understand the status of exploration activities across all working areas for a given year, they'd have to aggregate data manually from multiple sources. When a new engineer joined, there was no single system to go to.

The friction was real. And it wasn't just inconvenience — in exploration decisions worth hundreds of millions of dollars, incomplete or inaccessible information has consequences.

---

## The Idea

The design philosophy behind GeoSurvai was simple but ambitious: what if all of this could be managed from one place?

Not just documents. Not just maps. Not just progress tracking. But the **complete lifecycle** of exploration work — from program proposals through technical approval, field execution, cost monitoring, deliverable archiving, and performance analytics.

Centralization matters in this context for a few reasons. First, exploration activities have dependencies between them. A seismic survey requires a work permit. The work permit status affects the schedule. The schedule affects budget tracking. Budget tracking feeds the dashboard. When these pieces live in different systems, cause and effect becomes invisible. When they live together, patterns emerge.

Second, the regulator needs visibility. When an KKKS submits a work program, the regulator needs to track whether the actual execution matches the plan. That comparison — plan vs. actual — is something GeoSurvai surfaces at every level, from individual projects up to annual portfolio views.

Third, institutional knowledge is fragile. Engineers move between organizations. With a well-designed system, the knowledge a team builds about a working area — its seismic parameters, its exploration history, its reserve estimates — doesn't leave when the engineer does.

That was the North Star: build a system where exploration knowledge compounds instead of evaporates.

---

## Building GeoSurvai

From a user's perspective, GeoSurvai organizes exploration work into two primary domains: **Survey** (geophysical acquisition activities) and **Studi** (technical studies). These aren't just labels — they reflect genuinely different workflows, data structures, and reporting needs.

When a user logs in, they land on the Survey Monitoring Dashboard. This is the nerve center — a high-level view of all active and historical survey activities, filterable by year, activity type, holding company, and working area (Wilayah Kerja / WK). From here, users can drill down into individual projects, see Gantt-chart timelines, track budget vs. actual costs, and view the geospatial footprint of every survey on an interactive map.

The Study Dashboard mirrors this structure for technical studies. It tracks study plans vs. realizations, software deliverables, and resource allocations — with its own map showing where study areas overlap with survey coverage.

Both dashboards feed from a shared data layer. A survey activity and its associated technical study are linked through a common working area reference. That referential integrity — making sure a WK in the survey system is the same WK in the study system and the geospatial system — was one of the core architectural decisions we had to get right.

For field contractors, the interface is different. A contractor user sees only the activities assigned to their organization, with a view focused on document submission and progress reporting — not the full analytical dashboard. User roles are enforced at both the frontend routing level and the API authorization layer.

---

## Key Features

### Interactive Survey & Study Maps

[Insert Image: Interactive Map — Survey Coverage with WK Boundaries and Seismic Activity Points]

One of the most visually striking parts of the system is the map view. Built on React Leaflet, the survey map renders two layers simultaneously: the working area (WK) boundaries as GeoJSON polygons, and individual survey activity points as custom markers.

Each marker is clickable and opens a popup showing the project name, type of survey, KKKS operator, dates, and a direct link to the project detail page. The legend is fully interactive — users can toggle visibility of survey types, boundary layers, and even the SDC (Static Data Collection) geospatial overlay.

The map also includes a **maritime boundary layer** (Batas Laut Indonesia) — a critical layer for offshore surveys where regulatory jurisdiction matters. This layer is rendered separately with its own legend toggle, drawn from a GeoJSON dataset stored in MongoDB.

The study map follows the same pattern but adds an additional dimension: SDC study points are overlaid with color-coded symbols reflecting reserve estimate magnitudes (mapped from MMBOE values into size categories), giving geoscientists a spatial intuition for where the most prospective areas are.

For the annual seismic view, we built a **parameter-driven bubble map** — where each survey location is rendered as a circle whose size and color encode a selected seismic parameter: receiver spacing, shot spacing, fold coverage, charge depth, or cost per km². Users can switch between parameters using a dropdown and filter by year, and the map dynamically re-renders. A color scale control in the corner shows the interpolation from red (low values) through yellow to green (high values).

---

### Survey Project Management

[Insert Image: Survey Project Detail Page — Summary, Gantt Chart, and Progress Monitoring]

Each survey activity in GeoSurvai has a dedicated project detail page. This is where a lot of the complexity lives.

A survey record isn't just a name and a date. It stores:

- **Core identity**: project name, WK, KKKS, holding company, year
- **Work program data**: planned quantity (km or km²), planned start/end dates, AFE number, AFE investment value, contract type
- **Realization data**: actual start/end, actual quantity, actual cost, execution status, field obstacles
- **Technical parameters**: a dynamic set of seismic acquisition parameters — receiver spacing, shot spacing, fold coverage, offset settings, charge parameters — organized by area type (Onshore, Offshore, Transition Zone, Airborne)
- **Permits and readiness checklist**: a list of ~20 permit and readiness items, each with a completion percentage and a note field (technical approval, environmental permits, community permits, contractor procurement, etc.)
- **Resource information**: contractor organization, equipment list
- **Monitoring / PUPOS**: a Gantt-based progress view with plan and actual timelines at the task level

The seismic parameter structure was one of the more interesting engineering challenges. Different survey types (2D vs. 3D) and different area types (Onshore vs. Offshore) require different parameter fields. An airborne survey doesn't have shot spacing; an offshore marine survey uses streamers instead of geophones.

We solved this with a **dynamic schema engine** on the backend — a `fieldRegistry.json` configuration file that maps each parameter field to its applicable survey types and area segments. The frontend reads this registry at runtime (directly importing the backend JSON file via Vite's alias configuration) and renders only the relevant parameter groups for the current survey. This meant we could add or remove parameters by editing one configuration file, without touching the UI code.

The Gantt chart is powered by Syncfusion's `ej2-react-gantt` library, rendered with custom task bar templates. Tasks are organized in a three-level hierarchy: root phase → task group → plan vs. actual bars. Authorized users can edit task dates and progress percentages inline, and the changes propagate back to the API. The Gantt also supports historical snapshots — users can select a previous version of the monitoring data from a dropdown to compare how the plan has evolved over time.

---

### The AFE Cost Analytics Dashboard

[Insert Image: AFE Analytics — Benchmark Charts and Cost Composition]

The AFE (Authorization for Expenditure) module tracks exploration cost data independently from the operational survey data. This lets analysts ask questions like: what's the average cost per km for 3D offshore surveys in Eastern Indonesia? How does this year's Kalimantan seismic cost compare to previous years?

The analytics dashboard breaks cost down into three components: seismic acquisition, mobilization/demobilization, and support services. For each component, users can view:

- A **benchmark chart** comparing costs across contractors, working areas, or activity types
- A **cost trend** showing how per-km/km² costs have changed year over year
- A **composition breakdown** showing the relative share of each cost component

The dashboard is filterable by year, KKKS, Indonesian region, area type, and activity type. The aggregation method can be toggled between average, minimum, maximum, and sum — allowing the same chart to serve both "what's the typical cost?" and "what's the extreme?"

A **Budget Guidance** feature extends this further: it shows reference cost ranges based on historical data, giving procurement teams a data-driven anchor when evaluating new contractor bids.

---

### Study Management & SDC Integration

[Insert Image: Study Dashboard — Plan vs. Actual Cumulative S-Curves]

Technical studies are tracked through two complementary sub-systems: the main Study module and the SDC (Static Data Collection) module.

The Study dashboard displays cumulative S-curves of plan vs. actual study completion over time. Each study record stores the study type (G&G Study, Lab Analysis, Reprocessing, MNK), WK, KKKS, contract type, budget cost, actual cost, planned dates, actual dates, and software deliverables.

The SDC module is separate but related. It tracks reserve estimates per working area per year: IOIP, IGIP, recoverable oil, recoverable gas, condensate, project level classification, and geological confidence factors (GCF) — trap/seal, reservoir, source rock, and dynamic parameters. Each SDC record is linked back to the WK reference system and has its own geospatial point for map rendering.

A key feature of the SDC list is a **range-based filter on RR TOTAL** (total recoverable resources in MMBOE). Users can set a minimum and maximum resource threshold, and the table filters in real time. This makes it easy to zoom in on high-impact prospects without scrolling through hundreds of records.

---

### Exploration Catalog

[Insert Image: Exploration Catalog — Grid View with Thumbnails and Document Links]

The Exploration Catalog is a public-facing (within the application) archive of completed survey activities. Unlike the main survey management view — which is operational — the catalog is read-oriented. It's designed for browsing and discovering historical exploration work.

Each catalog entry renders as a card in a responsive grid. The card shows the project thumbnail image, activity type, year, WK, KKKS, and key parameters. Clicking through opens a detail summary page with the full dataset and any attached documents (technical reports, survey parameters, shapefiles).

The catalog has layered access control: regular users can browse and view; contractor users have read-only access to their authorized working areas; admin users can edit and tag entries. This separation was important because the catalog is meant to be a trusted reference — not editable by everyone.

For cataloging seismic parameters specifically, admin users can open a parameter editing interface where they tag and validate the technical data against the field registry schema. This creates a quality-controlled reference dataset for future benchmarking.

---

### Annual Seismic Parameter Visualization

[Insert Image: Annual Seismic Map — Parameter Bubble Map with Color Scale and Range Filter]

The Annual Seismic view is a dedicated analytical tool for geoscientists and technical advisors. Unlike the operational survey map — which shows what's happening — this view shows **what the data says** about historical acquisition quality.

Users select a parameter from a dropdown (receiver spacing, shot spacing, fold coverage, charge size, charge depth, offset range, cost per km²), select one or more years, and optionally set a value range using a dual-handle slider. The map then renders every survey location as a bubble, where size encodes the magnitude of the selected parameter and color runs from red (low) to green (high).

This view uses a separately computed seismic parameter dataset on the backend — a MongoDB aggregation pipeline that reads from the main survey collection, computes derived parameters (like cost per km for 3D surveys), applies confidentiality filtering (AFE costs for the current year are anonymized to prevent competitive disclosure), and returns enriched point data.

The result is a tool that lets a geoscientist immediately see whether a particular basin has consistently used tight or loose receiver spacing — or whether costs in a particular region have been trending up or down over the past five years.

---

### Document Repository: Minutes, Publications, Tutorials

Beyond operational data, GeoSurvai includes a lightweight document management layer.

**Minutes of Meeting** (Notulen Rapat) is a structured repository for meeting records associated with survey activities. Each minutes record links to a specific survey, stores participant lists, agenda items, decisions made, and attached PDF or Word documents.

**Publications** allow the team to attach technical publications — papers, reports, presentation decks — to the platform, making them discoverable by other users within the organization.

**Tutorials** provide a guided onboarding layer built directly into the platform. Instead of external documentation, tutorials are versioned, file-attached guides accessible from the sidebar navigation. This was a pragmatic call: in a domain as specialized as upstream geophysics, onboarding new users requires contextual documentation, not generic help files.

---

### Zara — The AI Assistant

[Insert Image: Zara AI Assistant Interface — Chat Query with Data Response]

The most experimental feature in the system is **Zara** — an AI-powered assistant accessible via a dedicated interface linked from the sidebar.

Zara is built on a separate Python/Streamlit application with a sophisticated multi-layer architecture:

1. **Data sync pipeline**: A `MongoToSqliteSync` class continuously syncs the operational MongoDB database to a local SQLite database optimized for AI query generation. The sync flattens the nested MongoDB schema into a tabular structure that LLMs can reason about more reliably.

2. **Context loader**: An `AIContextLoader` class builds a rich context object before each query — including schema descriptions, sample data, domain-specific glossaries (e.g., what "WK," "KKKS," "MMBOE" mean), and example question-answer pairs from a curated examples file.

3. **Secure orchestrator**: An `AIOrchestrator` class sits between the user and the LLM. It includes a prompt injection detector (scanning for SQL injection patterns, script tags, instruction-override attempts), input validation, SQL sanitization, and a simple query cache for repeated questions.

4. **Chain-of-thought reasoning**: The LLM is prompted using a chain-of-thought template that walks through the question interpretation, schema reasoning, SQL generation, result interpretation, and final answer steps — reducing hallucination on complex multi-table queries.

The intent: any geoscientist or manager should be able to ask a natural-language question like *"How many seismic surveys were completed in Sumatera in 2024?"* or *"What is the average cost per km for offshore 3D surveys?"* and get an accurate, data-grounded answer — without writing a single query.

---

## Behind the Architecture

### Overall System Design

The architecture is a straightforward but well-structured client-server setup.

The **frontend** is a React 19 single-page application built with Vite. Routing is handled by TanStack Router, which provides type-safe route parameters and a clean file-based routing convention. Global state is managed with Zustand, using a persisted store that survives browser refreshes — which matters when users apply complex multi-filter combinations across dashboards.

The **backend** is a Node.js application built on Express. It follows a clear separation of concerns: routes in `/api`, business logic in `/module`, data models in `/model`, and utilities in `/util`. The Express app mounts each domain as its own router (`/api/kegiatan`, `/api/studi`, `/api/dashboard`, `/api/afesurvei`, `/api/geospatial`, etc.), keeping the entry point clean and navigable.

**MongoDB** is the primary database, accessed through Mongoose. The document model was a natural fit here — exploration survey records have deeply nested structures (seismic parameters per segment type, permit checklists, file upload registries) that would be awkward to normalize into SQL tables.

The **Python/Streamlit AI layer** runs as a sidecar service alongside the Node.js backend, with its own MongoDB → SQLite sync process. This keeps the AI infrastructure decoupled from the operational API.

---

### Authentication and Authorization

Authentication is JWT-based. The server issues access tokens on login; the client stores them in Zustand's persisted store (via `localStorage`). Every protected API route goes through an `authentication` middleware that verifies the token against the server's secret and loads the user record.

Authorization has two mechanisms. The first is **role-based** (`checkACLstr`) — a middleware factory that accepts an array of allowed roles and blocks requests from users with insufficient privileges. The four roles are `admin`, `user`, `contractor`, and `guest`, each with different navigation menus and different edit permissions.

The second mechanism is **Access Control Lists (ACL)** at the data level. Each user record stores `acl.WK`, `acl.Studi`, and `acl.Kegiatan` arrays. Contractor users can only see data from working areas they've been granted access to — enforced both in the API queries and in the frontend route guard that reads from the auth store.

The frontend route guard lives in `_private.tsx` — a TanStack Router route component that redirects unauthenticated users to the login page before any protected route renders.

---

### Data Relationships and Referential Integrity

One of the more subtle architectural decisions was how to handle the relationship between surveys, studies, working areas, operators, and geospatial data.

Each survey activity (Kegiatan) references a `KegiatanKKKSWKHolding` document — a normalized lookup table that maps Working Area → KKKS → Holding Company as a unique combination. This avoids storing the same WK/KKKS/Holding combination as raw strings across thousands of records, and makes it possible to query "all activities for Holding X in WK Y" efficiently.

Similarly, SDC study records reference the same `KegiatanKKKSWKHolding` collection, creating a shared reference system between the survey and study domains.

Geospatial data is stored separately: `GeoSpatialWK` for working area boundaries, `GeoSpatialSDCStudi` for SDC point locations, `BatasLautIndonesia` for maritime boundaries, and `FacilityPoint`/`FacilityPipeline` for infrastructure overlays. Each references back to its operational record via MongoDB ObjectId.

This architecture meant we had to build and maintain a **geospatial linking pipeline** — scripts that, when new WK boundaries are added or modified, automatically link them to the correct survey and study records.

---

### Map Rendering

Maps are rendered with React Leaflet. Each map component (`SurveyMap`, `AnnualSeismicMap`, `StudyMap`) follows the same pattern: a `MapContainer` with configurable center/zoom, a switchable `TileLayer` (supporting ESRI World Imagery, OpenStreetMap, and others), and one or more `GeoJSON`/`Marker` layers.

The annual seismic map adds a `ColormapControl` — a custom Leaflet control component that renders a gradient legend in the map corner, updating dynamically as the selected parameter or value range changes.

Custom marker icons are generated programmatically using `ReactDOMServer.renderToString` — rendering a React component (the marker icon SVG) to an HTML string, then wrapping it in a `L.divIcon`. This allowed us to color-code markers dynamically based on data attributes, without maintaining a separate set of static image assets.

---

## Technology Choices

**React + Vite** — Vite's fast hot module replacement made the development loop tight, and React 19's improvements were meaningful for a data-heavy dashboard. We chose Vite over Next.js because there's no need for server-side rendering in an authenticated internal tool, and the simpler build pipeline was easier to maintain.

**TanStack Router** — Type-safe routing in TypeScript is genuinely useful in a project with 30+ routes and dynamic parameters like `/survey/survey-details/$id/history/$historyId`. The file-based convention kept the route structure readable at a glance.

**TanStack Query** — Server state management for data fetching, caching, and invalidation. The stale-while-revalidate pattern made dashboards feel snappy even on slower networks.

**Zustand** — Lightweight global state management with persistence middleware. Each domain's filter state (which years are selected, which WKs, which view mode) persists across navigations via `localStorage`. This means a user who filters the survey dashboard to "2024, Seismik 3D, Eastern Indonesia" doesn't lose that context when they navigate to the map and come back.

**Apache ECharts** — Used for all analytical charts (doughnut charts, line charts, budget vs. actual S-curves). The chart library is wrapped in a `ReactECharts` component that handles resize observers and watermark injection. ECharts was preferred for its richer configuration API and better performance with large datasets.

**Syncfusion Gantt** — For the monitoring Gantt chart in project detail pages. `ej2-react-gantt` was the most capable Gantt component available in the React ecosystem, supporting interactive editing, PDF export, zoom controls, and custom task bar templates. The trade-off is licensing cost and bundle size, but the feature completeness justified it for this use case.

**React Leaflet / Leaflet.js** — The mapping library of choice for its maturity, flexibility, and the quality of its GeoJSON rendering. Leaflet's permissive tile provider support and the availability of `react-leaflet` hooks made it the right fit for a multi-layer geospatial application.

**Node.js + Express** — The backend is deliberately simple. Express's middleware chain is predictable, and the Mongoose ODM is mature and well-documented. For an API layer that's primarily doing query filtering, aggregation pipelines, and file management — rather than heavy computation — Node.js is an appropriate choice.

**MongoDB** — The document model matched the domain naturally. Exploration survey records have inherently heterogeneous structures: an offshore 3D seismic survey has very different parameters than an airborne survey. MongoDB's flexible schema let us store these variations without the complexity of a polymorphic SQL table design.

**Python + Streamlit** — For the Zara AI assistant. Python is the natural language of LLM tooling (OpenAI SDK, Ollama integrations), and Streamlit provided a rapid way to build a deployable chat UI without investing in a separate frontend. The AI layer runs independently and connects to the operational data via the MongoDB → SQLite sync pipeline.

---

## Challenges Along the Way

### Managing Complex, Heterogeneous Survey Data

The biggest data modeling challenge was the seismic parameter schema. Early in the project, parameter fields were stored as flat fields on the survey document. This worked for simple cases, but it broke down for multi-segment surveys — an "Onshore - Offshore" survey has two sets of receiver parameters, two sets of shot parameters, different equipment, different crew compositions.

The solution was the `spar` (Survey Parameters) sub-document — a nested structure with `global.recording` fields and a `segments` array, where each segment has a `type` (Onshore/Offshore/Transition Zone/Airborne) with its own `receiver` and `shot` parameter objects.

The `fieldRegistry.json` config file defines which fields are applicable for which segment types and survey types, and the `kegiatan_schema_engine.js` module handles conversion between the old flat schema (legacy data) and the new segment-based schema. This backwards compatibility layer was critical — we couldn't migrate thousands of existing records overnight, so both schemas had to coexist during the transition.

### Geospatial Data Consistency

Working areas in Indonesia don't have universally agreed-upon spellings. The same WK might appear as "Blok Mahakam," "Mahakam," or "B. Mahakam" across different data sources. Linking survey activities, study records, and geospatial boundaries required building a normalization pipeline that standardized WK names and maintained referential links.

We built a series of migration scripts that became part of the operational runbook — any time a new WK boundary was added or a naming inconsistency was found, the pipeline was run to propagate the fix across all linked collections.

### State Management Across Complex Filters

The dashboard views have multi-dimensional filters — year, survey type, holding company, working area, status, date range. These need to persist as the user navigates between different views (dashboard → map → project list → back to dashboard).

The early approach of passing filter state via URL query parameters became unwieldy. We moved to Zustand's persisted store, with a `resetAll` function triggered on logout. This kept the implementation clean but required careful thought about which state should persist (filter selections) and which shouldn't (modal open/close states, form dirty states).

### Chart Tooltip Rendering in ECharts

ECharts renders tooltip content in HTML injected into the DOM outside of React's control. This meant custom tooltip styles couldn't use Tailwind classes directly — they had to be written as inline styles or class names that existed in the global CSS. We solved this with a `ChartTooltip` helper function that generates the tooltip HTML string in a consistent format, matching the application's design system.

### The AI SQL Safety Problem

The Zara AI assistant generates SQL queries from natural language input. A naive implementation would be a security risk — a user could craft a prompt that induces the LLM to generate `DROP TABLE` or update queries.

The `AIOrchestrator` addresses this with layered defenses: a regex-based prompt injection detector at the input level, and an SQL sanitizer at the output level that strips any non-`SELECT` statements before execution. The LLM is also constrained by a system prompt that explicitly instructs it to generate only read-only queries. Multiple layers of defense is the right approach here — no single safeguard is sufficient.

---

## What I Learned

Building GeoSurvai taught me things that I don't think I could have learned from tutorials or side projects.

**Domain depth changes everything.** Early on, I didn't fully understand the difference between a survey program proposal and an AFE authorization. I didn't know what a PUPOS was (Peta Usulan Program Operasional Survei — the operational survey plan document). I didn't understand why the WPNB (Work Plan and Budget) quantity matters separately from the AFE quantity. Over time, those distinctions stopped being foreign terms and started being natural parts of how I thought about the data model. Good software engineering in a specialized domain requires actually understanding the domain.

**Referential integrity is a product decision.** In a document database, there's always a temptation to embed everything — just store the WK name as a string, the KKKS name as a string, and move on. But when a user changes the canonical name of a WK, those embedded strings don't update. We learned this the hard way and built the reference table system. Deciding what to normalize isn't just a database design question — it's a product question about what needs to stay consistent when things change.

**Config-driven UI reduces long-term maintenance cost.** The field registry approach for seismic parameters — where a JSON file defines what fields exist, for what survey types, in what segments — meant that adding a new survey type or a new parameter field didn't require touching the UI component code. It required updating one configuration file. That discipline pays off compoundingly as a product evolves.

**AI features require honesty about their limitations.** Zara works well for straightforward aggregate queries. It struggles with multi-hop reasoning and domain-specific terminology that doesn't map cleanly to column names. Being honest with stakeholders about what the AI layer can and can't do — and building confidence gradually through demonstrated reliability on simpler queries — was more valuable than overpromising.

**State management is a UX problem, not just a technical one.** The decision to persist filter state across navigation wasn't driven by a technical requirement. It was driven by observing users lose their filter context and having to re-apply it every time they navigated. The best state management decisions are made by thinking about user workflows, not just about the correctness of data flow.

---

## Looking Ahead

A platform like GeoSurvai creates its own roadmap. The more data accumulates, the more questions become answerable — and the more valuable additional capabilities become.

A few directions that feel natural given the current architecture:

**Smarter AI search across documents.** Right now, the Zara AI assistant can query structured operational data. The next step is making it queryable against unstructured content — the PDFs, technical reports, and minutes of meetings stored in the document repository. Retrieval-augmented generation (RAG) with a vector database layer would let a geoscientist ask "what were the main technical challenges reported in Mahakam Block surveys?" and get an answer synthesized from actual field reports.

**Mobile field reporting.** Contractors currently report progress through the web application. But field teams are often in areas with limited connectivity. A lightweight mobile interface — possibly a progressive web app — that allows offline progress entry with sync-on-reconnect would reduce the reporting lag between field events and dashboard visibility.

**Automated anomaly detection.** The annual seismic parameter data contains enough historical benchmarks that statistical anomaly detection becomes feasible. A survey whose reported cost per km² is 3× the regional average, or whose reported fold coverage is far below specifications for its survey type, could be automatically flagged for review — turning the analytics layer into a proactive quality control tool.

**Advanced geospatial analytics.** The current map views are display-oriented. Adding geospatial analysis capabilities — coverage overlap detection, proximity analysis between survey tracks and prospect locations, heat maps of exploration density per basin — would turn the map from a visualization into a decision-support tool.

**Notification and workflow integration.** Right now, GeoSurvai is a reporting system. Adding workflow triggers — notifications when a survey enters a new phase, alerts when an AFE cost is approaching its budget, reminders for permit renewals — would make it a more active participant in the work, not just a record of it.

---

Every feature in GeoSurvai exists because someone, somewhere, was struggling to answer a question that should have been easy to answer. The system grew by listening to those frustrations and building toward a world where exploration knowledge is accessible, connected, and trusted.

That's ultimately what good engineering in specialized domains looks like: not just solving technical problems, but building the infrastructure for better decisions.

---

*This article describes work performed as part of my contributions at WAVIV Technologies. All data, screenshots, and project information shown are anonymized or use dummy data for demonstration purposes. Product and business details are presented at a general level consistent with public disclosure.*
