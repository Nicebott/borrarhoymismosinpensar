import { createClient } from '@supabase/supabase-js';

// Vite define in vite.config.ts maps NEXT_PUBLIC_SUPABASE_* -> VITE_SUPABASE_*
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
