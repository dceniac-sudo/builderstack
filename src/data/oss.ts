import { OssFact, OssIndustry, OssProject, OssSource } from '@/types/oss';
import { SHOW_DRAFTS } from '@/data/tools';

export interface IndustryCopy {
  id: OssIndustry;
  label: string;
  labelEn: string;
  title: string;               // 行业页标题前半句（黑色）
  titleEn: string;
  tagline: string;             // 行业页标题后半句（灰色）
  taglineEn: string;
  description: string;         // 行业卡片、搜索结果和分享卡片里的简介
  descriptionEn: string;
}

const TAGLINE = '每个先回答五件事，再决定要不要装。';
const TAGLINE_EN = 'Five answers for each one, before you install anything.';

// 行业分类，按这里的顺序显示。一个行业下还没有确认过的项目时，线上只显示名字和“评估中”，不能点进去。
// 教育以外的四个分类是 2026-10-09 按作者“多做几个分类”的要求加的，选哪几个行业是 Claude 的推断，作者可以改。
export const OSS_INDUSTRIES: IndustryCopy[] = [
  {
    id: 'education',
    label: '教育',
    labelEn: 'Education',
    title: '教育行业能拿来用的开源项目',
    titleEn: 'Open-source software an education business can actually use',
    tagline: TAGLINE,
    taglineEn: TAGLINE_EN,
    description: '网校、考试、直播课堂、教务、编程教学和机房管理。',
    descriptionEn: 'Online courses, exams, live classes, school admin, teaching code and computer labs.',
  },
  {
    id: 'ecommerce',
    label: '电商零售',
    labelEn: 'E-commerce & retail',
    title: '电商零售能拿来用的开源项目',
    titleEn: 'Open-source software an online store can actually use',
    tagline: TAGLINE,
    taglineEn: TAGLINE_EN,
    description: '自建商城、小程序商城和电商引擎。',
    descriptionEn: 'Self-hosted stores, mini-program shops and commerce engines.',
  },
  {
    id: 'restaurant',
    label: '餐饮门店',
    labelEn: 'Restaurants & shops',
    title: '餐饮门店能拿来用的开源项目',
    titleEn: 'Open-source software a restaurant or shop can actually use',
    tagline: TAGLINE,
    taglineEn: TAGLINE_EN,
    description: '收银、点餐、订座和门店管理。',
    descriptionEn: 'Point of sale, online ordering, reservations and store management.',
  },
  {
    id: 'healthcare',
    label: '医疗诊所',
    labelEn: 'Clinics & healthcare',
    title: '医疗诊所能拿来用的开源项目',
    titleEn: 'Open-source software a clinic can actually use',
    tagline: TAGLINE,
    taglineEn: TAGLINE_EN,
    description: '电子病历和诊所管理。',
    descriptionEn: 'Electronic health records and practice management.',
  },
  {
    id: 'manufacturing',
    label: '制造与仓储',
    labelEn: 'Manufacturing & warehousing',
    title: '制造与仓储能拿来用的开源项目',
    titleEn: 'Open-source software a factory or warehouse can actually use',
    tagline: TAGLINE,
    taglineEn: TAGLINE_EN,
    description: '进销存、ERP 和库存管理。',
    descriptionEn: 'ERP, purchasing, sales and inventory management.',
  },
];

// 每个行业下的用途，用于行业页里的筛选
export const OSS_USES: Record<OssIndustry, { id: string; label: string; labelEn: string }[]> = {
  education: [
    { id: 'course', label: '在线课程', labelEn: 'Online courses' },
    { id: 'exam', label: '考试测评', labelEn: 'Exams' },
    { id: 'live', label: '直播课堂', labelEn: 'Live classes' },
    { id: 'admin', label: '教务管理', labelEn: 'School admin' },
    { id: 'coding', label: '编程教学', labelEn: 'Teaching code' },
    { id: 'classroom', label: '机房管理', labelEn: 'Computer labs' },
  ],
  ecommerce: [
    { id: 'store', label: '自建商城', labelEn: 'Online store' },
    { id: 'engine', label: '电商引擎', labelEn: 'Commerce engine' },
  ],
  restaurant: [
    { id: 'pos', label: '收银', labelEn: 'Point of sale' },
    { id: 'ordering', label: '点餐订座', labelEn: 'Ordering & reservations' },
  ],
  healthcare: [{ id: 'emr', label: '电子病历', labelEn: 'Health records' }],
  manufacturing: [
    { id: 'erp', label: 'ERP', labelEn: 'ERP' },
    { id: 'inventory', label: '库存管理', labelEn: 'Inventory' },
  ],
};

const CHECKED_AT = '2026-10-09';
const GH = 'https://github.com/';

const src = (label: string, labelEn: string, url: string): OssSource => ({ label, labelEn, url });
const license = (url: string) => src('许可证', 'License', url);
const readme = (repo: string) => src('README', 'README', `${GH}${repo}#readme`);

// AGPL-3.0 且项目没有附加条款时的通用说法
function agpl(licenseUrl: string): OssFact {
  return {
    verdict: 'caution',
    label: '有条件',
    labelEn: 'With conditions',
    detail: 'AGPL-3.0。不改代码直接部署使用没有额外义务；改了代码又让学员通过网络使用，就要向这些用户提供改动后的源码。',
    detailEn: 'AGPL-3.0. Running it unmodified adds no obligations. If you change the code and let learners use it over a network, you must offer those users your modified source.',
    sources: [license(licenseUrl)],
  };
}

// 按最近一次推送距离核对日的天数给结论：90 天内算在更新，一年内算放缓，更久算停滞
function alive(lastPush: string, repo: string, archived = false): OssFact {
  const days = Math.round((Date.parse(CHECKED_AT) - Date.parse(lastPush)) / 86400000);
  const verdict = archived || days > 365 ? 'bad' : days <= 90 ? 'good' : 'caution';
  return {
    verdict,
    label: archived ? '已归档' : days <= 90 ? '在更新' : days <= 365 ? '更新放缓' : '基本停更',
    labelEn: archived ? 'Archived' : days <= 90 ? 'Active' : days <= 365 ? 'Slowing down' : 'Mostly stalled',
    detail: `最近一次推送是 ${lastPush}，${archived ? '仓库已经归档，不再维护' : '仓库没有归档'}。`,
    detailEn: `Last push on ${lastPush}. ${archived ? 'The repository is archived and no longer maintained.' : 'The repository is not archived.'}`,
    sources: [src('提交记录', 'Commits', `${GH}${repo}/commits`)],
  };
}

const PENDING: OssFact = { verdict: 'pending', label: '待评估', labelEn: 'Not yet evaluated' };

// 候选项目：只有许可证标识和推送日期，其余三项待评估。永远是 confirmed: false。
function candidate(o: {
  id: string;
  name: string;
  nameEn?: string;
  industry: OssIndustry;
  uses: string[];
  repo: string;
  homepage?: string;
  spdx: string | null;         // GitHub 识别出的许可证，null 表示没识别出标准许可证
  lastPush: string;
  archived?: boolean;
  what: string;
  whatEn: string;
}): OssProject {
  const repoUrl = `${GH}${o.repo}`;
  return {
    id: o.id,
    name: o.name,
    nameEn: o.nameEn,
    industry: o.industry,
    uses: o.uses,
    what: o.what,
    whatEn: o.whatEn,
    repoUrl,
    homepage: o.homepage,
    facts: {
      commercial: {
        verdict: 'pending',
        label: o.spdx ? `${o.spdx}，细则待核对` : '许可证待核对',
        labelEn: o.spdx ? `${o.spdx}, terms not yet checked` : 'License not yet checked',
        detail: o.spdx
          ? `仓库的许可证文件被 GitHub 识别为 ${o.spdx}。项目自己加的条款、商标限制还没有读。`
          : 'GitHub 没有从仓库里识别出标准许可证，要读仓库里的协议原文才能下结论。',
        detailEn: o.spdx
          ? `GitHub identifies the repository license as ${o.spdx}. Any terms the project adds on top, and trademark limits, have not been read yet.`
          : 'GitHub does not identify a standard license in the repository. The license text itself needs to be read before drawing a conclusion.',
        sources: [src('仓库', 'Repository', repoUrl)],
      },
      alive: alive(o.lastPush, o.repo, o.archived),
      deploy: PENDING,
      cost: PENDING,
      caveats: PENDING,
    },
    checkedAt: CHECKED_AT,
    confirmed: false,
  };
}

// 候选名单和推送日期来自 2026-10-09 调 GitHub 公开接口的结果。
// 其余各项的依据是仓库里的许可证和 README、各项目的官方文档，没有亲自部署。标“待核对”的是没读到出处的。
// 作者 2026-10-09 确认 14 条全部保留上线。英文是照中文译的。新加的条目先写 confirmed: false，确认后再改。
const ALL_PROJECTS: OssProject[] = [
  // ---------- 在线课程 ----------
  {
    id: 'moodle',
    name: 'Moodle',
    industry: 'education',
    uses: ['course', 'exam'],
    what: '老牌的开源学习平台，课程、作业、测验、成绩都有。',
    whatEn: 'The long-established open-source learning platform: courses, assignments, quizzes and grades.',
    repoUrl: `${GH}moodle/moodle`,
    homepage: 'https://moodle.org/',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'GPL-3.0。自己部署来开课、收学费没有限制；把改过的版本分发给别人时，要同样以 GPL 开源。',
        detailEn: 'GPL-3.0. You can host it and charge for courses without restriction. If you distribute a modified version, it must stay under the GPL.',
        sources: [license(`${GH}moodle/moodle/blob/main/COPYING.txt`)],
      },
      alive: alive('2026-10-03', 'moodle/moodle'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '要自己准备 Web 服务器、PHP 和数据库（PostgreSQL、MySQL 或 MariaDB），官方安装文档分八步。PHP 的具体版本要看对应版本的发布说明。',
        detailEn: 'You set up the web server, PHP and a database (PostgreSQL, MySQL or MariaDB) yourself. The official guide has eight steps. The exact PHP version is in the release notes for each version.',
        sources: [src('安装文档', 'Install guide', 'https://docs.moodle.org/en/Installing_Moodle')],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费。官方给的最低配置是 1GHz 处理器、512MB 内存，建议双核、1GB 以上；磁盘按 5GB 起算，另加课程内容。',
        detailEn: 'The software is free. The stated minimum is a 1 GHz CPU and 512 MB of RAM; dual core and 1 GB or more is recommended. Plan for 5 GB of disk plus your course content.',
        sources: [src('安装文档', 'Install guide', 'https://docs.moodle.org/en/Installing_Moodle')],
      },
      caveats: {
        verdict: 'caution',
        label: '名字不能随便用',
        labelEn: 'The name is a trademark',
        detail: '“Moodle”是注册商标。没有官方书面许可，不能用这个名字对外卖托管、培训、技术支持、定制这类服务，通常只有官方合作伙伴有这个许可。自己机构内部说“我们用的是 Moodle”不受限制。',
        detailEn: '"Moodle" is a registered trademark. Without written permission you cannot use the name to sell hosting, training, support or customization; that permission usually goes to official partners only. Saying your own organization runs Moodle is fine.',
        sources: [src('商标政策', 'Trademark policy', 'https://moodle.com/trademarks/')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'playedu',
    name: 'PlayEdu',
    industry: 'education',
    uses: ['course'],
    what: '国产的企业培训系统，仓库介绍写的是一键部署私有化培训平台。',
    whatEn: 'A corporate training system from China, pitched as a one-command private training platform.',
    repoUrl: `${GH}PlayEdu/PlayEdu`,
    homepage: 'https://www.playeduos.com',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '可以商用，要留版权标识',
        labelEn: 'Yes, keep the branding',
        detail: 'Apache-2.0。README 的使用须知另外要求：页面和代码里的版权信息必须保留，包括“Designed By PlayEdu”标识和官网链接；改代码要在代码里注明改了什么。',
        detailEn: 'Apache-2.0. The README adds its own terms: copyright notices in the pages and the code must stay, including the "Designed By PlayEdu" mark and the link to the official site, and code changes must be documented in the code.',
        sources: [license(`${GH}PlayEdu/PlayEdu/blob/main/LICENSE`), src('使用须知', 'Terms in the README', `${GH}PlayEdu/PlayEdu#readme`)],
      },
      alive: alive('2026-05-19', 'PlayEdu/PlayEdu'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '装好 Docker 后拉代码，执行一条 docker compose 命令就起来。官方文档支持 Ubuntu 22.04/24.04、CentOS 7/8、Debian 10 到 12；要用域名和 HTTPS 再按文档配一个 Caddy。',
        detailEn: 'Install Docker, clone the code and run one docker compose command. The docs list Ubuntu 22.04/24.04, CentOS 7/8 and Debian 10 to 12. For a domain and HTTPS, add Caddy as the docs describe. The docs are in Chinese.',
        sources: [src('Docker 安装文档', 'Docker install guide (Chinese)', 'https://faq.playeduos.com/opensource-maintenance-handbook/article/RLKDf9qSHY')],
      },
      cost: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '软件免费。官方给的服务器最低配置是 4 核、8GB 内存、40GB 硬盘、10M 带宽，推荐 8 核、16GB、200GB、50M。',
        detailEn: 'The software is free. The stated minimum server is 4 cores, 8 GB RAM, 40 GB disk and 10 Mbps; the recommendation is 8 cores, 16 GB, 200 GB and 50 Mbps.',
        sources: [src('Docker 安装文档', 'Docker install guide (Chinese)', 'https://faq.playeduos.com/opensource-maintenance-handbook/article/RLKDf9qSHY')],
      },
      caveats: {
        verdict: 'caution',
        label: '开源版只有基础功能',
        labelEn: 'The open edition is basic',
        detail: '开源版是部门和学员管理、视频学习、进度追踪这些基础功能。线上考试、文档在线预览、学习任务、防快进，以及企业微信、钉钉、飞书的集成，README 写的是企业版才有。',
        detailEn: 'The open edition covers departments, learners, video lessons and progress tracking. Exams, document preview, learning tasks, anti-skip and the WeCom, DingTalk and Feishu integrations are in the paid enterprise edition, according to the README.',
        sources: [readme('PlayEdu/PlayEdu')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'meedu',
    name: 'MeEdu',
    industry: 'education',
    uses: ['course'],
    what: '国产的在线网校和知识付费系统，面向个人和中小机构。',
    whatEn: 'An online school and paid-course system from China, for individuals and small institutions.',
    repoUrl: `${GH}Qsnh/meedu`,
    homepage: 'https://www.meedu.vip',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '要先申请授权',
        labelEn: 'Apply for authorization first',
        detail: 'Apache-2.0 加一份附加条款：商业使用要先得到作者的书面同意。用它搭平台卖课，要发邮件申请商用授权，条款里写的是免费；使用的域名必须已备案，且备案主体和申请主体一致，换域名要重新申请。',
        detailEn: 'Apache-2.0 plus additional terms: commercial use needs the author’s written consent. To sell courses on it you email a request for commercial authorization, which the terms say is free. The domain must have a Chinese ICP filing under the same entity, and a new domain needs a new request.',
        sources: [src('附加条款', 'Additional terms (Chinese)', `${GH}Qsnh/meedu/blob/main/ADDITIONAL_TERMS.md`)],
      },
      alive: alive('2026-09-14', 'Qsnh/meedu'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: 'README 的 Docker 方式分三步：复制环境配置、自己生成并填入两个密钥、docker-compose 启动。官方文档另有宝塔面板的安装方式。',
        detailEn: 'The Docker route in the README is three steps: copy the env file, generate and fill in two secrets, then start docker-compose. The docs also cover installing through the BT panel.',
        sources: [readme('Qsnh/meedu'), src('安装手册', 'Install manual (Chinese)', 'https://docs.meedu.vip/doc/g9jK0KXmFe')],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费。官方给的服务器最低配置是 2 核、4GB 内存、5Mbps 带宽，推荐 8 核、16GB、20Mbps。',
        detailEn: 'The software is free. The stated minimum server is 2 cores, 4 GB RAM and 5 Mbps; the recommendation is 8 cores, 16 GB and 20 Mbps.',
        sources: [src('服务器要求', 'Server requirements (Chinese)', 'https://docs.meedu.vip/doc/vPXma1LGJn')],
      },
      caveats: {
        verdict: 'caution',
        label: '开源版只有点播，技术栈旧',
        labelEn: 'Video-on-demand only, older stack',
        detail: '开源版是录播点播和课程售卖。直播课、考试练习、小程序和 APP，README 写的是商业版才有。后端基于 PHP 7.4 和 Laravel 8，都是比较老的版本。两个密钥留空或用示例值会有未授权访问的风险，README 里专门提醒了。',
        detailEn: 'The open edition does recorded video and course sales. Live classes, exams, the mini program and mobile apps are in the commercial edition, according to the README. The backend runs on PHP 7.4 and Laravel 8, both older versions. The README warns that leaving the two secrets empty or at example values allows unauthorized access.',
        sources: [readme('Qsnh/meedu')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'edusoho',
    name: 'EduSoho',
    industry: 'education',
    uses: ['course'],
    what: '国产的开源网校系统，包含在线教学、招生和管理，也可以做企业内训。',
    whatEn: 'An online school system from China covering teaching, enrollment and administration, also used for in-house training.',
    repoUrl: `${GH}edusoho/edusoho`,
    homepage: 'http://www.edusoho.com',
    facts: {
      commercial: {
        verdict: 'bad',
        label: '商用要买授权',
        labelEn: 'Commercial use needs a paid license',
        detail: '用的是自己的“EduSoho 开源协议 V1.0”，不是通用的开源许可证。非商业用途免费；协议写明未获商业授权之前不得用于商业用途。页脚的 EduSoho 名称和官网链接必须保留，也不允许把改过的版本再分发。',
        detailEn: 'It uses its own "EduSoho Open Source Agreement V1.0", not a standard open-source license. Non-commercial use is free; the agreement says commercial use is not allowed without a commercial license. The EduSoho name and link in the footer must stay, and redistributing modified versions is not allowed.',
        sources: [src('开源协议 V1.0', 'Agreement V1.0 (Chinese)', `${GH}EduSoho/EduSoho/wiki/EduSoho%E5%BC%80%E6%BA%90%E5%8D%8F%E8%AE%AEV1.0%E7%89%88%E6%9C%AC`)],
      },
      alive: alive('2026-02-20', 'edusoho/edusoho'),
      deploy: {
        verdict: 'pending',
        label: '安装教程待核对',
        labelEn: 'Install guide not yet checked',
        detail: 'README 只链接到官网的安装教程，教程内容这里还没有核对。从仓库能确认的是：PHP 7.0 以上，框架是 Symfony 3.4。',
        detailEn: 'The README only links to an install tutorial on the official site, which has not been checked here. What the repository confirms: PHP 7.0 or later, built on Symfony 3.4.',
        sources: [readme('edusoho/edusoho'), src('composer.json', 'composer.json', `${GH}edusoho/edusoho/blob/master/composer.json`)],
      },
      cost: {
        verdict: 'pending',
        label: '授权价格待核对',
        labelEn: 'License price not yet checked',
        detail: '商用的主要成本是商业授权，价格没有公开在仓库里，要问官方。',
        detailEn: 'For commercial use the main cost is the commercial license. The price is not published in the repository; ask the vendor.',
      },
      caveats: {
        verdict: 'caution',
        label: '网站根目录必须指到 web',
        labelEn: 'Point the web root at /web',
        detail: 'README 专门提醒：程序运行根目录要配置到 web 目录下，否则课程视频和资料会泄漏。',
        detailEn: 'The README warns that the web root must be set to the web directory, otherwise course videos and materials can leak.',
        sources: [readme('edusoho/edusoho')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'frappe-lms',
    name: 'Frappe LMS',
    industry: 'education',
    uses: ['course'],
    what: '界面简洁的学习管理系统，出自做 ERPNext 的团队。',
    whatEn: 'A clean, simple learning management system from the team behind ERPNext.',
    repoUrl: `${GH}frappe/lms`,
    homepage: 'https://frappe.io/learning',
    facts: {
      commercial: agpl(`${GH}frappe/lms/blob/develop/license.txt`),
      alive: alive('2026-10-09', 'frappe/lms'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '官方给了一个安装脚本，下载后带上邮箱和域名执行一条命令，README 说大约五分钟装好。要先有域名，并把 A 记录指到服务器。',
        detailEn: 'There is an official install script: download it and run one command with your email and domain. The README says it takes about five minutes. You need a domain with its A record pointing at the server first.',
        sources: [readme('frappe/lms'), src('安装文档', 'Install guide', 'https://docs.frappe.io/learning/get-started/installation')],
      },
      cost: {
        verdict: 'good',
        label: '软件免费',
        labelEn: 'Free software',
        short: '软件免费',
        shortEn: 'Free software',
        detail: '官方文档没有给自建服务器的配置要求。不想自己运维可以用官方的托管服务 Frappe Cloud，价格这里没有核对。',
        detailEn: 'The docs give no server requirements for self-hosting. If you would rather not run it yourself there is the official hosted service, Frappe Cloud; its pricing has not been checked here.',
        sources: [src('安装文档', 'Install guide', 'https://docs.frappe.io/learning/get-started/installation')],
      },
      caveats: {
        verdict: 'caution',
        label: '直播课走 Zoom',
        labelEn: 'Live classes run on Zoom',
        detail: 'README 里的直播课功能是在系统里创建 Zoom 会议，国内能不能顺畅用要自己试。文档是英文的。',
        detailEn: 'The live class feature in the README creates Zoom meetings from inside the system, so you need Zoom. Whether that works well from mainland China is something to test yourself.',
        sources: [readme('frappe/lms')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'canvas-lms',
    name: 'Canvas LMS',
    industry: 'education',
    uses: ['course'],
    what: 'Instructure 公司开源的学习管理系统，海外高校用得多。',
    whatEn: 'The learning management system open-sourced by Instructure, widely used by universities.',
    repoUrl: `${GH}instructure/canvas-lms`,
    homepage: `${GH}instructure/canvas-lms/wiki`,
    facts: {
      commercial: agpl(`${GH}instructure/canvas-lms/blob/master/LICENSE`),
      alive: alive('2026-04-30', 'instructure/canvas-lms'),
      deploy: {
        verdict: 'bad',
        label: '门槛高',
        labelEn: 'Hard',
        detail: '官方的生产环境安装指南有十九节，要自己装 Ruby 3.4.1 以上、Node 20、PostgreSQL 14 以上、Redis 6 以上，再配 Apache 和 Passenger。指南是按 Ubuntu 22.04 写的。',
        detailEn: 'The official production guide has nineteen sections. You install Ruby 3.4.1 or later, Node 20, PostgreSQL 14 or later and Redis 6 or later, then configure Apache and Passenger. The guide is written for Ubuntu 22.04.',
        sources: [src('生产环境安装指南', 'Production Start guide', `${GH}instructure/canvas-lms/wiki/Production-Start`)],
      },
      cost: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '软件免费。官方建议单机部署至少 8GB 内存。',
        detailEn: 'The software is free. The guide recommends at least 8 GB of RAM when everything runs on one server.',
        sources: [src('生产环境安装指南', 'Production Start guide', `${GH}instructure/canvas-lms/wiki/Production-Start`)],
      },
      caveats: {
        verdict: 'caution',
        label: '还要另起一个编辑器服务',
        labelEn: 'A separate editor service is required',
        detail: '富文本编辑器是一个要单独部署的服务，安装指南里写明生产分支需要它。GitHub 仓库 2026 年 4 月底之后没有新的推送，原因这里没有核对。',
        detailEn: 'The rich content editor is a separate service you deploy yourself, and the guide says the production branch requires it. The GitHub repository has had no pushes since late April 2026; the reason has not been checked here.',
        sources: [src('生产环境安装指南', 'Production Start guide', `${GH}instructure/canvas-lms/wiki/Production-Start`)],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'kolibri',
    name: 'Kolibri',
    industry: 'education',
    uses: ['course'],
    what: '为没有稳定网络的地方做的离线学习平台。',
    whatEn: 'An offline-first learning platform for places without reliable internet.',
    repoUrl: `${GH}learningequality/kolibri`,
    homepage: 'https://learningequality.org/kolibri/',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'MIT。可以商用、修改、闭源，保留版权声明即可。',
        detailEn: 'MIT. Commercial use, modification and closed-source use are all allowed; keep the copyright notice.',
        sources: [license(`${GH}learningequality/kolibri/blob/develop/LICENSE`)],
      },
      alive: alive('2026-10-07', 'learningequality/kolibri'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '官方有 Windows、Debian/Ubuntu、树莓派、macOS、安卓的安装包，也可以用 Python 的 pip 装。',
        detailEn: 'There are official installers for Windows, Debian/Ubuntu, Raspberry Pi, macOS and Android, and it can also be installed with pip.',
        sources: [src('安装文档', 'Install guide', 'https://kolibri.readthedocs.io/en/latest/install/index.html')],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费。做服务器的那台机器，官方建议 Linux 下 1GB 内存、Windows 下 2GB 以上，1GHz 处理器。',
        detailEn: 'The software is free. For the machine acting as server, the docs recommend 1 GB of RAM on Linux or 2 GB or more on Windows, and a 1 GHz CPU.',
        sources: [src('硬件要求', 'Hardware requirements', 'https://kolibri.readthedocs.io/en/latest/install/system_requirements.html')],
      },
      caveats: {
        verdict: 'caution',
        label: '是给离线教室用的',
        labelEn: 'Built for offline classrooms',
        detail: '它解决的是没有稳定网络时怎么上课，不是对外卖课的网校。硬盘要多大，取决于导入多少课程内容。',
        detailEn: 'It solves teaching without reliable internet; it is not a storefront for selling courses. Disk space depends on how much content you import.',
        sources: [readme('learningequality/kolibri'), src('硬件要求', 'Hardware requirements', 'https://kolibri.readthedocs.io/en/latest/install/system_requirements.html')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },

  // ---------- 考试测评 ----------
  {
    id: 'xzs',
    name: '学之思开源考试系统',
    nameEn: 'XZS exam system (学之思)',
    industry: 'education',
    uses: ['exam'],
    what: '国产的在线考试系统，Java 加 Vue，有学生端、管理端和微信小程序。',
    whatEn: 'An online exam system from China built with Java and Vue, with student and admin apps and a WeChat mini program.',
    repoUrl: `${GH}mindskip/xzs`,
    homepage: 'https://www.mindskip.net/xzs.html',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '有条件',
        labelEn: 'With conditions',
        detail: 'AGPL-3.0。不改代码直接部署使用没有额外义务；改了代码又让学生通过网络使用，就要向这些用户提供改动后的源码。官网另卖带商业授权的版本，社区版不含商业授权。',
        detailEn: 'AGPL-3.0. Running it unmodified adds no obligations. If you change the code and let students use it over a network, you must offer them your modified source. The vendor sells editions with a commercial license; the community edition does not include one.',
        sources: [license(`${GH}mindskip/xzs/blob/master/LICENSE`), src('版本对比', 'Edition comparison (Chinese)', 'https://www.mindskip.net/xzs.html')],
      },
      alive: alive('2026-10-09', 'mindskip/xzs'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '后端打成一个 jar 包运行，环境是 JDK 1.8 加 PostgreSQL 12（另有 MySQL 版仓库）。官方文档给了集成部署、前后端分离、docker-compose 三种方式。',
        detailEn: 'The backend runs as a single jar on JDK 1.8 with PostgreSQL 12 (a MySQL version lives in a separate repository). The docs describe three ways to deploy, including docker-compose. The docs are in Chinese.',
        sources: [
          src('部署文档', 'Deployment guide (Chinese)', 'https://www.mindskip.net:888/guide/deploy.html'),
          src('技术栈', 'Tech stack (Chinese)', 'https://www.mindskip.net:888/guide/skill.html'),
        ],
      },
      cost: {
        verdict: 'good',
        label: '社区版免费',
        labelEn: 'Community edition is free',
        short: '社区版免费',
        shortEn: 'Free edition',
        detail: '社区版免费，官方文档没有给硬件要求。要商业授权和更多功能，官网报价是标准版 3000 元、高级版 8000 元（源码价）。',
        detailEn: 'The community edition is free and the docs give no hardware requirements. For a commercial license and more features, the listed prices are 3,000 CNY for the standard edition and 8,000 CNY for the advanced edition (source code).',
        sources: [src('官网报价', 'Price list (Chinese)', 'https://www.mindskip.net/buy.html')],
      },
      caveats: {
        verdict: 'caution',
        label: '社区版功能少，技术栈旧',
        labelEn: 'Limited free edition, older stack',
        detail: '社区版没有教师端、题目导入和视频课堂，这些在付费的标准版和高级版里。社区版基于 Spring Boot 2.1.6、JDK 1.8 和 Node 16，都是比较老的版本。',
        detailEn: 'The community edition has no teacher app, question import or video lessons; those are in the paid editions. It is built on Spring Boot 2.1.6, JDK 1.8 and Node 16, all older versions.',
        sources: [
          src('版本对比', 'Edition comparison (Chinese)', 'https://www.mindskip.net/xzs.html'),
          src('技术栈', 'Tech stack (Chinese)', 'https://www.mindskip.net:888/guide/skill.html'),
        ],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'hydro',
    name: 'Hydro',
    industry: 'education',
    uses: ['exam', 'coding'],
    what: '信息学在线测评系统，学生提交代码后自动判分。',
    whatEn: 'An online judge for programming: students submit code and it is graded automatically.',
    repoUrl: `${GH}hydro-dev/Hydro`,
    homepage: 'https://hydro.js.org/',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '有条件',
        labelEn: 'With conditions',
        detail: '主体是 AGPL-3.0 加附加条款：部署时要保留页面底部的“Powered by Hydro”和链接；改了源码要同样以 AGPL-3.0 开源。确实要闭源，README 写的是可以联系作者另买授权。',
        detailEn: 'Mostly AGPL-3.0 with additional terms: the "Powered by Hydro" footer and link must stay, and modified source must also be released under AGPL-3.0. If you need closed source, the README says to contact the authors for a separate license.',
        sources: [src('README 开源许可一节', 'License section of the README', `${GH}hydro-dev/Hydro#readme`), license(`${GH}hydro-dev/Hydro/blob/master/LICENSE`)],
      },
      alive: alive('2026-10-09', 'hydro-dev/Hydro'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '一条命令的安装脚本，README 推荐用 Debian 12，支持 x86_64 和 arm64。安装脚本不支持 CentOS，检测到宝塔面板会警告，建议用干净的系统。',
        detailEn: 'A one-command install script. The README recommends Debian 12 and supports x86_64 and arm64. The script does not support CentOS and warns if it detects the BT panel; use a clean system.',
        sources: [readme('hydro-dev/Hydro'), src('安装脚本', 'Install script', `${GH}hydro-dev/Hydro/blob/master/install/install.ts`)],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费，README 说树莓派上也能跑。不想自己运维，官方有免费开通的在线版。服务器配置要求这里没有读到。',
        detailEn: 'The software is free and the README says it runs on a Raspberry Pi. If you would rather not host it, there is a free hosted version. Server requirements were not found here.',
        sources: [readme('hydro-dev/Hydro')],
      },
      caveats: {
        verdict: 'caution',
        label: '安装脚本带遥测',
        labelEn: 'The install script has telemetry',
        detail: '安装脚本开头写明包含系统遥测，用来统计操作系统和平台，要关得自己看源码。导入洛谷的题目要另外向洛谷购买授权。',
        detailEn: 'The install script states up front that it includes system telemetry about the operating system and platform; turning it off means reading the source. Importing problems from Luogu requires a separate license from Luogu.',
        sources: [src('安装脚本', 'Install script', `${GH}hydro-dev/Hydro/blob/master/install/install.sh`), readme('hydro-dev/Hydro')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'qduoj',
    name: '青岛大学 OnlineJudge',
    nameEn: 'QDU OnlineJudge',
    industry: 'education',
    uses: ['exam', 'coding'],
    what: '青岛大学开源的编程题在线测评系统，基于 Vue、Django 和 Docker。',
    whatEn: 'An online judge for programming problems from Qingdao University, built on Vue, Django and Docker.',
    repoUrl: `${GH}QingdaoU/OnlineJudge`,
    homepage: 'http://opensource.qduoj.com/',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'MIT。可以商用、修改、闭源，保留版权声明即可。',
        detailEn: 'MIT. Commercial use, modification and closed-source use are all allowed; keep the copyright notice.',
        sources: [license(`${GH}QingdaoU/OnlineJudge/blob/master/LICENSE`)],
      },
      alive: alive('2024-10-23', 'QingdaoU/OnlineJudge'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '装好 Docker 后拉部署仓库，执行 docker-compose up -d，文档说 5 到 30 分钟自动搭好。Windows 下只适合体验，文档明确说不要用于生产。',
        detailEn: 'Install Docker, clone the deploy repository and run docker-compose up -d. The docs say it sets itself up in 5 to 30 minutes. Windows is for trying it out only; the docs say not to use it in production.',
        sources: [src('部署文档', 'Deploy guide', `${GH}QingdaoU/OnlineJudgeDeploy/tree/2.0`)],
      },
      cost: {
        verdict: 'good',
        label: '软件免费',
        labelEn: 'Free software',
        short: '软件免费',
        shortEn: 'Free software',
        detail: '部署文档没有给服务器配置要求。',
        detailEn: 'The deploy guide gives no server requirements.',
        sources: [src('部署文档', 'Deploy guide', `${GH}QingdaoU/OnlineJudgeDeploy/tree/2.0`)],
      },
      caveats: {
        verdict: 'bad',
        label: '两年没更新',
        labelEn: 'No updates for two years',
        detail: '主仓库最近一次推送是 2024-10-23，部署仓库是 2024-04-07，出了问题大概率要自己修。安装后的超级管理员默认密码是 rootroot，文档要求立刻改掉。',
        detailEn: 'The main repository was last pushed on 2024-10-23 and the deploy repository on 2024-04-07, so expect to fix problems yourself. The default super admin password after install is rootroot; the docs tell you to change it immediately.',
        sources: [src('提交记录', 'Commits', `${GH}QingdaoU/OnlineJudge/commits`), src('部署文档', 'Deploy guide', `${GH}QingdaoU/OnlineJudgeDeploy/tree/2.0`)],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },

  // ---------- 直播课堂 ----------
  {
    id: 'bigbluebutton',
    name: 'BigBlueButton',
    industry: 'education',
    uses: ['live'],
    what: '为上课设计的网页会议系统，有白板、分组讨论和录制。',
    whatEn: 'A web conferencing system designed for classes, with a whiteboard, breakout rooms and recording.',
    repoUrl: `${GH}bigbluebutton/bigbluebutton`,
    homepage: 'https://bigbluebutton.org',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'LGPL-3.0。自己部署来上课、收费没有限制；改了它本身的代码再分发时，改动部分要开源。',
        detailEn: 'LGPL-3.0. You can host it for paid classes without restriction. If you modify its own code and distribute it, those changes must be open.',
        sources: [license(`${GH}bigbluebutton/bigbluebutton/blob/v3.0.x-develop/LICENSE`)],
      },
      alive: alive('2026-10-08', 'bigbluebutton/bigbluebutton'),
      deploy: {
        verdict: 'bad',
        label: '门槛高',
        labelEn: 'Hard',
        detail: '要一台干净的 Ubuntu 22.04 专用服务器，不能和别的网站共用 80、443 端口；要有域名和有效的 SSL 证书，否则浏览器不给摄像头和麦克风权限；还要放开 UDP 16384 到 32768。官方用 bbb-install.sh 脚本安装。',
        detailEn: 'It needs a clean, dedicated Ubuntu 22.04 server that does not share ports 80 and 443 with another site, a domain with a valid SSL certificate (browsers will not grant camera and microphone access without one), and UDP ports 16384 to 32768 open. Installation is through the official bbb-install.sh script.',
        sources: [src('安装文档（3.0）', 'Install guide (3.0)', 'https://docs.bigbluebutton.org/administration/install/')],
      },
      cost: {
        verdict: 'bad',
        label: '高',
        labelEn: 'High',
        detail: '软件免费，钱花在服务器上。官方的生产环境最低要求是 8 核、16GB 内存、250Mbps 上下行对等带宽；要录课的话磁盘 500GB，不录是 50GB。',
        detailEn: 'The software is free; the server is the cost. The stated production minimum is 8 cores, 16 GB RAM and 250 Mbps symmetrical bandwidth, with 500 GB of disk if you record sessions or 50 GB if you do not.',
        sources: [src('安装文档（3.0）', 'Install guide (3.0)', 'https://docs.bigbluebutton.org/administration/install/')],
      },
      caveats: {
        verdict: 'caution',
        label: '带宽是大头',
        labelEn: 'Bandwidth is the big item',
        detail: '250Mbps 对等带宽在国内云上的价格还没有核对，下结论之前要先问一下云厂商的报价。官方文档还要求服务器同时有 IPv4 和 IPv6 地址。',
        detailEn: 'What 250 Mbps of symmetrical bandwidth costs on a Chinese cloud has not been checked here; get a quote before deciding. The docs also ask for both an IPv4 and an IPv6 address.',
        sources: [src('安装文档（3.0）', 'Install guide (3.0)', 'https://docs.bigbluebutton.org/administration/install/')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },

  // ---------- 教务管理 ----------
  {
    id: 'gibbon',
    name: 'Gibbon',
    industry: 'education',
    uses: ['admin'],
    what: '学校管理平台，面向老师、学生、家长和管理者。',
    whatEn: 'A school management platform for teachers, students, parents and administrators.',
    repoUrl: `${GH}GibbonEdu/core`,
    homepage: 'https://gibbonedu.org',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'GPL-3.0。学校和机构自己部署使用没有限制；把改过的版本分发给别人时，要同样以 GPL 开源。',
        detailEn: 'GPL-3.0. Schools and institutions can host and use it without restriction. If you distribute a modified version, it must stay under the GPL.',
        sources: [license(`${GH}GibbonEdu/core/blob/v31.0.00/LICENSE`)],
      },
      alive: alive('2026-10-09', 'GibbonEdu/core'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '下载解压、把文件传到服务器、浏览器打开后跟着安装向导走，官方文档一共五步。环境是 Apache 或 Nginx、PHP 8.0 以上、MySQL 8.0 以上。',
        detailEn: 'Download and unzip, copy the files to your server, open it in a browser and follow the installer: five steps in the official guide. It needs Apache or Nginx, PHP 8.0 or later and MySQL 8.0 or later.',
        sources: [
          src('安装文档', 'Install guide', 'https://docs.gibbonedu.org/guides/install/installing-gibbon'),
          src('系统要求', 'System requirements', 'https://docs.gibbonedu.org/reference/system-requirements'),
        ],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费。官方给小型学校的建议配置是 2 核、4 到 8GB 内存、50GB 硬盘；大型学校是 4 核、16GB、300GB。',
        detailEn: 'The software is free. For a small school the docs suggest 2 CPUs, 4 to 8 GB of RAM and 50 GB of disk; for a large one, 4 CPUs, 16 GB and 300 GB.',
        sources: [src('系统要求', 'System requirements', 'https://docs.gibbonedu.org/reference/system-requirements')],
      },
      caveats: {
        verdict: 'caution',
        label: '中文靠志愿者翻译',
        labelEn: 'Translations are volunteer-run',
        detail: '界面翻译由志愿者维护，中文翻到什么程度要装上之后看。文档是英文的。',
        detailEn: 'Interface translations are maintained by volunteers, so check how complete your language is after installing. The docs are in English.',
        sources: [readme('GibbonEdu/core')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },

  // ---------- 编程教学 ----------
  {
    id: 'jupyterhub',
    name: 'JupyterHub',
    industry: 'education',
    uses: ['coding'],
    what: '多人共用的 Jupyter 笔记本服务器，一个班的学生各有自己的环境。',
    whatEn: 'A multi-user Jupyter notebook server: every student in a class gets their own environment.',
    repoUrl: `${GH}jupyterhub/jupyterhub`,
    homepage: 'https://jupyterhub.readthedocs.io',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'BSD-3-Clause。可以商用、修改、闭源，保留版权声明即可。',
        detailEn: 'BSD-3-Clause. Commercial use, modification and closed-source use are all allowed; keep the copyright notice.',
        sources: [license(`${GH}jupyterhub/jupyterhub/blob/main/LICENSE`)],
      },
      alive: alive('2026-10-08', 'jupyterhub/jupyterhub'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '要一台 Linux 服务器、Python 3.10 以上、Node.js，还要域名和 TLS 证书。官方的 Docker 镜像只有 Hub 本身，不带配置，登录方式和怎么给每个学生起环境要自己配。',
        detailEn: 'It needs a Linux server, Python 3.10 or later, Node.js, a domain and a TLS certificate. The official Docker image contains only the Hub with no configuration; you set up login and how each student’s environment is started.',
        sources: [readme('jupyterhub/jupyterhub')],
      },
      cost: {
        verdict: 'caution',
        label: '看同时上课的人数',
        labelEn: 'Depends on concurrent users',
        short: '看人数',
        shortEn: 'Per user',
        detail: '软件免费。官方的小型发行版给了估算公式：内存 = 同时在线人数 × 每人内存上限 + 128MB，同时在线人数建议先按班级人数的 40% 到 60% 算；服务器至少 1GB 内存才能装上。',
        detailEn: 'The software is free. The small official distribution gives a formula: memory = concurrent users × memory limit per user + 128 MB, starting from 40% to 60% of class size as concurrent users. The server needs at least 1 GB of RAM to install.',
        sources: [src('资源估算', 'Resource estimation', 'https://tljh.jupyter.org/en/latest/howto/admin/resource-estimation.html')],
      },
      caveats: {
        verdict: 'caution',
        label: '默认用系统账号登录',
        labelEn: 'Logs in with system accounts by default',
        detail: '默认的登录方式是服务器上的系统账号，要让多个人登录，默认得用 root 权限运行，换成别的方式需要更多配置。',
        detailEn: 'By default users log in with system accounts on the server, and allowing several users means running it with root privileges. Anything else takes more configuration.',
        sources: [readme('jupyterhub/jupyterhub')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },

  // ---------- 机房管理 ----------
  {
    id: 'veyon',
    name: 'Veyon',
    industry: 'education',
    uses: ['classroom'],
    what: '机房里看学生屏幕、广播教师屏幕、锁屏的课堂管理软件。',
    whatEn: 'Classroom management for computer labs: watch student screens, broadcast the teacher’s screen, lock screens.',
    repoUrl: `${GH}veyon/veyon`,
    homepage: 'https://veyon.io',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'GPL-2.0。机构在自己的机房里装来用没有限制；把改过的版本分发给别人时，要同样以 GPL 开源。',
        detailEn: 'GPL-2.0. An institution can install and use it in its own labs without restriction. If you distribute a modified version, it must stay under the GPL.',
        sources: [license(`${GH}veyon/veyon/blob/main/COPYING`)],
      },
      alive: alive('2026-10-07', 'veyon/veyon'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: 'Windows 10 和 11 有安装程序，支持不弹窗的静默安装，适合批量装。Linux 支持 Debian 10、Ubuntu 20.04 等及更新的版本。学生机可以不装教师端组件。',
        detailEn: 'There is an installer for Windows 10 and 11 with a silent mode, which suits rolling it out to many machines. Linux support covers Debian 10, Ubuntu 20.04 and newer. Student machines can skip the teacher component.',
        sources: [src('安装文档', 'Install guide', 'https://docs.veyon.io/en/latest/admin/installation.html')],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费，不需要服务器。每台电脑至少 2GB 内存，官方强烈建议多核处理器。',
        detailEn: 'The software is free and needs no server. Each computer needs at least 2 GB of RAM, and a multi-core CPU is strongly recommended.',
        sources: [src('安装文档', 'Install guide', 'https://docs.veyon.io/en/latest/admin/installation.html')],
      },
      caveats: {
        verdict: 'caution',
        label: '看的是机房网络',
        labelEn: 'It depends on the lab network',
        detail: '所有电脑要连在同一个 TCP/IP 网络里，超过 10 台官方建议用千兆网络。',
        detailEn: 'All computers must be on a TCP/IP network together, and gigabit networking is recommended for more than 10 machines.',
        sources: [src('安装文档', 'Install guide', 'https://docs.veyon.io/en/latest/admin/installation.html')],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  // ---------- 以下四个行业是候选草稿 ----------
  // 只有许可证和推送日期是 2026-10-09 从 GitHub 公开接口查的，部署、成本、注意事项都还没评估。
  // 全部 confirmed: false，线上不显示。逐个评估并由作者确认后，改写成上面教育行业那样的完整条目。

  // 电商零售
  candidate({ id: 'woocommerce', name: 'WooCommerce', industry: 'ecommerce', uses: ['store'], repo: 'woocommerce/woocommerce', homepage: 'https://woocommerce.com', spdx: null, lastPush: '2026-10-09',
    what: '建在 WordPress 上的开源电商平台。', whatEn: 'An open-source commerce platform built on WordPress.' }),
  candidate({ id: 'prestashop', name: 'PrestaShop', industry: 'ecommerce', uses: ['store'], repo: 'PrestaShop/PrestaShop', homepage: 'https://www.prestashop-project.org/', spdx: null, lastPush: '2026-10-09',
    what: '老牌的开源网店系统。', whatEn: 'A long-established open-source online store platform.' }),
  candidate({ id: 'bagisto', name: 'Bagisto', industry: 'ecommerce', uses: ['store'], repo: 'bagisto/bagisto', homepage: 'https://bagisto.com', spdx: 'MIT', lastPush: '2026-10-09',
    what: '基于 Laravel 的开源电商和多商户平台。', whatEn: 'An open-source store and multi-vendor marketplace built with Laravel.' }),
  candidate({ id: 'crmeb', name: 'CRMEB', industry: 'ecommerce', uses: ['store'], repo: 'crmeb/CRMEB', homepage: 'https://www.crmeb.com', spdx: 'Apache-2.0', lastPush: '2026-09-05',
    what: '国产的开源商城系统，有小程序、H5、公众号和 PC 端。', whatEn: 'A store system from China with mini-program, mobile web, WeChat and desktop storefronts.' }),
  candidate({ id: 'mall', name: 'mall', industry: 'ecommerce', uses: ['store'], repo: 'macrozheng/mall', homepage: 'https://www.macrozheng.com/admin/', spdx: 'Apache-2.0', lastPush: '2026-09-15',
    what: '国产的电商系统，包括前台商城和后台管理，基于 Spring Boot。', whatEn: 'An e-commerce system from China with a storefront and an admin back office, built on Spring Boot.' }),
  candidate({ id: 'medusa', name: 'Medusa', industry: 'ecommerce', uses: ['engine'], repo: 'medusajs/medusa', homepage: 'https://medusajs.com', spdx: null, lastPush: '2026-10-09',
    what: '面向开发者的电商引擎，自己接前端。', whatEn: 'A commerce engine for developers; you bring your own storefront.' }),
  candidate({ id: 'saleor', name: 'Saleor', industry: 'ecommerce', uses: ['engine'], repo: 'saleor/saleor', homepage: 'https://saleor.io', spdx: 'BSD-3-Clause', lastPush: '2026-10-09',
    what: '只提供接口的电商后端，自己接前端。', whatEn: 'A headless commerce API; you bring your own storefront.' }),

  // 餐饮门店
  candidate({ id: 'tastyigniter', name: 'TastyIgniter', industry: 'restaurant', uses: ['ordering'], repo: 'tastyigniter/TastyIgniter', homepage: 'https://tastyigniter.com', spdx: 'MIT', lastPush: '2026-09-20',
    what: '餐厅的在线点餐、订座和管理系统。', whatEn: 'Online ordering, table reservations and management for restaurants.' }),
  candidate({ id: 'ury', name: 'URY', industry: 'restaurant', uses: ['pos', 'ordering'], repo: 'ury-erp/ury', homepage: 'http://ury.app', spdx: 'AGPL-3.0', lastPush: '2026-10-09',
    what: '建在 ERPNext 上的餐厅管理系统。', whatEn: 'A restaurant management system built on ERPNext.' }),
  candidate({ id: 'opensourcepos', name: 'Open Source Point of Sale', industry: 'restaurant', uses: ['pos'], repo: 'opensourcepos/opensourcepos', homepage: 'http://www.opensourcepos.org', spdx: null, lastPush: '2026-10-09',
    what: '网页版的收银系统，用 PHP 写的。', whatEn: 'A web-based point of sale application written in PHP.' }),
  candidate({ id: 'nexopos', name: 'NexoPOS', industry: 'restaurant', uses: ['pos'], repo: 'Blair2004/NexoPOS', homepage: 'https://my.nexopos.com', spdx: 'GPL-3.0', lastPush: '2026-10-08',
    what: '基于 Laravel 的网页收银系统，带库存和客户记录。', whatEn: 'A Laravel-based web POS with inventory and customer records.' }),

  // 医疗诊所
  candidate({ id: 'openemr', name: 'OpenEMR', industry: 'healthcare', uses: ['emr'], repo: 'openemr/openemr', homepage: 'https://open-emr.org/', spdx: 'GPL-3.0', lastPush: '2026-10-09',
    what: '开源的电子病历和诊所管理系统。', whatEn: 'Open-source electronic health records and medical practice management.' }),
  candidate({ id: 'openmrs', name: 'OpenMRS', industry: 'healthcare', uses: ['emr'], repo: 'openmrs/openmrs-core', homepage: 'http://openmrs.org', spdx: null, lastPush: '2026-10-08',
    what: '开源的病历系统平台。', whatEn: 'An open-source medical record system platform.' }),
  candidate({ id: 'hospitalrun', name: 'HospitalRun', industry: 'healthcare', uses: ['emr'], repo: 'HospitalRun/hospitalrun-frontend', homepage: 'https://hospitalrun.io', spdx: 'MIT', lastPush: '2023-01-09', archived: true,
    what: '面向资源有限地区的医院管理系统。', whatEn: 'A hospital management system aimed at low-resource settings.' }),

  // 制造与仓储
  candidate({ id: 'erpnext', name: 'ERPNext', industry: 'manufacturing', uses: ['erp'], repo: 'frappe/erpnext', homepage: 'https://frappe.io/erpnext', spdx: 'GPL-3.0', lastPush: '2026-10-09',
    what: '开源的企业资源管理系统。', whatEn: 'Free and open-source enterprise resource planning.' }),
  candidate({ id: 'odoo', name: 'Odoo', industry: 'manufacturing', uses: ['erp'], repo: 'odoo/odoo', homepage: 'https://www.odoo.com', spdx: null, lastPush: '2026-10-09',
    what: '一整套开源的企业应用，覆盖销售、库存、生产、财务。', whatEn: 'A suite of open-source business apps covering sales, inventory, manufacturing and accounting.' }),
  candidate({ id: 'dolibarr', name: 'Dolibarr', industry: 'manufacturing', uses: ['erp'], repo: 'Dolibarr/dolibarr', homepage: 'https://www.dolibarr.org', spdx: 'GPL-3.0', lastPush: '2026-10-09',
    what: '面向中小企业的 ERP 和 CRM。', whatEn: 'ERP and CRM for small and medium businesses.' }),
  candidate({ id: 'jsherp', name: '管伊佳 ERP', nameEn: 'jshERP (管伊佳)', industry: 'manufacturing', uses: ['erp', 'inventory'], repo: 'jishenghua/jshERP', homepage: 'https://www.gyjerp.com', spdx: 'Apache-2.0', lastPush: '2026-10-06',
    what: '国产的进销存加财务系统，原名华夏 ERP，基于 Spring Boot。', whatEn: 'A purchasing, sales, inventory and finance system from China, built on Spring Boot.' }),
  candidate({ id: 'inventree', name: 'InvenTree', industry: 'manufacturing', uses: ['inventory'], repo: 'inventree/InvenTree', homepage: 'https://docs.inventree.org', spdx: 'MIT', lastPush: '2026-10-09',
    what: '开源的库存管理系统。', whatEn: 'An open-source inventory management system.' }),
];

export const OSS_PROJECTS: OssProject[] = ALL_PROJECTS.filter((p) => p.confirmed || SHOW_DRAFTS);

export function ossProjectsOf(industry: OssIndustry): OssProject[] {
  return OSS_PROJECTS.filter((p) => p.industry === industry);
}

export function ossIndustry(id: string): IndustryCopy | undefined {
  return OSS_INDUSTRIES.find((i) => i.id === id);
}
