import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: '郑权威 - 平面设计师 | Zheng Quanwei - Graphic Designer',
  description: '郑权威的个人作品集和设计博客，展示创意设计作品和设计见解。',
  keywords: '平面设计,设计师,作品集,创意设计,视觉设计,郑权威',
  authors: [{ name: '郑权威', url: 'https://zhengquanwei.com' }],
  openGraph: {
    title: '郑权威 - 平面设计师',
    description: '展示创意设计作品和设计见解',
    type: 'website',
    locale: 'zh_CN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
