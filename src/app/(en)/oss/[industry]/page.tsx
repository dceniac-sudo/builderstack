import { ossIndustryMetadata, ossIndustryParams, renderOssIndustry } from '@/lib/oss-pages';

export const generateStaticParams = ossIndustryParams;

export function generateMetadata({ params }: { params: { industry: string } }) {
  return ossIndustryMetadata('en', params.industry);
}

export default function OssIndustryPageEn({ params }: { params: { industry: string } }) {
  return renderOssIndustry('en', params.industry);
}
