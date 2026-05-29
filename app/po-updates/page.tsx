"use client";

import { useEffect, useState } from "react";

interface PoUpdate {
  id: string;
  itemName: string;
  availableIn: string | null;
  notes: string;
  updatedBy: string;
  createdAt: string;
}

interface PoRecord {
  id: string;
  poNumber: string;
  description: string;
  status: string;
  updates: PoUpdate[];
}

interface StatusOption {
  name: string;
  color: string; // Airtable color token, e.g. "blueLight2"
}

// Fallback status order, used only if the live Airtable schema read is
// unavailable. Normally the names AND colors come straight from Airtable.
const STATUS_OPTIONS: StatusOption[] = [
  { name: "Sourcing", color: "blueLight2" },
  { name: "In Production", color: "purpleLight2" },
  { name: "Partially Ready", color: "cyanLight2" },
  { name: "Ready to Ship", color: "tealLight2" },
  { name: "In Transit", color: "greenLight2" },
  { name: "Delivered", color: "yellowLight2" },
  { name: "Closed", color: "orangeLight2" },
];

// Translate an Airtable single-select color token (e.g. "blueLight2") into a
// soft badge background + readable text color, so badges match Airtable.
function airtableColorStyle(token: string): { bg: string; color: string } {
  const base = token.replace(/(Light|Bright|Dark)\d?$/i, "").toLowerCase();
  const map: Record<string, { bg: string; color: string }> = {
    blue: { bg: "#dbe8ff", color: "#2554b0" },
    cyan: { bg: "#d6eff7", color: "#0e7490" },
    teal: { bg: "#d3f0ec", color: "#0b7a6b" },
    green: { bg: "#e2f5e9", color: "#1e874b" },
    yellow: { bg: "#fdf3d3", color: "#9a7400" },
    orange: { bg: "#ffe8d4", color: "#b5550f" },
    red: { bg: "#ffe0e0", color: "#c0392b" },
    pink: { bg: "#fde0ee", color: "#b03a76" },
    purple: { bg: "#efe4f7", color: "#7d3c98" },
    gray: { bg: "#eceef2", color: "#5b6270" },
    grey: { bg: "#eceef2", color: "#5b6270" },
  };
  return map[base] || { bg: "var(--purple-light)", color: "var(--purple)" };
}

// Render a timestamp in Philippine / China time (UTC+8).
function formatPHT(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

// Render a plain date (no time) for "Available In".
function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso + "T00:00:00"));
  } catch {
    return iso;
  }
}

export default function PoUpdatesPage() {
  const [pos, setPos] = useState<PoRecord[]>([]);
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>(STATUS_OPTIONS);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Which PO's "add update" form is open
  const [addUpdateFor, setAddUpdateFor] = useState<string | null>(null);
  const [showNewPo, setShowNewPo] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/po-board", { cache: "no-store" });
      const data = await res.json();
      setConfigured(data.configured !== false);
      setPos(data.pos || []);
      if (Array.isArray(data.statusOptions) && data.statusOptions.length > 0) {
        setStatusOptions(data.statusOptions);
      }
      if (data.error) setError(data.error);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <header className="text-white" style={{ background: "var(--primary)", padding: "12px 28px" }}>
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

        <div className="mt-4 mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              PO Update Board
            </h1>
            <p className="mt-1 text-[13px]" style={{ color: "var(--gray-500)" }}>
              Track purchase orders and per-item availability. The supplier posts when each item is
              ready; the team reviews here. Times shown in PHT (UTC+8).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-2 text-[13px] font-medium transition-colors"
              style={{ borderColor: "var(--gray-200)", color: "var(--gray-500)", background: "white" }}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992V4.356M3.985 14.652H-.007m.022 0H4.99m0 0v4.992m14.05-9.296a8.25 8.25 0 00-13.788-3.448L2.985 9.348m0 0H7.49m11.025 5.304a8.25 8.25 0 01-13.788 3.448L2.985 14.652" />
              </svg>
              Refresh
            </button>
            {configured && (
              <button
                onClick={() => setShowNewPo((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] px-3 py-2 text-[13px] font-semibold text-white transition-colors"
                style={{ background: "var(--primary)" }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New PO
              </button>
            )}
          </div>
        </div>

        {showNewPo && configured && (
          <NewPoForm
            options={statusOptions}
            onClose={() => setShowNewPo(false)}
            onSaved={() => {
              setShowNewPo(false);
              load();
            }}
          />
        )}

        {!configured && <SetupNotice />}

        {error && (
          <div
            className="mb-6 rounded-[var(--radius-lg)] border px-4 py-3 text-[13px]"
            style={{ borderColor: "var(--danger)", background: "var(--danger-light)", color: "var(--danger)" }}
          >
            Couldn&apos;t load from Airtable: {error}
          </div>
        )}

        {loading ? (
          <p className="text-[13px]" style={{ color: "var(--gray-400)" }}>
            Loading…
          </p>
        ) : configured && pos.length === 0 && !error ? (
          <p className="text-[13px]" style={{ color: "var(--gray-400)" }}>
            No purchase orders yet. Click <strong>New PO</strong> to add one.
          </p>
        ) : (
          <div className="space-y-5">
            {pos.map((po) => (
              <PoCard
                key={po.id}
                po={po}
                statusOptions={statusOptions}
                isAdding={addUpdateFor === po.id}
                onToggleAdd={() => setAddUpdateFor((cur) => (cur === po.id ? null : po.id))}
                onSaved={() => {
                  setAddUpdateFor(null);
                  load();
                }}
              />
            ))}
          </div>
        )}
      </main>

      <footer
        className="py-5 text-center text-[12px]"
        style={{ color: "var(--gray-400)", borderTop: "1px solid var(--gray-200)" }}
      >
        SCM Internal — Not for public use
      </footer>
    </div>
  );
}

function PoCard({
  po,
  statusOptions,
  isAdding,
  onToggleAdd,
  onSaved,
}: {
  po: PoRecord;
  statusOptions: StatusOption[];
  isAdding: boolean;
  onToggleAdd: () => void;
  onSaved: () => void;
}) {
  const opt = statusOptions.find((o) => o.name === po.status);
  const s = opt ? airtableColorStyle(opt.color) : airtableColorStyle("");
  return (
    <div
      className="rounded-[var(--radius-lg)] border bg-white"
      style={{ borderColor: "var(--gray-200)", boxShadow: "var(--shadow-sm)" }}
    >
      {/* PO header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4" style={{ borderColor: "var(--gray-200)" }}>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-bold" style={{ color: "var(--foreground)" }}>
              PO #{po.poNumber}
            </h2>
            {po.status && (
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                style={{ background: s.bg, color: s.color }}
              >
                {po.status}
              </span>
            )}
          </div>
          {po.description && (
            <p className="mt-0.5 text-[13px]" style={{ color: "var(--gray-500)" }}>
              {po.description}
            </p>
          )}
        </div>
        <button
          onClick={onToggleAdd}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border px-2.5 py-1.5 text-[12px] font-medium transition-colors"
          style={{ borderColor: "var(--gray-200)", color: "var(--primary)", background: "white" }}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {isAdding ? "Cancel" : "Add update"}
        </button>
      </div>

      {/* Updates */}
      <div className="px-5 py-3">
        {po.updates.length === 0 && !isAdding && (
          <p className="py-1 text-[12px]" style={{ color: "var(--gray-400)" }}>
            No updates yet.
          </p>
        )}

        {po.updates.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr style={{ color: "var(--gray-400)" }}>
                  <th className="py-1.5 pr-4 font-semibold">Item / ASIN</th>
                  <th className="py-1.5 pr-4 font-semibold">Available in</th>
                  <th className="py-1.5 pr-4 font-semibold">Notes</th>
                  <th className="py-1.5 pr-4 font-semibold">Updated by</th>
                  <th className="py-1.5 font-semibold">Updated (PHT)</th>
                </tr>
              </thead>
              <tbody>
                {po.updates.map((u) => (
                  <tr key={u.id} className="border-t" style={{ borderColor: "var(--gray-100)" }}>
                    <td className="py-2 pr-4 font-medium" style={{ color: "var(--foreground)" }}>
                      {u.itemName}
                    </td>
                    <td className="py-2 pr-4" style={{ color: "var(--foreground)" }}>
                      {u.availableIn ? formatDate(u.availableIn) : "—"}
                    </td>
                    <td className="py-2 pr-4" style={{ color: "var(--gray-500)" }}>
                      {u.notes || "—"}
                    </td>
                    <td className="py-2 pr-4" style={{ color: "var(--gray-500)" }}>
                      {u.updatedBy || "—"}
                    </td>
                    <td className="py-2" style={{ color: "var(--gray-400)" }}>
                      {formatPHT(u.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isAdding && <AddUpdateForm poId={po.id} onSaved={onSaved} />}
      </div>
    </div>
  );
}

function AddUpdateForm({ poId, onSaved }: { poId: string; onSaved: () => void }) {
  const [itemName, setItemName] = useState("");
  const [availableIn, setAvailableIn] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    if (!itemName.trim() || !updatedBy.trim()) {
      setErr("Item / ASIN and your name are required.");
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch("/api/po-board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "update",
          poId,
          itemName,
          availableIn: availableIn || null,
          updatedBy,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");
      onSaved();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="mt-3 rounded-[var(--radius-md)] border p-4"
      style={{ borderColor: "var(--gray-200)", background: "var(--gray-50)" }}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Item / ASIN *">
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="e.g. B0ABC12345"
            className="input"
            style={inputStyle}
          />
        </Field>
        <Field label="Available in (date)">
          <input
            type="date"
            value={availableIn}
            onChange={(e) => setAvailableIn(e.target.value)}
            style={inputStyle}
          />
        </Field>
        <Field label="Updated by *">
          <input
            value={updatedBy}
            onChange={(e) => setUpdatedBy(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
          />
        </Field>
        <Field label="Notes / additional info">
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. shipping by air, OOS for 5 days"
            style={inputStyle}
          />
        </Field>
      </div>
      {err && (
        <p className="mt-2 text-[12px]" style={{ color: "var(--danger)" }}>
          {err}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <button
          onClick={submit}
          disabled={saving}
          className="rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] font-semibold text-white"
          style={{ background: "var(--primary)", opacity: saving ? 0.6 : 1 }}
        >
          {saving ? "Saving…" : "Save update"}
        </button>
      </div>
    </div>
  );
}

function NewPoForm({
  options,
  onClose,
  onSaved,
}: {
  options: StatusOption[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [poNumber, setPoNumber] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(options[0]?.name || STATUS_OPTIONS[0].name);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    if (!poNumber.trim()) {
      setErr("PO Number is required.");
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      const res = await fetch("/api/po-board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "po", poNumber, description, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");
      onSaved();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="mb-6 rounded-[var(--radius-lg)] border bg-white p-5"
      style={{ borderColor: "var(--primary)", boxShadow: "var(--shadow-sm)" }}
    >
      <h3 className="mb-3 text-[14px] font-semibold" style={{ color: "var(--foreground)" }}>
        New Purchase Order
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="PO Number *">
          <input
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            placeholder="e.g. PO-1042"
            style={inputStyle}
          />
        </Field>
        <Field label="Description">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Q3 earbuds restock"
            style={inputStyle}
          />
        </Field>
        <Field label="Status">
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
            {options.map((o) => (
              <option key={o.name} value={o.name}>
                {o.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {err && (
        <p className="mt-2 text-[12px]" style={{ color: "var(--danger)" }}>
          {err}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        <button
          onClick={submit}
          disabled={saving}
          className="rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] font-semibold text-white"
          style={{ background: "var(--primary)", opacity: saving ? 0.6 : 1 }}
        >
          {saving ? "Saving…" : "Create PO"}
        </button>
        <button
          onClick={onClose}
          className="rounded-[var(--radius-md)] border px-3 py-1.5 text-[13px] font-medium"
          style={{ borderColor: "var(--gray-200)", color: "var(--gray-500)" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium" style={{ color: "var(--gray-500)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--gray-200)",
  borderRadius: "var(--radius-md)",
  padding: "8px 10px",
  fontSize: "13px",
  background: "white",
  color: "var(--foreground)",
};

function SetupNotice() {
  return (
    <div
      className="mb-6 rounded-[var(--radius-lg)] border px-5 py-4 text-[13px]"
      style={{ borderColor: "var(--warning)", background: "var(--warning-light)", color: "var(--foreground)" }}
    >
      <p className="font-semibold" style={{ color: "var(--warning)" }}>
        Airtable not connected yet
      </p>
      <p className="mt-1" style={{ color: "var(--gray-500)" }}>
        Add the <code>AIRTABLE_API_KEY</code> and <code>AIRTABLE_BASE_ID</code> environment variables
        in Vercel, then redeploy. Until then the board is read-only and empty.
      </p>
    </div>
  );
}
