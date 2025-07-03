'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ExternalLink, 
  Calendar, 
  User, 
  Tag,
  Eye,
  Heart,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects';

/**
 * 项目卡片组件
 */
interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  isVisible: boolean;
  viewMode: 'grid' | 'list';
}

function ProjectCard({ project, index, isVisible, viewMode }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  if (viewMode === 'list') {
    return (
      <Card
        hover
        className={cn(
          'group transition-all duration-700 ease-out',
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        )}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* 项目图片 */}
          <div className="relative w-full md:w-48 aspect-[4/3] overflow-hidden rounded-lg flex-shrink-0">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className={cn(
                'object-cover transition-all duration-500',
                'group-hover:scale-110',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
            />
            
            {!imageLoaded && (
              <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            )}
          </div>

          {/* 项目信息 */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-500">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span>{project.client}</span>
                </div>
              </div>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="group-hover:border-primary-300 group-hover:text-primary-600 dark:group-hover:border-primary-600 dark:group-hover:text-primary-400"
              >
                <Link href={`/portfolio/${project.id}`}>
                  查看详情
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      hover
      className={cn(
        'group overflow-hidden transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
      padding="sm"
    >
      {/* 项目图片 */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className={cn(
            'object-cover transition-all duration-500',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        )}
        
        {/* 悬停遮罩 */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* 项目状态标签 */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            project.status === 'completed' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : project.status === 'in-progress'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
          )}>
            {project.status === 'completed' ? '已完成' : 
             project.status === 'in-progress' ? '进行中' : '概念'}
          </span>
        </div>

        {/* 查看详情按钮 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="backdrop-blur-sm bg-white/90 dark:bg-neutral-900/90"
          >
            <Link href={`/portfolio/${project.id}`}>
              <ExternalLink size={16} className="mr-2" />
              查看详情
            </Link>
          </Button>
        </div>
      </div>

      {/* 项目信息 */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>{project.year}</span>
            </div>
            {project.client && (
              <div className="flex items-center space-x-1">
                <User size={12} />
                <span className="truncate max-w-20">{project.client}</span>
              </div>
            )}
          </div>
          <div className="text-primary-600 dark:text-primary-400 font-medium">
            {project.role}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

interface PortfolioGridSectionProps {
  selectedCategory?: string;
  searchTerm?: string;
  viewMode?: 'grid' | 'list';
}

/**
 * 作品集网格展示区域组件
 */
export function PortfolioGridSection({
  selectedCategory = 'all',
  searchTerm = '',
  viewMode = 'grid'
}: PortfolioGridSectionProps) {
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

  // 筛选项目
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <Section ref={sectionRef} id="portfolio-grid">
      <div className="space-y-8">
        {/* 结果统计 */}
        <div
          className={cn(
            'text-center transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <p className="text-neutral-600 dark:text-neutral-400">
            找到 <span className="font-semibold text-primary-600 dark:text-primary-400">{filteredProjects.length}</span> 个作品
          </p>
        </div>

        {/* 项目网格/列表 */}
        {filteredProjects.length > 0 ? (
          <div className={cn(
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
              : 'space-y-6'
          )}>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={isVisible}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              'text-center py-16 transition-all duration-1000 ease-out delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye size={32} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              没有找到匹配的作品
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              尝试调整搜索条件或浏览其他分类
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
            >
              重置筛选
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
