'use client';

import * as React from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Send,
  Heart,
  Sparkles
} from 'lucide-react';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { personalInfo } from '@/data/personal';

/**
 * 联系页面英雄区域组件
 */
export function ContactHeroSection() {
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
        
        {/* 装饰性图标 */}
        <div className="absolute top-20 right-20 text-primary-200 dark:text-primary-800/50">
          <MessageCircle size={60} />
        </div>
        <div className="absolute bottom-20 left-20 text-secondary-200 dark:text-secondary-800/50">
          <Send size={40} />
        </div>
        <div className="absolute top-1/2 right-1/4 text-accent-200 dark:text-accent-800/50">
          <Sparkles size={30} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-center space-y-8">
          {/* 主标题 */}
          <div
            className={cn(
              'space-y-6 transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <div className="flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400 font-medium mb-4">
              <Mail size={20} />
              <span>联系合作</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              让我们一起创造
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                精彩作品
              </span>
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              无论您是需要品牌设计、UI/UX设计，还是电商视觉设计，
              我都很乐意与您探讨项目需求，为您提供专业的设计解决方案。
            </p>
          </div>

          {/* 联系方式快览 */}
          <div
            className={cn(
              'grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 ease-out delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-900 transition-all duration-300 group">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                    邮箱联系
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {personalInfo.email}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-900 transition-all duration-300 group">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                    电话咨询
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {personalInfo.phone}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-900 transition-all duration-300 group">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                    工作地点
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* 工作时间和响应承诺 */}
          <div
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto transition-all duration-1000 ease-out delay-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                    工作时间
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    周一至周五 9:00-18:00<br />
                    周末及节假日可预约
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border-accent-200 dark:border-accent-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                    响应承诺
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    24小时内回复邮件<br />
                    工作时间内即时响应
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* 合作理念 */}
          <div
            className={cn(
              'max-w-2xl mx-auto transition-all duration-1000 ease-out delay-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <Card className="bg-gradient-to-r from-neutral-50 to-primary-50 dark:from-neutral-800 dark:to-primary-900/20 border-neutral-200 dark:border-neutral-700">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-neutral-600 to-primary-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles size={32} className="text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    合作理念
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    我相信每个项目都有其独特的故事和价值。通过深入了解您的需求和目标，
                    我致力于为您创造既美观又实用的设计解决方案。
                    让我们一起将您的想法转化为令人印象深刻的视觉作品。
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
