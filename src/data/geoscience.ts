import { PillarData } from './types';

export const geoscienceData: PillarData = {
  title: 'Geoscience',
  description: 'Understanding the physical world through geology, spatial analysis, environmental studies, and technical consulting.',
  topics: [
    'Geological Engineering',
    'GIS',
    'Mapping',
    'Exploration',
    'Mining',
    'Environmental Consulting',
    'Geological Data Management',
    'Resource Modeling',
    'QA/QC',
  ],
  coverImage: '/images/geoscience-cover.jpg', // Placeholder
  href: '/geoscience',
  projects: [
    {
      id: 'geological-modeling',
      title: 'Advanced Geological Modeling',
      summary: '3D modeling of complex resource bodies for optimized extraction.',
      category: 'Geoscience',
      heroImage: '/images/geo-project-1.jpg', // Placeholder
      featured: true,
      content: 'Detailed breakdown of the geological modeling project...',
    },
  ],
};
