# GeoPorto: Innovative Workspace for Geoscience Knowledge

[Insert Image: GeoPorto Hero — Dashboard Overview with Map, Charts, and AI Assistant]

*Disclaimer: All data, screenshots, and project information shown in this article are anonymized or use dummy data for demonstration purposes.*

---

## The Problem

Every time I needed to evaluate a well, the same pattern repeated itself.

The information already existed. Well logs lived in one system. Drilling reports were stored as PDFs inside shared folders. Production data came from another source entirely. Economic evaluations? Buried inside spreadsheets that someone emailed three months ago.

I knew the answers were available somewhere. But finding them meant opening multiple applications, digging through folder hierarchies, and sometimes asking colleagues where the latest version was stored.

> The frustrating part wasn't the lack of data. It was the lack of accessibility.

I often spent more time **gathering** information than actually **analyzing** it. And the more I talked to other geoscientists and engineers, the more I realized this wasn't just my problem. It was everywhere.

The pain was consistent across teams:

- **Fragmented systems** — Geological data in one tool, drilling reports in another, production numbers in a third. No single place to see the full picture of an asset.
- **Buried knowledge** — Technical reports contain valuable lessons learned — well challenges, formation insights, operational decisions. But once they're archived as PDFs in a shared drive, that knowledge effectively disappears.
- **Repetitive searching** — The same information gets re-gathered by different people, at different times, because nobody knows where the definitive version lives.

This wasn't a data problem. It was an **information architecture problem** — the data existed, but the way it was organized made it invisible to the people who needed it most.

---

## The Idea

I wanted to explore a straightforward question:

> What if all technical information related to an asset could be accessed from a single place?

Not to replace specialized software. Not to build another enterprise platform. But to create a **unified workspace** where geological, operational, economic, and document-based information could be explored together — starting from the asset itself.

Two design principles guided what I built:

**Organize around the asset, not the file system.** Engineers don't think in folder structures. They think in wells, blocks, fields, and facilities. The platform should mirror how people actually reason about their work — not how files happen to be stored.

**Turn static documents into searchable knowledge.** Technical reports contain decades of institutional wisdom. But once they're archived as PDFs, that wisdom becomes nearly impossible to retrieve without knowing exactly which document to open. I wanted to change that — using AI to make those reports as easy to search as asking a question.

At the same time, I was becoming increasingly interested in Retrieval-Augmented Generation (RAG) — a way to combine document indexing with large language models. GeoPorto became my attempt to put that interest into practice.

---

## How It Works

Here's the journey, simplified:

```
User opens the map          ──▶  Sees blocks, wells, facilities, pipelines
        │                                        │
        ▼                                        ▼
Clicks on an asset          ──▶  All related data loads in one view
                                                 │
                                                 ▼
                                 Production, drilling, geology, economics, documents
                                                 │
                                                 ▼
                                 Ask GAIA a question about any document
                                                 │
                                                 ▼
                                 Get an answer with source references — instantly
```

**Step 1: Start from the map.** Users land on an interactive map showing blocks, wells, facilities, and pipelines. Location provides immediate context — understanding a well often means understanding its relationship to nearby infrastructure and field boundaries.

**Step 2: Navigate by asset.** Click on any well, block, or facility and all related information loads in a single view. No switching between applications. No searching through folders. The asset is the entry point to everything.

**Step 3: Explore the data.** Production history, drilling records, geological data (well logs), and project economics — all accessible from the same interface. I designed interactive visualizations so users can quickly interpret subsurface characteristics without needing specialized desktop software.

**Step 4: Ask GAIA.** Need to find something in a technical report? Instead of opening dozens of PDFs, ask GAIA — the AI assistant — a natural language question. It retrieves relevant passages from indexed documents and provides answers linked to their original sources.

The goal wasn't to visualize data. The goal was to make information **easier to discover, understand, and connect** — so engineers could spend their time on analysis, not on searching.

---

## Key Features

### Asset-Centric Navigation

**Everything organized around the asset — not the file system.**

Instead of navigating by folder location or database table, GeoPorto organizes everything around the asset itself. A well becomes the entry point to its production history, drilling records, geological information, and supporting documentation.

This mirrors how technical teams actually think about their work. I designed the information architecture so that exploring a well feels natural — click, and the full context loads. No mental mapping between file structures and real-world assets required.

---

### Interactive Asset Map

[Insert Image: Asset Map — Blocks, Wells, Pipelines, and Facilities]

**See every asset on a map — click to explore.**

Location matters in geoscience. Understanding a well often requires understanding its relationship to nearby infrastructure, surrounding wells, and field boundaries. I built the mapping interface to provide that spatial context immediately.

Users can toggle layers on and off — wells, pipelines, facilities, block boundaries — and click through to any asset's detail page directly from the map. The map isn't just a visualization; it's the primary navigation tool.

---

### Well Log Explorer

[Insert Image: Well Log Visualization — GR, RHOB, and NPHI Tracks]

**Interactive subsurface data — without specialized desktop software.**

Geological data can be difficult to interpret when hidden inside spreadsheets or locked behind expensive desktop applications. I built interactive well log visualizations directly into the platform, so users can quickly understand subsurface characteristics — gamma ray, density, neutron porosity — from their browser.

The goal was to make the first pass of geological interpretation accessible to anyone on the team, not just the specialists with the right software licenses.

---

### Production & Drilling Analytics

[Insert Image: Production History Charts and Drilling Summary]

**Track production performance and drilling history from one place.**

Each asset's production history and drilling records are visualized with interactive charts. Users can explore trends over time, compare wells, and identify patterns — all without exporting data to a separate analysis tool.

I designed these views to surface the most important information first: what's producing, how much, and how has it changed. The detailed data is always available for deeper dives, but the initial view should answer the 80% question in seconds.

---

### Project Economics

**Understand the financial picture alongside the technical one.**

Economic evaluations often live in spreadsheets disconnected from the operational data they reference. In GeoPorto, I brought economics into the same workspace — so a user exploring a well can immediately see its economic context without switching tools.

When technical and economic data live side by side, the conversation changes. Engineers start thinking about wells not just as geological features, but as business decisions.

---

### GAIA — AI Document Assistant

[Insert Image: GAIA AI Assistant — Answering Questions with Document References]

**Ask a question in plain language, get an answer from your own documents.**

GAIA is the feature I was most excited to build. It's an AI assistant that lets users search technical documents using natural language.

Instead of manually opening multiple reports, users can ask:

> *"What drilling challenges were encountered in this well?"*

or

> *"What lessons learned were documented during this campaign?"*

GAIA retrieves relevant information from indexed documents and provides answers linked to their original sources — so users can verify and dive deeper.

Under the hood, I built a RAG (Retrieval-Augmented Generation) pipeline: documents are chunked, embedded into vectors, and stored alongside structured data in the same database. When a user asks a question, GAIA searches for the most relevant passages, feeds them to a language model, and generates an answer grounded in actual content — not hallucination.

The goal of GAIA was never to replace domain expertise. **It was designed to reduce the friction of finding information.** Many organizations already possess decades of valuable technical knowledge. The problem is that most of it lives inside reports that are difficult to search and difficult to reuse. GAIA turns those static documents into searchable knowledge.

*Note: GAIA is currently a working prototype — functional, but still evolving.*

---

## Behind the Scenes

GeoPorto's architecture was intentionally simple:

- **Framework** — Next.js for both frontend and backend in a single codebase. No need for a separate API server.
- **Database** — PostgreSQL with pgvector. A single database stores structured operational data and AI embeddings together — keeping everything connected without maintaining separate systems.
- **Maps** — Leaflet for geospatial visualization and interactive asset navigation.
- **Charts** — Plotly for geological and operational visualizations, chosen for its ability to handle large volumes of data smoothly.
- **AI** — OpenAI + Vercel AI SDK powering GAIA and the document retrieval pipeline.

> The objective was not to chase the latest technology. The objective was to select tools that solved the problem while keeping the architecture understandable.

Every choice had a reason rooted in the product. PostgreSQL + pgvector because I wanted structured data and AI embeddings in one place. Next.js because a single codebase means faster iteration for a solo builder. Plotly because well logs contain thousands of data points and need a renderer that doesn't choke.

---

## Challenges & How I Solved Them

### Designing a universal data model

**The problem:** Geoscientists, drilling engineers, and project managers all think about assets differently. A well is a geological feature to one, a drilling operation to another, and a financial investment to a third.

**What I did:** I designed the data model around the asset as the central node — with geological, operational, economic, and document data as connected layers. This meant anyone could start from the same entry point and navigate to the information that matters to their role. Getting this right required understanding multiple disciplines, not just one.

### Making AI retrieval actually useful

**The problem:** RAG systems are easy to build in demos and hard to make reliable in practice. Document chunking, embedding quality, and retrieval relevance all affect whether the AI gives a useful answer or a misleading one.

**What I did:** I invested heavily in the pre-processing pipeline — how documents are chunked, what metadata is preserved, and how the retrieval step ranks relevance. The quality of a RAG system is determined long before the language model generates an answer. It starts with clean data, meaningful metadata, and thoughtful information architecture.

### Visualizing dense geological data in a browser

**The problem:** Well log data can contain thousands of data points per track. Rendering this interactively in a browser — without lag, without losing detail — requires careful handling.

**What I did:** I chose Plotly for its ability to handle large datasets and built the visualization to load data progressively. The initial view shows the full log overview; users can zoom into specific depth intervals for detailed interpretation.

---

## What I Learned

**Information architecture is the hardest part.** The hardest challenge wasn't creating charts or integrating AI. It was designing a data model capable of representing how geoscientists, drilling engineers, and project teams think about assets. Getting that wrong means the software fights its users instead of serving them.

**AI depends on data organization.** Good retrieval starts long before the model generates an answer. It starts with clean relationships, meaningful metadata, and thoughtful chunking strategies. The AI is only as good as the information pipeline feeding it.

**Accessibility drives adoption.** Making complex data accessible isn't about dumbing it down. It's about removing the friction between a person and the information they need. The best features in GeoPorto aren't the most technically impressive ones — they're the ones that save someone from opening five applications to answer one question.

Most importantly, this project reinforced something I already suspected:

> The future of technical workflows will not be driven solely by better analysis tools. It will be driven by making knowledge easier to access.

---

## Looking Ahead

GeoPorto is still evolving. Future improvements I want to explore include:

- **LAS file support** — Native well log file parsing for direct upload and visualization.
- **Predictive analytics** — Applying machine learning to drilling and production workflows for early anomaly detection.
- **Smarter document ingestion** — Better chunking strategies and multi-format support for improved GAIA accuracy.
- **Collaborative annotations** — Letting team members tag, annotate, and share insights directly within the platform.
- **Expanded GAIA capabilities** — Multi-document reasoning, cross-asset queries, and conversational follow-ups.

The project began as an experiment to solve a personal frustration. It has since become a playground for exploring how geoscience, data engineering, and AI can work together to make technical knowledge more accessible.

And honestly, that is still the part I find most exciting.

---

Every feature in GeoPorto exists because finding technical information shouldn't be harder than the analysis itself. The platform grew from a simple frustration: the data was always there — it was just hard to reach.

That's what drives my work in this space — building systems where knowledge is accessible, connected, and ready when someone needs it.

---

## Project Card

| | |
|---|---|
| **Project** | GeoPorto — Unified Geoscience Data & Knowledge Platform |
| **Type** | Personal / Research Project |
| **Timeline** | 2024 – present (actively evolving) |
| **My Role** | Solo builder: Product Design, Fullstack Development, Data Modeling, AI Integration |
| **Stack** | Next.js · PostgreSQL · pgvector · Leaflet · Plotly · OpenAI · Vercel AI SDK |
| **Focus** | Data Science & Analytics · Fullstack Development · Digital Transformation in Energy & Mining |

---

## Want to See More?

This article covers the design thinking and key features, but there's a lot more under the hood — live dashboards, interactive maps, AI queries in action, and the data workflows behind them.

If you're interested in a deeper look or a live walkthrough, feel free to reach out via direct message. I'm happy to give you access and walk you through the platform firsthand.

---

*All data, screenshots, and project information shown are anonymized or use dummy data for demonstration purposes.*
