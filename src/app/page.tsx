import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Linkedin02Icon,
} from "@hugeicons/core-free-icons";
import { LetterCard } from "@/components/letter-card";
import { PortfolioFooter } from "@/components/portfolio-footer";
import { ResumePreviewModal } from "@/components/resume-preview-modal";
import { projects } from "@/lib/projects";
import { H1, H2, Lead } from "@/components/ui/typography";

const certifications = [
  {
    title: "Harvard CS50P",
    description: "CS50's Introduction to Programming with Python",
    issuer: "Harvard University / edX",
    href: "https://courses.edx.org/certificates/efefa83f61ec4de298e22bad118b15a1",
    logo: {
      src: "/harvard-crest.png",
      alt: "Harvard University crest",
    },
  },
  {
    title: "Stripe Professional Payments Developer",
    description:
      "Certified credential for integrating ecommerce payment solutions using Stripe APIs and built-in surfaces.",
    issuer: "Stripe",
    href: "https://stripecertifications.credential.net/a51344b2-a853-4c68-aaaf-94613aa28066#acc.J0FAmVhY",
    logo: {
      src: "/stripe.svg",
      alt: "Stripe logo",
    },
  },
] satisfies Array<{
  title: string;
  description: string;
  issuer: string;
  href: string;
  logo: {
    src: string;
    alt: string;
  };
}>;

function formatProjectCardDate(date: string) {
  if (date === "Present") {
    return date;
  }

  const years = date.match(/\d{4}/g);

  if (!years?.length) {
    return date;
  }

  const [startYear] = years;
  const endYear = years.at(-1);

  return startYear === endYear ? startYear : `${startYear} — ${endYear}`;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-[#111111] dark:text-white/88">
      <div className="mx-auto flex w-full max-w-[670px] flex-col gap-16 px-6 py-10 sm:px-8 sm:py-12">
        <section id="top" className="flex flex-col gap-6">
          <div className="max-w-[600px] pt-3">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/edited_headshot_v1_107d4e4e-dec3-4b55-aa91-2283489d7c5a.jpg"
                alt="Portrait of Sebastian Venegas"
                width={48}
                height={48}
                draggable={false}
                priority
                className="size-11 shrink-0 select-none rounded-full border border-black/[0.08] object-cover object-center shadow-[0_8px_24px_rgba(0,0,0,0.08)] [-webkit-user-drag:none] dark:border-white/[0.14] dark:shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:size-12"
              />
              <p className="font-display text-[18px] font-normal leading-none tracking-[-0.018em] text-black/72 dark:text-white/76 sm:text-[20px]">
                Sebastian Venegas
              </p>
            </div>
            <H1 className="max-w-[590px]">
              Full-stack engineer building modern product experiences.
            </H1>
            <Lead className="mt-4 max-w-[560px] text-black/58 dark:text-white/60">
              Focused on modern web applications, payment systems, and
              AI-integrated product experiences across frontend architecture,
              scalable systems, and thoughtful user experience.
            </Lead>
          </div>

          <div className="flex w-fit flex-wrap items-center gap-3.5 text-[13px] font-normal tracking-[-0.005em] text-black/44 dark:text-white/46">
            <a
              href="https://x.com/SebVenegass"
              className="inline-flex items-center gap-1.5 transition hover:text-black dark:hover:text-white/82"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-[13px]"
              >
                <path d="M13.9 10.47 21.34 2h-1.76l-6.46 7.35L7.97 2H2.01l7.8 11.12L2.01 22h1.76l6.82-7.77L16.03 22h5.96l-8.09-11.53Zm-2.42 2.75-.79-1.11L4.41 3.3h2.72l5.08 7.13.79 1.11 6.58 9.23h-2.72l-5.38-7.55Z" />
              </svg>
              Twitter/X
            </a>
            <a
              href="https://github.com/SebastianVenegas"
              className="inline-flex items-center gap-1.5 transition hover:text-black dark:hover:text-white/82"
            >
              <HugeiconsIcon icon={GithubIcon} size={13} strokeWidth={2} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sebastian-venegass"
              className="inline-flex items-center gap-1.5 transition hover:text-black dark:hover:text-white/82"
            >
              <HugeiconsIcon icon={Linkedin02Icon} size={13} strokeWidth={2} />
              LinkedIn
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <Link
              href="/contact"
              className="inline-flex w-[118px] items-center justify-center whitespace-nowrap rounded-full border border-black bg-black px-5 py-2.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-white transition duration-200 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/86 dark:bg-white/88 dark:text-[#161616] dark:hover:bg-white/78"
            >
              Contact
            </Link>
            <ResumePreviewModal
              className="inline-flex w-[118px] items-center justify-center whitespace-nowrap rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-black/72 transition duration-200 hover:border-black/[0.12] hover:bg-black/[0.035] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[0.1] dark:bg-white/[0.055] dark:text-white/72 dark:hover:border-white/[0.16] dark:hover:bg-white/[0.085] dark:hover:text-white/90"
            >
              Resume
            </ResumePreviewModal>
          </div>

        </section>

        <section id="work" className="scroll-mt-10 space-y-4">
          <div className="space-y-3">
            <H2>Selected Work</H2>
          </div>

          <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={`/work/${project.slug}`}
                className="group block"
              >
                <div className="relative h-[205px] overflow-hidden rounded-[14px] border border-black/[0.06] bg-white dark:border-white/[0.09] dark:bg-[#1B1B1B]">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    draggable={false}
                    sizes="(min-width: 640px) 320px, calc(100vw - 48px)"
                    className="size-full select-none object-cover transition-transform duration-500 ease-out [-webkit-user-drag:none] group-hover:scale-[1.035]"
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-4 px-0.5">
                  <h3 className="font-display text-[16px] font-medium leading-none tracking-[-0.025em]">
                    {project.title}
                  </h3>
                  <span className="text-[16px] font-normal leading-none tracking-[-0.02em] text-black/34 dark:text-white/34">
                    {formatProjectCardDate(project.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="certifications" className="scroll-mt-10 space-y-4">
          <H2>Learning &amp; Credentials</H2>

          <div className="grid gap-3">
            {certifications.map((certification) => (
              <article
                key={certification.href}
                className="flex min-h-[132px] items-start gap-4 rounded-[14px] border border-black/[0.06] bg-white px-4 py-5 sm:gap-5 sm:px-5 sm:py-6 dark:border-white/[0.1] dark:bg-[#1B1B1B]"
              >
                <Image
                  src={certification.logo.src}
                  alt={certification.logo.alt}
                  width={56}
                  height={56}
                  draggable={false}
                  className="mt-0.5 size-[52px] shrink-0 select-none object-contain [-webkit-user-drag:none] sm:size-14"
                />

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 self-stretch pt-0.5">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-[17px] font-medium leading-none tracking-[-0.025em]">
                        {certification.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-5 tracking-[-0.008em] text-black/58 dark:text-white/58">
                        {certification.description}
                      </p>
                    </div>

                    <p className="text-[13px] font-medium leading-none tracking-[-0.005em] text-black/42 dark:text-white/42 sm:pt-0.5 sm:text-right">
                      {certification.issuer}
                    </p>
                  </div>

                  <a
                    href={certification.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-[13px] font-medium leading-none tracking-[-0.005em] text-black/62 underline decoration-black/22 underline-offset-4 transition hover:text-black dark:text-white/62 dark:decoration-white/24 dark:hover:text-white/86"
                  >
                    View certificate
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-10 space-y-4">
          <H2>A Note from Me</H2>

          <LetterCard />
        </section>

        <section className="border-t border-black/[0.06] pt-8 dark:border-white/[0.08] sm:pt-9">
          <h2 className="font-display text-[25px] font-medium leading-tight tracking-[-0.04em] text-black/90 dark:text-white/86 sm:text-[29px]">
            Let&apos;s build something thoughtful.
          </h2>
          <p className="mt-3 max-w-[560px] text-[15px] leading-7 tracking-[-0.01em] text-black/58 dark:text-white/58 sm:text-[16px]">
            Open to modern product engineering roles, frontend systems work, and
            collaborative software teams.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/contact"
              className="inline-flex w-[118px] items-center justify-center whitespace-nowrap rounded-full border border-black bg-black px-5 py-2.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-white transition duration-200 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/86 dark:bg-white/88 dark:text-[#161616] dark:hover:bg-white/78"
            >
              Contact
            </Link>
            <ResumePreviewModal
              className="inline-flex w-[118px] items-center justify-center whitespace-nowrap rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-black/72 transition duration-200 hover:border-black/[0.12] hover:bg-black/[0.035] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[0.1] dark:bg-white/[0.055] dark:text-white/72 dark:hover:border-white/[0.16] dark:hover:bg-white/[0.085] dark:hover:text-white/90"
            >
              Resume
            </ResumePreviewModal>
          </div>
        </section>

        <PortfolioFooter />
      </div>
    </main>
  );
}
