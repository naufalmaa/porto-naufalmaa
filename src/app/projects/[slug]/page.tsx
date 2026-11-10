import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import prisma from "@/lib/prisma";
import { extractHeadings, extractMeta, readingMinutes, splitSegments, type Segment } from "@/lib/article";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { ArticleMarkdown } from "@/components/article/ArticleMarkdown";
import { ArticleCarousel, ArticleVideo } from "@/components/article/ArticleMedia";
import { Facts, Stats, Toc } from "@/components/article/blocks";
import { NextCard } from "@/components/article/NextCard";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

const getProject = React.cache(async (slug: string) => {
  try {
    return await prisma.project.findUnique({ where: { slug } });
  } catch {
    console.error("Database connection failed. Please configure your .env file.");
    return null;
  }
});

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project || !project.published) return { title: "Project not found" };

  const { og } = extractMeta(project.content);
  return {
    title: project.title,
    description: project.excerpt,
    // only an article that names a preview image gets one; the others keep the site default
    ...(og && {
      openGraph: { type: "article", title: project.title, description: project.excerpt, images: [{ url: og, width: 1200, height: 630, alt: project.title }] },
      twitter: { card: "summary_large_image", title: project.title, description: project.excerpt, images: [og] },
    }),
  };
}

function renderSegment(segment: Segment, key: number, galleryImages: string[]) {
  switch (segment.type) {
    case "markdown":
      return <ArticleMarkdown key={key} text={segment.text} />;
    case "gallery":
      return galleryImages.length ? (
        <ArticleCarousel key={key} items={galleryImages.map((src) => ({ src, caption: "" }))} altPrefix="Gallery showcase" frame="video" />
      ) : null;
    case "carousel": {
      const legacy = segment.items.every((item) => !item.caption);
      return <ArticleCarousel key={key} items={segment.items} altPrefix="Showcase" frame={legacy ? "video" : "wide"} />;
    }
    case "video":
      return <ArticleVideo key={key} src={segment.src} poster={segment.poster} caption={segment.caption} loop={segment.loop} />;
    case "stats":
      return <Stats key={key} items={segment.items} />;
    case "next":
      return <NextCard key={key} slug={segment.slug} />;
  }
}

export default async function ProjectDetailPage(props: PageProps) {
  const { slug } = await props.params;
  const project = await getProject(slug);

  if (!project || !project.published) {
    notFound();
  }

  const { body, facts } = extractMeta(project.content);
  const segments = splitSegments(body);
  const headings = extractHeadings(body);
  const minutes = readingMinutes(body);
  // an article that opens with a video shows it as its hero, in place of the cover image
  const heroVideo = segments[0]?.type === "video" ? segments[0] : null;
  const rest = heroVideo ? segments.slice(1) : segments;

  const LeftPanel = (
    <div className="flex flex-col gap-4 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2">
      <div className="mb-2">
        <Link href="/projects" className={buttonVariants({ variant: "ghost", className: "pl-0 hover:bg-transparent hover:underline text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-normal text-[10px] uppercase tracking-wider">
              {tag}
            </Badge>
          ))}
          <span className="font-sans text-xs text-muted-foreground">· {minutes} min read</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-3xl xl:text-4xl">{project.title}</h1>
      </div>

      <p className="text-base leading-relaxed text-muted-foreground xl:text-lg">{project.excerpt}</p>

      <Facts facts={facts} />
      <Toc headings={headings} />
    </div>
  );

  const RightPanel = (
    <div className="flex flex-col gap-12">
      {heroVideo ? (
        <section>
          <ArticleVideo src={heroVideo.src} poster={heroVideo.poster} caption={heroVideo.caption} loop={heroVideo.loop} />
        </section>
      ) : (
        project.coverImage && (
          <section>
            <div className="w-full aspect-video md:aspect-[21/9] bg-muted/30 rounded-2xl border border-border/50 flex flex-col items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
            </div>
          </section>
        )
      )}

      <section className="pb-16 font-serif">{rest.map((segment, index) => renderSegment(segment, index, project.galleryImages))}</section>
    </div>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
