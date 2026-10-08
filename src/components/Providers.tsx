'use client';

import React from 'react';
import { I18nProvider } from '@/lib/i18n';

// 语言状态放在最外层，首页和文章页共用，切换后跳转页面也保持一致
export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <I18nProvider>{children}</I18nProvider>
);
