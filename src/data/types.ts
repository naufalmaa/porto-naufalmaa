export type PillarCategory = 'Geoscience' | 'Data & AI' | 'Beyond Work';

export interface ProjectData {
  id: string; // matches [slug]
  title: string;
  summary: string;
  category: PillarCategory;
  heroImage: string;
  externalLink?: string;
  featured: boolean; 
  content: string; // Markdown or detailed text
}

export interface PillarData {
  title: string;
  description: string;
  topics: string[];
  coverImage: string;
  href: string;
  projects: ProjectData[];
}
