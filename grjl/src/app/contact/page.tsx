import { Metadata } from 'next';
import { Layout, PageContainer } from '@/components/layout/layout';
import { ContactHeroSection } from '@/components/sections/contact/contact-hero-section';
import { ContactFormSection } from '@/components/sections/contact/contact-form-section';
import { ContactInfoSection } from '@/components/sections/contact/contact-info-section';
import { ContactMapSection } from '@/components/sections/contact/contact-map-section';
import { personalInfo } from '@/data/personal';

// 页面元数据
export const metadata: Metadata = {
  title: `联系我 - ${personalInfo.chineseName}`,
  description: `联系${personalInfo.chineseName}，获取专业的设计服务。我们提供品牌设计、UI/UX设计、电商设计等多种设计解决方案。`,
  openGraph: {
    title: `联系我 - ${personalInfo.chineseName}`,
    description: `联系${personalInfo.chineseName}，获取专业的设计服务。`,
    images: [personalInfo.avatar],
  },
};

/**
 * 联系页面组件
 */
export default function ContactPage() {
  return (
    <Layout>
      <PageContainer className="space-y-16 lg:space-y-20">
        {/* 联系介绍 */}
        <ContactHeroSection />
        
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* 联系表单 */}
          <div>
            <ContactFormSection />
          </div>
          
          {/* 联系信息 */}
          <div className="space-y-8">
            <ContactInfoSection />
            <ContactMapSection />
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}
