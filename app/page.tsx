const apps = [
  {
    name: "Payroll",
    description: "Master Time Sheet Pay — Track hours, compute pay, and manage team payroll.",
    url: "https://master-time-sheet-pay-client-june648s-projects.vercel.app",
    icon: "💰",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconBg: "bg-green-500/20",
    status: "live",
  },
  {
    name: "Logistics",
    description: "SCM Shipment Tracker — Track shipments, manage plans, payments, and archive.",
    url: "https://scm-shipment-tracker.vercel.app",
    icon: "🚢",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    status: "live",
  },
  {
    name: "Purchase Orders",
    description: "PO Tracker — Finance and purchasing data. Runs locally on Mitch's machine.",
    url: null,
    icon: "📋",
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    iconBg: "bg-purple-500/20",
    status: "local",
  },
  {
    name: "Ad Reports",
    description: "PPC Report — Amazon advertising performance reports and analytics.",
    url: null,
    icon: "📊",
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    iconBg: "bg-orange-500/20",
    status: "local",
  },
  {
    name: "Inventory",
    description: "Re-order Request — Manage product re-order requests from Airtable.",
    url: null,
    icon: "📦",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    iconBg: "bg-pink-500/20",
    status: "local",
  },
  {
    name: "Leave Request",
    description: "Submit your leave application — vacation, sick leave, or time off requests.",
    url: "https://airtable.com/app3dNHI3leMmVU0P/pagCRjX0hwsdAUpSU/form",
    icon: "🏖️",
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30",
    iconBg: "bg-teal-500/20",
    status: "live",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-medium text-green-400">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/15 px-2.5 py-0.5 text-xs font-medium text-slate-400">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
      Local Only
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-2xl">
              ⚡
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                SCM Team Dashboard
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Seattle Cell Market — Internal Tools
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const isClickable = app.url !== null;
            const CardTag = isClickable ? "a" : "div";
            const cardProps = isClickable
              ? { href: app.url, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <CardTag
                key={app.name}
                {...cardProps}
                className={`group relative overflow-hidden rounded-2xl border ${app.borderColor} bg-gradient-to-br ${app.color} p-6 transition-all duration-200 ${
                  isClickable
                    ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20"
                    : "opacity-75"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${app.iconBg} text-2xl`}
                  >
                    {app.icon}
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    {app.name}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {app.description}
                  </p>
                </div>

                {isClickable && (
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Open App
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                )}

                {!isClickable && (
                  <div className="mt-4 text-xs text-slate-500">
                    Available on local machine only
                  </div>
                )}
              </CardTag>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] py-6 text-center text-xs text-[var(--text-secondary)]">
        SCM Internal — Not for public use
      </footer>
    </div>
  );
}
