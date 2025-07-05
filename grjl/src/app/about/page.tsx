import Image from 'next/image'
import type { Metadata } from 'next'
import { Download, Mail, MapPin, Calendar, Award, Users, Coffee } from 'lucide-react'
import { personalInfo, skills, experiences } from '@/data/mockData'

export const metadata: Metadata = {
  title: '关于我 - 郑权威 | 专业平面设计师简介',
  description: '了解郑权威的设计背景、专业技能和工作经历。5年以上设计经验，专注于品牌设计、平面设计和数字媒体设计。',
  keywords: '关于我,设计师简介,专业技能,工作经历,平面设计师,郑权威',
  openGraph: {
    title: '关于郑权威 - 专业平面设计师',
    description: '了解我的设计背景、专业技能和创作理念',
    type: 'profile',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face',
        width: 1200,
        height: 630,
        alt: '郑权威 - 平面设计师',
      },
    ],
  },
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                关于我
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {personalInfo.bio}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-3 text-primary-600" />
                  {personalInfo.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-primary-600" />
                  {personalInfo.location}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary inline-flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" />
                  下载简历
                </button>
                <a href="/contact" className="btn-secondary inline-flex items-center justify-center">
                  联系我
                </a>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-gray-900">10+</div>
                    <div className="text-sm text-gray-600">获奖作品</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-primary-600" />
                  <div>
                    <div className="font-semibold text-gray-900">30+</div>
                    <div className="text-sm text-gray-600">满意客户</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              专业技能
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              多年的设计经验让我掌握了各种设计工具和技能，能够为客户提供全方位的设计服务。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Design Skills */}
            <div className="card p-8">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                设计技能
              </h3>
              <div className="space-y-4">
                {skills.filter(skill => skill.category === 'design').map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Software Skills */}
            <div className="card p-8">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                软件技能
              </h3>
              <div className="space-y-4">
                {skills.filter(skill => skill.category === 'software').map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              工作经历
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我的职业发展历程，从初级设计师到资深设计师的成长轨迹。
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200" />
              
              {experiences.map((exp, index) => (
                <div key={exp.id} className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-primary-600 rounded-full border-4 border-white shadow" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <div className="card p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-serif font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        {exp.current && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            当前职位
                          </span>
                        )}
                      </div>
                      <p className="text-primary-600 font-medium mb-2">{exp.company}</p>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        {exp.startDate} - {exp.endDate || '至今'}
                      </div>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              有趣的事实
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              了解更多关于我的有趣信息和工作习惯。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-primary-600 mb-4">
                <Coffee className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                咖啡爱好者
              </h3>
              <p className="text-gray-600">
                每天至少3杯咖啡，最佳创作时间是清晨配一杯手冲咖啡。
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary-600 mb-4">
                <Award className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                获奖经历
              </h3>
              <p className="text-gray-600">
                作品曾获得多个设计奖项，包括红点设计奖和IF设计奖。
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-primary-600 mb-4">
                <Users className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                团队合作
              </h3>
              <p className="text-gray-600">
                喜欢与不同背景的团队成员合作，相信多元化能激发更好的创意。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
