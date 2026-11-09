import { ossSlugMetadata, ossSlugParams, renderOssSlug } from '@/lib/oss-pages';

// /oss/<id>/ 是用途页（比如 /oss/lms/）或者项目页（比如 /oss/moodle/）
export const generateStaticParams = ossSlugParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return ossSlugMetadata('zh', (await params).slug);
}

export default async function OssSlugPageZh({ params }: { params: Promise<{ slug: string }> }) {
  return renderOssSlug('zh', (await params).slug);
}
