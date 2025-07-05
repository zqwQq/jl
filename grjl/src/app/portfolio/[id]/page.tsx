import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, Tag, ExternalLink, User } from 'lucide-react'
import { mockProjects } from '@/data/mockData'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = mockProjects.find(p => p.id === params.id)

  if (!project) {
    return {
      title: '项目未找到 - 郑权威',
      description: '您访问的项目不存在。',
    }
  }

  return {
    title: `${project.title} - 郑权威设计作品`,
    description: project.description,
    keywords: `${project.tags.join(',')},${project.category},平面设计,郑权威`,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: [
        {
          url: project.images[0],
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = mockProjects.find(p => p.id === params.id)
  
  if (!project) {
    notFound()
  }

  const relatedProjects = mockProjects
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回作品集
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                    精选作品
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                {project.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {project.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">完成时间</span>
                  </div>
                  <p className="font-semibold text-gray-900">{project.year}</p>
                </div>
                
                {project.client && (
                  <div>
                    <div className="flex items-center text-gray-500 mb-2">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">客户</span>
                    </div>
                    <p className="font-semibold text-gray-900">{project.client}</p>
                  </div>
                )}
              </div>
              
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center"
                >
                  查看项目
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
            
            <div className="relative">
              <Image
                src={project.images[0]}
                alt={project.title}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Images */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            项目展示
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((image, index) => (
              <div key={index} className="relative group">
                <Image
                  src={image}
                  alt={`${project.title} - 图片 ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                项目详情
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  这个项目展现了我在{project.category}领域的专业能力。通过深入了解客户需求和目标受众，
                  我创造了一个既美观又实用的设计解决方案。
                </p>
                
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                  设计挑战
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  在这个项目中，主要挑战是如何在保持品牌一致性的同时，创造出独特且令人印象深刻的视觉体验。
                  我需要平衡美学与功能性，确保设计不仅好看，更要有效传达品牌信息。
                </p>
                
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                  解决方案
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  通过深入的市场研究和用户分析，我开发了一套完整的视觉语言系统。
                  运用现代设计原则，结合品牌特色，最终创造出了这个成功的设计作品。
                </p>
                
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                  项目成果
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  项目完成后，客户对结果非常满意。设计不仅提升了品牌形象，
                  还有效增强了用户参与度和品牌认知度。这个项目也成为了我作品集中的重要组成部分。
                </p>
              </div>
            </div>
            
            <div>
              <div className="card p-6 mb-8">
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
                  项目标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
                  项目信息
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">分类</span>
                    <p className="font-medium text-gray-900">{project.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">完成年份</span>
                    <p className="font-medium text-gray-900">{project.year}</p>
                  </div>
                  {project.client && (
                    <div>
                      <span className="text-sm text-gray-500">客户</span>
                      <p className="font-medium text-gray-900">{project.client}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500">创建日期</span>
                    <p className="font-medium text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
              相关项目
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/portfolio/${relatedProject.id}`}
                  className="card group hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={relatedProject.images[0]}
                      alt={relatedProject.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedProject.description}
                    </p>
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
