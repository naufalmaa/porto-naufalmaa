// Single source for how each project is framed on the tab pages.
// The case studies themselves live in the database; this file only decides
// order, status, the one-line result, and the angle each tab ("lens") shows.

export type Lens = "home" | "geoscience" | "data-ai" | "beyond-work";

export type ProjectStatus = "In production" | "Pilot" | "Prototype" | "Hackathon" | "Research";

export interface LensCopy {
  blurb: string;
  anchor?: string; // section id inside the case study, without '#'
  anchorLabel?: string;
}

export interface ExternalItem {
  title: string;
  summary: string;
  href?: string;
  linkLabel?: string;
  period: string;
}

export interface ShowcaseEntry {
  slug: string; // project slug in the database, or a local id for external items
  order: number;
  status: ProjectStatus;
  role: string;
  result: string;
  lenses: Partial<Record<Lens, LensCopy | true>>;
  external?: ExternalItem; // items without a case study on this site
}

export const showcase: ShowcaseEntry[] = [
  {
    slug: "proview",
    order: 1,
    status: "Pilot",
    role: "PIC, built the early warning system end to end",
    result: "Wells it flags are about 5x more likely to fail within 14 days",
    lenses: {
      home: true,
      geoscience: {
        blurb: "Pump current, water cut, and failures on the same platform, read as early signs that an offshore well is about to stop.",
        anchor: "failure",
        anchorLabel: "How a failure is defined",
      },
      "data-ai": {
        blurb: "LightGBM for 7, 14 and 30 days on 11.4M daily records, split by time and calibrated, then turned into a daily boat plan.",
        anchor: "model",
        anchorLabel: "Read the model section",
      },
    },
  },
  {
    slug: "safeview",
    order: 2,
    status: "In production",
    role: "PIC, built the AI review end to end",
    result: "27 of 29 safety elements land within one level of the human evaluator",
    lenses: {
      home: true,
      "data-ai": {
        blurb: "Three AI jurors and a consensus pre-score contractor safety evidence, quote what they relied on, and leave the decision to the evaluator.",
        anchor: "jurors",
        anchorLabel: "How the jurors work",
      },
    },
  },
  {
    slug: "geosurvai",
    order: 3,
    status: "In production",
    role: "PIC, leading product, data, and engineering",
    result: "Its assistant answers 43 of 45 evaluation questions on a self-hosted model",
    lenses: {
      home: true,
      geoscience: {
        blurb: "Survey permits, seismic acquisition parameters, and working areas for SKK Migas, modelled on the PPDM 3.9 industry standard.",
        anchor: "rebuild",
        anchorLabel: "The PPDM 3.9 rebuild",
      },
      "data-ai": {
        blurb: "Text-to-SQL taught the evaluators' own vocabulary, checked against a 45-question set, plus statistical outlier tests on survey budgets.",
        anchor: "ask",
        anchorLabel: "How the assistant was tuned",
      },
    },
  },
  {
    slug: "geoporto",
    order: 4,
    status: "Prototype",
    role: "Personal project, solo build",
    result: "One workspace for maps, well logs, production, and reports",
    lenses: {
      home: true,
      geoscience: {
        blurb: "Start from a well or a block and see its logs, production, and reports together, instead of opening four tools.",
      },
      "beyond-work": {
        blurb: "My first attempt at an asset-centric geoscience workspace, with document search over technical reports.",
      },
    },
  },
  {
    slug: "amiga-robot-admin",
    order: 5,
    status: "Hackathon",
    role: "Team member: tax rules, multi-invoice PDFs, user guide",
    result: "AI only reads the invoice; rules check it; a finance reviewer approves",
    lenses: { "beyond-work": true },
    external: {
      title: "AMIGA Robot Admin",
      summary:
        "Turns vendor invoices into payment vouchers. The AI reads the PDF, the system checks totals, completeness, and duplicates, and a finance reviewer approves. Includes an assistant over the finance SOP and a Telegram bot.",
      href: "https://github.com/halvrenvaire/AMIGA-ADMIN-ROBOT-TIM11-",
      linkLabel: "Code on GitHub",
      period: "MAIN Hackathon 2026, Team 11",
    },
  },
  {
    slug: "mcp-hub-research",
    order: 6,
    status: "Research",
    role: "Research on how agents use shared tools",
    result: "Seven deterministic tools, zero language-model cost on the server",
    lenses: { "beyond-work": true },
    external: {
      title: "Agents on a shared MCP hub",
      summary:
        "How should many agents share one set of data tools? I study this on Kawal AI, a Waviv product whose MCP hub, built by a colleague, exposes mining-permit data as deterministic tools: what to expose, how to keep every answer traceable, and how to keep the server free of language-model cost.",
      period: "2026, ongoing",
    },
  },
];

export function entriesFor(lens: Lens): ShowcaseEntry[] {
  return showcase.filter((e) => e.lenses[lens]).sort((a, b) => a.order - b.order);
}

export function lensCopy(entry: ShowcaseEntry, lens: Lens): LensCopy | undefined {
  const copy = entry.lenses[lens];
  return copy === true ? undefined : copy;
}
