// 未确认的内容只在本地预览显示：NEXT_PUBLIC_SHOW_DRAFTS=1 npm run build
// 线上构建不带这个变量，所以作者没确认过的内容不会上线。
export const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === '1';
