import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PortfolioFooter } from "@/components/portfolio-footer";
import { ResumePreviewModal } from "@/components/resume-preview-modal";
import { H1, Lead } from "@/components/ui/typography";
import { siteConfig } from "@/lib/site";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sebastian-venegass",
    action: "Open",
  },
  {
    label: "X",
    href: "https://x.com/SebastianV85305",
    action: "Open",
  },
  {
    label: "GitHub",
    href: "https://github.com/SebastianVenegas",
    action: "Open",
  },
  {
    label: "Resume",
    action: "Preview",
  },
] as const;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sebastian Venegas for full-stack engineering, product engineering, and modern web application work.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Sebastian Venegas",
    description:
      "Contact Sebastian Venegas for full-stack engineering, product engineering, and modern web application work.",
    url: "/contact",
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sebastian Venegas portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sebastian Venegas",
    description:
      "Contact Sebastian Venegas for full-stack engineering, product engineering, and modern web application work.",
    creator: siteConfig.xHandle,
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[670px] flex-col px-6 py-8 sm:px-8 sm:py-10">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium tracking-[-0.01em] text-[color:var(--foreground-muted)] transition hover:text-foreground"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="size-3.5"
          >
            <path
              d="M10.25 3.75 6 8l4.25 4.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </svg>
          Back home
        </Link>

        <section className="flex flex-1 flex-col justify-center py-16 sm:py-20">
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/edited_headshot_v1_107d4e4e-dec3-4b55-aa91-2283489d7c5a.jpg"
              alt="Portrait of Sebastian Venegas"
              width={48}
              height={48}
              draggable={false}
              priority
              className="size-11 shrink-0 select-none rounded-full border border-black/[0.08] object-cover object-center shadow-[0_8px_24px_rgba(0,0,0,0.08)] [-webkit-user-drag:none] dark:border-white/[0.14] dark:shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:size-12"
            />
            <div className="min-w-0">
              <p className="font-display text-[18px] font-normal leading-none tracking-[-0.018em] text-[color:var(--foreground-medium)] sm:text-[20px]">
                Sebastian Venegas
              </p>
              <p className="mt-1.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-[color:var(--foreground-muted)]">
                Contact
              </p>
            </div>
          </div>
          <H1 className="max-w-[590px]">
            Let&apos;s build something thoughtful.
          </H1>
          <Lead className="mt-4 max-w-[560px] text-[color:var(--foreground-soft)]">
            I am open to full-stack engineering roles, product-focused web
            work, and teams building useful software with care. If the work
            needs clean interfaces, reliable systems, or sharp execution, I
            would be glad to hear from you.
          </Lead>

          <div className="mt-8 border-t border-border pt-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-3 rounded-full border border-primary bg-primary py-1.5 pl-5 pr-1.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-primary-foreground transition duration-200 hover:opacity-80"
            >
              <span>Email me</span>
              <span className="grid size-7 place-items-center rounded-full bg-primary-foreground text-primary transition duration-200 group-hover:translate-x-0.5">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="size-3.5"
                >
                  <path
                    d="M4.75 11.25 11.25 4.75M6.25 4.75h5v5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </a>
            <p className="mt-3 text-[13px] leading-5 tracking-[-0.005em] text-[color:var(--foreground-muted)]">
              {siteConfig.email}
            </p>
          </div>

          <div className="mt-10 w-full border-t border-border">
            {socialLinks.map((link) =>
              link.label === "Resume" ? (
                <ResumePreviewModal
                  key={link.label}
                  className="group flex w-full items-center justify-between border-b border-border py-4 text-[15px] font-medium leading-none tracking-[-0.02em] text-[color:var(--foreground-soft)] transition hover:text-foreground"
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className="text-[color:var(--foreground-faint)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--foreground-soft)]"
                  >
                    {link.action}
                  </span>
                </ResumePreviewModal>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center justify-between border-b border-border py-4 text-[15px] font-medium leading-none tracking-[-0.02em] text-[color:var(--foreground-soft)] transition hover:text-foreground"
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className="text-[color:var(--foreground-faint)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--foreground-soft)]"
                  >
                    {link.action}
                  </span>
                </a>
              ),
            )}
          </div>
        </section>

        <PortfolioFooter />
      </div>
    </main>
  );
}
