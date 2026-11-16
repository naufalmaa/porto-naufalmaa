import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { geoscienceData } from "@/data/geoscience";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { ProjectList } from "@/components/portfolio/ProjectCard";
import { getShowcase } from "@/lib/showcase";

export const dynamic = "force-dynamic";

// Each card is a decision that only domain knowledge could make, linked to where it is told in full.
const domainDecisions = [
  {
    title: "A one-day zero is not a failure",
    body: "Of 5,260 drops to zero oil since 2019, 1,268 lasted a single day: test days and reporting gaps. Leaving them out kept 3,992 real failures to learn from.",
    href: "/projects/proview#failure",
    source: "Proview",
  },
  {
    title: "Kilometres are not square kilometres",
    body: "2D seismic is measured in km and 3D in km². A generic text-to-SQL adds them together; the assistant was taught which unit belongs to which survey.",
    href: "/projects/geosurvai#ask",
    source: "Geosurvai",
  },
  {
    title: "A crew cannot mobilise without permits",
    body: "Seventeen readiness checks per survey make a stalled permit visible before it delays acquisition.",
    href: "/projects/geosurvai#collect",
    source: "Geosurvai",
  },
  {
    title: "One standard for the subsurface",
    body: "More than 100 tables aligned to PPDM 3.9, proven with a cell-level round-trip test of 196,207 values.",
    href: "/projects/geosurvai#rebuild",
    source: "Geosurvai",
  },
];

const timelineEvents = [
  {
    year: "2023 to present",
    role: "Data Scientist & Analyst",
    company: "Waviv Technologies",
    summary:
      "Embedded with Indonesia's upstream oil and gas: SKK Migas for exploration oversight, and PHE OSES for offshore production and HSE. I lead products end to end, from the data model to the model in use.",
    highlights: [
      "Early warning of offshore well failures from 11.4M daily records (LightGBM, time split, calibrated), piloted with PHE OSES.",
      "Geosurvai for SKK Migas: surveys, permits, seismic parameters, and costs in one PPDM 3.9 database, with an assistant that answers 43 of 45 evaluation questions.",
      "SafeView for the PHE OSES HSE team: AI pre-scoring of contractor safety evidence, in daily production use.",
      "Python pipelines from daily Excel reports into a PostgreSQL datamart covering about 1,000 wells and 100 platforms.",
    ],
    technologies: ["Python", "LightGBM", "SQL", "PostgreSQL / PostGIS", "PPDM 3.9", "Docker", "Fastify", "React"],
  },
  {
    year: "2021 to 2023",
    role: "Research Analyst & Site Manager",
    company: "LAPI ITB",
    summary: "Environmental and hydrogeological investigations for government and energy-sector clients.",
    highlights: [
      "Led a field team of about ten, including the drilling crew: shallow core logging, soil and groundwater sampling.",
      "Managed lab results with QA/QC and traceability, and modelled the spread of hydrocarbon contamination.",
      "Produced geological and hydrogeological maps and reports in QGIS and ArcGIS.",
    ],
    technologies: ["QGIS", "ArcGIS", "Petrel", "Global Mapper", "Excel", "QA/QC"],
  },
];

export default async function GeosciencePage() {
  const items = await getShowcase("geoscience");

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/" className={buttonVariants({ variant: "ghost", className: "pl-0 hover:bg-transparent hover:underline text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{geoscienceData.title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">{geoscienceData.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {geoscienceData.topics.map((topic) => (
          <Badge key={topic} variant="secondary" className="font-normal text-xs">
            {topic}
          </Badge>
        ))}
      </div>
      <div className="mt-6 border-l-2 border-primary/20 pl-4">
        <h2 className="text-lg font-semibold mb-2">The foundation</h2>
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            I started in the field: logging cores, sampling groundwater, and running a drilling crew. Geology taught me to
            work with sparse data and to say how sure I am.
          </p>
          <p>
            Today that shows up in the data work: in how a failure is labelled, which units can be added, and which
            numbers a model is allowed to claim.
          </p>
        </div>
      </div>
    </div>
  );

  const RightPanel = (
    <>
      <section aria-labelledby="decisions-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="decisions-heading" className="text-2xl font-bold tracking-tight">
            Where geology changed the model
          </h2>
          <p className="text-sm text-muted-foreground">Four decisions a generic data team would likely have got wrong.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {domainDecisions.map((d) => (
            <Link
              key={d.title}
              href={d.href}
              className="flex flex-col gap-2 rounded-xl border border-border/60 p-5 transition-colors hover:border-primary/50 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-semibold leading-snug">{d.title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{d.body}</span>
              <span className="mt-auto pt-1 text-xs text-primary">Told in full in {d.source}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="cases-heading" className="flex flex-col gap-6">
        <h2 id="cases-heading" className="text-2xl font-bold tracking-tight">
          Case studies, read as a geoscientist
        </h2>
        <ProjectList items={items} empty="No projects found for this domain yet." />
      </section>

      <section aria-labelledby="exp-heading">
        <h2 id="exp-heading" className="text-2xl font-bold tracking-tight mb-8">
          Experience
        </h2>
        <div className="max-w-3xl border-l border-border/50 ml-4 md:ml-0 pl-6 md:pl-8 space-y-10">
          {timelineEvents.map((event) => (
            <div key={event.company} className="relative">
              <span className="absolute -left-[31px] md:-left-[39px] top-6 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
              <div className="space-y-4 rounded-xl border border-border/60 bg-card/40 p-6">
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.year}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">{event.role}</h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Briefcase className="h-4 w-4 shrink-0 text-primary/70" />
                    <span>{event.company}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{event.summary}</p>
                <ul className="space-y-2">
                  {event.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 border-t border-border/40 pt-3">
                  {event.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-normal">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
