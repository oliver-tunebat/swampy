import { createClient } from "@supabase/supabase-js";

// only for use on the server
export const adminSupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
);
