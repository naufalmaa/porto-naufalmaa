import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.project.deleteMany({}) // clear existing

  await prisma.project.create({
    data: {
      title: 'Subsurface 3D Mapping System',
      slug: 'subsurface-3d-mapping',
      excerpt: 'A robust digital twin architecture for geospatial geological models using modern 3D rendering frameworks.',
      content: '## The Problem\nTraditional 2D mapping tools are insufficient for modern deep-earth analysis. We needed a way to visualize strata in 3D dynamically.\n\n## The Approach\nBuilt a custom WebGL based pipeline connecting to enterprise spatial databases.\n\n## The Outcome\nReduced mapping visualization time by 80%.',
      coverImage: '/asset/projects/geo_mock.png',
      tags: ['geoscience'],
      priority: 10,
      featured: true,
      published: true
    }
  })

  await prisma.project.create({
    data: {
      title: 'Automated Log Analytics Pipeline',
      slug: 'log-analytics-pipeline',
      excerpt: 'Enterprise data pipeline utilizing generative AI agents to automatically classify and parse millions of scattered sensor logs.',
      content: '## The Problem\nMillions of logs were generated daily but sitting unused in siloed storage.\n\n## The Approach\nImplemented a streaming architecture using Kafka, Spark, and an LLM-based parsing layer to structure the data.\n\n## The Outcome\nUnlocked predictive maintenance capabilities resulting in significant cost savings.',
      coverImage: '/asset/projects/data_mock.png',
      tags: ['data-ai'],
      priority: 9,
      featured: true,
      published: true
    }
  })

  await prisma.project.create({
    data: {
      title: 'Neon Sandbox Environments',
      slug: 'neon-sandbox',
      excerpt: 'An experimental UI/UX prototype for dynamic data workspaces, focusing on fluid animations and modern design tokens.',
      content: '## The Inspiration\nExploring what a truly modern, responsive workspace feels like when interacting with heavy datasets.\n\n## The Design\nHeavily focused on micro-interactions, dark mode aesthetics, and glassmorphism.\n\n## The Code\nBuilt purely with React, Framer Motion, and Tailwind CSS.',
      coverImage: '/asset/projects/beyond_mock.png',
      tags: ['beyond-work'],
      priority: 8,
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
