import '../globals.css';

// “按行业找开源项目”这一组页面的读者是老板和管理者，用浅色的独立外壳，不沿用主站的深色样式。
// 只有中文，所以不需要语言切换和 I18nProvider。
export default function OssLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-white text-[#0E1116] antialiased min-h-screen selection:bg-[#0E1116] selection:text-white">
        {children}
      </body>
    </html>
  );
}
