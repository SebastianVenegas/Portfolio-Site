# My Portfolio

I built this personal portfolio to showcase selected engineering projects, my technical background, and ways to get in contact with me through a polished, responsive experience.

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- `next-themes` for dark mode
- Vercel-ready SEO routes for metadata, robots, sitemap, and Open Graph images

## Features

- Responsive landing page featuring selected case studies
- Dedicated project pages with image carousels and fullscreen image viewing
- Dark mode with persisted theme preference
- Resume preview modal with direct PDF download
- Contact page with social links and email call-to-action
- SEO metadata, sitemap, robots configuration, and generated Open Graph image support

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Quality Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
npm audit --audit-level=moderate
```

## Project Structure

```text
src/app/                 App Router pages, layouts, and SEO routes
src/components/          Reusable UI, navigation, modal, and carousel components
src/components/ui/       Shared UI primitives
src/lib/                 Site configuration, project data, and utilities
public/                  Static images, favicons, resume PDF, and preview assets
```

## Deployment

I designed the site for deployment on Vercel. To deploy it, connect the repository, keep the default Next.js build settings, and configure the production domain to match `src/lib/site.ts`.

Before publishing updates, I run the quality checks above and confirm that the resume PDF, project previews, and contact information are all up to date.
