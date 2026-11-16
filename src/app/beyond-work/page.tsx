import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { beyondWorkData } from "@/data/beyond-work";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { ProjectList } from "@/components/portfolio/ProjectCard";
import { getShowcase } from "@/lib/showcase";

export const dynamic = "force-dynamic";

// What I am learning right now. Update this block as each step ships.
const nowLearning = {
  title: "Traditional ML, in the open",
  body: "A six-week plan to put the methods behind Proview into public, runnable code: predictive maintenance on compressor sensor data, a grey-box oil production forecast on public field data, and one of them taken to production with scheduled retraining and drift monitoring.",
  steps: [
    { label: "Predictive maintenance on compressor sensors", state: "Up next" },
    { label: "Grey-box production forecast (decline curve plus gradient boosting)", state: "Planned" },
    { label: "Serving, scheduled retraining, and monitoring", state: "Planned" },
    { label: "An agent on top, with its own evaluation set", state: "Planned" },
  ],
};

export default async function BeyondWorkPage() {
  const items = await getShowcase("beyond-work");

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/" className={buttonVariants({ variant: "ghost", className: "pl-0 hover:bg-transparent hover:underline text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{beyondWorkData.title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">{beyondWorkData.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {beyondWorkData.topics.map((topic) => (
          <Badge key={topic} variant="secondary" className="font-normal text-xs">
            {topic}
          </Badge>
        ))}
      </div>
      <div className="mt-6 border-l-2 border-primary/20 pl-4">
        <h2 className="text-lg font-semibold mb-2">Why this page exists</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The best way I know to understand a new tool is to build something small and real with it. This is where those
          builds live, with an honest label on each: hackathon, research, or prototype.
        </p>
      </div>
    </div>
  );

  const RightPanel = (
    <>
      <section aria-labelledby="now-heading" className="flex flex-col gap-4 rounded-xl border border-border/60 p-6">
        <h2 id="now-heading" className="text-2xl font-bold tracking-tight">
          Now learning: {nowLearning.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{nowLearning.body}</p>
        <ol className="flex flex-col gap-2">
          {nowLearning.steps.map((s, i) => (
            <li key={s.label} className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-2 text-sm last:border-0">
              <span>
                <span className="mr-2 tabular-nums text-muted-foreground">{i + 1}.</span>
                {s.label}
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{s.state}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted-foreground">Code and write-ups will be linked here as each step ships.</p>
      </section>

      <section aria-labelledby="builds-heading" className="flex flex-col gap-6">
        <h2 id="builds-heading" className="text-2xl font-bold tracking-tight">
          Builds and research
        </h2>
        <ProjectList items={items} empty="Nothing published here yet." />
      </section>
    </>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
