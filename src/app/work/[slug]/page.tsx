import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectImageCarousel } from "@/components/project-image-carousel";
import { PortfolioFooter } from "@/components/portfolio-footer";
import { ResumePreviewModal } from "@/components/resume-preview-modal";
import { SectionProgressNav } from "@/components/section-progress-nav";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const soundPlanetIntro = [
  "I worked as a Full-Stack Engineer on Sound Planet, contributing across the product, database, dashboard, and ticket checkout experience for an event platform connected to a record-label direction and live music business.",
  "The work sat at the intersection of creative operations and practical software: helping teams create events, sell tickets, watch ticket activity, and manage the pieces that make a show easier to run.",
] as const;

const soundPlanetSections = [
  {
    id: "what-i-worked-on",
    kicker: "01",
    title: "What I Worked On",
    layout: "text",
    content: [
      "Worked across the public ticketing flow, admin tooling, event creation workflows, and the internal dashboard used to manage the platform day to day.",
      "Contributed to the Supabase PostgreSQL data layer and used cron jobs to support real-time checks around ticket activity, helping the product stay aware of changes without relying only on manual refreshes.",
      "Helped shape the dashboard experience from both a design and engineering perspective, keeping the interface focused on the information organizers need when creating events, tracking tickets, and managing operations.",
    ],
  },
  {
    id: "engineering-focus",
    kicker: "02",
    title: "Engineering Focus",
    layout: "text",
    content: [
      "Built the ticket purchase flow with Stripe Payment Intents and Stripe Payment Elements, keeping checkout flexible while still fitting naturally into the Sound Planet experience.",
      "The engineering work blended full-stack product development with careful UI decisions: clean forms, useful admin views, responsive layouts, and workflows that made event creation feel less like back-office software.",
    ],
  },
  {
    id: "platform-workflows",
    kicker: "03",
    title: "Platform Workflows",
    layout: "text",
    content: [
      "A valuable part of the work was connecting the pieces around an event lifecycle: creating an event, publishing it, selling tickets, monitoring activity, and giving admins enough visibility to manage the process.",
      "That made the project more than a checkout screen. It required thinking through the dashboard, organizer tasks, ticket state, and how product workflows should feel when live-event operations are moving quickly.",
    ],
  },
  {
    id: "technologies",
    kicker: "04",
    title: "Technologies",
    layout: "list",
    content: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "Supabase",
      "PostgreSQL",
      "Node.js",
      "Modern frontend tooling",
      "Jira",
      "GitHub",
    ],
  },
  {
    id: "outcome",
    kicker: "05",
    title: "Outcome",
    layout: "callout",
    content: [
      "Contributed to a more complete event and ticketing product: checkout, admin controls, event setup, dashboard visibility, and database-backed workflows working together as one platform.",
      "It was a strong full-stack project because the frontend, payments, database, and operational tools all had to support the same real-world goal: helping teams run events with fewer rough edges.",
    ],
  },
] as const;

const wayOfGloryIntro = [
  "Way of Glory Payments was a deeper payment-infrastructure project where I worked across donation flows, organization onboarding, connected accounts, and the product surfaces that make those workflows usable.",
  "Instead of treating Stripe as a simple checkout button, the platform needed to support organizations joining the system, accepting donations, receiving payouts, and giving Way of Glory Payments a clear platform-fee model.",
] as const;

const wayOfGlorySections = [
  {
    id: "what-i-worked-on",
    title: "What I Worked On",
    layout: "text",
    content: [
      "Worked on Stripe Connect flows for onboarding organizations, creating connected accounts, accepting donations, and supporting payouts after funds moved through the platform.",
      "Built and refined organization-facing screens around embedded onboarding so teams could move through Stripe account setup without feeling like they had been dropped into a disconnected third-party process.",
      "Contributed to donation and payment interfaces using Stripe Elements, with attention to clear steps, trustworthy states, and a checkout experience that felt appropriate for churches and community organizations.",
    ],
  },
  {
    id: "engineering-focus",
    title: "Engineering Focus",
    layout: "text",
    content: [
      "The core engineering challenge was coordinating platform payments: connected-account onboarding, donation acceptance, Stripe platform fees, and an application fee for Way of Glory Payments.",
      "My focus was keeping those payment details understandable in the product, so organization admins could see the path from setup to donation acceptance to payout without needing to understand every Stripe object behind the scenes.",
    ],
  },
  {
    id: "stripe-connect-aws-infrastructure",
    title: "Stripe Connect + AWS Infrastructure",
    layout: "text",
    content: [
      "The infrastructure combined Stripe Connect payment workflows with AWS-backed storage and database services. AWS S3 buckets supported file and asset storage needs, while PostgreSQL ran on AWS RDS for managed database infrastructure.",
      "That pairing gave the product a stronger foundation around organization onboarding, donation records, payment state, and the operational data needed to support fees, connected accounts, and payouts.",
    ],
  },
  {
    id: "technologies",
    title: "Technologies",
    layout: "list",
    content: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "Auth0",
      "AWS",
      "PostgreSQL",
      "Node.js",
      "Modern frontend tooling",
      "Jira",
      "GitHub",
    ],
  },
  {
    id: "outcome",
    title: "Outcome",
    layout: "text",
    content: [
      "Helped build a payment platform that went beyond one-time donation collection and moved closer to real organization operations: onboarding, connected accounts, fees, donation UI, and payout readiness.",
      "The project strengthened my experience with Stripe Connect and with designing payment-heavy product flows that need to feel simple while handling complex money movement underneath.",
    ],
  },
] as const;

const dynamicFederalIntro = [
  "Working as a Full-Stack Engineer with Dynamic Federal Solutions, I contribute to government-focused web work where the interface has to be clear, credible, and aligned with stakeholder requirements.",
  "A large part of the work is translating documents, reports, and client direction into frontend experiences that feel organized for users while still meeting the practical needs of federal and enterprise environments.",
] as const;

const dynamicFederalSections = [
  {
    id: "what-i-worked-on",
    title: "What I Worked On",
    layout: "text",
    content: [
      "Worked on a government-focused platform, contributing to frontend implementation, responsive UI systems, and product decisions that helped make complex information easier to navigate.",
      "Designed UI in Figma before implementation, including landing page concepts shaped from a requirements and report document provided by the client and stakeholders.",
      "The design process focused on turning those requirements into a clean UX/UI direction that aligned with stakeholder needs, including work connected to the National Institute of Corrections.",
    ],
  },
  {
    id: "engineering-focus",
    title: "Engineering Focus",
    layout: "text",
    content: [
      "Focused on building maintainable frontend pieces that could carry a professional government-facing tone: responsive layouts, clear hierarchy, accessible spacing, and clean component structure.",
      "Because the work started from client documentation, the engineering process had to stay close to the intent of the report while still making practical interface decisions around content, navigation, and visual structure.",
    ],
  },
  {
    id: "design-to-implementation",
    title: "Design-to-Implementation",
    layout: "text",
    content: [
      "The work moved from stakeholder material into Figma concepts, then into frontend implementation. That meant translating requirements, reports, and visual direction into pages that could be reviewed, refined, and shipped.",
      "For the NIC-related landing page direction, the value was in keeping the handoff tight: design choices needed to reflect the source requirements, and implementation needed to preserve the clarity of the approved experience.",
    ],
  },
  {
    id: "technologies",
    title: "Technologies",
    layout: "list",
    content: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "Node.js",
      "JavaScript",
      "Modern frontend tooling",
      "Jira",
      "GitHub",
    ],
  },
  {
    id: "outcome",
    title: "Outcome",
    layout: "text",
    content: [
      "Contributed to a more polished frontend direction for government-related digital work, connecting stakeholder requirements, Figma design, and implementation into one workflow.",
      "The project has been valuable practice in building interfaces where trust, clarity, and alignment with real requirements matter as much as the code itself.",
    ],
  },
] as const;

const interfaceSystemsIntro = [
  "Selected Frontend Work brings together client and frontend work across landing pages, portfolio sites, and modern web interfaces built for small businesses, creators, and product ideas.",
  "The thread across the work is craft: responsive structure, strong typography, intentional spacing, and UI that feels polished enough to ship rather than just mock up.",
] as const;

const interfaceSystemsSections = [
  {
    id: "what-i-worked-on",
    title: "What I Worked On",
    layout: "text",
    content: [
      "Worked across landing pages, portfolio builds, marketing sections, and client-facing interfaces where the first impression needed to be fast, clear, and visually credible.",
      "Created responsive systems that hold up across screen sizes, with attention to layout rhythm, navigation, content hierarchy, and the small interaction details that make a site feel finished.",
      "The work often involved taking a rough direction or business need and turning it into a production-quality interface with a sharper visual system.",
    ],
  },
  {
    id: "engineering-focus",
    title: "Engineering Focus",
    layout: "text",
    content: [
      "Focused on modern frontend execution: reusable sections, clean component structure, fast-loading pages, readable content, and careful handling of spacing, typography, and motion.",
      "These projects were a practical way to sharpen the relationship between design taste and engineering discipline, especially when building interfaces that need to feel simple without looking unfinished.",
    ],
  },
  {
    id: "reusable-patterns",
    title: "Reusable Patterns",
    layout: "text",
    content: [
      "Across the work, I leaned on repeatable section patterns, responsive layout systems, and reusable UI decisions that made each project faster to extend without making every page feel identical.",
      "That approach kept the work practical for clients while still showing frontend craft: consistent spacing, adaptable content blocks, polished hero sections, and components that could support future changes.",
    ],
  },
  {
    id: "technologies",
    title: "Technologies",
    layout: "list",
    content: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "JavaScript",
      "GitHub",
    ],
  },
  {
    id: "outcome",
    title: "Outcome",
    layout: "text",
    content: [
      "Built a body of frontend work that demonstrates range across client needs while keeping the same standard for responsive, production-ready UI.",
      "The collection reflects the kind of interface work I enjoy most: practical, polished, and attentive to the details users notice even when they cannot name them.",
    ],
  },
] as const;

const soundPlanetTechnologies = [
  {
    name: "React",
    logo: "https://svgl.app/library/react_light.svg",
  },
  {
    name: "Next.js",
    logo: "https://svgl.app/library/nextjs_icon_dark.svg",
  },
  {
    name: "TypeScript",
    logo: "https://svgl.app/library/typescript.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://svgl.app/library/tailwindcss.svg",
  },
  {
    name: "Stripe",
    logo: "https://svgl.app/library/stripe.svg",
  },
  {
    name: "Supabase",
    logo: "https://svgl.app/library/supabase.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://svgl.app/library/postgresql.svg",
  },
  {
    name: "Node.js",
    logo: "https://svgl.app/library/nodejs.svg",
  },
  {
    name: "Jira",
    logo: "https://svgl.app/library/atlassian.svg",
  },
  {
    name: "GitHub",
    logo: "https://svgl.app/library/github_light.svg",
  },
] as const;

const wayOfGloryTechnologies = [
  {
    name: "React",
    logo: "https://svgl.app/library/react_light.svg",
  },
  {
    name: "Next.js",
    logo: "https://svgl.app/library/nextjs_icon_dark.svg",
  },
  {
    name: "TypeScript",
    logo: "https://svgl.app/library/typescript.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://svgl.app/library/tailwindcss.svg",
  },
  {
    name: "Stripe",
    logo: "https://svgl.app/library/stripe.svg",
  },
  {
    name: "Auth0",
    logo: "https://svgl.app/library/auth0.svg",
  },
  {
    name: "AWS",
    logo: "https://svgl.app/library/aws_light.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://svgl.app/library/postgresql.svg",
  },
  {
    name: "Node.js",
    logo: "https://svgl.app/library/nodejs.svg",
  },
  {
    name: "Jira",
    logo: "https://svgl.app/library/atlassian.svg",
  },
  {
    name: "GitHub",
    logo: "https://svgl.app/library/github_light.svg",
  },
] as const;

const dynamicFederalTechnologies = [
  {
    name: "React",
    logo: "https://svgl.app/library/react_light.svg",
  },
  {
    name: "Next.js",
    logo: "https://svgl.app/library/nextjs_icon_dark.svg",
  },
  {
    name: "TypeScript",
    logo: "https://svgl.app/library/typescript.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://svgl.app/library/tailwindcss.svg",
  },
  {
    name: "Node.js",
    logo: "https://svgl.app/library/nodejs.svg",
  },
  {
    name: "JavaScript",
    logo: "https://svgl.app/library/javascript.svg",
  },
  {
    name: "Figma",
    logo: "https://svgl.app/library/figma.svg",
  },
  {
    name: "Jira",
    logo: "https://svgl.app/library/atlassian.svg",
  },
  {
    name: "GitHub",
    logo: "https://svgl.app/library/github_light.svg",
  },
] as const;

const interfaceSystemsTechnologies = [
  {
    name: "React",
    logo: "https://svgl.app/library/react_light.svg",
  },
  {
    name: "Next.js",
    logo: "https://svgl.app/library/nextjs_icon_dark.svg",
  },
  {
    name: "TypeScript",
    logo: "https://svgl.app/library/typescript.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://svgl.app/library/tailwindcss.svg",
  },
  {
    name: "Figma",
    logo: "https://svgl.app/library/figma.svg",
  },
  {
    name: "JavaScript",
    logo: "https://svgl.app/library/javascript.svg",
  },
  {
    name: "GitHub",
    logo: "https://svgl.app/library/github_light.svg",
  },
] as const;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Sebastian Venegas`,
      description: project.description,
      url: `/work/${project.slug}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.title} case study by Sebastian Venegas`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Sebastian Venegas`,
      description: project.description,
      creator: siteConfig.xHandle,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const isSoundPlanet = project.slug === "sound-planet";
  const isWayOfGlory = project.slug === "way-of-glory-payments";
  const isDynamicFederal = project.slug === "dynamic-federal-technologies";
  const isInterfaceSystems = project.slug === "interface-systems";
  const caseStudyIntro = isSoundPlanet
    ? soundPlanetIntro
    : isWayOfGlory
      ? wayOfGloryIntro
      : isDynamicFederal
        ? dynamicFederalIntro
        : isInterfaceSystems
          ? interfaceSystemsIntro
          : interfaceSystemsIntro;
  const caseStudySections = isSoundPlanet
    ? soundPlanetSections
    : isWayOfGlory
      ? wayOfGlorySections
      : isDynamicFederal
        ? dynamicFederalSections
        : isInterfaceSystems
          ? interfaceSystemsSections
          : interfaceSystemsSections;
  const caseStudyTechnologies = isSoundPlanet
    ? soundPlanetTechnologies
    : isWayOfGlory
      ? wayOfGloryTechnologies
      : isDynamicFederal
        ? dynamicFederalTechnologies
        : isInterfaceSystems
          ? interfaceSystemsTechnologies
          : interfaceSystemsTechnologies;
  const sectionProgressItems = caseStudySections
    ? [
        { id: "overview", label: "Overview" },
        { id: "visuals", label: "Visuals" },
        ...caseStudySections.map((section) => ({
          id: section.id,
          label: section.title,
        })),
      ]
    : [];
  const projectMark = project.title.slice(0, 2);
  const companyLogo = isSoundPlanet
    ? "/Sound%20Planet%20Logo%20Icon.svg"
    : isWayOfGlory
      ? "/Way%20of%20Glory%20Payments%20Logo%20Icon.svg"
      : isDynamicFederal
        ? "/dynamic-federal-logo.svg"
        : null;

  return (
    <main className="min-h-screen bg-transparent text-[#111111] dark:text-white/88">
      {caseStudySections && <SectionProgressNav sections={sectionProgressItems} />}
      <div className="mx-auto w-full max-w-[760px] px-6 py-8 sm:px-8 sm:py-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[-0.01em] text-black/42 transition hover:text-black dark:text-white/44 dark:hover:text-white/82"
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
          Back
        </Link>

        <header id="overview" className="scroll-mt-12 pt-10 sm:pt-12">
          <div className="mb-7 flex items-center gap-4 text-black/24 dark:text-white/28">
            <span className="relative flex h-9 w-16 items-center justify-center dark:brightness-0 dark:invert">
              <Image
                src="/SV.svg"
                alt="Sebastian Venegas signature mark"
                fill
                sizes="64px"
                className="select-none object-contain opacity-80 [-webkit-user-drag:none]"
                draggable={false}
              />
            </span>
            {!isInterfaceSystems && (
              <>
                <span className="flex size-5 items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M6 6l8 8M14 6l-8 8"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                <span className="relative flex size-10 items-center justify-center rounded-[11px] border border-black/[0.06] bg-white/80 text-[13px] font-semibold text-black/70 dark:border-white/20 dark:bg-white dark:text-black/72">
                  {companyLogo ? (
                    <Image
                      src={companyLogo}
                      alt={`${project.title} logo`}
                      fill
                      sizes="40px"
                      className="select-none object-contain p-1 [-webkit-user-drag:none]"
                      draggable={false}
                    />
                  ) : (
                    projectMark
                  )}
                </span>
              </>
            )}
          </div>

          <p className="mb-3 text-[14px] font-normal leading-none tracking-[-0.01em] text-black/42 dark:text-white/44">
            {project.date}
          </p>

          <h1 className="max-w-[640px] font-display text-[31px] font-medium leading-[1.08] tracking-[-0.045em] text-black/92 dark:text-white/88 sm:text-[42px]">
            {isSoundPlanet
              ? "Sound Planet — Building modern event and ticketing experiences."
              : isWayOfGlory
                ? "Way of Glory Payments — Building modern payment and donation experiences."
                : isDynamicFederal
                  ? "Dynamic Federal Solutions — Frontend systems and enterprise web experiences."
                  : isInterfaceSystems
                    ? "Selected Frontend Work — Polished interfaces for modern web experiences."
                    : "Selected Frontend Work — Polished interfaces for modern web experiences."}
          </h1>
          <div className="mt-5 max-w-[670px] space-y-4 text-[16px] leading-7 tracking-[-0.012em] text-black/58 dark:text-white/60 sm:text-[17px] sm:leading-8">
            {caseStudyIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <section
          id="visuals"
          className="mt-12 scroll-mt-12 space-y-5 sm:mt-14 sm:space-y-7"
        >
          <ProjectImageCarousel images={project.images} title={project.title} />
        </section>

        {caseStudySections && (
          <article className="mt-12 w-full border-t border-black/[0.06] pt-10 dark:border-white/[0.08] sm:mt-14 sm:pt-12">
            {caseStudySections.map((section) => (
              <section
                id={section.id}
                key={section.title}
                className="scroll-mt-12 border-b border-black/[0.055] py-8 first:pt-0 last:border-b-0 last:pb-0 dark:border-white/[0.075] sm:py-9"
              >
                <h2 className="font-display text-[24px] font-medium leading-tight tracking-[-0.04em] text-black/90 dark:text-white/84">
                  {section.title}
                </h2>

                {section.layout === "list" ? (
                  <div className="mt-6 flex max-w-[620px] flex-wrap items-center gap-x-7 gap-y-5">
                    {caseStudyTechnologies.map((technology) => (
                      <div
                        key={technology.name}
                        className="inline-flex items-center gap-2.5 text-black/54 dark:text-white/58"
                      >
                        <div className="relative size-5 shrink-0">
                          {technology.name === "AWS" ? (
                            <>
                              <Image
                                src="https://svgl.app/library/aws_light.svg"
                                alt="AWS logo"
                                fill
                                sizes="20px"
                                draggable={false}
                                unoptimized
                                className="select-none object-contain opacity-85 [-webkit-user-drag:none] dark:hidden"
                              />
                              <Image
                                src="https://svgl.app/library/aws_dark.svg"
                                alt="AWS logo"
                                fill
                                sizes="20px"
                                draggable={false}
                                unoptimized
                                className="hidden select-none object-contain opacity-85 [-webkit-user-drag:none] dark:block"
                              />
                            </>
                          ) : (
                            <Image
                              src={technology.logo}
                              alt={`${technology.name} logo`}
                              fill
                              sizes="20px"
                              draggable={false}
                              unoptimized
                              className={`select-none object-contain opacity-85 [-webkit-user-drag:none] ${
                                technology.name === "GitHub" ? "dark:invert" : ""
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-[14px] font-medium leading-none tracking-[-0.01em]">
                          {technology.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 space-y-5 text-[16px] leading-8 tracking-[-0.01em] text-black/62 dark:text-white/62">
                    {section.content.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </article>
        )}

        <section className="mt-14 border-t border-black/[0.06] pt-9 dark:border-white/[0.08] sm:mt-16 sm:pt-10">
          <h2 className="font-display text-[25px] font-medium leading-tight tracking-[-0.04em] text-black/90 dark:text-white/86 sm:text-[29px]">
            Interested in working together?
          </h2>
          <p className="mt-3 max-w-[560px] text-[15px] leading-7 tracking-[-0.01em] text-black/58 dark:text-white/58 sm:text-[16px]">
            Open to product-focused engineering roles, modern frontend systems,
            and collaborative software teams.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <ResumePreviewModal
              className="inline-flex w-[118px] items-center justify-center whitespace-nowrap rounded-full border border-black bg-black px-5 py-2.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-white transition duration-200 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/86 dark:bg-white/88 dark:text-[#161616] dark:hover:bg-white/78"
            >
              Resume
            </ResumePreviewModal>
            <Link
              href="/contact"
              className="inline-flex w-[118px] items-center justify-center whitespace-nowrap rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-black/72 transition duration-200 hover:border-black/[0.12] hover:bg-black/[0.035] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[0.1] dark:bg-white/[0.055] dark:text-white/72 dark:hover:border-white/[0.16] dark:hover:bg-white/[0.085] dark:hover:text-white/90"
            >
              Contact
            </Link>
          </div>
        </section>

        <PortfolioFooter />
      </div>
    </main>
  );
}
