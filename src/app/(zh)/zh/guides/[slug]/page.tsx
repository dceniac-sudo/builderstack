import { guideArticleMetadata, guideParams, renderGuideArticle } from '@/lib/guide-pages';

export const generateStaticParams = guideParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return guideArticleMetadata('zh', (await params).slug);
}

export default async function GuideArticleZhPage({ params }: { params: Promise<{ slug: string }> }) {
  return renderGuideArticle('zh', (await params).slug);
}
