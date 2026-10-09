import { renderOssHome } from '@/lib/oss-pages';

// 首页就是“按行业找开源项目”：先选行业，或者直接在全部项目里找。
export default function HomePageZh() {
  return renderOssHome('zh');
}
