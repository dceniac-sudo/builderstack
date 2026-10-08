# BuilderStack

> What I actually use to build with AI agents, and what broke. Notes from one indie developer.

Live: [https://dceniac.com](https://dceniac.com)

## What is on the site

- **What I learned**: things I tried myself, newest first. Data lives in `src/data/notes.ts`.
- **What I use**: each tool with my own note and a status (daily, sometimes, dropped). Data lives in `src/data/tools.ts`.
- English by default, Chinese via the toggle. Interface copy is in `src/lib/i18n.tsx`.

## Adding content

Every tool and note has a `confirmed` flag. Only confirmed entries are included in a normal build, so drafts never reach the live site. To preview drafts locally:

```bash
NEXT_PUBLIC_SHOW_DRAFTS=1 npm run build
```

A note gets its own page at `/notes/<id>/` when two files exist: `content/notes/<id>.en.md` and `content/notes/<id>.zh.md`, and the entry in `src/data/notes.ts` has `hasPage: true`. Both languages are built into the same page and follow the language toggle. Images go in `public/notes/<id>/`.

Link to a single tool with `https://dceniac.com/#<tool-id>`.

## 🚀 Getting Started

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

### Build for Production

```bash
npm run build
```

The output will be placed in the `out/` directory, ready for deployment to Cloudflare Pages.

## 🛠️ Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

---

© 2026 [BuilderStack](https://dceniac.com). Made for Solo Builders.
