import React from 'react';

// 文章正文用的极简 Markdown 渲染，只支持站内文章会用到的写法：
// ## / ### 标题、段落、- 和 1. 列表、| 表格、![图](地址) 加下一行 *图注*、> 引用、--- 分隔线，
// 以及行内的 `代码`、**加粗**、*斜体* 和裸链接。不引入第三方依赖。

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s）)]+)/g;

function inline(text: string): React.ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith('`')) {
      return (
        <code key={i} className="rounded bg-[#EFEFEB] px-1.5 py-0.5 font-mono text-[0.9em] text-[#C2410C]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#141414]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith('http')) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-[#C2410C] hover:underline break-all">
          {part}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((c) => c.trim());

export function renderMarkdown(source: string): React.ReactNode[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    if (line === '---') {
      out.push(<hr key={key++} className="my-10 border-[#E6E6E2]" />);
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      out.push(
        <h3 key={key++} className="mt-8 mb-3 text-base font-semibold text-[#2E2E2B]">
          {inline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      out.push(
        <h2 key={key++} className="mt-12 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-[#141414]">
          {inline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      const next = (lines[i + 1] || '').trim();
      const caption = /^\*[^*].*\*$/.test(next) ? next.slice(1, -1) : '';
      out.push(
        <figure key={key++} className="my-8">
          <img src={img[2]} alt={img[1]} loading="lazy" className="w-full rounded-xl border border-[#E6E6E2]" />
          {caption && <figcaption className="mt-2 text-center text-sm text-[#6F6F6A]">{inline(caption)}</figcaption>}
        </figure>
      );
      i += caption ? 2 : 1;
      continue;
    }

    if (line.startsWith('|')) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++]);
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      out.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-[#E6E6E2]">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-[#F5F5F2] text-[#2E2E2B]">
              <tr>
                {head.map((h, c) => (
                  <th key={c} className="px-4 py-2.5 font-semibold">
                    {inline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-t border-[#E6E6E2]">
                  {r.map((c, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-[#2E2E2B]">
                      {inline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (/^(-|\d+\.)\s/.test(line)) {
      const ordered = /^\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length) {
        const cur = lines[i].trim();
        if (/^(-|\d+\.)\s/.test(cur)) {
          items.push(cur.replace(/^(-|\d+\.)\s+/, ''));
          i++;
        } else if (!cur && /^\s+\S/.test(lines[i + 1] || '') && !/^(-|\d+\.)\s/.test((lines[i + 1] || '').trim())) {
          // 列表项下面缩进的补充段落，并入上一项
          items[items.length - 1] += ` ${lines[i + 1].trim()}`;
          i += 2;
        } else {
          break;
        }
      }
      const List = ordered ? 'ol' : 'ul';
      out.push(
        <List key={key++} className={`my-5 space-y-3 pl-6 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-[#6F6F6A]`}>
          {items.map((it, n) => (
            <li key={n} className="pl-1">
              {inline(it)}
            </li>
          ))}
        </List>
      );
      continue;
    }

    if (line.startsWith('>')) {
      out.push(
        <blockquote key={key++} className="my-6 border-l-2 border-[#141414] pl-4 text-[#2E2E2B]">
          {inline(line.replace(/^>\s*/, ''))}
        </blockquote>
      );
      i++;
      continue;
    }

    out.push(
      <p key={key++} className="my-5">
        {inline(line)}
      </p>
    );
    i++;
  }

  return out;
}
