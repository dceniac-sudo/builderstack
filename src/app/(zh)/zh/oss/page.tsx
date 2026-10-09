import { ossIndustriesMetadata, renderOssIndustries } from '@/lib/oss-pages';

export const metadata = ossIndustriesMetadata('zh');

export default function OssIndustriesPageZh() {
  return renderOssIndustries('zh');
}
