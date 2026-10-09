// 语言和地址的对应关系。单独放一个文件，服务端和浏览器端的代码都能用（i18n.tsx 是浏览器端模块）。

export type Language = 'en' | 'zh';

// 英文页面在根路径下，中文页面在 /zh 下。每个页面构建时就是它自己的语言，
// 所以加载时不会出现先英文后中文的跳动。
export function localePath(lang: Language, path: string) {
  const clean = path.startsWith('/') ? path : '/' + path;
  return lang === 'zh' ? '/zh' + clean : clean;
}
