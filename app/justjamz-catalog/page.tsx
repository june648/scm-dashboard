"use client";

interface PdfDownload {
  name: string;
  description: string;
  filename: string;
  fileSize: string;
  accentColor: string;
  accentBg: string;
}

const downloads: PdfDownload[] = [
  {
    name: "Full Catalog",
    description: "All JustJamz products: USB-C earbuds, 3.5mm earbuds, and cable organization.",
    filename: "JustJamz-Catalog-FULL.pdf",
    fileSize: "3.0 MB",
    accentColor: "var(--primary)",
    accentBg: "var(--primary-light)",
  },
  {
    name: "USB-C Edition",
    description: "USB-C earbuds only.",
    filename: "JustJamz-Catalog-USB-C.pdf",
    fileSize: "1.5 MB",
    accentColor: "var(--blue)",
    accentBg: "var(--blue-light)",
  },
  {
    name: "3.5mm + Organization Edition",
    description: "3.5mm earbuds and cable organization.",
    filename: "JustJamz-Catalog-3-5mm-Organization.pdf",
    fileSize: "1.7 MB",
    accentColor: "var(--success)",
    accentBg: "var(--success-light)",
  },
];

const pdfIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export default function JustJamzCatalogPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
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

      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
          style={{ color: "var(--gray-500)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--gray-500)";
          }}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to dashboard
        </a>

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            JustJamz Catalog
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: "var(--gray-500)" }}>
            Wholesale product catalog for JustJamz, Seattle Cell Market&apos;s accessories brand. Three editions available below.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.map((d) => (
            <a
              key={d.filename}
              href={`/downloads/${d.filename}`}
              download=""
              className="group block rounded-[var(--radius-lg)] border bg-white px-4 py-3.5 transition-all duration-150 cursor-pointer hover:-translate-y-0.5"
              style={{
                borderColor: "var(--gray-200)",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                (e.currentTarget as HTMLElement).style.borderColor = d.accentColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gray-200)";
              }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]"
                  style={{ background: d.accentBg, color: d.accentColor }}
                >
                  {pdfIcon}
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ background: "var(--blue-light)", color: "var(--blue)" }}
                >
                  PDF
                </span>
              </div>

              <div className="mt-2.5">
                <h2 className="text-[14px] font-semibold" style={{ color: "var(--foreground)" }}>
                  {d.name}
                </h2>
                <p className="mt-0.5 text-[12px] leading-relaxed" style={{ color: "var(--gray-500)" }}>
                  {d.description}
                </p>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[12px] font-medium">
                <span style={{ color: "var(--gray-400)" }}>{d.fileSize}</span>
                <span
                  className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: d.accentColor }}
                >
                  Download
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>

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
