import type { Metadata } from 'next';
import './globals.css';

const TITLE = 'BuilderStack — What I use to build with AI agents, and what broke';
const DESCRIPTION =
  'Notes from one indie developer. Every tool here is one I use, and every note is something I tried myself.';

export const metadata: Metadata = {
  metadataBase: new URL('https://dceniac.com'),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['AI coding agents', 'Claude Code', 'Codex', 'multi-agent workflows', 'solo builder'],
  authors: [{ name: 'dceniac', url: 'https://dceniac.com' }],
  creator: '@dceniac',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://dceniac.com',
    siteName: 'BuilderStack',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'BuilderStack: what I use, and what I learned' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@dceniac',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-amber-500 selection:text-black min-h-screen flex flex-col bg-grid-pattern">
        {children}
      </body>
    </html>
  );
}
