"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { AnimatedSignature } from "@/components/animated-signature";
import { Subtle3DCard } from "@/components/subtle-3d-card";
import { useBodyModalState } from "@/lib/use-body-modal-state";
import { cn } from "@/lib/utils";

function ExpandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8.5 4.75H5.75a1 1 0 0 0-1 1V8.5M15.5 4.75h2.75a1 1 0 0 1 1 1V8.5M19.25 15.5v2.75a1 1 0 0 1-1 1H15.5M8.5 19.25H5.75a1 1 0 0 1-1-1V15.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 6.75 17.25 17.25M17.25 6.75 6.75 17.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ProjectTextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={(event) => event.stopPropagation()}
      className="font-medium text-black underline decoration-black/25 underline-offset-[3px] transition-colors duration-200 hover:text-black/72 hover:decoration-black/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25 dark:text-white dark:decoration-white/30 dark:hover:text-white/76 dark:hover:decoration-white/50 dark:focus-visible:ring-white/25"
    >
      {children}
    </Link>
  );
}

function LetterContent({ isFullScreen = false }: { isFullScreen?: boolean }) {
  return (
    <>
      <div
        className={cn(
          "max-w-[520px] space-y-4 text-[15px] leading-7 tracking-[-0.006em] text-black/62 [transform:translateZ(18px)] dark:text-white/62",
          isFullScreen && "max-w-[540px] text-[16px] leading-8",
        )}
      >
        <p className="font-medium text-black/78 dark:text-white/78">
          Hi, I’m Sebastian Venegas, a full-stack software engineer focused on
          building modern web products and digital experiences that feel clear,
          useful, and considered.
        </p>
        <p>
          My work sits where design, engineering, and product judgment meet:
          frontend architecture, product systems, payment workflows, dashboards,
          and interface systems built to be dependable and easy to use.
        </p>
        <p>
          Projects like{" "}
          <ProjectTextLink href="/work/sound-planet">Sound Planet</ProjectTextLink>,
          {" "}
          <ProjectTextLink href="/work/way-of-glory-payments">
            Way of Glory Payments
          </ProjectTextLink>
          ,{" "}
          <ProjectTextLink href="/work/dynamic-federal-technologies">
            Dynamic Federal Solutions
          </ProjectTextLink>
          , and{" "}
          <ProjectTextLink href="/work/interface-systems">
            Selected Frontend Work
          </ProjectTextLink>{" "}
          show that range, from live event experiences and payment flows to
          dashboards, responsive layouts, and polished interface work.
        </p>
        <p>
          I care about taking ideas that are early, messy, or ambitious and
          shaping them into software people can understand quickly. The craft
          matters, but so does the feeling a product leaves behind.
        </p>
        <p>
          This portfolio is a small look at that approach: thoughtful
          interfaces, practical systems, and digital products built with care
          from the first idea to the final detail.
        </p>
      </div>

      <div className={cn("pt-10 [transform:translateZ(24px)]", isFullScreen && "pt-14")}>
        <AnimatedSignature />
        <p className="text-[14px] leading-none text-black/55 dark:text-white/54">
          Sincerely, Sebastian Venegas
        </p>
      </div>
    </>
  );
}

export function LetterCard() {
  const [isOpen, setIsOpen] = React.useState(false);

  useBodyModalState(isOpen);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <Subtle3DCard className="group/letter">
        <motion.article
          layoutId="letter-card"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[560px] cursor-pointer flex-col justify-between rounded-sm border border-black/[0.08] bg-white px-7 py-9 shadow-[0_18px_60px_rgba(0,0,0,0.045)] transition-[box-shadow,colors] duration-300 hover:shadow-[0_24px_80px_rgba(0,0,0,0.065)] dark:border-white/[0.1] dark:bg-[#1B1B1B] dark:shadow-[0_24px_90px_rgba(0,0,0,0.32)] dark:hover:shadow-[0_28px_100px_rgba(0,0,0,0.42)] sm:px-12 sm:py-14"
          onClick={() => setIsOpen(true)}
        >
          <button
            type="button"
            aria-label="Open letter fullscreen"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(true);
            }}
            className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center text-black opacity-100 transition duration-200 hover:scale-105 focus:opacity-100 focus:outline-none dark:text-white/76 sm:opacity-0 sm:group-hover/letter:opacity-100"
          >
            <ExpandIcon className="size-4" />
          </button>
          <LetterContent />
        </motion.article>
      </Subtle3DCard>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            aria-modal="true"
            aria-label="Fullscreen letter"
            role="dialog"
            className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-[#FAFAFA]/90 p-3 backdrop-blur-md dark:bg-[#161616]/92 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsOpen(false)}
          >
            <div className="mx-auto flex min-h-[calc(100dvh-24px)] w-full max-w-[560px] items-start sm:min-h-[calc(100dvh-64px)] sm:items-center">
              <motion.article
                layoutId="letter-card"
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex min-h-[calc(100dvh-24px)] w-full flex-col justify-between rounded-sm border border-black/[0.08] bg-white px-6 pb-8 pt-14 shadow-[0_24px_90px_rgba(0,0,0,0.08)] dark:border-white/[0.1] dark:bg-[#202020] dark:shadow-[0_28px_100px_rgba(0,0,0,0.46)] sm:min-h-[min(680px,calc(100dvh-64px))] sm:px-12 sm:py-16"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label="Close letter"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center text-black/48 transition-colors duration-200 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/25 dark:text-white/48 dark:hover:text-white dark:focus-visible:ring-white/25 sm:right-5 sm:top-5"
                >
                  <CloseIcon className="size-5" />
                </button>
                <LetterContent isFullScreen />
              </motion.article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
