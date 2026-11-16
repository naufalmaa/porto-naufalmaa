// Home page content. Every number here is already published in a case study
// on this site; keep them in sync with the articles.

export interface FeaturedStep {
  label: string;
  body: string;
}

export const featuredCase = {
  slug: "proview",
  title: "Proview: an early warning for offshore well failures",
  client: "Built for the production team of an offshore operator in Indonesia",
  image: "/asset/projects/proview/risk-map.webp",
  imageAlt: "Proview risk map with each well coloured by its chance of failing, demo data",
  steps: [
    {
      label: "Problem",
      body: "Offshore wells stop without warning, and every fix needs a boat. A failed well was only noticed in the next day's report, one well at a time.",
    },
    {
      label: "What I did",
      body: "Moved 11.4M daily well records into one datamart, defined what counts as a failure, and trained LightGBM to score every well for 7, 14 and 30 days, then turned the scores into a daily boat visit plan.",
    },
    {
      label: "Result",
      body: "On data the model never saw, the wells it flags fail about 5x more often than the base rate. Proview is in pilot.",
    },
  ] as FeaturedStep[],
  links: [
    { label: "Read the case study", href: "/projects/proview" },
    { label: "How a failure is defined", href: "/projects/proview#failure" },
  ],
};

export interface Capability {
  title: string;
  body: string;
  proof: { label: string; href: string }[];
  href: string;
  hrefLabel: string;
}

export const capabilities: Capability[] = [
  {
    title: "Predictive maintenance and forecasting",
    body: "Time-series models with an honest label, a split by time, and calibrated risk that turns into a plan people act on.",
    proof: [{ label: "Proview early warning", href: "/projects/proview#model" }],
    href: "/data-ai",
    hrefLabel: "Data & AI work",
  },
  {
    title: "AI assistants over operational data",
    body: "Text-to-SQL and agents that answer from tools, checked against an evaluation set, and say so when they cannot answer.",
    proof: [
      { label: "Geosurvai: 43 of 45 questions", href: "/projects/geosurvai#ask" },
      { label: "SafeView AI jurors", href: "/projects/safeview#jurors" },
    ],
    href: "/data-ai",
    hrefLabel: "Data & AI work",
  },
  {
    title: "Geoscience data, modelled properly",
    body: "Survey permits, seismic acquisition, wells, and production organised on the PPDM 3.9 standard, so engineers and models read the same data.",
    proof: [
      { label: "Geosurvai PPDM rebuild", href: "/projects/geosurvai#rebuild" },
      { label: "GeoPorto workspace", href: "/projects/geoporto" },
    ],
    href: "/geoscience",
    hrefLabel: "Geoscience work",
  },
];

export const principles: { title: string; body: string }[] = [
  {
    title: "Define the label before the model",
    body: "Deciding that a one-day zero is not a failure changed Proview more than any feature did.",
  },
  {
    title: "Show what the model misses",
    body: "Every case study has a section on what the system cannot do. Honest limits are what make the rest believable.",
  },
  {
    title: "Every number must exist in the data",
    body: "My assistants answer from tools and evidence, and drop any figure they cannot trace.",
  },
];
