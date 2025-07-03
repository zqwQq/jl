'use client';

import * as React from 'react';
import Image from 'next/image';
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  Shield,
  CheckCircle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, Card } from '@/components/layout/layout';
import { cn } from '@/lib/utils';
import { certificates } from '@/data/experience';

/**
 * 证书卡片组件
 */
interface CertificateCardProps {
  certificate: typeof certificates[0];
  index: number;
  isVisible: boolean;
}

function CertificateCard({ certificate, index, isVisible }: CertificateCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const isExpired = certificate.expiryDate && new Date(certificate.expiryDate) < new Date();

  return (
    <Card
      hover
      className={cn(
        'group transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="space-y-4">
        {/* 证书图片 */}
        {certificate.image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={certificate.image}
              alt={certificate.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* 状态标识 */}
            <div className="absolute top-2 right-2">
              {isExpired ? (
                <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  已过期
                </div>
              ) : (
                <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1">
                  <CheckCircle size={12} />
                  <span>有效</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 证书信息 */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {certificate.name}
            </h3>
            <div className="text-primary-600 dark:text-primary-400 font-medium">
              {certificate.issuer}
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>获得时间：{formatDate(certificate.issueDate)}</span>
            </div>
            {certificate.expiryDate && (
              <div className="flex items-center space-x-1">
                <Shield size={14} />
                <span>有效期至：{formatDate(certificate.expiryDate)}</span>
              </div>
            )}
          </div>

          {certificate.credentialId && (
            <div className="text-xs text-neutral-500 dark:text-neutral-500 font-mono">
              证书编号：{certificate.credentialId}
            </div>
          )}

          {certificate.credentialUrl && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full group-hover:border-primary-300 group-hover:text-primary-600 dark:group-hover:border-primary-600 dark:group-hover:text-primary-400"
            >
              <a 
                href={certificate.credentialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} className="mr-2" />
                验证证书
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

/**
 * 证书和认证区域组件
 */
export function CertificatesSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

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

  // 统计数据
  const validCertificates = certificates.filter(cert => 
    !cert.expiryDate || new Date(cert.expiryDate) >= new Date()
  );

  const expiredCertificates = certificates.filter(cert => 
    cert.expiryDate && new Date(cert.expiryDate) < new Date()
  );

  return (
    <Section 
      ref={sectionRef}
      id="certificates"
      title="证书认证"
      subtitle="Certificates & Certifications"
      description="通过专业认证展示我的技能水平和持续学习能力"
      background="muted"
    >
      <div className="space-y-12">
        {/* 认证概览 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {certificates.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    总证书数
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {validCertificates.length}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    有效证书
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    权威
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    认证机构
                  </div>
                </div>
              </div>
            </Card>

            <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    100%
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    通过率
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 证书网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* 认证价值说明 */}
        <div
          className={cn(
            'transition-all duration-1000 ease-out delay-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-primary-200 dark:border-primary-800">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto">
                <Award size={32} className="text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  专业认证的价值
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      技能验证
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      通过权威机构认证，证明我的专业技能达到行业标准
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      持续学习
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      定期更新认证，保持对新技术和趋势的敏感度
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      专业信誉
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      建立客户信任，提供专业服务质量的保障
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
