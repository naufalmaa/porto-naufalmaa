import prisma from "@/lib/prisma";
import { entriesFor, lensCopy, showcase, type Lens, type ProjectStatus } from "@/data/showcase";

export interface ShowcaseItem {
  key: string;
  title: string;
  summary: string;
  href?: string; // case study or external link
  external: boolean;
  linkLabel?: string;
  coverImage?: string | null;
  status?: ProjectStatus;
  role?: string;
  result?: string;
  period?: string;
  anchorHref?: string;
  anchorLabel?: string;
}

const lensTag: Record<Exclude<Lens, "home">, string> = {
  geoscience: "geoscience",
  "data-ai": "data-ai",
  "beyond-work": "beyond-work",
};

async function publishedProjects() {
  try {
    return await prisma.project.findMany({ where: { published: true }, orderBy: { priority: "desc" } });
  } catch {
    console.error("Database connection failed. Please configure your .env file.");
    return [];
  }
}

// Items for one tab, in showcase order. Published projects that the showcase
// does not know yet still appear at the end, by their database tags, so a new
// seed shows up without touching this file.
export async function getShowcase(lens: Lens): Promise<ShowcaseItem[]> {
  const projects = await publishedProjects();
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const items: ShowcaseItem[] = [];

  for (const entry of entriesFor(lens)) {
    const copy = lensCopy(entry, lens);
    if (entry.external) {
      items.push({
        key: entry.slug,
        title: entry.external.title,
        summary: copy?.blurb ?? entry.external.summary,
        href: entry.external.href,
        external: true,
        linkLabel: entry.external.linkLabel,
        status: entry.status,
        role: entry.role,
        result: entry.result,
        period: entry.external.period,
      });
      continue;
    }
    const project = bySlug.get(entry.slug);
    if (!project) continue;
    items.push({
      key: project.slug,
      title: project.title,
      summary: copy?.blurb ?? project.excerpt,
      href: `/projects/${project.slug}`,
      external: false,
      coverImage: project.coverImage,
      status: entry.status,
      role: entry.role,
      result: entry.result,
      anchorHref: copy?.anchor ? `/projects/${project.slug}#${copy.anchor}` : undefined,
      anchorLabel: copy?.anchorLabel,
    });
  }

  const known = new Set(showcase.map((e) => e.slug));
  const extra = projects.filter(
    (p) => !known.has(p.slug) && (lens === "home" ? p.featured : p.tags.includes(lensTag[lens])),
  );
  for (const p of extra) {
    items.push({
      key: p.slug,
      title: p.title,
      summary: p.excerpt,
      href: `/projects/${p.slug}`,
      external: false,
      coverImage: p.coverImage,
    });
  }
  return items;
}
