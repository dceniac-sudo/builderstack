import { NotesHome } from '@/components/NotesHome';
import { NOTES_COPY, pageMetadata } from '@/lib/site-meta';

export const metadata = pageMetadata('zh', '/notes/', NOTES_COPY.zh);

export default function NotesPageZh() {
  return <NotesHome />;
}
