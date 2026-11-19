import type { OssVerdict } from '@/types/oss';

export type GuideAuditBasis = 'primary-source' | 'hands-on';

export interface GuideSpecCell {
  label: string;
  value: string;
  dot?: OssVerdict;
  href?: string;
}

export interface GuideVerdictCard {
  kicker: string;
  badgeText: string;
  badgeTone: 'good' | 'warn' | 'bad';
  metricPrimary: string;
  metricSub?: string;
  metricTone?: 'ink' | 'good' | 'bad';
  title: string;
  body: string;
}

export interface GuideMatrixRow {
  id: string;
  filterGroup: string;
  projectName: string;
  category: string;
  projectHref: string;
  verdict: OssVerdict;
  rowTint?: 'none' | 'good' | 'bad';
  microBadge?: { text: string; tone: 'good' | 'warn' | 'bad' };
  licenseTitle: string;
  licenseNote: string;
  lockedSummary: string;
  lockedHighlight?: { text: string; tone: 'good' | 'warn' | 'bad' };
  minStackTitle: string;
  minStackNote: string;
  paidFloorTitle: string;
  paidFloorNote: string;
  paidFloorTone?: 'ink' | 'good' | 'bad';
  sourceUrl: string;
  sourceLabel: string;
}

export interface GuideStackedBar {
  id: string;
  title: string;
  totalLabel: string;
  savingsBadge?: string;
  segments: {
    label: string;
    percent: number;
    tone: 'ink' | 'good' | 'warn';
  }[];
  caption: string;
}

export interface GuideTcoBreakdown {
  kicker: string;
  heading: string;
  summary: string;
  bars: GuideStackedBar[];
  tableColumns: [string, string, string, string];
  tableRows: {
    component: string;
    col1: string;
    col1Tone?: 'ink' | 'good' | 'bad';
    col2: string;
    col2Tone?: 'ink' | 'good' | 'bad';
    col3: string;
    col3Tone?: 'ink' | 'good' | 'bad';
    bold?: boolean;
  }[];
  ctaKicker: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
  quickLinks: { label: string; href: string }[];
}

export interface GuideProseSection {
  id: string;
  kicker: string;
  heading: string;
  intro?: string;
  bullets?: { lead: string; text: string }[];
  codeBlock?: { label: string; code: string };
  figure?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  };
  callout?: { title: string; body: string; tone: 'warn' | 'good' };
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface GuideSummary {
  slug: string;
  href: string;
  docId: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  updatedAt: string;
  auditBasis: GuideAuditBasis;
  sampleLabel: string;
  relatedProjectIds: string[];
  relatedVsSlugs: string[];
}

export interface GuideArticleView extends GuideSummary {
  metaTitle: string;
  metaDescription: string;
  crumbLabel: string;
  specCells: GuideSpecCell[];
  indexLinks: { id: string; label: string }[];
  verdictsHeading: string;
  verdictsSub: string;
  verdictsRightTag: string;
  verdictCards: GuideVerdictCard[];
  matrixSection?: {
    id: string;
    kicker: string;
    heading: string;
    sub: string;
    filters: { id: string; label: string }[];
    columns: [string, string, string, string, string, string];
    rows: GuideMatrixRow[];
    legendNote: string;
  };
  tcoSection?: GuideTcoBreakdown;
  proseSections: GuideProseSection[];
  faqs: GuideFaq[];
}
