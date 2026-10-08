'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

// 公众号二维码，只在中文界面使用。微信不支持网页一键关注，扫码是唯一可行的方式。
export const WechatQr: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src="/wechat-qr.png"
        alt={t.footer.wechat}
        width={132}
        height={132}
        className="rounded-lg bg-white p-1.5"
      />
      <span className="text-xs text-zinc-400">{t.footer.wechat}</span>
    </div>
  );
};
