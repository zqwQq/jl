import { BlogPost, BlogCategory, BlogTag } from '@/types';

// 博客文章数据
export const blogPosts: BlogPost[] = [
  {
    id: 'design-trends-2024',
    title: '2024年设计趋势：拥抱AI时代的视觉创新',
    slug: 'design-trends-2024',
    excerpt: '探索2024年最新的设计趋势，从AI辅助设计到可持续设计理念，了解如何在快速变化的设计世界中保持领先。',
    content: `
# 2024年设计趋势：拥抱AI时代的视觉创新

随着人工智能技术的快速发展，2024年的设计行业正在经历前所未有的变革。作为一名设计师，我们需要了解并适应这些新趋势，以保持竞争力。

## 1. AI辅助设计工具的普及

人工智能正在改变我们的设计工作流程：

- **自动化重复任务**：AI可以帮助处理图像背景移除、色彩调整等重复性工作
- **创意灵感生成**：通过AI生成初始概念和创意方向
- **智能排版**：AI辅助的自动排版和布局优化

## 2. 可持续设计理念

环保意识的提升推动了可持续设计的发展：

- **绿色色彩搭配**：使用自然、环保的色彩组合
- **简约主义**：减少不必要的视觉元素，降低资源消耗
- **数字优先**：优先考虑数字媒体，减少印刷需求

## 3. 沉浸式体验设计

技术进步带来了新的设计可能性：

- **3D和AR元素**：在平面设计中融入立体和增强现实元素
- **交互式设计**：更多的用户参与和互动体验
- **多感官设计**：结合视觉、听觉等多种感官体验

## 结语

2024年的设计趋势告诉我们，技术与创意的结合将是未来设计的主要方向。作为设计师，我们需要保持学习的心态，拥抱新技术，同时不忘设计的本质——为用户创造价值。
    `,
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
    author: {
      name: '郑权威',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: '平面设计师 & 电商设计师'
    },
    category: 'design-trends',
    tags: ['设计趋势', 'AI设计', '2024', '创新'],
    coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
    readingTime: 5,
    views: 1250,
    likes: 89,
    featured: true,
    status: 'published'
  },
  {
    id: 'brand-design-process',
    title: '品牌设计流程：从概念到落地的完整指南',
    slug: 'brand-design-process',
    excerpt: '详细解析品牌设计的完整流程，包括前期调研、概念开发、视觉设计和落地执行的每个环节。',
    content: `
# 品牌设计流程：从概念到落地的完整指南

品牌设计是一个系统性的工程，需要经过多个阶段的精心策划和执行。本文将详细介绍我在实际项目中总结的品牌设计流程。

## 第一阶段：前期调研

### 1. 客户需求分析
- 了解企业背景和发展历程
- 明确品牌定位和目标受众
- 分析竞争对手和市场环境

### 2. 品牌策略制定
- 确定品牌核心价值
- 制定品牌个性和调性
- 设定设计目标和约束条件

## 第二阶段：概念开发

### 1. 创意发散
- 头脑风暴和概念草图
- 关键词提取和视觉联想
- 多方案并行开发

### 2. 概念筛选
- 与客户沟通确认方向
- 评估可行性和扩展性
- 选择最优概念进行深化

## 第三阶段：视觉设计

### 1. Logo设计
- 图形符号设计
- 字体选择和定制
- 色彩搭配和应用

### 2. 视觉系统建立
- 辅助图形设计
- 色彩体系规范
- 字体使用规范

## 第四阶段：落地执行

### 1. 应用设计
- 名片、信纸等基础应用
- 网站、APP等数字应用
- 包装、广告等营销应用

### 2. 品牌手册制作
- 设计规范整理
- 应用指导说明
- 后续维护建议

## 总结

一个成功的品牌设计项目需要设计师具备全局思维和执行能力。通过系统化的流程管理，我们可以确保项目的质量和效率，为客户创造真正有价值的品牌资产。
    `,
    publishedAt: '2024-01-10',
    updatedAt: '2024-01-10',
    author: {
      name: '郑权威',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: '平面设计师 & 电商设计师'
    },
    category: 'design-process',
    tags: ['品牌设计', '设计流程', '项目管理', '设计方法'],
    coverImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    readingTime: 8,
    views: 980,
    likes: 67,
    featured: true,
    status: 'published'
  },
  {
    id: 'color-psychology-design',
    title: '色彩心理学在设计中的应用',
    slug: 'color-psychology-design',
    excerpt: '深入探讨色彩对人类心理的影响，以及如何在设计中运用色彩心理学原理来提升设计效果。',
    content: `
# 色彩心理学在设计中的应用

色彩是设计中最直观、最有力的视觉元素之一。了解色彩心理学可以帮助设计师更好地传达信息，影响用户情绪，提升设计效果。

## 基础色彩心理学

### 暖色系的心理效应
- **红色**：激情、力量、紧迫感
- **橙色**：活力、温暖、友好
- **黄色**：快乐、乐观、注意力

### 冷色系的心理效应
- **蓝色**：信任、专业、冷静
- **绿色**：自然、平衡、成长
- **紫色**：神秘、高贵、创意

## 在品牌设计中的应用

### 1. 行业特性考虑
不同行业对色彩有不同的偏好和禁忌：
- 金融行业偏爱蓝色（信任感）
- 食品行业常用红色和橙色（食欲）
- 科技行业喜欢蓝色和灰色（专业感）

### 2. 目标受众分析
- 儿童产品：明亮、鲜艳的色彩
- 高端品牌：低饱和度、优雅的色彩
- 年轻群体：时尚、个性的色彩搭配

## 实际应用技巧

### 1. 色彩搭配原则
- 60-30-10法则
- 对比色的运用
- 同色系的层次变化

### 2. 文化差异考虑
- 红色在中国代表吉祥，在西方可能代表危险
- 白色在西方代表纯洁，在某些亚洲文化中与丧葬相关

## 案例分析

通过分析成功品牌的色彩运用，我们可以看到色彩心理学的实际效果：
- 可口可乐的红色：激情与活力
- Facebook的蓝色：信任与连接
- 星巴克的绿色：自然与品质

## 结语

色彩心理学是设计师必须掌握的重要知识。通过合理运用色彩心理学原理，我们可以创造出更有感染力和说服力的设计作品。
    `,
    publishedAt: '2024-01-05',
    updatedAt: '2024-01-05',
    author: {
      name: '郑权威',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: '平面设计师 & 电商设计师'
    },
    category: 'design-theory',
    tags: ['色彩心理学', '设计理论', '品牌设计', '用户体验'],
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=400&fit=crop',
    readingTime: 6,
    views: 756,
    likes: 45,
    featured: false,
    status: 'published'
  },
  {
    id: 'typography-guide',
    title: '字体设计完全指南：从选择到应用',
    slug: 'typography-guide',
    excerpt: '全面介绍字体设计的基础知识，包括字体分类、选择原则、搭配技巧和实际应用方法。',
    content: `
# 字体设计完全指南：从选择到应用

字体是设计中的重要元素，好的字体选择和排版可以大大提升设计的专业度和可读性。本文将全面介绍字体设计的相关知识。

## 字体分类

### 1. 衬线字体 (Serif)
- 特点：笔画末端有装饰性的小线条
- 适用：正式文档、印刷品、长文本阅读
- 代表：Times New Roman, Georgia, 宋体

### 2. 无衬线字体 (Sans-serif)
- 特点：笔画末端没有装饰线条，简洁现代
- 适用：屏幕显示、现代设计、标题
- 代表：Helvetica, Arial, 微软雅黑

### 3. 等宽字体 (Monospace)
- 特点：每个字符占用相同宽度
- 适用：代码显示、数据表格
- 代表：Courier, Monaco, Consolas

## 字体选择原则

### 1. 可读性优先
- 确保在目标尺寸下清晰可读
- 考虑使用环境和媒介
- 注意字符间距和行距

### 2. 品牌一致性
- 与品牌调性保持一致
- 考虑目标受众的偏好
- 建立字体使用规范

### 3. 技术兼容性
- 确保跨平台兼容
- 考虑加载速度
- 准备备用字体方案

## 字体搭配技巧

### 1. 对比原则
- 衬线与无衬线的搭配
- 粗细对比
- 大小对比

### 2. 统一原则
- 限制字体数量（通常不超过3种）
- 保持风格协调
- 建立层次关系

## 中文字体特殊考虑

### 1. 字重选择
- 中文字体的字重表现与英文不同
- 注意在小尺寸下的显示效果
- 考虑不同设备的渲染差异

### 2. 字符集完整性
- 确保包含所需的中文字符
- 注意繁简体的支持
- 考虑特殊符号和标点

## 实际应用建议

### 1. 网页设计
- 优先使用系统字体
- 合理使用Web字体
- 设置字体回退方案

### 2. 印刷设计
- 注意印刷效果
- 考虑纸张和印刷工艺
- 预留足够的字体授权

## 总结

字体设计是一门需要理论与实践相结合的学科。通过不断的学习和实践，我们可以更好地运用字体来提升设计质量，创造出更有感染力的作品。
    `,
    publishedAt: '2023-12-28',
    updatedAt: '2023-12-28',
    author: {
      name: '郑权威',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: '平面设计师 & 电商设计师'
    },
    category: 'design-theory',
    tags: ['字体设计', '排版', '设计基础', '用户体验'],
    coverImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop',
    readingTime: 7,
    views: 623,
    likes: 38,
    featured: false,
    status: 'published'
  },
  {
    id: 'ui-design-principles',
    title: 'UI设计原则：创造直观易用的界面',
    slug: 'ui-design-principles',
    excerpt: '介绍UI设计的核心原则，包括一致性、可用性、可访问性等，帮助设计师创造更好的用户界面。',
    content: `
# UI设计原则：创造直观易用的界面

用户界面设计不仅要美观，更要实用。本文将介绍UI设计的核心原则，帮助设计师创造出既美观又易用的界面。

## 核心设计原则

### 1. 一致性 (Consistency)
- **视觉一致性**：颜色、字体、图标风格统一
- **交互一致性**：相同功能的操作方式保持一致
- **内容一致性**：信息架构和表达方式统一

### 2. 可用性 (Usability)
- **易学性**：新用户能快速上手
- **效率性**：熟练用户能高效完成任务
- **容错性**：减少用户出错的可能性

### 3. 可访问性 (Accessibility)
- **色彩对比度**：确保文字清晰可读
- **键盘导航**：支持键盘操作
- **屏幕阅读器**：为视障用户提供支持

## 界面布局原则

### 1. 视觉层次
- 使用大小、颜色、位置建立信息层次
- 重要信息优先展示
- 合理使用留白和分组

### 2. 格栅系统
- 建立统一的布局规范
- 保持元素对齐和比例协调
- 适应不同屏幕尺寸

### 3. 响应式设计
- 移动优先的设计思路
- 灵活的布局适配
- 触摸友好的交互设计

## 交互设计要点

### 1. 反馈机制
- 及时的操作反馈
- 清晰的状态指示
- 友好的错误提示

### 2. 导航设计
- 清晰的导航结构
- 面包屑导航
- 搜索功能优化

### 3. 表单设计
- 简化输入流程
- 实时验证反馈
- 清晰的错误提示

## 移动端特殊考虑

### 1. 触摸目标
- 最小44px的触摸区域
- 合适的元素间距
- 拇指友好的布局

### 2. 内容优先
- 精简不必要的元素
- 突出核心功能
- 优化加载速度

## 设计系统建立

### 1. 组件库
- 标准化的UI组件
- 详细的使用规范
- 版本管理和更新

### 2. 设计规范
- 颜色和字体规范
- 间距和尺寸标准
- 图标和插画风格

## 测试和优化

### 1. 可用性测试
- 用户行为观察
- 任务完成率分析
- 用户满意度调研

### 2. A/B测试
- 不同设计方案对比
- 数据驱动的决策
- 持续优化改进

## 总结

优秀的UI设计需要在美观和实用之间找到平衡。通过遵循这些设计原则，我们可以创造出既符合用户期望又能有效传达信息的界面设计。
    `,
    publishedAt: '2023-12-20',
    updatedAt: '2023-12-20',
    author: {
      name: '郑权威',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      bio: '平面设计师 & 电商设计师'
    },
    category: 'ui-design',
    tags: ['UI设计', '用户体验', '设计原则', '界面设计'],
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    readingTime: 9,
    views: 892,
    likes: 56,
    featured: true,
    status: 'published'
  }
];

// 博客分类
export const blogCategories: BlogCategory[] = [
  {
    id: 'design-trends',
    name: '设计趋势',
    slug: 'design-trends',
    description: '最新的设计趋势和行业动态',
    color: 'blue',
    count: blogPosts.filter(post => post.category === 'design-trends').length
  },
  {
    id: 'design-process',
    name: '设计流程',
    slug: 'design-process',
    description: '设计方法和工作流程分享',
    color: 'green',
    count: blogPosts.filter(post => post.category === 'design-process').length
  },
  {
    id: 'design-theory',
    name: '设计理论',
    slug: 'design-theory',
    description: '设计基础理论和原理',
    color: 'purple',
    count: blogPosts.filter(post => post.category === 'design-theory').length
  },
  {
    id: 'ui-design',
    name: 'UI设计',
    slug: 'ui-design',
    description: '用户界面设计相关内容',
    color: 'orange',
    count: blogPosts.filter(post => post.category === 'ui-design').length
  },
  {
    id: 'tools-resources',
    name: '工具资源',
    slug: 'tools-resources',
    description: '设计工具和资源推荐',
    color: 'pink',
    count: blogPosts.filter(post => post.category === 'tools-resources').length
  }
];

// 博客标签
export const blogTags: BlogTag[] = [
  { id: 'design-trends', name: '设计趋势', count: 15 },
  { id: 'ai-design', name: 'AI设计', count: 8 },
  { id: 'brand-design', name: '品牌设计', count: 12 },
  { id: 'ui-design', name: 'UI设计', count: 10 },
  { id: 'color-theory', name: '色彩理论', count: 6 },
  { id: 'typography', name: '字体设计', count: 7 },
  { id: 'user-experience', name: '用户体验', count: 9 },
  { id: 'design-process', name: '设计流程', count: 5 },
  { id: 'tools', name: '设计工具', count: 11 },
  { id: 'inspiration', name: '设计灵感', count: 8 }
];

// 获取特色文章
export const featuredPosts = blogPosts.filter(post => post.featured);

// 获取最新文章
export const latestPosts = blogPosts
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 6);

// 获取热门文章
export const popularPosts = blogPosts
  .sort((a, b) => b.views - a.views)
  .slice(0, 6);

// 按分类获取文章
export function getPostsByCategory(categoryId: string): BlogPost[] {
  return blogPosts.filter(post => post.category === categoryId);
}

// 按标签获取文章
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}

// 搜索文章
export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// 获取相关文章
export function getRelatedPosts(postId: string, limit: number = 3): BlogPost[] {
  const currentPost = blogPosts.find(post => post.id === postId);
  if (!currentPost) return [];

  return blogPosts
    .filter(post => 
      post.id !== postId && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

// 获取博客统计
export function getBlogStats() {
  return {
    totalPosts: blogPosts.length,
    totalViews: blogPosts.reduce((sum, post) => sum + post.views, 0),
    totalLikes: blogPosts.reduce((sum, post) => sum + post.likes, 0),
    categories: blogCategories.length,
    tags: blogTags.length,
    featuredPosts: featuredPosts.length
  };
}
