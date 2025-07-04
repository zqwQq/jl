import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout, PageContainer } from '@/components/layout/layout';
import { BlogPostHeader } from '@/components/sections/blog/blog-post-header';
import { BlogPostContent } from '@/components/sections/blog/blog-post-content';
import { BlogPostSidebar } from '@/components/sections/blog/blog-post-sidebar';
import { RelatedPostsSection } from '@/components/sections/blog/related-posts-section';
import { blogPosts } from '@/data/blog';
import { personalInfo } from '@/data/personal';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// 生成静态路径
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成页面元数据
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: '文章未找到',
      description: '抱歉，您访问的文章不存在。',
    };
  }

  return {
    title: `${post.title} - ${personalInfo.chineseName}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

/**
 * 博客文章详情页面
 */
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <PageContainer className="space-y-12 lg:space-y-16">
        {/* 文章头部 */}
        <BlogPostHeader post={post} />
        
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 文章内容 */}
          <div className="lg:col-span-3">
            <BlogPostContent post={post} />
          </div>
          
          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <BlogPostSidebar post={post} />
          </div>
        </div>
        
        {/* 相关文章 */}
        <RelatedPostsSection postId={post.id} />
      </PageContainer>
    </Layout>
  );
}
