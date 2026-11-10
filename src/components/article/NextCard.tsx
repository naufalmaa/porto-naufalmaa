import Link from "next/link";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";

/** Card at the end of an article that leads to another published project. Renders nothing if it cannot be found. */
export async function NextCard({ slug }: { slug: string }) {
  let project: { slug: string; title: string; coverImage: string | null } | null = null;
  try {
    const found = await prisma.project.findUnique({ where: { slug }, select: { slug: true, title: true, coverImage: true, published: true } });
    if (found?.published) project = found;
  } catch (error) {
    console.error("NextCard: could not read the project", error);
  }
  if (!project) return null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group not-prose my-10 flex items-center gap-4 rounded-2xl border border-border/70 bg-card/40 p-4 font-sans transition-colors hover:bg-muted/40 sm:gap-5"
    >
      <div className="aspect-video w-28 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted sm:w-44">
        {project.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.coverImage} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Next case study</span>
        <span className="mt-1 block text-base font-bold leading-snug transition-colors group-hover:text-primary sm:text-lg">{project.title}</span>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
