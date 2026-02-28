import { createClient } from '@supabase/supabase-js';

// Lazy server-side Supabase client factory — do NOT create the client at module load time
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Returns a Supabase client when both URL and key are available, otherwise null.
 * This avoids calling createClient() during build-time when env vars may be absent.
 */
export function getSupabaseAdmin() {
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export default getSupabaseAdmin;
