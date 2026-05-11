"use client";

import Image from "next/image";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useBodyModalState } from "@/lib/use-body-modal-state";

const RESUME_HREF = "/Sebastian-Venegas-Resume.pdf";
const PREVIEW_SRC = "/resume-preview-v2.png";

interface ResumePreviewModalProps {
  children: React.ReactNode;
  className?: string;
  triggerLabel?: string;
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.25 4.25 11.75 11.75M11.75 4.25 4.25 11.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 2.75v6.5m0 0 2.75-2.75M8 9.25 5.25 6.5M3.5 12.75h9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ResumePreviewModal({
  children,
  className,
  triggerLabel = "Open resume preview",
}: ResumePreviewModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  useBodyModalState(isOpen);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

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
      <button
        type="button"
        aria-label={triggerLabel}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto overscroll-contain bg-[#FAFAFA]/90 p-3 backdrop-blur-md dark:bg-[#161616]/92 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <motion.div
              className="relative w-full max-w-[450px] rounded-[26px] border border-black/[0.08] bg-white px-5 py-7 shadow-[0_18px_56px_rgba(0,0,0,0.06)] dark:border-white/[0.1] dark:bg-[#202020] dark:shadow-[0_28px_100px_rgba(0,0,0,0.46)] sm:px-7 sm:py-8"
              initial={{ y: 14, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close resume preview"
                className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full text-black/34 transition hover:bg-black/[0.04] hover:text-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-white/38 dark:hover:bg-white/[0.06] dark:hover:text-white/80"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon className="size-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="group/papers relative mx-auto w-[172px] shrink-0 py-2.5 pr-2.5 sm:w-[190px]">
                  <div className="absolute inset-y-2.5 left-1 right-0 origin-bottom translate-x-0.5 -translate-y-px rotate-[0.75deg] rounded-[10px] border border-black/[0.055] bg-white shadow-[0_8px_18px_rgba(0,0,0,0.045)] transition duration-500 ease-out group-hover/papers:translate-x-1 group-hover/papers:rotate-[2.4deg] dark:border-white/[0.12] dark:bg-white/92 dark:shadow-black/25" />
                  <div className="absolute inset-y-2 left-0 right-1 origin-bottom translate-y-px rotate-[0.25deg] rounded-[10px] border border-black/[0.055] bg-[#FDFDFD] shadow-[0_10px_22px_rgba(0,0,0,0.055)] transition duration-500 ease-out group-hover/papers:translate-x-0.5 group-hover/papers:rotate-[1.6deg] dark:border-white/[0.12] dark:bg-white/88 dark:shadow-black/30" />
                  <div className="relative aspect-[926/1200] origin-bottom overflow-hidden rounded-[10px] border border-black/[0.08] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.1)] transition duration-500 ease-out group-hover/papers:-rotate-[1deg] group-hover/papers:shadow-[0_16px_34px_rgba(0,0,0,0.12)] dark:border-white/[0.12] dark:bg-white dark:shadow-black/40">
                    <Image
                      src={PREVIEW_SRC}
                      alt="First page preview of Sebastian Venegas resume"
                      fill
                      sizes="(min-width: 640px) 190px, 172px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>

                <div className="mt-6 flex max-w-[320px] flex-col items-center">
                  <p className="text-[13px] font-medium leading-none tracking-[-0.005em] text-black/42 dark:text-white/44">
                    Resume PDF
                  </p>
                  <h2
                    id={titleId}
                    className="mt-2.5 font-display text-[28px] font-medium leading-[1.16] tracking-[-0.036em] text-balance text-black/92 dark:text-white/88 sm:text-[32px]"
                  >
                    Download resume
                  </h2>
                  <p
                    id={descriptionId}
                    className="mt-3 text-[14px] leading-6 tracking-[-0.008em] text-black/58 dark:text-white/58 sm:text-[15px] sm:leading-7"
                  >
                    A focused overview of my experience, project work, and
                    technical background.
                  </p>

                  <a
                    href={RESUME_HREF}
                    download
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-black bg-black px-5 py-2.5 text-[13px] font-medium leading-none tracking-[-0.005em] text-white transition duration-200 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/86 dark:bg-white/88 dark:text-[#161616] dark:hover:bg-white/78"
                  >
                    <DownloadIcon className="size-4" />
                    Download resume
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
