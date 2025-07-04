import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock, Tag, User, Share2 } from 'lucide-react'
import { mockBlogPosts } from '@/data/mockData'

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = mockBlogPosts.find(p => p.id === params.id)

  if (!post) {
    return {
      title: '文章未找到 - 郑权威设计博客',
      description: '您访问的文章不存在。',
    }
  }

  return {
    title: `${post.title} - 郑权威设计博客`,
    description: post.excerpt,
    keywords: `${post.tags.join(',')},设计博客,郑权威`,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = mockBlogPosts.find(p => p.id === params.id)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = mockBlogPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 模拟文章内容
  const articleContent = `
    <p>在快速变化的设计世界中，保持对最新趋势的敏感度是每个设计师必备的技能。2024年，我们看到了许多令人兴奋的设计趋势正在塑造着视觉传达的未来。</p>
    
    <h2>1. 极简主义的回归</h2>
    <p>极简主义设计继续占据主导地位，但2024年的极简主义更加注重功能性和用户体验。设计师们开始追求"有意义的简洁"，每个元素都有其存在的理由。</p>
    
    <h2>2. 大胆的色彩搭配</h2>
    <p>2024年，我们看到设计师们更加勇敢地使用鲜艳和对比强烈的色彩。这种趋势反映了人们对积极、乐观情绪的渴望。</p>
    
    <h2>3. 可持续设计理念</h2>
    <p>环保意识的提升推动了可持续设计的发展。设计师们开始考虑设计对环境的影响，选择更环保的材料和生产方式。</p>
    
    <h2>4. 人工智能辅助设计</h2>
    <p>AI工具正在改变设计师的工作方式，但人类的创意和判断力仍然是不可替代的。关键是学会如何有效地利用这些工具。</p>
    
    <h2>结语</h2>
    <p>设计趋势虽然重要，但更重要的是理解这些趋势背后的原因，并将其适当地应用到自己的设计实践中。记住，最好的设计总是能够有效传达信息并解决实际问题的设计。</p>
  `

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回博客
          </Link>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              {post.featured && (
                <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
                  精选文章
                </span>
              )}
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} 分钟阅读
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-600">作者: {post.author}</span>
              </div>
              <button className="flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200">
                <Share2 className="h-4 w-4 mr-1" />
                分享文章
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.coverImage && (
        <section className="section-padding py-0">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="prose prose-lg max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: articleContent }}
                    className="text-gray-700 leading-relaxed"
                  />
                </article>
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
                    文章标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Author Info */}
                <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                      alt={post.author}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="text-lg font-serif font-semibold text-gray-900 mb-2">
                        关于作者
                      </h4>
                      <p className="text-gray-600 mb-3">
                        {post.author}是一名专业的平面设计师，拥有5年以上的设计经验。
                        专注于品牌设计、平面设计和数字媒体设计，致力于为客户创造有意义且具有影响力的视觉体验。
                      </p>
                      <Link 
                        href="/about" 
                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                      >
                        了解更多 →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Article Info */}
                  <div className="card p-6">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
                      文章信息
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">发布时间</span>
                        <p className="font-medium text-gray-900">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">阅读时间</span>
                        <p className="font-medium text-gray-900">{post.readTime} 分钟</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">作者</span>
                        <p className="font-medium text-gray-900">{post.author}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Share */}
                  <div className="card p-6">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
                      分享文章
                    </h3>
                    <div className="space-y-2">
                      <button className="w-full btn-secondary text-left">
                        分享到微信
                      </button>
                      <button className="w-full btn-secondary text-left">
                        分享到微博
                      </button>
                      <button className="w-full btn-secondary text-left">
                        复制链接
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-max">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
              相关文章
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="card group hover:shadow-lg transition-all duration-300"
                >
                  {relatedPost.coverImage && (
                    <div className="relative overflow-hidden">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(relatedPost.publishedAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
