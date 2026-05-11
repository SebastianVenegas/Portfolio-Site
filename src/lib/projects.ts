export const projects = [
  {
    slug: "sound-planet",
    title: "Sound Planet",
    date: "Aug 2025 — Dec 2025",
    image: "/Untitled%20design%20(1).svg",
    images: [
      "/Untitled%20design%20(1).svg",
      "/Sound%20Planet%20Image%202.jpg",
      "/Sound%20Planet%20Image%203.jpg",
    ],
    eyebrow: "Live Events",
    headline: "Event and ticketing experiences for emerging artists.",
    description:
      "A live event and ticketing platform focused on helping artists host shows, manage events, and create cleaner fan engagement workflows.",
  },
  {
    slug: "way-of-glory-payments",
    title: "Way of Glory Payments",
    date: "Jan 2025 — Jul 2025",
    image: "/way-of-glory-payments.jpg",
    images: [
      "/way-of-glory-payments.jpg",
      "/Way%20of%20Glory%20Payments%20Image%202.jpg",
      "/Way%20of%20Glory%20Payments%20Image%203.jpg",
    ],
    eyebrow: "Payments",
    headline: "Donation and payment flows for organizations.",
    description:
      "A modern payment experience built around donation workflows, onboarding, analytics, and operational simplicity for churches and organizations.",
  },
  {
    slug: "dynamic-federal-technologies",
    title: "Dynamic Federal Solutions",
    date: "Present",
    image: "/DynamicFed.jpg",
    images: ["/DynamicFed.jpg"],
    eyebrow: "Federal Interfaces",
    headline: "Frontend systems for government-related digital work.",
    description:
      "Interface and frontend work focused on clean implementation, accessible layouts, and reliable user experiences for federal technology environments.",
  },
  {
    slug: "interface-systems",
    title: "Selected Frontend Work",
    date: "2024-2026",
    image: "/Work.jpg",
    images: ["/Work.jpg"],
    eyebrow: "Frontend Practice",
    headline: "A body of polished frontend and interface work.",
    description:
      "A collection of landing pages, portfolio sites, and modern web interfaces for businesses and creators, focused on spacing, typography, responsiveness, and product-quality execution.",
  },
] as const;

export type Project = (typeof projects)[number];
