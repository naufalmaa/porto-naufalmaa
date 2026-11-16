import * as React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, FileText, Mail, Globe, Code } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import { SplitLayout } from "@/components/layout/SplitLayout";
import { ProjectList, StatusChip } from "@/components/portfolio/ProjectCard";
import { getShowcase } from "@/lib/showcase";
import { capabilities, featuredCase, principles } from "@/data/impact";
import { socials } from "@/data/socials";

// the projects come from the database: render on every request so a seed shows without a redeploy
export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = (await getShowcase("home")).filter((item) => item.key !== featuredCase.slug);

  const LeftPanel = (
    <div className="flex flex-col gap-6">
      <div className="h-48 w-48 shrink-0 overflow-hidden rounded-2xl border border-border/50 bg-muted/50">
        <img src="/asset/naufal_hero_image.jpg" alt="Naufal Muhamad Adzkia" className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Naufal Muhamad Adzkia</h1>
        <p className="text-xl font-medium text-foreground/90">
          Data scientist for energy operations, from messy daily data to models people act on.
        </p>
      </div>

      <p className="text-base leading-relaxed text-muted-foreground">
        Geological engineer turned data scientist. I own projects end to end with oil and gas teams in Indonesia:
        defining the label, building the model, wiring it into a decision, and saying plainly what it cannot do.
      </p>

      <p className="rounded-xl border border-border/60 px-4 py-3 text-sm text-foreground/90">
        Open to Data Scientist (ML) roles, remote from Indonesia.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {socials.map((social) => {
          let Icon = ExternalLink;
          if (social.icon === "linkedin") Icon = Globe;
          if (social.icon === "github") Icon = Code;
          if (social.icon === "mail") Icon = Mail;
          if (social.icon === "file-text") Icon = FileText;
          return (
            <Link
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", className: "h-11 w-full justify-start gap-3 rounded-xl" })}
            >
              <Icon className="h-4 w-4 opacity-70" />
              <span>{social.platform}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  const RightPanel = (
    <>
      {/* One case told end to end: problem, what I did, result */}
      <section aria-labelledby="featured-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span>Featured case study</span>
            <StatusChip status="Pilot" />
          </div>
          <h2 id="featured-heading" className="text-2xl font-bold tracking-tight">
            {featuredCase.title}
          </h2>
          <p className="text-sm text-muted-foreground">{featuredCase.client}</p>
        </div>

        <Link
          href={featuredCase.links[0].href}
          className="block overflow-hidden rounded-xl border border-border/60 bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img src={featuredCase.image} alt={featuredCase.imageAlt} className="aspect-[16/9] w-full object-cover" />
        </Link>

        <dl className="grid gap-5 md:grid-cols-3">
          {featuredCase.steps.map((step) => (
            <div key={step.label} className="flex flex-col gap-2 border-l-2 border-primary/30 pl-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-primary">{step.label}</dt>
              <dd className="text-sm leading-relaxed text-foreground/90">{step.body}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={featuredCase.links[0].href} className={buttonVariants({ className: "gap-2 rounded-xl" })}>
            {featuredCase.links[0].label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={featuredCase.links[1].href}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {featuredCase.links[1].label}
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">Screens use demo data with fictional names.</p>
      </section>

      <section aria-labelledby="help-heading" className="flex flex-col gap-6">
        <h2 id="help-heading" className="text-2xl font-bold tracking-tight">
          What I can help with
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((cap) => (
            <div key={cap.title} className="flex flex-col gap-3 rounded-xl border border-border/60 p-5">
              <h3 className="text-base font-semibold leading-snug">{cap.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{cap.body}</p>
              <ul className="mt-auto flex flex-col gap-1.5 pt-1 text-sm">
                {cap.proof.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-primary underline-offset-4 hover:underline">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={cap.href}
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {cap.hrefLabel}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="work-heading" className="flex flex-col gap-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="work-heading" className="text-2xl font-bold tracking-tight">
            More case studies
          </h2>
          <Link href="/projects" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            All projects
          </Link>
        </div>
        <ProjectList items={featured} empty="No featured projects found in the database." />
      </section>

      <section aria-labelledby="how-heading" className="flex flex-col gap-6">
        <h2 id="how-heading" className="text-2xl font-bold tracking-tight">
          How I work
        </h2>
        <dl className="grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="flex flex-col gap-2">
              <dt className="font-semibold">{p.title}</dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );

  return <SplitLayout left={LeftPanel} right={RightPanel} />;
}
