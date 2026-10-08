import { ToolItem, CategoryInfo } from '@/types/tool';

// 未确认的条目只在本地预览显示：NEXT_PUBLIC_SHOW_DRAFTS=1 npm run build
// 线上构建不带这个变量，所以作者没确认过的内容不会上线。
export const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === '1';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: '全部', labelEn: 'Everything', iconName: 'LayoutGrid' },
  { id: 'agents', label: '编程 Agent', labelEn: 'Coding agents', iconName: 'Terminal' },
  { id: 'models', label: '模型', labelEn: 'Models', iconName: 'Cpu' },
  { id: 'ship', label: '发布与部署', labelEn: 'Shipping', iconName: 'Flame' },
  { id: 'knowledge', label: '资料与上下文', labelEn: 'Knowledge & context', iconName: 'ShieldCheck' },
  { id: 'dropped', label: '试过后弃用', labelEn: 'Tried and dropped', iconName: 'Palette' },
];

// 内容来源见 output/_working/builderstack-content-draft.md。
// confirmed: true 的评语是按已发表文章起草的草稿，等作者逐条确认后改成 true。
const ALL_TOOLS: ToolItem[] = [
  // ---------- 编程 Agent ----------
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'agents',
    status: 'daily',
    note: '主力。项目说明文件我只留十几行：给谁用、几条硬性要求、文件放哪。文风和结构的规则全删了。',
    noteEn: 'My main driver. The project instructions file is about a dozen lines: who the work is for, a few hard rules, where files go. I deleted every style and structure rule.',
    url: 'https://claude.com/claude-code',
    confirmed: true,
  },
  {
    id: 'codex',
    name: 'Codex (CLI + app)',
    category: 'agents',
    status: 'daily',
    note: '命令行和桌面应用每天都用，和 Claude Code 搭着来。',
    noteEn: 'I use both the CLI and the app every day, next to Claude Code.',
    githubUrl: 'https://github.com/openai/codex',
    confirmed: true,
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    category: 'agents',
    status: 'sometimes',
    note: '主要用于简单工作，比如修 bug、写文章。',
    noteEn: 'Mostly for simple work, like bug fixes and writing articles.',
    githubUrl: 'https://github.com/google-gemini/gemini-cli',
    confirmed: true,
  },

  // ---------- 模型 ----------
  {
    id: 'claude-opus-5-5',
    name: 'Claude Opus 5.5',
    category: 'models',
    status: 'daily',
    note: '中文写作不需要再套“去 AI 味”的技能。被一句没理由的质疑追问时，9 次都坚持了正确答案。',
    noteEn: 'Writes well enough that I stopped layering “humanizer” skills on top. When I pushed back with no reason given, it held the right answer 9 times out of 9.',
    url: 'https://www.anthropic.com/claude',
    confirmed: true,
  },
  {
    id: 'gemini-3-8-flash',
    name: 'Gemini 3.8 Flash',
    category: 'models',
    status: 'daily',
    note: '中文写得好，便宜，适合量大的活。',
    noteEn: 'Good writing for the price. I reach for it when there is a lot of volume.',
    url: 'https://ai.google.dev',
    confirmed: true,
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku 4.5',
    category: 'models',
    status: 'sometimes',
    note: '子任务用它省钱，但别用“你确定吗”去复核它。我测的 9 次里它有 3 次被问动摇了。',
    noteEn: 'Cheap enough for subtasks, but do not check its work by asking “are you sure?”. In my test it wobbled 3 times out of 9.',
    url: 'https://www.anthropic.com/claude',
    confirmed: true,
  },

  // ---------- 发布与部署 ----------
  {
    id: 'nextjs-tailwind',
    name: 'Next.js + Tailwind',
    category: 'ship',
    status: 'daily',
    note: '这个站就是用它做的，静态导出，没有后端。',
    noteEn: 'This site is built with it. Static export, no backend.',
    url: 'https://nextjs.org',
    githubUrl: 'https://github.com/vercel/next.js',
    confirmed: true,
  },
  {
    id: 'cloudflare-pages',
    name: 'Cloudflare Pages',
    category: 'ship',
    status: 'daily',
    note: '托管这个站，静态站点不花钱。',
    noteEn: 'Hosts this site. A static site costs nothing here.',
    url: 'https://pages.cloudflare.com',
    confirmed: true,
  },

  // ---------- 资料与上下文 ----------
  {
    id: 'obsidian',
    name: 'Obsidian',
    category: 'knowledge',
    status: 'daily',
    note: '我的资料库。原始资料只追加不修改，Agent 从里面取材。',
    noteEn: 'My knowledge base. Raw sources are append-only, and agents pull material from it.',
    url: 'https://obsidian.md',
    confirmed: true,
  },
  {
    id: 'browser-mcp',
    name: 'Browser MCP',
    category: 'knowledge',
    status: 'sometimes',
    note: '让 Agent 读我已登录的后台数据。好用，但连接经常掉，要手动重连。',
    noteEn: 'Lets an agent read dashboards I am already logged in to. Useful, but the connection drops often and I have to reconnect by hand.',
    url: 'https://browsermcp.io',
    confirmed: true,
  },

  // ---------- 试过后弃用 ----------
  {
    id: 'humanizer-skills',
    name: '“Humanizer” writing skills',
    nameZh: '“去 AI 味”写作技能',
    category: 'agents',
    status: 'dropped',
    note: '用了一个半月。它是一张症状清单，只能改表面。换了模型之后这层东西成了累赘，36 个文件全删。',
    noteEn: 'Used for six weeks. It is a checklist of symptoms and only fixes the surface. After I switched models it was dead weight, so I deleted all 36 files.',
    githubUrl: 'https://github.com/blader/humanizer',
    confirmed: true,
  },
  {
    id: 'superpowers-plugin',
    name: 'superpowers plugin',
    nameZh: 'superpowers 插件',
    category: 'agents',
    status: 'dropped',
    note: '早期装的。随着各家自带的 harness 变强，已经瘦身掉了。',
    noteEn: 'Installed early on. As the built-in harnesses got better, I trimmed it away.',
    confirmed: true,
  },
  {
    id: 'harness-rules-adr',
    name: 'Hand-written harness rules & ADR docs',
    nameZh: '自己写的 harness 规范和 ADR 文档',
    category: 'knowledge',
    status: 'dropped',
    note: '早期给项目加了一堆规范和 ADR 文档。模型和工具进步之后，大部分不再需要。',
    noteEn: 'I added a pile of rules and ADR docs to my projects early on. Once models and tools improved, most of it was no longer needed.',
    confirmed: true,
  },
  {
    id: 'kimi-deepseek-writing',
    name: 'Kimi & DeepSeek for Chinese writing',
    nameZh: '用 Kimi、DeepSeek 写中文稿',
    category: 'models',
    status: 'dropped',
    note: '最早用它们写中文稿，出来的东西一眼就能看出是 AI 写的。',
    noteEn: 'My first Chinese drafts came from these. You could tell at a glance that an AI wrote them.',
    confirmed: true,
  },
];

const ORDER: Record<ToolItem['status'], number> = { daily: 0, sometimes: 1, dropped: 2 };

export const TOOLS_DATA: ToolItem[] = ALL_TOOLS
  .filter((tool) => tool.confirmed || SHOW_DRAFTS)
  .sort((a, b) => ORDER[a.status] - ORDER[b.status]);
