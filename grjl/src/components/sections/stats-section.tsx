'use client';

import * as React from 'react';
import { 
  Briefcase, 
  Users, 
  Award, 
  BookOpen,
  Eye,
  Calendar
} from 'lucide-react';
import { Section } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { stats } from '@/data/personal';

// 现代化统计项配置
const statsConfig = [
  {
    key: 'projectsCompleted',
    label: '完成项目',
    icon: Briefcase,
    suffix: '+',
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    iconBg: 'bg-blue-500/20',
    description: '成功交付的设计项目'
  },
  {
    key: 'happyClients',
    label: '满意客户',
    icon: Users,
    suffix: '+',
    gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
    iconBg: 'bg-emerald-500/20',
    description: '建立长期合作关系'
  },
  {
    key: 'awardsWon',
    label: '获得奖项',
    icon: Award,
    suffix: '+',
    gradient: 'from-amber-400 via-amber-500 to-amber-600',
    iconBg: 'bg-amber-500/20',
    description: '行业认可与荣誉'
  },
  {
    key: 'yearsExperience',
    label: '年工作经验',
    icon: Calendar,
    suffix: '',
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
    iconBg: 'bg-purple-500/20',
    description: '专业设计经验积累'
  },
  {
    key: 'blogPosts',
    label: '博客文章',
    icon: BookOpen,
    suffix: '+',
    gradient: 'from-pink-400 via-pink-500 to-pink-600',
    iconBg: 'bg-pink-500/20',
    description: '分享设计心得体会'
  },
  {
    key: 'totalViews',
    label: '总浏览量',
    icon: Eye,
    suffix: '+',
    gradient: 'from-indigo-400 via-indigo-500 to-indigo-600',
    iconBg: 'bg-indigo-500/20',
    description: '作品展示与影响力',
    format: (value: number) => {
      if (value >= 10000) {
        return `${(value / 10000).toFixed(1)}万`;
      }
      return value.toString();
    },
  },
];

/**
 * 数字动画钩子
 */
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = React.useState(start);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const animate = React.useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, start, isAnimating]);

  return { count, animate };
}

/**
 * 统计卡片组件
 */
interface StatCardProps {
  stat: typeof statsConfig[0];
  value: number;
  index: number;
  isVisible: boolean;
}

function StatCard({ stat, value, index, isVisible }: StatCardProps) {
  const { count, animate } = useCountUp(value, 2000 + index * 200);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        animate();
        setHasAnimated(true);
      }, index * 150);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, animate, index]);

  const displayValue = stat.format ? stat.format(count) : count;

  return (
    <div
      className={cn(
        'relative group transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" 
           style={{ background: `linear-gradient(135deg, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }} />
      
      {/* 卡片内容 */}
      <div className={cn(
        'relative bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800',
        'hover:shadow-lg hover:-translate-y-1 transition-all duration-300',
        'group-hover:border-transparent'
      )}>
        {/* 图标背景 */}
        <div className={cn(
          'w-16 h-16 rounded-xl flex items-center justify-center mb-4',
          stat.bgColor
        )}>
          <stat.icon size={28} className={stat.iconColor} />
        </div>

        {/* 数值 */}
        <div className="space-y-2">
          <div className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white">
            {displayValue}{stat.suffix}
          </div>
          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {stat.label}
          </div>
        </div>

        {/* 进度指示器 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-b-2xl overflow-hidden">
          <div 
            className={cn(
              'h-full bg-gradient-to-r transition-all duration-1000 ease-out',
              stat.color.replace('from-', 'from-').replace('to-', 'to-'),
              isVisible ? 'w-full' : 'w-0'
            )}
            style={{ transitionDelay: `${500 + index * 100}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 统计数据区域组件
 */
export function StatsSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* 现代化背景 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      <div className="container-modern relative z-10">
        {/* 现代化标题 */}
        <div
          className={cn(
            'text-center mb-20 transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-primary text-white rounded-full px-6 py-2 text-sm font-medium mb-6">
            <Award size={16} />
            <span>数据说话</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold gradient-text mb-6">
            用数字见证成长
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            每一个数字背后都是我与客户共同创造的价值，是我不断成长的见证
          </p>
        </div>

        {/* 现代化统计卡片网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {statsConfig.map((statConfig, index) => (
            <ModernStatCard
              key={statConfig.key}
              stat={statConfig}
              value={stats[statConfig.key as keyof typeof stats] as number}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* 底部装饰 */}
        <div
          className={cn(
            'text-center mt-16 transition-all duration-1000 ease-out delay-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-8 h-px bg-gradient-primary" />
            <span className="text-sm font-medium">数据截至 2024年12月，持续更新中</span>
            <div className="w-8 h-px bg-gradient-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 现代化统计卡片组件
 */
interface ModernStatCardProps {
  stat: typeof statsConfig[0];
  value: number;
  index: number;
  isVisible: boolean;
}

function ModernStatCard({ stat, value, index, isVisible }: ModernStatCardProps) {
  const { count, animate } = useCountUp(value, 2000 + index * 200);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        animate();
        setHasAnimated(true);
      }, index * 150);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, animate, index]);

  const displayValue = stat.format ? stat.format(count) : count;

  return (
    <div
      className={cn(
        'group relative transition-all duration-1000 ease-out',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* 现代化卡片 */}
      <div className="relative card-solid group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500">
        {/* 背景渐变装饰 */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl',
          stat.gradient
        )} />

        {/* 图标容器 */}
        <div className="relative mb-6">
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-110',
            stat.iconBg
          )}>
            <stat.icon size={32} className="text-white" />
          </div>

          {/* 装饰性光点 */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-60 animate-pulse" />
        </div>

        {/* 数值显示 */}
        <div className="space-y-3">
          <div className={cn(
            'text-4xl lg:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300',
            stat.gradient
          )}>
            {displayValue}{stat.suffix}
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {stat.label}
          </div>
          <div className="text-sm text-gray-500 leading-relaxed">
            {stat.description}
          </div>
        </div>

        {/* 底部装饰线 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-2xl overflow-hidden">
          <div
            className={cn(
              'h-full bg-gradient-to-r transition-all duration-1500 ease-out',
              stat.gradient,
              isVisible ? 'w-full' : 'w-0'
            )}
            style={{ transitionDelay: `${800 + index * 150}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
