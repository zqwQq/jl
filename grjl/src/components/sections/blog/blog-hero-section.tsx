'use client';

import * as React from 'react';
import { 
  BookOpen, 
  PenTool, 
  Users, 
  TrendingUp,
  Calendar,
  Eye,
  Heart
} from 'lucide-react';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { getBlogStats } from '@/data/blog';

/**
 * 博客英雄区域组件
 */
export function BlogHeroSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const stats = getBlogStats();

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
              <PenTool size={20} />
              <span>设计博客</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
              分享设计之美
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              在这里，我分享设计路上的思考与感悟，记录创作过程中的点点滴滴。
              从设计趋势到实战经验，从理论知识到工具技巧，与你一起探索设计的无限可能。
            </p>
          </div>

          {/* 博客统计 */}
          <div
            className={cn(
              'grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 ease-out delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {stats.totalPosts}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  篇文章
                </div>
              </div>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <Eye size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {stats.totalViews > 1000 ? `${(stats.totalViews / 1000).toFixed(1)}k` : stats.totalViews}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  总阅读量
                </div>
              </div>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <Heart size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {stats.totalLikes}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  获得点赞
                </div>
              </div>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {stats.categories}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  个分类
                </div>
              </div>
            </Card>
          </div>

          {/* 博客理念 */}
          <div
            className={cn(
              'max-w-2xl mx-auto transition-all duration-1000 ease-out delay-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Users size={32} className="text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    写作理念
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    我相信知识的分享能够创造更大的价值。通过记录和分享，
                    不仅能够帮助他人成长，也能让自己在思考和总结中不断进步。
                    让我们一起在设计的道路上相互学习，共同成长。
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
