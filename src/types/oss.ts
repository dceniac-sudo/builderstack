// “按行业找开源项目”的数据结构。中文和英文各一份文字，英文字段以 En 结尾。

// 2026-10-16 起的结构：用途是主分类，一个项目只属于一个用途；行业是视图，一个项目可以出现在多个行业里。
// 起因是很多项目跨行业（LiveKit 在教育里做直播课，在电商里做直播带货），只按行业分装不下。
export type OssIndustry = 'education' | 'ecommerce' | 'restaurant' | 'manufacturing';

// 用途的 id，全站一组，定义在 src/data/oss.ts 的 OSS_USES 里。也是用途页的地址 /oss/<用途>/，不能和项目 id 重名。
export type OssUse = string;

// 项目出现在哪个行业里。scenario 是“在这个行业里拿它做什么”，只在跨行业、做法不一样时写
export interface OssIndustryFit {
  id: OssIndustry;
  scenario?: string;
  scenarioEn?: string;
}

// 每个项目回答的五件事
export type OssFactKey = 'commercial' | 'alive' | 'deploy' | 'cost' | 'caveats';

// good / caution / bad 是结论的轻重，pending 表示这一项还没评估
export type OssVerdict = 'good' | 'caution' | 'bad' | 'pending';

export interface OssSource {
  label: string;
  labelEn: string;
  url: string;
}

export interface OssFact {
  verdict: OssVerdict;
  label: string;               // 一眼能看完的结论，比如“可以商用”“门槛高”
  labelEn: string;
  short?: string;              // 列表行里用的一个词；不写就按 verdict 取默认词
  shortEn?: string;
  detail?: string;             // 一两句依据
  detailEn?: string;
  sources?: OssSource[];       // 出处：许可证原文、提交记录、官方部署文档
}

export interface OssProject {
  id: string;
  name: string;
  nameEn?: string;             // 英文页面显示的名字，不写就用 name
  logo?: string;               // 项目图标，放在 public/oss/logos/ 下；没有就显示名字的第一个字
  use: OssUse;                 // 所属用途，只有一个
  industries: OssIndustryFit[];  // 出现在哪些行业里；可以是空的，那就只在“全部”和用途页里出现
  what: string;                // 一句话说它是干什么的
  whatEn: string;
  repoUrl: string;
  homepage?: string;
  facts: Record<OssFactKey, OssFact>;
  needs?: OssFact;             // 还要另外准备什么：显卡、第三方账号、API key 这类仓库不一定写清楚的东西
  handsOn?: boolean;           // 作者自己实践过。只在作者明确说过时才标
  checkedAt: string;           // 核对日期 YYYY-MM-DD
  confirmed: boolean;          // 作者逐条确认过才会出现在线上
}
