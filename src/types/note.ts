// 文章只有英文版（2026-10-11 定：中文文章页下线）。
export interface NoteItem {
  id: string;
  date: string;                // YYYY-MM-DD
  title: string;
  summary: string;             // 一句结论
  hasPage?: boolean;           // content/notes/ 下有正文，站内有完整文章页
  confirmed: boolean;
}
