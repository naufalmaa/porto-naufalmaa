export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Used to pick the right lucide icon
}

export const socials: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/naufal-muhamad-adzkia/', // Placeholder
    icon: 'linkedin'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/naufalmaa', // Placeholder
    icon: 'github'
  },
  {
    platform: 'Email',
    url: 'mailto:naufalmadzkia@gmail.com', // Placeholder
    icon: 'mail'
  },
  {
    platform: 'Resume',
    url: 'asset/resume/CV ATS_Naufal MA.pdf', // Placeholder
    icon: 'file-text'
  }
];
