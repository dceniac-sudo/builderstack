import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dceniac.com'),
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
  authors: [{ name: 'dceniac', url: 'https://dceniac.com' }],
  creator: '@dceniac',
  openGraph: {
    title: 'BuilderStack — AI-Powered Builder & Open-Source Stack',
    description: 'Stop paying SaaS taxes. The battle-tested open-source stack for solo creators.',
    url: 'https://dceniac.com',
    siteName: 'BuilderStack',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'BuilderStack — Made for Solo Builders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuilderStack — Curated AI & Indie Stack for Solo Builders',
    description: 'Stop paying unnecessary SaaS taxes. Curated open-source stack for modern hackers.',
    creator: '@dceniac',
    images: ['/avatar.jpg'],
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
