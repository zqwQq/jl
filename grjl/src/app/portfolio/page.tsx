'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import ProjectCard from '@/components/ui/ProjectCard'
import { mockProjects } from '@/data/mockData'
import { Filter } from 'lucide-react'

const categories = ['全部', '品牌设计', '平面设计', '海报设计', '网页设计']

export const metadata: Metadata = {
  title: '作品集 - 郑权威 | 平面设计师作品展示',
  description: '浏览郑权威的设计作品集，包括品牌设计、平面设计、海报设计等多个领域的创意项目。每个作品都体现了专业的设计技能和创新思维。',
  keywords: '作品集,平面设计作品,品牌设计,海报设计,创意设计,视觉设计,郑权威',
  openGraph: {
    title: '郑权威的设计作品集',
    description: '专业平面设计师的创意作品展示',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: '郑权威设计作品集',
      },
    ],
  },
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProjects = selectedCategory === '全部' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              我的作品集
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              展示我在平面设计领域的创作成果，每个项目都体现了我对设计的热情和专业技能。
              从品牌识别到数字媒体，探索多样化的设计解决方案。
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-600">完成项目</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">30+</div>
                <div className="text-gray-600">满意客户</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
                <div className="text-gray-600">年经验</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">10+</div>
                <div className="text-gray-600">获奖作品</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding py-8 border-b border-gray-100">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4 md:mb-0">
              项目分类
            </h2>
            
            {/* Mobile Filter Toggle */}
            <button
              className="md:hidden btn-secondary flex items-center mb-4"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </button>
            
            {/* Filter Buttons */}
            <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden md:flex'}`}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="mb-8">
            <p className="text-gray-600">
              显示 {filteredProjects.length} 个项目
              {selectedCategory !== '全部' && ` · ${selectedCategory}`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Filter className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                暂无相关项目
              </h3>
              <p className="text-gray-600">
                该分类下暂时没有项目，请尝试其他分类或查看全部项目。
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              有项目想要合作？
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              我很乐意了解您的项目需求，让我们一起创造出色的设计作品。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                开始合作
              </a>
              <a href="mailto:hello@zhengquanwei.com" className="btn-secondary">
                发送邮件
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
