'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import BlogCard from '@/components/ui/BlogCard'
import { mockBlogPosts } from '@/data/mockData'
import { Search, Filter, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: '设计博客 - 郑权威 | 设计见解与创作分享',
  description: '阅读郑权威的设计博客，获取最新的设计趋势、创作技巧和行业见解。分享设计路上的思考和发现。',
  keywords: '设计博客,设计见解,创作分享,设计趋势,设计技巧,平面设计,郑权威',
  openGraph: {
    title: '郑权威的设计博客',
    description: '分享设计见解、创作过程和行业趋势',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: '设计博客',
      },
    ],
  },
}

const tags = ['全部', '设计趋势', '品牌设计', '设计技巧', '创意灵感', '色彩理论']

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesTag = selectedTag === '全部' || post.tags.includes(selectedTag)
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  const featuredPost = mockBlogPosts.find(post => post.featured)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              设计博客
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              分享我的设计见解、创作过程和行业趋势。在这里，我会记录设计路上的思考和发现，
              希望能为同行和设计爱好者提供一些有价值的内容。
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding py-12">
          <div className="container-max">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-2">
                精选文章
              </h2>
              <p className="text-gray-600">不容错过的精彩内容</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <BlogCard post={featuredPost} featured={true} />
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="section-padding py-8 border-b border-gray-100">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4 md:mb-0">
              文章分类
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
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedTag === tag
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="mb-8">
            <p className="text-gray-600">
              显示 {filteredPosts.length} 篇文章
              {selectedTag !== '全部' && ` · ${selectedTag}`}
              {searchQuery && ` · 搜索: "${searchQuery}"`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                没有找到相关文章
              </h3>
              <p className="text-gray-600 mb-4">
                尝试调整搜索关键词或选择其他分类标签。
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedTag('全部')
                }}
                className="btn-primary"
              >
                清除筛选条件
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              订阅我的设计见解
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              获取最新的设计文章、创作技巧和行业趋势，直接发送到您的邮箱。
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="输入您的邮箱地址"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                订阅更新
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              我承诺不会发送垃圾邮件，您可以随时取消订阅。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
