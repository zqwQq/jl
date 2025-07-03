import { Metadata } from 'next';
import { Layout, PageContainer } from '@/components/layout/layout';
import { PortfolioHeroSection } from '@/components/sections/portfolio/portfolio-hero-section';
import { PortfolioFilterSection } from '@/components/sections/portfolio/portfolio-filter-section';
import { PortfolioGridSection } from '@/components/sections/portfolio/portfolio-grid-section';
import { PortfolioStatsSection } from '@/components/sections/portfolio/portfolio-stats-section';
import { personalInfo } from '@/data/personal';

// 页面元数据
export const metadata: Metadata = {
  title: `作品集 - ${personalInfo.chineseName}`,
  description: `浏览${personalInfo.chineseName}的设计作品集，包含品牌设计、电商设计、包装设计等多个领域的优秀作品。`,
  openGraph: {
    title: `作品集 - ${personalInfo.chineseName}`,
    description: `浏览${personalInfo.chineseName}的设计作品集，包含品牌设计、电商设计、包装设计等多个领域的优秀作品。`,
    images: [personalInfo.avatar],
  },
};

/**
 * 作品集页面组件
 * 展示所有设计作品，支持分类筛选和搜索
 */
export default function PortfolioPage() {
  return (
    <Layout>
      <PageContainer className="space-y-16 lg:space-y-20">
        {/* 作品集介绍 */}
        <PortfolioHeroSection />
        
        {/* 作品统计 */}
        <PortfolioStatsSection />
        
        {/* 筛选和搜索 */}
        <PortfolioFilterSection />
        
        {/* 作品网格展示 */}
        <PortfolioGridSection />
      </PageContainer>
    </Layout>
  );
}
