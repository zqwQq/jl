'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, User, Briefcase, BookOpen, Mail, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { personalInfo } from '@/data/personal';

// 导航菜单项
const navigationItems = [
  {
    name: '首页',
    href: '/',
    icon: Home,
  },
  {
    name: '关于我',
    href: '/about',
    icon: User,
  },
  {
    name: '作品集',
    href: '/portfolio',
    icon: Briefcase,
  },
  {
    name: '博客',
    href: '/blog',
    icon: BookOpen,
  },
  {
    name: '服务',
    href: '/services',
    icon: Settings,
  },
  {
    name: '联系',
    href: '/contact',
    icon: Mail,
  },
];

/**
 * 网站头部导航组件
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  // 监听滚动事件，添加背景模糊效果
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭移动端菜单
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass shadow-2xl border-b border-white/20'
          : 'bg-transparent'
      )}
    >
      <div className="container-modern">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* 现代化Logo */}
          <Link
            href="/"
            className="flex items-center space-x-4 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                {personalInfo.chineseName.charAt(0)}
              </div>
              <div className="absolute -inset-2 bg-gradient-primary rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-300 blur-lg animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-white group-hover:text-white/90 transition-colors">
                {personalInfo.chineseName}
              </div>
              <div className="text-sm text-white/70 -mt-1 font-medium">
                {personalInfo.title}
              </div>
            </div>
          </Link>

          {/* 现代化桌面端导航 */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group',
                    isActive
                      ? 'text-white bg-white/20 backdrop-blur-md border border-white/30 shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20'
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 现代化右侧操作区 */}
          <div className="flex items-center space-x-4">
            {/* 主题切换按钮 */}
            <div className="glass rounded-2xl p-2">
              <ThemeToggle size="md" variant="ghost" />
            </div>

            {/* 联系按钮 - 桌面端显示 */}
            <div className="hidden lg:block">
              <button className="btn btn-secondary px-6 py-3 text-sm font-semibold">
                <Link href="/contact" className="flex items-center space-x-2">
                  <Mail size={18} />
                  <span>开始合作</span>
                </Link>
              </button>
            </div>

            {/* 现代化移动端菜单按钮 */}
            <button
              className="lg:hidden glass rounded-2xl p-3 text-white transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="切换菜单"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* 现代化移动端导航菜单 */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="glass border-t border-white/20 backdrop-blur-xl">
              <div className="px-6 pt-6 pb-8 space-y-3">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-4 px-4 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 relative overflow-hidden group',
                        isActive
                          ? 'text-white bg-white/20 backdrop-blur-md border border-white/30 shadow-lg'
                          : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-md'
                      )}
                      onClick={closeMobileMenu}
                    >
                      <item.icon size={24} />
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl" />
                      )}
                    </Link>
                  );
                })}
              
              {/* 移动端联系按钮 */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <Button
                  asChild
                  variant="gradient"
                  className="w-full"
                  onClick={closeMobileMenu}
                >
                  <Link href="/contact">
                    开始合作
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * 导航链接组件
 */
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
        'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        isActive
          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
          : 'text-neutral-700 dark:text-neutral-300',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
