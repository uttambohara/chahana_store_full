"use client";

import { supabaseBrowserClient } from "@/utils/supabase/client";
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { supabaseLogout } from "@/actions/supabase/supabaseLogout";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await supabaseLogout();
          router.push("/auth");
        });
      }}
    >
      <LogOut />
      Sign out
      {isPending && <Loader className="animate-spin" />}
    </Button>
  );
}
