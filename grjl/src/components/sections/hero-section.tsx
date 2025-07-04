'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  MapPin, 
  Calendar,
  Star,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { personalInfo, stats } from '@/data/personal';

/**
 * 现代化英雄区域组件
 * 首页的主要展示区域，包含个人介绍和主要行动按钮
 */
export function HeroSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 动态背景 */}
      <div
        className="absolute inset-0 bg-gradient-primary"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.6) 50%, rgba(102, 126, 234, 0.4) 100%)`
        }}
      />

      {/* 浮动装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-white/5 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-modern relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容 */}
          <div className="text-center lg:text-left space-y-8">
            {/* 问候语动画 */}
            <div
              className={cn(
                'transition-all duration-1000 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white font-medium mb-6">
                <Sparkles size={18} className="animate-pulse" />
                <span>你好，我是设计师</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block font-serif animate-glow">{personalInfo.chineseName}</span>
                <span className="block text-2xl lg:text-3xl font-normal text-white/80 mt-4 font-sans">
                  {personalInfo.name}
                </span>
              </h1>

              <div className="text-2xl lg:text-3xl text-white/90 font-light mb-8 leading-relaxed">
                <span className="gradient-text bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {personalInfo.title}
                </span>
              </div>

              <p className="text-xl text-white/80 leading-relaxed max-w-2xl font-light">
                {personalInfo.subtitle}
              </p>
            </div>

            {/* 个人信息标签 */}
            <div
              className={cn(
                'flex flex-wrap gap-4 transition-all duration-1000 ease-out delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="flex items-center space-x-2 glass rounded-full px-6 py-3 text-white">
                <MapPin size={18} className="text-white/80" />
                <span className="font-medium">{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2 glass rounded-full px-6 py-3 text-white">
                <Calendar size={18} className="text-white/80" />
                <span className="font-medium">{personalInfo.zodiacSign} · {personalInfo.chineseZodiac}</span>
              </div>
              <div className="flex items-center space-x-2 glass rounded-full px-6 py-3 text-white">
                <Star size={18} className="text-white/80" />
                <span className="font-medium">{stats.yearsExperience}年经验</span>
              </div>
            </div>

            {/* 行动按钮 */}
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-6 transition-all duration-1000 ease-out delay-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <button className="btn btn-secondary group px-8 py-4 text-lg font-semibold">
                <Link href="/contact" className="flex items-center">
                  <Mail size={22} className="mr-3" />
                  开始合作
                  <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </button>

              <button className="btn glass text-white group px-8 py-4 text-lg font-semibold border-white/30 hover:border-white/50">
                <Link href="/portfolio" className="flex items-center">
                  查看作品
                  <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </button>

              <button className="btn glass text-white group px-8 py-4 text-lg font-semibold border-white/30 hover:border-white/50">
                <a href={personalInfo.resume} download className="flex items-center">
                  <Download size={22} className="mr-3 group-hover:translate-y-0.5 transition-transform" />
                  下载简历
                </a>
              </button>
            </div>

            {/* 快速统计 */}
            <div
              className={cn(
                'grid grid-cols-3 gap-8 pt-12 transition-all duration-1000 ease-out delay-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stats.projectsCompleted}+
                </div>
                <div className="text-white/70 font-medium">
                  完成项目
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stats.happyClients}+
                </div>
                <div className="text-white/70 font-medium">
                  满意客户
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stats.awardsWon}+
                </div>
                <div className="text-white/70 font-medium">
                  获得奖项
                </div>
              </div>
            </div>
          </div>

          {/* 右侧头像和装饰 */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className={cn(
                'relative transition-all duration-1000 ease-out delay-200',
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              )}
            >
              {/* 现代化头像容器 */}
              <div className="relative">
                {/* 背景光晕效果 */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-110 animate-pulse" />

                {/* 头像主体 */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-full backdrop-blur-sm border border-white/30" />
                  <div className="absolute inset-4 rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src={personalInfo.avatar}
                      alt={personalInfo.chineseName}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                    {/* 头像渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* 装饰性元素 */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/30 rounded-full backdrop-blur-md animate-float" />
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-white/20 rounded-full backdrop-blur-md animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/4 -left-8 w-6 h-6 bg-white/25 rounded-full backdrop-blur-md animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-1/4 -right-8 w-10 h-10 bg-white/20 rounded-full backdrop-blur-md animate-float" style={{ animationDelay: '3s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
