export type CategoryType = 'all' | 'local-ai' | 'full-stack' | 'design-content' | 'self-hosted' | 'distribution';

export interface LocalizedTag {
  zh: string;
  en: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'local-ai' | 'full-stack' | 'design-content' | 'self-hosted' | 'distribution';
  stage: string;               // 处于创造者哪个生产阶段 (如 "Step 1: 智能体编排" / "Phase 2: 全栈交付")
  stageEn: string;
  tagline: string;             // 中文简介
  taglineEn: string;           // 英文简介
  description: string;         // 详细痛点中文说明
  descriptionEn: string;       // 详细痛点英文说明
  alternativeTo?: string;      // 例如 "Zapier", "Notion", "Midjourney"
  tags: LocalizedTag[];        // 双语结构化场景标签
  url: string;                 // 官网链接
  githubUrl?: string;          // GitHub 仓库链接
  stars?: string;              // Stars 统计，例如 "48.5k"
  license?: string;            // 开源协议
  pricing: 'Open Source' | 'Freemium' | 'Free';
  featured?: boolean;          // 是否为高亮特色项目
  selfHostCommand?: string;    // 一键 docker run 或自托管安装命令
}

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  labelEn: string;
  iconName: string;
  description: string;
}
