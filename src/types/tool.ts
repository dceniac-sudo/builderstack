export type CategoryType = 'all' | 'agents' | 'models' | 'ship' | 'knowledge' | 'dropped';

export type ToolStatus = 'daily' | 'sometimes' | 'dropped';

export interface ToolItem {
  id: string;
  name: string;
  nameZh?: string;             // 可选：中文界面下显示的名字
  category: 'agents' | 'models' | 'ship' | 'knowledge';
  status: ToolStatus;          // 每天用 / 偶尔用 / 试过后弃用
  note: string;                // 作者自己的话（中文）
  noteEn: string;              // 作者自己的话（英文）
  url?: string;                // 官网链接
  githubUrl?: string;          // GitHub 仓库链接
  command?: string;            // 可选：值得直接复制的一条命令
  confirmed: boolean;          // 作者确认过才会出现在线上；未确认的只在本地预览显示
}

export interface NoteItem {
  id: string;
  date: string;                // YYYY-MM-DD
  title: string;
  titleEn: string;
  summary: string;             // 一句结论（中文）
  summaryEn: string;           // 一句结论（英文）
  xUrl?: string;               // X 帖子
  wechatUrl?: string;          // 公众号文章
  repoUrl?: string;            // 脚本或配置的仓库
  hasPage?: boolean;           // content/notes/ 下有中英文正文，站内有完整文章页
  confirmed: boolean;
}

export interface BuiltItem {
  id: string;
  name: string;
  nameZh?: string;
  desc: string;                // 一句话说它是干什么的（中文）
  descEn: string;              // 一句话说它是干什么的（英文）
  status: 'live' | 'open-source' | 'private';   // 已上线 / 已开源 / 自用未公开
  url?: string;                // 线上地址
  repoUrl?: string;            // 仓库地址
  confirmed: boolean;
}

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  labelEn: string;
  iconName: string;
}
