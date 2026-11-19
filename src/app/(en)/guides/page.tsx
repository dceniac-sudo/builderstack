import { guidesHubMetadata, renderGuidesHub } from '@/lib/guide-pages';

export const metadata = guidesHubMetadata('en');

export default function GuidesEnPage() {
  return renderGuidesHub('en');
}
