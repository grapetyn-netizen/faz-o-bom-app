import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";

describe("Secrets Validation", () => {
  it("should validate Supabase credentials", async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();

    // Create a Supabase client with the credentials
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

    // Test the connection by fetching auth state
    const { data, error } = await supabase.auth.getSession();

    // Should not throw an error (no session is expected for anon key)
    expect(error).toBeNull();
  });

  it("should validate Resend API key", async () => {
    const resendApiKey = process.env.RESEND_API_KEY;

    expect(resendApiKey).toBeDefined();
    expect(resendApiKey).toMatch(/^re_/);
  });

  it("should validate Supabase Service Role key", async () => {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    expect(serviceRoleKey).toBeDefined();
    expect(serviceRoleKey).toMatch(/^eyJ/); // JWT format
  });
});
