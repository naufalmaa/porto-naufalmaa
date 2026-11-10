[FACTS:
Title | Data Scientist & Analyst
;; Role | PIC, leading product, data, and engineering
;; Client | SKK Migas, Exploration Division
;; Company | Waviv Technologies
;; Period | 2024 to present
;; Stack | React, Fastify, PostgreSQL, PostGIS, pgvector, TypeScript, Python, open-weight LLMs
]

[OG: /asset/projects/geosurvai/og.jpg]

[VIDEO: /asset/projects/geosurvai/tour.mp4 | /asset/projects/geosurvai/tour-poster.jpg | A 30-second tour of the demo environment: dashboard, map, timeline, survey details, and Zara. All screens use a fictional operator, and cost values are masked. | loop]

[STATS:
12 | feature modules in one platform
;; 17 | readiness checks tracked per survey
;; 100+ | database tables aligned to PPDM 3.9
;; 43/45 | evaluation questions Zara answers correctly on a self-hosted model
]

## Overview {#overview}

Geosurvai is the platform the Exploration Division of SKK Migas uses to oversee exploration work across Indonesia. It tracks seismic and non-seismic surveys, technical studies, permits, and costs, from the first work program proposal to close-out.

The first versions were built with Toto Sugito leading the codebase. Today I am the person in charge of the platform. As a data scientist, I lead the product, the data model, and the engineering end to end, and I work directly with the stakeholders at SKK Migas.

## The problem {#problem}

SKK Migas supervises exploration carried out by many production sharing contractors (KKKS) in working areas across the country. Before Geosurvai, updates arrived by email: a progress report as a PDF, a budget revision in Excel, a permit status in the body of a message.

Answering a simple question meant opening each file and copying numbers into a master spreadsheet. How much has been spent on active seismic this year? Which surveys are behind schedule? People ended up with different numbers, and cost problems surfaced late.

So the goal was a complete workflow rather than another dashboard: contractors enter data once, and everyone downstream works from that same record.

```flow
Collect | Contractors enter data once | #collect
Monitor | Map, dashboard, timeline | #monitor
*Ask | Question the data in plain language | #ask
Evaluate | Benchmark proposed costs | #evaluate
Share | Reports and investor catalog | #share
```

```glossary
KKKS | Production sharing contractors operating in Indonesia
WK | Working area, the contract block a contractor operates
AFE | Authorization for Expenditure, the approved budget for an activity
PUPOS | The readiness and permit checklist before a survey starts
SPAR | The seismic acquisition and recording parameters of a survey
```

## Collect: enter data once {#collect}

Contractors update their surveys through structured forms instead of sending attachments. Each survey has one page with five tabs: summary, activity, resources, technical parameters, and readiness.

The readiness tab is where the domain gets specific. A seismic crew cannot mobilize until environmental approval, explosives permits, shipping notices, community socialization, and more are in place. Geosurvai tracks progress and notes for each check, so a stalled permit is visible before it delays the survey.

[CAROUSEL:
/asset/projects/geosurvai/survey-readiness.webp | Readiness: each of the 17 checks carries its own progress and notes.
;; /asset/projects/geosurvai/survey-summary.webp | Summary: objective, plan versus actual dates, and location.
;; /asset/projects/geosurvai/survey-activity.webp | Activity: planned quantity, contract, AFE status, and outlook.
;; /asset/projects/geosurvai/survey-resources.webp | Resources: target play, leads, prospects, and P50 estimates.
;; /asset/projects/geosurvai/survey-parameters.webp | Parameters: seismic acquisition settings, validated against a parameter matrix.
]

Access follows the working area. Contractors see only the areas assigned to them, and that rule is enforced in the database with row-level security as well as in the interface.

| | Admin | SKK Migas analyst | Contractor (KKKS) | Guest |
| --- | --- | --- | --- | --- |
| Surveys and studies | All, edit | All, read | Own working areas, edit | Summary only |
| Maps and dashboards | Yes | Yes | Own working areas | Basic |
| Cost analysis (AFE) | Yes | Yes | No | No |
| Zara | Yes | Yes | No | No |
| Uploads, users, LLM settings | Yes | No | No | No |

*Who sees what. The same rules apply in the interface, the API, and the database.*

For bulk updates I built an import flow for working areas, subsurface records, exploration structures, and software licenses. It reads the official working-area shapefiles, lets an admin map each column, and includes a polygon editor for boundaries. A preview reports every row the system would refuse, and a completed import can be rolled back as one batch.

## Monitor: see it without asking {#monitor}

The dashboard answers the questions that used to start an email thread: how many surveys are active, how much of the plan is done, and what status each one is in. Filters for year, holding, working area, and activity type stay in place as you move between pages.

[CAROUSEL:
/asset/projects/geosurvai/dashboard.webp | Monitoring dashboard: totals, map, and surveys ranked by length.
;; /asset/projects/geosurvai/dashboard-status.webp | Status by survey type, with cumulative plan versus actual work.
;; /asset/projects/geosurvai/dashboard-wpb.webp | Work program status by commitment type.
;; /asset/projects/geosurvai/timeline.webp | Survey timeline, colored by status.
;; /asset/projects/geosurvai/map.webp | Survey activity against working area and maritime boundary layers.
]

## Ask: how I tuned Zara {#ask}

Zara is Waviv's AI assistant for knowledge management. In Geosurvai it lets people question exploration data in plain language, mostly in Indonesian, such as "List this year's 2D seismic surveys", and it can be opened from any dashboard or catalog page. Getting a language model to write a query is easy. Getting it to write the right query for this organization's data, every time, is the work I am proudest of.

Generic text-to-SQL fails here in predictable ways. It counts "carry over" surveys as new ones, adds kilometers of 2D seismic to square kilometers of 3D, and mixes planned with realized budgets. Each mistake gives a confident and wrong answer.

### What I tuned

- **Intent first.** Every question is sorted into concept, data, or ambiguous. Mentioning "AFE" or "KKKS" does not make a question a data query, so Zara does not run SQL to answer "what is an AFE?".
- **Only the schema that matters.** The full schema is about 9,600 tokens. Zara retrieves only the tables and columns relevant to the question, which keeps prompts short and the model focused.
- **The data owner's vocabulary.** I wrote a glossary and status rules in the words the evaluators use, such as what counts as carry over or carry forward and which unit belongs to each survey type.
- **Verified examples.** Each prompt carries worked examples in Indonesian that I checked against the real database, including PostgreSQL-specific ones.
- **Self-correction that learns.** If a query fails, Zara reads the database error and retries up to three times. A fix that works is saved as a rule for next time, and users can teach rules in plain language.
- **A cache for repeated questions.** Questions are normalized for synonyms and matched by similarity, so a reworded question reuses a query that already worked.
- **Answers people can use.** Zara picks a chart from the shape of the result, offers the nearest values when nothing matches, and links each row to its detail page.
- **A loop for failures.** Users rate answers, and admins review every question Zara could not answer on one page. A fix made there becomes a rule.

```pipeline
Classify | Concept, data, or ambiguous
Retrieve | Relevant schema and saved rules
*Generate | SQL with glossary and verified examples
Validate | Read-only check, then run on restricted views
Repair | Up to 3 retries, then save the fix
Answer | Table, summary, and links to real pages
```

[VIDEO: /asset/projects/geosurvai/zara-demo.mp4 | /asset/projects/geosurvai/zara-demo-poster.jpg | Zara answering a new question on demo data: reasoning, a chart chosen from the result, and a summary. The wait is shown at 3x speed.]

[CAROUSEL:
/asset/projects/geosurvai/zara-reasoning.webp | Zara shows its reasoning and a chart chosen from the result before it answers.
;; /asset/projects/geosurvai/zara-answer.webp | The answer: a summary in the user's language, built only from those rows.
]

### Measured, not guessed

Every change to Zara has to pass an evaluation set of 45 questions, from survey status and carry-over rules to AFE, reserves, and "this year" questions. Each is checked against a reference SQL query, not judged by eye. On the demo dataset, with the self-hosted model alone, the first run scored 40 of 45. Reading the misses showed four patterns, such as a total split by working area and recoverable volumes used for an in-place question. Four new rules later, the next full run scored 43 of 45. The two remaining misses ask for in-place volumes that the demo data does not contain, and Zara's queries for them were correct. I also benchmarked several open-weight models on the same 10,000-token SQL prompt. Generation time ranged from about 15 seconds to about 51 seconds, which shaped which model handles which step. Zara runs on a self-hosted model.

### Guardrails

Safety comes from layers rather than from trusting the prompt: input checks, a validator that accepts only read-only queries, and a database role that cannot write. Links under an answer are built from the query and its columns, never from the model's text, so they always point to a page that exists. Zara answers from structured records today. It does not yet read PDF reports.

## Evaluate: is this cost reasonable? {#evaluate}

When a contractor proposes a survey budget, an evaluator has to judge whether the price is fair. The evaluator enters the proposal, and Geosurvai compares it with similar historical projects. The result is a benchmark score, a position within the comparable group, and a plain recommendation, backed by trend fits, IQR and Z-score outlier tests, an economies-of-scale check, and a comparison of each cost component.

[CAROUSEL:
/asset/projects/geosurvai/afe-benchmark.webp | Benchmark score and executive assessment for a sample proposal.
;; /asset/projects/geosurvai/afe-composition.webp | Each cost component compared with its historical share.
;; /asset/projects/geosurvai/afe-outlier.webp | Unit price tested with IQR and Z-score.
;; /asset/projects/geosurvai/afe-scale.webp | Is a larger survey priced like one?
]

For geoscientists, the Annual Seismic view maps acquisition parameters across years. Pick a parameter such as fold coverage, and each survey appears on the map colored by its value, showing how acquisition design differs between basins and over time.

![Annual Seismic view showing fold coverage by location.](/asset/projects/geosurvai/annual-seismic.webp)

## Share: reports and the investor catalog {#share}

One click turns the current data into a PowerPoint deck with plan versus actual slides, seismic and non-seismic tables, and a closing summary. Studies have their own dashboard and S-curve. The Exploration Catalog presents working areas to prospective investors and farm-in partners, with public, restricted, and internal visibility.

[CAROUSEL:
/asset/projects/geosurvai/report-slide.webp | A generated plan versus actual slide.
;; /asset/projects/geosurvai/study-scurve.webp | Plan versus actual S-curve for studies.
;; /asset/projects/geosurvai/study-dashboard.webp | Study dashboard: studies, software licenses, and exploration structures.
;; /asset/projects/geosurvai/study-map.webp | Study locations across Indonesia's basins.
]

## Rebuilding the foundation {#rebuild}

Geosurvai grew on MongoDB, and the flexible documents that helped early on became a problem as more of the organization depended on the data. Names drifted, relationships lived in text, and Zara needed its own synced copy. I led the migration to PostgreSQL, modeled as closely as practical on PPDM 3.9, while keeping the terms users already know.

```callout
What is PPDM?
PPDM is a data model published by the Professional Petroleum Data Management Association, a non-profit backed by operators and software vendors. It defines how wells, seismic surveys, land rights, facilities, reserves, and documents relate to each other.

Following it means Geosurvai's data speaks the same language as other industry systems, which makes integration and handover far easier than with a custom schema.
```

```arch
Before: React web app > Node.js API > MongoDB documents > SQLite copy > Zara as a separate Python app
After: React web app > Fastify API with Zara and import modules > *PostgreSQL on PPDM 3.9: PostGIS, row-level security, read-only AI views > pgvector document search (next)
```

- **Standard model.** More than 100 tables, with 76 mapped terms linking the old vocabulary to PPDM.
- **Repeatable migration.** An idempotent pipeline with data quality gates, so a rerun gives the same result.
- **Proof, not hope.** A cell-level round-trip test compared 196,207 values between the old and new models, and every difference was explained.
- **Safe rollback.** The application can still switch back to MongoDB with a single setting.

Release v7 ships the new foundation as a Docker stack on the client's own server, with install, update, backup, restore, and rollback scripts. Each release rehearsal runs a smoke test, 124 backend unit tests, and the end-to-end suite against the final data. I also built a separate demo environment with a fictional operator, moved coordinates, altered values, and an automated leak check, so the product can be shown without exposing client data.

## What I learned {#lessons}

**An assistant is only as good as its vocabulary.** Most of Zara's accuracy came from writing down what the evaluators mean by their own terms, not from a bigger model.

**Domain depth changes the design.** I could only model permits and survey parameters well after I understood why each one matters in the field.

**Prove migrations with data.** Stakeholders trust a comparison they can inspect far more than an assurance from the team.

**Be clear about what AI cannot do.** Zara is useful because its limits are stated and its access is tightly constrained.

## What comes next {#next}

- Run release v7 in production and retire the MongoDB fallback.
- Add a review and approval flow for contractor submissions.
- Let Zara search reports and meeting minutes using the vector schema already in place.

```callout
Want to see how it works?
Everything above comes from a demo environment with fictional data, so some details stay behind the screen. If you would like a live walkthrough of the demo, send me a direct message on [LinkedIn](https://www.linkedin.com/in/naufal-muhamad-adzkia/) and I will be happy to show you around.
```

[NEXT: geoporto]

*This article describes my work at Waviv Technologies for SKK Migas. All screenshots and videos use a demo environment with fictional names, and cost values are masked. No client data is shown.*
