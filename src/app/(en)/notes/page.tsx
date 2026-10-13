import { NotesHome } from '@/components/NotesHome';
import { NOTES_DATA } from '@/data/notes';
import { NOTES_COPY, pageMetadata } from '@/lib/site-meta';

export const metadata = pageMetadata('en', '/notes/', { ...NOTES_COPY, enOnly: true });

export default function NotesPage() {
  return <NotesHome notes={NOTES_DATA} />;
}
