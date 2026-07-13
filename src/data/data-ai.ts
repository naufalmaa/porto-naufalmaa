import { PillarData } from './types';

export const dataAiData: PillarData = {
  title: 'Data & AI',
  description: 'Transforming operational data into intelligent systems through analytics, automation, and artificial intelligence.',
  topics: [
    'Data Engineering',
    'Data Analytics',
    'Dashboards',
    'Data Management',
    'Automation',
    'AI Agents',
    'RAG Systems',
    'LLM Applications',
    'Knowledge Systems',
    'Enterprise AI',
  ],
  coverImage: '/images/data-ai-cover.jpg', // Placeholder
  href: '/data-ai',
  projects: [
    {
      id: 'rag-knowledge-base',
      title: 'Enterprise RAG Knowledge System',
      summary: 'Built an AI agent to instantly retrieve insights from thousands of technical documents.',
      category: 'Data & AI',
      heroImage: '/images/data-project-1.jpg', // Placeholder
      featured: true,
      content: 'Detailed breakdown of the RAG system architecture...',
    },
    {
      id: 'automated-reporting',
      title: 'Automated Operations Reporting',
      summary: 'Data engineering pipeline to aggregate and report daily operational metrics.',
      category: 'Data & AI',
      heroImage: '/images/data-project-2.jpg', // Placeholder
      featured: true,
      content: 'Detailed breakdown of the data pipeline...',
    },
  ],
};
