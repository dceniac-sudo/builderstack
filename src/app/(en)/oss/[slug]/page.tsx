import { ossSlugMetadata, ossSlugParams, renderOssSlug } from '@/lib/oss-pages';

// /oss/<id>/ 是用途页（比如 /oss/lms/）或者项目页（比如 /oss/moodle/）
export const generateStaticParams = ossSlugParams;

export function generateMetadata({ params }: { params: { slug: string } }) {
  return ossSlugMetadata('en', params.slug);
}

export default function OssSlugPageEn({ params }: { params: { slug: string } }) {
  return renderOssSlug('en', params.slug);
}
