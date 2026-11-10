[FACTS:
Title | Data Scientist & Analyst
;; Role | PIC, leading product, data, and engineering
;; Client | Production & Operation Team, PHE OSES
;; Company | Waviv Technologies
;; Product | Proview, the production module of Waviv Nav Pro
;; Period | 2025 to present (pilot)
;; Stack | Python, LightGBM, PostgreSQL, Fastify, React, open-weight LLMs, MCP
]

[OG: /asset/projects/proview/og.jpg]

[VIDEO: /asset/projects/proview/tour.mp4 | /asset/projects/proview/tour-poster.jpg | A short tour of the demo environment: the risk map played day by day, an at-risk well and the reasons behind its score, then the visit plan. All names and values are fictional. | loop]

[STATS:
11.4M | daily well records, from 1970 to 2025
;; 3 | risk horizons: 7, 14 and 30 days
;; ~5x | more failures among flagged wells than the base rate
;; 17 | read-only data tools shared by Zara and other agents
]

## Overview {#overview}

Proview is the production module of Waviv Nav Pro, built for the Production & Operation Team of PHE OSES, an offshore oil and gas operator in Indonesia. It turns daily production reports into dashboards, maps, an early warning of well failures, a plan for which platform each boat should visit, and Zara, the assistant that answers questions about all of it.

The first versions were built by Toto Sugito and Fahira, who also moved the backend to TypeScript. My first part, in 2025, was the Python data layer that moved the Excel history into a production datamart. Today I am the person in charge of Proview. As a data scientist, I lead the product, the data, and the engineering, and I built the Early Warning System and the current Zara end to end. Proview is in pilot.

## The problem {#problem}

Offshore wells stop. A pump trips, sand blocks the tubing, or water takes over. On an offshore field every fix needs a boat, so a failure found late costs twice: the oil not produced while the well is down, and a trip planned in a hurry.

Before Proview, a failed well was noticed in the next day's report, one well at a time. Boats were sent to fix what had already failed, and sometimes went back to the same platform a few days later for its neighbour. The question I wanted to answer every morning was different: which wells are likely to stop in the next two weeks, and which trip handles the most of them at once?

```flow
Collect | Daily reports in, names and duplicates checked | #data
Score | Risk of failure in 7, 14 and 30 days | #model
*Plan | Which boat goes to which platform | #plan
Ask | Questions in plain language, answered from data | #zara
```

```glossary
ESP | Electric submersible pump, the pump that lifts oil in most of these wells
BSW | Basic sediment and water, the share of a well's fluid that is not oil
MAOP | Maximum allowable operating pressure of a pipeline
Deferment | Oil not produced because a well is down
PR-AUC | How well a model ranks rare events; a random guess scores the base rate
```

## A data foundation first {#data}

Everything starts from files. Daily production, riser, potential, well integrity, and water overboard reports arrive as Excel. Proview checks each upload before it touches the datamart: unknown wells and platforms, name variants such as "W-01" for "WELL-001", and rows that already exist. An engineer resolves the problems once, and the alias is remembered.

Behind the screens sit 11.4 million daily well records going back to 1970. In 2025 I wrote the pipeline that moved that history from spreadsheets into the datamart, and the summary APIs that read from it. That datamart is what made a model possible later.

[CAROUSEL:
/asset/projects/proview/daily-production.webp | The daily production datamart: every well, every day, searchable and filterable.
;; /asset/projects/proview/daily-report.webp | The daily report: running wells, oil, and gas by work group against target.
]

## Defining a failure {#failure}

The first decision was not about models. It was about what counts as a failure.

```callout
What is a failure?
A well fails when its oil goes from above zero to zero and stays there for at least two days, after averaging more than 5 barrels a day the week before.

**Why two days?** Of 5,260 drops to zero since 2019, 1,268 lasted a single day. Those are mostly test days or gaps in reporting. Counting them would teach the model to predict paperwork. Leaving them out kept 3,992 real failures.
```

The same rule feeds the model, the risk map, and the replay, so a number on one screen always means the same thing on another.

## The risk model {#model}

For each well and each day, Proview estimates the chance that the well fails within 7, 14, and 30 days. Each horizon has its own LightGBM model trained on 23 features: oil and water-cut trends, pressures, ESP current against its underload and overload limits, ESP run life, the well's own failure history, and how many neighbours on the same platform are down.

```pipeline
Label | Failures of two days or more, from daily oil
Features | 23 signals per well per day
*Train | One LightGBM per horizon, split by time
Calibrate | Isotonic, on months the model did not train on
Score | 87,604 well-days it never saw
Explain | Top drivers per well, in plain words
```

The split is by time, never at random. The model trained on data up to September 2023, was calibrated on the next seven months, and was scored on May 2024 to May 2025. That is the only honest way to test a forecast: it never sees the future it is asked about.

| Horizon | Base rate | PR-AUC | ROC-AUC |
| --- | --- | --- | --- |
| 7 days | 2.6% | 0.095 | 0.705 |
| 14 days | 4.8% | 0.107 | 0.678 |
| 30 days | 9.1% | 0.152 | 0.665 |

*Scored on data the model never saw. A random guess would score the base rate as PR-AUC.*

Those numbers look small, so here is what they mean on the ground. At the default threshold, about one in four flagged wells really stopped within 14 days, against fewer than one in twenty for wells in general.

![A flagged well is about 5 times more likely to fail than the base rate.](/asset/projects/proview/model-lift.webp)

Each score comes with its reasons. The well page shows the drivers behind it, such as unstable oil over the last week or a pump running close to its underload limit, next to a cross-section of the platform with every wellbore coloured by its state. If the model is switched off, Proview falls back to a transparent rules score so the screens still work, and says so.

```callout
What the model cannot do
**It misses most failures early.** Only about 12% of failures were flagged seven days or more ahead. Many wells fail with no warning in daily data.

**It is a ranking, not a verdict.** Probabilities stay low, so the threshold is set at 0.10, about twice the average 14-day rate, not at 0.5.

**It sees daily data only.** Sensors at minute resolution would help, and that is the next step, not a claim.

I would rather show these limits than have an engineer discover them on a bad day.
```

## From a score to a boat {#plan}

A risk score only matters if it changes what happens tomorrow. Take one demo day, 18 October 2024. The risk map shows 40 wells already down and 7 wells at risk. Four of those seven did stop within the next 14 days.

The Visit Planner turns that picture into trips. Platforms with failed wells come first, then barrels protected per unit of cost. One boat serves one platform a day, sea distance comes from real sea routes, and an at-risk well on a platform the boat is already visiting is added to the same trip. A manager accepts or drops each proposed visit, and the decision is stored.

[CAROUSEL:
/asset/projects/proview/risk-map.webp | Risk map for 18 October 2024: failed and at-risk wells by platform, with a player that steps day by day.
;; /asset/projects/proview/well-section.webp | Platform cross-section: every wellbore coloured by its state, with its 7-day oil and pump current.
;; /asset/projects/proview/well-drivers.webp | One at-risk well: its chance of failing in 7, 14 and 30 days, its last 30 days, and the drivers of its score.
;; /asset/projects/proview/visit-plan.webp | Visit plan for the next 7 days: vessel, platform, work type, barrels, and sea route.
;; /asset/projects/proview/replay.webp | Scenario Simulator: the same plan replayed over a year of history.
]

## Replay, read carefully {#replay}

The Scenario Simulator replays the planner over a year of history: what if this plan had been followed every day? On the demo data, oil lost to failures drops by about 85%, the median time a failed well stays down falls from 15 days to 3, and boat trips per well handled fall by about 28%.

```callout
Why 85% is a ceiling
The replay assumes every visit fixes the well and that history was slow only because nobody visited. In reality, rigs, spare parts, and approvals also cause delays, and those are inside the history. So the 85% is an upper bound on what better timing alone could give, not a promise.
```

## Zara, with numbers that cannot be made up {#zara}

Zara is Waviv's AI assistant for knowledge management. In Proview it answers questions such as "Which platforms are most at risk today, and why?" in English or Indonesian, from any page. The "Ask Zara" buttons carry the filters and the well you are looking at, so you never have to retype the context.

The rule I built Zara around is simple: **every number in an answer must exist in the data.**

- **Evidence first.** Zara gathers the facts with read-only tools, then writes. Any figure in the text that is not in that evidence is rejected, and Zara falls back to a table built straight from the data.
- **Seventeen deterministic tools.** Risk, visit plan, top wells, production trends, pipelines, and more. The same tools are exposed to other agents over MCP, so another assistant gets the same answer as Zara, not its own guess.
- **Actions wait for a person.** "Add PLT-028 to the visit plan" produces a confirmation card. Nothing is saved until an engineer presses Confirm.
- **Cause tagging with quotes.** When a failure has no cause, an LLM reads the field remarks around it and must quote the words it relied on. If the quote is not in the remarks, the tag is dropped. Checked against the keyword rules, the two agreed on 71% of cases.
- **It still works without the model.** If the self-hosted model is unreachable, Zara answers with templates and cards, and labels the answer as such.

[VIDEO: /asset/projects/proview/zara-demo.mp4 | /asset/projects/proview/zara-demo-poster.jpg | Zara on demo data: a question about risk answered with figures and a table, then a visit-plan action that waits for confirmation. Waiting time is shortened.]

![Zara's answer: a short summary, the figures it is built on, and links to the risk map and visit plan.](/asset/projects/proview/zara-answer.webp)

## Privacy by design {#privacy}

Every screen in this article comes from a demo copy of the data, and I built that copy so the features still work on it. Names are replaced everywhere, including inside free-text remarks. Coordinates are rotated as one rigid block and moved out to sea, with a check that every platform and pipeline still sits in water, so sea routes and travel times stay realistic. Volumes are scaled by one secret factor, so ratios such as water cut stay true while barrels no longer match the real field.

```pipeline
Map names | Fields, platforms, wells, pipelines, and text
Move | Rotate and shift every coordinate, then check it is at sea
Scale | Volumes by one secret factor; pressures untouched
*Check | Scan every screen and API answer for real names
Demo | A separate database the product can be shown on
```

## Shipping it {#shipping}

The rest of Proview covers the daily surveillance work: production against target, top wells and the ones falling, a surveillance map with pipelines drawn on their real routes, pipelines near their pressure limit, and the capacity of the pipeline network if production rises.

[CAROUSEL:
/asset/projects/proview/production-summary.webp | Production summary: oil, gas, and water against potential and targets.
;; /asset/projects/proview/top-wells.webp | Top wells: who moved up or down the ranking, with "Ask Zara" on the current filter.
;; /asset/projects/proview/surveillance-map.webp | Surveillance map: platforms by performance, work groups, and pipelines.
;; /asset/projects/proview/pipeline-watch.webp | Pipeline watch: pipelines by pressure against MAOP, and the oil flow through the field.
;; /asset/projects/proview/flow-assurance.webp | Flow assurance: how much capacity each pipeline uses, and what changes if rates rise up to 20%.
]

Pipeline watch runs on synthetic pressure data in the demo until it is connected to the field's SCADA, and flow assurance computes capacity, not pressure. The interface is fully bilingual, English and Indonesian. A Cypress suite of 69 end-to-end cases covers every menu and passed in full in the last test report, and the release ships with an install guide for the client's own server.

### Working with AI agents, with guardrails

I used AI coding agents heavily on Proview, and the repository is set up so they stay disciplined. The API contract and the database schema are generated into one document that both sides read, so the frontend never guesses a field name. A hook blocks a frontend session from opening backend code and the other way round. Every task ends in one small commit with a conventional message, and nothing touches the database or the remote without my approval. The speed came from the agents. The reliability came from those rules.

## What I learned {#lessons}

**The label is the model.** Deciding that a one-day zero is not a failure changed the results more than any feature did.

**Honest metrics build trust.** Showing what the model misses is what makes the rest of it believable.

**A score needs a decision attached.** The risk map became useful the day it produced a visit plan.

**Let the data speak, not the model.** Zara is trusted because it cannot invent a number.

## What comes next {#next}

- Connect sensor data from the field historian so the model sees more than one value a day.
- Send a short morning summary of the platforms most at risk.
- Export the visit plan for the marine team in one click.

```callout
Want to see how it works?
Everything above comes from a demo environment with fictional data, so some details stay behind the screen. If you would like a live walkthrough of the demo, send me a direct message on [LinkedIn](https://www.linkedin.com/in/naufal-muhamad-adzkia/) and I will be happy to show you around.
```

*This article describes my work at Waviv Technologies for the Production & Operation Team of PHE OSES. All screenshots and videos use a demo environment with fictional names, moved coordinates, and scaled volumes. No client data is shown.*
