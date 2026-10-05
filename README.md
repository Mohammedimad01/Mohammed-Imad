# Mohammed Imad Thotan — Portfolio

Live: [https://mohammed-imad.vercel.app](https://mohammed-imad.vercel.app)

React 19 + Vite. Editorial dark aesthetic (Cormorant Garamond · DM Sans · JetBrains Mono), four switchable palettes.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Updating content

All copy lives in `src/data/` — components never hard-code content.

| File | What's in it |
| --- | --- |
| `meta.js` | Name, bio, contact links, hero stats, **`SITE_URL`**, résumé path |
| `experience.js` | Roles, bullets, tools, the margin metric per role |
| `projects.js` | Case studies: summary, problem/approach/impact, metrics, pipeline, **links** |
| `skills.js` | Skill tabs, radar scores (self-assessed), full toolkit lists |
| `achievements.js` | Education, honours, certifications |

## Résumé

Drop the PDF at `public/resume/Mohammed-Imad-Thotan-Resume.pdf` and bump `RESUME.updated` in `meta.js`.
Until it exists, the résumé dialog shows an at-a-glance summary and a "Request the PDF" button.
"Print / save web version" always works — `src/styles/print.css` turns the page into a one-column A4 résumé generated from `src/data/`.

## Contact form

Copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_KEY` to deliver messages to your inbox.
Without a key the form validates, then opens the visitor's email app with the message pre-filled.

## Before deploying

- Replace `https://mohammed-imad.vercel.app` with your real domain in `src/data/meta.js` **and** `index.html` (canonical, OpenGraph, JSON-LD).
- `public/og-image.png` is the 1200×630 link-preview card.

## Structure

```
src/
  components/
    common/    Button, Tag, Modal, Toast, SectionHeader, Reveal, CustomCursor, BrandIcons
    layout/    Navbar, MobileMenu, Footer, GridBackground, ScrollProgress, PrintResume
    sections/  Hero, About, Experience, Projects, SkillsAnalytics (+ lazy SkillRadar),
               Education, Certifications, Contact
    modals/    ProjectDetailModal, CommandPalette, ResumeModal
  context/     Prefs (palette, reduced motion) and UI (dialogs, toasts) providers
  data/        content (see above)
  hooks/       useScrollSpy, useIntersection, useCounter, useKeyboardNav, useThemeTokens
  lib/         scroll / clipboard / navigation helpers
  styles/      variables.css (tokens + palettes), global.css, sections.css, print.css
```

Keyboard: `Ctrl/⌘ K` or `/` opens the command palette.
