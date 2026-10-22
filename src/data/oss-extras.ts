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
    // 2026-10-13 截自 Moodle 官方演示站的 Digital Literacy 课程页。2026-10-16 核对了 Moodle 的商标条款（只限制暗示背书、用进名称和域名等，没提截图），作者当天确认上线。
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
  jupyterhub: {
    fit: {
      considerIf: '教编程或数据课，想让班上每个学生都有自己的 Notebook 环境，而且有人能管理一台 Linux 服务器。',
      considerIfEn: 'You teach programming or data classes and want every student to have their own notebook environment, and someone can administer a Linux server.',
      lookElsewhereIf: '团队里没人能配置登录方式和学生环境的启动方式：官方镜像不带任何配置，默认用服务器上的系统账号登录。',
      lookElsewhereIfEn: 'Nobody on the team can configure login and how each student’s environment starts: the official image ships with no configuration and logs in with system accounts by default.',
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

  // 餐饮门店。下面两条是 Claude 2026-10-13 按作者当天确认的五件事起草的，只是换个说法，没有加新的事实，按上面的约定直接标成已确认。
  opensourcepos: {
    fit: {
      considerIf: '自己开店，想要一套带库存、进货和报表的网页版收银，手上只有一台小服务器：官方给的最低配置是 512MB 内存，树莓派 3 和 4 也能跑。',
      considerIfEn: 'You run your own shop and want a web-based till with inventory, receivings and reports on a small server: the stated minimum is 512 MB of RAM, and Raspberry Pi 3 and 4 are supported.',
      lookElsewhereIf: '要接刷卡机（官方硬件清单写明不支持），或者想换成自己的牌子卖给别人：每个页面底部的署名不能去掉。',
      lookElsewhereIfEn: 'You need a card reader (the official hardware list says they are not supported), or you want to resell it under your own brand: the footer signature has to stay on every page.',
      confirmed: true,
    },
  },
  tastyigniter: {
    fit: {
      considerIf: '餐厅想有自己的在线点餐和订座网站，一家店或多家分店都行：这些都在免费的核心里，MIT 许可。',
      considerIfEn: 'Your restaurant wants its own online ordering and reservation site, for one location or several: all of that is in the free, MIT-licensed core.',
      lookElsewhereIf: '要的是店里柜台的收银：它不是收银系统。桌边扫码点餐和堂食桌台管理也是付费扩展，2026 年 10 月各标价每年 49 美元。',
      lookElsewhereIfEn: 'You need a till for the counter: it is not a point of sale. Table ordering and dine-in management are also paid extensions, each listed at $49 a year in October 2026.',
      confirmed: true,
    },
  },

  // AI。下面两条是 Claude 2026-10-13 按作者当天确认的五件事起草的，只是换个说法，没有加新的事实，按上面的约定直接标成已确认。
  livetalking: {
    fit: {
      considerIf: '有一块 RTX 3060 以上的显卡，也有人能配 Python 和 CUDA 环境，想让数字人按输入的文字或音频对口型，把画面推到浏览器或直播平台。',
      considerIfEn: 'You have an RTX 3060 or better and someone who can set up Python and CUDA, and you want an avatar that lip-syncs to text or audio and streams to a browser or a live platform.',
      lookElsewhereIf: '要开箱就能语音对话、能用唤醒词打断：这些在付费的商用版里，价格要联系作者。发到 B 站、视频号、抖音的视频不想带 LiveTalking 的水印和标识，也别选。',
      lookElsewhereIfEn: 'You need spoken conversation with wake-word interruption out of the box: that is in the paid commercial edition, priced on request. Also skip it if your videos on Bilibili, WeChat Channels or Douyin cannot carry the LiveTalking watermark and logo.',
      confirmed: true,
    },
  },
  openavatarchat: {
    fit: {
      considerIf: '想要一套能对话的数字人，语音识别、大模型、语音合成和形象都能自己换，也接受默认配置把大模型和语音合成交给阿里云百炼的接口。',
      considerIfEn: 'You want a conversational avatar where speech recognition, the LLM, text-to-speech and the avatar can each be swapped, and you accept that the default preset sends the LLM and text-to-speech to Alibaba Cloud Bailian.',
      lookElsewhereIf: '要同时接很多路对话：LiteAvatar 支不支持多路并发，官方文档前后说法不一。商用前要求每个模型的许可都有定论的也先别选：SenseVoice 能不能商用，许可方还没有最终确认。',
      lookElsewhereIfEn: 'You need many conversations at once: the docs disagree on whether LiteAvatar supports concurrency. Also hold off if you need a settled license for every model before going commercial: the license owner has not yet confirmed whether SenseVoice may be used commercially.',
      confirmed: true,
    },
  },
  // Claude 2026-10-16 按五件事起草，作者当天和条目一起确认
  livekit: {
    fit: {
      considerIf: '团队里有开发，要把视频会议、直播或 AI 实时语音做进自己的产品里，又不想按分钟给云服务付钱。',
      considerIfEn: 'You have developers and want video meetings, live streaming or real-time voice AI inside your own product, without paying a cloud service by the minute.',
      lookElsewhereIf: '想要装上就能开会的成品：会议界面和登录要自己做，录制还要另外部署 Egress。没有自己的域名、开不了一整段 UDP 端口，也别自己部署，先用官方云的免费档。',
      lookElsewhereIfEn: 'You want a meeting app that works out of the box: the interface and login are yours to build, and recording means deploying Egress as well. If you have no domain of your own or cannot open a full UDP port range, skip self-hosting and start on the official cloud’s free tier.',
      confirmed: true,
    },
  },
  // 下面三条是 Claude 2026-10-13 按各自的五件事起草的，作者当天和条目一起看过，确认。
  chatwoot: {
    fit: {
      considerIf: '想把网站在线聊天、邮件和社交消息收进同一个收件箱，团队里有人能维护一台 Linux 服务器；核心是 MIT，社区版免费。',
      considerIfEn: 'You want website live chat, email and social messaging in one inbox, and someone on your team can run a Linux server; the core is MIT and the Community edition is free.',
      lookElsewhereIf: '免费就要角色权限、SLA、单点登录或者换成自己的品牌：这些不在社区版里，要按坐席付费，每坐席每月 19 或 99 美元。',
      lookElsewhereIfEn: 'You need roles and permissions, SLAs, single sign-on or your own branding for free: none of these are in the Community edition, and the paid tiers are $19 or $99 per agent a month.',
      confirmed: true,
    },
  },
  zammad: {
    fit: {
      considerIf: '客户主要通过邮件来找你，想把来信变成工单统一处理，服务器能给到 10 GB 左右的内存（含 Elasticsearch）。',
      considerIfEn: 'Most customers reach you by email, you want every message turned into a ticket in one place, and you can give the server about 10 GB of RAM including Elasticsearch.',
      lookElsewhereIf: '只有一台小服务器：最低也要 6 GB 内存，不装 Elasticsearch 搜索会很受限。打算改代码后对外提供服务又不想公开改动的，也别选，它是 AGPL-3.0。',
      lookElsewhereIfEn: 'You only have a small server: the minimum is 6 GB of RAM, and without Elasticsearch search is very limited. Also skip it if you plan to modify the code and serve it to others without publishing your changes; it is AGPL-3.0.',
      confirmed: true,
    },
  },
  odoo: {
    fit: {
      considerIf: '想把销售、采购、库存和生产放进一套系统，社区版里的开票、库存、采购、生产（MRP）够用，团队里有人能维护 Linux 服务器和 PostgreSQL。',
      considerIfEn: 'You want sales, purchasing, inventory and manufacturing in one system, the Community edition’s invoicing, inventory, purchase and MRP are enough, and someone can run a Linux server with PostgreSQL.',
      lookElsewhereIf: '离不开完整的财务、条码、车间排程、PLM 或质量管理：这些只在企业版里，自己部署企业版的标价是每用户每月 61 美元。',
      lookElsewhereIfEn: 'You depend on full accounting, barcode scanning, shop-floor scheduling, PLM or quality management: these are Enterprise only, and running Enterprise on your own server is listed at $61 per user a month.',
      confirmed: true,
    },
  },
};

// 英文详情页在搜索结果里显示的摘要：先说结论（免不免费、什么许可证、要花多少、最要紧的一条注意事项），160 个字符以内。
// 2026-10-13 按搜索量改的：人们搜的是 pricing、free、cost，不是 commercial use。内容都来自各项目已确认的五件事，没有新的事实。
// 改了五件事里的数（价格、配置）要回来同步这里。没写的项目用 whatEn。
const SEARCH_SUMMARY_EN: Record<string, string> = {
  moodle: 'Free to self-host under GPL-3.0, on 1 GB of RAM. Moodle’s own hosting, MoodleCloud, is about $170 to $2,110 a year for 50 to 750 users, with no plugins.',
  'canvas-lms': 'Free under AGPL-3.0, but hard to self-host: a 19-section install guide and 8 GB of RAM. Change the code and you must offer users your source.',
  kolibri: 'Free under MIT, commercial use allowed. Installers for Windows, Linux, macOS, Raspberry Pi and Android. Built for offline classrooms, not for selling courses.',
  bigbluebutton: 'Free under LGPL-3.0, paid classes allowed. The server is the cost: the stated production minimum is 8 cores, 16 GB of RAM and 250 Mbps symmetrical bandwidth.',
  jupyterhub: 'JupyterHub is a multi-user Jupyter notebook server: each student gets their own environment. Free under BSD-3-Clause; memory grows with concurrent users.',
  woocommerce: 'The plugin is free (GPL), with no platform fee or revenue share. Woo’s own estimate: hosting $25 to $350 a month, extensions $29 to $299 a year each.',
  prestashop: 'Free under OSL-3.0. Modify the core and run a public store on it, and your version must be OSL-3.0 too. Official hosted plan from €24 a month before VAT.',
  bagisto: 'Free under MIT, commercial use allowed. One Docker command starts a full store. Official cloud hosting from $25 a month. Multi-vendor is a $449 extension.',
  medusa: 'Medusa is a TypeScript commerce platform: a backend and admin, you build the storefront. The core is free under MIT; staff roles and SSO need Enterprise.',
  saleor: 'Free under BSD-3-Clause, one version with no feature limits. Hard to self-host: six services to assemble. Saleor Cloud for commercial use from $1,599 a month.',
  shopware: 'The code is MIT and the Community Edition is free. Above €1M in yearly sales you need a paid plan, from €600 a month, to keep buying and updating extensions.',
  opensourcepos: 'Free under MIT terms plus one rule: the footer credit stays on every page, so no reselling under your own brand. Runs on 512 MB of RAM. No card reader support.',
  tastyigniter: 'Free under MIT. Online ordering and reservations are in the free core; table ordering and dine-in extensions are $49 a year each. It is not a point of sale.',
  livetalking: 'Free under Apache-2.0, commercial use allowed. Videos you publish on video platforms must carry its watermark. Needs a GPU: RTX 3060 or better.',
  livekit: 'Free under Apache-2.0. A toolkit, not a meeting app. Self-hosting needs a domain and UDP ports 50000-60000. LiveKit Cloud is free to start, then $50 a month.',
  openavatarchat: 'The project is Apache-2.0. Two of its models need a license check before commercial use: SenseVoice and one FlashHead component. Needs a GPU or paid APIs.',
  chatwoot: 'The core is free under MIT. Roles, SLAs, SSO and custom branding are paid: $19 or $99 per agent a month when self-hosted. Runs on 2 cores and 4 GB of RAM.',
  zammad: 'Free under AGPL-3.0. Needs 2 cores and 6 GB of RAM, plus 4 GB for Elasticsearch, which search and reports depend on. Hosted plans from €7 per agent a month.',
  odoo: 'The Community edition is free under LGPL-3.0, but leaves out full accounting, barcode, shop floor, PLM and Quality. Enterprise is $31.10 per user a month.',
};

// 英文详情页的标题默认是“Is 项目名 free? Pricing, license and caveats”。名字里已经带 open source 的不适合这么问，在这里单独写。
// 2026-10-19 按 Search Console 的真实查询改了两个：jupyterhub 被搜的是 what is jupyterhub，medusa 被搜的是 medusa platform / commerce。
// 2026-10-22：moodle 被搜的是 moodle pricing。
const SEARCH_TITLE_EN: Record<string, string> = {
  moodle: 'Moodle pricing: is it free? MoodleCloud plans and caveats',
  opensourcepos: 'Open Source Point of Sale: pricing, license and caveats',
  jupyterhub: 'What is JupyterHub? Is it free? Pricing, license and caveats',
  medusa: 'Is the Medusa commerce platform free? Pricing and caveats',
};

// 英文详情页第一屏的一句价格结论，放在项目简介下面。只给 Search Console 里真有人搜价格的项目写（2026-10-19：odoo pricing、is odoo free、woocommerce pricing；2026-10-22：moodle pricing）。
// 内容都来自已确认的成本一项；改了成本里的数要同步这里。
const PRICE_ANSWER_EN: Record<string, string> = {
  woocommerce: 'The plugin is free, with no platform fee or revenue share. You pay for hosting (Woo estimates $25 to $350 a month) and any paid extensions ($29 to $299 a year each).',
  moodle: 'Free to self-host; you pay for the server. Moodle’s own hosting, MoodleCloud, is about $170 a year for 50 users up to $2,110 for 750, charged in AUD. Selling courses via Stripe starts at the $500 plan.',
  odoo: 'Community is free. Enterprise is $31.10 per user a month on Odoo’s hosting, or $61.00 to run it on your own server, billed yearly ($24.90 and $49.00 for the first 12 months). Light Users are $8.90.',
};

export function ossSearchSummaryEn(id: string): string | undefined {
  return SEARCH_SUMMARY_EN[id];
}

export function ossPriceAnswerEn(id: string): string | undefined {
  return PRICE_ANSWER_EN[id];
}

export function ossSearchTitleEn(id: string, name: string): string {
  return SEARCH_TITLE_EN[id] ?? `Is ${name} free? Pricing, license and caveats`;
}

// 一个项目能显示出来的附加内容：没确认的部分在线上构建里去掉
export function ossExtras(id: string): OssExtras {
  const extras = ALL_EXTRAS[id] ?? {};
  const visible = <T extends { confirmed: boolean }>(item?: T) => (item && (item.confirmed || SHOW_DRAFTS) ? item : undefined);
  return { fit: visible(extras.fit), shot: visible(extras.shot) };
}
