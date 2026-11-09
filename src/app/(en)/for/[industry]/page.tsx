import { ossIndustryMetadata, ossIndustryParams, renderOssIndustry } from '@/lib/oss-pages';

export const generateStaticParams = ossIndustryParams;

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  return ossIndustryMetadata('en', (await params).industry);
}

export default async function OssIndustryPageEn({ params }: { params: Promise<{ industry: string }> }) {
  return renderOssIndustry('en', (await params).industry);
}
