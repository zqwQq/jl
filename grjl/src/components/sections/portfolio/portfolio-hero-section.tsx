'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Palette, 
  Briefcase, 
  Star, 
  TrendingUp,
  ArrowRight,
  Eye,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { personalInfo, stats } from '@/data/personal';
import { projects, projectCategories } from '@/data/projects';

/**
 * 作品集英雄区域组件
 */
export function PortfolioHeroSection() {
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

  return (
    <Section 
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/10 dark:via-neutral-900 dark:to-secondary-900/10"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/30 dark:bg-secondary-800/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-200/20 dark:bg-accent-800/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="text-center space-y-8">
          {/* 主标题 */}
          <div
            className={cn(
              'space-y-4 transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <div className="flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400 font-medium mb-4">
              <Palette size={20} />
              <span>作品集</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
              设计作品展示
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              探索我的设计世界，每一个作品都承载着独特的创意理念和专业技能。
              从品牌识别到电商设计，从包装设计到用户界面，见证设计的力量。
            </p>
          </div>

          {/* 快速统计 */}
          <div
            className={cn(
              'grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 ease-out delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Briefcase size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {projects.length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  设计项目
                </div>
              </div>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <Star size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {projectCategories.length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  设计领域
                </div>
              </div>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <Heart size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {stats.happyClients}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  满意客户
                </div>
              </div>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto">
                  <Eye size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {stats.totalViews > 10000 ? `${(stats.totalViews / 10000).toFixed(1)}万` : stats.totalViews}+
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  作品浏览
                </div>
              </div>
            </Card>
          </div>

          {/* 行动按钮 */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Button
              asChild
              size="lg"
              variant="gradient"
              className="group"
            >
              <a href="#portfolio-grid">
                <Palette size={20} className="mr-2" />
                浏览作品
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group"
            >
              <Link href="/contact">
                开始合作
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* 设计理念简述 */}
          <div
            className={cn(
              'max-w-2xl mx-auto transition-all duration-1000 ease-out delay-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                  <TrendingUp size={32} className="text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    设计理念
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    每一个设计都是一次对美的探索，一次对问题的解决，一次对用户需求的深度理解。
                    我相信好的设计能够跨越语言和文化的障碍，直达人心。
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
