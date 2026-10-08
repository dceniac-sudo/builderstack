import type { Metadata } from 'next';
import '../globals.css';
import { RootShell } from '@/components/RootShell';
import { pageMetadata } from '@/lib/site-meta';

export const metadata: Metadata = pageMetadata('en', '/');

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
