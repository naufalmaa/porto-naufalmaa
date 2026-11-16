export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Used to pick the right lucide icon
}

export const socials: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/naufal-muhamad-adzkia/',
    icon: 'linkedin'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/naufalmaa',
    icon: 'github'
  },
  {
    platform: 'Email',
    url: 'mailto:naufalmadzkia@gmail.com',
    icon: 'mail'
  },
  {
    platform: 'Resume',
    url: '/asset/resume/CV_Naufal_MA_Data_Scientist_ML.pdf',
    icon: 'file-text'
  }
];
