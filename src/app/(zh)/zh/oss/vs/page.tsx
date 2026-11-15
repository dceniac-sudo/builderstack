import { ossVsHubMetadata, renderOssVsHub } from '@/lib/oss-vs-pages';

export const metadata = ossVsHubMetadata('zh');

export default function OssVsHubZhPage() {
  return renderOssVsHub('zh');
}
