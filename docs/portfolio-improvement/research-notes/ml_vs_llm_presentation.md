# Presenting Traditional ML vs LLM/Agent Work in a Data Scientist Portfolio (2025-2026)

Source-quality note for the report writer: the strongest sources here are practitioner primary sources (Hamel Husain and Shreya Shankar, Eugene Yan, Google Rules of ML, Google's ML Test Score paper, Chip Huyen's book via a reader's chapter notes, Made With ML, Rob Hyndman, Royal Statistical Society's Real World Data Science). On hiring-manager perception of "RAG/wrapper" portfolios, I found **no rigorous survey data**. That evidence comes from anonymous or low-authority career blogs (techinterview.org, a product-managers blog on pages.dev) and SEO-style listicles. Treat it as consistent anecdote, not measurement.

## (a) How hiring managers perceive "LLM/RAG-only" portfolios vs traditional ML; is there fatigue with RAG/chatbot demos?

### Takeaway
There is widespread practitioner and career-blog sentiment that generic RAG chatbots and "OpenAI API wrappers" are weak, saturated evidence. But no rigorous survey quantifies this "fatigue." Job-posting data shows demand for LLM, agent, and eval skills is rising fast. Postings increasingly ask for **evaluation** more than RAG itself, and traditional ML remains the foundational skill postings ask for. What separates serious AI engineering from demos is evals and error analysis: looking at real traces, building failure-mode-specific evaluators, and reporting failures honestly.

### Cited Findings
- An unattributed career guide (May 2026, updated July 2026) lists "I made a wrapper over the OpenAI API" as what "built with AI" should NOT mean, calling it "too generic; everyone has one." It says the AI must be "load-bearing": if you could replace it "with a regex or a lookup table and nothing changes, it does not count." — [techinterview.org, "The AI Portfolio: What 'Built With AI' Means in 2026 Interviews"](https://www.techinterview.org/post/3233475399/ai-portfolio-built-with-ai-2026-interviews/)
- The same source: for RAG, "Show your chunking and retrieval choices, not just the vector store." Evaluation evidence is "the senior signal," and "Even 20 hand-curated examples is a meaningful eval set." It also says "Claiming everything worked reads as either luck or not looking hard enough." Listed weak signals: glossy demos "without robustness," "AI does X" claims without evidence, no discussion of cost or latency, and inflated capability claims. — [techinterview.org](https://www.techinterview.org/post/3233475399/ai-portfolio-built-with-ai-2026-interviews/)
- An anonymous product-managers blog post (June 2026): "A ChatGPT wrapper is not disqualifying, but it is usually weak evidence." It says interviewers read wrappers as API integration work and want a decision trail: the narrow user, rejected features, failure modes, what was deliberately not automated, and "what breaks if the model is wrong." (Low-authority source, no author named.) — [product-managers blog, "Built a ChatGPT wrapper? Why interviewers still won't buy it"](https://pm-blog-3se-bsg.pages.dev/built-a-chatgpt-wrapper-why-interviewers-still-wont-buy-it)
- The "stop building toy chatbots" framing shows up widely in career content, for example a Towards AI headline "Stop Building Toy Chatbots: The 5 AI Engineering Projects That Will Get You Hired." I could not retrieve the article body. — [Towards AI](https://pub.towardsai.net/stop-building-toy-chatbots-the-5-ai-engineering-projects-that-will-get-you-hired-d569eebe89fd)
- Job-posting data (KDnuggets, Oct 2026, aggregating third-party analyses; the underlying datasets are not all named):
  - In a 2026 analysis of 390 AI-engineer postings, **56% mentioned AI evaluation**, 50% mentioned AI agents, and only **26% required specific RAG experience**.
  - Prompt engineering appeared in 7% of postings and "ChatGPT proficiency" in 6%.
  - Dice reports AI skill requirements rose from 15% of tech postings (Jan 2024) to 75% (mid-2026).
  - Stanford AI Index 2026 reports AI postings mentioning agentic AI rose from 0.69% to 18.9% in one year.
  - AI appears in about 45% of data and analytics postings.
  - The article calls machine learning "the most consistently requested foundational technical skill" but does not quantify it.

  — [KDnuggets, "The AI Skills That Actually Show Up in Job Postings Right Now"](https://kdnuggets.com/the-ai-skills-that-actually-show-up-in-job-postings-right-now)
- Hamel Husain and Shreya Shankar call error analysis "the most important activity in evals." It decides which evals you write. They recommend annotating at least 30 traces yourself and reviewing until "theoretical saturation," with about 100 diverse traces as a guide. They say generic metrics "create false confidence," and that ROUGE and BERTScore are generally not useful for LLM apps (they can help for retrieval). — [Husain & Shankar, "AI Evals: Everything You Need to Know" (FAQ, updated Sept 2026)](https://hamel.dev/blog/posts/evals-faq/)
- Chip Huyen's *AI Engineering* (O'Reilly) adapts test-driven development into "evaluation-driven development": define criteria before building. The book groups criteria into domain capability, generation quality and factual consistency, instruction following, and cost and latency. It also covers component-level vs end-to-end evaluation, slicing, and "meta-evaluation" of the eval pipeline itself. Per the reader's notes, the book concludes "no single metric or method can fully capture the complexity of these systems." — [Alex Strick van Linschoten's notes on Ch. 4 (Jan 2025)](https://alexstrick.com/posts/2025-01-22-notes-on-ai-engineering-chip-huyen-chapter-4.html); [O'Reilly book page](https://www.oreilly.com/library/view/ai-engineering/9781098166298/)

### Inferences
- The fatigue is aimed at **undifferentiated** demos: "chat with your PDFs" with no eval, no cost or latency figures, and no failure analysis. It is not aimed at LLM work as such. Hiring demand for LLM, agent, and eval skills is strong and growing, so an LLM project with an eval harness and error analysis is a strong signal.
- The posting data (56% evals vs 26% RAG) suggests that **"how I measured it"** differentiates more than "I built RAG."
- For general data/AI roles, an LLM-only portfolio risks reading as missing the statistical and ML foundations that still dominate data-science work. A mixed portfolio hedges: one rigorous traditional ML project plus one evaluated LLM or agent project.

### Gaps
- I found no recruiter or hiring-manager **survey** that quantifies fatigue with RAG/chatbot portfolios. All evidence is anecdotal or comes from career blogs, mostly unattributed.
- The KDnuggets figures cite third-party analyses (the 390-posting and 360k-posting sources are unnamed), so they can't be independently verified.
- I found no data comparing interview callback rates for LLM-only vs traditional-ML portfolios.

## (b) What credible evidence looks like for traditional ML projects (time-based validation, baselines, calibration, business metrics, limitations, monitoring); how to report for non-technical vs technical readers

### Takeaway
Credible traditional ML write-ups show the following:
- A **simple baseline or heuristic first**, with improvement measured against it.
- **Leakage-safe, time-respecting validation**: rolling-origin backtests for forecasting.
- Metrics suited to imbalance (PR-AUC, precision and recall across thresholds) and score separation and calibration.
- Results **translated into business terms**: gains and lift by decile, how many to target, cost.
- Explicit limitations, documented in model-card style.
- A monitoring plan for drift, freshness, and training-serving skew.

Lead with business translation for non-technical readers, and put technical metrics in an expandable or secondary layer.

### Cited Findings
- **Baselines and simplicity (Google Rules of ML):**
  - Rule #1: "Don't be afraid to launch a product without machine learning."
  - Rule #4: "Keep the first model simple and get the infrastructure right."
  - Rule #14: "Starting with an interpretable model makes debugging easier."
  - Rule #7: turn heuristics into features.

  — [Google, Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- **Metrics vs objectives (Rules of ML):**
  - Rule #2: "First, design and implement metrics."
  - Rule #13: "Choose a simple, observable and attributable metric for your first objective."
  - Rule #39: "The only easy launch decisions are when all metrics get better."

  — [Google, Rules of ML](https://developers.google.com/machine-learning/guides/rules-of-ml)
- **Monitoring and skew (Rules of ML):**
  - Rule #8: "Know the freshness requirements of your system."
  - Rule #10: "Watch for silent failures."
  - Rule #29: log serving-time features for training.
  - Rule #37: "Measure Training/Serving Skew."
  - Rule #5: "Test the infrastructure independently from the machine learning."

  — [Google, Rules of ML](https://developers.google.com/machine-learning/guides/rules-of-ml)
- **Time-based validation (Hyndman):** the test set should ideally be the most recent ~20% of history and at least as long as the forecast horizon. With rolling forecast origin cross-validation, the model is refit at each origin and h-step-ahead errors are aggregated. — [Rob Hyndman on time series cross-validation (SAS blog)](https://blogs.sas.com/content/forecasting/2016/06/09/rob-hyndman-on-time-series-cross-validation); see also R `forecast::tsCV` docs: [tsCV](https://search.r-project.org/CRAN/refmans/forecast/html/tsCV.html)
- **Classifier metrics (Eugene Yan, Mar 2024):**
  - Accuracy is "too coarse a metric to be useful"; split it into precision and recall across thresholds.
  - Use ROC-AUC, and PR-AUC under imbalance. A random classifier's PR-AUC equals the positive rate, which makes it a built-in baseline to report.
  - Inspect how predicted probabilities separate the classes. A model with good AUC can still be "not suitable for production" if scores cluster near the threshold.

  — [Eugene Yan, "Task-Specific LLM Evals that Do & Don't Work"](https://eugeneyan.com/writing/evals)
- **Business translation:** ROC, AUC, sensitivity, and specificity are hard to explain to non-technical colleagues. Cumulative gains, cumulative lift, and response plots instead answer "if we target the top X deciles, what % of positives do we capture?" Example: the top 20% by score captured ~79% of term-deposit buyers vs 20% for a random pick. Pick the cutoff together with business stakeholders. — [KDnuggets, "Evaluating the Business Value of Predictive Models" (modelplotpy, 2018)](https://www.kdnuggets.com/2018/10/evaluating-business-value-predictive-models-modelplotpy.html)
- **Limitations documentation:** model cards (Mitchell et al., arXiv:1810.03993) recommend sections for model description, intended uses and limitations, limitations and bias, training data, training procedure, evaluation results, and metrics and factors. — [Hugging Face LLM Course, "Building a model card"](https://huggingface.co/learn/llm-course/chapter4/4.md)
- **Production readiness rubric:** Google's "ML Test Score" offers **28 specific tests and monitoring needs** for scoring production readiness (Breck, Cai, Nielsen, Salib, Sculley; IEEE Big Data 2017). — [Google Research](https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/)
- **Case-study narrative structure (Royal Statistical Society's Real World Data Science):** problem/challenge, goals, background, approach (how the problem was framed as data science, plus the method's strengths and limits), implementation (challenges, ethics, testing), impact, and learnings. — [Real World Data Science, case study guidance](https://realworlddatascience.net/contributor-docs/case-studies.html)
- **Eugene Yan on portfolios (2020):** a portfolio should show data acquisition and cleaning, ML with validation, deployment, and software practices (documentation, tests), plus problem framing and writing. "A portfolio is just an artifact of our skills, traits, and working process." Sharing obstacles faced also signals grit. — [Eugene Yan, "Why Have a Data Science Portfolio and What It Shows"](https://eugeneyan.com/writing/data-science-portfolio-how-why-what/)

### Inferences
- A two-layer reporting pattern for a traditional ML case study:
  - **Non-technical headline:** "Targeting the top 10% of scored accounts catches X% of churners (Y× lift over random), which cuts outreach cost by Z." Or for forecasting: "Forecast error fell from A% to B% vs a seasonal-naive baseline over N rolling backtest folds."
  - **Technical layer:** PR-AUC vs the positive-rate baseline, precision@k, calibration and score distributions, backtest design (origins, horizon, MAE/MAPE/MASE vs naive), leakage controls, and slices.
- Show the baseline every time: heuristic, seasonal-naive, or logistic regression. Rules of ML and Hyndman both frame improvement over a simple benchmark as the credible claim.
- For anomaly detection, precision@k (alerts a human can review per day) and alert cost are the natural business translation. I found no source dedicated to portfolio presentation of anomaly detection; this is an extrapolation.

### Gaps
- I found no authoritative 2024-2026 source specifically on presenting **calibration** in portfolios (reliability diagrams, Brier score). Standard practice, but not sourced here.
- Lift and gains guidance comes from a 2018 source; I found no newer equivalent.
- Hyndman's specific advice on naive benchmarks and MASE was not captured in the fetched page. The SAS blog page covers rolling origin only.

## (c) What credible evidence looks like for LLM/agent projects (eval sets, guardrails, tool calling, failure analysis)

### Takeaway
Credible LLM and agent evidence is a **documented eval process**, not a demo:
- Error analysis on real traces, producing a taxonomy of failure modes.
- Binary pass/fail criteria per failure mode.
- LLM-judges validated against human labels (TPR/TNR, kappa) on a held-out split.
- Code-based assertions for tool calls, and outcome-level agent checks.
- Explicit cost and latency figures.
- Honest reporting of residual failure rates with confidence intervals.

### Cited Findings
- **Error analysis first** (Husain & Shankar):
  - Annotate at least 30 traces yourself before using an AI to suggest failures.
  - Continue to saturation, with about 100 diverse traces as a guide.
  - Re-run error analysis every 2-4 weeks on production or after major changes.

  — [hamel.dev evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- **Judges** (Husain & Shankar):
  - The most common mistake is one judge for many error types. Build one per failure mode.
  - Measure TPR and TNR against human labels on a held-out test set.
  - You need about 100-200 labeled examples per failure mode, and at least 50 passing plus 50 failing to debug disagreement.
  - Suggested split: 10-20% train, 40-45% dev, 40-45% test.
  - Prefer binary over Likert scales.

  — [hamel.dev evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- **Tool calling and agents** (Husain & Shankar):
  - Check tool behavior with code assertions, for example that the DB record exists with the requested details, or that the cancel tool succeeded before the agent tells the user an order is canceled.
  - Evaluate outcomes ("was the appointment made?") rather than only intermediate steps.
  - For long agent traces, focus on the **first upstream failure**, since errors compound.

  — [hamel.dev evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- **Guardrails and RAG** (Husain & Shankar):
  - Surface traces flagged by guardrails, CI failures, or automated evaluators for human review.
  - Generic "hallucination scores" rarely capture what matters, so build application-specific evaluators.
  - Example: AnkiHub used fourth-year medical students as domain experts to evaluate its medical RAG.

  — [hamel.dev evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- **Synthetic data** (Husain & Shankar): define dimensions, write tuples by hand, then convert them to queries. Synthetic data cannot show how often a failure happens in production. — [hamel.dev evals FAQ](https://hamel.dev/blog/posts/evals-faq/)
- **Eugene Yan's "Product Evals in Three Simple Steps" (Nov 2025):**
  1. Label data with binary pass/fail (or win/lose/tie).
  2. Align the LLM-evaluator on a ~75/25 dev/test split.
  3. Run the eval harness on every change.

  Other points from the post:
  - Aim for 50-100 failures in a balanced set of 200+.
  - With 200 samples at a 3% defect rate, the 95% CI is about ±2.4% (about ±1.7% at 400).
  - Use one evaluator per dimension, not a "God Evaluator."
  - Swap the order in pairwise comparisons to counter position bias.
  - Report Cohen's kappa. "The benchmark is human performance, not perfection."

  — [Eugene Yan](https://eugeneyan.com/writing/product-evals/)
- **Hallucination and factual consistency** (Eugene Yan, 2024): use NLI-based inconsistency checks. A few hundred labels give a rough signal, and 1,000+ give a solid eval usable as a guardrail. Even with RAG, typical inconsistency rates are 5-10%, so high-stakes apps need stricter thresholds. — [Eugene Yan, "Task-Specific LLM Evals that Do & Don't Work"](https://eugeneyan.com/writing/evals)
- **Chip Huyen:** evaluate components and end-to-end separately, slice the data, include cost and latency as first-class criteria with Pareto trade-offs, and meta-evaluate the eval pipeline. — [Notes on AI Engineering Ch. 4](https://alexstrick.com/posts/2025-01-22-notes-on-ai-engineering-chip-huyen-chapter-4.html)
- **Career-guide view:** show chunking and retrieval choices, give concrete tokens-per-request and latency figures, and be candid about trade-offs and failures. — [techinterview.org](https://www.techinterview.org/post/3233475399/ai-portfolio-built-with-ai-2026-interviews/)

### Inferences
- A credible LLM case study on a personal site could include:
  - A failure-mode taxonomy table with counts from N reviewed traces.
  - The eval set size and how it was built (real vs synthetic).
  - Judge-human agreement (TPR/TNR or kappa).
  - Before/after pass rates per failure mode with CIs.
  - Tool-call assertion pass rates and an end-to-end task success rate.
  - Cost per task, p50/p95 latency, and guardrail behavior.
  - A "known failures" section.
- The same discipline as traditional ML applies: baseline (e.g. a no-RAG or prompt-only version), held-out test, slices, monitoring. Framing LLM work in that shared language helps general data recruiters see continuity with classic DS rigor.

### Gaps
- The fetched content did not cover specific retrieval metrics (recall@k, MRR) from these authors. Husain & Shankar's FAQ only notes that similarity metrics can help for retrieval.
- I found no authoritative source on how hiring managers weigh agent-specific evidence (tool-call accuracy, trajectory eval) specifically in portfolios, beyond career-blog claims.

## (d) Showing MLOps/production maturity, and structuring a "Data & AI" section for general data/AI recruiters; good case-study examples

### Takeaway
Production maturity is best shown through concrete, checkable artifacts:
- A deployed endpoint or one-command run.
- An architecture diagram.
- Tests (code, data, model) and CI.
- A monitoring and alerting plan (drift, freshness, skew).
- A runbook or rollback notes, and a model card.

These map to Google's ML Test Score and the Made With ML curriculum. For a mixed recruiter audience, a "Data & AI" section works best organized by **problem type and business outcome**, with each card or case study following a consistent problem → approach → evaluation → impact → limitations → learnings template. Technical depth goes in a second layer.

### Cited Findings
- **Made With ML:** the curriculum treats production ML as ML plus software engineering. It covers testing code, data, and models; tracking, tuning, evaluation, and serving; documentation, logging, styling, and pre-commit; and jobs and services, CI/CD workflows, monitoring, and data engineering. Its aim is to "responsibly design, develop, deploy and iterate on production ML applications." — [Made With ML](https://madewithml.com/)
- **Google ML Test Score:** 28 tests and monitoring needs as a production-readiness rubric. — [Google Research](https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/)
- **Google Rules of ML on infra:** test the infrastructure independently from the ML (#5), share code between training and serving (#32), and measure training/serving skew (#37). — [Rules of ML](https://developers.google.com/machine-learning/guides/rules-of-ml)
- **Hiring signals:** "A real shipped artifact is the cleanest evidence." Hiring managers read the README first, so it should "Lead with the problem and your key decision." — [techinterview.org](https://www.techinterview.org/post/3233475399/ai-portfolio-built-with-ai-2026-interviews/)
- **Eugene Yan:** observable artifacts (code, open source, write-ups, READMEs, video walkthroughs) give recruiters evidence beyond a resume. He recommends writing up each code project. — [Eugene Yan, portfolio post](https://eugeneyan.com/writing/data-science-portfolio-how-why-what/)
- **RSS Real World Data Science case-study template:** problem, goals, background, approach (including limits), implementation (challenges, ethics, testing), impact, learnings. — [Real World Data Science](https://realworlddatascience.net/contributor-docs/case-studies.html)
- **Model card sections** as a documentation pattern: intended use, limitations and bias, training data, evaluation. — [Hugging Face](https://huggingface.co/learn/llm-course/chapter4/4.md)
- **Exemplar practitioner sites:** eugeneyan.com and hamel.dev publish long-form, evidence-heavy write-ups with explicit numbers (sample sizes, CIs, kappa thresholds) and process descriptions. — [eugeneyan.com/writing/product-evals](https://eugeneyan.com/writing/product-evals/); [hamel.dev evals FAQ](https://hamel.dev/blog/posts/evals-faq/)

### Inferences
Suggested "Data & AI" section structure (synthesis, not from a single source):
1. **A one-line positioning statement** that spans both, e.g. "I build and evaluate predictive models and LLM systems that ship."
2. **Grouping by capability, not by hype**, for example:
   - Forecasting and time series
   - Classification, risk, and propensity
   - Anomaly detection
   - LLM and agent systems
   - MLOps and platform

   Tag each card (e.g. "Tabular · XGBoost · Backtested", "LLM · Tool calling · Eval harness") so recruiters can scan by keyword.
3. **A consistent card face** for non-technical readers: problem, the business metric result (lift, error reduction vs baseline, cost per task, hours saved), and one visual (gains chart, backtest plot, failure-mode bar chart).
4. **The case-study page**, following the RSS template, with a "For technical readers" block containing:
   - Validation design (rolling-origin folds, horizon, leakage controls)
   - Baselines
   - PR-AUC, precision@k, calibration
   - LLM eval set size, judge agreement, CIs
   - An architecture diagram
   - Test counts and CI badge
   - Monitoring plan and runbook link
   - Model card and limitations
5. **Honest "Limitations / What I'd do next" on every project.** Multiple sources treat candor about failures and trade-offs as a credibility signal.
6. **Balance:** at least one rigorous traditional ML project alongside LLM work, so general data recruiters see core DS and statistics fundamentals and not only GenAI.

Production-maturity evidence that is easy to show:
- A system diagram (data → features → training → registry → serving → monitoring).
- A test count and coverage split by code, data, and model tests.
- A CI workflow link.
- A deployed demo or `make run`.
- A drift and freshness monitoring dashboard screenshot.
- A short runbook: alerts, rollback, retraining trigger.
- Latency and cost numbers.

### Gaps
- I found no empirical source on how recruiters actually scan personal portfolio sites (time on page, which elements they read), nor any A/B evidence on section structures.
- I did not find a curated, authoritative list of exemplary **individual job-seeker** DS/ML case-study sites. The examples above are established practitioners' blogs; SEO "portfolio examples" listicles (e.g. colorlib, interviewkickstart) were not vetted.
- I found no source quantifying whether runbooks or test counts specifically influence hiring decisions. Their value is inferred from production-readiness rubrics.
