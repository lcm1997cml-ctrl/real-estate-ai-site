import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bclunilimczzskwmioic.supabase.co";
const SUPABASE_KEY = "sb_publishable_4A5I6XNhkD0kjxamNwgbVw_PIVEqAwQ";

/**
 * Avoid Next.js Data Cache / stale RSC payloads: always fetch fresh rows from Supabase.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  global: {
    fetch: (input, init) =>
      fetch(input, {
        ...init,
        cache: "no-store",
      }),
  },
});
