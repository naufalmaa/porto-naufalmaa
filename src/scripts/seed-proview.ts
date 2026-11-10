import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'
import { validateArticle } from '../lib/article-validate'

/**
 * Writes the Proview project (a row of the Project table) from public/asset/article/proview-v1.md.
 *
 *   pnpm seed:proview -- --dry-run   check the article, show what would change, write nothing
 *   pnpm seed:proview                back up the current row to .archive/backups/, upsert, then read it back
 *
 * DATABASE_URL decides which database is written: the one in .env is the live site's.
 */

const SLUG = 'proview'
const ARTICLE = 'public/asset/article/proview-v1.md'

const record = {
  title: 'Proview: From Daily Production Reports to an Early Warning System',
  excerpt:
    'An early warning system for an offshore operator that scores every well daily, turns the risk into a boat visit plan, and lets Zara answer questions without inventing a number.',
  coverImage: '/asset/projects/proview/cover.webp',
  galleryImages: [] as string[],
  tags: ['data-ai', 'geoscience'],
  priority: 94,
  featured: true,
  published: true,
}

async function seed(prisma: PrismaClient, dryRun: boolean) {
  const content = fs.readFileSync(ARTICLE, 'utf-8')

  const errors = validateArticle(content)
  if (!fs.existsSync(path.join('public', record.coverImage))) errors.push(`missing file: ${record.coverImage}`)
  if (errors.length) {
    console.error(`The article is not ready:\n${errors.map((e) => `  - ${e}`).join('\n')}`)
    process.exit(1)
  }

  const before = await prisma.project.findUnique({ where: { slug: SLUG } })
  if (before) {
    const sameContent = before.content === content
    console.log(`Current row: "${before.title}", ${before.content.length} characters, content ${sameContent ? 'unchanged' : 'will change'}`)
    if (!dryRun) {
      const dir = path.join('.archive', 'backups')
      fs.mkdirSync(dir, { recursive: true })
      const file = path.join(dir, `${SLUG}-${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
      fs.writeFileSync(file, JSON.stringify(before, null, 2))
      console.log(`Backed up the current row to ${file}`)
    }
  } else {
    console.log('No row for this slug yet: it will be created')
  }
  console.log(`New row: "${record.title}", ${content.length} characters`)
  if (dryRun) {
    console.log('Dry run: nothing written.')
    return
  }

  await prisma.project.upsert({
    where: { slug: SLUG },
    update: { ...record, content },
    create: { ...record, slug: SLUG, content },
  })

  const after = await prisma.project.findUnique({ where: { slug: SLUG } })
  if (!after || after.content !== content || after.title !== record.title) throw new Error('The row read back is not what was written')
  console.log('Seed proview completed and verified.')
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const prisma = new PrismaClient()
  let retries = 5
  try {
    while (retries > 0) {
      try {
        await seed(prisma, dryRun)
        break
      } catch (e) {
        retries--
        const message = e instanceof Error ? e.message : String(e)
        console.warn(`Seed attempt failed (${message}). Retries left: ${retries}`)
        if (retries === 0) throw e
        await new Promise((res) => setTimeout(res, 3000))
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
