export type CategoryType = 'all' | 'open-source' | 'ai-workflow' | 'indie-dev' | 'media-growth';

export interface ToolItem {
  id: string;
  name: string;
  category: 'open-source' | 'ai-workflow' | 'indie-dev' | 'media-growth';
  tagline: string;             // 精准一句话介绍
  description: string;         // 详细痛点解决说明
  alternativeTo?: string;      // 例如 "Zapier", "Notion", "Midjourney"
  tags: string[];              // 标签，如 ["Self-hosted", "Docker", "Local LLM"]
  url: string;                 // 官网链接
  githubUrl?: string;          // GitHub 仓库链接
  stars?: string;              // Stars 统计，例如 "48.5k"
  license?: string;            // 开源协议，例如 "MIT", "Apache-2.0", "AGPLv3"
  pricing: 'Open Source' | 'Freemium' | 'Free';
  featured?: boolean;          // 是否为高亮特色项目
  selfHostCommand?: string;    // 一键 docker run 或自托管安装命令（极客超爱用）
}

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  labelEn: string;
  iconName: string;
  description: string;
}
