import { renderOssHome } from '@/lib/oss-pages';

// The home page is the open-source finder: pick an industry, or browse every project.
export default function HomePage() {
  return renderOssHome('en');
}
