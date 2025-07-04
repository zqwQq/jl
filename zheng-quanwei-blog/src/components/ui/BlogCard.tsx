import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { Calendar, Clock, Tag } from 'lucide-react'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className={`card group hover:shadow-lg transition-all duration-300 ${
      featured ? 'md:col-span-2 lg:col-span-2' : ''
    }`}>
      <Link href={`/blog/${post.id}`}>
        {post.coverImage && (
          <div className="relative overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={featured ? 800 : 400}
              height={featured ? 400 : 250}
              className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  精选文章
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime} 分钟阅读
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 3} 更多
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              作者: {post.author}
            </span>
            <span className="text-primary-600 text-sm font-medium group-hover:text-primary-700">
              阅读更多 →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
