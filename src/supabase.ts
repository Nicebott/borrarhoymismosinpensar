import { createClient } from '@supabase/supabase-js';

// Vite define in vite.config.ts maps NEXT_PUBLIC_SUPABASE_* -> VITE_SUPABASE_*
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('[v0] Supabase URL resolved:', supabaseUrl ? 'YES' : 'EMPTY');
console.log('[v0] Supabase Key resolved:', supabaseAnonKey ? 'YES' : 'EMPTY');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[v0] Supabase env vars missing. Auth and database features will not work.');
}

// Use a placeholder to prevent createClient from throwing if env vars are empty
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
