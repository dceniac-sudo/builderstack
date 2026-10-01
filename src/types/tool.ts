export type CategoryType = 'all' | 'open-source' | 'ai-workflow' | 'indie-dev' | 'media-growth';

export interface ToolItem {
  id: string;
  name: string;
  category: 'open-source' | 'ai-workflow' | 'indie-dev' | 'media-growth';
  tagline: string;             // 中文简介
  taglineEn: string;           // 英文简介
  description: string;         // 详细痛点中文说明
  descriptionEn: string;       // 详细痛点英文说明
  alternativeTo?: string;      // 例如 "Zapier", "Notion", "Midjourney"
  tags: string[];              // 标签
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
