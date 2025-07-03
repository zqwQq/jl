'use client';

import * as React from 'react';
import Image from 'next/image';
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  BookOpen,
  Star,
  Trophy
} from 'lucide-react';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { education } from '@/data/experience';

/**
 * 教育经历卡片组件
 */
interface EducationCardProps {
  edu: typeof education[0];
  index: number;
  isVisible: boolean;
}

function EducationCard({ edu, index, isVisible }: EducationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    
    return `${years}年`;
  };

  return (
    <Card
      hover
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="space-y-6">
        {/* 学校信息 */}
        <div className="flex items-start space-x-4">
          {/* 学校Logo */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              {edu.logo ? (
                <Image
                  src={edu.logo}
                  alt={edu.institution}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <GraduationCap size={24} className="text-neutral-400" />
                </div>
              )}
            </div>
          </div>

          {/* 基本信息 */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
              {edu.institution}
            </h3>
            <div className="text-lg text-primary-600 dark:text-primary-400 font-medium mb-2">
              {edu.degree} · {edu.major}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen size={14} />
                <span>{calculateDuration(edu.startDate, edu.endDate)}</span>
              </div>
              {edu.gpa && (
                <div className="flex items-center space-x-1">
                  <Star size={14} />
                  <span>GPA: {edu.gpa}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 描述 */}
        {edu.description && (
          <div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {edu.description}
            </p>
          </div>
        )}

        {/* 主要成就 */}
        {edu.achievements && edu.achievements.length > 0 && (
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center">
              <Trophy size={16} className="mr-2 text-primary-600 dark:text-primary-400" />
              主要成就
            </h4>
            <ul className="space-y-2">
              {edu.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Award size={14} className="mt-0.5 text-yellow-500 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * 教育背景区域组件
 */
export function EducationSection() {
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
      id="education"
      title="教育背景"
      subtitle="Education"
      description="我的学习历程，从艺术基础到专业设计的系统性教育"
    >
      <div className="space-y-12">
        {/* 教育概览 */}
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
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {education.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    教育经历
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    专科
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    最高学历
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
                    3.8
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    平均GPA
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 教育经历列表 */}
        <div className="space-y-8">
          {education.map((edu, index) => (
            <EducationCard
              key={edu.id}
              edu={edu}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* 学习理念 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  学习理念与方法
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      理论与实践结合
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      在学习设计理论的同时，积极参与实际项目，将知识转化为能力
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      跨学科学习
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      除了设计专业课程，还学习心理学、市场营销等相关知识
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      持续自我提升
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      保持学习热情，通过在线课程、工作坊等方式不断更新知识
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
