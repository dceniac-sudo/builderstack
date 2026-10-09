import { ossIndustriesMetadata, renderOssIndustries } from '@/lib/oss-pages';

export const metadata = ossIndustriesMetadata('en');

export default function OssIndustriesPageEn() {
  return renderOssIndustries('en');
}
