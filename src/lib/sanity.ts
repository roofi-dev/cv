import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Types for CV data
export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: {
    asset: {
      url: string;
    };
  };
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies?: string[];
  logo?: {
    asset: {
      url: string;
    };
  };
}

export interface Project {
  title: string;
  description: string;
  image?: {
    asset: {
      url: string;
    };
  };
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

// Queries
export const queries = {
  personalInfo: `*[_type == "personalInfo"][0]{
    name,
    title,
    bio,
    email,
    phone,
    location,
    avatar{asset->{url}},
    socialLinks
  }`,
  
  skills: `*[_type == "skill"] | order(level desc){
    name,
    level,
    category,
    icon
  }`,
  
  experiences: `*[_type == "experience"] | order(startDate desc){
    company,
    position,
    startDate,
    endDate,
    current,
    description,
    technologies,
    logo{asset->{url}}
  }`,
  
  projects: `*[_type == "project"] | order(featured desc, _createdAt desc){
    title,
    description,
    image{asset->{url}},
    technologies,
    liveUrl,
    githubUrl,
    featured
  }`,
  
  education: `*[_type == "education"] | order(startDate desc){
    institution,
    degree,
    field,
    startDate,
    endDate,
    description
  }`,
};

// Fetch functions with fallback data
export async function getPersonalInfo(): Promise<PersonalInfo> {
  try {
    const data = await sanityClient.fetch(queries.personalInfo);
    if (data) return data;
  } catch (error) {
    console.log('Using fallback personal info data');
  }
  
  return {
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with 5+ years of experience building modern web applications. I love creating beautiful, performant, and user-friendly experiences.',
    email: 'hello@johndoe.com',
    phone: '+62 812 3456 7890',
    location: 'Jakarta, Indonesia',
    socialLinks: [
      { platform: 'github', url: 'https://github.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
    ],
  };
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const data = await sanityClient.fetch(queries.skills);
    if (data?.length) return data;
  } catch (error) {
    console.log('Using fallback skills data');
  }
  
  return [
    { name: 'JavaScript', level: 95, category: 'Frontend', icon: 'js' },
    { name: 'TypeScript', level: 90, category: 'Frontend', icon: 'ts' },
    { name: 'React', level: 92, category: 'Frontend', icon: 'react' },
    { name: 'Vue.js', level: 85, category: 'Frontend', icon: 'vue' },
    { name: 'Node.js', level: 88, category: 'Backend', icon: 'node' },
    { name: 'Python', level: 80, category: 'Backend', icon: 'python' },
    { name: 'PostgreSQL', level: 85, category: 'Database', icon: 'postgres' },
    { name: 'MongoDB', level: 82, category: 'Database', icon: 'mongo' },
    { name: 'Docker', level: 78, category: 'DevOps', icon: 'docker' },
    { name: 'AWS', level: 75, category: 'DevOps', icon: 'aws' },
    { name: 'Figma', level: 70, category: 'Design', icon: 'figma' },
    { name: 'Git', level: 90, category: 'Tools', icon: 'git' },
  ];
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const data = await sanityClient.fetch(queries.experiences);
    if (data?.length) return data;
  } catch (error) {
    console.log('Using fallback experiences data');
  }
  
  return [
    {
      company: 'Tech Innovators Inc.',
      position: 'Senior Full Stack Developer',
      startDate: '2022-01',
      current: true,
      description: 'Leading development of enterprise-scale applications, mentoring junior developers, and implementing best practices for code quality and performance.',
      technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    },
    {
      company: 'Digital Solutions Co.',
      position: 'Full Stack Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: 'Developed and maintained multiple client projects, collaborated with design team to implement pixel-perfect UIs, and optimized application performance.',
      technologies: ['Vue.js', 'Express', 'MongoDB', 'Docker'],
    },
    {
      company: 'StartUp Hub',
      position: 'Junior Developer',
      startDate: '2018-06',
      endDate: '2020-02',
      current: false,
      description: 'Started my professional journey building web applications, learning industry best practices, and contributing to team projects.',
      technologies: ['JavaScript', 'React', 'Node.js', 'MySQL'],
    },
  ];
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await sanityClient.fetch(queries.projects);
    if (data?.length) return data;
  } catch (error) {
    console.log('Using fallback projects data');
  }
  
  return [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, team workspaces, and analytics.',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool using OpenAI API for creating blog posts, social media content, and more.',
      technologies: ['Python', 'FastAPI', 'OpenAI', 'React'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
      technologies: ['Vue.js', 'OpenWeather API', 'Mapbox'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
  ];
}

export async function getEducation(): Promise<Education[]> {
  try {
    const data = await sanityClient.fetch(queries.education);
    if (data?.length) return data;
  } catch (error) {
    console.log('Using fallback education data');
  }
  
  return [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-06',
      description: 'Graduated with honors. Focus on software engineering and web technologies.',
    },
  ];
}
