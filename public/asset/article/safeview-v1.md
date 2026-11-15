[FACTS:
Title | Data Scientist & Analyst
;; Role | PIC, leading product, data, engineering, and AI
;; Client | Offshore oil and gas operator, HSE Team
;; Company | Waviv Technologies
;; Product | SafeView, the HSE module of Waviv Nav Pro
;; Period | 2025 to present (in production)
;; Stack | Python, FastAPI, open-weight LLMs, OCR, PostgreSQL, Fastify, React, Cypress
]

[OG: /asset/projects/safeview/og.jpg]

[VIDEO: /asset/projects/safeview/tour.mp4 | /asset/projects/safeview/tour-poster.jpg | A short tour of the demo environment: the HSE dashboard, a contractor assessment, the choice between a fast and a thorough AI review, then the AI result next to the evaluator's score. All names and values are fictional. | loop]

[STATS:
29 | safety elements scored in every contractor review
;; 3 | AI jurors plus a consensus, each quoting its evidence
;; 27/29 | elements within one level of the evaluator on a real contract
;; 0 | invented scores when the language model is down
]

## Overview {#overview}

SafeView is a safety-first HSE platform, the HSE module of Waviv Nav Pro. It brings three things into one application: safety performance and daily field reports, the people who do the work with their certificates and medical checks, and the documents that prove a contractor works safely. It is in daily use in production.

I am the person in charge of SafeView. I take the requests from the HSE team of an offshore oil and gas operator in Indonesia (PHE OSES), decide what we build, and deliver it. Toto Sugito and Fahira are on my team and built much of the platform with me. The part I built end to end, and the subject of this article, is AI CSMS: an AI that pre-scores contractor safety documents, shows the evidence behind every score, and leaves the final decision to the evaluator. It works like a peer assistant: it does the first careful read, shows its work, and the evaluator decides.

## The problem {#problem}

Every contractor that works offshore for the operator goes through CSMS, the Contractor Safety Management System. Twice a year, a contractor uploads its proof of safety management: procedures, risk registers, meeting minutes, training records, inspection reports, audit results. The evidence is sorted into 29 elements of the K3LL standard, from leadership commitment to incident reporting.

An evaluator then reads it all and scores each element 0, 3, 6, or 10. A verifier checks the scores and a manager signs them off. On one real contract I tested, a single review held 278 files, and 49% of the PDFs were scans with no text layer. The work is careful, repetitive, and slow, and two evaluators can read the same folder differently.

```flow
Upload | Contractor files sorted into 29 elements | #problem
*Pre-score | AI reads, checks, and scores each element | #jurors
Review | Evaluator accepts, edits, or corrects the AI | #people
Sign off | Verifier, then manager | #people
```

```glossary
CSMS | Contractor Safety Management System, the review every contractor must pass
K3LL | The Indonesian term for occupational health, safety, and environment (HSE)
PB | Penilaian Berjalan, the ongoing review of a contractor during its contract
OCR | Reading the text out of a scanned page
TRIR | Total recordable incident rate, recordable incidents per hours worked
```

## First, make it honest {#honest}

When I took over the AI scoring, it seemed to work well. Almost every element passed. That was the problem.

```callout
The AI that always passed
When the language model failed, timed out, or returned broken output, the old code filled in a default answer. That default was rounded to the top score, 10, with a reason that sounded convincing. A server outage looked exactly like a perfect contractor.

**What changed.** A failed element is now labelled "AI could not score this element", its previous score and status stay as they were, and the folder is never locked. I tested it by switching the language models off in the middle of a review: all 29 elements came back labelled, and not one score was invented.
```

The same review found smaller faults that pushed in the same direction: jobs that stayed "queued" forever and locked a folder, a failed run announced as "AI evaluation finished", and a rubric search that could pick the wrong element's criteria. I fixed those before improving anything else. An AI that is wrong in a visible way can be improved. An AI that is wrong in a flattering way loses the evaluators' trust.

## Reading what contractors really send {#reading}

The first test on real data showed why the scores were off: the AI was not reading most of the evidence. OCR never succeeded on the scanned PDFs, each juror saw only the first 15,000 characters of an element, and files inside RAR archives were skipped without a word.

```pipeline
Unpack | PDF, Office, images, and ZIP, 7Z, or RAR archives, with size limits
Read | Text pages directly; scanned pages through a vision model, with a second OCR as fallback
Cache | Each file is read once and kept, so a rerun only reads new files
*Budget | Every file gets a share of the evidence, and the juror sees the full file list
Note | Files that could not be read are named in the AI note
```

Every file now gets its share of the space instead of the first files taking it all, and anything the AI could not read is listed in the note. "Not seen" is no longer treated as "not there".

## Three jurors and a rule {#jurors}

Evaluators asked for two different things: a quick check right after a contractor uploads, and a careful score for the final review. So the AI has two modes, and the evaluator picks one every time.

- **Fast.** The important pages of each file, one juror, at most 10 minutes per element. Good for pre-screening.
- **Thorough.** Every page, a summary of each file against the rubric, three jurors (Compliance, Evidence, and HSE), and a consensus.

The bigger change was how a score is made. The rubric for each element is written as checks, such as "signed minutes of the monthly safety meeting". Each check is marked as core, main, or supporting. A juror does not pick a number. It marks every check as met, partly met, or not met, and quotes the words it relied on. Then code computes the score from the checklist:

- **10** when all core and main checks are met and at least half of the supporting ones.
- **6** when no core check is missing and at least 60% of the main checks are met.
- **3** when evidence exists but a core check is missing.

Each quote is matched against the text of the documents, and a quote that cannot be found is dropped. Agreement between jurors, verified quotes, and checklist coverage combine into a confidence score. Below 0.85, the note says "needs evaluator review" and gives the reason.

To show the rule at work, I wrote synthetic evidence for one demo review at three levels: complete files for 9 elements, files with gaps for 12, and files missing a core document for 8, with three of them as scans only. I set the evaluator's scores to match, then ran a thorough AI review of all 29 elements, which took 32 minutes. The AI gave the same score on 24 of 29 elements and never went more than one level up or down on 28 of them. On the five it missed, it was stricter than the evaluator, the same pattern I saw on real data.

![The same rule at three levels of evidence: every check met gives 10, a core document present but gaps elsewhere gives 6, a missing core document gives 3.](/asset/projects/safeview/tiers.webp)

[VIDEO: /asset/projects/safeview/ai-run.mp4 | /asset/projects/safeview/ai-run-poster.jpg | Starting a thorough AI review of 29 elements on the demo: the mode choice, then live progress per element. Waiting time is shortened.]

[CAROUSEL:
/asset/projects/safeview/ai-mode.webp | The evaluator chooses Fast or Thorough before every run, with what each one reads and how long it takes.
;; /asset/projects/safeview/ai-note.webp | The AI note for one element: the conclusion, the rubric checklist, and the findings and evidence of each of the three jurors.
;; /asset/projects/safeview/element-rescore.webp | One element, or one group, can be rescored on its own, for example after the contractor uploads a missing file.
]

## Calibrating against evaluators {#calibration}

On a real contract, the first full run matched the evaluator exactly on 19 of 29 elements, and 27 of 29 were within one level. More telling was the direction: whenever the AI and the evaluator disagreed, the AI was stricter. A one-sided gap is not noise. It points to a rule.

The rule was in the rubric. To reach 6, many elements required every condition at once: this procedure AND that record AND an emission test AND an award. Missing one secondary document, such as a vehicle emission test on a vessel contract, dropped the whole element to 3. Evaluators judge the evidence as a whole. A literal-minded AI does not. Classing the checks as core, main, or supporting fixed most of it, and three checks that read backwards were rewritten. One of them punished a contractor for having no sanctions on record.

| Fast mode, same contract, 29 elements | Before | After |
| --- | --- | --- |
| Same score as the evaluator | 5 | 11 |
| Within one level | 23 | 23 |

*Fast mode reads less, so it matches less often than a thorough run. In a thorough run on seven test elements, all seven scored with confidence of 0.85 or higher.*

```callout
What these numbers do not prove
**They come from one contract.** Some of the evaluator corrections used for calibration came from the same folder, so the gain is likely optimistic. The next test runs on other finished reviews.

**Closer to the evaluator is not always better.** The rubric is the written standard. Tuning the AI towards how evaluators work in practice is a policy decision for the HSE team, not for me.

**Confidence means consistency.** Two elements were scored with confidence of 0.95 and still differed from the evaluator.
```

## People stay in charge {#people}

The AI score is a recommendation. The evaluator's score is the one that counts, and the product is built around that.

- **Compare first.** The AI result view puts the manual and AI scores side by side, per category and per element, with the share that matches, the share within one level, and the elements with low confidence. It exports to Excel.
- **Apply with a preview.** An evaluator can apply AI scores to elements not yet scored, preview them first, and undo the last apply in one click. By default, only results with confidence of 0.85 or higher are offered.
- **Corrections teach the AI.** When an evaluator overrides a score, they can write why. The jurors receive up to three of those corrections for the same element on the next run.
- **The rubric is versioned.** Admins edit the rubric in the app or import it from Excel. Each version can be tried on finished reviews and compared with the evaluator before it is switched on, and every AI result records which version produced it.

[CAROUSEL:
/asset/projects/safeview/ai-result.webp | AI result for one review: manual against AI per category, the share that matches, and the elements that need a second look.
;; /asset/projects/safeview/contract-folder.webp | The review folder: every element with the evaluator's status and score next to the AI's, and a flag where they differ.
;; /asset/projects/safeview/assessment-panel.webp | The review panel: approval by evaluator, verifier, and manager, the AI score, and the AI actions.
;; /asset/projects/safeview/ai-quality.webp | AI quality: how often the AI agrees with evaluators, element by element, with a link to fix the rubric where it does not.
;; /asset/projects/safeview/ai-rubric.webp | The rubric editor: criteria per element, a quality checker for each one, version history, and Excel import and export.
;; /asset/projects/safeview/ai-calibration.webp | The calibration guide, built into the app, so the HSE team can tune the rubric without me.
]

## How I tested it {#testing}

I tested the AI the way the HSE team would use it, on a PostgreSQL copy of the demo with real PDF files and no mocks, and with tests that fail when the database or the AI engine cannot be reached.

- **Fake evidence.** I replaced three documents with a cooking recipe, an expired draft, and a nearly blank page. All three dropped from 10 to 3 with status "revise".
- **Stability.** Scoring the same contract twice gave the same score on 26 of 26 elements.
- **Outage.** With the language models switched off, the review still finished, every element was labelled, and nothing was invented.
- **Recovery.** A job interrupted by a restart is closed or resumed when the engine starts again, so a folder is never stuck.
- **Coverage.** 28 unit tests on the engine and Cypress suites on the API, the job lifecycle, and the screens.

Two weaknesses remain, and I list them in the test report. The engine never gives 0 when files exist, even for irrelevant ones, which is a product decision still open. And stability is proven on clear-cut scores, not yet on the middle score of 6.

## The platform around it {#platform}

The rest of SafeView covers the daily HSE work. The performance dashboard shows safe days, safe manhours, TRIR, and the safety pyramid for project and marine operations. Daily reports record manpower, permits to work, drills, inspections, and sea conditions. Worker records track medical checks, certificates, and days on board. Safety observation cards can be uploaded in bulk and checked against the worker list.

[CAROUSEL:
/asset/projects/safeview/hse-performance.webp | HSE performance: safe days, safe manhours, TRIR, and leading indicators for the year.
;; /asset/projects/safeview/safety-pyramid.webp | The safety pyramid for production and marine, next to the leading indicators.
;; /asset/projects/safeview/daily-activity.webp | Daily activity report: manpower and POB, leading and lagging indicators for each site.
;; /asset/projects/safeview/daily-report.webp | Daily reports from project sites and vessels.
;; /asset/projects/safeview/contracts.webp | Contract management: every contractor, its vessel, risk level, and the progress of its reviews.
;; /asset/projects/safeview/smart-card.webp | Safety observation cards: who has filled in their card each month.
;; /asset/projects/safeview/employees.webp | Worker dashboard: workers on duty, document compliance, and crew by project.
]

SafeView serves many roles, from contractor and crew to evaluator, verifier, manager, and auditor. To make that easy to learn, I added 24 in-app guided tours, grouped by role, and a PDF guide for each role, generated from the same tours with screenshots from the demo.

![An in-app guided tour on the contract review page, one of 24 tours grouped by role.](/asset/projects/safeview/tutorial.webp)

## Beyond HSE {#beyond}

Most of SafeView is not specific to safety. It manages people and their documents: who is on duty, which certificate expires next month, whose medical check is due, and whether a folder of evidence meets a written standard. The same parts would serve an HR team, for example to track employee files and competency certificates, or to score vendor or candidate documents against a different rubric. The AI does not know it is reading safety documents. It reads whatever the rubric asks it to check.

I also built the demo environment itself: the same code with its own name, database, and file store, fictional companies and people, and dates shifted to stay current, so the product can be shown without touching production.

## What I learned {#lessons}

**An AI that is always right is a warning.** The first sign of the bug was a pass rate that looked too good.

**Read the evidence before tuning the model.** Most disagreements came from files the AI never read, not from bad reasoning.

**Let the model judge, let code count.** A juror marking one check at a time, with a quote, is more consistent than a juror picking a number.

**Direction matters more than accuracy.** A gap that always points one way leads to its cause.

## What comes next {#next}

- Measure the calibrated rubric on other finished reviews, without the corrections that came from the test folder.
- Replace the generated corrections with real ones from evaluators, and let the HSE team review the class of each check.
- Keep a person in the loop. Automatic acceptance of high-confidence scores is not planned.

```callout
Want to see how it works?
Everything above comes from a demo environment with fictional data, so some details stay behind the screen. If you would like a live walkthrough of the demo, send me a direct message on [LinkedIn](https://www.linkedin.com/in/naufal-muhamad-adzkia/) and I will be happy to show you around.
```

*This article describes my work at Waviv Technologies for the HSE Team of Production & Operation at PHE OSES. All screenshots and videos use a demo environment with fictional companies and people. Results on real data are reported as counts and ratios only, with no contractor names or documents. No client data is shown.*
