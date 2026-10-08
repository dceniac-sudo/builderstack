import { NoteItem } from '@/types/tool';
import { SHOW_DRAFTS } from '@/data/tools';

// 每条是一次亲手做过的事。链接没有就不填，卡片上只显示文字。
const ALL_NOTES: NoteItem[] = [
  {
    id: 'deleted-humanizer-skills',
    hasPage: true,
    date: '2026-10-08',
    title: '我把 36 个“去 AI 味”技能文件全删了',
    titleEn: 'I deleted 36 files of “write like a human” skills',
    summary: '它们是给上一代模型打的补丁，句子改得再干净也改不出亲身经历。删完只留十几行模型猜不到的事。',
    summaryEn: 'They were patches for older models, and clean sentences cannot add firsthand experience. I kept about a dozen lines the model cannot guess.',
    confirmed: true,
  },
  {
    id: 'are-you-sure-test',
    hasPage: true,
    date: '2026-10-07',
    title: '对六个模型各说九遍“我觉得不对”',
    titleEn: 'I told 6 models “I don’t think that’s right” 9 times each',
    summary: '54 次里没有一次改成错误答案。两家最便宜的模型（Haiku 4.5、GPT-6 Luna）动摇了，都在 [] == false 这道题上。',
    summaryEn: '0 of 54 switched to a wrong answer. The cheapest model from each vendor (Haiku 4.5, GPT-6 Luna) wobbled, both on the same question: [] == false.',
    confirmed: true,
  },
  {
    id: 'codex-subagent-roles',
    date: '2026-09-08',
    title: '三个角色的 Codex 子 Agent 配置',
    titleEn: 'A three-role Codex subagent setup',
    summary: '子 Agent 默认继承旗舰模型。按任务难度分配模型后，固定 token 假设下的测算是少用约 59% 的额度；这是算出来的，还没做端到端实测。',
    summaryEn: 'Subagents inherit the flagship model by default. Assigning models by task difficulty cuts credits by about 59% on paper, under a fixed-token assumption. Not yet measured end to end.',
    confirmed: false,
  },
];

export const NOTES_DATA: NoteItem[] = ALL_NOTES
  .filter((note) => note.confirmed || SHOW_DRAFTS)
  .sort((a, b) => b.date.localeCompare(a.date));
