import { ossProjectMetadata, ossProjectParams, renderOssProject } from '@/lib/oss-pages';

export const generateStaticParams = ossProjectParams;

export function generateMetadata({ params }: { params: { industry: string; id: string } }) {
  return ossProjectMetadata('zh', params.industry, params.id);
}

export default function OssProjectPageZh({ params }: { params: { industry: string; id: string } }) {
  return renderOssProject('zh', params.industry, params.id);
}
