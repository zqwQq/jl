'use client';

import * as React from 'react';
import { 
  Calendar, 
  Star, 
  TrendingUp, 
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { skillTimeline } from '@/data/experience';

/**
 * 时间线节点组件
 */
interface TimelineNodeProps {
  item: typeof skillTimeline[0];
  index: number;
  isVisible: boolean;
  isLast: boolean;
}

function TimelineNode({ item, index, isVisible, isLast }: TimelineNodeProps) {
  return (
    <div className="relative">
      {/* 时间线连接线 */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500 hidden lg:block" />
      )}

      <div
        className={cn(
          'flex items-start space-x-6 transition-all duration-700 ease-out',
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-8'
        )}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        {/* 时间线节点 */}
        <div className="flex-shrink-0 relative">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
            <Calendar size={20} className="text-white" />
          </div>
          
          {/* 年份标签 */}
          <div className="absolute -top-2 -right-2 bg-white dark:bg-neutral-900 border-2 border-primary-200 dark:border-primary-800 rounded-full px-2 py-1 text-xs font-bold text-primary-600 dark:text-primary-400">
            {item.year}
          </div>
        </div>

        {/* 内容卡片 */}
        <Card hover className="flex-1 group">
          <div className="space-y-4">
            {/* 标题和描述 */}
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* 技能标签 */}
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-white mb-2 flex items-center">
                <Star size={16} className="mr-2 text-primary-600 dark:text-primary-400" />
                掌握技能
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 重要里程碑 */}
            <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-lg">
              <Target size={16} className="text-accent-600 dark:text-accent-400 flex-shrink-0" />
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                重要里程碑：{item.milestone}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * 成长时间线区域组件
 */
export function TimelineSection() {
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
      id="timeline"
      title="成长时间线"
      subtitle="Growth Timeline"
      description="我的设计之路，从艺术启蒙到专业设计师的成长历程"
      background="muted"
    >
      <div className="space-y-12">
        {/* 时间线概览 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Calendar size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {skillTimeline.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    成长阶段
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {new Date().getFullYear() - 2019}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    年持续成长
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {skillTimeline.reduce((total, stage) => total + stage.skills.length, 0)}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    累计技能
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 时间线主体 */}
        <div className="space-y-12">
          {skillTimeline.map((item, index) => (
            <TimelineNode
              key={item.year}
              item={item}
              index={index}
              isVisible={isVisible}
              isLast={index === skillTimeline.length - 1}
            />
          ))}
        </div>

        {/* 未来展望 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                <ArrowRight size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  未来展望
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      技能拓展
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      继续学习新兴技术，如AI辅助设计、VR/AR设计等
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      业务发展
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      建立设计工作室，为更多客户提供专业服务
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      知识分享
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      通过教学和写作，分享设计经验和见解
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 成长感悟 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-1200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 border-accent-200 dark:border-accent-800">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-600 to-primary-600 rounded-xl flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  成长感悟
                </h3>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  回顾这几年的成长历程，我深深感受到设计不仅仅是一门技术，更是一种思维方式和生活态度。
                  从最初的艺术启蒙到现在的专业设计师，每一个阶段都有其独特的价值和意义。
                </p>
                
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  我学会了从用户的角度思考问题，学会了在美观与实用之间找到平衡，
                  更重要的是，我学会了如何通过设计为世界带来正面的影响。
                  未来的路还很长，但我已经准备好迎接更多的挑战和机遇。
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
