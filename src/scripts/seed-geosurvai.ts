import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function seed() {
  const rawMd = fs.readFileSync('public/asset/article/geosurvai-v2.md', 'utf-8')
  
  let content = rawMd
    .replace('[Insert Image: GeoSurvai Hero — Dashboard Overview with Map and Analytics]', '')
    .replace(
      'This workflow didn\'t just digitize the old process. It **eliminated the repetitive parts** and gave everyone more time for the work that actually matters: analysis, strategy, and decision-making.',
      'This workflow didn\'t just digitize the old process. It **eliminated the repetitive parts** and gave everyone more time for the work that actually matters: analysis, strategy, and decision-making.\n\n[CAROUSEL_PLACEHOLDER]'
    )
    .replace(
      '[Insert Image: Interactive Map — Survey Coverage with WK Boundaries and Activity Points]',
      '[CAROUSEL: /asset/projects/geosurvai/02_Interactive_Map-1.png, /asset/projects/geosurvai/02_Interactive_Map-2.png]'
    )
    .replace(
      '[Insert Image: Survey Project Detail Page — Summary, Gantt Chart, and Progress Monitoring]',
      '[CAROUSEL: /asset/projects/geosurvai/03_Project_Dashboard-1.png, /asset/projects/geosurvai/03_Project_Dashboard-2.png, /asset/projects/geosurvai/03_Project_Dashboard-3.png]'
    )
    .replace(
      '[Insert Image: Contractor Form Interface — Data Entry and Document Upload]',
      '[CAROUSEL: /asset/projects/geosurvai/04_Contractor_form-1.png, /asset/projects/geosurvai/04_Contractor_form-2.png, /asset/projects/geosurvai/04_Contractor_form-3.png]'
    )
    .replace(
      '[Insert Image: AFE Analytics — Benchmark Charts and Cost Composition]',
      '[CAROUSEL: /asset/projects/geosurvai/05_Cost_Intelligence_Dashboard-1.png, /asset/projects/geosurvai/05_Cost_Intelligence_Dashboard-2.png, /asset/projects/geosurvai/05_Cost_Intelligence_Dashboard-3.png, /asset/projects/geosurvai/05_Cost_Intelligence_Dashboard-4.png, /asset/projects/geosurvai/05_Cost_Intelligence_Dashboard-5.png]'
    )
    .replace(
      '[Insert Image: Study Dashboard — Plan vs. Actual Cumulative S-Curves]',
      '[CAROUSEL: /asset/projects/geosurvai/06_Study_dashboard-1.png, /asset/projects/geosurvai/06_Study_dashboard-2.png]'
    )
    .replace(
      '[Insert Image: Exploration Catalog — Grid View with Thumbnails and Document Links]',
      '![Exploration Catalog — Grid View with Thumbnails and Document Links](/asset/projects/geosurvai/07_Exploration_catalog.png)'
    )
    .replace(
      '[Insert Image: Annual Seismic Map — Parameter Bubble Map with Color Scale]',
      '![Annual Seismic Map — Parameter Bubble Map with Color Scale](/asset/projects/geosurvai/08_Annual_Seismic_Parameter.png)'
    )
    .replace(
      '[Insert Image: Automated Weekly Report Output]',
      '![Automated Weekly Report Output](/asset/projects/geosurvai/09_Automated_Weekly_Report.png)'
    )
    .replace(
      '[Insert Image: Zara AI Assistant Interface — Chat Query with Data Response]',
      '![Zara AI Assistant Interface — Chat Query with Data Response](/asset/projects/geosurvai/10_Zara_AI_Assistant.png)'
    )

  await prisma.project.upsert({
    where: { slug: 'geosurvai' },
    update: {
      title: 'GeoSurvai: A New Standard for Oil & Gas Exploration Monitoring',
      excerpt: 'An integrated exploration management and auditing platform for SKK Migas, centralizing survey workflows, cost intelligence, automated weekly reporting, and AI assistance across Indonesia.',
      content: content,
      coverImage: '/asset/projects/geosurvai/01_GeoSurvai_Hero.png',
      galleryImages: [
        '/asset/projects/geosurvai/02_Interactive_Map-1.png',
        '/asset/projects/geosurvai/03_Project_Dashboard-1.png',
        '/asset/projects/geosurvai/04_Contractor_form-1.png',
        '/asset/projects/geosurvai/05_Cost_Intelligence_Dashboard-1.png',
        '/asset/projects/geosurvai/06_Study_dashboard-1.png',
        '/asset/projects/geosurvai/07_Exploration_catalog.png',
        '/asset/projects/geosurvai/08_Annual_Seismic_Parameter.png',
        '/asset/projects/geosurvai/09_Automated_Weekly_Report.png',
        '/asset/projects/geosurvai/10_Zara_AI_Assistant.png',
      ],
      tags: ['geoscience', 'data-ai', 'beyond-work'],
      priority: 95,
      featured: true,
      published: true
    },
    create: {
      title: 'GeoSurvai: A New Standard for Oil & Gas Exploration Monitoring',
      slug: 'geosurvai',
      excerpt: 'An integrated exploration management and auditing platform for SKK Migas, centralizing survey workflows, cost intelligence, automated weekly reporting, and AI assistance across Indonesia.',
      content: content,
      coverImage: '/asset/projects/geosurvai/01_GeoSurvai_Hero.png',
      galleryImages: [
        '/asset/projects/geosurvai/02_Interactive_Map-1.png',
        '/asset/projects/geosurvai/03_Project_Dashboard-1.png',
        '/asset/projects/geosurvai/04_Contractor_form-1.png',
        '/asset/projects/geosurvai/05_Cost_Intelligence_Dashboard-1.png',
        '/asset/projects/geosurvai/06_Study_dashboard-1.png',
        '/asset/projects/geosurvai/07_Exploration_catalog.png',
        '/asset/projects/geosurvai/08_Annual_Seismic_Parameter.png',
        '/asset/projects/geosurvai/09_Automated_Weekly_Report.png',
        '/asset/projects/geosurvai/10_Zara_AI_Assistant.png',
      ],
      tags: ['geoscience', 'data-ai', 'beyond-work'],
      priority: 95,
      featured: true,
      published: true
    }
  })

  console.log('Seed geosurvai v2 completed successfully!')
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
