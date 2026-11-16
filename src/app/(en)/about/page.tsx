import { aboutMetadata, renderAboutPage } from '@/lib/about-page';

export const metadata = aboutMetadata('en');

export default function AboutEnPage() {
  return renderAboutPage('en');
}
