'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { personalInfo } from '@/data/mockData'

export const metadata: Metadata = {
  title: '联系我 - 郑权威 | 设计合作与咨询',
  description: '联系专业平面设计师郑权威，讨论您的设计项目需求。提供品牌设计、平面设计和数字媒体设计服务。',
  keywords: '联系方式,设计合作,项目咨询,平面设计师,设计服务,郑权威',
  openGraph: {
    title: '联系郑权威 - 设计合作咨询',
    description: '讨论您的设计项目需求，获取专业的设计服务',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face',
        width: 1200,
        height: 630,
        alt: '联系郑权威',
      },
    ],
  },
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            消息发送成功！
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            感谢您的联系，我会在24小时内回复您的消息。
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn-primary"
          >
            发送新消息
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              联系我
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              有项目想要合作？想要了解更多关于我的设计服务？
              或者只是想聊聊设计？我很乐意听到您的声音。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
                联系方式
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">邮箱</h3>
                    <p className="text-gray-600">{personalInfo.email}</p>
                    <p className="text-sm text-gray-500">我通常在24小时内回复邮件</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">电话</h3>
                    <p className="text-gray-600">{personalInfo.phone}</p>
                    <p className="text-sm text-gray-500">工作日 9:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">位置</h3>
                    <p className="text-gray-600">{personalInfo.location}</p>
                    <p className="text-sm text-gray-500">可安排面对面会议</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">工作时间</h3>
                    <p className="text-gray-600">周一至周五 9:00 - 18:00</p>
                    <p className="text-sm text-gray-500">周末可预约紧急项目</p>
                  </div>
                </div>
              </div>
              
              {/* Services */}
              <div className="card p-6">
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
                  我可以帮助您
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    品牌设计和视觉识别系统
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    平面设计和印刷品设计
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    数字媒体和网页设计
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    包装设计和产品视觉
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    设计咨询和创意指导
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
                发送消息
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="您的姓名"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    主题 *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="项目咨询 / 合作邀请 / 其他"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    消息 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="请详细描述您的项目需求或想要咨询的问题..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      发送中...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      发送消息
                    </>
                  )}
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  提交表单即表示您同意我联系您讨论您的项目需求。
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
