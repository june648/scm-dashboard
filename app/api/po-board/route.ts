import { NextResponse } from "next/server";

// Always run fresh so new updates show immediately.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const POS_TABLE = process.env.AIRTABLE_POS_TABLE || "Purchase Orders";
const UPDATES_TABLE = process.env.AIRTABLE_UPDATES_TABLE || "PO Updates";

const AIRTABLE_API = "https://api.airtable.com/v0";

function isConfigured() {
  return Boolean(API_KEY && BASE_ID);
}

function tableUrl(table: string, query = "") {
  return `${AIRTABLE_API}/${BASE_ID}/${encodeURIComponent(table)}${query}`;
}

function authHeaders(json = false): HeadersInit {
  const h: Record<string, string> = { Authorization: `Bearer ${API_KEY}` };
  if (json) h["Content-Type"] = "application/json";
  return h;
}

// Pull every record from a table, following Airtable pagination.
async function fetchAll(table: string) {
  const records: { id: string; fields: Record<string, unknown>; createdTime: string }[] = [];
  let offset: string | undefined;
  do {
    const query = offset ? `?offset=${encodeURIComponent(offset)}` : "";
    const res = await fetch(tableUrl(table, query), {
      headers: authHeaders(),
      cache: "no-store",
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Airtable ${table} read failed (${res.status}): ${body}`);
    }
    const data = await res.json();
    records.push(...(data.records || []));
    offset = data.offset;
  } while (offset);
  return records;
}

interface AirtableChoice {
  name: string;
  color?: string;
}
interface AirtableField {
  name: string;
  options?: { choices?: AirtableChoice[] };
}
interface AirtableTable {
  id: string;
  name: string;
  fields?: AirtableField[];
}

// Read the Status single-select options straight from Airtable's schema,
// so statuses (and their colors) added/renamed in Airtable show up on the
// board automatically. Each choice carries Airtable's own color token.
async function fetchStatusOptions(): Promise<{ name: string; color: string }[]> {
  try {
    const res = await fetch(`${AIRTABLE_API}/meta/bases/${BASE_ID}/tables`, {
      headers: authHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const tables: AirtableTable[] = data.tables || [];
    const table = tables.find((t) => t.name === POS_TABLE || t.id === POS_TABLE);
    const field = table?.fields?.find((f) => f.name === "Status");
    return (field?.options?.choices || []).map((c) => ({
      name: c.name,
      color: c.color || "",
    }));
  } catch {
    return [];
  }
}

export interface PoUpdate {
  id: string;
  itemName: string;
  availableIn: string | null;
  notes: string;
  updatedBy: string;
  createdAt: string;
}

export interface PoRecord {
  id: string;
  poNumber: string;
  description: string;
  status: string;
  updates: PoUpdate[];
}

export async function GET() {
  if (!isConfigured()) {
    return NextResponse.json({ configured: false, pos: [] });
  }

  try {
    const [posRaw, updatesRaw, statusOptions] = await Promise.all([
      fetchAll(POS_TABLE),
      fetchAll(UPDATES_TABLE),
      fetchStatusOptions(),
    ]);

    // Group updates under their linked PO record id.
    const updatesByPo = new Map<string, PoUpdate[]>();
    for (const rec of updatesRaw) {
      const f = rec.fields as Record<string, unknown>;
      const link = f["PO"] as string[] | undefined;
      const poId = Array.isArray(link) && link.length > 0 ? link[0] : "__unlinked__";
      const update: PoUpdate = {
        id: rec.id,
        itemName: (f["Item / ASIN"] as string) || (f["Name"] as string) || "",
        availableIn: (f["Available In"] as string) || null,
        notes: (f["Notes"] as string) || "",
        updatedBy: (f["Updated By"] as string) || "",
        createdAt: rec.createdTime,
      };
      const list = updatesByPo.get(poId) || [];
      list.push(update);
      updatesByPo.set(poId, list);
    }

    const pos: PoRecord[] = posRaw.map((rec) => {
      const f = rec.fields as Record<string, unknown>;
      const updates = (updatesByPo.get(rec.id) || []).sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      return {
        id: rec.id,
        poNumber: (f["PO Number"] as string) || "",
        description: (f["Description"] as string) || "",
        status: (f["Status"] as string) || "",
        updates,
      };
    });

    // Newest POs first (by most recent activity).
    pos.sort((a, b) => {
      const aTime = a.updates[0]?.createdAt || "";
      const bTime = b.updates[0]?.createdAt || "";
      return bTime.localeCompare(aTime);
    });

    return NextResponse.json({ configured: true, pos, statusOptions });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { configured: true, error: (err as Error).message, pos: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Airtable is not configured yet." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const type = body.type;

  try {
    if (type === "po") {
      const poNumber = String(body.poNumber || "").trim();
      const description = String(body.description || "").trim();
      const status = String(body.status || "Sourcing").trim();
      if (!poNumber) {
        return NextResponse.json({ error: "PO Number is required." }, { status: 400 });
      }
      const res = await fetch(tableUrl(POS_TABLE), {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({
          fields: {
            "PO Number": poNumber,
            Description: description,
            Status: status,
          },
        }),
      });
      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Create PO failed (${res.status}): ${errBody}`);
      }
      const data = await res.json();
      return NextResponse.json({ ok: true, id: data.id });
    }

    if (type === "update") {
      const poId = String(body.poId || "").trim();
      const itemName = String(body.itemName || "").trim();
      const updatedBy = String(body.updatedBy || "").trim();
      const availableIn = body.availableIn ? String(body.availableIn) : null;
      const notes = String(body.notes || "").trim();

      if (!poId) {
        return NextResponse.json({ error: "PO is required." }, { status: 400 });
      }
      if (!itemName) {
        return NextResponse.json({ error: "Item / ASIN is required." }, { status: 400 });
      }
      if (!updatedBy) {
        return NextResponse.json({ error: "Your name (Updated By) is required." }, { status: 400 });
      }

      const fields: Record<string, unknown> = {
        "Item / ASIN": itemName,
        "Updated By": updatedBy,
        PO: [poId],
      };
      if (availableIn) fields["Available In"] = availableIn;
      if (notes) fields["Notes"] = notes;

      const res = await fetch(tableUrl(UPDATES_TABLE), {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ fields }),
      });
      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Create update failed (${res.status}): ${errBody}`);
      }
      const data = await res.json();
      return NextResponse.json({ ok: true, id: data.id });
    }

    return NextResponse.json({ error: "Unknown request type." }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// Edit an existing PO or update record.
export async function PATCH(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json({ error: "Airtable is not configured yet." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const type = body.type;
  const id = String(body.id || "").trim();
  if (!id) {
    return NextResponse.json({ error: "Record id is required." }, { status: 400 });
  }

  try {
    if (type === "po") {
      const poNumber = String(body.poNumber || "").trim();
      const description = String(body.description || "").trim();
      const status = String(body.status || "").trim();
      if (!poNumber) {
        return NextResponse.json({ error: "PO Number is required." }, { status: 400 });
      }
      const fields: Record<string, unknown> = {
        "PO Number": poNumber,
        Description: description,
      };
      if (status) fields.Status = status;

      const res = await fetch(tableUrl(POS_TABLE, `/${id}`), {
        method: "PATCH",
        headers: authHeaders(true),
        body: JSON.stringify({ fields }),
      });
      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Edit PO failed (${res.status}): ${errBody}`);
      }
      return NextResponse.json({ ok: true });
    }

    if (type === "update") {
      const itemName = String(body.itemName || "").trim();
      const updatedBy = String(body.updatedBy || "").trim();
      const availableIn = body.availableIn ? String(body.availableIn) : null;
      const notes = String(body.notes || "").trim();

      if (!itemName) {
        return NextResponse.json({ error: "Item / ASIN is required." }, { status: 400 });
      }
      if (!updatedBy) {
        return NextResponse.json({ error: "Your name (Updated By) is required." }, { status: 400 });
      }

      // Send empty values too, so clearing a field actually clears it.
      const fields: Record<string, unknown> = {
        "Item / ASIN": itemName,
        "Updated By": updatedBy,
        "Available In": availableIn,
        Notes: notes,
      };

      const res = await fetch(tableUrl(UPDATES_TABLE, `/${id}`), {
        method: "PATCH",
        headers: authHeaders(true),
        body: JSON.stringify({ fields }),
      });
      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Edit update failed (${res.status}): ${errBody}`);
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown request type." }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// Delete a PO (and its updates) or a single update.
export async function DELETE(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json({ error: "Airtable is not configured yet." }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = (searchParams.get("id") || "").trim();
  if (!id) {
    return NextResponse.json({ error: "Record id is required." }, { status: 400 });
  }

  try {
    if (type === "update") {
      const res = await fetch(tableUrl(UPDATES_TABLE, `/${id}`), {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Delete update failed (${res.status}): ${errBody}`);
      }
      return NextResponse.json({ ok: true });
    }

    if (type === "po") {
      // Remove the PO's linked updates first, then the PO itself.
      const updatesRaw = await fetchAll(UPDATES_TABLE);
      const childIds = updatesRaw
        .filter((rec) => {
          const link = (rec.fields as Record<string, unknown>)["PO"] as string[] | undefined;
          return Array.isArray(link) && link.includes(id);
        })
        .map((rec) => rec.id);

      // Airtable deletes up to 10 records per batched request.
      for (let i = 0; i < childIds.length; i += 10) {
        const batch = childIds.slice(i, i + 10);
        const qs = batch.map((rid) => `records[]=${encodeURIComponent(rid)}`).join("&");
        await fetch(tableUrl(UPDATES_TABLE, `?${qs}`), {
          method: "DELETE",
          headers: authHeaders(),
        });
      }

      const res = await fetch(tableUrl(POS_TABLE, `/${id}`), {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Delete PO failed (${res.status}): ${errBody}`);
      }
      return NextResponse.json({ ok: true, deletedUpdates: childIds.length });
    }

    return NextResponse.json({ error: "Unknown delete type." }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
