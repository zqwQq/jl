'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Send, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Building,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

// 表单验证模式
const contactFormSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符').max(50, '姓名不能超过50个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, '请选择项目类型'),
  budget: z.string().min(1, '请选择预算范围'),
  timeline: z.string().min(1, '请选择项目时间'),
  message: z.string().min(10, '项目描述至少需要10个字符').max(1000, '项目描述不能超过1000个字符'),
  agreement: z.boolean().refine(val => val === true, '请同意服务条款')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// 项目类型选项
const projectTypes = [
  { value: 'brand-design', label: '品牌设计', icon: Building },
  { value: 'ui-ux-design', label: 'UI/UX设计', icon: MessageSquare },
  { value: 'ecommerce-design', label: '电商设计', icon: DollarSign },
  { value: 'print-design', label: '印刷设计', icon: User },
  { value: 'other', label: '其他项目', icon: MessageSquare }
];

// 预算范围选项
const budgetRanges = [
  { value: '5k-10k', label: '5千-1万' },
  { value: '10k-20k', label: '1万-2万' },
  { value: '20k-50k', label: '2万-5万' },
  { value: '50k+', label: '5万以上' },
  { value: 'discuss', label: '面议' }
];

// 项目时间选项
const timelineOptions = [
  { value: '1-2weeks', label: '1-2周' },
  { value: '2-4weeks', label: '2-4周' },
  { value: '1-2months', label: '1-2个月' },
  { value: '2-3months', label: '2-3个月' },
  { value: 'flexible', label: '时间灵活' }
];

/**
 * 联系表单组件
 */
export function ContactFormSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      agreement: false
    }
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 这里应该调用实际的API
      console.log('Form data:', data);
      
      setSubmitSuccess(true);
      toast.success('消息发送成功！我会尽快回复您。');
      reset();
      
      // 3秒后重置成功状态
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      toast.error('发送失败，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div ref={sectionRef}>
        <Card className="text-center py-12">
          <div
            className={cn(
              'space-y-6 transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                消息发送成功！
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                感谢您的联系，我已收到您的消息，会在24小时内回复您。
              </p>
              <Button
                onClick={() => setSubmitSuccess(false)}
                variant="outline"
              >
                发送新消息
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      <Card
        className={cn(
          'transition-all duration-1000 ease-out',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              项目咨询表单
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              请详细填写您的项目需求，我会根据您的信息为您提供专业的建议和报价。
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 基本信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <User size={16} className="inline mr-2" />
                  姓名 *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="请输入您的姓名"
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                    errors.name ? 'border-red-300 dark:border-red-600' : 'border-neutral-300 dark:border-neutral-600'
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  邮箱 *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="请输入您的邮箱"
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                    errors.email ? 'border-red-300 dark:border-red-600' : 'border-neutral-300 dark:border-neutral-600'
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  电话 (可选)
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="请输入您的电话"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Building size={16} className="inline mr-2" />
                  公司 (可选)
                </label>
                <input
                  {...register('company')}
                  type="text"
                  placeholder="请输入您的公司名称"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* 项目信息 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                项目类型 *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.value}
                      className={cn(
                        'flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600',
                        watch('projectType') === type.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-neutral-300 dark:border-neutral-600'
                      )}
                    >
                      <input
                        {...register('projectType')}
                        type="radio"
                        value={type.value}
                        className="sr-only"
                      />
                      <Icon size={20} className="mr-3 text-primary-600 dark:text-primary-400" />
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {type.label}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.projectType && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.projectType.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <DollarSign size={16} className="inline mr-2" />
                  预算范围 *
                </label>
                <select
                  {...register('budget')}
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                    errors.budget ? 'border-red-300 dark:border-red-600' : 'border-neutral-300 dark:border-neutral-600'
                  )}
                >
                  <option value="">请选择预算范围</option>
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.budget.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  项目时间 *
                </label>
                <select
                  {...register('timeline')}
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200',
                    errors.timeline ? 'border-red-300 dark:border-red-600' : 'border-neutral-300 dark:border-neutral-600'
                  )}
                >
                  <option value="">请选择项目时间</option>
                  {timelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.timeline && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.timeline.message}
                  </p>
                )}
              </div>
            </div>

            {/* 项目描述 */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <MessageSquare size={16} className="inline mr-2" />
                项目描述 *
              </label>
              <textarea
                {...register('message')}
                rows={6}
                placeholder="请详细描述您的项目需求、目标、风格偏好等信息..."
                className={cn(
                  'w-full px-4 py-3 border rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none',
                  errors.message ? 'border-red-300 dark:border-red-600' : 'border-neutral-300 dark:border-neutral-600'
                )}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* 服务条款 */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...register('agreement')}
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 dark:border-neutral-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  我已阅读并同意
                  <a href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline mx-1">
                    服务条款
                  </a>
                  和
                  <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline mx-1">
                    隐私政策
                  </a>
                </span>
              </label>
              {errors.agreement && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.agreement.message}
                </p>
              )}
            </div>

            {/* 提交按钮 */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  发送中...
                </>
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  发送消息
                </>
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
