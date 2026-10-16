import { ossIndustryMetadata, ossIndustryParams, renderOssIndustry } from '@/lib/oss-pages';

export const generateStaticParams = ossIndustryParams;

export function generateMetadata({ params }: { params: { industry: string } }) {
  return ossIndustryMetadata('zh', params.industry);
}

export default function OssIndustryPageZh({ params }: { params: { industry: string } }) {
  return renderOssIndustry('zh', params.industry);
}
