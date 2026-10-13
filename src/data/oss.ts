import { OssFact, OssIndustry, OssProject, OssSource } from '@/types/oss';
import { SHOW_DRAFTS } from '@/data/drafts';

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

// 行业分类，按这里的顺序显示。作者 2026-10-11 定：所有分类都正常显示、可以点进去，不写“评估中”；还没有项目的分类内容先空着，由作者后面加。
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
    id: 'ai',
    label: 'AI',
    labelEn: 'AI',
    title: '能拿来用的开源 AI 项目',
    titleEn: 'Open-source AI you can actually use',
    tagline: TAGLINE,
    taglineEn: TAGLINE_EN,
    description: '各行业都用得上的 AI 能力，先从实时数字人开始。',
    descriptionEn: 'AI capabilities that cut across industries, starting with real-time digital humans.',
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
  ai: [{ id: 'avatar', label: '实时数字人', labelEn: 'Digital humans' }],
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
  alsoIn?: OssIndustry[];
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
    alsoIn: o.alsoIn,
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
// 教育行业原来有 14 条，作者 2026-10-09 确认上线。之后他去掉了 6 条：EduSoho、青岛大学 OnlineJudge（10-11），
// PlayEdu、MeEdu、学之思、Hydro（10-12，质量不够、不够国际化）。这 6 条 2026-10-13 按他的要求从文件里彻底删除，不要再加回来。
// 英文是照中文译的。新加的条目先写 confirmed: false，确认后再改。
const ALL_PROJECTS: OssProject[] = [
  // ---------- 在线课程 ----------
  {
    id: 'moodle',
    logo: '/oss/logos/moodle.png',
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
    id: 'frappe-lms',
    logo: '/oss/logos/frappe-lms.png',
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
    logo: '/oss/logos/canvas-lms.jpg',
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
    logo: '/oss/logos/kolibri.png',
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

  // ---------- 直播课堂 ----------
  {
    id: 'bigbluebutton',
    logo: '/oss/logos/bigbluebutton.png',
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
    logo: '/oss/logos/gibbon.png',
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
    logo: '/oss/logos/jupyterhub.png',
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
    logo: '/oss/logos/veyon.png',
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
  // 用 candidate() 写的条目只有许可证和推送日期，是 2026-10-09 从 GitHub 公开接口查的，部署、成本、注意事项都还没评估。
  // 电商零售和餐饮门店的条目 2026-10-13 已经评估成完整条目；医疗诊所、制造与仓储还是 candidate()。
  // 全部 confirmed: false，线上不显示。逐个评估并由作者确认后，改写成上面教育行业那样的完整条目。

  // 电商零售
  // 作者 2026-10-13 看过草稿后去掉了 CRMEB 和 mall（还有 AI 分类里的 Fay），三条候选已从这里删除，不要再加回来。
  // 同一天他定了一条标准：知名度不高的不放。看过星标和安装量的数据后，电商零售留 6 个：
  // WooCommerce、PrestaShop、Bagisto、Medusa、Saleor、Shopware。Vendure 和 Sylius 评估过但按这条标准删除了，不要再加回来；
  // 收银系统 Open Source Point of Sale 不再同时出现在电商零售下面，只留在餐饮门店。
  // 下面五条是 2026-10-13 评估的：许可证、README、官方文档和价格页都是当天读的，没有亲自部署。
  // 价格是当天页面上的数字，会变。全部 confirmed: false，等作者逐条确认。
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    logo: '/oss/logos/woocommerce.png',
    industry: 'ecommerce',
    uses: ['store'],
    what: '装在 WordPress 上的网店插件，带商品、订单、支付和后台，其余功能靠扩展加。',
    whatEn: 'A store plugin for WordPress with products, orders, payments and an admin; further features come as extensions.',
    repoUrl: `${GH}woocommerce/woocommerce`,
    homepage: 'https://woocommerce.com',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'GPL。仓库的许可证文件写的是 GPL 第 2 版或更高版本，插件说明里标的是 GPLv3。自己建站卖货没有额外义务；把改过的版本分发给别人时，要同样以 GPL 开源。',
        detailEn: 'GPL. The repository license file says GPL version 2 or later, while the plugin readme lists GPLv3. Running your own store adds no obligations. If you distribute a modified version, it must stay under the GPL.',
        sources: [
          license(`${GH}woocommerce/woocommerce/blob/trunk/license.txt`),
          src('插件说明', 'Plugin readme', `${GH}woocommerce/woocommerce/blob/trunk/plugins/woocommerce/readme.txt`),
        ],
      },
      alive: alive('2026-10-13', 'woocommerce/woocommerce'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '先要有一个 WordPress 站，在后台的插件页搜 WooCommerce，点安装、启用，然后跟着设置向导填店铺信息。官方的环境要求是 PHP 8.3 以上、MySQL 8.0 或 MariaDB 10.6 以上、支持 HTTPS、WordPress 内存上限 256MB 以上。WordPress 的版本，环境要求页写的是 6.9 以上，插件说明里写的是 7.0 以上，以插件说明为准。',
        detailEn: 'You need a WordPress site first. In its admin, search for WooCommerce on the plugins page, install and activate it, then follow the setup wizard. The stated requirements are PHP 8.3 or later, MySQL 8.0 or MariaDB 10.6 or later, HTTPS, and a WordPress memory limit of 256 MB or more. The requirements page says WordPress 6.9 or later while the plugin readme says 7.0 or later; go by the plugin readme.',
        sources: [
          src('安装文档', 'Install guide', 'https://woocommerce.com/document/installing-uninstalling-woocommerce/'),
          src('环境要求', 'Server requirements', 'https://woocommerce.com/document/server-requirements/'),
          src('插件说明', 'Plugin readme', `${GH}woocommerce/woocommerce/blob/trunk/plugins/woocommerce/readme.txt`),
        ],
      },
      cost: {
        verdict: 'caution',
        label: '核心免费，主机和扩展另算',
        labelEn: 'Free core; hosting and extensions are extra',
        short: '扩展另买',
        shortEn: 'Paid add-ons',
        detail: '插件免费，没有平台月费，也不按成交额抽成。官方价格页自己估的数：多数店铺的主机费每月 25 到 350 美元，扩展每个每年 29 到 299 美元。2026 年 10 月官方市场的标价：按周期扣款的 Subscriptions 每年 279 美元，预约用的 Bookings 每年 249 美元。刷卡手续费由你选的支付服务商另收。',
        detailEn: 'The plugin is free, with no platform fee and no revenue share. Woo’s own pricing page estimates hosting at $25 to $350 a month for most stores and extensions at $29 to $299 a year each. Marketplace prices in October 2026: Subscriptions for recurring billing $279 a year, Bookings $249 a year. Card processing fees are charged by whichever payment provider you choose.',
        sources: [
          src('价格', 'Pricing', 'https://woocommerce.com/pricing/'),
          src('Subscriptions 扩展', 'Subscriptions extension', 'https://woocommerce.com/products/woocommerce-subscriptions/'),
          src('Bookings 扩展', 'Bookings extension', 'https://woocommerce.com/products/woocommerce-bookings/'),
        ],
      },
      caveats: {
        verdict: 'caution',
        label: '它是 WordPress 的插件，不能单独运行',
        labelEn: 'It is a WordPress plugin, not a standalone system',
        detail: '用它就要一并维护 WordPress、主题和装上的各个插件。按周期扣款、预约这类功能不在免费的核心里，要到官方市场按年买扩展。README 写明 GitHub 仓库不受理使用上的问题：买了扩展的走官网的付费支持，其余到 WordPress.org 的社区论坛去问。',
        detailEn: 'Running it means maintaining WordPress, your theme and every plugin you add. Features such as recurring billing and bookings are not in the free core; you buy them as yearly extensions from the official marketplace. The README says the GitHub repository does not handle support requests: extension customers use the paid support portal, everyone else the community forum on WordPress.org.',
        sources: [readme('woocommerce/woocommerce'), src('价格', 'Pricing', 'https://woocommerce.com/pricing/')],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },
  {
    id: 'prestashop',
    name: 'PrestaShop',
    logo: '/oss/logos/prestashop.jpg',
    industry: 'ecommerce',
    uses: ['store'],
    what: '老牌的开源网店系统，带现成的店面和后台，功能靠模块和主题扩展。',
    whatEn: 'A long-established open-source online store with a ready storefront and back office, extended through modules and themes.',
    repoUrl: `${GH}PrestaShop/PrestaShop`,
    homepage: 'https://www.prestashop-project.org/',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '有条件',
        labelEn: 'With conditions',
        detail: '核心是 OSL-3.0，自带的模块和默认主题是 AFL-3.0。不改代码直接开店没有额外义务。OSL 第 5 条把“做成网络应用给别人用”也算作分发：改了核心又拿来对外开店，改过的版本要同样以 OSL-3.0 授权。许可证不包含商标的使用权，不能拿 PrestaShop 的名字给自己改出来的产品做宣传。',
        detailEn: 'The core is OSL-3.0; the bundled modules and default theme are AFL-3.0. Running a store on unmodified code adds no obligations. Section 5 of the OSL treats making the software available as a network application as distribution, so if you modify the core and run a public store on it, your modified version must be licensed under OSL-3.0 as well. The license grants no trademark rights: you cannot use the PrestaShop name to promote a product derived from it.',
        sources: [
          license(`${GH}PrestaShop/PrestaShop/blob/develop/docs/licenses/LICENSE.txt`),
          src('项目的许可说明', 'Project license guideline', 'https://www.prestashop-project.org/maintainers-guide/general-guidelines/license/'),
        ],
      },
      alive: alive('2026-10-12', 'PrestaShop/PrestaShop'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '从官方发布页下载压缩包传到服务器，建一个数据库，浏览器里跟着安装程序走；8 版的用户文档说，文件传完后多数情况五分钟左右就能开始配置。README 写明 GitHub 仓库里的源码只用于开发和预览，正式开店要用发布页的版本。环境是 Apache 2.4 或 Nginx、PHP 8.1 以上、MySQL 5.7 或 MariaDB 10.2 以上；官方说 Windows 也许能跑，但不在支持范围内。',
        detailEn: 'Download the zip from the official releases page, upload it, create a database and follow the installer in your browser; the version 8 user guide says most people can start configuring about five minutes after the upload. The README states that the source in the GitHub repository is for development and preview only, and a production shop should use the release package. It needs Apache 2.4 or Nginx, PHP 8.1 or later, and MySQL 5.7 or MariaDB 10.2 or later. Windows “might work” but is not actively supported.',
        sources: [
          src('系统要求', 'System requirements', 'https://devdocs.prestashop-project.org/9/basics/installation/system-requirements/'),
          src('安装指南（8 版用户文档）', 'Install guide (version 8 user docs)', 'https://docs.prestashop-project.org/v.8-documentation/getting-started/installing-prestashop'),
          readme('PrestaShop/PrestaShop'),
        ],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费。服务器要多大的内存，官方只说越多越好，没给具体数字，建议把每个脚本的内存上限设到 512M 以上。不想自己装，PrestaShop 公司有托管版：按年付每月 24 欧元，按月付每月 29 欧元，都不含税。页面写明托管版基于 PrestaShop 8，开源版已经出到 9。',
        detailEn: 'The software is free. On server RAM the docs only say “the more the merrier” and give no figure; they recommend a per-script memory limit of at least 512M. If you would rather not self-host, PrestaShop SA sells a hosted plan: €24 a month billed annually or €29 month to month, both excluding VAT. The page says the hosted plan is based on PrestaShop 8, while the open-source release is already at 9.',
        sources: [
          src('系统要求', 'System requirements', 'https://devdocs.prestashop-project.org/9/basics/installation/system-requirements/'),
          src('官方套餐', 'Official plans', 'https://prestashop.com/prestashop-offers/'),
          src('托管版', 'Hosted plan', 'https://prestashop.com/prestashop-offers/hosted/'),
        ],
      },
      caveats: {
        verdict: 'caution',
        label: '跨大版本升级等于重新建店',
        labelEn: 'A major-version upgrade means rebuilding the store',
        detail: '同一个大版本内（比如 9.0 到 9.1）用官方的更新模块升级，主题和模块照常能用。跨大版本，官方建议的做法是迁移：新装一个店，把商品、客户、订单这些数据搬过去，员工账号和权限要手工重建，模块一律先当作不兼容，逐个核对后再重装、重新配置。',
        detailEn: 'Within one major version (9.0 to 9.1, say) you update with the official Update Assistant module, and your theme and modules keep working. Across major versions the recommended route is migration: install a new store, move products, customers and orders over, recreate employee accounts and permissions by hand, and treat every module as incompatible until checked, then reinstall and reconfigure it.',
        sources: [src('更新与迁移', 'Updating and migrating', 'https://devdocs.prestashop-project.org/9/basics/keeping-up-to-date/')],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },
  {
    id: 'bagisto',
    name: 'Bagisto',
    logo: '/oss/logos/bagisto.png',
    industry: 'ecommerce',
    uses: ['store'],
    what: '基于 Laravel 的开源网店系统，带现成的店面和管理后台。',
    whatEn: 'An open-source online store built with Laravel, with a ready storefront and admin panel.',
    repoUrl: `${GH}bagisto/bagisto`,
    homepage: 'https://bagisto.com',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'MIT。可以商用、修改、闭源，保留版权声明即可。',
        detailEn: 'MIT. Commercial use, modification and closed-source use are all allowed; keep the copyright notice.',
        sources: [license(`${GH}bagisto/bagisto/blob/2.5/LICENSE`)],
      },
      alive: alive('2026-10-12', 'bagisto/bagisto'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '两条路。一条 Docker 命令起一个装好的店，官方镜像里数据库和初始数据都配好了；或者用 Composer 建项目，再跑一条安装命令，回答店铺地址、数据库、管理员账号几个问题。2.5 版要 PHP 8.4、Composer 2，数据库用 MySQL 8.0、MariaDB 10.11 或 PostgreSQL 16。官网下载页上写的 PHP 8.3 是旧的，以文档和代码为准。',
        detailEn: 'Two routes. A single Docker command starts a fully installed store, with the database and seed data baked into the official image; or create the project with Composer and run one install command that asks for the store URL, database and admin account. Version 2.5 needs PHP 8.4 and Composer 2, with MySQL 8.0, MariaDB 10.11 or PostgreSQL 16. The download page still says PHP 8.3; go by the docs and the code.',
        sources: [
          src('安装文档', 'Install guide', 'https://devdocs.bagisto.com/getting-started/installation.html'),
          src('环境要求', 'System requirements', 'https://devdocs.bagisto.com/getting-started/before-you-start.html'),
          readme('bagisto/bagisto'),
        ],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费。官网下载页写的配置是 4GB 内存以上；开发文档没有对内存提要求，只给了官方镜像里的 PHP 设置，内存上限是 512M。不想自己装，官方的云托管每月 25 美元起。',
        detailEn: 'The software is free. The download page lists 4 GB of RAM or more; the developer docs set no RAM requirement and only show the PHP settings shipped in the official image, with a 512M memory limit. If you would rather not self-host, the official cloud hosting starts at $25 a month.',
        sources: [
          src('下载页', 'Download page', 'https://bagisto.com/en/download/'),
          src('环境要求', 'System requirements', 'https://devdocs.bagisto.com/getting-started/before-you-start.html'),
          src('云托管', 'Cloud hosting', 'https://bagisto.com/en/cloud-hosting/'),
        ],
      },
      caveats: {
        verdict: 'caution',
        label: '多商户不在开源仓库里，要另买',
        labelEn: 'Multi-vendor is a paid extension, not in the repository',
        detail: 'README 把它介绍成“电商和多商户平台”，但多商户是开发商 Webkul 另卖的扩展：2026 年 10 月官方商店标价 449 美元，带 3 个月支持，延长支持另加钱。开源仓库的模块目录里没有这一块。README 里列的收银、多租户等也都链到官网的产品页，是不是都要付费，没有逐个核对。',
        detailEn: 'The README introduces it as an “eCommerce and multi-vendor marketplace platform”, but multi-vendor is an extension sold separately by Webkul, the company behind it: $449 in the official store in October 2026, with three months of support and longer support at extra cost. The repository’s package directory does not contain it. The POS, multi-tenant and other items in the README also link to product pages; whether each is paid has not been checked.',
        sources: [
          readme('bagisto/bagisto'),
          src('多商户扩展', 'Multi-vendor extension', 'https://store.webkul.com/laravel-multi-vendor-marketplace.html'),
          src('仓库的模块目录', 'Packages in the repository', `${GH}bagisto/bagisto/tree/2.5/packages/Webkul`),
        ],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },
  {
    id: 'medusa',
    name: 'Medusa',
    logo: '/oss/logos/medusa.jpg',
    industry: 'ecommerce',
    uses: ['engine'],
    what: '面向开发者的电商后端和管理后台，用 TypeScript 写，店面自己接或者用官方的 Next.js 模板。',
    whatEn: 'A commerce backend and admin for developers, written in TypeScript; you build the storefront or start from the official Next.js starter.',
    repoUrl: `${GH}medusajs/medusa`,
    homepage: 'https://medusajs.com',
    facts: {
      commercial: {
        verdict: 'good',
        label: '核心可以商用',
        labelEn: 'Yes, for the core',
        detail: 'MIT。可以商用、修改、闭源，保留版权声明即可。例外是仓库里标明的企业版部分（角色权限和单点登录），那些不在 MIT 范围内，见下面的注意事项。',
        detailEn: 'MIT. Commercial use, modification and closed-source use are all allowed; keep the copyright notice. The exception is the Enterprise Edition material identified in the repository (role-based access control and single sign-on), which is not under MIT; see the caveat below.',
        sources: [
          license(`${GH}medusajs/medusa/blob/develop/LICENSE`),
          src('企业版许可', 'Enterprise license', `${GH}medusajs/medusa/blob/develop/ENTERPRISE-LICENSE.md`),
        ],
      },
      alive: alive('2026-10-10', 'medusajs/medusa'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '用 create-medusa-app 这条命令建项目，过程中可以顺带装官方的 Next.js 店面模板。本机要 Node.js 20.19 或 22.12 以上的长期支持版、Git，和一个在运行的 PostgreSQL。上线时要部署四样：PostgreSQL、Redis、处理请求的服务进程、跑后台任务的进程。',
        detailEn: 'You scaffold a project with the create-medusa-app command, which can also install the official Next.js storefront starter. Locally it needs an LTS Node.js at 20.19 or 22.12 or later, Git and a running PostgreSQL. In production you deploy four things: PostgreSQL, Redis, the application in server mode and the application in worker mode.',
        sources: [
          src('安装文档', 'Install guide', 'https://docs.medusajs.com/learn/installation'),
          src('部署文档', 'Deployment guide', 'https://docs.medusajs.com/learn/deployment/general'),
        ],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费。官方的部署文档要求主机至少 2GB 内存，另外要有 PostgreSQL 和 Redis。官方托管 Medusa Cloud 分每月 29、99、299 美元起三档，不按成交额抽成。',
        detailEn: 'The software is free. The deployment guide asks for a host with at least 2 GB of RAM, plus PostgreSQL and Redis. The managed Medusa Cloud has plans from $29, $99 and $299 a month, with no fee on sales volume.',
        sources: [
          src('部署文档', 'Deployment guide', 'https://docs.medusajs.com/learn/deployment/general'),
          src('价格', 'Pricing', 'https://medusajs.com/pricing/'),
        ],
      },
      caveats: {
        verdict: 'caution',
        label: '员工分权限和单点登录要买企业版',
        labelEn: 'Staff roles and single sign-on need the Enterprise license',
        detail: '项目是开放核心的做法：角色权限（RBAC）和单点登录（SSO）的代码虽然在同一个仓库里，但另有一份企业版许可，没有和 Medusa 公司签商业协议就不能用。许可里写明，打开企业功能的开关就等于声明自己持有协议。价格页上这两项只在“企业版”一档，价格面议。另外它是给开发者的引擎，店面要自己接。',
        detailEn: 'The project is open core: the code for role-based access control (RBAC) and single sign-on (SSO) sits in the same repository but under a separate Enterprise license, and cannot be used without a commercial agreement with MedusaJS, Inc. The license states that enabling an Enterprise feature flag is a representation that you hold such an agreement. On the pricing page both appear only in the Enterprise tier, priced on request. It is also a developer’s engine: the storefront is yours to build.',
        sources: [
          src('企业版许可', 'Enterprise license', `${GH}medusajs/medusa/blob/develop/ENTERPRISE-LICENSE.md`),
          readme('medusajs/medusa'),
          src('价格', 'Pricing', 'https://medusajs.com/pricing/'),
        ],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },
  {
    id: 'saleor',
    name: 'Saleor',
    logo: '/oss/logos/saleor.png',
    industry: 'ecommerce',
    uses: ['engine'],
    what: '只提供 GraphQL 接口的电商后端，用 Python 写；管理后台和店面是另外两个仓库。',
    whatEn: 'An API-only commerce backend with a GraphQL interface, written in Python; the dashboard and storefront live in two separate repositories.',
    repoUrl: `${GH}saleor/saleor`,
    homepage: 'https://saleor.io',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'BSD-3-Clause。可以商用、修改、闭源，保留版权声明；不能用项目或贡献者的名字给自己的产品背书。README 写明只有一个版本，没有功能上的区分和商业限制。',
        detailEn: 'BSD-3-Clause. Commercial use, modification and closed-source use are all allowed; keep the copyright notice, and do not use the project’s or contributors’ names to endorse your product. The README says there is a single version, with no feature fragmentation or commercial limitations.',
        sources: [license(`${GH}saleor/saleor/blob/main/LICENSE`), readme('saleor/saleor')],
      },
      alive: alive('2026-10-12', 'saleor/saleor'),
      deploy: {
        verdict: 'bad',
        label: '门槛高',
        labelEn: 'Hard',
        detail: '本机试用：克隆 saleor-platform，用 Docker Compose 起整套，文档要求给 Docker 至少 5GB 内存；这个仓库写明只用于本地开发，不能拿去上线。正式部署官方推荐用 Docker 镜像，要自己搭起接口服务、后台任务进程、定时任务进程、PostgreSQL、Redis 和对象存储，管理后台和店面另外部署。不用 Docker 装到 Linux 上只有社区维护的脚本，官方不保证质量。',
        detailEn: 'To try it locally you clone saleor-platform and start everything with Docker Compose, giving Docker at least 5 GB of memory; that repository is stated to be for local development only, not for production. For production the recommended route is the official Docker image, and you assemble the API service, background workers, a task scheduler, PostgreSQL, Redis and object storage yourself, then deploy the dashboard and storefront separately. Installing on Linux without Docker relies on community-maintained scripts that Saleor does not vouch for.',
        sources: [
          src('Docker 安装', 'Docker Compose setup', 'https://docs.saleor.io/setup/docker-compose'),
          src('架构', 'Architecture', 'https://docs.saleor.io/setup/architecture'),
          src('Docker 镜像', 'Docker images', 'https://docs.saleor.io/setup/docker-images'),
          src('装到 Linux', 'Deploying to Linux', 'https://docs.saleor.io/setup/deploy-linux'),
        ],
      },
      cost: {
        verdict: 'caution',
        label: '自建没给配置，托管每月 1,599 美元起',
        labelEn: 'No sizing for self-hosting; hosted from $1,599 a month',
        short: '看托管',
        shortEn: 'Depends',
        detail: '软件免费。正式环境要多大的服务器，官方文档没有给数字，只有本机跑整套时“给 Docker 至少 5GB 内存”这一条可以参考。官方托管 Saleor Cloud：沙盒免费，但只限非商业用途；商用最低一档每月 1,599 美元，含每月 20 万美元成交额，超出的部分抽 0.8%；再上一档每月 3,999 美元。',
        detailEn: 'The software is free. The docs give no server sizing for production; the only figure is the 5 GB of memory Docker needs to run the full stack locally. On the managed Saleor Cloud, sandboxes are free but for non-commercial use only; the lowest commercial plan is $1,599 a month covering $200,000 in monthly sales, with 0.8% on orders beyond that, and the next plan is $3,999 a month.',
        sources: [
          src('Docker 安装', 'Docker Compose setup', 'https://docs.saleor.io/setup/docker-compose'),
          src('价格', 'Pricing', 'https://saleor.io/pricing'),
        ],
      },
      caveats: {
        verdict: 'caution',
        label: '官方自己说，小团队用会偏复杂',
        labelEn: 'By its own account, heavier than a small team may want',
        detail: 'README 里有一段“代价是什么”：如果你是一个开发者，服务一家流量不大、不要求全天不停机的小生意，这种拆成多个服务的做法会比 WordPress 那一类方案复杂。它只有接口，加功能靠另外部署的应用和 webhook，不是装插件。另外，自建的实例默认会向官方发送匿名的使用统计（版本、商品等的数量、币种列表），设 SEND_USAGE_TELEMETRY=false 可以关掉。',
        detailEn: 'The README has a section on tradeoffs: if you are a single developer working with a small business without high traffic or a need for round-the-clock availability, this service-oriented approach may feel more complex than the WordPress style. It is API-only, so you extend it with separately deployed apps and webhooks rather than plugins. Self-hosted instances also send anonymous usage telemetry by default (version, counts of products and similar entities, configured currencies); set SEND_USAGE_TELEMETRY=false to turn it off.',
        sources: [readme('saleor/saleor'), src('使用统计', 'Usage telemetry', 'https://docs.saleor.io/setup/usage-telemetry')],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },

  // 下面这条是作者 2026-10-13 点名要查的，当天读了许可证、README、官方文档和价格页，没有亲自部署。
  // 价格是当天页面上的数字，会变。全部 confirmed: false，等作者逐条确认。
  {
    id: 'shopware',
    name: 'Shopware',
    logo: '/oss/logos/shopware.png',
    industry: 'ecommerce',
    uses: ['store'],
    what: '德国的开源网店系统，带现成的店面和后台，官方商店里有三千多个扩展。',
    whatEn: 'An open-source online store platform from Germany with a ready storefront and admin, and more than 3,100 extensions in its store.',
    repoUrl: `${GH}shopware/shopware`,
    homepage: 'https://www.shopware.com/en/',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '可以商用，年成交额过 100 万欧元要转付费',
        labelEn: 'Yes, until €1M a year in sales',
        detail: '代码是 MIT。但 2025 年 3 月起官方加了一条“公平使用政策”：用免费版、年成交额超过 100 万欧元的商家，要订付费套餐才能继续用 Shopware 账号和官方商店，否则买不了新扩展，已有扩展也收不到更新。官方说 MIT 许可本身不受影响。',
        detailEn: 'The code is MIT. Since March 2025 a Fair Usage Policy applies on top: Community Edition merchants with more than €1 million in annual gross merchandise value must take a paid plan to keep access to the Shopware Account and Store; without it they cannot buy new extensions or receive updates for existing ones. Shopware says the MIT license itself is unaffected.',
        sources: [
          license(`${GH}shopware/shopware/blob/trunk/LICENSE`),
          src('公平使用政策', 'Fair Usage Policy', 'https://www.shopware.com/en/news/fair-usage-policy-community-edition/'),
        ],
      },
      alive: alive('2026-10-12', 'shopware/shopware'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '官方推荐用 Docker 装，只支持 Unix 类系统（Windows 要走 WSL 2 或 Docker Desktop）。环境是 PHP 8.2 以上（推荐 8.4）、内存上限至少 512M，加 MariaDB 或 MySQL。README 说另有网页安装程序，也有预装好的主机商。',
        detailEn: 'The recommended install is Docker-based and only Unix-like systems are supported (Windows via WSL 2 or Docker Desktop). It needs PHP 8.2 or later (8.4 recommended) with a memory limit of at least 512M, plus MariaDB or MySQL. The README also mentions a web-based installer and hosting partners offering it pre-installed.',
        sources: [
          src('推荐环境', 'Recommended stack', 'https://developer.shopware.com/docs/guides/hosting/'),
          src('系统要求', 'System requirements', 'https://developer.shopware.com/docs/guides/installation/system-requirements.html'),
        ],
      },
      cost: {
        verdict: 'caution',
        label: '机器要求高，付费版每月 600 欧元起',
        labelEn: 'Heavier on hardware; paid plans from €600 a month',
        short: '偏高',
        shortEn: 'Higher',
        detail: '免费版软件不花钱。官方的系统要求页写的是四核、8GB 内存起、推荐 16GB、约 10GB 磁盘。付费套餐 Rise 每月 600 欧元起、Evolve 每月 2,400 欧元起（不含税），按成交额定价。免费版不能用官方的云托管，安装和维护自己负责。',
        detailEn: 'The Community Edition is free. The system requirements page lists a quad-core CPU, 8 GB of RAM minimum with 16 GB recommended, and about 10 GB of disk. Paid plans start at €600 a month for Rise and €2,400 a month for Evolve, excluding VAT, priced on gross merchandise value. The free edition is not offered on Shopware Cloud, so setup and maintenance are yours.',
        sources: [
          src('系统要求', 'System requirements', 'https://developer.shopware.com/docs/guides/installation/system-requirements.html'),
          src('价格', 'Pricing', 'https://www.shopware.com/en/pricing/'),
        ],
      },
      caveats: {
        verdict: 'caution',
        label: '用免费版也要每年上报成交额',
        labelEn: 'Even free users must report sales yearly',
        detail: '公平使用政策要求所有免费版用户上报成交额，没到 100 万欧元的也要报：装官方的上报扩展，或者每年至少填一次表。成交额按不含税算，运费计入，折扣扣除，退货不扣。',
        detailEn: 'The Fair Usage Policy requires every Community Edition user to report gross merchandise value, including those under €1 million: install the official reporting extension, or submit a form at least once a year. The figure is net of tax, includes shipping, subtracts discounts and does not subtract returns.',
        sources: [src('公平使用政策', 'Fair Usage Policy', 'https://www.shopware.com/en/news/fair-usage-policy-community-edition/')],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },

  // 餐饮门店
  // 下面两条是 2026-10-13 评估的：许可证、README、安装文档和价格页都是当天读的，没有亲自部署。
  // 同一天还评估过 NexoPOS 和 URY，作者看过后要求去掉，条目已从这里删除，不要再加回来。
  // 价格是当天页面上的数字，会变。全部 confirmed: false，等作者逐条确认。
  // 两条都只在餐饮门店。Open Source Point of Sale 原来同时出现在电商零售下面，作者 2026-10-13 按知名度标准去掉了那份显示。
  {
    id: 'opensourcepos',
    name: 'Open Source Point of Sale',
    industry: 'restaurant',
    uses: ['pos'],
    what: '网页版的收银系统，带库存、进货、客户、报表和小票打印。',
    whatEn: 'A web-based point of sale with inventory, receivings, customers, reports and receipt printing.',
    repoUrl: `${GH}opensourcepos/opensourcepos`,
    homepage: 'http://www.opensourcepos.org',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '可以商用，页脚不能动',
        labelEn: 'Yes, but the footer stays',
        detail: 'MIT 之外加了一条：每个页面底部带版本号、提交号和 opensourcepos.org 链接的署名必须保留、必须看得见、不能改，也不能声称软件归自己所有。开店自己用没有限制；想换成自己的牌子卖给别人，这一条过不去。',
        detailEn: 'MIT terms with an addition: the footer signature carrying the version, commit hash and a link to opensourcepos.org must be kept, must be visible on every page and cannot be modified, and you cannot claim ownership of the software. Running it in your own shop is unrestricted. Reselling it under your own brand is ruled out by that clause.',
        sources: [license(`${GH}opensourcepos/opensourcepos/blob/master/LICENSE`), src('README 的许可说明', 'License section of the README', `${GH}opensourcepos/opensourcepos#-license`)],
      },
      alive: alive('2026-10-12', 'opensourcepos/opensourcepos'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '下载发布包、建一个 MySQL 数据库、把文件传到服务器、在 .env 里填数据库账号，浏览器打开后表结构自动建好。环境是 PHP 8.2 到 8.4、MySQL 5.7 或 MariaDB 10.x、Apache 2.4（Nginx 也行）。正式使用必须在 .env 里写上允许访问的域名，不写程序起不来。官方说自带的 Docker 配置不适合直接用于生产。',
        detailEn: 'Download a release, create a MySQL database, upload the files, put the database credentials in .env, and open it in a browser; the schema is created on first access. It needs PHP 8.2 to 8.4, MySQL 5.7 or MariaDB 10.x, and Apache 2.4 (Nginx works too). For production you must list the allowed hostnames in .env or the app will not start. The bundled Docker Compose setup is described as not suited for production.',
        sources: [src('安装文档', 'Install guide', `${GH}opensourcepos/opensourcepos/blob/master/INSTALL.md`)],
      },
      cost: {
        verdict: 'good',
        label: '低',
        labelEn: 'Low',
        detail: '软件免费。官方给的最低配置是 512MB 内存、建议 1GB 以上，程序本身占 1GB 磁盘，树莓派 3 和 4 也能跑。另外要买扫码枪和小票打印机。',
        detailEn: 'The software is free. The stated minimum is 512 MB of RAM with 1 GB or more recommended, plus 1 GB of disk for the application; Raspberry Pi 3 and 4 are supported. You also buy a barcode scanner and a receipt printer.',
        sources: [src('最低服务器要求', 'Minimum server requirements', `${GH}opensourcepos/opensourcepos/wiki/Minimum-Server-Requirements`)],
      },
      caveats: {
        verdict: 'caution',
        label: '不支持刷卡机',
        labelEn: 'No card reader support',
        detail: '官方的硬件清单写明不支持刷卡机；钱箱不在支持范围内，只能靠部分打印机带动；用手机摄像头扫码还不支持。打印走浏览器，效果取决于浏览器和操作系统。',
        detailEn: 'The official hardware list says credit card readers are not supported. Cash drawers are out of scope and only open if your printer can trigger them, and scanning barcodes with a phone camera is not supported yet. Printing goes through the browser, so results depend on the browser and operating system.',
        sources: [src('支持的硬件', 'Supported hardware', `${GH}opensourcepos/opensourcepos/wiki/Supported-hardware-datasheet`)],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: false,
  },
  {
    id: 'tastyigniter',
    name: 'TastyIgniter',
    industry: 'restaurant',
    uses: ['ordering'],
    what: '餐厅自己的在线点餐和订座网站，带后台管理，支持多家分店。',
    whatEn: 'A restaurant’s own online ordering and table reservation site, with an admin back office and multi-location support.',
    repoUrl: `${GH}tastyigniter/TastyIgniter`,
    homepage: 'https://tastyigniter.com',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'MIT。可以商用、修改、闭源，保留版权声明即可。',
        detailEn: 'MIT. Commercial use, modification and closed-source use are all allowed; keep the copyright notice.',
        sources: [license(`${GH}tastyigniter/TastyIgniter/blob/4.x/LICENSE.md`)],
      },
      alive: alive('2026-10-12', 'tastyigniter/TastyIgniter'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '有安装向导：下载压缩包传到网站根目录，浏览器打开 setup.php 跟着走。环境是 PHP 8.3 以上、MySQL 8.0 或 MariaDB 10.6 以上、Apache 或 Nginx。装完要加一条定时任务；以后装扩展要用 Composer。',
        detailEn: 'There is a setup wizard: upload the zip to your web root and open setup.php in a browser. It needs PHP 8.3 or later, MySQL 8.0 or MariaDB 10.6 or later, and Apache or Nginx. Afterwards you add one cron entry, and installing extensions later requires Composer.',
        sources: [src('安装文档', 'Install guide', 'https://tastyigniter.com/docs/installation')],
      },
      cost: {
        verdict: 'caution',
        label: '核心免费，部分扩展按年付费',
        labelEn: 'Free core; some extensions are billed yearly',
        short: '扩展另买',
        shortEn: 'Paid add-ons',
        detail: '核心免费，在线点餐、订座、多分店都在里面，Stripe、PayPal、Mollie、Authorize.net、Square 这几种支付官方说开箱就支持。2026 年 10 月官方市场的标价：桌边扫码点餐每年 49 美元，堂食桌台管理每年 49 美元，Star 云打印每年 50 美元，自动打单每年 75 美元；厨房屏是免费的。服务器要多大，文档没有给数字。',
        detailEn: 'The core is free and includes online ordering, reservations and multiple locations; Stripe, PayPal, Mollie, Authorize.net and Square are described as supported out of the box. Marketplace prices in October 2026: Table Ordering $49 a year, Dine-In Management $49 a year, Star CloudPRNT printing $50 a year, DocketPrint automatic order printing $75 a year; Kitchen Display is free. The docs give no figure for server size.',
        sources: [src('功能介绍', 'Features', 'https://tastyigniter.com/features'), src('官方市场', 'Marketplace', 'https://tastyigniter.com/marketplace')],
      },
      caveats: {
        verdict: 'caution',
        label: '它不是收银系统',
        labelEn: 'It is not a point of sale',
        detail: '它做的是顾客在网上下单和订座，不是店里柜台的收银。官方的功能页把收银写成要从扩展市场另外加的对接，桌边点餐和堂食桌台管理也是付费扩展。店里要收银，得另配一套。',
        detailEn: 'It handles customers ordering and booking online, not the till at your counter. The features page describes POS as an integration you add from the extension marketplace, and table ordering and dine-in management are paid extensions. For in-store checkout you need a separate system.',
        sources: [src('功能介绍', 'Features', 'https://tastyigniter.com/features'), src('官方市场', 'Marketplace', 'https://tastyigniter.com/marketplace')],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: false,
  },

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

  // AI：实时数字人。2026-10-10 第一批读者（教育行业的老板和领导）提出的需求：教育和电商都要用数字人，只按行业分会漏掉。
  // 所以单独设了 AI 分类。起初还让它们同时出现在教育和电商零售下面，作者 2026-10-13 看过后去掉了：数字人只留在 AI 分类，不要再挂到别的行业下。
  // 作者 2026-10-13 定：只有许可证和推送日期、其余“待核对”“待评估”的五个候选（Duix Mobile、Linly-Talker、VideoChat、
  // Open-LLM-VTuber、awesome-digital-human-live2d）从这里删除；“作者实践过”的标签也去掉，不要再给条目标 handsOn。
  // 下面两条的内容是 Claude 2026-10-10 从 README 和官方文档里查的，不是作者的实测记录。
  {
    id: 'livetalking',
    name: 'LiveTalking',
    industry: 'ai',
    uses: ['avatar'],
    what: '实时交互的流式数字人引擎：输入文字或音频，数字人对口型说话，画面推到浏览器或直播平台。',
    whatEn: 'A real-time streaming digital human engine: feed it text or audio and the avatar lip-syncs, streamed to a browser or a live platform.',
    repoUrl: `${GH}lipku/LiveTalking`,
    homepage: 'https://www.livetalking.ai',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '可以商用，视频要带水印',
        labelEn: 'Yes, with a watermark on videos',
        detail: 'Apache-2.0，可以商用和二次开发。README 另有一条声明：基于它做的视频发到 B 站、视频号、抖音这些平台，要带上 LiveTalking 的水印和标识。',
        detailEn: 'Apache-2.0, so commercial use and modification are allowed. The README adds a statement: videos made with it and published on platforms such as Bilibili, WeChat Channels or Douyin must carry the LiveTalking watermark and logo.',
        sources: [license(`${GH}lipku/LiveTalking/blob/main/LICENSE`), src('README 声明', 'Statement in the README', `${GH}lipku/LiveTalking#readme`)],
      },
      alive: alive('2026-10-09', 'lipku/LiveTalking'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '官方测试环境是 Ubuntu 22.04、Python 3.12、CUDA 12.8。步骤是装依赖、从网盘下载模型、一条命令启动。官方的常见问题页列了十二条安装报错，多数是依赖版本冲突。另有 Windows 整合包和云上的现成镜像。',
        detailEn: 'Tested by the authors on Ubuntu 22.04, Python 3.12 and CUDA 12.8. You install dependencies, download models from a cloud drive, and start it with one command. The official FAQ lists twelve install errors, mostly dependency version conflicts. A Windows bundle and ready-made cloud images also exist.',
        sources: [readme('lipku/LiveTalking'), src('常见问题', 'FAQ (Chinese)', 'https://doc.livetalking.ai/docs/faq/')],
      },
      cost: {
        verdict: 'caution',
        label: '要一块显卡',
        labelEn: 'Needs a GPU',
        short: '要显卡',
        shortEn: 'Needs a GPU',
        detail: '软件免费，钱花在显卡上。官方给的数字：wav2lip 模型推荐 RTX 3060 以上，musetalk 模型推荐 RTX 3080Ti 以上。同时说话的路数取决于显卡，不说话时的路数取决于 CPU。',
        detailEn: 'The software is free; the GPU is the cost. The authors recommend an RTX 3060 or better for the wav2lip model and an RTX 3080 Ti or better for musetalk. How many avatars can speak at once depends on the GPU; idle sessions depend on the CPU.',
        sources: [src('README 性能指标', 'Performance section of the README', `${GH}lipku/LiveTalking#readme`)],
      },
      caveats: {
        verdict: 'caution',
        label: '语音输入要自己搭识别服务',
        labelEn: 'Voice input needs your own recognition service',
        detail: '开源版带语音输入的页面，但识别要自己解决：搭一个 FunASR 服务，或者用浏览器自带的语音识别。唤醒词打断、全双工对话，以及现成的云端语音识别接入在付费的商用版里，价格文档没写，要联系作者。',
        detailEn: 'The open edition ships a voice-input page, but recognition is on you: run a FunASR service, or use the browser’s built-in speech recognition. Wake-word interruption, full-duplex conversation and ready-made cloud speech recognition are in the paid commercial edition; the docs give no price and say to contact the author.',
        sources: [
          src('使用说明 3.7 语音输入', 'Usage guide, voice input (Chinese)', 'https://doc.livetalking.ai/docs/usage/'),
          src('商用版说明', 'Commercial edition page (Chinese)', 'https://doc.livetalking.ai/docs/service/'),
        ],
      },
    },
    needs: {
      verdict: 'caution',
      label: '显卡、语音合成，对话还要大模型和语音识别',
      labelEn: 'A GPU and text-to-speech; conversation also needs an LLM and speech recognition',
      detail: '显卡必须有。语音合成可以用免费的 EdgeTTS，也可以自己搭 GPT-SoVITS 或 CosyVoice，或者用腾讯云的接口（要 API key）。要让它自己对话，再接一个大模型，支持通义千问和 OpenAI 兼容的接口（要 API key）。要用语音提问，还得有一个 FunASR 识别服务，或者用浏览器自带的识别。服务器要开放 TCP 8010 端口和 UDP 端口。',
      detailEn: 'A GPU is required. For speech you can use the free EdgeTTS, host GPT-SoVITS or CosyVoice yourself, or call Tencent Cloud (needs an API key). For it to hold a conversation, add an LLM: Qwen and OpenAI-compatible endpoints are supported (needs an API key). For spoken questions you also need a FunASR recognition service, or the browser’s built-in recognition. The server must expose TCP port 8010 and UDP ports.',
      sources: [readme('lipku/LiveTalking'), src('使用说明', 'Usage guide (Chinese)', 'https://doc.livetalking.ai/docs/usage/')],
    },
    checkedAt: '2026-10-10',
    confirmed: false,
  },
  {
    id: 'openavatarchat',
    name: 'OpenAvatarChat',
    industry: 'ai',
    uses: ['avatar'],
    what: '模块化的数字人对话系统：语音识别、大模型、语音合成、数字人形象四块都可以换。',
    whatEn: 'A modular digital human chat system: speech recognition, the LLM, text-to-speech and the avatar can each be swapped.',
    repoUrl: `${GH}HumanAIGC-Engineering/OpenAvatarChat`,
    homepage: 'https://humanaigc-engineering.github.io/OpenAvatarChat/',
    facts: {
      commercial: {
        // 2026-10-12 逐个核对了所用模型的许可。SenseVoice 一项是照 issue 里的原话写的，许可方的最终确认出来后要回来改。
        verdict: 'caution',
        label: '可以商用，有两个模型要留意',
        labelEn: 'Yes, with two models to watch',
        detail: '项目本身是 Apache-2.0。它用到的模型里，LiteAvatar 是 MIT，LAM 和 CosyVoice 是 Apache-2.0，MuseTalk 的代码是 MIT、README 写明训练好的模型可以商用。两处要留意：语音识别用的 SenseVoice，权重走的是 FunASR 模型协议，要求注明出处并保留模型名，协议原文没有提商用；维护者在 issue 里答复过可以商用，但 2026 年 9 月又注明这还不是许可方的最终确认。FlashHead 的模型包里有一个 Open-RAIL-M 许可的组件，只用 Pro 版本的话整套是 Apache-2.0。',
        detailEn: 'The project itself is Apache-2.0. Of the models it uses, LiteAvatar is MIT, LAM and CosyVoice are Apache-2.0, and MuseTalk has MIT code with a README stating that the trained model may be used commercially. Two need care. SenseVoice, used for speech recognition, ships its weights under the FunASR model license, which requires attribution and keeping the model name and does not mention commercial use; a maintainer answered in an issue that commercial use is permitted, and in September 2026 the same thread was marked as not yet the license owner’s final confirmation. The FlashHead model archive includes one component under Open-RAIL-M; with the Pro variant alone, the whole workflow is Apache-2.0.',
        sources: [
          license(`${GH}HumanAIGC-Engineering/OpenAvatarChat/blob/main/LICENSE`),
          src('MuseTalk 的许可说明', 'MuseTalk license notes', `${GH}TMElyralab/MuseTalk#disclaimerlicense`),
          src('FunASR 模型协议', 'FunASR model license', `${GH}modelscope/FunASR/blob/main/MODEL_LICENSE`),
          src('SenseVoice 许可的讨论', 'SenseVoice license discussion', `${GH}QwenAudio/SenseVoice/issues/334`),
          src('FlashHead 各组件的许可', 'FlashHead component licenses', 'https://huggingface.co/Soul-AILab/SoulX-FlashHead-1_3B'),
        ],
      },
      alive: alive('2026-07-31', 'HumanAIGC-Engineering/OpenAvatarChat'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '要 Python 3.11，显卡驱动要支持 CUDA 12.8。用 uv 分三步：装依赖、下载模型、启动。也可以用 Docker，要先装 NVIDIA 的容器工具，启动后访问 https://localhost:8282 。',
        detailEn: 'It needs Python 3.11 and an NVIDIA driver that supports CUDA 12.8. With uv it is three steps: install dependencies, download models, start. Docker also works once the NVIDIA Container Toolkit is installed; the app is then served at https://localhost:8282.',
        sources: [
          src('快速开始', 'Getting started (Chinese)', 'https://humanaigc-engineering.github.io/OpenAvatarChat/getting-started/'),
          src('Docker 部署', 'Docker guide (Chinese)', 'https://humanaigc-engineering.github.io/OpenAvatarChat/getting-started/docker.html'),
        ],
      },
      cost: {
        verdict: 'caution',
        label: '显卡，或者按接口用量付费',
        labelEn: 'A GPU, or pay per API call',
        short: '看配法',
        shortEn: 'Depends',
        detail: '软件免费。官方说 2D 形象对设备要求较低，数字人推理在 i9-13980HX 的 CPU 上能到 30 帧。语音识别、大模型、语音合成改走云端接口，可以大幅降低对机器的要求，换成按接口用量付费。具体要多少显存，文档没有给数字。',
        detailEn: 'The software is free. The docs say the 2D avatar is light on hardware and that avatar inference reaches 30 FPS on an i9-13980HX CPU. Moving speech recognition, the LLM and text-to-speech to cloud APIs lowers the hardware needs a lot, in exchange for paying per call. The docs give no figure for GPU memory.',
        sources: [
          src('项目介绍', 'Introduction (Chinese)', 'https://humanaigc-engineering.github.io/OpenAvatarChat/guide/introduction.html'),
          src('LiteAvatar 模式', 'LiteAvatar mode (Chinese)', 'https://humanaigc-engineering.github.io/OpenAvatarChat/getting-started/liteavatar.html'),
        ],
      },
      caveats: {
        verdict: 'caution',
        label: '并发的说法文档前后不一',
        labelEn: 'The docs disagree on concurrency',
        detail: 'README 的更新记录说 LiteAvatar 已经支持单机多路会话，常见问题页却写它不支持多路并发，以哪个为准要实测。官方给的平均响应时间是 2.2 秒。常见问题还提到，AutoDL 的个人用户开不了自定义端口，没法远程访问。',
        detailEn: 'The release notes in the README say LiteAvatar supports multiple sessions on one machine, while the FAQ says it does not support concurrency; test it to find out. The stated average response time is 2.2 seconds. The FAQ also notes that personal AutoDL accounts cannot open custom ports, so remote access does not work there.',
        sources: [readme('HumanAIGC-Engineering/OpenAvatarChat'), src('常见问题', 'FAQ (Chinese)', 'https://humanaigc-engineering.github.io/OpenAvatarChat/community/faq')],
      },
    },
    needs: {
      verdict: 'caution',
      label: '阿里云百炼的 API key，或者本地大模型',
      labelEn: 'An Alibaba Cloud Bailian API key, or a local model',
      detail: '默认配置用阿里云百炼的接口做大模型和语音合成，要一个 DASHSCOPE_API_KEY；语音识别用本地的 SenseVoice。不想走云端，文档说也支持本地的多模态模型。要远程访问，可以用它自带的 coturn 一起启动。',
      detailEn: 'The default preset uses Alibaba Cloud Bailian for the LLM and text-to-speech, which needs a DASHSCOPE_API_KEY; speech recognition runs locally with SenseVoice. If you would rather stay off the cloud, the docs say local multimodal models are supported too. For remote access, the bundled coturn can be started alongside it.',
      sources: [src('LiteAvatar 模式', 'LiteAvatar mode (Chinese)', 'https://humanaigc-engineering.github.io/OpenAvatarChat/getting-started/liteavatar.html'), readme('HumanAIGC-Engineering/OpenAvatarChat')],
    },
    checkedAt: '2026-10-10',
    confirmed: false,
  },
];

export const OSS_PROJECTS: OssProject[] = ALL_PROJECTS.filter((p) => p.confirmed || SHOW_DRAFTS);

// 一个分类下的项目：本来就属于它的，加上标了“也出现在这里”的
export function ossProjectsOf(industry: OssIndustry): OssProject[] {
  return OSS_PROJECTS.filter((p) => p.industry === industry || (p.alsoIn ?? []).includes(industry));
}

export function ossIndustry(id: string): IndustryCopy | undefined {
  return OSS_INDUSTRIES.find((i) => i.id === id);
}
