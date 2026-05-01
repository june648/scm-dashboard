"use client";

import { ReactNode } from "react";

type AppStatus = "live" | "local" | "coming-soon";

interface AppCard {
  name: string;
  description: string;
  url: string | null;
  icon: ReactNode;
  accentColor: string;
  accentBg: string;
  status: AppStatus;
}

interface Section {
  title: string;
  icon: ReactNode;
  apps: AppCard[];
}

const sections: Section[] = [
  {
    title: "Finance & Admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    apps: [
      {
        name: "Purchase Orders",
        description: "Finance and purchasing data. Runs locally on Mitch's machine.",
        url: null,
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        ),
        accentColor: "var(--purple)",
        accentBg: "var(--purple-light)",
        status: "local",
      },
      {
        name: "Virtual Bundles",
        description: "Calculate bundle pricing, COGS, and margin tiers from Amazon ASINs.",
        url: "https://virtual-bundles.vercel.app",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
        ),
        accentColor: "var(--orange)",
        accentBg: "var(--orange-light)",
        status: "live",
      },
    ],
  },
  {
    title: "Operations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    apps: [
      {
        name: "Inventory",
        description: "Manage product re-order requests from Airtable.",
        url: "https://reorder-request-app.vercel.app",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        ),
        accentColor: "var(--warning)",
        accentBg: "var(--warning-light)",
        status: "live",
      },
      {
        name: "Logistics",
        description: "Track shipments, manage plans, payments, and archive.",
        url: "https://scm-shipment-tracker.vercel.app",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
        ),
        accentColor: "var(--blue)",
        accentBg: "var(--blue-light)",
        status: "live",
      },
      {
        name: "Transfer Requests",
        description: "Create and track inventory transfers between locations.",
        url: "https://transfer-request-app-three.vercel.app",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        ),
        accentColor: "var(--success)",
        accentBg: "var(--success-light)",
        status: "live",
      },
      {
        name: "Inventory Overview",
        description: "View stock levels, inbound shipments, and warehouse inventory.",
        url: null,
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
        ),
        accentColor: "var(--purple)",
        accentBg: "var(--purple-light)",
        status: "coming-soon",
      },
      {
        name: "Product Launch Tracker",
        description: "Track new Amazon product launches through the 7-step process.",
        url: "https://product-launch-tracker-rho.vercel.app",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
        ),
        accentColor: "var(--primary)",
        accentBg: "var(--primary-light)",
        status: "live",
      },
      {
        name: "Ad Reports",
        description: "Amazon advertising performance reports and analytics.",
        url: null,
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
        ),
        accentColor: "var(--orange)",
        accentBg: "var(--orange-light)",
        status: "local",
      },
    ],
  },
  {
    title: "Team",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    apps: [
      {
        name: "Leave Request",
        description: "Submit your leave application — vacation, sick leave, or time off.",
        url: "https://airtable.com/app3dNHI3leMmVU0P/pagCRjX0hwsdAUpSU/form",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        ),
        accentColor: "var(--primary)",
        accentBg: "var(--primary-light)",
        status: "live",
      },
    ],
  },
];

function StatusBadge({ status }: { status: AppStatus }) {
  if (status === "live") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
        style={{ background: "var(--success-light)", color: "var(--success)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--success)" }}></span>
        Live
      </span>
    );
  }
  if (status === "coming-soon") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
        style={{ background: "var(--primary-light)", color: "var(--primary)" }}
      >
        Coming Soon
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
      style={{ background: "var(--gray-100)", color: "var(--gray-400)" }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gray-400)" }}></span>
      Local
    </span>
  );
}

function AppCardComponent({
  app,
}: {
  app: AppCard;
}) {
  const isLocal = app.status === "local";
  const isComingSoon = app.status === "coming-soon";
  const isClickable = app.url !== null && !isComingSoon;
  const isDisabled = isLocal || isComingSoon;

  const Tag = isClickable ? "a" : "div";
  const tagProps =
    isClickable
      ? { href: app.url!, target: "_blank", rel: "noopener noreferrer" }
      : {};

  return (
    <Tag
      {...tagProps}
      className={`group block rounded-[var(--radius-lg)] border bg-white px-4 py-3.5 transition-all duration-150 ${
        isClickable
          ? "cursor-pointer hover:-translate-y-0.5"
          : isDisabled
            ? "opacity-50"
            : ""
      }`}
      style={{
        borderColor: "var(--gray-200)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={
        isClickable
          ? (e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
              (e.currentTarget as HTMLElement).style.borderColor = app.accentColor;
            }
          : undefined
      }
      onMouseLeave={
        isClickable
          ? (e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--gray-200)";
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]"
          style={{ background: app.accentBg, color: app.accentColor }}
        >
          {app.icon}
        </div>
        <StatusBadge status={app.status} />
      </div>

      <div className="mt-2.5">
        <h2 className="text-[14px] font-semibold" style={{ color: "var(--foreground)" }}>
          {app.name}
        </h2>
        <p className="mt-0.5 text-[12px] leading-relaxed" style={{ color: "var(--gray-500)" }}>
          {app.description}
        </p>
      </div>

      {isClickable && (
        <div
          className="mt-2.5 flex items-center gap-1.5 text-[12px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: app.accentColor }}
        >
          Open App
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      )}

      {isLocal && (
        <div className="mt-2.5 text-[12px]" style={{ color: "var(--gray-400)" }}>
          Available on local machine only
        </div>
      )}
    </Tag>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* Header */}
      <header
        className="text-white"
        style={{ background: "var(--primary)", padding: "12px 28px" }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center gap-4">
          <img
            src="/logo.png"
            alt="Seattle Cell Market"
            className="h-9"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <div className="h-8 w-px bg-white/30"></div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Team Dashboard</h1>
            <p className="text-[12px] opacity-80">Internal Tools</p>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <div
                className="mb-4 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--gray-400)" }}
              >
                {section.icon}
                {section.title}
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.apps.map((app) => (
                  <AppCardComponent
                    key={app.name}
                    app={app}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-5 text-center text-[12px]"
        style={{
          color: "var(--gray-400)",
          borderTop: "1px solid var(--gray-200)",
        }}
      >
        SCM Internal — Not for public use
      </footer>
    </div>
  );
}
