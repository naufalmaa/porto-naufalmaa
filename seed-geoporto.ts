import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
  await prisma.project.deleteMany({}) // remove dummies

  const rawMd = fs.readFileSync('public/asset/article/geoporto.md', 'utf-8')
  
  let content = rawMd
    .replace('[Insert Hero Image: Full dashboard overview showing map, charts, and AI assistant]', '')
    .replace('[Insert Image: Interactive asset map showing blocks, wells, and facilities]', '\n\n[CAROUSEL_PLACEHOLDER]\n\n')
    .replace(
      '[Insert Image: Asset map with wells, pipelines, and facilities]', 
      '![Asset map with wells, pipelines, and facilities](/asset/projects/geoporto/01-geospatial-context.png)'
    )
    .replace(
      '[Insert Image: Well log visualization showing GR, RHOB, and NPHI tracks]',
      '![Well log visualization showing GR, RHOB, and NPHI tracks](/asset/projects/geoporto/03-well-log-exploration.png)'
    )
    .replace(
      '[Insert Image: GAIA AI assistant answering questions with document references]',
      '![GAIA AI assistant answering questions with document references](/asset/projects/geoporto/02-document-intelligence-with-gaia.png)'
    )

  await prisma.project.create({
    data: {
      title: 'GeoPorto: Unified Geoscience Workspace',
      slug: 'geoporto',
      excerpt: 'A web-based platform designed to bring multiple data domains together into a single experience, featuring interactive asset maps, well logs, and an AI assistant.',
      content: content,
      coverImage: '/asset/projects/geoporto/pic-0-lead.png',
      galleryImages: [
        '/asset/projects/geoporto/pic-1-overview.png',
        '/asset/projects/geoporto/pic-2-operations.png',
        '/asset/projects/geoporto/pic-3-production.png',
        '/asset/projects/geoporto/pic-4-gng.png',
        '/asset/projects/geoporto/pic-5-drilling.png',
        '/asset/projects/geoporto/pic-6-cost.png',
        '/asset/projects/geoporto/pic-7-file-repository.png',
        '/asset/projects/geoporto/pic-8-ai-assistant.png',
      ],
      tags: ['geoscience', 'data-ai', 'beyond-work'],
      priority: 100,
      featured: true,
      published: true
    }
  })

  console.log('Seed completed!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
