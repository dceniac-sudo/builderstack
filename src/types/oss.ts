// “按行业找开源项目”的数据结构。中文和英文各一份文字，英文字段以 En 结尾。

// 分类：大多是行业，'ai' 是各行业都用得上的 AI 能力
export type OssIndustry = 'education' | 'ai' | 'ecommerce' | 'restaurant' | 'healthcare' | 'manufacturing';

// 用途的 id，每个行业各有一组，定义在 src/data/oss.ts 的 OSS_USES 里
export type OssUse = string;

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
  industry: OssIndustry;       // 所属分类
  alsoIn?: OssIndustry[];      // 还会出现在哪些分类下，比如通用的收银系统放在餐饮门店里，同时出现在电商零售里
  uses: OssUse[];              // 用途，用于筛选
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
