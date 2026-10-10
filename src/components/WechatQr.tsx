'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// 公众号入口，只在中文界面使用。微信不支持网页一键关注，所以点击后弹出二维码让读者扫码。
export const WechatQr: React.FC = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[13px] text-[#141414] bg-[#F5F5F2] hover:bg-[#EFEFEB] rounded-full px-3 py-1.5 transition-colors"
      >
        {t.footer.wechatButton}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#141414]/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-xs rounded-2xl bg-white border border-[#E6E6E2] p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 rounded-lg text-[#5E5E5A] hover:text-[#141414] hover:bg-[#F5F5F2]"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src="/wechat-qr.png"
              alt={t.footer.wechat}
              width={200}
              height={200}
              className="mx-auto rounded-xl bg-white p-2"
            />
            <p className="mt-4 text-sm text-[#141414]">{t.footer.wechat}</p>
          </div>
        </div>
      )}
    </>
  );
};
