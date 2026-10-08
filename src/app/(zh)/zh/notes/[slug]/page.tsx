import { noteMetadata, noteStaticParams, renderNotePage } from '@/lib/note-pages';

export const generateStaticParams = noteStaticParams;

export function generateMetadata({ params }: { params: { slug: string } }) {
  return noteMetadata(params.slug, 'zh');
}

export default function NotePageZh({ params }: { params: { slug: string } }) {
  return renderNotePage(params.slug, 'zh');
}
