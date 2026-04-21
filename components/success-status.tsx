"use client";

import { useEffect, useState } from "react";

type SuccessStatusProps = {
  registrationId?: string;
};

export function SuccessStatus({ registrationId }: SuccessStatusProps) {
  const [status, setStatus] = useState("Checking payment...");

  useEffect(() => {
    if (!registrationId) {
      setStatus("Registration reference is missing. Please contact support if payment was completed.");
      return;
    }

    let attempts = 0;
    const poll = setInterval(async () => {
      attempts += 1;
      const res = await fetch(`/api/registration-status?registration_id=${registrationId}`);
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
  }, [registrationId]);

  return <p className="mt-4 text-zinc-300">{status}</p>;
}
