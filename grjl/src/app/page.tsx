import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Eye, Heart, Star } from 'lucide-react'
import ProjectCard from '@/components/ui/ProjectCard'
import BlogCard from '@/components/ui/BlogCard'
import { FadeInSection, SlideInFromLeft, SlideInFromRight, StaggerContainer, StaggerItem } from '@/components/ui/PageTransition'
import { mockProjects, mockBlogPosts } from '@/data/mockData'

export default function Home() {
  const featuredProjects = mockProjects.filter(project => project.featured).slice(0, 3)
  const featuredPosts = mockBlogPosts.filter(post => post.featured).slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideInFromLeft>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
                你好，我是
                <span className="text-gradient block">郑权威</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                一名充满热情的平面设计师，专注于创造有意义的视觉体验。
                通过设计传达品牌故事，为客户提供创新的设计解决方案。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/portfolio" className="btn-primary inline-flex items-center justify-center">
                  查看作品集
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn-secondary inline-flex items-center justify-center">
                  联系我
                  <Download className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </SlideInFromLeft>

            <SlideInFromRight delay={0.2}>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face"
                  alt="郑权威"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">50+</div>
                      <div className="text-sm text-gray-600">项目完成</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">5+</div>
                      <div className="text-sm text-gray-600">年经验</div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideInFromRight>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-max">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              精选作品
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              展示我最引以为豪的设计项目，每个作品都承载着独特的创意理念和精心的执行过程。
            </p>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="text-center">
            <Link href="/portfolio" className="btn-primary inline-flex items-center">
              查看全部作品
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              设计服务
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              提供全方位的视觉设计服务，从品牌识别到数字媒体，满足您的各种设计需求。
            </p>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye className="h-8 w-8" />,
                title: '品牌设计',
                description: 'Logo设计、VI系统、品牌指南等完整的品牌视觉识别体系。'
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: '平面设计',
                description: '海报、宣传册、包装设计等各类平面媒体的创意设计。'
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: '数字设计',
                description: '网页设计、UI/UX设计、社交媒体视觉等数字化设计服务。'
              }
            ].map((service, index) => (
              <StaggerItem key={index}>
                <div className="card p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div className="text-primary-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section-padding">
        <div className="container-max">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              最新文章
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              分享设计见解、创作过程和行业趋势，与您一起探索设计的无限可能。
            </p>
          </FadeInSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map((post) => (
              <StaggerItem key={post.id}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <div className="text-center">
            <Link href="/blog" className="btn-primary inline-flex items-center">
              查看全部文章
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
