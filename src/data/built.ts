import { BuiltItem } from '@/types/tool';
import { SHOW_DRAFTS } from '@/data/tools';

// 做过的工具和项目，显示在“学到了什么”和“在用什么”之间。一条确认过的内容都没有时，整个模块不显示。
const ALL_BUILT: BuiltItem[] = [
  {
    id: 'builderstack',
    name: 'BuilderStack',
    desc: '这个站。记录我在用什么、学到了什么。',
    descEn: 'This site. A record of what I use and what I learned.',
    status: 'live',
    url: 'https://dceniac.com',
    repoUrl: 'https://github.com/dceniac-sudo/builderstack',
    confirmed: true,
  },
];


export const BUILT_DATA: BuiltItem[] = ALL_BUILT.filter((item) => item.confirmed || SHOW_DRAFTS);
