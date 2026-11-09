import { ossIndustryMetadata, ossIndustryParams, renderOssIndustry } from '@/lib/oss-pages';

export const generateStaticParams = ossIndustryParams;

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  return ossIndustryMetadata('zh', (await params).industry);
}

export default async function OssIndustryPageZh({ params }: { params: Promise<{ industry: string }> }) {
  return renderOssIndustry('zh', (await params).industry);
}
