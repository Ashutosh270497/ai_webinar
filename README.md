# AI Fundamentals Live Webinar Landing Page

Next.js 14 landing page + lead capture + Razorpay payment link webhook flow.

## Setup

1. Copy `.env.local.example` to `.env.local` and fill values.
2. Install dependencies: `npm install`
3. Start local server: `npm run dev`

## Required env vars

See `.env.local.example` for full list.

## Razorpay webhook setup

- Configure webhook endpoint: `https://<your-domain>/api/razorpay/webhook`
- Set secret value and use same value in `RAZORPAY_WEBHOOK_SECRET`
- Subscribe to `payment_link.paid` event.

## Flow

- Visitor submits form -> `/api/register`
- Row inserted with `pending`
- Redirect to Razorpay Payment Link with `notes[registration_id]`
- Webhook updates registration as `paid`
- Email sent through Resend
- Success page polls `/api/registration-status`

## Deployment (Vercel)

- Import repo in Vercel
- Add all environment variables
- Deploy
- Add production webhook URL in Razorpay dashboard

