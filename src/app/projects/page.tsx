import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/prisma"
import { SplitLayout } from "@/components/layout/SplitLayout"

// the projects come from the database: render on every request so a seed shows without a redeploy
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { priority: 'desc' }
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
        All Projects
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        A comprehensive index of my work across Geoscience, Data & AI, and Beyond Work.
      </p>

      <div className="mt-8 border-l-2 border-primary/20 pl-4">
        <h2 className="text-lg font-semibold mb-2">The Archive</h2>
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            Here lies a collection of systems built, models trained, and experiments conducted.
          </p>
          <p>
            You can filter through the domains to find specific case studies on how I approach complex problems.
          </p>
        </div>
      </div>
    </div>
  )

  const RightPanel = (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-8">Index</h2>
      <div className="flex flex-col gap-8">
        {projects.map((project) => (
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
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{project.excerpt}</p>
                <div className="flex gap-2 mt-2">
                  {project.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-[10px] uppercase font-normal">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="text-muted-foreground">No published projects yet.</div>
        )}
      </div>
    </section>
  )

  return <SplitLayout left={LeftPanel} right={RightPanel} />
}
