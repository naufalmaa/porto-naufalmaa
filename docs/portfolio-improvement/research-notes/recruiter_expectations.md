# What Hiring Managers and Recruiters Look For in DS/ML Portfolio Websites (2025-2026)

Source-quality note: there is no rigorous, DS/ML-specific study of how reviewers use portfolio sites (time on page, click paths). The best quantitative evidence comes from adjacent fields: UX/design portfolio surveys, a developer hiring-manager survey, and an informal ML Twitter poll. DS-specific guidance is mostly practitioner opinion (KDnuggets, Statology, DataTalks.Club, Built In, DataCamp). Dates are given for each source. Several are older than 2023 and are flagged.

## 1. How long do recruiters and hiring managers spend on a portfolio, and what do they look at first?

### Takeaway
Expect a skim, not a read. In the one survey with numbers (design field, about 2020), 80% of recruiters spent 3 minutes or less and most managers spent 5-10 minutes. Reviewers want the problem, solution and outcome summarised up front. Nobody I found has published click or eye-tracking data on portfolio sites.

### Cited Findings
- About 2020 survey of 100+ design recruiters and managers (informal, self-run, analysed with pivot tables). 80% of recruiters spend 3 minutes or less on a portfolio. 54% of design managers spend 5-10 minutes, and 11% spend more than 10 minutes. — [Engstrom, UX Collective](https://uxdesign.cc/ever-wonder-how-recruiters-look-at-your-design-portfolio-cc8dd1ecb698)
- The same author says recruiters scan rather than read full case studies. He recommends a summary at the top (problem, solution, outcome, plus a demo video) with a link through to the full case study for managers. This is advice; click-through was not measured. — [Engstrom, UX Collective](https://uxdesign.cc/ever-wonder-how-recruiters-look-at-your-design-portfolio-cc8dd1ecb698)
- 66% of recruiters in that survey named LinkedIn as their main sourcing channel, so the portfolio is usually reached from LinkedIn or a resume, not found on its own. — [Engstrom, UX Collective](https://uxdesign.cc/ever-wonder-how-recruiters-look-at-your-design-portfolio-cc8dd1ecb698)
- NN/g (2019, older), drawing on a survey of 204 UX professionals who hire: "Very rarely will hiring managers take the time to read your entire portfolio word for word." Portfolios should be scannable. — [Krause, NN/g](https://nngroup.com/articles/ux-design-portfolios/)
- Developer hiring-manager survey (60+ respondents; date not stated; profy.dev). Asked about an inexperienced candidate who has a personal site, 65% would definitely look at it and 93% would likely look. However, 51% said a candidate without a site would not have lower chances, and 85% said chances would be at most slightly lower. A team lead said: "Better to have no website than a bad one." — [profy.dev survey](https://hn.jakechampion.name/reader/https://profy.dev/article/portfolio-websites-survey)
- Chip Huyen's ML Interviews Book (about 2021) reports an informal Twitter poll of 2,458 respondents. Over 50% chose GitHub/Kaggle as the most important screening signal for ML engineering roles. Previous employer got 22%, referrals 15% and school 10%. She calls the poll noisy. She also repeats the figure that recruiters spend about 7.4 seconds on a resume (that statistic is about resumes, not portfolios) and advises making strengths visible quickly. — [Huyen, ML Interviews Book](https://huyenchip.com/ml-interviews-book/contents/2.1.3-what-signals-companies-look-for-in-candidates.html)
- Built In (2022, older): Appian talent leaders said companies generally don't require portfolios and don't usually discount candidates who lack one. — [Halladay, Built In](https://builtin.com/data-science/data-science-portfolios)

### Inferences
- There are probably two audiences. Recruiters skim the homepage for under 3 minutes and check fit. Technical hiring managers spend 5-10 minutes on one or two projects and may open code. The homepage should serve the first group and the case studies the second.
- A portfolio site mostly adds upside: it gets looked at, but having none rarely hurts. A sloppy or placeholder site can hurt, though.
- Because most traffic arrives from LinkedIn or a resume, the site should repeat the same positioning and link straight to the flagship projects.

### Gaps
- I found no DS/ML-specific measurements of time on site, scroll depth or which links get clicked. All numbers above come from design or developer contexts or informal polls. No 2025-2026 recruiter survey on DS portfolio sites turned up.
- I couldn't find the original NN/g data on portfolio viewing time. The NN/g piece gives none.

## 2. What should the homepage show above the fold?

### Takeaway
No source gives an evidence-based "above the fold" spec for DS sites. Converging advice is to lead with a summary, a small curated set of projects each with a one-line result, and clear links to code and contact. Summary-first layouts appear in the strongest example sites.

### Cited Findings
- Put a summary first (problem, solution, outcome) because recruiters scan. — [Engstrom, UX Collective](https://uxdesign.cc/ever-wonder-how-recruiters-look-at-your-design-portfolio-cc8dd1ecb698)
- Pick 3-5 projects, "quality over quantity," and prioritise projects that match the job you want. Decide the top three takeaways a reader should get, then check the portfolio delivers them. — [Krause, NN/g 2019](https://nngroup.com/articles/ux-design-portfolios/)
- Exabeam's CHRO advises picking your best work and keeping the selection small. Built In concludes "less is usually more"; one featured hire's GitHub held 3 projects. — [Built In 2022](https://builtin.com/data-science/data-science-portfolios)
- DataCamp's advice: "design for readers" with a clean aesthetic. Keep branding consistent across LinkedIn and GitHub, and link the portfolio from your resume and email signature. — [Nehme, DataCamp 2022](https://www.datacamp.com/blog/how-to-build-a-great-data-science-portfolio-with-examples)
- Example sites (Phase AI, 2020, older; links not re-verified as live):
  - Brandon Kopp opens each project with a short key-points summary before the detail. — [Phase AI](https://phaseai.com/resources/best-data-portfolios)
  - Claudia ten Hoope gives every case study the same header: goal, result, duration. — [Phase AI](https://phaseai.com/resources/best-data-portfolios)
  - David Venturi's site is "clean, easy to navigate, highly visual" and links code and live site separately for each project. — [Phase AI](https://phaseai.com/resources/best-data-portfolios)
  - Charlie Thompson (Spotify DS) shows original personal projects such as the Sentify Shiny app. — [Phase AI](https://phaseai.com/resources/best-data-portfolios)
- Yan Holtz's site (yan-holtz.com) is cited for strong visual design, with a distinctive visual and a concise explanation for each project. — [DataCamp 2022](https://www.datacamp.com/blog/how-to-build-a-great-data-science-portfolio-with-examples)
- Opening with a tool stack or algorithms before business context is listed as a common mistake. — [DataTalks.Club podwiki, 2026](https://datatalksclub.github.io/podwiki/wiki/data-scientist-cv-and-portfolio/)

### Inferences
These are my synthesis of the sources, not tested rules:
- Above the fold:
  - A one-line positioning statement giving role, domain and the kind of problem solved.
  - 2-3 flagship project cards, each with title, one-sentence problem, one headline result metric, and chips for Case study, Code and Demo.
  - Resume/CV link and contact/LinkedIn.
- Put tools inside each project card, not in a standalone logo wall.
- An "About" page and optional blog sit below or in the nav. Built In recommends both. — [Built In](https://builtin.com/data-science/data-science-portfolios)

### Gaps
- No A/B test or study found on homepage layouts for technical portfolios.
- Well-known ML practitioner sites (for example those of Eugene Yan, Chip Huyen and Vicki Boykis) are widely cited informally. I found no source that analyses them as hiring portfolios, so I haven't cited them as evidence.

## 3. What case study structure do hiring managers recommend, and how do you show your role in team projects?

### Takeaway
Sources agree on an order: business problem and decision → data (and how you obtained it) → approach with the trade-offs you weighed → validation/metric → result and impact → limitations and next steps → your specific role. Lead with the problem and the result, not the algorithm.

### Cited Findings
- DataTalks.Club podwiki (2026, a summary of podcast guests). Lead with the business problem and the decision or workflow it changed. Then cover data, assumptions and limitations, your personal contribution, and method, metric, result and trade-off. Reviewers check:
  - whether bullets show what you owned and changed, not just tools
  - whether there is a clear beneficiary
  - whether you can defend method, metrics, trade-offs and limitations under follow-up
  - data judgment: data problems, overfitting, next steps

  — [DataTalks.Club podwiki](https://datatalksclub.github.io/podwiki/wiki/data-scientist-cv-and-portfolio/)
- Eugene Yan's Why/What/How framework (2021, older but widely used):
  - Why: problem, expected benefit, why now. It is "the hook."
  - What: success metrics and constraints, ideally first-order (revenue, engagement) and second-order (usage, retention).
  - How: methodology, design, offline experiment results and benchmarks (ranking metrics, latency, throughput), and explicit out-of-scope items.
  - Appendix: rejected alternatives and trade-offs.

  — [Yan, eugeneyan.com](https://eugeneyan.com/writing/writing-docs-why-what-how/)
- NN/g case study template (2019, UX):
  1. problem or hypothesis
  2. your specific role and how you collaborated
  3. how you arrived at the solution
  4. how it solved the problem
  5. challenges, including concepts not pursued
  6. effects on users and the business
  7. what you learned

  For role clarity, name the team composition and your responsibility. Their example is "sole UX designer on an Agile team with three developers, a PO, a scrum master and a QE… responsible for overall design direction." — [NN/g](https://nngroup.com/articles/ux-design-portfolios/)
- Statology (June 2026): hiring managers want evidence of decisions (why this model, what EDA showed, what didn't work) and business framing (the decision supported, the cost of being wrong, what a stakeholder should do). — [Chugani, Statology](https://www.statology.org/what-titanic-iris-and-house-prices-say-about-your-portfolio/)
- KDnuggets (Sept 2025):
  - Frame the problem around business value and make trade-offs explicit.
  - Explain key decisions.
  - End with a concrete recommendation or action rather than "a model."

  — [Rosidi, KDnuggets](https://www.kdnuggets.com/5-portfolio-mistakes-that-keep-data-scientists-from-getting-hired)
- Nick Singh (DataFramed, 2022): "The key to standing out is to show your project made an impact and show that other people cared." — [DataCamp podcast](https://www.datacamp.com/podcast/dataframed-careers-series-2-what-makes-a-great-data-science-portfolio)
- Built In (2022): reviewers want problem, process, outcome and business impact, plus the ability to explain technical work to non-technical people. — [Built In](https://builtin.com/data-science/data-science-portfolios)

### Inferences
- A practical DS/ML case study template:
  1. TL;DR card: problem, your role, headline result, links.
  2. Context and decision.
  3. Data (sources, size, quality issues).
  4. Approach and baseline (alternatives rejected and why).
  5. Validation (offline metric vs. baseline, CV/holdout or A/B, error analysis).
  6. Impact (business metric, or "projected" if hypothetical).
  7. Limitations and next steps.
  8. Stack and code link.
- For role clarity, say "I" for your own work. Give team size and who did what (for example "I owned feature pipeline and model; MLE teammate owned serving"). Keep "we" for team outcomes.
- Results should appear in the first screen of a case study. Leaving results until the end is listed as a mistake. — [DataTalks.Club](https://datatalksclub.github.io/podwiki/wiki/data-scientist-cv-and-portfolio/)

### Gaps
- No DS-specific survey quantifies which case study sections hiring managers read. The structure above rests on practitioner consensus.

## 4. How do you present confidential client work (NDA, anonymised or demo data, masked numbers) credibly?

### Takeaway
Advice comes mostly from design. Generalise and anonymise (drop the client name or use an industry descriptor), redact identifying details, show process artifacts and relative rather than absolute numbers, get permission, and offer the full detail privately or behind a password.

### Cited Findings
- NN/g (2019): redact or blur identifying information, especially in financial or medical apps. Make work generic by removing logos and changing branding and copy. Show process artifacts such as sketches and wireframes. — [NN/g](https://nngroup.com/articles/ux-design-portfolios/)
- Vanschneider (2018, older) gives these tactics:
  - Write a general, CV-style description of the work type and your role.
  - Describe the project type, department and responsibilities.
  - Get client approval and read the NDA.
  - Offer a password-protected case study for employers only.
  - Invite viewers to contact you for details.
  - For non-visual work, show process and context artifacts.
  - Raise portfolio intentions with the client at the start of a project.

  — [Vanschneider](https://vanschneider.com/blog/portfolio-tips/make-portfolio-work-cant-shared/)
- A DS-specific warning: don't claim corporate revenue impact for side projects, and don't present models you can't defend. — [DataTalks.Club](https://datatalksclub.github.io/podwiki/wiki/data-scientist-cv-and-portfolio/)

### Inferences
These are DS adaptations, not directly sourced:
- Use "a European telecom (NDA)" in place of the client name.
- Report relative lifts ("+12% recall vs. rule-based baseline") or indexed charts in place of absolute business numbers.
- Rebuild the method on a public or synthetic dataset that has the same structure and link that code. Label clearly which numbers come from production and which from the demo.
- Add a one-line confidentiality note so masking reads as professionalism rather than vagueness.

### Gaps
- I found no DS/ML-specific guide from a hiring manager on NDA work. Fueler and freelancermap posts surfaced but weren't fetched.

## 5. Common portfolio mistakes

### Takeaway
The repeated red flags are:
- tutorial or overused datasets
- model-only projects with no business framing or action
- tool lists detached from projects
- results buried at the end
- too many shallow projects
- a bad or placeholder site, which is worse than no site

### Cited Findings
- Titanic, Iris, house prices and MNIST signal "I followed the tutorials." Include at least one project where you sourced your own data and defined your own question. — [Statology 2026](https://www.statology.org/what-titanic-iris-and-house-prices-say-about-your-portfolio/); the same point is in [DataCamp 2022](https://www.datacamp.com/blog/how-to-build-a-great-data-science-portfolio-with-examples)
- Five mistakes from KDnuggets (2025):
  - projects you don't care about
  - only using data handed to you rather than APIs, scraping or combined sources
  - Kaggle-style single-metric optimisation
  - models without end-to-end workflow or deployment (Streamlit, Flask, BI)
  - ending with a model rather than an action

  — [KDnuggets](https://www.kdnuggets.com/5-portfolio-mistakes-that-keep-data-scientists-from-getting-hired)
- Other mistakes:
  - a tech stack not linked to projects
  - results left until the end
  - opening with algorithms before business context
  - inflated impact claims
  - personal details (age, photo, address)
  - models you can't defend

  — [DataTalks.Club 2026](https://datatalksclub.github.io/podwiki/wiki/data-scientist-cv-and-portfolio/)
- Generic tutorial or assigned projects are a weakness because candidates can't explain their motivation. Kaggle alone is weak unless you placed well. Better options are paper reimplementations, solving a personal problem, or deploying a user-facing app. — [Towards Data Science, likely Egor Howell, about Oct 2025](https://towardsdatascience.com/the-machine-learning-projects-employers-want-to-see/)
- "Better to have no website than a bad one." — [profy.dev survey](https://hn.jakechampion.name/reader/https://profy.dev/article/portfolio-websites-survey)
- Quality over quantity; 3-5 projects. — [NN/g](https://nngroup.com/articles/ux-design-portfolios/)
- Avoid scope creep: centre each project on one technical domain. — [DataCamp](https://www.datacamp.com/blog/how-to-build-a-great-data-science-portfolio-with-examples)

### Inferences
- "Placeholder content" (lorem ipsum, "coming soon," dead links) falls under the "bad website" penalty. It is especially costly because recruiters judge in minutes.

### Gaps
- No survey quantifies how often each mistake leads to rejection.

## 6. How much does a linked public GitHub repo or runnable code add over a write-up alone?

### Takeaway
Public code and Kaggle profiles are widely treated as strong signals, especially for ML engineering. Over half of an informal 2,458-person poll called GitHub/Kaggle the top screening signal. The best setup pairs a readable write-up with a reproducible repo and, ideally, a live demo. Reviewers use code to confirm that claimed skills were actually used.

### Cited Findings
- Informal poll: over 50% picked GitHub/Kaggle as the most important ML engineering screening signal. Huyen also notes "free project bias" against candidates without spare time. Jeremy Howard judges achievement relative to opportunity. — [Huyen](https://huyenchip.com/ml-interviews-book/contents/2.1.3-what-signals-companies-look-for-in-candidates.html)
- GitHub and Kaggle show where a tool was actually used, which a CV line can't. READMEs should give a quick start and a file tour so the project can be reproduced without the author. For competitions, stress the reproducible package and the limitations over the rank. — [DataTalks.Club](https://datatalksclub.github.io/podwiki/wiki/data-scientist-cv-and-portfolio/)
- Put the project story in the README. Give notebooks titles and explanations, comment functions, and use clear variable names, because readers notice. — [DataCamp 2022](https://www.datacamp.com/blog/how-to-build-a-great-data-science-portfolio-with-examples)
- Developer hiring managers' comments valued GitHub projects, READMEs, source plus deployed links, and open-source PRs. — [profy.dev survey](https://hn.jakechampion.name/reader/https://profy.dev/article/portfolio-websites-survey)
- Deploy end to end with production-quality code (cloud, Docker) and build user-facing apps. — [Towards Data Science, 2025](https://towardsdatascience.com/the-machine-learning-projects-employers-want-to-see/); see also [KDnuggets 2025](https://www.kdnuggets.com/5-portfolio-mistakes-that-keep-data-scientists-from-getting-hired)
- A hire with a thin resume got the job from a GitHub profile with 3 projects. He said it let him "show my skills, rather than tell." — [Built In 2022](https://builtin.com/data-science/data-science-portfolios)
- David Venturi's site links code and live site separately for each project. — [Phase AI 2020](https://phaseai.com/resources/best-data-portfolios)

### Inferences
- A write-up alone is weaker for MLE roles than for analyst roles. Each flagship project should link a clean repo (README, environment file, one-command run) and, where feasible, a demo (Streamlit or Hugging Face Space).
- For NDA work, a public demo repo on proxy data offers partial verifiability.

### Gaps
- No 2025-2026 data shows how often hiring managers actually open the linked repos.
- I found no evidence on whether AI-generated code in portfolios, a growing concern in 2025-26, changes how reviewers weight GitHub.
