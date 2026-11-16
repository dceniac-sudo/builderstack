import { aboutMetadata, renderAboutPage } from '@/lib/about-page';

export const metadata = aboutMetadata('zh');

export default function AboutZhPage() {
  return renderAboutPage('zh');
}
