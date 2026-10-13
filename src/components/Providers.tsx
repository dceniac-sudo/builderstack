'use client';

import React from 'react';
import { I18nProvider, Language } from '@/lib/i18n';

// 每个页面的语言在构建时就定了：英文页面传 en，/zh 下的页面传 zh
export const Providers: React.FC<{ lang: Language; children: React.ReactNode }> = ({ lang, children }) => (
  <I18nProvider lang={lang}>{children}</I18nProvider>
);
