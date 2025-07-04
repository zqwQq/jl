'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以在这里记录错误到错误报告服务
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-red-500 mb-6">
            <AlertTriangle className="h-24 w-24 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            出现了一些问题
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            抱歉，页面加载时遇到了错误。这可能是临时问题，请尝试刷新页面。
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button 
            onClick={reset}
            className="btn-primary inline-flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            重试
          </button>
          
          <Link 
            href="/" 
            className="btn-secondary inline-flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            返回首页
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-serif font-semibold text-gray-900 mb-4">
            如果问题持续存在
          </h3>
          <div className="text-gray-600 space-y-2">
            <p>请尝试以下解决方案：</p>
            <ul className="text-left space-y-1 max-w-md mx-auto">
              <li>• 刷新浏览器页面</li>
              <li>• 清除浏览器缓存</li>
              <li>• 检查网络连接</li>
              <li>• 稍后再试</li>
            </ul>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              如果问题仍然存在，请联系我：
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <Mail className="mr-2 h-4 w-4" />
              发送错误报告
            </Link>
          </div>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h4 className="font-semibold text-red-800 mb-2">开发模式 - 错误详情：</h4>
            <pre className="text-sm text-red-700 overflow-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                错误ID: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
