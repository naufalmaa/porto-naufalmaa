import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const projects = await prisma.project.findMany({ select: { slug: true, title: true, priority: true } })
  console.log('PROJECTS IN DB:', projects)
}

main().finally(() => prisma.$disconnect())
