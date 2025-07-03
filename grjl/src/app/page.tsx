import { Metadata } from 'next';
import { personalInfo } from '@/data/personal';

// 页面元数据
export const metadata: Metadata = {
  title: `${personalInfo.chineseName} - ${personalInfo.title}`,
  description: personalInfo.bio,
  openGraph: {
    title: `${personalInfo.chineseName} - ${personalInfo.title}`,
    description: personalInfo.bio,
    images: [personalInfo.avatar],
  },
};

/**
 * 首页组件
 * 展示个人介绍、技能、作品等核心内容
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
            {personalInfo.chineseName}
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            {personalInfo.title}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {personalInfo.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
