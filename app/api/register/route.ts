import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/lib/schemas";
import { supabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { data, error } = await supabaseAdmin.from("registrations").insert(parsed.data).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const base = process.env.RAZORPAY_PAYMENT_LINK || "";
  const url = new URL(base);
  url.searchParams.set("notes[registration_id]", data.id);

  return NextResponse.json({ registration_id: data.id, razorpay_link: url.toString() });
}
