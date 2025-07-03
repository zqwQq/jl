'use client';

import * as React from 'react';
import Image from 'next/image';
import { 
  Trophy, 
  Calendar, 
  ExternalLink, 
  Award,
  Star,
  Medal,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { awards } from '@/data/experience';

/**
 * 奖项卡片组件
 */
interface AwardCardProps {
  award: typeof awards[0];
  index: number;
  isVisible: boolean;
}

function AwardCard({ award, index, isVisible }: AwardCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // 根据奖项类型选择图标和颜色
  const getAwardStyle = (category: string) => {
    switch (category) {
      case '品牌设计':
        return {
          icon: Crown,
          bgColor: 'from-yellow-500 to-orange-500',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-600 dark:text-yellow-400'
        };
      case '包装设计':
        return {
          icon: Medal,
          bgColor: 'from-blue-500 to-purple-500',
          borderColor: 'border-blue-200 dark:border-blue-800',
          textColor: 'text-blue-600 dark:text-blue-400'
        };
      case '学生竞赛':
        return {
          icon: Star,
          bgColor: 'from-green-500 to-teal-500',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-600 dark:text-green-400'
        };
      default:
        return {
          icon: Trophy,
          bgColor: 'from-primary-500 to-secondary-500',
          borderColor: 'border-primary-200 dark:border-primary-800',
          textColor: 'text-primary-600 dark:text-primary-400'
        };
    }
  };

  const style = getAwardStyle(award.category);
  const IconComponent = style.icon;

  return (
    <Card
      hover
      className={cn(
        'group transition-all duration-700 ease-out',
        style.borderColor,
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="space-y-4">
        {/* 奖项图片 */}
        {award.image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={award.image}
              alt={award.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* 奖项类型标识 */}
            <div className="absolute top-2 left-2">
              <div className={cn(
                'flex items-center space-x-1 text-white text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r',
                style.bgColor
              )}>
                <IconComponent size={12} />
                <span>{award.category}</span>
              </div>
            </div>
          </div>
        )}

        {/* 奖项信息 */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {award.title}
            </h3>
            <div className={cn('font-medium', style.textColor)}>
              {award.issuer}
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400">
            <Calendar size={14} />
            <span>{formatDate(award.date)}</span>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {award.description}
          </p>

          {award.url && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full group-hover:border-primary-300 group-hover:text-primary-600 dark:group-hover:border-primary-600 dark:group-hover:text-primary-400"
            >
              <a 
                href={award.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} className="mr-2" />
                查看详情
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * 奖项和荣誉区域组件
 */
export function AwardsSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
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

  // 获取所有奖项类别
  const categories = ['all', ...Array.from(new Set(awards.map(award => award.category)))];

  // 筛选奖项
  const filteredAwards = selectedCategory === 'all' 
    ? awards 
    : awards.filter(award => award.category === selectedCategory);

  // 按年份分组
  const awardsByYear = filteredAwards.reduce((acc, award) => {
    const year = new Date(award.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(award);
    return acc;
  }, {} as Record<string, typeof awards>);

  return (
    <Section 
      ref={sectionRef}
      id="awards"
      title="奖项荣誉"
      subtitle="Awards & Honors"
      description="我的设计作品获得的认可和荣誉，见证我的专业成长历程"
    >
      <div className="space-y-12">
        {/* 荣誉概览 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mx-auto">
                  <Trophy size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {awards.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    获得奖项
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {categories.length - 1}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    奖项类别
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    2024
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    最新获奖
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <Medal size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    权威
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    颁奖机构
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 奖项分类筛选 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-300',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                )}
              >
                {category === 'all' ? '全部奖项' : category}
              </button>
            ))}
          </div>
        </div>

        {/* 按年份展示奖项 */}
        <div className="space-y-12">
          {Object.entries(awardsByYear)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .map(([year, yearAwards]) => (
              <div key={year}>
                <div
                  className={cn(
                    'text-center mb-8 transition-all duration-1000 ease-out delay-500',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                >
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {year}年
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yearAwards.map((award, index) => (
                    <AwardCard
                      key={award.id}
                      award={award}
                      index={index}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* 荣誉意义说明 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                <Trophy size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  荣誉的意义
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      专业认可
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      获得行业专家和权威机构的认可，证明设计水平
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      激励成长
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      每一个奖项都是前进的动力，推动我不断提升
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      品质保证
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      为客户提供高质量设计服务的信心和保障
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
