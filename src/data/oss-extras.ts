import { SHOW_DRAFTS } from '@/data/drafts';

// 项目详情页上五件事之外的内容：适不适合、界面截图。按项目 id 对应，和 oss.ts 分开放。
// 两样都各自带 confirmed：作者确认过才上线，没确认的只在本地预览里出现（NEXT_PUBLIC_SHOW_DRAFTS=1）。

// 适不适合：两句话，都要能从这个项目的五件事里找到依据。这是判断，不替作者定，起草后等作者确认。
export interface OssFit {
  considerIf: string;
  considerIfEn: string;
  lookElsewhereIf: string;
  lookElsewhereIfEn: string;
  confirmed: boolean;
}

// 界面截图：只放真实页面的截图（官方演示站或官方文档），不放生成的示意图。文件在 public/oss/shots/ 下。
export interface OssShot {
  src: string;
  width: number;
  height: number;
  alt: string;
  altEn: string;
  caption: string;             // 截的是什么、从哪里截的、哪天截的
  captionEn: string;
  sourceUrl: string;           // 截图的出处，读者可以自己点过去看
  sourceLabel: string;
  sourceLabelEn: string;
  confirmed: boolean;
}

export interface OssExtras {
  fit?: OssFit;
  shot?: OssShot;
}

// “适不适合”都是 Claude 2026-10-13 按各项目的五件事起草的，作者当天逐条看过，全部确认。
// 作者的说法是这些都来自以前确认过的内容：只是把已确认的五件事换个说法，不用再单独找他确认；写进了新的判断或新的事实才需要。
const ALL_EXTRAS: Record<string, OssExtras> = {
  moodle: {
    fit: {
      considerIf: '想把课程、作业、测验和成绩放在一套系统里，而且团队里有人能维护 Web 服务器、PHP 和数据库。',
      considerIfEn: 'You want courses, assignments, quizzes and grades in one system, and someone on your team can run a web server, PHP and a database.',
      lookElsewhereIf: '团队里没人能维护服务器，或者打算用 Moodle 这个名字对外卖托管、培训、技术支持。',
      lookElsewhereIfEn: 'Nobody on the team can maintain a server, or you plan to sell hosting, training or support under the Moodle name.',
      confirmed: true,
    },
    // 2026-10-13 截自 Moodle 官方演示站的 Digital Literacy 课程页。演示站截图能不能放到线上还没核对过官方的素材和商标条款，所以先不确认。
    shot: {
      src: '/oss/shots/moodle.jpg',
      width: 1280,
      height: 800,
      alt: 'Moodle 的课程页：左边是章节目录，右边是各项学习活动和完成情况。',
      altEn: 'A course page in Moodle: a section list on the left, activities with completion status on the right.',
      caption: 'Moodle 5.3 的课程页，截自官方演示站，2026-10-13。',
      captionEn: 'A course page in Moodle 5.3, from the official demo site. Captured 2026-10-13.',
      sourceUrl: 'https://school.moodledemo.net/',
      sourceLabel: '打开演示站',
      sourceLabelEn: 'Try the demo',
      confirmed: false,
    },
  },
  'frappe-lms': {
    fit: {
      considerIf: '想尽快搭起一个简单的课程站：有了域名之后，官方脚本一条命令就能装好。',
      considerIfEn: 'You want a simple course site up quickly: once you have a domain, the official script installs it with one command.',
      lookElsewhereIf: '打算改代码、又不想把改动后的源码提供给学员（AGPL-3.0），或者需要不依赖 Zoom 的直播课。',
      lookElsewhereIfEn: 'You plan to change the code and do not want to offer learners your modified source (AGPL-3.0), or you need live classes that do not depend on Zoom.',
      confirmed: true,
    },
  },
  'canvas-lms': {
    fit: {
      considerIf: '想用很多高校在用的那套系统，而且有工程师能安装和维护 Ruby、PostgreSQL、Redis 和 Apache。',
      considerIfEn: 'You want the system many universities use, and you have engineers who can install and maintain Ruby, PostgreSQL, Redis and Apache.',
      lookElsewhereIf: '小团队、没有专人运维：官方的生产部署文档有十九节，单机建议至少 8GB 内存。仓库从 2026 年 4 月底起没有新的推送，介意这一点的也先别选。',
      lookElsewhereIfEn: 'You are a small team with nobody dedicated to operations: the production guide has nineteen sections and recommends at least 8 GB of RAM on one server. Also think twice if a repository with no pushes since late April 2026 worries you.',
      confirmed: true,
    },
  },
  kolibri: {
    fit: {
      considerIf: '学员所在的地方网络不稳定或者没有网，想找一个能装在普通 Windows、Linux 电脑或树莓派上的学习平台。',
      considerIfEn: 'Your learners have little or no reliable internet, and you want a learning platform that installs on ordinary Windows or Linux machines or a Raspberry Pi.',
      lookElsewhereIf: '想在网上卖课：它解决的是没有稳定网络时怎么教学，不是卖课的店面。',
      lookElsewhereIfEn: 'You want to sell courses online: it solves teaching without reliable internet and is not a storefront.',
      confirmed: true,
    },
  },
  bigbluebutton: {
    fit: {
      considerIf: '要上直播课，想把白板、分组讨论和录制都放在自己的服务器上，而且有人能维护一台专用的 Ubuntu 服务器。',
      considerIfEn: 'You teach live classes and want to host the whiteboard, breakout rooms and recordings yourself, and someone can run a dedicated Ubuntu server.',
      lookElsewhereIf: '拿不出一台 8 核、16GB 内存、250Mbps 对称带宽的专用服务器。',
      lookElsewhereIfEn: 'You cannot dedicate a server with 8 cores, 16 GB of RAM and 250 Mbps of symmetrical bandwidth to it.',
      confirmed: true,
    },
  },
  gibbon: {
    fit: {
      considerIf: '办学校，想把老师、学生、家长和行政的日常管理放在一套系统里，用普通的 PHP 加 MySQL 主机就能跑。',
      considerIfEn: 'You run a school and want the day-to-day administration for teachers, students, parents and staff in one system, on an ordinary PHP and MySQL host.',
      lookElsewhereIf: '需要界面和文档都是完整的本国语言：界面翻译由志愿者维护，文档是英文的。',
      lookElsewhereIfEn: 'You need the interface and documentation fully in your own language: translations are volunteer-run and the docs are in English.',
      confirmed: true,
    },
  },
  jupyterhub: {
    fit: {
      considerIf: '教编程或数据课，想让班上每个学生都有自己的 Notebook 环境，而且有人能管理一台 Linux 服务器。',
      considerIfEn: 'You teach programming or data classes and want every student to have their own notebook environment, and someone can administer a Linux server.',
      lookElsewhereIf: '团队里没人能配置登录方式和学生环境的启动方式：官方镜像不带任何配置，默认用服务器上的系统账号登录。',
      lookElsewhereIfEn: 'Nobody on the team can configure login and how each student’s environment starts: the official image ships with no configuration and logs in with system accounts by default.',
      confirmed: true,
    },
  },
  veyon: {
    fit: {
      considerIf: '管着一间在同一个局域网里的机房，想看学生屏幕、广播教师屏幕、锁屏。',
      considerIfEn: 'You run a computer lab on one local network and want to watch student screens, broadcast the teacher’s screen and lock screens.',
      lookElsewhereIf: '学生在远程上课或者不在同一个网络里：所有电脑必须在同一个 TCP/IP 网络中。',
      lookElsewhereIfEn: 'Your students are remote or on different networks: all the computers have to be on the same TCP/IP network.',
      confirmed: true,
    },
  },

  // 电商零售。下面六条是 Claude 2026-10-13 按作者当天确认的五件事起草的，只是换个说法，没有加新的事实，按上面的约定直接标成已确认。
  woocommerce: {
    fit: {
      considerIf: '已经有 WordPress 站，或者愿意用 WordPress，想尽快把网店开起来：在后台装一个插件，跟着设置向导走就行。',
      considerIfEn: 'You already run WordPress, or are happy to, and want a store open quickly: install one plugin from the admin and follow the setup wizard.',
      lookElsewhereIf: '不想维护 WordPress、主题和一堆插件，或者要的功能大多得另买扩展：按周期扣款、预约这类都是按年付费的。',
      lookElsewhereIfEn: 'You do not want to maintain WordPress, a theme and a stack of plugins, or most of what you need is a paid extension: recurring billing and bookings are both yearly purchases.',
      confirmed: true,
    },
  },
  prestashop: {
    fit: {
      considerIf: '想要一套不依赖 WordPress、带现成店面和后台的独立网店，而且基本不打算改核心代码。',
      considerIfEn: 'You want a standalone store with a ready storefront and back office that does not depend on WordPress, and you do not plan to change the core code.',
      lookElsewhereIf: '打算改核心代码又不想让改动也按 OSL-3.0 授权，或者接受不了跨大版本升级时重新建店、搬数据、重装模块。',
      lookElsewhereIfEn: 'You plan to modify the core and do not want to license those changes under OSL-3.0, or you cannot accept rebuilding the store, moving data and reinstalling modules at each major version.',
      confirmed: true,
    },
  },
  bagisto: {
    fit: {
      considerIf: '团队熟悉 Laravel，想要一套 MIT 许可、带现成店面和后台、能自己改的网店。',
      considerIfEn: 'Your team knows Laravel and wants an MIT-licensed store with a ready storefront and admin that you can modify freely.',
      lookElsewhereIf: '看中的是多商户：这一块不在开源仓库里，是开发商另卖的扩展，2026 年 10 月标价 449 美元。',
      lookElsewhereIfEn: 'Multi-vendor is what you came for: it is not in the open-source repository but a separately sold extension, listed at $449 in October 2026.',
      confirmed: true,
    },
  },
  medusa: {
    fit: {
      considerIf: '有会 TypeScript 的开发者，想自己做店面和业务流程，后端和管理后台用现成的。',
      considerIfEn: 'You have developers who work in TypeScript and want to build your own storefront and business flows on a ready backend and admin.',
      lookElsewhereIf: '团队里没有开发者，或者需要给员工分角色权限、接单点登录：这两样要和 Medusa 公司签企业版协议。',
      lookElsewhereIfEn: 'You have no developers, or you need staff roles and single sign-on: both require an Enterprise agreement with MedusaJS, Inc.',
      confirmed: true,
    },
  },
  saleor: {
    fit: {
      considerIf: '有能运维多个服务的工程团队，店面完全自己做，想要一个只提供接口、只有一个版本、没有商业限制的电商后端。',
      considerIfEn: 'You have an engineering team that can operate several services, you will build the storefront yourself, and you want an API-only commerce backend that comes in a single version with no commercial limitations.',
      lookElsewhereIf: '只有一两个开发者、生意不大：README 自己说这种情况下它会比 WordPress 那一类方案复杂，官方托管的商用套餐每月 1,599 美元起。',
      lookElsewhereIfEn: 'You are one or two developers with a small business: the README itself says this setup is more complex than the WordPress style in that case, and the commercial hosted plans start at $1,599 a month.',
      confirmed: true,
    },
  },
  shopware: {
    fit: {
      considerIf: '想要一套带现成店面和后台、扩展多的网店，拿得出四核、8GB 内存以上的服务器，也有人能用 Docker 部署。',
      considerIfEn: 'You want a store with a ready storefront and admin and a large extension catalogue, you can provide a server with four cores and 8 GB of RAM or more, and someone can deploy with Docker.',
      lookElsewhereIf: '年成交额会超过 100 万欧元又不想转付费套餐（每月 600 欧元起），或者不愿意每年向官方上报成交额。',
      lookElsewhereIfEn: 'Your annual sales will pass €1 million and you do not want to move to a paid plan (from €600 a month), or you are unwilling to report your sales volume to Shopware every year.',
      confirmed: true,
    },
  },
};

// 一个项目能显示出来的附加内容：没确认的部分在线上构建里去掉
export function ossExtras(id: string): OssExtras {
  const extras = ALL_EXTRAS[id] ?? {};
  const visible = <T extends { confirmed: boolean }>(item?: T) => (item && (item.confirmed || SHOW_DRAFTS) ? item : undefined);
  return { fit: visible(extras.fit), shot: visible(extras.shot) };
}
