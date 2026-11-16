import Link from "next/link";
import type { ShowcaseItem } from "@/lib/showcase";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  "In production": "border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  Pilot: "border-sky-500/40 text-sky-700 dark:text-sky-300",
  Prototype: "border-border text-muted-foreground",
  Hackathon: "border-amber-500/40 text-amber-700 dark:text-amber-300",
  Research: "border-violet-500/40 text-violet-700 dark:text-violet-300",
};

export function StatusChip({ status }: { status?: string }) {
  if (!status) return null;
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", statusTone[status])}>
      {status}
    </span>
  );
}

// Horizontal row: cover on the left, words on the right. Used on Home and the tab pages.
export function ProjectRow({ item, showCover = true }: { item: ShowcaseItem; showCover?: boolean }) {
  const body = (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <StatusChip status={item.status} />
        {item.period && <span className="text-xs text-muted-foreground">{item.period}</span>}
      </div>
      <h3 className="text-lg font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      {item.result && <p className="text-sm font-medium text-foreground/90">{item.result}</p>}
      <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      {item.role && <p className="text-xs text-muted-foreground">Role: {item.role}</p>}
    </div>
  );

  const cover =
    showCover && !item.external ? (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-muted sm:w-56 sm:shrink-0">
        {item.coverImage ? (
          <img src={item.coverImage} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
    ) : null;

  return (
    <article className="group relative flex flex-col gap-4 sm:flex-row sm:items-start">
      {cover}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {item.href ? (
          <Link
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {body}
          </Link>
        ) : (
          body
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {item.anchorHref && (
            <Link href={item.anchorHref} className="text-primary underline-offset-4 hover:underline">
              {item.anchorLabel ?? "Jump to the relevant section"}
            </Link>
          )}
          {item.external && item.href && (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              {item.linkLabel ?? "Open"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectList({ items, showCover = true, empty }: { items: ShowcaseItem[]; showCover?: boolean; empty?: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{empty ?? "Nothing published here yet."}</p>;
  }
  return (
    <div className="flex flex-col divide-y divide-border/60">
      {items.map((item) => (
        <div key={item.key} className="py-6 first:pt-0 last:pb-0">
          <ProjectRow item={item} showCover={showCover} />
        </div>
      ))}
    </div>
  );
}
