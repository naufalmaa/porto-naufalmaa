import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function seed() {
  const rawMd = fs.readFileSync('public/asset/article/geoporto-v2.md', 'utf-8')
  
  let content = rawMd
    .replace('[Insert Image: GeoPorto Hero — Dashboard Overview with Map, Charts, and AI Assistant]', '')
    .replace(
      'The goal wasn\'t to visualize data. The goal was to make information **easier to discover, understand, and connect** — so engineers could spend their time on analysis, not on searching.',
      'The goal wasn\'t to visualize data. The goal was to make information **easier to discover, understand, and connect** — so engineers could spend their time on analysis, not on searching.\n\n[CAROUSEL_PLACEHOLDER]'
    )
    .replace(
      '[Insert Image: Asset Map — Blocks, Wells, Pipelines, and Facilities]', 
      '![Asset Map — Blocks, Wells, Pipelines, and Facilities](/asset/projects/geoporto/01-geospatial-context.png)'
    )
    .replace(
      '[Insert Image: Well Log Visualization — GR, RHOB, and NPHI Tracks]',
      '![Well Log Visualization — GR, RHOB, and NPHI Tracks](/asset/projects/geoporto/03-well-log-exploration.png)'
    )
    .replace(
      '[Insert Image: Production History Charts and Drilling Summary]',
      '![Production History Charts and Drilling Summary](/asset/projects/geoporto/pic-3-production.png)'
    )
    .replace(
      '[Insert Image: GAIA AI Assistant — Answering Questions with Document References]',
      '![GAIA AI Assistant — Answering Questions with Document References](/asset/projects/geoporto/02-document-intelligence-with-gaia.png)'
    )

  await prisma.project.upsert({
    where: { slug: 'geoporto' },
    update: {
      title: 'GeoPorto: Innovative Workspace for Geoscience Knowledge',
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
    },
    create: {
      title: 'GeoPorto: Innovative Workspace for Geoscience Knowledge',
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

  console.log('Seed geoporto v2 completed successfully!')
}

async function main() {
  let retries = 5;
  while (retries > 0) {
    try {
      await seed();
      break;
    } catch (e: any) {
      retries--;
      console.warn(`Database connection attempt failed (${e.message}). Retries left: ${retries}`);
      if (retries === 0) throw e;
      await new Promise(res => setTimeout(res, 3000));
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
