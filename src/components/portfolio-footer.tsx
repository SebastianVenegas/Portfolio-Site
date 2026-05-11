import { cn } from "@/lib/utils";

export function PortfolioFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "mt-16 flex flex-col justify-between gap-5 pb-[calc(5.75rem+env(safe-area-inset-bottom))] text-[15px] font-medium leading-none tracking-[-0.02em] text-black/58 dark:text-white/52 sm:mt-20 sm:flex-row sm:items-center sm:pb-[calc(5.25rem+env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <span>© 2026 Sebastian Venegas</span>
      <div className="flex flex-wrap gap-5 sm:gap-6">
        <a
          href="https://www.linkedin.com/in/sebastian-venegass"
          className="underline decoration-black/22 underline-offset-4 transition hover:text-black dark:decoration-white/22 dark:hover:text-white/82"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/SebastianV85305"
          className="underline decoration-black/22 underline-offset-4 transition hover:text-black dark:decoration-white/22 dark:hover:text-white/82"
        >
          X
        </a>
        <a
          href="https://github.com/SebastianVenegas"
          className="underline decoration-black/22 underline-offset-4 transition hover:text-black dark:decoration-white/22 dark:hover:text-white/82"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
