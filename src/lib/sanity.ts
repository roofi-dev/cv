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
  aboutBio?: string;
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
    name: 'Firdha Roofi Irawan',
    title: 'IT Support Specialist',
    bio: 'IT Support Specialist dengan 5+ tahun pengalaman dalam meningkatkan efisiensi operasional dan keandalan sistem. Terampil dalam troubleshooting, manajemen infrastruktur, dan pengembangan solusi berbasis web. Siap berkontribusi untuk kesuksesan tim Anda.',
    aboutBio: 'Saya adalah Spesialis Support & Infrastruktur IT yang berfokus pada peningkatan efisiensi operasional dan keandalan sistem. Dengan pengalaman lebih dari 5 tahun, saya telah membantu berbagai perusahaan dalam mengimplementasikan solusi teknologi yang efektif.\n\nSaya mampu beradaptasi dengan cepat dan memiliki kemampuan komunikasi yang baik dalam merancang, mengimplementasikan, serta mengimprovisasi solusi ketika menghadapi tantangan di bidang teknologi informasi.\n\nBerkomitmen terhadap peningkatan keamanan sistem, efisiensi kerja, dan kepuasan pengguna.',
    email: 'roofiii96@gmail.com',
    location: 'Surabaya, Indonesia',
    socialLinks: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/roofi/' },
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
    // Pengembangan Web & Programming - Mahir
    { name: 'PHP', level: 90, category: 'Backend', icon: 'php' },
    { name: 'Laravel', level: 90, category: 'Backend', icon: 'laravel' },
    { name: 'Node.js', level: 70, category: 'Backend', icon: 'nodejs' },
    { name: 'MySQL', level: 90, category: 'Database', icon: 'mysql' },
    { name: 'HTML/CSS', level: 90, category: 'Frontend', icon: 'html' },
    { name: 'Tailwind CSS', level: 90, category: 'Frontend', icon: 'tailwind' },
    { name: 'WordPress', level: 90, category: 'Frontend', icon: 'wordpress' },
    // Pengembangan Web & Programming - Menengah
    { name: 'JavaScript', level: 70, category: 'Frontend', icon: 'js' },
    { name: 'jQuery', level: 70, category: 'Frontend', icon: 'jquery' },
    { name: 'React JS', level: 70, category: 'Frontend', icon: 'react' },
    { name: 'PostgreSQL', level: 70, category: 'Database', icon: 'postgres' },
    { name: 'SQL Server', level: 70, category: 'Database', icon: 'sqlserver' },
    // Administrasi Sistem & Infrastruktur - Mahir
    { name: 'Windows Server', level: 90, category: 'DevOps', icon: 'windows' },
    { name: 'Linux (Ubuntu)', level: 90, category: 'DevOps', icon: 'linux' },
    { name: 'Backup/Recovery Systems', level: 90, category: 'DevOps', icon: 'backup' },
    // Administrasi Sistem & Infrastruktur - Menengah
    { name: 'VMware/Hyper-V/XCP-NG', level: 70, category: 'DevOps', icon: 'vm' },
    { name: 'Cloud Storage Solutions', level: 70, category: 'DevOps', icon: 'cloud' },
    // Jaringan & Keamanan - Mahir
    { name: 'TCP/IP', level: 90, category: 'Networking', icon: 'network' },
    { name: 'LAN/WAN Configuration', level: 90, category: 'Networking', icon: 'lan' },
    { name: 'DHCP/DNS', level: 90, category: 'Networking', icon: 'dns' },
    // Jaringan & Keamanan - Menengah
    { name: 'Cisco Routing/Switching', level: 70, category: 'Networking', icon: 'cisco' },
    { name: 'VPN', level: 70, category: 'Networking', icon: 'vpn' },
    { name: 'Firewall Management', level: 70, category: 'Networking', icon: 'firewall' },
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
      company: 'PT Ladang Sehat Indonesia',
      position: 'IT Support',
      startDate: '2023-12',
      current: true,
      description: '• Implementasi cloud storage (Nextcloud) — hemat biaya 40%, tingkatkan aksesibilitas data\n• Develop sistem HRIS berbasis Laravel — akurasi evaluasi karyawan meningkat\n• Redesign website perusahaan (WordPress) — optimasi performa & SEO\n• Strategi backup & monitoring proaktif — downtime turun signifikan\n• IT support harian — troubleshooting hardware, software & jaringan',
      technologies: ['Nextcloud', 'PHP', 'Laravel', 'WordPress', 'Windows', 'Linux'],
    },
    {
      company: 'Balai Standardisasi dan Pelayanan Jasa Industri',
      position: 'IT Support',
      startDate: '2020-01',
      endDate: '2023-11',
      current: false,
      description: '• Implementasi jaringan redundan (Cisco) — downtime berkurang drastis\n• Develop sistem otomatisasi web — efisiensi proses admin meningkat\n• Integrasi sistem terpusat — produktivitas antar departemen naik\n• Kelola server Windows/Linux — uptime & akurasi data terjaga',
      technologies: ['Cisco', 'Windows Server', 'Linux', 'Web Development', 'Networking'],
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
      title: 'Aplikasi Job Portal Perusahaan',
      description: 'Mengembangkan aplikasi job portal untuk memudahkan proses rekrutmen karyawan perusahaan, dengan fitur pencarian lowongan, filter lokasi dan tipe pekerjaan, serta sistem pendaftaran kandidat.',
      image: { asset: { url: '/images/projects/job-portal.png' } },
      technologies: ['Laravel', 'Vue.js', 'Inertia.js', 'MySQL'],
      featured: true,
    },
    {
      title: 'Sistem Penyimpanan Cloud',
      description: 'Membuat dan memonitoring sistem penyimpanan berbasis Nextcloud, sehingga menghasilkan aksesibilitas data karyawan yang mudah serta penghematan biaya penyimpanan.',
      image: { asset: { url: '/images/projects/nextcloud.png' } },
      technologies: ['Nextcloud', 'Linux', 'Cloud Storage'],
      featured: true,
    },
    {
      title: 'Aplikasi Web Manajemen Kinerja (HRIS)',
      description: 'Mengembangkan aplikasi web internal untuk monitoring dan meningkatkan akurasi data evaluasi kinerja karyawan.',
      image: { asset: { url: '/images/projects/hris.png' } },
      technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
      featured: true,
    },
    {
      title: 'Aplikasi Inventory Perusahaan',
      description: 'Mengembangkan aplikasi inventory untuk manajemen bahan baku produksi, dengan fitur input/output stok, tracking batch, dan laporan neraca massa.',
      image: { asset: { url: '/images/projects/inventory.png' } },
      technologies: ['Laravel', 'Vue.js', 'Inertia.js', 'MySQL'],
      featured: true,
    },
    {
      title: 'Penyelesaian Kendala User',
      description: 'Selesaikan kendala user per minggu, capai kepuasan pengguna dengan memberikan solusi yang efektif pada perangkat keras, perangkat lunak dan jaringan.',
      image: { asset: { url: '/images/projects/troubleshoot.png' } },
      technologies: ['IT Support', 'Troubleshooting', 'Hardware', 'Software'],
      featured: true,
    },
    {
      title: 'Jaringan Redundan',
      description: 'Monitoring dan mengimplementasikan solusi jaringan yang redundan menggunakan perangkat Cisco, yang mengurangi downtime jaringan dan memastikan operasional tetap berjalan normal.',
      image: { asset: { url: '/images/projects/network.png' } },
      technologies: ['Cisco', 'Networking', 'Infrastructure'],
      featured: true,
    },
    {
      title: 'Aplikasi Internal Daily Report',
      description: 'Mengembangkan aplikasi daily report untuk mencatat aktivitas harian karyawan, tracking jam kerja, dan monitoring produktivitas per divisi.',
      image: { asset: { url: '/images/projects/daily-report.png' } },
      technologies: ['Laravel', 'Tailwind CSS', 'Alpine.js', 'MySQL'],
      featured: true,
    },
    {
      title: 'Manajemen Server',
      description: 'Kelola server Windows/Linux, menjaga optimal server dengan backup dan recovery systems.',
      image: { asset: { url: '/images/projects/server.png' } },
      technologies: ['Windows Server', 'Linux', 'Backup Systems'],
      featured: true,
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
      institution: 'Institut Bisnis dan Informatika STIKOM Surabaya',
      degree: 'S1',
      field: 'Teknik Komputer',
      startDate: '2014',
      endDate: '2019',
      description: 'Aktif dalam organisasi mahasiswa jurusan, mengikuti seminar dan workshop tentang teknologi terbaru.',
    },
  ];
}
