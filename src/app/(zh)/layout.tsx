import type { Metadata } from 'next';
import '../globals.css';
import { RootShell } from '@/components/RootShell';
import { pageMetadata } from '@/lib/site-meta';

export const metadata: Metadata = pageMetadata('zh', '/');

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="zh">{children}</RootShell>;
}
