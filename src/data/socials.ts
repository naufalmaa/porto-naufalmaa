export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Used to pick the right lucide icon
}

export const socials: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/naufalma', // Placeholder
    icon: 'linkedin'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/naufalma', // Placeholder
    icon: 'github'
  },
  {
    platform: 'Medium',
    url: 'https://medium.com/@naufalma', // Placeholder
    icon: 'medium' // Might need to use a custom icon if Lucide doesn't have it, but pen-tool or similar works
  },
  {
    platform: 'Email',
    url: 'mailto:contact@example.com', // Placeholder
    icon: 'mail'
  },
  {
    platform: 'Resume',
    url: '/resume.pdf', // Placeholder
    icon: 'file-text'
  }
];
