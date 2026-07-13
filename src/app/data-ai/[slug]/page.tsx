import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Network } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { dataAiData } from "@/data/data-ai";
import { SplitLayout } from "@/components/layout/SplitLayout";

export async function generateStaticParams() {
  return dataAiData.projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function DataAiProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = dataAiData.projects.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/data-ai" className={buttonVariants({ variant: "ghost", className: "pl-0 hover:bg-transparent hover:underline text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Data & AI
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
            Visit Live System <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );

  const RightPanel = (
    <div className="flex flex-col gap-12">
      {/* Hero Image / Architecture Diagram */}
      <section>
        <div className="w-full aspect-video md:aspect-[21/9] bg-muted/30 rounded-2xl border border-border/50 flex flex-col items-center justify-center gap-4">
           <Network className="h-12 w-12 text-muted-foreground opacity-50" />
           <span className="text-muted-foreground uppercase tracking-widest text-sm">{project.title} Architecture</span>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="whitespace-pre-line text-muted-foreground leading-relaxed text-lg">
            {project.content}
            
            <h3 className="text-foreground mt-8 mb-4 font-semibold text-2xl">System Architecture</h3>
            <p>
              This section breaks down the technical stack, data flow, and infrastructure decisions made to support the product's scale and requirements. 
            </p>
            <h3 className="text-foreground mt-8 mb-4 font-semibold text-2xl">Key Technical Challenges</h3>
            <ul>
              <li>Ingesting and processing unstructured data securely.</li>
              <li>Optimizing the embedding generation and vector search latency.</li>
              <li>Ensuring the LLM agent avoids hallucinations using context grounding.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
