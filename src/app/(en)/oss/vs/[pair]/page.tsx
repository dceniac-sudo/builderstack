import { ossVsPairMetadata, ossVsParams, renderOssVsPair } from '@/lib/oss-vs-pages';

export const generateStaticParams = ossVsParams;

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }) {
  return ossVsPairMetadata('en', (await params).pair);
}

export default async function OssVsPairEnPage({ params }: { params: Promise<{ pair: string }> }) {
  return renderOssVsPair('en', (await params).pair);
}
