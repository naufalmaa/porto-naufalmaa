import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { geoscienceData } from "@/data/geoscience";
import { SplitLayout } from "@/components/layout/SplitLayout";

export async function generateStaticParams() {
  return geoscienceData.projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function GeoscienceProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = geoscienceData.projects.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/geoscience" className={buttonVariants({ variant: "ghost", className: "pl-0 hover:bg-transparent hover:underline text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Geoscience
        </Link>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wider">{project.category}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {project.title}
        </h1>
      </div>
      
      <p className="text-lg text-muted-foreground leading-relaxed">
        {project.summary}
      </p>

      {project.externalLink && (
        <div className="mt-4">
          <Link href={project.externalLink} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "w-full sm:w-auto" })}>
            Visit Project <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );

  const RightPanel = (
    <div className="flex flex-col gap-12">
      {/* Hero Image / Cover */}
      <section>
        <div className="w-full aspect-video md:aspect-[21/9] bg-muted/30 rounded-2xl border border-border/50 flex flex-col items-center justify-center gap-4">
           <span className="text-muted-foreground uppercase tracking-widest text-sm">{project.title} Hero Image</span>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="whitespace-pre-line text-muted-foreground leading-relaxed text-lg">
            {project.content}
            
            <h3 className="text-foreground mt-8 mb-4 font-semibold text-2xl">Project Overview</h3>
            <p>
              This is a placeholder for the detailed project content. In the final version, this section will be populated with rich text, markdown, or MDX content detailing the problem, approach, and outcome of the project.
            </p>
            <h3 className="text-foreground mt-8 mb-4 font-semibold text-2xl">My Role & Contributions</h3>
            <ul>
              <li>Led the technical discovery and architectural planning.</li>
              <li>Developed the core geological models and automated pipelines.</li>
              <li>Collaborated with cross-functional teams to ensure data integrity.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
