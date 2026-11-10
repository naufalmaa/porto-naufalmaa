import fs from "node:fs";
import path from "node:path";
import { extractHeadings, extractMeta, parseItems, splitSegments } from "./article";

/**
 * Checks an article before it reaches the database: a typo in a marker or a missing file would otherwise only show
 * on the live page. Used by `pnpm check:article` and by the seed scripts.
 */
export function validateArticle(markdown: string, publicDir = "public", { requireFacts = true } = {}): string[] {
  const errors: string[] = [];
  const meta = extractMeta(markdown);
  const segments = splitSegments(meta.body);

  for (const s of segments) {
    if (s.type === "markdown" && /\[(CAROUSEL|VIDEO|STATS|NEXT|FACTS|OG)\b/.test(s.text)) {
      errors.push(`a marker is not closed or has no ":" : ${/\[(CAROUSEL|VIDEO|STATS|NEXT|FACTS|OG)\b[^\n]*/.exec(s.text)?.[0].slice(0, 80)}`);
    }
    if (s.type === "carousel" && s.items.length === 0) errors.push("a CAROUSEL has no items");
    // a legacy list has no captions at all; a structured one captions every image
    if (s.type === "carousel" && s.items.some((i) => i.caption) && s.items.some((i) => !i.caption)) {
      errors.push("a CAROUSEL captions some images and not others");
    }
    if (s.type === "stats" && s.items.some((i) => !i.value || !i.label)) errors.push("a STATS item needs a value and a label");
    if (s.type === "next" && !s.slug) errors.push("NEXT has no slug");
  }

  // anchors: duplicate heading ids, and links of the diagrams that point nowhere
  const headings = extractHeadings(meta.body);
  const ids = new Set<string>();
  for (const h of headings) {
    if (ids.has(h.id)) errors.push(`two headings have the id "${h.id}"`);
    ids.add(h.id);
  }
  for (const block of meta.body.matchAll(/```flow\n([\s\S]*?)```/g)) {
    for (const [, , link] of parseItems(block[1])) {
      if (link?.startsWith("#") && !ids.has(link.slice(1))) errors.push(`a flow step links to #${link.slice(1)}, which is not a heading`);
    }
  }

  // every file of the site that the article uses has to exist
  const refs = new Set<string>();
  for (const m of markdown.matchAll(/(\/asset\/[^\s|;\])"']+)/g)) refs.add(m[1]);
  for (const ref of refs) {
    if (!fs.existsSync(path.join(publicDir, ref))) errors.push(`missing file: ${ref}`);
  }
  if (requireFacts && !meta.facts.length) errors.push("no FACTS marker");
  return errors;
}
