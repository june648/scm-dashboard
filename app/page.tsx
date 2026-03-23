"use client";

const apps = [
  {
    name: "Payroll",
    description:
      "Master Time Sheet Pay — Track hours, compute pay, and manage team payroll.",
    url: "https://master-time-sheet-pay-client-june648s-projects.vercel.app",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accentColor: "var(--success)",
    accentBg: "var(--success-light)",
    status: "live" as const,
  },
  {
    name: "Logistics",
    description:
      "SCM Shipment Tracker — Track shipments, manage plans, payments, and archive.",
    url: "https://scm-shipment-tracker.vercel.app",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    accentColor: "var(--blue)",
    accentBg: "var(--blue-light)",
    status: "live" as const,
  },
  {
    name: "Purchase Orders",
    description:
      "PO Tracker — Finance and purchasing data. Runs locally on Mitch's machine.",
    url: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    accentColor: "var(--purple)",
    accentBg: "var(--purple-light)",
    status: "local" as const,
  },
  {
    name: "Ad Reports",
    description:
      "PPC Report — Amazon advertising performance reports and analytics.",
    url: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    accentColor: "var(--orange)",
    accentBg: "var(--orange-light)",
    status: "local" as const,
  },
  {
    name: "Inventory",
    description:
      "Re-order Request — Manage product re-order requests from Airtable.",
    url: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    accentColor: "var(--warning)",
    accentBg: "var(--warning-light)",
    status: "local" as const,
  },
  {
    name: "Leave Request",
    description:
      "Submit your leave application — vacation, sick leave, or time off requests.",
    url: "https://airtable.com/app3dNHI3leMmVU0P/pagCRjX0hwsdAUpSU/form",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    accentColor: "var(--primary)",
    accentBg: "var(--primary-light)",
    status: "live" as const,
  },
];

function StatusBadge({ status }: { status: "live" | "local" }) {
  if (status === "live") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
        style={{ background: "var(--success-light)", color: "var(--success)" }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--success)" }}
        ></span>
        Live
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
      style={{ background: "var(--gray-100)", color: "var(--gray-400)" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--gray-400)" }}
      ></span>
      Local
    </span>
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
            src="/logo.jpg"
            alt="Seattle Cell Market"
            className="h-10 rounded"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <div className="h-8 w-px bg-white/30"></div>
          <div>
            <h1 className="text-lg font-bold leading-tight">
              Team Dashboard
            </h1>
            <p className="text-[12px] opacity-80">
              Internal Tools
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const isClickable = app.url !== null;
            const CardTag = isClickable ? "a" : "div";
            const cardProps = isClickable
              ? {
                  href: app.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <CardTag
                key={app.name}
                {...cardProps}
                className={`group block rounded-[var(--radius-lg)] border bg-white p-5 transition-all duration-150 ${
                  isClickable
                    ? "cursor-pointer hover:-translate-y-0.5"
                    : "opacity-60"
                }`}
                style={{
                  borderColor: "var(--gray-200)",
                  boxShadow: "var(--shadow-sm)",
                  ...(isClickable
                    ? {}
                    : {}),
                }}
                onMouseEnter={
                  isClickable
                    ? (e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "var(--shadow-md)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          app.accentColor;
                      }
                    : undefined
                }
                onMouseLeave={
                  isClickable
                    ? (e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "var(--shadow-sm)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--gray-200)";
                      }
                    : undefined
                }
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)]"
                    style={{
                      background: app.accentBg,
                      color: app.accentColor,
                    }}
                  >
                    {app.icon}
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="mt-3.5">
                  <h2
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {app.name}
                  </h2>
                  <p
                    className="mt-1 text-[13px] leading-relaxed"
                    style={{ color: "var(--gray-500)" }}
                  >
                    {app.description}
                  </p>
                </div>

                {isClickable && (
                  <div
                    className="mt-3.5 flex items-center gap-1.5 text-[13px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: app.accentColor }}
                  >
                    Open App
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                )}

                {!isClickable && (
                  <div
                    className="mt-3.5 text-[12px]"
                    style={{ color: "var(--gray-400)" }}
                  >
                    Available on local machine only
                  </div>
                )}
              </CardTag>
            );
          })}
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
