import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            页面未找到
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/" 
            className="btn-primary inline-flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            返回首页
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回上页
          </button>
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
            您可能在寻找：
          </h3>
          <div className="space-y-2 text-left">
            <Link 
              href="/portfolio" 
              className="block text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              → 查看我的作品集
            </Link>
            <Link 
              href="/blog" 
              className="block text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              → 阅读设计博客
            </Link>
            <Link 
              href="/about" 
              className="block text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              → 了解更多关于我
            </Link>
            <Link 
              href="/contact" 
              className="block text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              → 联系我
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          如果您认为这是一个错误，请
          <Link 
            href="/contact" 
            className="text-primary-600 hover:text-primary-700 ml-1"
          >
            联系我
          </Link>
        </div>
      </div>
    </div>
  )
}
