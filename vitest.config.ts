import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // The Edge Functions run on Deno and have their own tests (deno test, see supabase/README.md).
    exclude: [...configDefaults.exclude, "supabase/functions/**"],
  },
});
