"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Shield, ShieldAlert, ShieldCheck, User } from "lucide-react";

interface RoleBasedNavigateButtonProps {
  role?: string;
}

export default function RoleBasedNavigateButton({
  role,
}: RoleBasedNavigateButtonProps) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isVendorPage = pathname.startsWith("/vendor");

  return (
    <>
      {role === "ADMIN" && isAdminPage && (
        <Button variant={"outline"} className="flex items-center gap-1" asChild>
          <Link href={"/vendor"}>
            <ShieldCheck size={18} />
            Vendor Page
          </Link>
        </Button>
      )}

      {role === "ADMIN" && isVendorPage && (
        <Button variant={"outline"} className="flex items-center gap-1" asChild>
          <Link href={"/admin"}>
            <ShieldAlert size={18} />
            Admin Page
          </Link>
        </Button>
      )}
    </>
  );
}
