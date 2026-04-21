"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const id = params.get("registration_id");
  const [status, setStatus] = useState("Checking payment...");

  useEffect(() => {
    if (!id) return;
    let attempts = 0;
    const poll = setInterval(async () => {
      attempts += 1;
      const res = await fetch(`/api/registration-status?registration_id=${id}`);
      const data = await res.json();
      if (data.status === "paid") {
        setStatus("Payment confirmed! Webinar details have been emailed to you.");
        clearInterval(poll);
      }
      if (attempts >= 10) {
        setStatus("Payment received. Confirmation may take a moment. Please check your email shortly.");
        clearInterval(poll);
      }
    }, 3000);
    return () => clearInterval(poll);
  }, [id]);

  return <main className="min-h-screen grid place-items-center p-6"><div className="max-w-xl rounded-2xl border p-8"><h1 className="text-3xl font-heading">Thank you!</h1><p className="mt-4 text-zinc-300">{status}</p></div></main>;
}
