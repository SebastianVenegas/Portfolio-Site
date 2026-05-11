import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = "Sebastian Venegas portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAFA",
          color: "#111111",
          padding: "72px",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: 28,
              letterSpacing: "-0.04em",
              color: "rgba(17, 17, 17, 0.72)",
            }}
          >
            <span>Sebastian Venegas</span>
          </div>
          <div
            style={{
              border: "1px solid rgba(17, 17, 17, 0.1)",
              borderRadius: 999,
              padding: "12px 20px",
              fontSize: 22,
              letterSpacing: "-0.02em",
              color: "rgba(17, 17, 17, 0.48)",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <h1
            style={{
              margin: 0,
              maxWidth: 880,
              fontSize: 82,
              lineHeight: 0.94,
              letterSpacing: "-0.075em",
              fontWeight: 600,
            }}
          >
            Full-stack engineer building modern product experiences.
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 760,
              fontSize: 30,
              lineHeight: 1.35,
              letterSpacing: "-0.035em",
              color: "rgba(17, 17, 17, 0.58)",
            }}
          >
            {siteConfig.description}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 24,
            letterSpacing: "-0.025em",
            color: "rgba(17, 17, 17, 0.42)",
          }}
        >
          <span>Next.js / TypeScript / Product Engineering</span>
          <span>sebastianvenegas.com</span>
        </div>
      </div>
    ),
    size,
  );
}
