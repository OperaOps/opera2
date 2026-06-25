import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Append to a local JSON file
    const leadsFile = path.join(process.cwd(), "data", "dpm-leads.json");

    let leads: unknown[] = [];
    try {
      const existing = fs.readFileSync(leadsFile, "utf-8");
      leads = JSON.parse(existing);
    } catch {
      // File doesn't exist yet
    }

    leads.push({
      ...body,
      id: `dpm_${Date.now()}`,
      createdAt: new Date().toISOString(),
    });

    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
