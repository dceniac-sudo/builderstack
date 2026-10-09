import { OssFact, OssIndustry, OssProject, OssUse } from '@/types/oss';
import { SHOW_DRAFTS } from '@/data/tools';

export const OSS_INDUSTRIES: Record<OssIndustry, { label: string; title: string; tagline: string; description: string }> = {
  education: {
    label: '教育',
    title: '教育行业能拿来用的开源项目',
    tagline: '每个先回答五件事，再决定要不要装。',
    description: '网校、考试、直播课堂、教务这几类开源项目，每个回答五件事：能不能商用、还活不活着、部署难不难、成本多少、注意事项。每条都带出处。',
  },
};

export const OSS_USES: { id: OssUse; label: string }[] = [
  { id: 'course', label: '在线课程' },
  { id: 'exam', label: '考试测评' },
  { id: 'live', label: '直播课堂' },
  { id: 'admin', label: '教务管理' },
  { id: 'coding', label: '编程教学' },
  { id: 'classroom', label: '机房管理' },
];

const CHECKED_AT = '2026-10-09';

// AGPL-3.0 且项目没有附加条款时的通用说法
function agpl(licenseUrl: string): OssFact {
  return {
    verdict: 'caution',
    label: '有条件',
    detail: 'AGPL-3.0。不改代码直接部署使用没有额外义务；改了代码又让学员通过网络使用，就要向这些用户提供改动后的源码。',
    sources: [{ label: '许可证', url: licenseUrl }],
  };
}

// 按最近一次推送距离核对日的天数给结论：90 天内算在更新，一年内算放缓，更久算停滞
function alive(lastPush: string, repoUrl: string): OssFact {
  const days = Math.round((Date.parse(CHECKED_AT) - Date.parse(lastPush)) / 86400000);
  const verdict = days <= 90 ? 'good' : days <= 365 ? 'caution' : 'bad';
  const label = days <= 90 ? '在更新' : days <= 365 ? '更新放缓' : '基本停更';
  return {
    verdict,
    label,
    detail: `最近一次推送是 ${lastPush}，仓库没有归档。`,
    sources: [{ label: '提交记录', url: `${repoUrl}/commits` }],
  };
}

// 候选名单和推送日期来自 2026-10-09 调 GitHub 公开接口的结果。
// 其余各项的依据是仓库里的许可证和 README、各项目的官方文档，没有亲自部署。标“待核对”的是没读到出处的。
// 作者 2026-10-09 确认 14 条全部保留上线。新加的条目先写 confirmed: false，确认后再改。
const ALL_PROJECTS: OssProject[] = [
  // ---------- 在线课程 ----------
  {
    id: 'moodle',
    name: 'Moodle',
    industry: 'education',
    uses: ['course', 'exam'],
    what: '老牌的开源学习平台，课程、作业、测验、成绩都有。',
    repoUrl: 'https://github.com/moodle/moodle',
    homepage: 'https://moodle.org/',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        detail: 'GPL-3.0。自己部署来开课、收学费没有限制；把改过的版本分发给别人时，要同样以 GPL 开源。',
        sources: [{ label: '许可证', url: 'https://github.com/moodle/moodle/blob/main/COPYING.txt' }],
      },
      alive: alive('2026-10-03', 'https://github.com/moodle/moodle'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        detail: '要自己准备 Web 服务器、PHP 和数据库（PostgreSQL、MySQL 或 MariaDB），官方安装文档分八步。PHP 的具体版本要看对应版本的发布说明。',
        sources: [{ label: '安装文档', url: 'https://docs.moodle.org/en/Installing_Moodle' }],
      },
      cost: {
        verdict: 'good',
        label: '低',
        detail: '软件免费。官方给的最低配置是 1GHz 处理器、512MB 内存，建议双核、1GB 以上；磁盘按 5GB 起算，另加课程内容。',
        sources: [{ label: '安装文档', url: 'https://docs.moodle.org/en/Installing_Moodle' }],
      },
      caveats: {
        verdict: 'caution',
        label: '名字不能随便用',
        detail: '“Moodle”是注册商标。没有官方书面许可，不能用这个名字对外卖托管、培训、技术支持、定制这类服务，通常只有官方合作伙伴有这个许可。自己机构内部说“我们用的是 Moodle”不受限制。',
        sources: [{ label: '商标政策', url: 'https://moodle.com/trademarks/' }],
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
    repoUrl: 'https://github.com/PlayEdu/PlayEdu',
    homepage: 'https://www.playeduos.com',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '可以商用，要留版权标识',
        detail: 'Apache-2.0。README 的使用须知另外要求：页面和代码里的版权信息必须保留，包括“Designed By PlayEdu”标识和官网链接；改代码要在代码里注明改了什么。',
        sources: [
          { label: '许可证', url: 'https://github.com/PlayEdu/PlayEdu/blob/main/LICENSE' },
          { label: '使用须知', url: 'https://github.com/PlayEdu/PlayEdu#readme' },
        ],
      },
      alive: alive('2026-05-19', 'https://github.com/PlayEdu/PlayEdu'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: '装好 Docker 后拉代码，执行一条 docker compose 命令就起来。官方文档支持 Ubuntu 22.04/24.04、CentOS 7/8、Debian 10 到 12；要用域名和 HTTPS 再按文档配一个 Caddy。',
        sources: [{ label: 'Docker 安装文档', url: 'https://faq.playeduos.com/opensource-maintenance-handbook/article/RLKDf9qSHY' }],
      },
      cost: {
        verdict: 'caution',
        label: '中等',
        detail: '软件免费。官方给的服务器最低配置是 4 核、8GB 内存、40GB 硬盘、10M 带宽，推荐 8 核、16GB、200GB、50M。',
        sources: [{ label: 'Docker 安装文档', url: 'https://faq.playeduos.com/opensource-maintenance-handbook/article/RLKDf9qSHY' }],
      },
      caveats: {
        verdict: 'caution',
        label: '开源版只有基础功能',
        detail: '开源版是部门和学员管理、视频学习、进度追踪这些基础功能。线上考试、文档在线预览、学习任务、防快进，以及企业微信、钉钉、飞书的集成，README 写的是企业版才有。',
        sources: [{ label: 'README', url: 'https://github.com/PlayEdu/PlayEdu#readme' }],
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
    repoUrl: 'https://github.com/Qsnh/meedu',
    homepage: 'https://www.meedu.vip',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '要先申请授权',
        detail: 'Apache-2.0 加一份附加条款：商业使用要先得到作者的书面同意。用它搭平台卖课，要发邮件申请商用授权，条款里写的是免费；使用的域名必须已备案，且备案主体和申请主体一致，换域名要重新申请。',
        sources: [{ label: '附加条款', url: 'https://github.com/Qsnh/meedu/blob/main/ADDITIONAL_TERMS.md' }],
      },
      alive: alive('2026-09-14', 'https://github.com/Qsnh/meedu'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: 'README 的 Docker 方式分三步：复制环境配置、自己生成并填入两个密钥、docker-compose 启动。官方文档另有宝塔面板的安装方式。',
        sources: [
          { label: 'README', url: 'https://github.com/Qsnh/meedu#readme' },
          { label: '安装手册', url: 'https://docs.meedu.vip/doc/g9jK0KXmFe' },
        ],
      },
      cost: {
        verdict: 'good',
        label: '低',
        detail: '软件免费。官方给的服务器最低配置是 2 核、4GB 内存、5Mbps 带宽，推荐 8 核、16GB、20Mbps。',
        sources: [{ label: '服务器要求', url: 'https://docs.meedu.vip/doc/vPXma1LGJn' }],
      },
      caveats: {
        verdict: 'caution',
        label: '开源版只有点播，技术栈旧',
        detail: '开源版是录播点播和课程售卖。直播课、考试练习、小程序和 APP，README 写的是商业版才有。后端基于 PHP 7.4 和 Laravel 8，都是比较老的版本。两个密钥留空或用示例值会有未授权访问的风险，README 里专门提醒了。',
        sources: [{ label: 'README', url: 'https://github.com/Qsnh/meedu#readme' }],
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
    repoUrl: 'https://github.com/edusoho/edusoho',
    homepage: 'http://www.edusoho.com',
    facts: {
      commercial: {
        verdict: 'bad',
        label: '商用要买授权',
        detail: '用的是自己的“EduSoho 开源协议 V1.0”，不是通用的开源许可证。非商业用途免费；协议写明未获商业授权之前不得用于商业用途。页脚的 EduSoho 名称和官网链接必须保留，也不允许把改过的版本再分发。',
        sources: [{ label: '开源协议 V1.0', url: 'https://github.com/EduSoho/EduSoho/wiki/EduSoho%E5%BC%80%E6%BA%90%E5%8D%8F%E8%AE%AEV1.0%E7%89%88%E6%9C%AC' }],
      },
      alive: alive('2026-02-20', 'https://github.com/edusoho/edusoho'),
      deploy: {
        verdict: 'pending',
        label: '安装教程待核对',
        detail: 'README 只链接到官网的安装教程，教程内容这里还没有核对。从仓库能确认的是：PHP 7.0 以上，框架是 Symfony 3.4。',
        sources: [
          { label: 'README', url: 'https://github.com/edusoho/edusoho#readme' },
          { label: 'composer.json', url: 'https://github.com/edusoho/edusoho/blob/master/composer.json' },
        ],
      },
      cost: {
        verdict: 'pending',
        label: '授权价格待核对',
        detail: '商用的主要成本是商业授权，价格没有公开在仓库里，要问官方。',
      },
      caveats: {
        verdict: 'caution',
        label: '网站根目录必须指到 web',
        detail: 'README 专门提醒：程序运行根目录要配置到 web 目录下，否则课程视频和资料会泄漏。',
        sources: [{ label: 'README', url: 'https://github.com/edusoho/edusoho#readme' }],
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
    repoUrl: 'https://github.com/frappe/lms',
    homepage: 'https://frappe.io/learning',
    facts: {
      commercial: agpl('https://github.com/frappe/lms/blob/develop/license.txt'),
      alive: alive('2026-10-09', 'https://github.com/frappe/lms'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: '官方给了一个安装脚本，下载后带上邮箱和域名执行一条命令，README 说大约五分钟装好。要先有域名，并把 A 记录指到服务器。',
        sources: [
          { label: 'README', url: 'https://github.com/frappe/lms#readme' },
          { label: '安装文档', url: 'https://docs.frappe.io/learning/get-started/installation' },
        ],
      },
      cost: {
        verdict: 'good',
        label: '软件免费',
        short: '软件免费',
        detail: '官方文档没有给自建服务器的配置要求。不想自己运维可以用官方的托管服务 Frappe Cloud，价格这里没有核对。',
        sources: [{ label: '安装文档', url: 'https://docs.frappe.io/learning/get-started/installation' }],
      },
      caveats: {
        verdict: 'caution',
        label: '直播课走 Zoom',
        detail: 'README 里的直播课功能是在系统里创建 Zoom 会议，国内能不能顺畅用要自己试。文档是英文的。',
        sources: [{ label: 'README', url: 'https://github.com/frappe/lms#readme' }],
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
    repoUrl: 'https://github.com/instructure/canvas-lms',
    homepage: 'https://github.com/instructure/canvas-lms/wiki',
    facts: {
      commercial: agpl('https://github.com/instructure/canvas-lms/blob/master/LICENSE'),
      alive: alive('2026-04-30', 'https://github.com/instructure/canvas-lms'),
      deploy: {
        verdict: 'bad',
        label: '门槛高',
        detail: '官方的生产环境安装指南有十九节，要自己装 Ruby 3.4.1 以上、Node 20、PostgreSQL 14 以上、Redis 6 以上，再配 Apache 和 Passenger。指南是按 Ubuntu 22.04 写的。',
        sources: [{ label: '生产环境安装指南', url: 'https://github.com/instructure/canvas-lms/wiki/Production-Start' }],
      },
      cost: {
        verdict: 'caution',
        label: '中等',
        detail: '软件免费。官方建议单机部署至少 8GB 内存。',
        sources: [{ label: '生产环境安装指南', url: 'https://github.com/instructure/canvas-lms/wiki/Production-Start' }],
      },
      caveats: {
        verdict: 'caution',
        label: '还要另起一个编辑器服务',
        detail: '富文本编辑器是一个要单独部署的服务，安装指南里写明生产分支需要它。GitHub 仓库 2026 年 4 月底之后没有新的推送，原因这里没有核对。',
        sources: [{ label: '生产环境安装指南', url: 'https://github.com/instructure/canvas-lms/wiki/Production-Start' }],
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
    repoUrl: 'https://github.com/learningequality/kolibri',
    homepage: 'https://learningequality.org/kolibri/',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        detail: 'MIT。可以商用、修改、闭源，保留版权声明即可。',
        sources: [{ label: '许可证', url: 'https://github.com/learningequality/kolibri/blob/develop/LICENSE' }],
      },
      alive: alive('2026-10-07', 'https://github.com/learningequality/kolibri'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: '官方有 Windows、Debian/Ubuntu、树莓派、macOS、安卓的安装包，也可以用 Python 的 pip 装。',
        sources: [{ label: '安装文档', url: 'https://kolibri.readthedocs.io/en/latest/install/index.html' }],
      },
      cost: {
        verdict: 'good',
        label: '低',
        detail: '软件免费。做服务器的那台机器，官方建议 Linux 下 1GB 内存、Windows 下 2GB 以上，1GHz 处理器。',
        sources: [{ label: '硬件要求', url: 'https://kolibri.readthedocs.io/en/latest/install/system_requirements.html' }],
      },
      caveats: {
        verdict: 'caution',
        label: '是给离线教室用的',
        detail: '它解决的是没有稳定网络时怎么上课，不是对外卖课的网校。硬盘要多大，取决于导入多少课程内容。',
        sources: [
          { label: 'README', url: 'https://github.com/learningequality/kolibri#readme' },
          { label: '硬件要求', url: 'https://kolibri.readthedocs.io/en/latest/install/system_requirements.html' },
        ],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },

  // ---------- 考试测评 ----------
  {
    id: 'xzs',
    name: '学之思开源考试系统',
    industry: 'education',
    uses: ['exam'],
    what: '国产的在线考试系统，Java 加 Vue，有学生端、管理端和微信小程序。',
    repoUrl: 'https://github.com/mindskip/xzs',
    homepage: 'https://www.mindskip.net/xzs.html',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '有条件',
        detail: 'AGPL-3.0。不改代码直接部署使用没有额外义务；改了代码又让学生通过网络使用，就要向这些用户提供改动后的源码。官网另卖带商业授权的版本，社区版不含商业授权。',
        sources: [
          { label: '许可证', url: 'https://github.com/mindskip/xzs/blob/master/LICENSE' },
          { label: '版本对比', url: 'https://www.mindskip.net/xzs.html' },
        ],
      },
      alive: alive('2026-10-09', 'https://github.com/mindskip/xzs'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: '后端打成一个 jar 包运行，环境是 JDK 1.8 加 PostgreSQL 12（另有 MySQL 版仓库）。官方文档给了集成部署、前后端分离、docker-compose 三种方式。',
        sources: [
          { label: '部署文档', url: 'https://www.mindskip.net:888/guide/deploy.html' },
          { label: '技术栈', url: 'https://www.mindskip.net:888/guide/skill.html' },
        ],
      },
      cost: {
        verdict: 'good',
        label: '社区版免费',
        short: '社区版免费',
        detail: '社区版免费，官方文档没有给硬件要求。要商业授权和更多功能，官网报价是标准版 3000 元、高级版 8000 元（源码价）。',
        sources: [{ label: '官网报价', url: 'https://www.mindskip.net/buy.html' }],
      },
      caveats: {
        verdict: 'caution',
        label: '社区版功能少，技术栈旧',
        detail: '社区版没有教师端、题目导入和视频课堂，这些在付费的标准版和高级版里。社区版基于 Spring Boot 2.1.6、JDK 1.8 和 Node 16，都是比较老的版本。',
        sources: [
          { label: '版本对比', url: 'https://www.mindskip.net/xzs.html' },
          { label: '技术栈', url: 'https://www.mindskip.net:888/guide/skill.html' },
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
    repoUrl: 'https://github.com/hydro-dev/Hydro',
    homepage: 'https://hydro.js.org/',
    facts: {
      commercial: {
        verdict: 'caution',
        label: '有条件',
        detail: '主体是 AGPL-3.0 加附加条款：部署时要保留页面底部的“Powered by Hydro”和链接；改了源码要同样以 AGPL-3.0 开源。确实要闭源，README 写的是可以联系作者另买授权。',
        sources: [
          { label: 'README 开源许可一节', url: 'https://github.com/hydro-dev/Hydro#readme' },
          { label: '许可证', url: 'https://github.com/hydro-dev/Hydro/blob/master/LICENSE' },
        ],
      },
      alive: alive('2026-10-09', 'https://github.com/hydro-dev/Hydro'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: '一条命令的安装脚本，README 推荐用 Debian 12，支持 x86_64 和 arm64。安装脚本不支持 CentOS，检测到宝塔面板会警告，建议用干净的系统。',
        sources: [
          { label: 'README', url: 'https://github.com/hydro-dev/Hydro#readme' },
          { label: '安装脚本', url: 'https://github.com/hydro-dev/Hydro/blob/master/install/install.ts' },
        ],
      },
      cost: {
        verdict: 'good',
        label: '低',
        detail: '软件免费，README 说树莓派上也能跑。不想自己运维，官方有免费开通的在线版。服务器配置要求这里没有读到。',
        sources: [{ label: 'README', url: 'https://github.com/hydro-dev/Hydro#readme' }],
      },
      caveats: {
        verdict: 'caution',
        label: '安装脚本带遥测',
        detail: '安装脚本开头写明包含系统遥测，用来统计操作系统和平台，要关得自己看源码。导入洛谷的题目要另外向洛谷购买授权。',
        sources: [
          { label: '安装脚本', url: 'https://github.com/hydro-dev/Hydro/blob/master/install/install.sh' },
          { label: 'README', url: 'https://github.com/hydro-dev/Hydro#readme' },
        ],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
  {
    id: 'qduoj',
    name: '青岛大学 OnlineJudge',
    industry: 'education',
    uses: ['exam', 'coding'],
    what: '青岛大学开源的编程题在线测评系统，基于 Vue、Django 和 Docker。',
    repoUrl: 'https://github.com/QingdaoU/OnlineJudge',
    homepage: 'http://opensource.qduoj.com/',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        detail: 'MIT。可以商用、修改、闭源，保留版权声明即可。',
        sources: [{ label: '许可证', url: 'https://github.com/QingdaoU/OnlineJudge/blob/master/LICENSE' }],
      },
      alive: alive('2024-10-23', 'https://github.com/QingdaoU/OnlineJudge'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: '装好 Docker 后拉部署仓库，执行 docker-compose up -d，文档说 5 到 30 分钟自动搭好。Windows 下只适合体验，文档明确说不要用于生产。',
        sources: [{ label: '部署文档', url: 'https://github.com/QingdaoU/OnlineJudgeDeploy/tree/2.0' }],
      },
      cost: {
        verdict: 'good',
        label: '软件免费',
        short: '软件免费',
        detail: '部署文档没有给服务器配置要求。',
        sources: [{ label: '部署文档', url: 'https://github.com/QingdaoU/OnlineJudgeDeploy/tree/2.0' }],
      },
      caveats: {
        verdict: 'bad',
        label: '两年没更新',
        detail: '主仓库最近一次推送是 2024-10-23，部署仓库是 2024-04-07，出了问题大概率要自己修。安装后的超级管理员默认密码是 rootroot，文档要求立刻改掉。',
        sources: [
          { label: '提交记录', url: 'https://github.com/QingdaoU/OnlineJudge/commits' },
          { label: '部署文档', url: 'https://github.com/QingdaoU/OnlineJudgeDeploy/tree/2.0' },
        ],
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
    repoUrl: 'https://github.com/bigbluebutton/bigbluebutton',
    homepage: 'https://bigbluebutton.org',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        detail: 'LGPL-3.0。自己部署来上课、收费没有限制；改了它本身的代码再分发时，改动部分要开源。',
        sources: [{ label: '许可证', url: 'https://github.com/bigbluebutton/bigbluebutton/blob/v3.0.x-develop/LICENSE' }],
      },
      alive: alive('2026-10-08', 'https://github.com/bigbluebutton/bigbluebutton'),
      deploy: {
        verdict: 'bad',
        label: '门槛高',
        detail: '要一台干净的 Ubuntu 22.04 专用服务器，不能和别的网站共用 80、443 端口；要有域名和有效的 SSL 证书，否则浏览器不给摄像头和麦克风权限；还要放开 UDP 16384 到 32768。官方用 bbb-install.sh 脚本安装。',
        sources: [{ label: '安装文档（3.0）', url: 'https://docs.bigbluebutton.org/administration/install/' }],
      },
      cost: {
        verdict: 'bad',
        label: '高',
        detail: '软件免费，钱花在服务器上。官方的生产环境最低要求是 8 核、16GB 内存、250Mbps 上下行对等带宽；要录课的话磁盘 500GB，不录是 50GB。',
        sources: [{ label: '安装文档（3.0）', url: 'https://docs.bigbluebutton.org/administration/install/' }],
      },
      caveats: {
        verdict: 'caution',
        label: '带宽是大头',
        detail: '250Mbps 对等带宽在国内云上的价格还没有核对，下结论之前要先问一下云厂商的报价。官方文档还要求服务器同时有 IPv4 和 IPv6 地址。',
        sources: [{ label: '安装文档（3.0）', url: 'https://docs.bigbluebutton.org/administration/install/' }],
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
    repoUrl: 'https://github.com/GibbonEdu/core',
    homepage: 'https://gibbonedu.org',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        detail: 'GPL-3.0。学校和机构自己部署使用没有限制；把改过的版本分发给别人时，要同样以 GPL 开源。',
        sources: [{ label: '许可证', url: 'https://github.com/GibbonEdu/core/blob/v31.0.00/LICENSE' }],
      },
      alive: alive('2026-10-09', 'https://github.com/GibbonEdu/core'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: '下载解压、把文件传到服务器、浏览器打开后跟着安装向导走，官方文档一共五步。环境是 Apache 或 Nginx、PHP 8.0 以上、MySQL 8.0 以上。',
        sources: [
          { label: '安装文档', url: 'https://docs.gibbonedu.org/guides/install/installing-gibbon' },
          { label: '系统要求', url: 'https://docs.gibbonedu.org/reference/system-requirements' },
        ],
      },
      cost: {
        verdict: 'good',
        label: '低',
        detail: '软件免费。官方给小型学校的建议配置是 2 核、4 到 8GB 内存、50GB 硬盘；大型学校是 4 核、16GB、300GB。',
        sources: [{ label: '系统要求', url: 'https://docs.gibbonedu.org/reference/system-requirements' }],
      },
      caveats: {
        verdict: 'caution',
        label: '中文靠志愿者翻译',
        detail: '界面翻译由志愿者维护，中文翻到什么程度要装上之后看。文档是英文的。',
        sources: [{ label: 'README', url: 'https://github.com/GibbonEdu/core#readme' }],
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
    repoUrl: 'https://github.com/jupyterhub/jupyterhub',
    homepage: 'https://jupyterhub.readthedocs.io',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        detail: 'BSD-3-Clause。可以商用、修改、闭源，保留版权声明即可。',
        sources: [{ label: '许可证', url: 'https://github.com/jupyterhub/jupyterhub/blob/main/LICENSE' }],
      },
      alive: alive('2026-10-08', 'https://github.com/jupyterhub/jupyterhub'),
      deploy: {
        verdict: 'caution',
        label: '中等',
        detail: '要一台 Linux 服务器、Python 3.10 以上、Node.js，还要域名和 TLS 证书。官方的 Docker 镜像只有 Hub 本身，不带配置，登录方式和怎么给每个学生起环境要自己配。',
        sources: [{ label: 'README', url: 'https://github.com/jupyterhub/jupyterhub#readme' }],
      },
      cost: {
        verdict: 'caution',
        label: '看同时上课的人数',
        short: '看人数',
        detail: '软件免费。官方的小型发行版给了估算公式：内存 = 同时在线人数 × 每人内存上限 + 128MB，同时在线人数建议先按班级人数的 40% 到 60% 算；服务器至少 1GB 内存才能装上。',
        sources: [{ label: '资源估算', url: 'https://tljh.jupyter.org/en/latest/howto/admin/resource-estimation.html' }],
      },
      caveats: {
        verdict: 'caution',
        label: '默认用系统账号登录',
        detail: '默认的登录方式是服务器上的系统账号，要让多个人登录，默认得用 root 权限运行，换成别的方式需要更多配置。',
        sources: [{ label: 'README', url: 'https://github.com/jupyterhub/jupyterhub#readme' }],
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
    repoUrl: 'https://github.com/veyon/veyon',
    homepage: 'https://veyon.io',
    facts: {
      commercial: {
        verdict: 'good',
        label: '可以商用',
        detail: 'GPL-2.0。机构在自己的机房里装来用没有限制；把改过的版本分发给别人时，要同样以 GPL 开源。',
        sources: [{ label: '许可证', url: 'https://github.com/veyon/veyon/blob/main/COPYING' }],
      },
      alive: alive('2026-10-07', 'https://github.com/veyon/veyon'),
      deploy: {
        verdict: 'good',
        label: '容易',
        detail: 'Windows 10 和 11 有安装程序，支持不弹窗的静默安装，适合批量装。Linux 支持 Debian 10、Ubuntu 20.04 等及更新的版本。学生机可以不装教师端组件。',
        sources: [{ label: '安装文档', url: 'https://docs.veyon.io/en/latest/admin/installation.html' }],
      },
      cost: {
        verdict: 'good',
        label: '低',
        detail: '软件免费，不需要服务器。每台电脑至少 2GB 内存，官方强烈建议多核处理器。',
        sources: [{ label: '安装文档', url: 'https://docs.veyon.io/en/latest/admin/installation.html' }],
      },
      caveats: {
        verdict: 'caution',
        label: '看的是机房网络',
        detail: '所有电脑要连在同一个 TCP/IP 网络里，超过 10 台官方建议用千兆网络。',
        sources: [{ label: '安装文档', url: 'https://docs.veyon.io/en/latest/admin/installation.html' }],
      },
    },
    checkedAt: CHECKED_AT,
    confirmed: true,
  },
];

export const OSS_PROJECTS: OssProject[] = ALL_PROJECTS.filter((p) => p.confirmed || SHOW_DRAFTS);

export function ossProjectsOf(industry: OssIndustry): OssProject[] {
  return OSS_PROJECTS.filter((p) => p.industry === industry);
}
