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
        className="text-xs text-amber-400/90 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-full px-3 py-1 transition-colors"
      >
        {t.footer.wechatButton}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-xs rounded-2xl bg-zinc-950 border border-white/10 p-6 text-center shadow-2xl shadow-black">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
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
            <p className="mt-4 text-sm text-zinc-200">{t.footer.wechat}</p>
          </div>
        </div>
      )}
    </>
  );
};
