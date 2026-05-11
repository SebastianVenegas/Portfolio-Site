# Sebastian Venegas Portfolio

A personal portfolio for Sebastian Venegas, built to present selected engineering work, technical background, and contact information in a polished, responsive interface.

## Tech Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- next-themes for dark mode
- Vercel-ready SEO routes for metadata, robots, sitemap, and Open Graph images

## Features

- Responsive landing page with selected case studies
- Dedicated project pages with image carousels and fullscreen viewing
- Dark mode with persisted theme preference
- Resume preview modal with direct PDF download
- Contact page with social links and email CTA
- SEO metadata, sitemap, robots config, and generated Open Graph image

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

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
src/components/ui/       Small shared UI primitives
src/lib/                 Site config, project data, and utilities
public/                  Static images, favicons, resume PDF, and preview assets
```

## Deployment

The site is designed for deployment on Vercel. Connect the repository, keep the default Next.js build settings, and configure the production domain to match `src/lib/site.ts`.

Before publishing changes, run the quality checks above and confirm the resume PDF, image previews, and contact email are current.
