import { SuccessStatus } from "@/components/success-status";

type SuccessPageProps = {
  searchParams?: {
    registration_id?: string;
  };
};

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="max-w-xl rounded-2xl border p-8">
        <h1 className="text-3xl font-heading">Thank you!</h1>
        <SuccessStatus registrationId={searchParams?.registration_id} />
      </div>
    </main>
  );
}
