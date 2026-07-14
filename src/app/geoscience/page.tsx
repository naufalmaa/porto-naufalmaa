import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { geoscienceData } from "@/data/geoscience";
import { SplitLayout } from "@/components/layout/SplitLayout";
import prisma from "@/lib/prisma";

// Simulated timeline data specific to Geoscience
const timelineEvents = [
  {
    year: "2023 - Present",
    role: "Geoscience Data Scientist & Analyst",
    company: "Waviv Technologies",
    summary:
      "Develop AI-powered applications and data solutions for Indonesia's energy sector, supporting SKK Migas and Pertamina Hulu Energi. My work focuses on AI, machine learning, data engineering, analytics, and digital transformation for geological and operational workflows.",
    highlights: [
      "Develop AI-powered applications for geological, geophysical, production, and operational datasets.",
      "Design interactive dashboards and production forecasting solutions using Python, Pandas, Plotly, and Dash.",
      "Build and maintain PostgreSQL & MySQL databases for exploration, well, and production data.",
      "Prototype machine learning models for oil production forecasting using regression techniques.",
      "Develop LLM-powered AI assistants and document intelligence systems with OpenAI API, LangChain, VLLM, and Ollama.",
      "Built an AI-assisted CSMS evaluation platform that reduced document validation time by 40–50% while achieving 80%+ AI confidence across 50+ users.",
      "Contribute to enterprise web application development using FastAPI, Fastify, React, and Next.js from prototyping to production deployment.",
    ],
    technologies: [
      "Python",
      "SQL",
      "Pandas",
      "Plotly",
      "Dash",
      "FastAPI",
      "Fastify",
      "React",
      "Next.js",
      "PostgreSQL",
      "MySQL",
      "OpenAI API",
      "LangChain",
      "VLLM",
      "Ollama",
      "Machine Learning",
      "LLM",
    ],
  },
  {
    year: "2021 - 2023",
    role: "Researcher Analyst & Site Manager",
    company: "LAPI ITB",
    summary:
      "Delivered multidisciplinary geological and environmental consulting projects involving field investigations, geospatial analysis, geological modeling, and technical reporting for government and energy-sector clients.",
    highlights: [
      "Conducted geological field investigations, sampling, and subsurface data acquisition.",
      "Managed geological, environmental, and spatial datasets through validation, cleaning, and QA/QC processes.",
      "Built structured project databases to improve data consistency and reporting quality.",
      "Applied Petrel, QGIS, and GIS tools for geological modeling, visualization, and interpretation.",
      "Coordinated multidisciplinary field teams while ensuring project quality, compliance, and timely delivery.",
    ],
    technologies: [
      "Petrel",
      "QGIS",
      "ArcGIS",
      "Global Mapper",
      "Python",
      "Excel",
      "GIS",
      "Geological Mapping",
      "QA/QC",
      "Field Investigation",
    ],
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
        <div className="max-w-3xl border-l border-border/50 ml-4 md:ml-0 pl-6 md:pl-8 space-y-10">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative group">
              <span className="absolute -left-[31px] md:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors" />
              
              <div className="bg-card/40 hover:bg-card/60 transition-all border border-border/60 hover:border-primary/30 rounded-xl p-6 space-y-5">
                {/* Header: Year, Role, Company */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary tracking-wider uppercase">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.year}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    {event.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Briefcase className="w-4 h-4 text-primary/70 shrink-0" />
                    <span>{event.company}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {event.summary}
                </p>

                {/* Highlights */}
                {event.highlights && event.highlights.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                      Key Highlights & Contributions
                    </h4>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/80 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {event.technologies && event.technologies.length > 0 && (
                  <div className="pt-2 border-t border-border/40">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2.5">
                      <Layers className="w-3.5 h-3.5 text-primary/70" />
                      <span>Technologies & Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {event.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs font-normal bg-secondary/60 hover:bg-secondary text-secondary-foreground transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
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
