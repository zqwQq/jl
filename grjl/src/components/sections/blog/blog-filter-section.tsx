'use client';

import * as React from 'react';
import { Search, Filter, Grid, List, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { blogCategories } from '@/data/blog';

interface BlogFilterSectionProps {
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (search: string) => void;
  onSortChange?: (sort: 'latest' | 'popular' | 'oldest') => void;
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

/**
 * 博客筛选区域组件
 */
export function BlogFilterSection({
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onViewModeChange
}: BlogFilterSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'latest' | 'popular' | 'oldest'>('latest');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleSortChange = (sort: 'latest' | 'popular' | 'oldest') => {
    setSortBy(sort);
    onSortChange?.(sort);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    onViewModeChange?.(mode);
  };

  return (
    <Section ref={sectionRef} className="py-8">
      <div
        className={cn(
          'space-y-6 transition-all duration-1000 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        {/* 搜索框 */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* 筛选控制 */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              )}
            >
              全部文章
            </button>
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1',
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                )}
              >
                <span>{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          {/* 排序和视图控制 */}
          <div className="flex items-center space-x-4">
            {/* 排序选择 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">排序:</span>
              <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <button
                  onClick={() => handleSortChange('latest')}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-all duration-200',
                    sortBy === 'latest'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  )}
                >
                  <Calendar size={14} />
                  <span>最新</span>
                </button>
                <button
                  onClick={() => handleSortChange('popular')}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-all duration-200',
                    sortBy === 'popular'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  )}
                >
                  <TrendingUp size={14} />
                  <span>热门</span>
                </button>
              </div>
            </div>

            {/* 视图模式切换 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">视图:</span>
              <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={cn(
                    'p-2 rounded-md transition-all duration-200',
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  )}
                  aria-label="网格视图"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={cn(
                    'p-2 rounded-md transition-all duration-200',
                    viewMode === 'list'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  )}
                  aria-label="列表视图"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 筛选结果提示 */}
        {(selectedCategory !== 'all' || searchTerm) && (
          <div
            className={cn(
              'text-center text-sm text-neutral-600 dark:text-neutral-400 transition-all duration-300',
              isVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            {searchTerm && (
              <span>搜索 "{searchTerm}" </span>
            )}
            {selectedCategory !== 'all' && (
              <span>
                在 "{blogCategories.find(cat => cat.id === selectedCategory)?.name}" 分类中
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                onCategoryChange?.('all');
                onSearchChange?.('');
              }}
              className="ml-2 text-primary-600 dark:text-primary-400 hover:underline"
            >
              清除筛选
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
