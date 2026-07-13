import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findFirst({ where: { slug: 'geoporto' } })
  console.log('Contains [CAROUSEL_PLACEHOLDER]?', project?.content.includes('[CAROUSEL_PLACEHOLDER]'))
}

main().finally(() => prisma.$disconnect())
