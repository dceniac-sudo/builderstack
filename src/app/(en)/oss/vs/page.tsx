import { ossVsHubMetadata, renderOssVsHub } from '@/lib/oss-vs-pages';

export const metadata = ossVsHubMetadata('en');

export default function OssVsHubEnPage() {
  return renderOssVsHub('en');
}
