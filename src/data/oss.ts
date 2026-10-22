import { OssFact, OssIndustry, OssProject, OssSource } from '@/types/oss';
import { SHOW_DRAFTS } from '@/data/drafts';

// 2026-10-16 起的结构（作者让 Claude 定）：用途是主分类，行业是视图。
// 起因：很多项目跨行业，比如 LiveKit 在教育里做直播课和远程实训互动、在电商里做直播带货，只按行业分装不下。
// 依据：有搜索量的分类词全是用途（open source lms / erp / pos / help desk），几乎没人按“某行业开源”搜；老板逛站时又会按行业看。
// 所以每个项目只属于一个用途（用途页 /oss/<用途>/，对着搜索词），同时可以出现在多个行业里（行业页 /for/<行业>/，给老板逛）。
// 原来的“AI”和“客服与工单”两个分类不是行业，拆成了“实时数字人”“在线客服”“工单”三个用途。

export interface UseCopy {
  id: string;
  label: string;               // 筛选按钮上的字
  labelEn: string;
  title: string;               // 用途页的大标题
  titleEn: string;
  description: string;         // 分类列表、搜索结果和分享卡片里的简介
  descriptionEn: string;
}

export interface IndustryCopy {
  id: OssIndustry;
  label: string;
  labelEn: string;
  title: string;               // 行业页的大标题
  titleEn: string;
  description: string;
  descriptionEn: string;
}

// 用途，按这里的顺序显示。英文名尽量用有搜索量的说法（LMS、POS、ERP、help desk）。
export const OSS_USES: UseCopy[] = [
  {
    id: 'lms',
    label: '在线课程与考试',
    labelEn: 'LMS',
    title: '能拿来用的开源学习平台（LMS）',
    titleEn: 'Open-source LMS you can actually use',
    description: '开课、作业、测验和成绩放在一个平台里。',
    descriptionEn: 'Learning management systems: courses, assignments, quizzes and grades in one place.',
  },
  {
    id: 'live-video',
    label: '直播与视频会议',
    labelEn: 'Live video & meetings',
    title: '能拿来用的开源直播和视频会议',
    titleEn: 'Open-source live video and video conferencing you can actually use',
    description: '装上就能开会的成品，和自己开发直播、会议用的组件。',
    descriptionEn: 'Ready-made meeting software, and the building blocks for your own live video and meetings.',
  },
  {
    id: 'coding',
    label: '编程教学环境',
    labelEn: 'Coding classrooms',
    title: '能拿来用的开源编程教学环境',
    titleEn: 'Open-source coding classrooms you can actually use',
    description: '一个班的学生各有自己的编程环境。',
    descriptionEn: 'Every student in a class gets their own coding environment.',
  },
  {
    id: 'store',
    label: '网店',
    labelEn: 'Online store',
    title: '能拿来用的开源网店系统',
    titleEn: 'Open-source ecommerce platforms you can actually use',
    description: '带现成店面和后台的自建网店。',
    descriptionEn: 'Self-hosted stores with a ready-made storefront and admin.',
  },
  {
    id: 'headless',
    label: '电商后端',
    labelEn: 'Headless commerce',
    title: '能拿来用的开源电商后端',
    titleEn: 'Open-source headless commerce you can actually use',
    description: '给开发团队的电商后端，店面自己做。',
    descriptionEn: 'Commerce back ends for developer teams; you build the storefront.',
  },
  {
    id: 'pos',
    label: '收银',
    labelEn: 'Point of sale',
    title: '能拿来用的开源收银系统',
    titleEn: 'Open-source POS systems you can actually use',
    description: '网页版收银，带库存和报表。',
    descriptionEn: 'Web-based point of sale with inventory and reports.',
  },
  {
    id: 'ordering',
    label: '点餐订座',
    labelEn: 'Ordering & reservations',
    title: '能拿来用的开源点餐订座系统',
    titleEn: 'Open-source online ordering and reservations you can actually use',
    description: '餐厅自己的在线点餐和订座网站。',
    descriptionEn: 'A restaurant’s own online ordering and table booking site.',
  },
  {
    id: 'live-chat',
    label: '在线客服',
    labelEn: 'Live chat',
    title: '能拿来用的开源在线客服',
    titleEn: 'Open-source live chat and shared inboxes you can actually use',
    description: '网站聊天、邮件和社交消息收进一个收件箱。',
    descriptionEn: 'Website chat, email and social messages in one inbox.',
  },
  {
    id: 'help-desk',
    label: '工单',
    labelEn: 'Help desk',
    title: '能拿来用的开源工单系统',
    titleEn: 'Open-source help desk and ticketing systems you can actually use',
    description: '各个渠道进来的问题都变成工单处理。',
    descriptionEn: 'Requests from every channel become tickets.',
  },
  {
    id: 'erp',
    label: 'ERP',
    labelEn: 'ERP',
    title: '能拿来用的开源 ERP',
    titleEn: 'Open-source ERP you can actually use',
    description: '销售、采购、库存和生产放在一套系统里。',
    descriptionEn: 'Sales, purchasing, inventory and manufacturing in one system.',
  },
  {
    id: 'avatars',
    label: '实时数字人',
    labelEn: 'AI avatars',
    title: '能拿来用的开源实时数字人',
    titleEn: 'Open-source real-time AI avatars you can actually use',
    description: '能对口型说话、实时对话的数字人。',
    descriptionEn: 'Digital humans that lip-sync and hold real-time conversations.',
  },
];

// 行业，按这里的顺序显示。行业页列出这个行业里出现的项目，按用途分开筛。
// 作者 2026-10-13 定过：医疗诊所去掉；数字人不挂到教育和电商零售下面；Open Source Point of Sale 不挂到电商零售下面。
export const OSS_INDUSTRIES: IndustryCopy[] = [
  {
    id: 'education',
    label: '教育',
    labelEn: 'Education',
    title: '教育行业能拿来用的开源项目',
    titleEn: 'Open-source software a school or training business can actually use',
    description: '网校、考试、直播课和编程教学。',
    descriptionEn: 'Online courses, exams, live classes and teaching code.',
  },
  {
    id: 'ecommerce',
    label: '电商零售',
    labelEn: 'E-commerce & retail',
    title: '电商零售能拿来用的开源项目',
    titleEn: 'Open-source software an online store can actually use',
    description: '自建网店、电商后端和直播带货。',
    descriptionEn: 'Self-hosted stores, headless commerce and live selling.',
  },
  {
    id: 'restaurant',
    label: '餐饮门店',
    labelEn: 'Restaurants & shops',
    title: '餐饮门店能拿来用的开源项目',
    titleEn: 'Open-source software a restaurant or shop can actually use',
    description: '收银、点餐和订座。',
    descriptionEn: 'Point of sale, online ordering and reservations.',
  },
  {
    id: 'manufacturing',
    label: '制造与仓储',
    labelEn: 'Manufacturing & warehousing',
    title: '制造与仓储能拿来用的开源项目',
    titleEn: 'Open-source software a factory or warehouse can actually use',
    description: 'ERP：销售、采购、库存和生产放在一套系统里。',
    descriptionEn: 'ERP: sales, purchasing, inventory and manufacturing in one system.',
  },
];

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
    use: 'lms',
    industries: [{ id: 'education' }],
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
        detail: '软件免费。官方给的最低配置是 1GHz 处理器、512MB 内存，建议双核、1GB 以上；磁盘按 5GB 起算，另加课程内容。不想自己部署，可以用官方托管的 MoodleCloud：按年付，50 人约 170 美元，200 人约 500 美元（从这一档起能用 Stripe 卖课），750 人约 2,110 美元；实际按澳元结算，不能装插件。',
        detailEn: 'The software is free. The stated minimum is a 1 GHz CPU and 512 MB of RAM; dual core and 1 GB or more is recommended. Plan for 5 GB of disk plus your course content. Moodle’s own hosting, MoodleCloud, is billed yearly: about $170 for 50 users, $500 for 200 (the first plan that can sell courses via Stripe), up to $2,110 for 750. It is charged in AUD, and you cannot install plugins.',
        sources: [
          src('安装文档', 'Install guide', 'https://docs.moodle.org/en/Installing_Moodle'),
          src('MoodleCloud 价格页', 'MoodleCloud pricing', 'https://www.moodlecloud.com/standard-plans/'),
        ],
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
    id: 'canvas-lms',
    logo: '/oss/logos/canvas-lms.jpg',
    name: 'Canvas LMS',
    use: 'lms',
    industries: [{ id: 'education' }],
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
    use: 'lms',
    industries: [{ id: 'education' }],
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
    use: 'live-video',
    industries: [{ id: 'education' }],
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

  // ---------- 编程教学 ----------
  {
    id: 'jupyterhub',
    logo: '/oss/logos/jupyterhub.png',
    name: 'JupyterHub',
    use: 'coding',
    industries: [{ id: 'education' }],
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

  // ---------- 教育以外的分类 ----------

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
    use: 'store',
    industries: [{ id: 'ecommerce' }],
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
    use: 'store',
    industries: [{ id: 'ecommerce' }],
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
    use: 'store',
    industries: [{ id: 'ecommerce' }],
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
    use: 'headless',
    industries: [{ id: 'ecommerce' }],
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
    use: 'headless',
    industries: [{ id: 'ecommerce' }],
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
    use: 'store',
    industries: [{ id: 'ecommerce' }],
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
  // 价格是当天页面上的数字，会变。两条作者 2026-10-13 都确认了。
  // 两条都只在餐饮门店。Open Source Point of Sale 原来同时出现在电商零售下面，作者 2026-10-13 按知名度标准去掉了那份显示。
  {
    id: 'opensourcepos',
    name: 'Open Source Point of Sale',
    use: 'pos',
    industries: [{ id: 'restaurant' }],
    what: '网页版的收银系统，带库存、进货、客户、报表和小票打印。',
    whatEn: 'A web-based point of sale with inventory, receivings, customers, reports and receipt printing.',
    repoUrl: `${GH}opensourcepos/opensourcepos`,
    homepage: 'http://www.opensourcepos.org',
    logo: '/oss/logos/opensourcepos.png',
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
    confirmed: true,             // 作者 2026-10-13 确认
  },
  {
    id: 'tastyigniter',
    name: 'TastyIgniter',
    use: 'ordering',
    industries: [{ id: 'restaurant' }],
    what: '餐厅自己的在线点餐和订座网站，带后台管理，支持多家分店。',
    whatEn: 'A restaurant’s own online ordering and table reservation site, with an admin back office and multi-location support.',
    repoUrl: `${GH}tastyigniter/TastyIgniter`,
    homepage: 'https://tastyigniter.com',
    logo: '/oss/logos/tastyigniter.png',
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
    confirmed: true,             // 作者 2026-10-13 确认
  },

  // 客服与工单。作者 2026-10-13 提出加这个分类，并把候选从五个压到两个：一个管聊天（Chatwoot），一个管工单（Zammad）。
  // 两条都是 Claude 2026-10-13 按许可证原文、官方文档和价格页起草的，作者当天在本地预览里看过，确认。
  {
    id: 'chatwoot',
    name: 'Chatwoot',
    use: 'live-chat',
    industries: [],
    what: '把网站在线聊天、邮件和社交消息收进同一个收件箱的客服系统，自带帮助中心。',
    whatEn: 'A customer support inbox that brings website live chat, email and social messaging into one place, with a built-in help center.',
    repoUrl: `${GH}chatwoot/chatwoot`,
    homepage: 'https://www.chatwoot.com',
    logo: '/oss/logos/chatwoot.png',
    facts: {
      commercial: {
        verdict: 'good',
        label: '核心可以商用',
        labelEn: 'Yes, for the core',
        detail: 'MIT。可以商用、修改、闭源，保留版权声明即可。例外是仓库里 enterprise/ 目录下的代码：那是另一份企业版协议，在生产环境使用要有对应坐席数的付费订阅，见下面的注意事项。',
        detailEn: 'MIT. Commercial use, modification and closed-source use are all allowed; keep the copyright notice. The exception is the code under the enterprise/ directory of the repository, which has its own Enterprise license: production use requires a paid subscription for the right number of seats. See the caveat below.',
        sources: [license(`${GH}chatwoot/chatwoot/blob/develop/LICENSE`), src('企业版协议', 'Enterprise license', `${GH}chatwoot/chatwoot/blob/develop/enterprise/LICENSE`)],
      },
      alive: alive('2026-10-13', 'chatwoot/chatwoot'),
      deploy: {
        verdict: 'good',
        label: '容易',
        labelEn: 'Easy',
        detail: '有官方安装脚本，文档按 Ubuntu 24.04 写：下载脚本，运行一条安装命令；要用域名的话先把 A 记录指向服务器，脚本会配好 Nginx 和 Let’s Encrypt 证书。也可以用 Docker Compose：下载官方的 .env 和 compose 模板，改掉 Postgres 和 Redis 的密码，初始化数据库后启动。发通知邮件要自己准备 SMTP 服务。',
        detailEn: 'There is an official install script, documented for Ubuntu 24.04: download it and run one install command. If you want a domain, point its A record at the server first and the script sets up Nginx and a Let’s Encrypt certificate. Docker Compose also works: download the official .env and compose templates, change the Postgres and Redis passwords, prepare the database and start. You bring your own SMTP server for notification emails.',
        sources: [src('Linux 安装', 'Linux VM guide', 'https://developers.chatwoot.com/self-hosted/deployment/linux-vm'), src('Docker 安装', 'Docker guide', 'https://developers.chatwoot.com/self-hosted/deployment/docker')],
      },
      cost: {
        verdict: 'caution',
        label: '社区版免费，高级功能按坐席收费',
        labelEn: 'Free Community edition; paid features are per agent',
        short: '高级功能收费',
        shortEn: 'Paid tiers',
        detail: '社区版免费。文档写的最低配置是 2 核、4 GB 内存、20 GB SSD，生产环境建议 4 核以上、8 GB 以上、50 GB 以上，另要 PostgreSQL 12 以上和 Redis 6 以上。自己部署想要高级功能，2026 年 10 月官网标价：Premium Support 每坐席每月 19 美元，企业版每坐席每月 99 美元。不想自己部署，官方云有免费档（最多 2 个坐席），付费档每坐席每月 19、39、99 美元。',
        detailEn: 'The Community edition is free. The docs list a minimum of 2 cores, 4 GB of RAM and a 20 GB SSD, and recommend 4 or more cores, 8 GB or more and 50 GB or more for production, plus PostgreSQL 12 or later and Redis 6 or later. For paid features on your own server, the prices in October 2026 are $19 per agent a month for Premium Support and $99 per agent a month for Enterprise. If you would rather not self-host, the official cloud has a free plan for up to 2 agents and paid plans at $19, $39 and $99 per agent a month.',
        sources: [src('自托管说明', 'Self-hosted overview', 'https://developers.chatwoot.com/self-hosted'), src('自托管价格', 'Self-hosted pricing', 'https://www.chatwoot.com/pricing/self-hosted-plans'), src('云服务价格', 'Cloud pricing', 'https://www.chatwoot.com/pricing')],
      },
      caveats: {
        verdict: 'caution',
        label: '角色权限、SLA、去品牌都不在社区版里',
        labelEn: 'Roles, SLAs and custom branding are not in the Community edition',
        detail: '官方的自托管价格页列出社区版不包含的功能：Captain AI、语音通话、自定义品牌、坐席接待上限、角色与权限、SSO / SAML、SLA。前五项要买 Premium Support，SSO 和 SLA 要买企业版。这些功能的代码在仓库的 enterprise/ 目录里，受企业版协议约束。只想跑 MIT 许可的部分，文档说把 Docker 镜像换成带 -ce 后缀的版本。',
        detailEn: 'The self-hosted pricing page lists what the Community edition leaves out: Captain AI, voice calls, custom branding, agent capacity, roles and permissions, SSO / SAML and SLA policies. The first five come with Premium Support; SSO and SLAs need Enterprise. The code for these sits in the enterprise/ directory of the repository under the Enterprise license. To run only the MIT-licensed part, the docs say to switch to the Docker image tags ending in -ce.',
        sources: [src('自托管价格', 'Self-hosted pricing', 'https://www.chatwoot.com/pricing/self-hosted-plans'), src('企业版协议', 'Enterprise license', `${GH}chatwoot/chatwoot/blob/develop/enterprise/LICENSE`), src('Docker 安装', 'Docker guide', 'https://developers.chatwoot.com/self-hosted/deployment/docker')],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },
  {
    id: 'zammad',
    name: 'Zammad',
    use: 'help-desk',
    industries: [],
    what: '网页版的工单系统：邮件、在线聊天、电话和社交消息进来都变成工单，在一个界面里处理。',
    whatEn: 'A web-based helpdesk and ticketing system: email, chat, phone and social media messages all become tickets handled in one interface.',
    repoUrl: `${GH}zammad/zammad`,
    homepage: 'https://zammad.org',
    logo: '/oss/logos/zammad.png',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '有条件',
        labelEn: 'With conditions',
        detail: 'AGPL-3.0。不改代码直接部署使用没有额外义务；改了代码又让客户或员工通过网络使用，就要向这些用户提供改动后的源码。README 写明代码归 Zammad 基金会所有，基金会独立于做商业服务的 Zammad GmbH。',
        detailEn: 'AGPL-3.0. Running it unmodified adds no obligations. If you change the code and let customers or staff use it over a network, you must offer those users your modified source. The README states that the code is owned by the Zammad Foundation, which is independent of the commercial provider Zammad GmbH.',
        sources: [license(`${GH}zammad/zammad/blob/develop/LICENSE`), readme('zammad/zammad')],
      },
      alive: alive('2026-10-13', 'zammad/zammad'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '可以用软件包装（CentOS / RHEL 9 和 10、Debian 11 到 13、Ubuntu 22.04 到 26.04、openSUSE Leap / SLES 15 和 16），也可以用 Docker Compose 或 Kubernetes。要 PostgreSQL 15 以上和 Redis 7 以上，用软件包安装时会自动装上。用 Docker Compose 至少要 4 GB 内存，并且要先把主机的 vm.max_map_count 调到 262144，Elasticsearch 才能正常运行。',
        detailEn: 'You can install from packages (CentOS / RHEL 9 and 10, Debian 11 to 13, Ubuntu 22.04 to 26.04, openSUSE Leap / SLES 15 and 16), or use Docker Compose or Kubernetes. It needs PostgreSQL 15 or newer and Redis 7 or newer; the package install sets both up automatically. Docker Compose needs at least 4 GB of RAM, and you first raise the host’s vm.max_map_count to 262144 so Elasticsearch runs properly.',
        sources: [src('软件要求', 'Software requirements', 'https://docs.zammad.org/en/latest/prerequisites/software.html'), src('Docker Compose 安装', 'Docker Compose guide', 'https://docs.zammad.org/en/latest/install/docker-compose.html')],
      },
      cost: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '软件免费。官方给的最低配置是 2 核、6 GB 内存，Elasticsearch 装在同一台机器上再加 4 GB；40 个坐席以内的参考配置是 6 核、6 GB，同机装 Elasticsearch 再加 6 GB。磁盘官方没有给建议。不想自己部署，官方托管版 2026 年 10 月的标价（按年付、不含增值税）：每坐席每月 7 欧元（最多 5 个坐席）、16 欧元（最多 35 个）、25 欧元（不限）。',
        detailEn: 'The software is free. The stated minimum is 2 cores and 6 GB of RAM, plus 4 GB if Elasticsearch runs on the same server; the example for up to 40 agents is 6 cores and 6 GB, plus 6 GB for Elasticsearch. The docs make no disk recommendation. If you would rather not self-host, the hosted plans in October 2026, billed annually and excluding VAT, are €7 per agent a month (up to 5 agents), €16 (up to 35) and €25 (unlimited).',
        sources: [src('硬件要求', 'Hardware requirements', 'https://docs.zammad.org/en/latest/prerequisites/hardware.html'), src('价格', 'Pricing', 'https://zammad.com/en/pricing')],
      },
      caveats: {
        verdict: 'caution',
        label: '搜索和报表要靠 Elasticsearch',
        labelEn: 'Search and reports depend on Elasticsearch',
        detail: 'Elasticsearch 官方写的是“可选但强烈建议”：不装也能运行，但搜索会变慢而且很受限，报表、搜索邮件附件内容这些功能要靠它。自己部署，更新、备份和可用性都由自己负责；官方的自托管支持合同每年 2,999 欧元起（不含增值税）。用 Docker 部署，官方只支持 Zammad 应用本身，不管 Docker 的问题。',
        detailEn: 'The docs call Elasticsearch “optional but strongly recommended”: Zammad runs without it, but search is slower and very limited, and features such as reports and searching inside email attachments rely on it. When you self-host, updates, backups and availability are yours; official support contracts for self-hosted installs start at €2,999 a year excluding VAT. If you deploy with Docker, support covers only the Zammad application, not Docker itself.',
        sources: [src('软件要求', 'Software requirements', 'https://docs.zammad.org/en/latest/prerequisites/software.html'), src('价格', 'Pricing', 'https://zammad.com/en/pricing'), src('Docker Compose 安装', 'Docker Compose guide', 'https://docs.zammad.org/en/latest/install/docker-compose.html')],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },

  // 制造与仓储。作者 2026-10-13 定：这个分类只放一个 ERP。选 Odoo 是 Claude 按星标和搜索量提的，作者当天看过预览，确认。
  // 原来的五个候选（ERPNext、Odoo、Dolibarr、管伊佳 ERP、InvenTree）只有许可证和推送日期，已删除。
  {
    id: 'odoo',
    name: 'Odoo',
    use: 'erp',
    industries: [{ id: 'manufacturing' }],
    what: '一整套企业应用：销售、采购、库存、生产、开票，按模块安装。社区版开源，企业版收费。',
    whatEn: 'A suite of business apps (sales, purchasing, inventory, manufacturing, invoicing) installed module by module. The Community edition is open source; Enterprise is paid.',
    repoUrl: `${GH}odoo/odoo`,
    homepage: 'https://www.odoo.com',
    logo: '/oss/logos/odoo.png',
    facts: {
      commercial: {
        verdict: 'good',
        label: '社区版可以商用',
        labelEn: 'Yes, for the Community edition',
        detail: '社区版是 LGPL-3.0。自己部署、商用不受限制；改了它本身的代码再分发，改动部分要开源。企业版是另一份协议：只有持有有效的企业版订阅、用户数相符时才能使用，也不能分发。',
        detailEn: 'The Community edition is LGPL-3.0. You can host it and use it commercially without restriction; if you modify its own code and distribute it, those changes must be open. Enterprise is under a separate license: it can only be used with a valid Enterprise subscription for the correct number of users, and cannot be redistributed.',
        sources: [license(`${GH}odoo/odoo/blob/20.0/LICENSE`), src('许可证说明', 'Licenses', 'https://www.odoo.com/documentation/20.0/legal/licenses.html')],
      },
      alive: alive('2026-10-13', 'odoo/odoo'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: '官方提供安装包：Odoo 20 的 deb 包目前支持 Ubuntu 24.04，rpm 包支持 Fedora 42，先装好 PostgreSQL 再装；也可以从源码装。Windows 安装包官方说只适合测试或单人本机使用，不建议用于生产。正式上线，文档要求用多进程模式，并在前面架反向代理配 HTTPS。',
        detailEn: 'There are official packages: the Odoo 20 deb package currently supports Ubuntu 24.04 and the rpm package supports Fedora 42, with PostgreSQL installed first; a source install is also documented. The Windows installer is described as suitable for testing or single-user local use, and production deployment on Windows is discouraged. For production the docs call for the multi-processing server behind a reverse proxy with HTTPS.',
        sources: [src('安装包', 'Packaged installers', 'https://www.odoo.com/documentation/20.0/administration/on_premise/packages.html'), src('部署文档', 'Deployment guide', 'https://www.odoo.com/documentation/20.0/administration/on_premise/deploy.html')],
      },
      cost: {
        verdict: 'caution',
        label: '社区版免费，企业版按用户收费',
        labelEn: 'Community is free; Enterprise is per user',
        short: '企业版收费',
        shortEn: 'Paid tiers',
        detail: '社区版免费。服务器多大，官方给的是算法：一个工作进程大约支撑 6 个同时在线的用户，进程数上限是 CPU 数 × 2 + 1；文档的例子是 60 人同时在线、4 核 8 线程，Odoo 本身约需 3 GB 内存。企业版 2026 年 10 月官网的美元标价（按年付）：Standard 每用户每月 31.10 美元，只能用官方托管；Custom 每用户每月 61.00 美元，自己部署企业版要买这一档。新订单头 12 个月有折扣，分别是 24.90 和 49.00 美元。另有 Light User，每人每月 8.90 美元，只能用请假、报销、考勤、排班这类自助功能，以及收银、车间、仓库扫码；人事应用里没有关联正式账号的员工记录也算 Light User，要先约官方顾问报价。只用一个应用，官方托管免费、不限用户数。',
        detailEn: 'The Community edition is free. For server size the docs give a formula: one worker handles about 6 concurrent users, and the maximum number of workers is CPUs × 2 + 1. Their example is 60 concurrent users on 4 CPUs with 8 threads, needing about 3 GB of RAM for Odoo itself. Enterprise list prices in US dollars in October 2026, billed yearly: Standard at $31.10 per user a month, on Odoo’s own hosting only; Custom at $61.00 per user a month, the plan required to run Enterprise on your own server. New orders get a 12-month discount, to $24.90 and $49.00. Light Users are $8.90 per user a month and limited to self-service (time off, expenses, attendance, planning) plus point of sale, shop floor and barcode operations. Every active employee record in the HR app that is not linked to a full user account also counts as a Light User, and the license is quoted through an Odoo advisor. Using a single app on Odoo’s hosting is free for unlimited users.',
        sources: [src('部署文档', 'Deployment guide', 'https://www.odoo.com/documentation/20.0/administration/on_premise/deploy.html'), src('价格', 'Pricing', 'https://www.odoo.com/pricing')],
      },
      caveats: {
        verdict: 'caution',
        label: '社区版没有完整财务和车间功能',
        labelEn: 'Community lacks full accounting and shop-floor tools',
        detail: '官方的版本对比表里，社区版有库存、采购、生产（MRP）和设备维护，但这些标的是没有：完整的财务（社区版只有开票）、条码、车间看板和排程、PLM、质量管理、手机 App、Studio 定制工具。版本升级服务也只给企业版：文档写的是有企业版订阅才免费把数据库升到最新版本。',
        detailEn: 'In the official editions comparison, Community includes Inventory, Purchase, Manufacturing (MRP) and Maintenance, but these are marked as not included: full accounting (Community has invoicing only), barcode, shop floor, control panel and scheduling, PLM, Quality, the mobile apps and Studio. Version upgrades are also an Enterprise service: the docs say upgrading a database to the latest version is free with Odoo Enterprise.',
        sources: [src('版本对比', 'Editions comparison', 'https://www.odoo.com/page/editions'), src('升级文档', 'Upgrade guide', 'https://www.odoo.com/documentation/20.0/administration/upgrade.html')],
      },
    },
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },

  // AI：实时数字人。2026-10-10 第一批读者（教育行业的老板和领导）提出的需求：教育和电商都要用数字人，只按行业分会漏掉。
  // 所以单独设了 AI 分类。起初还让它们同时出现在教育和电商零售下面，作者 2026-10-13 看过后去掉了：数字人只留在 AI 分类，不要再挂到别的行业下。
  // 作者 2026-10-13 定：只有许可证和推送日期、其余“待核对”“待评估”的五个候选（Duix Mobile、Linly-Talker、VideoChat、
  // Open-LLM-VTuber、awesome-digital-human-live2d）从这里删除；“作者实践过”的标签也去掉，不要再给条目标 handsOn。
  // 下面两条的内容是 Claude 2026-10-10 从 README 和官方文档里查的，不是作者的实测记录。作者 2026-10-13 确认，当天复核了推送日期和出处链接。
  {
    id: 'livetalking',
    name: 'LiveTalking',
    use: 'avatars',
    industries: [],
    what: '实时交互的流式数字人引擎：输入文字或音频，数字人对口型说话，画面推到浏览器或直播平台。',
    whatEn: 'A real-time streaming digital human engine: feed it text or audio and the avatar lip-syncs, streamed to a browser or a live platform.',
    repoUrl: `${GH}lipku/LiveTalking`,
    homepage: 'https://www.livetalking.ai',
    logo: '/oss/logos/livetalking.png',
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
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },
  {
    id: 'openavatarchat',
    name: 'OpenAvatarChat',
    use: 'avatars',
    industries: [],
    what: '模块化的数字人对话系统：语音识别、大模型、语音合成、数字人形象四块都可以换。',
    whatEn: 'A modular digital human chat system: speech recognition, the LLM, text-to-speech and the avatar can each be swapped.',
    repoUrl: `${GH}HumanAIGC-Engineering/OpenAvatarChat`,
    homepage: 'https://humanaigc-engineering.github.io/OpenAvatarChat/',
    logo: '/oss/logos/openavatarchat.jpg',
    facts: {
      commercial: {
        // 2026-10-12 逐个核对了所用模型的许可。SenseVoice 一项是照 issue 里的原话写的，许可方的最终确认出来后要回来改。
        // 2026-10-13 复核：issue 还开着，没有新的确认；协议第 3 条“仅供参考和学习”原来没写进来，补上了。
        verdict: 'caution',
        label: '可以商用，有两个模型要留意',
        labelEn: 'Yes, with two models to watch',
        detail: '项目本身是 Apache-2.0。它用到的模型里，LiteAvatar 是 MIT，LAM 和 CosyVoice 是 Apache-2.0，MuseTalk 的代码是 MIT、README 写明训练好的模型可以商用。两处要留意：语音识别用的 SenseVoice，权重走的是 FunASR 模型协议，要求注明出处并保留模型名；协议第 3 条（责任与风险）写着模型“仅供参考和学习”，没有说这算不算限制商用。有人为这句话提了 issue：维护者答复过第 3 条是免责条款、可以商用，但 2026 年 9 月又注明这还不是许可方的最终确认，issue 到 2026-10-13 还开着。FlashHead 的模型包里有一个 Open-RAIL-M 许可的组件，只用 Pro 版本的话整套是 Apache-2.0。',
        detailEn: 'The project itself is Apache-2.0. Of the models it uses, LiteAvatar is MIT, LAM and CosyVoice are Apache-2.0, and MuseTalk has MIT code with a README stating that the trained model may be used commercially. Two need care. SenseVoice, used for speech recognition, ships its weights under the FunASR model license, which requires attribution and keeping the model name. Its section 3 (Responsibility and Risk) says the model is “provided for reference and learning purposes only” and does not say whether that limits commercial use. An issue asks exactly that: a maintainer answered that section 3 is a disclaimer and commercial use is permitted, and in September 2026 that answer was marked as not yet the license owner’s final confirmation. The issue was still open on 2026-10-13. The FlashHead model archive includes one component under Open-RAIL-M; with the Pro variant alone, the whole workflow is Apache-2.0.',
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
    checkedAt: '2026-10-13',
    confirmed: true,             // 作者 2026-10-13 确认
  },

  // 直播与视频会议。作者 2026-10-16 提出要收 LiveKit（他自己部署过，用来做视频会议）。起初放在 AI 分类，作者觉得勉强，
  // 当天改成用途为主的结构后归到“直播与视频会议”。两个行业的场景是作者自己的说法：教育做直播课和远程实训互动，电商做直播带货。
  // 下面的内容是 Claude 2026-10-16 从许可证、官方文档和价格页查的，不是作者的实测记录。作者要求 Server 和 Egress 都写上，补完后当天确认。
  {
    id: 'livekit',
    name: 'LiveKit',
    use: 'live-video',
    industries: [
      { id: 'education', scenario: '直播课、远程实训互动', scenarioEn: 'Live classes and remote hands-on training' },
      { id: 'ecommerce', scenario: '直播带货', scenarioEn: 'Live selling' },
    ],
    what: '一套实时音视频的开源组件：LiveKit Server 转发音视频，Egress 负责录制和推流直播。可以拿来自己做视频会议、直播间，也能做 AI 语音客服和数字人实时对话的底座。',
    whatEn: 'A set of open-source real-time audio and video components: LiveKit Server routes the media, Egress records and live-streams it. Build your own video meetings or live rooms with it, or use it under AI voice agents and digital humans.',
    repoUrl: `${GH}livekit/livekit`,
    homepage: 'https://livekit.com/',
    logo: '/oss/logos/livekit.png',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        labelEn: 'Yes',
        detail: 'LiveKit Server、Egress 和做 AI 语音对话的 Agents 框架都是 Apache-2.0，可以商用和二次开发，改了代码也不用开源。',
        detailEn: 'LiveKit Server, Egress and the Agents framework for voice AI are all Apache-2.0: commercial use and modification are allowed, and you do not have to publish your changes.',
        sources: [
          license(`${GH}livekit/livekit/blob/master/LICENSE`),
          src('Egress 的许可证', 'Egress license', `${GH}livekit/egress/blob/main/LICENSE`),
          src('Agents 的许可证', 'Agents license', `${GH}livekit/agents/blob/main/LICENSE`),
        ],
      },
      alive: alive('2026-10-15', 'livekit/livekit'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        labelEn: 'Moderate',
        detail: 'LiveKit Server：官方有配置生成器（livekit/generate 镜像），一次生成 Caddy、Redis、docker compose 和启动脚本，在一台 Linux 云主机上跑这个脚本就能起来。前提是有自己的域名：主域名和 TURN 用的域名都要指到这台机器，证书不能自签（Caddy 会自动申请）。防火墙要开 80、443、7881（TCP）、3478（UDP）和 50000 到 60000 一整段 UDP 端口。Egress：生成器不管它，要另起一个 Docker 服务（livekit/egress），配上 Server 的地址和 API 密钥，连到和 Server 同一个 Redis。录整间会议靠容器里的 Chrome，容器要加 SYS_ADMIN 权限，否则 Chrome 起不来。录好的文件存到 S3、Azure 或谷歌云存储。两样都有官方的 Helm 包，可以部署到 Kubernetes。',
        detailEn: 'LiveKit Server: an official config generator (the livekit/generate image) produces Caddy, Redis, docker compose and a startup script in one go; run the script on a Linux VM and it is up. You need your own domain: the main domain and the TURN domain must both point at the machine, and self-signed certificates do not work (Caddy obtains them automatically). Open ports 80, 443, 7881 (TCP), 3478 (UDP) and the whole UDP range 50000 to 60000. Egress: the generator does not cover it. Run it as a separate Docker service (livekit/egress) with the server’s URL and API key, connected to the same Redis as the server. Full-room recording runs Chrome inside the container, which needs the SYS_ADMIN capability or Chrome fails to start. Recordings go to S3, Azure or Google Cloud Storage. Both have official Helm charts for Kubernetes.',
        sources: [
          src('云主机部署', 'Deploying to a VM', 'https://docs.livekit.io/home/self-hosting/vm/'),
          src('Server 部署说明', 'Server deployment guide', 'https://docs.livekit.io/home/self-hosting/deployment/'),
          src('Egress 的部署', 'Self-hosting Egress', 'https://docs.livekit.io/home/self-hosting/egress/'),
        ],
      },
      cost: {
        verdict: 'caution',
        label: '软件免费，钱花在服务器和带宽',
        labelEn: 'Free software; you pay for servers and bandwidth',
        short: '看规模',
        shortEn: 'Varies',
        detail: '自己部署不收费，钱花在两类机器上。LiveKit Server 的瓶颈是 CPU 和带宽：官方压测里，一台 16 核的谷歌云 c2-standard-16 撑 150 人互相看视频的大会议，CPU 到 85%；官方建议生产环境用计算优化型的机器和万兆网卡。Egress 每个实例建议至少 4 核 4 GB，录整间会议要占 2 到 6 核，一个实例同时只录一间，要同时录几间就得开几个实例。不想自己运维可以用官方的 LiveKit Cloud：免费档每月 5,000 参会人分钟、50 GB 流量；付费档每月 50 美元起，超出部分每参会人分钟 0.0005 美元，流量每 GB 0.12 美元。',
        detailEn: 'Self-hosting is free; the money goes on two kinds of machines. LiveKit Server is bound by CPU and bandwidth: in the official benchmark, one 16-core Google Cloud c2-standard-16 handled a 150-person video meeting where everyone sees everyone, at 85% CPU, and the docs recommend compute-optimized machines and 10 Gbps networking for production. Each Egress instance should have at least 4 CPUs and 4 GB; a full-room recording takes 2 to 6 CPUs, and one instance records one room at a time, so you need as many instances as rooms you record at once. If you would rather not run it all, LiveKit Cloud has a free tier with 5,000 participant minutes and 50 GB of transfer a month; paid plans start at $50 a month, with overage at $0.0005 per participant minute and $0.12 per GB.',
        sources: [
          src('官方压测', 'Benchmarks', 'https://docs.livekit.io/home/self-hosting/benchmark/'),
          src('LiveKit Cloud 价格', 'LiveKit Cloud pricing', 'https://livekit.com/pricing'),
        ],
      },
      caveats: {
        verdict: 'caution',
        label: '是开发包，不是装上就能开会的软件',
        labelEn: 'A toolkit, not a ready-made meeting app',
        detail: '会议界面、登录和权限要自己的开发团队做。官方的会议示例 LiveKit Meet 是开源的，但 README 只讲了本地开发，没讲生产部署。Egress 里的 Chrome 默认关着沙箱，要打开得自己加配置和 seccomp 规则。',
        detailEn: 'The meeting interface, login and permissions are for your own developers to build. The official sample app, LiveKit Meet, is open source, but its README only covers local development, not production. The Chrome inside Egress runs with its sandbox off by default; turning it on takes an extra setting and a seccomp profile.',
        sources: [
          src('LiveKit Meet', 'LiveKit Meet', `${GH}livekit-examples/meet#readme`),
          src('Egress 的部署', 'Self-hosting Egress', 'https://docs.livekit.io/home/self-hosting/egress/'),
        ],
      },
    },
    needs: {
      verdict: 'caution',
      label: '至少 LiveKit Server 和 Redis；要录制或直播再加 Egress',
      labelEn: 'At least LiveKit Server and Redis; add Egress to record or live-stream',
      detail: 'LiveKit Server 必装，负责房间和音视频转发。Redis 生产环境推荐，装 Egress 就必须有，两边要连同一个。Egress 负责把会议录成 MP4 或 HLS，或者用 RTMP 推到 YouTube Live、Twitch 这类平台直播，录好的文件要一个 S3、Azure 或谷歌云的存储桶。另外还要一个自己的域名。Ingress（把外面的 RTMP 推流接进房间）和 Agents（AI 语音对话）按需要再装，只开会用不上。',
      detailEn: 'LiveKit Server is required: it runs the rooms and routes the media. Redis is recommended for production and required once you add Egress; both must use the same one. Egress records meetings to MP4 or HLS, or live-streams them over RTMP to platforms like YouTube Live and Twitch; recordings need an S3, Azure or Google Cloud bucket. You also need a domain of your own. Ingress (bringing outside RTMP streams into a room) and Agents (voice AI) are optional and not needed for meetings alone.',
      sources: [
        src('Server 部署说明', 'Server deployment guide', 'https://docs.livekit.io/home/self-hosting/deployment/'),
        src('Egress 介绍', 'Egress overview', 'https://docs.livekit.io/home/egress/overview/'),
        src('Egress 的部署', 'Self-hosting Egress', 'https://docs.livekit.io/home/self-hosting/egress/'),
      ],
    },
    checkedAt: '2026-10-16',
    confirmed: true,             // 作者 2026-10-16 确认
  },
];

// 线上只放确认过的项目，按用途的顺序排，“全部”里同一用途的项目挨在一起
const USE_ORDER = new Map(OSS_USES.map((u, i) => [u.id, i]));
export const OSS_PROJECTS: OssProject[] = ALL_PROJECTS.filter((p) => p.confirmed || SHOW_DRAFTS).sort(
  (a, b) => (USE_ORDER.get(a.use) ?? 99) - (USE_ORDER.get(b.use) ?? 99)
);

// 用途页和项目页都在 /oss/ 下面，构建时检查 id 不重名、每个项目的用途都存在
ALL_PROJECTS.forEach((p) => {
  if (!USE_ORDER.has(p.use)) throw new Error(`Unknown use "${p.use}" on project ${p.id}`);
  if (USE_ORDER.has(p.id)) throw new Error(`Project id "${p.id}" clashes with a use page`);
});

export function ossProjectsOfUse(use: string): OssProject[] {
  return OSS_PROJECTS.filter((p) => p.use === use);
}

export function ossProjectsOfIndustry(industry: OssIndustry): OssProject[] {
  return OSS_PROJECTS.filter((p) => p.industries.some((i) => i.id === industry));
}

export function ossUse(id: string): UseCopy | undefined {
  return OSS_USES.find((u) => u.id === id);
}

export function ossIndustry(id: string): IndustryCopy | undefined {
  return OSS_INDUSTRIES.find((i) => i.id === id);
}

export function ossProject(id: string): OssProject | undefined {
  return OSS_PROJECTS.find((p) => p.id === id);
}
