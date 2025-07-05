import { Project, BlogPost, PersonalInfo, Skill, Experience } from '@/types'

export const mockProjects: Project[] = [
  {
    id: '1',
    title: '星空咖啡品牌设计',
    description: '为新兴咖啡品牌打造完整的视觉识别系统，包括Logo设计、包装设计和店面视觉规范。',
    category: '品牌设计',
    tags: ['Logo设计', '包装设计', '品牌识别', 'VI系统'],
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=800&h=600&fit=crop'
    ],
    featured: true,
    year: 2024,
    client: '星空咖啡',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: '科技公司年报设计',
    description: '为知名科技公司设计年度报告，运用现代简约的设计语言展现企业成就和未来愿景。',
    category: '平面设计',
    tags: ['年报设计', '版式设计', '信息图表', '企业形象'],
    images: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    ],
    featured: true,
    year: 2023,
    client: '创新科技有限公司',
    createdAt: '2023-12-10'
  },
  {
    id: '3',
    title: '艺术展览海报系列',
    description: '为当代艺术展览设计的系列海报，融合传统与现代元素，体现艺术的多元化表达。',
    category: '海报设计',
    tags: ['海报设计', '艺术展览', '视觉传达', '创意设计'],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'
    ],
    featured: true,
    year: 2023,
    client: '现代艺术馆',
    createdAt: '2023-11-20'
  },
  {
    id: '4',
    title: '时尚品牌网站设计',
    description: '为时尚品牌设计响应式网站，注重用户体验和视觉美感的完美结合。',
    category: '网页设计',
    tags: ['网页设计', 'UI/UX', '响应式设计', '时尚品牌'],
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
    ],
    featured: false,
    year: 2023,
    client: '时尚前线',
    url: 'https://example.com',
    createdAt: '2023-10-15'
  }
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '2024年平面设计趋势预测',
    excerpt: '探索即将到来的设计趋势，从色彩搭配到字体选择，为设计师提供前瞻性的创作灵感。',
    content: '详细的博客内容...',
    author: '郑权威',
    publishedAt: '2024-01-10',
    tags: ['设计趋势', '平面设计', '创意灵感', '2024'],
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    readTime: 8
  },
  {
    id: '2',
    title: '如何打造令人印象深刻的品牌标识',
    excerpt: '分享品牌Logo设计的核心原则和实用技巧，帮助设计师创造更有影响力的品牌形象。',
    content: '详细的博客内容...',
    author: '郑权威',
    publishedAt: '2023-12-20',
    tags: ['Logo设计', '品牌设计', '设计技巧', '视觉识别'],
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=400&fit=crop',
    readTime: 6
  },
  {
    id: '3',
    title: '色彩心理学在设计中的应用',
    excerpt: '深入了解色彩如何影响人们的情感和行为，以及如何在设计中有效运用色彩心理学。',
    content: '详细的博客内容...',
    author: '郑权威',
    publishedAt: '2023-11-15',
    tags: ['色彩理论', '心理学', '设计原理', '视觉传达'],
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop',
    readTime: 10
  }
]

export const personalInfo: PersonalInfo = {
  name: '郑权威',
  title: '平面设计师',
  bio: '我是一名充满热情的平面设计师，拥有5年以上的专业设计经验。专注于品牌设计、平面设计和数字媒体设计，致力于为客户创造有意义且具有影响力的视觉体验。我相信好的设计不仅要美观，更要能够有效传达信息和情感。',
  email: 'hello@zhengquanwei.com',
  phone: '+86 138 0000 0000',
  location: '中国 · 上海',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'Behance', url: 'https://behance.net', icon: 'behance' }
  ]
}

export const skills: Skill[] = [
  { name: 'Adobe Photoshop', level: 95, category: 'software' },
  { name: 'Adobe Illustrator', level: 90, category: 'software' },
  { name: 'Adobe InDesign', level: 85, category: 'software' },
  { name: 'Figma', level: 88, category: 'software' },
  { name: 'Sketch', level: 80, category: 'software' },
  { name: '品牌设计', level: 92, category: 'design' },
  { name: '平面设计', level: 95, category: 'design' },
  { name: 'UI/UX设计', level: 85, category: 'design' },
  { name: '包装设计', level: 88, category: 'design' },
  { name: '版式设计', level: 90, category: 'design' }
]

export const experiences: Experience[] = [
  {
    id: '1',
    company: '创意设计工作室',
    position: '高级平面设计师',
    startDate: '2022-03',
    description: '负责品牌设计、平面设计和数字媒体设计项目，为多家知名企业提供设计服务。',
    current: true
  },
  {
    id: '2',
    company: '广告传媒公司',
    position: '平面设计师',
    startDate: '2020-06',
    endDate: '2022-02',
    description: '参与大型广告项目的视觉设计，包括海报设计、宣传册设计和品牌推广物料设计。',
    current: false
  },
  {
    id: '3',
    company: '设计咨询公司',
    position: '初级设计师',
    startDate: '2019-03',
    endDate: '2020-05',
    description: '协助完成各类设计项目，积累了丰富的设计经验和客户沟通技巧。',
    current: false
  }
]
