'use client';

import * as React from 'react';
import { 
  Palette, 
  Monitor, 
  Package, 
  Smartphone,
  Globe,
  FileText,
  TrendingUp,
  Award
} from 'lucide-react';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { projectCategories, projects } from '@/data/projects';

/**
 * 作品集统计区域组件
 */
export function PortfolioStatsSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 分类图标映射
  const categoryIcons = {
    'brand-design': Palette,
    'ecommerce-design': Monitor,
    'packaging-design': Package,
    'ui-design': Smartphone,
    'web-design': Globe,
    'print-design': FileText,
  };

  // 计算统计数据
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const featuredProjects = projects.filter(p => p.featured).length;
  const totalCategories = projectCategories.length;

  return (
    <Section 
      ref={sectionRef}
      title="作品分类"
      subtitle="Project Categories"
      description="涵盖多个设计领域，为不同行业的客户提供专业的设计解决方案"
      background="muted"
    >
      <div className="space-y-12">
        {/* 总体统计 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {projects.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    总项目数
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {completedProjects}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    已完成项目
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <Palette size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {totalCategories}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    设计领域
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {featuredProjects}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    精选作品
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 分类详情 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Palette;
            
            return (
              <Card
                key={category.id}
                hover
                className={cn(
                  'group transition-all duration-700 ease-out',
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className="space-y-4">
                  {/* 分类图标和标题 */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </h3>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {category.count} 个项目
                      </div>
                    </div>
                  </div>

                  {/* 分类描述 */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {category.description}
                  </p>

                  {/* 项目数量进度条 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-500">
                      <span>项目完成度</span>
                      <span>{Math.round((category.count / projects.length) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${(category.count / projects.length) * 100}%`,
                          transitionDelay: `${500 + index * 150}ms`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* 专业领域说明 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                <Palette size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  专业服务领域
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      品牌与视觉
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      品牌识别系统、Logo设计、VI设计等品牌视觉服务
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      数字产品
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      网页设计、移动应用界面、电商平台视觉设计
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      印刷与包装
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      包装设计、宣传物料、书籍装帧等印刷品设计
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
