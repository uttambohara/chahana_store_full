"use server";

import { supabaseServerClient } from "@/utils/supabase/server";

export default async function readUserSession() {
  const supabase = supabaseServerClient();
  return supabase.auth.getSession();
}
