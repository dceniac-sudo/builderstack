import { ossSlugMetadata, ossSlugParams, renderOssSlug } from '@/lib/oss-pages';

// /oss/<id>/ 是用途页（比如 /oss/lms/）或者项目页（比如 /oss/moodle/）
export const generateStaticParams = ossSlugParams;

export function generateMetadata({ params }: { params: { slug: string } }) {
  return ossSlugMetadata('zh', params.slug);
}

export default function OssSlugPageZh({ params }: { params: { slug: string } }) {
  return renderOssSlug('zh', params.slug);
}
