import { HomeContent } from '@/components/HomeContent';
import { ossProjectsOf } from '@/data/oss';

export default function HomePageZh() {
  return <HomeContent ossCount={ossProjectsOf('education').length} />;
}
