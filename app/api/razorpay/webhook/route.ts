import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

  const expected = crypto.createHmac("sha256", secret).update(bodyText).digest("hex");
  if (expected !== signature) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

  const payload = JSON.parse(bodyText);
  if (payload.event !== "payment_link.paid") return NextResponse.json({ ok: true });

  const entity = payload.payload?.payment_link?.entity;
  const payment = payload.payload?.payment?.entity;
  const registrationId = entity?.notes?.registration_id;
  if (!registrationId) return NextResponse.json({ error: "registration_id missing" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .update({ status: "paid", payment_id: payment?.id, paid_at: new Date().toISOString() })
    .eq("id", registrationId)
    .select("id,name,email")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await fetch(new URL("/api/send-webinar-email", req.url), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: data.name, email: data.email }),
  });

  await supabaseAdmin.from("registrations").update({ email_sent_at: new Date().toISOString() }).eq("id", registrationId);

  return NextResponse.json({ ok: true });
}
