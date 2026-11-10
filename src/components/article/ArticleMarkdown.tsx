import * as React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { parseHeading } from "@/lib/article";
import { renderBlock } from "./blocks";

/** Plain text of rendered children, for heading ids and fenced code. */
function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement(node)) return textOf((node.props as { children?: React.ReactNode }).children);
  return "";
}

/** Older GeoPorto articles draw their workflow from a code block with this exact text. */
function parseWorkflow(text: string) {
  if (text.includes("User opens the map")) {
    return {
      leftTitle: "Action Trigger",
      rightTitle: "System Pipeline & Outcome",
      leftSteps: [{ label: "User opens the map" }, { label: "Clicks on an asset" }],
      rightSteps: [
        { label: "Sees blocks, wells, facilities, pipelines" },
        { label: "All related data loads in one view" },
        { label: "Production, drilling, geology, economics, documents" },
        { label: "Ask GAIA a question about any document" },
        { label: "Get an answer with source references — instantly" },
      ],
    };
  }

  if (text.includes("Contractor fills project data")) {
    return {
      leftTitle: "Action Trigger",
      rightTitle: "System Pipeline & Outcome",
      leftSteps: [{ label: "Contractor fills project data" }, { label: "No more email attachments" }],
      rightSteps: [
        { label: "Data lands in the system" },
        { label: "Dashboard updates in real time" },
        { label: "Stakeholder monitors progress, cost, timeline" },
        { label: "System auto-generates weekly reports" },
        { label: "AI assistant answers quick questions" },
        { label: "Everyone saves hours — every week" },
      ],
    };
  }

  return null;
}

type Workflow = NonNullable<ReturnType<typeof parseWorkflow>>;

function WorkflowVisualizer({ data }: { data: Workflow }) {
  return (
    <div className="my-8 rounded-2xl border border-border/80 bg-muted/20 dark:bg-card/40 p-5 md:p-7 shadow-xs not-prose">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
        <div className="w-full md:col-span-5 flex flex-col gap-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {data.leftTitle}
          </div>
          {data.leftSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-card border border-border/70 rounded-xl p-3.5 shadow-xs font-sans">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm text-foreground">{step.label}</span>
                  <span className="text-primary font-bold text-sm hidden md:inline">→</span>
                </div>
              </div>
              {idx < data.leftSteps.length - 1 && (
                <div className="flex justify-center -my-1">
                  <div className="flex flex-col items-center text-muted-foreground/60">
                    <div className="w-px h-3 bg-border/80" />
                    <span className="text-[10px] leading-none">↓</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="w-full md:col-span-7 flex flex-col gap-2.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary" />
            {data.rightTitle}
          </div>
          {data.rightSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-card border border-border/70 rounded-xl p-3.5 shadow-xs font-sans flex items-start gap-3">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="font-medium text-sm text-foreground">{step.label}</span>
              </div>
              {idx < data.rightSteps.length - 1 && (
                <div className="flex justify-start ml-6 -my-1">
                  <div className="flex flex-col items-center text-muted-foreground/60">
                    <div className="w-px h-3 bg-border/80" />
                    <span className="text-[10px] leading-none">↓</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

const components: Components = {
  h2: ({ children }) => {
    const { text, id } = parseHeading(textOf(children));
    return (
      <h2 id={id} className="scroll-mt-24">
        {text}
      </h2>
    );
  },
  // `![caption](src)`: the alt text is also the caption. Spans only, since an image sits inside a paragraph.
  img: ({ src, alt }) => {
    const source = typeof src === "string" ? src : "";
    if (!source) return null;
    return (
      <span className="my-8 block">
        <Dialog>
          <DialogTrigger
            render={<button type="button" className="block w-full overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary" />}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={source} alt={alt ?? ""} loading="lazy" className="m-0 h-full w-full cursor-zoom-in object-contain transition-opacity hover:opacity-90" />
          </DialogTrigger>
          <DialogContent
            showCloseButton={true}
            className="flex h-[95vh] max-w-[95vw] items-center justify-center border-none bg-transparent p-0 shadow-none sm:max-w-[95vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={source} alt={alt ?? ""} className="max-h-full max-w-full object-contain" />
          </DialogContent>
        </Dialog>
        {alt && <span className="mt-2 block font-sans text-sm leading-snug text-muted-foreground">{alt}</span>}
      </span>
    );
  },
  // links to other sites open in a new tab; anchors and paths of the site stay in the page
  a: ({ href, children }) =>
    href && /^https?:\/\//.test(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <a href={href}>{children}</a>
    ),
  table: ({ children }) => (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full min-w-[32rem] border-collapse font-sans text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">{children}</thead>,
  th: ({ children }) => <th className="px-4 py-3 font-medium">{children}</th>,
  td: ({ children }) => <td className="border-t border-border/60 px-4 py-3 align-top">{children}</td>,
  pre: ({ children }) => {
    const code = React.Children.toArray(children).find(React.isValidElement) as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;
    const language = /language-([\w-]+)/.exec(code?.props.className ?? "")?.[1];
    const text = textOf(code?.props.children ?? children).replace(/\n$/, "");

    if (language) {
      const block = renderBlock(language, text);
      if (block) return <>{block}</>;
    }
    const workflow = parseWorkflow(text);
    if (workflow) return <WorkflowVisualizer data={workflow} />;

    return (
      <pre className="bg-muted/40 dark:bg-card/60 border border-border/70 rounded-xl p-5 md:p-6 overflow-x-auto my-6 text-foreground font-mono text-xs sm:text-sm md:text-sm leading-relaxed shadow-xs [font-family:Consolas,ui-monospace,Menlo,Monaco,monospace]">
        {children}
      </pre>
    );
  },
  code: ({ className, children }) => {
    const isInline = !className && typeof children === "string" && !children.includes("\n");
    if (isInline) {
      return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-medium">{children}</code>;
    }
    return <code className="font-mono text-inherit">{children}</code>;
  },
};

export function ArticleMarkdown({ text }: { text: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg md:prose-xl prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-p:leading-relaxed prose-p:text-foreground/90 prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground/80 prose-img:rounded-2xl prose-img:shadow-md prose-img:border prose-img:mx-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
