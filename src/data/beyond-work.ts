import { PillarData } from './types';

export const beyondWorkData: PillarData = {
  title: 'Beyond Work',
  description: 'Creating products, experimenting with ideas, and exploring opportunities beyond core professional work.',
  topics: [
    'Side Projects',
    'Product Ideas',
    'Open Source',
    'Research',
    'Competitions',
    'Writing',
    'Experiments',
    'Entrepreneurship',
  ],
  coverImage: '/images/beyond-work-cover.jpg', // Placeholder
  href: '/beyond-work',
  projects: [
    {
      id: 'open-source-tool',
      title: 'Open Source Geodata Parser',
      summary: 'A fast utility for parsing and converting geospatial data formats.',
      category: 'Beyond Work',
      heroImage: '/images/beyond-project-1.jpg', // Placeholder
      featured: true,
      externalLink: 'https://github.com/example/geoparser',
      content: 'Detailed breakdown of the open source project...',
    },
  ],
};
