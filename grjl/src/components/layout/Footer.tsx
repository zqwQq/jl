import Link from 'next/link'
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from 'lucide-react'

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
]

const quickLinks = [
  { name: '首页', href: '/' },
  { name: '作品集', href: '/portfolio' },
  { name: '关于我', href: '/about' },
  { name: '博客', href: '/blog' },
  { name: '联系', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-gradient mb-4">
              郑权威
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              专业平面设计师，致力于创造有意义的视觉体验。通过设计传达品牌故事，为客户提供创新的设计解决方案。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">联系方式</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">hello@zhengquanwei.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">+86 138 0000 0000</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">中国 · 上海</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 郑权威. 保留所有权利.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              用心设计 · 用爱创造
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
