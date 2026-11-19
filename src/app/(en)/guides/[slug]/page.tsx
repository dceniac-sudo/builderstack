import { guideArticleMetadata, guideParams, renderGuideArticle } from '@/lib/guide-pages';

export const generateStaticParams = guideParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return guideArticleMetadata('en', (await params).slug);
}

export default async function GuideArticleEnPage({ params }: { params: Promise<{ slug: string }> }) {
  return renderGuideArticle('en', (await params).slug);
}
