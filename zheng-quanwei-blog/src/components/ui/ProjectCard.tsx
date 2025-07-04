import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types'
import { Calendar, Tag } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <div className={`card group hover:shadow-lg transition-all duration-300 ${
      featured ? 'md:col-span-2 lg:col-span-2' : ''
    }`}>
      <Link href={`/portfolio/${project.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            width={featured ? 800 : 400}
            height={featured ? 500 : 300}
            className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                精选作品
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
              {project.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {project.year}
            </div>
          </div>
          
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
            {project.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {project.client && (
            <p className="text-sm text-gray-500 mb-3">
              客户: {project.client}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{project.tags.length - 3} 更多
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
