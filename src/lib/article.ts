/**
 * Markup of a project article (the markdown stored in Project.content).
 *
 * Block markers, written like `[NAME: body]`. A body may span several lines, and its items are separated by a
 * new line or `;;`. Parts of an item are separated by `|`, so none of them may contain `|`, `;;` or `]`.
 *
 *   [FACTS: Title | Data Scientist ;; Role | PIC]             facts shown in the left panel (taken out of the body)
 *   [OG: /asset/projects/x/og.jpg]                            link-preview image (taken out of the body)
 *   [VIDEO: src | poster | caption | loop]                    `loop` = autoplay, muted, no controls; else controls
 *   [CAROUSEL: src | caption ;; src | caption]                images with a caption each
 *   [STATS: 12 | modules ;; 17 | checks]                      a row of figures
 *   [NEXT: slug]                                              card of the next project
 *
 * Older articles keep working: `[CAROUSEL_PLACEHOLDER]` (the project's gallery) and `[CAROUSEL: url, url]`.
 * Headings take an explicit anchor: `## Collect: enter data once {#collect}`.
 * Fenced blocks `flow`, `pipeline`, `glossary` and `arch` are drawn as diagrams (see components/article/blocks.tsx).
 */

export interface CarouselItem {
  src: string;
  caption: string;
}

export type Segment =
  | { type: "markdown"; text: string }
  | { type: "gallery" }
  | { type: "carousel"; items: CarouselItem[] }
  | { type: "video"; src: string; poster?: string; caption?: string; loop: boolean }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "next"; slug: string };

export interface ArticleMeta {
  /** the markdown without the FACTS and OG markers */
  body: string;
  facts: { label: string; value: string }[];
  og?: string;
}

const NAMES = "CAROUSEL|VIDEO|STATS|NEXT|FACTS|OG";
const MARKER = new RegExp(`(\\[(?:CAROUSEL_PLACEHOLDER|(?:${NAMES}):[^\\]]*)\\])`, "g");
const MARKER_ONE = /^\[([A-Z_]+)(?::([\s\S]*))?\]$/;

/** Items of a marker body: split on new lines or `;;`, then on `|`. */
export function parseItems(body: string): string[][] {
  return body
    .split(/\n|;;/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((part) => part.trim()));
}

/** Takes the FACTS and OG markers out of the markdown. */
export function extractMeta(markdown: string): ArticleMeta {
  const facts: ArticleMeta["facts"] = [];
  let og: string | undefined;
  const body = markdown.replace(new RegExp(`\\[(FACTS|OG):([^\\]]*)\\]\\s*`, "g"), (_all, name: string, inner: string) => {
    if (name === "OG") og = inner.trim();
    else for (const [label, value] of parseItems(inner)) if (label && value) facts.push({ label, value });
    return "";
  });
  return { body: body.trim() + "\n", facts, og };
}

export function splitSegments(body: string): Segment[] {
  const out: Segment[] = [];
  for (const piece of body.split(MARKER)) {
    const m = MARKER_ONE.exec(piece);
    if (!m || !new RegExp(`^(CAROUSEL_PLACEHOLDER|${NAMES})$`).test(m[1])) {
      if (piece.trim()) out.push({ type: "markdown", text: piece });
      continue;
    }
    const [, name, inner = ""] = m;
    if (name === "CAROUSEL_PLACEHOLDER") out.push({ type: "gallery" });
    else if (name === "CAROUSEL") out.push({ type: "carousel", items: parseCarousel(inner) });
    else if (name === "VIDEO") {
      const [src, poster, caption, flag] = parseItems(inner)[0] ?? [];
      if (src) out.push({ type: "video", src, poster: poster || undefined, caption: caption || undefined, loop: flag === "loop" });
    } else if (name === "STATS") {
      out.push({ type: "stats", items: parseItems(inner).map(([value, label = ""]) => ({ value, label })) });
    } else if (name === "NEXT") out.push({ type: "next", slug: inner.trim() });
  }
  return out;
}

function parseCarousel(inner: string): CarouselItem[] {
  const structured = /[|\n]|;;/.test(inner.trim());
  const rows = structured ? parseItems(inner) : inner.split(",").map((url) => [url.trim()]);
  return rows.filter((row) => row[0]).map(([src, caption = ""]) => ({ src, caption }));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** A heading line without its `{#id}`, and the id it gets. */
export function parseHeading(raw: string): { text: string; id: string } {
  const m = /^(.*?)\s*\{#([\w-]+)\}\s*$/.exec(raw.trim());
  if (m) return { text: m[1], id: m[2] };
  return { text: raw.trim(), id: slugify(raw) };
}

/** The `##` headings, for the table of contents. Lines inside code fences are ignored. */
export function extractHeadings(markdown: string): { text: string; id: string }[] {
  const out: { text: string; id: string }[] = [];
  let fenced = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) fenced = !fenced;
    else if (!fenced) {
      const m = /^##\s+(.+)$/.exec(line);
      if (m) out.push(parseHeading(m[1]));
    }
  }
  return out;
}

export function readingMinutes(markdown: string, wordsPerMinute = 230): number {
  const words = markdown
    .replace(MARKER, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[#>*`|{}]/g, " ")
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w)).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
