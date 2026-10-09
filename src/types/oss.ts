// “按行业找开源项目”页面的数据结构。只有中文页面。

export type OssIndustry = 'education';

export type OssUse = 'course' | 'exam' | 'live' | 'admin' | 'coding' | 'classroom';

// 每个项目回答的五件事
export type OssFactKey = 'commercial' | 'alive' | 'deploy' | 'cost' | 'caveats';

// good / caution / bad 是结论的轻重，pending 表示这一项还没评估
export type OssVerdict = 'good' | 'caution' | 'bad' | 'pending';

export interface OssSource {
  label: string;
  url: string;
}

export interface OssFact {
  verdict: OssVerdict;
  label: string;               // 一眼能看完的结论，比如“可以商用”“门槛高”
  short?: string;              // 列表行里用的一个词；不写就按 verdict 取默认词
  detail?: string;             // 一两句依据
  sources?: OssSource[];       // 出处：许可证原文、提交记录、官方部署文档
}

export interface OssProject {
  id: string;
  name: string;
  industry: OssIndustry;
  uses: OssUse[];              // 用途，用于筛选
  what: string;                // 一句话说它是干什么的
  repoUrl: string;
  homepage?: string;
  facts: Record<OssFactKey, OssFact>;
  checkedAt: string;           // 核对日期 YYYY-MM-DD
  confirmed: boolean;          // 作者逐条确认过才会出现在线上
}
