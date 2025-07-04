'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart,
  ArrowRight,
  User,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { blogPosts, BlogPost } from '@/data/blog';

/**
 * 博客文章卡片组件
 */
interface BlogCardProps {
  post: BlogPost;
  index: number;
  isVisible: boolean;
  viewMode: 'grid' | 'list';
}

function BlogCard({ post, index, isVisible, viewMode }: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
          {/* 文章图片 */}
          <div className="relative w-full md:w-48 aspect-[16/10] overflow-hidden rounded-lg flex-shrink-0">
            <Image
              src={post.coverImage}
              alt={post.title}
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

            {post.featured && (
              <div className="absolute top-2 left-2">
                <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  精选
                </span>
              </div>
            )}
          </div>

          {/* 文章信息 */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-500">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{post.readingTime}分钟阅读</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye size={14} />
                  <span>{post.views}</span>
                </div>
              </div>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="group-hover:border-primary-300 group-hover:text-primary-600 dark:group-hover:border-primary-600 dark:group-hover:text-primary-400"
              >
                <Link href={`/blog/${post.slug}`}>
                  阅读全文
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
      {/* 文章图片 */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4">
        <Image
          src={post.coverImage}
          alt={post.title}
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
        
        {/* 精选标签 */}
        {post.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              精选
            </span>
          </div>
        )}

        {/* 阅读时间 */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            {post.readingTime}分钟
          </span>
        </div>
      </div>

      {/* 文章信息 */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* 文章元信息 */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={12} />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={12} />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* 阅读按钮 */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full group-hover:border-primary-300 group-hover:text-primary-600 dark:group-hover:border-primary-600 dark:group-hover:text-primary-400"
        >
          <Link href={`/blog/${post.slug}`}>
            阅读全文
            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

interface BlogGridSectionProps {
  selectedCategory?: string;
  searchTerm?: string;
  sortBy?: 'latest' | 'popular' | 'oldest';
  viewMode?: 'grid' | 'list';
}

/**
 * 博客网格展示区域组件
 */
export function BlogGridSection({
  selectedCategory = 'all',
  searchTerm = '',
  sortBy = 'latest',
  viewMode = 'grid'
}: BlogGridSectionProps) {
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

  // 筛选和排序文章
  let filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // 排序
  filteredPosts = filteredPosts.sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'latest':
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  return (
    <div ref={sectionRef}>
      <div className="space-y-8">
        {/* 结果统计 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <p className="text-neutral-600 dark:text-neutral-400">
            找到 <span className="font-semibold text-primary-600 dark:text-primary-400">{filteredPosts.length}</span> 篇文章
          </p>
        </div>

        {/* 文章列表 */}
        {filteredPosts.length > 0 ? (
          <div className={cn(
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'
              : 'space-y-6'
          )}>
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
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
              没有找到匹配的文章
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
    </div>
  );
}
