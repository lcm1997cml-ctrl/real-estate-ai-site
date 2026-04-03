import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bclunilimczzskwmioic.supabase.co";
const SUPABASE_KEY = "sb_publishable_4A5I6XNhkD0kjxamNwgbVw_PIVEqAwQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
