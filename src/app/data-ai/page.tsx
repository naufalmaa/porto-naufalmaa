import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { dataAiData } from "@/data/data-ai";
import { principles } from "@/data/impact";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { ProjectList } from "@/components/portfolio/ProjectCard";
import { getShowcase } from "@/lib/showcase";

export const dynamic = "force-dynamic";

// Business result first, method second, then where the evidence lives.
const capabilities = [
  {
    title: "Predictive ML on time series",
    result: "Flagged wells fail about 5x more often than the base rate within 14 days.",
    method: "LightGBM for three horizons, split by time, isotonic calibration, PR-AUC read against the base rate.",
    links: [{ label: "Proview: the risk model", href: "/projects/proview#model" }],
  },
  {
    title: "Decision support",
    result: "A risk score becomes tomorrow's boat plan, and a year-long replay shows the most it could save.",
    method: "Prioritisation by barrels protected per cost, sea routes, and a counterfactual replay reported as an upper bound.",
    links: [{ label: "Proview: from a score to a boat", href: "/projects/proview#plan" }],
  },
  {
    title: "Statistical anomaly detection",
    result: "Survey budgets that do not fit their peers are flagged before approval.",
    method: "Trend fits, IQR and Z-score outlier tests, and an economies-of-scale check against historical projects.",
    links: [{ label: "Geosurvai: cost benchmarking", href: "/projects/geosurvai#evaluate" }],
  },
  {
    title: "Data foundations",
    result: "11.4M daily well records in one datamart, and a migration proven value by value.",
    method: "Validated ETL with alias and duplicate checks, PostgreSQL and PostGIS, PPDM 3.9, row-level security.",
    links: [
      { label: "Proview: data first", href: "/projects/proview#data" },
      { label: "Geosurvai: the rebuild", href: "/projects/geosurvai#rebuild" },
    ],
  },
  {
    title: "AI agents with evaluation",
    result: "43 of 45 evaluation questions answered; 27 of 29 safety elements within one level of the evaluator.",
    method: "Intent routing, schema retrieval, self-repair, read-only tools over MCP, three-juror consensus, numbers checked against evidence.",
    links: [
      { label: "Geosurvai: tuning the assistant", href: "/projects/geosurvai#ask" },
      { label: "SafeView: three jurors", href: "/projects/safeview#jurors" },
    ],
  },
  {
    title: "Shipping and keeping it running",
    result: "Releases installed on the client's own servers, with a fallback when a model is switched off.",
    method: "Docker releases with backup and rollback, 124 backend unit tests, Cypress end-to-end suites, feature flags.",
    links: [
      { label: "Geosurvai: release v7", href: "/projects/geosurvai#rebuild" },
      { label: "SafeView: how it was tested", href: "/projects/safeview#testing" },
    ],
  },
];

export default async function DataAiPage() {
  const items = await getShowcase("data-ai");

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/" className={buttonVariants({ variant: "ghost", className: "pl-0 hover:bg-transparent hover:underline text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{dataAiData.title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">{dataAiData.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {dataAiData.topics.map((topic) => (
          <Badge key={topic} variant="secondary" className="font-normal text-xs">
            {topic}
          </Badge>
        ))}
      </div>
      <div className="mt-6 border-l-2 border-primary/20 pl-4">
        <h2 className="text-lg font-semibold mb-3">How I work</h2>
        <dl className="space-y-3 text-sm leading-relaxed">
          {principles.map((p) => (
            <div key={p.title}>
              <dt className="font-medium text-foreground">{p.title}</dt>
              <dd className="text-muted-foreground">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  const RightPanel = (
    <>
      <section aria-labelledby="cap-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="cap-heading" className="text-2xl font-bold tracking-tight">
            What I can do, and where it is shown
          </h2>
          <p className="text-sm text-muted-foreground">The result first, then the method, then the section that proves it.</p>
        </div>
        <div className="flex flex-col divide-y divide-border/60 rounded-xl border border-border/60">
          {capabilities.map((c) => (
            <div key={c.title} className="grid gap-2 p-5 md:grid-cols-[13rem_1fr] md:gap-6">
              <h3 className="font-semibold leading-snug">{c.title}</h3>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-foreground/90">{c.result}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.method}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {c.links.map((l) => (
                    <Link key={l.href + l.label} href={l.href} className="text-primary underline-offset-4 hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="cases-heading" className="flex flex-col gap-6">
        <h2 id="cases-heading" className="text-2xl font-bold tracking-tight">
          Case studies
        </h2>
        <ProjectList items={items} empty="No projects found for this domain yet." />
      </section>
    </>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
