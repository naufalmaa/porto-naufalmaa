import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Rocket, BookOpen, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { beyondWorkData } from "@/data/beyond-work";
import { SplitLayout } from "@/components/layout/SplitLayout";
import prisma from "@/lib/prisma";

const explorations = [
  {
    icon: Rocket,
    title: "Side Projects & Open Source",
    description: "Building utilities and open-source tools to solve micro-problems I encounter in my day-to-day work, helping the wider developer and geoscience communities.",
  },
  {
    icon: BookOpen,
    title: "Writing & Research",
    description: "Documenting learnings, dissecting complex systems, and writing technical articles on the intersection of data, AI, and physical sciences.",
  },
  {
    icon: Lightbulb,
    title: "Product Concepts",
    description: "Experimenting with UI/UX, product design, and prototyping new digital solutions that don't necessarily fit into a standard enterprise bucket.",
  },
];

export default async function BeyondWorkPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { published: true, tags: { has: "beyond-work" } },
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
        {beyondWorkData.title}
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        {beyondWorkData.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {beyondWorkData.topics.map((topic) => (
          <Badge key={topic} variant="secondary" className="font-normal text-xs">
            {topic}
          </Badge>
        ))}
      </div>

      <div className="mt-8 border-l-2 border-primary/20 pl-4">
        <h2 className="text-lg font-semibold mb-2">The Tinkering Mindset</h2>
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            I believe that the best way to understand new technology is to build with it. While my core focus is enterprise architecture, "Beyond Work" is where I play.
          </p>
          <p>
            This is the sandbox. It holds the side projects that never shipped, the open-source libraries I maintain, and the product concepts I'm currently exploring.
          </p>
        </div>
      </div>
    </div>
  );

  const RightPanel = (
    <>
      {/* Explorations */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-8">What I Do Here</h2>
        <div className="flex flex-col gap-6">
          {explorations.map((exp) => (
            <Card key={exp.title} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <exp.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl m-0">{exp.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">{exp.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Projects & Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group flex flex-col h-full">
              <Card className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-accent/50 transition-colors overflow-hidden">
                <div className="relative aspect-video bg-muted/50 border-b border-border/50 flex items-center justify-center">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-sm uppercase tracking-widest">No Cover Image</span>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wider">{project.tags[0]}</Badge>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <CardDescription className="text-sm line-clamp-2 leading-relaxed">{project.excerpt}</CardDescription>
                </CardContent>
              </Card>
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
