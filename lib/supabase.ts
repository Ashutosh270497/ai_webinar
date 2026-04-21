import { createClient } from "@supabase/supabase-js";

type SupabaseAdminClient = ReturnType<typeof createClient<any, "public", any>>;

let supabaseAdmin: SupabaseAdminClient | null = null;

export function getSupabaseAdmin() {
  if (supabaseAdmin) return supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRole) {
    throw new Error("Missing Supabase configuration.");
  }

  supabaseAdmin = createClient<any, "public", any>(supabaseUrl, serviceRole);
  return supabaseAdmin;
}
