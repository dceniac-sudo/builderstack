import { guidesHubMetadata, renderGuidesHub } from '@/lib/guide-pages';

export const metadata = guidesHubMetadata('zh');

export default function GuidesZhPage() {
  return renderGuidesHub('zh');
}
