import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { geoscienceData } from "@/data/geoscience";
import { SplitLayout } from "@/components/layout/SplitLayout";
import prisma from "@/lib/prisma";

// Simulated timeline data specific to Geoscience
const timelineEvents = [
  {
    year: "2023 - Present",
    role: "Senior Consultant",
    company: "GeoAnalytics Inc.",
    description: "Leading technical consulting for environmental risk assessment and 3D spatial modeling. Integrating automated pipelines to streamline spatial data processing.",
  },
  {
    year: "2020 - 2023",
    role: "Geological Engineer",
    company: "Earth Resources Ltd.",
    description: "Managed complex geological drilling operations. Created foundational geological models to drive exploration strategy.",
  },
  {
    year: "2018 - 2020",
    role: "Field Geologist",
    company: "Mining Solutions",
    description: "Conducted site investigations, core logging, and structural mapping in challenging remote environments.",
  },
];

export default async function GeosciencePage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { published: true, tags: { has: "geoscience" } },
      orderBy: { priority: "desc" }
    });
  } catch (e) {
    console.error("Database connection failed. Please configure your .env file.");
  }

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="mb-2">
        <Link href="/" className={buttonVariants({ variant: "ghost", className: "pl-0 hover:bg-transparent hover:underline text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        {geoscienceData.title}
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        {geoscienceData.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {geoscienceData.topics.map((topic) => (
          <Badge key={topic} variant="secondary" className="font-normal text-xs">
            {topic}
          </Badge>
        ))}
      </div>

      <div className="mt-8 border-l-2 border-primary/20 pl-4">
        <h2 className="text-lg font-semibold mb-2">The Foundation</h2>
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            My journey began in the field, observing the physical world and trying to make sense of complex, hidden structures.
          </p>
          <p>
            Geology taught me how to think in 3D, how to work with sparse data, and how to manage uncertainty—skills that naturally translated into building digital systems.
          </p>
        </div>
      </div>
    </div>
  );

  const RightPanel = (
    <>
      {/* Experience Timeline */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-8">Experience</h2>
        <div className="max-w-3xl border-l border-border/50 ml-4 md:ml-0 pl-6 md:pl-8 space-y-12">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative">
              <span className="absolute -left-[31px] md:-left-[39px] top-1 w-3 h-3 rounded-full bg-background border-2 border-primary" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-primary tracking-wider uppercase">{event.year}</span>
                <h3 className="text-xl font-semibold">{event.role}</h3>
                <span className="text-sm text-muted-foreground mb-2">{event.company}</span>
                <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Case Studies & Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group">
              <div className="relative aspect-video bg-muted/50 rounded-xl mb-4 overflow-hidden border border-border/50 flex items-center justify-center">
                {project.coverImage ? (
                  <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-muted-foreground text-sm uppercase tracking-widest">No Cover Image</span>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wider">{project.tags[0]}</Badge>
                </div>
                <h3 className="text-lg font-semibold tracking-tight group-hover:underline underline-offset-4 decoration-primary/50">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{project.excerpt}</p>
              </div>
            </Link>
          ))}
          {projects.length === 0 && (
            <div className="col-span-2 text-muted-foreground italic">No projects found for this domain yet.</div>
          )}
        </div>
      </section>
    </>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
