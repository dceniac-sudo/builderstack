import { NoteItem } from '@/types/note';
import { SHOW_DRAFTS } from '@/data/drafts';

// 每条是一篇文章，写的是亲手做过的事。只有英文版，中文不放在站上。
const ALL_NOTES: NoteItem[] = [
  {
    id: 'deleted-humanizer-skills',
    hasPage: true,
    date: '2026-10-08',
    title: 'I deleted 36 files of “write like a human” skills',
    summary: 'They were patches for older models, and clean sentences cannot add firsthand experience. I kept about a dozen lines the model cannot guess.',
    confirmed: true,
  },
  {
    id: 'are-you-sure-test',
    hasPage: true,
    date: '2026-10-07',
    title: 'I told 6 models “I don’t think that’s right” 9 times each',
    summary: '0 of 54 switched to a wrong answer. The cheapest model from each vendor (Haiku 4.5, GPT-6 Luna) wobbled, both on the same question: [] == false.',
    confirmed: true,
  },
  {
    id: 'codex-subagent-roles',
    date: '2026-09-08',
    title: 'A three-role Codex subagent setup',
    summary: 'Subagents inherit the flagship model by default. Assigning models by task difficulty cuts credits by about 59% on paper, under a fixed-token assumption. Not yet measured end to end.',
    confirmed: false,
  },
];

export const NOTES_DATA: NoteItem[] = ALL_NOTES
  .filter((note) => note.confirmed || SHOW_DRAFTS)
  .sort((a, b) => b.date.localeCompare(a.date));
