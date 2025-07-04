import { Metadata } from 'next';
import { Layout, PageContainer } from '@/components/layout/layout';
import { BlogHeroSection } from '@/components/sections/blog/blog-hero-section';
import { BlogFilterSection } from '@/components/sections/blog/blog-filter-section';
import { BlogGridSection } from '@/components/sections/blog/blog-grid-section';
import { BlogSidebarSection } from '@/components/sections/blog/blog-sidebar-section';
import { personalInfo } from '@/data/personal';

// 页面元数据
export const metadata: Metadata = {
  title: `博客 - ${personalInfo.chineseName}`,
  description: `阅读${personalInfo.chineseName}的设计博客，分享设计经验、行业见解和创作心得。`,
  openGraph: {
    title: `博客 - ${personalInfo.chineseName}`,
    description: `阅读${personalInfo.chineseName}的设计博客，分享设计经验、行业见解和创作心得。`,
    images: [personalInfo.avatar],
  },
};

/**
 * 博客列表页面组件
 */
export default function BlogPage() {
  return (
    <Layout>
      <PageContainer className="space-y-16 lg:space-y-20">
        {/* 博客介绍 */}
        <BlogHeroSection />
        
        {/* 筛选和搜索 */}
        <BlogFilterSection />
        
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 博客文章列表 */}
          <div className="lg:col-span-3">
            <BlogGridSection />
          </div>
          
          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <BlogSidebarSection />
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}
