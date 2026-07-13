# GeoPorto: Building a Single Place for Geoscience Data, Documents, and Knowledge

[Insert Hero Image: Full dashboard overview showing map, charts, and AI assistant]

_disclaimer: all of this data is dummy. for research-purpose only._

## The Problem

A few years ago, I noticed something that happened almost every time I needed to evaluate a well. **The information already existed. The challenge was finding it.**

Well logs lived in one system. Drilling reports were stored as PDFs inside shared folders. Production data came from another source. Economic evaluations were often buried inside spreadsheets. Sometimes I knew the answer was available somewhere, but finding it meant opening multiple applications, searching through folders, and asking colleagues where the latest version was stored.

> The frustrating part wasn't the lack of data. It was the lack of accessibility.

I often spent more time gathering information than actually analyzing it. That experience became the starting point for GeoPorto.

---

## The Idea

I wanted to explore a simple question:

> What if all technical information related to an asset could be accessed from a single place?

Not to replace specialized software. Not to build another enterprise platform. But to create a unified workspace where geological, operational, economic, and document-based information could be explored together.

At the same time, I was becoming increasingly interested in AI and Retrieval-Augmented Generation (RAG). Technical reports often contain valuable lessons learned, but once they are archived as PDFs, that knowledge becomes difficult to access.

I wondered:

> What if those reports could be searched as easily as asking a question?

GeoPorto became my attempt to answer both problems.

---

## What I Built

GeoPorto is a web-based platform designed to bring multiple data domains together into a single experience. Users can start from a map and navigate through blocks, wells, facilities, and pipelines. From there, they can explore production history, drilling information, geological data, project economics, and technical documents without jumping between systems.

**The goal isn't simply to visualize data. The goal is to make information easier to discover, understand, and connect.**

[Insert Image: Interactive asset map showing blocks, wells, and facilities]

---

## Features That Matter

### Asset-Centric Navigation

Instead of organizing information by file location or database table, GeoPorto organizes everything around the asset itself. A well becomes the entry point to its production history, drilling records, geological information, and supporting documentation.

This mirrors how technical teams actually think about their work.

---

### Geospatial Context

Location matters. Understanding a well often requires understanding its relationship to nearby infrastructure, surrounding wells, and field boundaries. The mapping interface provides that context immediately.

[Insert Image: Asset map with wells, pipelines, and facilities]

---

### Well Log Exploration

Geological data can be difficult to interpret when hidden inside spreadsheets or specialized software. GeoPorto provides interactive visualizations for well logs, helping users quickly understand subsurface characteristics without requiring advanced desktop applications.

[Insert Image: Well log visualization showing GR, RHOB, and NPHI tracks]

---

### Document Intelligence with GAIA

One feature I was particularly excited to build was GAIA, an AI assistant integrated directly into the platform. GAIA allows users to search technical documents using natural language.

Instead of manually opening multiple reports, users can ask questions such as:

> "What drilling challenges were encountered in this well?"

or

> "What lessons learned were documented during this campaign?"

The assistant retrieves relevant information from indexed documents and provides answers linked to their original sources.

[Insert Image: GAIA AI assistant answering questions with document references]

_note: this AI is just a prototype_

---

## Why AI Was Included

The goal of GAIA was never to replace domain expertise. **It was designed to reduce the friction of finding information.**

Many organizations already possess years of valuable technical knowledge. The problem is that much of it lives inside reports that are difficult to search and difficult to reuse. By combining document indexing, vector search, and large language models, GeoPorto turns static documents into searchable knowledge.

---

## Technology Choices

The technology stack was intentionally simple.

### PostgreSQL + pgvector
A single database stores both structured operational data and AI embeddings. This keeps everything connected and avoids maintaining separate systems.

### Next.js
Provides a modern full-stack framework that allows both frontend and backend functionality to live within a single codebase.

### Leaflet
Used for geospatial visualization and interactive asset mapping.

### Plotly
Used to render geological and operational visualizations containing large volumes of data.

### OpenAI + Vercel AI SDK
Powers GAIA and the document retrieval workflow.

> The objective was not to chase the latest technology. The objective was to select tools that solved the problem while keeping the architecture understandable.

---

## What I Learned

This project taught me that building software is often less about code and more about understanding information. The hardest challenge wasn't creating charts or integrating AI. **It was designing a data model capable of representing how geoscientists, drilling engineers, and project teams think about assets.**

I also learned that successful AI systems depend heavily on data organization. Good retrieval starts long before the model generates an answer. It starts with clean relationships, meaningful metadata, and thoughtful information architecture.

Most importantly, this project reinforced something I already suspected:

> The future of technical workflows will not be driven solely by better analysis tools. It will be driven by making knowledge easier to access.

---

## Looking Ahead

GeoPorto is still evolving. Future improvements I want to explore include:

* LAS file support and advanced well log visualization
* Predictive analytics for drilling and production workflows
* Smarter document ingestion and chunking strategies
* Collaborative annotations and knowledge sharing
* Expanded AI capabilities through GAIA

The project began as an experiment to solve a personal frustration. It has since become a playground for exploring how geoscience, data engineering, and AI can work together to make technical knowledge more accessible.

And honestly, that is still the part I find most exciting.
