export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  featured: boolean;
  year: number;
  client?: string;
  url?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  readTime: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatar: string;
  resume?: string;
  socialLinks: SocialLink[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'design' | 'software' | 'other';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}
