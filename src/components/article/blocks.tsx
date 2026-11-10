import * as React from "react";
import { cn } from "@/lib/utils";
import { parseItems } from "@/lib/article";

/** Static blocks of an article: figures, diagrams, facts and the table of contents. No client code. */

const card = "rounded-xl border border-border/70 bg-card";

function highlighted(text: string): { text: string; on: boolean } {
  return text.startsWith("*") ? { text: text.slice(1).trim(), on: true } : { text, on: false };
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-3 font-sans md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className={cn(card, "p-4")}>
          <div className="text-2xl font-bold tabular-nums tracking-tight text-foreground">{item.value}</div>
          <div className="mt-1 text-xs leading-snug text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

/** ```flow: `Step | description | #anchor` per line; a leading * marks the step the article is about. */
function Flow({ text }: { text: string }) {
  const steps = parseItems(text);
  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-2 font-sans md:grid-cols-5">
      {steps.map(([title, description = "", link]) => {
        const { text: label, on } = highlighted(title);
        const body = (
          <>
            <span className="block text-sm font-semibold text-foreground">{label}</span>
            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{description}</span>
          </>
        );
        const className = cn(card, "block p-3 transition-colors", on && "border-primary/70", link && "hover:bg-muted/50");
        return link ? (
          <a key={label} href={link} className={className}>
            {body}
          </a>
        ) : (
          <div key={label} className={className}>
            {body}
          </div>
        );
      })}
    </div>
  );
}

/** ```pipeline: `Step | description` per line, numbered in order. */
function Pipeline({ text }: { text: string }) {
  const steps = parseItems(text);
  return (
    <ol className="not-prose my-8 grid list-none grid-cols-2 gap-2 p-0 font-sans sm:grid-cols-3 lg:grid-cols-6">
      {steps.map(([title, description = ""], index) => {
        const { text: label, on } = highlighted(title);
        return (
          <li key={label} className={cn(card, "p-3", on && "border-primary/70 bg-primary/10")}>
            <span className="block text-sm font-semibold text-foreground">
              {index + 1}. {label}
            </span>
            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{description}</span>
          </li>
        );
      })}
    </ol>
  );
}

/** ```glossary: `Term | meaning` per line. */
function Glossary({ text }: { text: string }) {
  return (
    <dl className="not-prose my-8 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 rounded-xl bg-muted/40 p-4 font-sans text-sm">
      {parseItems(text).map(([term, meaning = ""]) => (
        <React.Fragment key={term}>
          <dt className="font-semibold text-foreground">{term}</dt>
          <dd className="m-0 text-muted-foreground">{meaning}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

/** ```arch: `Before: a > b > c` and `After: a > b > *c`, drawn as two stacks. A leading * marks the key part. */
function Arch({ text }: { text: string }) {
  const stacks = text
    .split("\n")
    .map((line) => /^([^:]+):\s*(.+)$/.exec(line.trim()))
    .filter((m): m is RegExpExecArray => Boolean(m))
    .map((m) => ({ title: m[1], nodes: m[2].split(">").map((n) => n.trim()) }));
  return (
    <div className="not-prose my-8 grid gap-4 font-sans md:grid-cols-2">
      {stacks.map((stack) => (
        <div key={stack.title} className={cn(card, "flex flex-col gap-1.5 p-4")}>
          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stack.title}</h4>
          {stack.nodes.map((node, index) => {
            const { text: label, on } = highlighted(node);
            return (
              <React.Fragment key={label}>
                {index > 0 && (
                  <span aria-hidden className="text-center text-xs leading-none text-muted-foreground">
                    ↓
                  </span>
                )}
                <div className={cn("rounded-md px-3 py-2 text-sm", on ? "bg-primary/15 font-medium text-foreground" : "bg-muted/50 text-foreground/90")}>
                  {label}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** `**bold**` and `[text](url)` inside a callout. Nothing else is read as markup. */
function inline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={index}>{bold[1]}</strong>;
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a key={index} href={link[2]} className="underline underline-offset-4 hover:text-primary" {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

/** ```callout: the first line is the title, the paragraphs after it are separated by a blank line. */
function Callout({ text }: { text: string }) {
  const [title, ...rest] = text.split("\n");
  const paragraphs = rest.join("\n").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <aside className="not-prose my-8 rounded-xl border border-border/70 bg-muted/30 p-5 font-sans text-sm leading-relaxed text-foreground/90">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="m-0 mb-2 last:mb-0">
          {inline(paragraph)}
        </p>
      ))}
    </aside>
  );
}

/** Fenced blocks drawn as diagrams; null for any other language so the caller renders plain code. */
export function renderBlock(language: string, text: string): React.ReactNode | null {
  switch (language) {
    case "callout":
      return <Callout text={text} />;
    case "flow":
      return <Flow text={text} />;
    case "pipeline":
      return <Pipeline text={text} />;
    case "glossary":
      return <Glossary text={text} />;
    case "arch":
      return <Arch text={text} />;
    default:
      return null;
  }
}

export function Facts({ facts }: { facts: { label: string; value: string }[] }) {
  if (!facts.length) return null;
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-sans text-sm">
      {facts.map(({ label, value }) => (
        <React.Fragment key={label}>
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="m-0 text-foreground/90">{value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export function Toc({ headings }: { headings: { text: string; id: string }[] }) {
  if (headings.length < 3) return null;
  const links = headings.map((h) => (
    <a key={h.id} href={`#${h.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
      {h.text}
    </a>
  ));
  return (
    <>
      <nav aria-label="On this page" className="hidden flex-col gap-1 border-l-2 border-border pl-3 font-sans text-sm lg:flex">
        {links}
      </nav>
      <details className="rounded-lg border border-border/60 px-4 py-3 font-sans text-sm lg:hidden">
        <summary className="cursor-pointer font-medium">On this page</summary>
        <nav aria-label="On this page" className="mt-3 flex flex-col gap-2">
          {links}
        </nav>
      </details>
    </>
  );
}
