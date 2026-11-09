import { ossSlugMetadata, ossSlugParams, renderOssSlug } from '@/lib/oss-pages';

// /oss/<id>/ 是用途页（比如 /oss/lms/）或者项目页（比如 /oss/moodle/）
export const generateStaticParams = ossSlugParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return ossSlugMetadata('en', (await params).slug);
}

export default async function OssSlugPageEn({ params }: { params: Promise<{ slug: string }> }) {
  return renderOssSlug('en', (await params).slug);
}
