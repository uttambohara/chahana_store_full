import { supabaseServerClient } from "@/utils/supabase/server";

export default async function supabaseGetUser() {
  const supabase = supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
