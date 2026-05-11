"use client";

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import * as React from "react";
import {
  Briefcase02Icon,
  Home03Icon,
  Mail01Icon,
  NoteEditIcon,
} from "@hugeicons/core-free-icons";
import { MenuBar } from "@/components/ui/bottom-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  MODAL_STATE_CHANGE_EVENT,
  isBodyModalOpen,
} from "@/lib/use-body-modal-state";
import { cn } from "@/lib/utils";

type NavIconProps = {
  className?: string;
};

function NavIcon({
  icon,
  className,
}: NavIconProps & { icon: IconSvgElement }) {
  return (
    <HugeiconsIcon
      aria-hidden="true"
      className={className}
      icon={icon}
      size={21}
      strokeWidth={1.85}
      absoluteStrokeWidth
    />
  );
}

function HomeIcon(props: NavIconProps) {
  return <NavIcon icon={Home03Icon} {...props} />;
}

function WorkIcon(props: NavIconProps) {
  return <NavIcon icon={Briefcase02Icon} {...props} />;
}

function LetterIcon(props: NavIconProps) {
  return <NavIcon icon={NoteEditIcon} {...props} />;
}

function ContactIcon(props: NavIconProps) {
  return <NavIcon icon={Mail01Icon} {...props} />;
}

export function BottomPortfolioMenu() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    function syncModalState() {
      setIsModalOpen(isBodyModalOpen());
    }

    function handleModalStateChange(event: Event) {
      const modalEvent = event as CustomEvent<{ isOpen?: boolean }>;
      setIsModalOpen(Boolean(modalEvent.detail?.isOpen));
    }

    syncModalState();
    window.addEventListener(MODAL_STATE_CHANGE_EVENT, handleModalStateChange);

    return () => {
      window.removeEventListener(
        MODAL_STATE_CHANGE_EVENT,
        handleModalStateChange,
      );
    };
  }, []);

  const menuItems = [
    {
      icon: HomeIcon,
      label: "Home",
      href: "/",
    },
    {
      icon: WorkIcon,
      label: "Work",
      href: "/#work",
    },
    {
      icon: LetterIcon,
      label: "Note",
      href: "/#about",
    },
    {
      icon: ContactIcon,
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <div
      data-bottom-chrome
      aria-hidden={isModalOpen}
      className={cn(
        "bottom-portfolio-menu pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex items-center justify-center gap-2 px-3 transition-[opacity,visibility] duration-200 ease-out",
        isModalOpen && "invisible opacity-0",
      )}
    >
      <MenuBar items={menuItems} className="pointer-events-auto" />
      <div className="pointer-events-auto relative z-10">
        <ThemeToggle />
      </div>
    </div>
  );
}
