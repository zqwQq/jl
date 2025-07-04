'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  TrendingUp, 
  Calendar, 
  Tag, 
  User,
  Eye,
  Heart,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { 
  featuredPosts, 
  popularPosts, 
  blogCategories, 
  blogTags,
  getBlogStats 
} from '@/data/blog';
import { personalInfo } from '@/data/personal';

/**
 * 博客侧边栏组件
 */
export function BlogSidebarSection() {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div ref={sectionRef} className="space-y-8">
      {/* 作者信息 */}
      <Card
        className={cn(
          'text-center transition-all duration-1000 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <Image
              src={personalInfo.avatar}
              alt={personalInfo.chineseName}
              fill
              className="object-cover rounded-full"
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">
              {personalInfo.chineseName}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              {personalInfo.title}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="text-center">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {stats.totalPosts}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                文章
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {stats.totalViews > 1000 ? `${(stats.totalViews / 1000).toFixed(1)}k` : stats.totalViews}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                阅读
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {stats.totalLikes}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                点赞
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 热门文章 */}
      <Card
        className={cn(
          'transition-all duration-1000 ease-out delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp size={18} className="text-primary-600 dark:text-primary-400" />
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              热门文章
            </h3>
          </div>

          <div className="space-y-4">
            {popularPosts.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="flex space-x-3">
                  <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={10} />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={10} />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Link href="/blog?sort=popular">
              查看更多热门文章
              <ArrowRight size={14} className="ml-2" />
            </Link>
          </Button>
        </div>
      </Card>

      {/* 文章分类 */}
      <Card
        className={cn(
          'transition-all duration-1000 ease-out delay-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <BookOpen size={18} className="text-primary-600 dark:text-primary-400" />
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              文章分类
            </h3>
          </div>

          <div className="space-y-2">
            {blogCategories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.id}`}
                className="group flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    'w-3 h-3 rounded-full',
                    category.color === 'blue' && 'bg-blue-500',
                    category.color === 'green' && 'bg-green-500',
                    category.color === 'purple' && 'bg-purple-500',
                    category.color === 'orange' && 'bg-orange-500',
                    category.color === 'pink' && 'bg-pink-500'
                  )} />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {category.name}
                  </span>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      {/* 热门标签 */}
      <Card
        className={cn(
          'transition-all duration-1000 ease-out delay-400',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Tag size={18} className="text-primary-600 dark:text-primary-400" />
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              热门标签
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {blogTags.slice(0, 12).map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.name}`}
                className="inline-flex items-center px-3 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900 dark:hover:text-primary-300 transition-colors"
              >
                {tag.name}
                <span className="ml-1 text-xs opacity-60">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      {/* 精选文章 */}
      <Card
        className={cn(
          'transition-all duration-1000 ease-out delay-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Heart size={18} className="text-primary-600 dark:text-primary-400" />
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              精选推荐
            </h3>
          </div>

          <div className="space-y-3">
            {featuredPosts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all duration-200"
              >
                <h4 className="text-sm font-medium text-neutral-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
                  <span>{formatDate(post.publishedAt)}</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Eye size={10} />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart size={10} />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
