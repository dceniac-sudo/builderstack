import { ossVsPairMetadata, ossVsParams, renderOssVsPair } from '@/lib/oss-vs-pages';

export const generateStaticParams = ossVsParams;

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }) {
  return ossVsPairMetadata('zh', (await params).pair);
}

export default async function OssVsPairZhPage({ params }: { params: Promise<{ pair: string }> }) {
  return renderOssVsPair('zh', (await params).pair);
}
