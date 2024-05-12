"use server";

import { supabaseServerClient } from "@/utils/supabase/server";

export const supabaseLogout = async () => {
  const supabase = supabaseServerClient();
  await supabase.auth.signOut();
};
