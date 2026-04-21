import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/lib/schemas";
import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID?.trim();
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
  const amountRupees = Number(process.env.WEBINAR_PRICE_RUPEES || "99");
  if (!razorpayKeyId || !razorpayKeySecret) {
    return NextResponse.json({ error: "Razorpay API credentials are not configured" }, { status: 500 });
  }
  if (!Number.isInteger(amountRupees) || amountRupees <= 0) {
    return NextResponse.json({ error: "WEBINAR_PRICE_RUPEES must be a positive integer" }, { status: 500 });
  }
  const amountPaise = amountRupees * 100;

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .insert({ ...parsed.data, amount: amountRupees })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const successUrl = new URL("/success", req.nextUrl.origin);
  successUrl.searchParams.set("registration_id", data.id);

  const auth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
  const paymentLinkResponse = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      description: "AI Fundamentals Live Webinar Registration",
      callback_url: successUrl.toString(),
      callback_method: "get",
      customer: {
        name: parsed.data.name,
        email: parsed.data.email,
        contact: parsed.data.phone,
      },
      notify: {
        email: false,
        sms: false,
      },
      notes: {
        registration_id: data.id,
      },
    }),
  });

  const paymentLinkPayload = await paymentLinkResponse.json();
  if (!paymentLinkResponse.ok || !paymentLinkPayload.short_url) {
    await supabaseAdmin.from("registrations").delete().eq("id", data.id);
    return NextResponse.json(
      { error: paymentLinkPayload.error?.description || "Failed to create Razorpay payment link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ registration_id: data.id, razorpay_link: paymentLinkPayload.short_url });
}
