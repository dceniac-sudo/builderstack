import { ossProjectMetadata, ossProjectParams, renderOssProject } from '@/lib/oss-pages';

export const generateStaticParams = ossProjectParams;

export function generateMetadata({ params }: { params: { industry: string; id: string } }) {
  return ossProjectMetadata('en', params.industry, params.id);
}

export default function OssProjectPageEn({ params }: { params: { industry: string; id: string } }) {
  return renderOssProject('en', params.industry, params.id);
}
