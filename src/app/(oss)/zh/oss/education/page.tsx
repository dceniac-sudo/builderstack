import { notFound } from 'next/navigation';
import { OssIndustryPage } from '@/components/OssIndustryPage';
import { OSS_INDUSTRIES, OSS_USES, ossProjectsOf } from '@/data/oss';
import { pageMetadata } from '@/lib/site-meta';

const industry = OSS_INDUSTRIES.education;

export const metadata = pageMetadata('zh', '/oss/education/', {
  title: industry.title,
  description: industry.description,
  zhOnly: true,
});

// 一条确认过的项目都没有时，线上不出这一页
export default function OssEducationPage() {
  const projects = ossProjectsOf('education');
  if (projects.length === 0) notFound();
  return (
    <OssIndustryPage path="/zh/oss/education/" label={industry.label} title={industry.title} tagline={industry.tagline} uses={OSS_USES} projects={projects} />
  );
}
