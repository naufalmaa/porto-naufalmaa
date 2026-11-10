import fs from 'node:fs'
import { extractHeadings, extractMeta, readingMinutes, splitSegments } from '../lib/article'
import { validateArticle } from '../lib/article-validate'

/** pnpm check:article [file]: validates an article's markup and files, and prints how the page will read it. No database. */

const file = process.argv[2] ?? 'public/asset/article/geosurvai-v3.md'
const markdown = fs.readFileSync(file, 'utf-8')

const errors = validateArticle(markdown)
const meta = extractMeta(markdown)
const segments = splitSegments(meta.body)
const counts = segments.reduce<Record<string, number>>((acc, s) => ({ ...acc, [s.type]: (acc[s.type] ?? 0) + 1 }), {})

console.log(`${file}: ${readingMinutes(meta.body)} min read, ${extractHeadings(meta.body).length} headings`)
console.log(`segments: ${JSON.stringify(counts)}`)
console.log(`facts: ${meta.facts.map((f) => f.label).join(', ')}`)
console.log(`og: ${meta.og ?? '(none)'}`)

if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`)
  process.exit(1)
}
console.log('\nOK')
