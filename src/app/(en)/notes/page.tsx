import { NotesHome } from '@/components/NotesHome';
import { NOTES_COPY, pageMetadata } from '@/lib/site-meta';

export const metadata = pageMetadata('en', '/notes/', NOTES_COPY.en);

export default function NotesPage() {
  return <NotesHome />;
}
