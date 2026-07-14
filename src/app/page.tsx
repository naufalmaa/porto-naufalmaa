import * as React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, FileText, Mail, Map, Database, Lightbulb, Globe, Code } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";

import { SplitLayout } from "@/components/layout/SplitLayout";
import { impactData } from "@/data/impact";
import { socials } from "@/data/socials";

export default async function Home() {
  let featuredProjects: any[] = [];
  try {
    featuredProjects = await prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { priority: 'desc' },
      take: 5
    });
  } catch (e) {
    console.error("Database connection failed. Please configure your .env file.");
  }

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="w-50 h-50 rounded-2xl bg-muted/50 border border-border/50 overflow-hidden flex items-center justify-center shrink-0">
        <img src="./asset/naufal_hero_image.jpg" alt="Naufal" />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Naufal Muhamad Adzkia</h1>
        <h2 className="text-xl font-medium text-muted-foreground">Bridging the Earth and Technology</h2>
      </div>

      <p className="text-lg leading-relaxed text-foreground/90 font-medium">
        A Geoscientist focused on engineering modern solutions. Driven by a deep interest in how data shapes our understanding of the world, I build scalable systems to solve complex challenges from the ground up.
      </p>

      <p className="text-base text-muted-foreground leading-relaxed">
        5+ years across consulting, geoscience, data, AI, and product development.
      </p>

      <div className="flex flex-col gap-3 mt-4">
        {socials.map((social) => {
          let Icon = ExternalLink;
          if (social.icon === 'linkedin') Icon = Globe;
          if (social.icon === 'github') Icon = Code;
          if (social.icon === 'mail') Icon = Mail;
          if (social.icon === 'file-text') Icon = FileText;

          return (
            <Link
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", className: "w-full justify-start gap-3 h-12 rounded-xl" })}
            >
              <Icon className="h-4 w-4 opacity-70" />
              <span>{social.platform}</span>
            </Link>
          )
        })}
      </div>
    </div>
  );

  const RightPanel = (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Featured Work</h3>
        <Link href="/projects" className="text-sm text-primary hover:underline font-medium">View all projects &rarr;</Link>
      </div>
      <div className="flex flex-col gap-6">
        {featuredProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`} className="group relative">
            <div className="absolute -inset-y-4 -inset-x-4 z-0 scale-95 bg-muted/40 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 sm:rounded-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="sm:w-1/3 shrink-0">
                <div className="aspect-video w-full rounded-xl bg-muted overflow-hidden flex items-center justify-center border border-border/50">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">No Cover</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.excerpt}</p>
                <div className="flex gap-2 mt-1">
                  {project.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-[10px] uppercase font-normal">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {featuredProjects.length === 0 && (
          <div className="text-muted-foreground text-sm italic">No featured projects found in the database.</div>
        )}
      </div>
    </div>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
