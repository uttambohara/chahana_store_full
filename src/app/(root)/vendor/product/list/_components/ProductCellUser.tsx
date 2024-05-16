import LoaderEl from "@/components/Global/LoaderEl";
import { Tables } from "@/types/supabase";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface ProductCellUserProps {
  rowDataWhichIsProduct: any;
}

export default function ProductCellUser({
  rowDataWhichIsProduct,
}: ProductCellUserProps) {
  const [isPending, startTranstion] = useTransition();
  const [user, setUser] = useState<Tables<"users">[] | null>(null);

  useEffect(() => {
    startTranstion(() => {
      (async () => {
        const supabase = supabaseBrowserClient();
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", rowDataWhichIsProduct.user_id);
        if (error) toast.error(JSON.stringify(error));
        setUser(user);
      })();
    });
  }, []);

  if (!user) return null;

  const userData = user[0];

  return (
    <div>
      <div className="flex items-center gap-1">
        <div className="relative h-16 w-16">
          <Image
            src={userData.avatar_url as string}
            alt={userData.first_name as string}
            fill
            priority
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <div className="text-muted-foreground italic">
            {userData.first_name} {userData.last_name}
          </div>
        </div>
      </div>
    </div>
  );
}
