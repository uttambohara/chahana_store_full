import { supabaseServerClient } from "../supabase/server";

export default async function getUser() {
  const supabase = supabaseServerClient();

  // Extract user from getUser
  const result = await supabase.auth.getUser();
  const { user } = result.data;

  // Supabase query
  const response = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id!)
    .single();
  return response;
}
