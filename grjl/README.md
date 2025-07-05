# 郑权威个人博客网站

这是一个为平面设计师郑权威打造的现代化个人博客和作品集网站。

## 功能特性

- 🎨 **现代化设计**: 简洁专业的界面设计，适合创意专业人士
- 📱 **响应式布局**: 完美适配桌面端和移动端设备
- 🖼️ **作品集展示**: 优雅的项目展示和详情页面
- 📝 **博客系统**: 支持文章发布和分类管理
- 🏷️ **标签系统**: 便于内容分类和搜索
- 📧 **联系表单**: 内置联系表单，方便客户沟通
- ⚡ **性能优化**: 基于Next.js构建，具有出色的性能表现

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **动画**: Framer Motion
- **字体**: Inter + Playfair Display

## 页面结构

- **首页** (`/`): 个人介绍和精选作品展示
- **作品集** (`/portfolio`): 完整的项目展示页面
- **关于我** (`/about`): 个人背景、技能和经历
- **博客** (`/blog`): 文章列表和搜索功能
- **联系** (`/contact`): 联系信息和表单

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
npm start
```

## 自定义指南

### 1. 个人信息修改

编辑 `src/data/mockData.ts` 文件中的 `personalInfo` 对象：

```typescript
export const personalInfo: PersonalInfo = {
  name: '您的姓名',
  title: '您的职位',
  bio: '您的个人简介',
  email: 'your@email.com',
  // ... 其他信息
}
```

### 2. 添加作品项目

在 `src/data/mockData.ts` 文件中的 `mockProjects` 数组中添加新项目：

```typescript
{
  id: 'unique-id',
  title: '项目标题',
  description: '项目描述',
  category: '项目分类',
  tags: ['标签1', '标签2'],
  images: ['图片URL1', '图片URL2'],
  featured: true, // 是否为精选项目
  year: 2024,
  client: '客户名称',
  createdAt: '2024-01-01'
}
```

### 3. 发布博客文章

在 `src/data/mockData.ts` 文件中的 `mockBlogPosts` 数组中添加新文章：

```typescript
{
  id: 'unique-id',
  title: '文章标题',
  excerpt: '文章摘要',
  content: '文章内容',
  author: '作者姓名',
  publishedAt: '2024-01-01',
  tags: ['标签1', '标签2'],
  featured: true,
  coverImage: '封面图片URL',
  readTime: 5
}
```

### 4. 修改样式和颜色

主要的样式配置在 `tailwind.config.ts` 文件中。您可以修改：

- 主色调 (`primary` 颜色)
- 字体配置
- 动画效果
- 其他设计令牌

### 5. 添加新页面

在 `src/app` 目录下创建新的文件夹和 `page.tsx` 文件即可添加新页面。

## 性能优化

### 图片优化
- 使用 Next.js Image 组件自动优化图片
- 建议使用 WebP 格式的图片
- 为图片添加适当的 alt 属性

### SEO 优化
- 每个页面都配置了适当的元数据
- 使用语义化的 HTML 结构
- 添加了 Open Graph 标签

### 性能监控
```bash
# 分析打包大小
npm run build
npx @next/bundle-analyzer

# 性能审计
npm install -g lighthouse
lighthouse http://localhost:3000
```

## 最佳实践

### 代码规范
- 使用 TypeScript 确保类型安全
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码

### 组件设计
- 组件职责单一
- 使用 TypeScript 接口定义 props
- 合理使用 React Hooks

### 样式管理
- 使用 Tailwind CSS 实用类
- 避免内联样式
- 保持设计系统一致性

## 部署

### Vercel (推荐)

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 上导入项目
3. 配置环境变量（如果需要）
4. 自动部署完成

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/zheng-quanwei-blog)

### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令: `npm run build`
3. 设置发布目录: `.next`
4. 部署完成

### 自托管

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

### Docker 部署

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### 其他平台

项目支持部署到任何支持 Next.js 的平台，如：
- AWS Amplify
- Railway
- DigitalOcean App Platform
- Heroku

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系：
- 邮箱: hello@zhengquanwei.com
- 网站: https://zhengquanwei.com

---

用心设计 · 用爱创造
