import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BuilderStack — Curated Open-Source & AI Stack for Solo Builders',
  description:
    'Curated directory of open-source alternatives, AI workflows, and indie hacker tools. Built for creators and developers taking on the world solo.',
  keywords: [
    'Open Source Alternatives',
    'AI Workflows',
    'Indie Hackers',
    'Solopreneur Tools',
    'Self-hosted SaaS',
    'Cloudflare Pages',
  ],
  authors: [{ name: 'BuilderStack' }],
  openGraph: {
    title: 'BuilderStack — AI-Powered Builder & Open-Source Stack',
    description: 'Curated open-source alternatives and AI workflows for solo creators.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500 selection:text-black min-h-screen flex flex-col bg-grid-pattern">
        {children}
      </body>
    </html>
  );
}
