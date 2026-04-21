import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();
  const webinarDate = process.env.WEBINAR_DATE || "2026-05-15T19:00:00+05:30";
  const joinLink = process.env.WEBINAR_JOIN_LINK || "";

  const start = new Date(webinarDate);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const googleCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI+for+Everyone+Webinar&dates=${start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=Join+link:+${encodeURIComponent(joinLink)}`;

  await resend.emails.send({
    from: "AI Webinar <noreply@example.com>",
    to: email,
    subject: "You're in! Your AI webinar details 🎉",
    html: `<p>Hi ${name},</p><p>You are confirmed for the webinar.</p><p><strong>Date:</strong> ${new Date(webinarDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p><p><a href="${joinLink}">Join Webinar</a></p><p><a href="${googleCalendar}">Add to Calendar</a></p><p>Come with a real work task you'd like to automate.</p><p>Support: support@example.com</p>`,
  });

  return NextResponse.json({ ok: true });
}
