import React from "react";
import { Button } from "@/components/ui/button";
import { BellIcon, MountainIcon } from "lucide-react";
import Link from "next/link";

export default function SidebarHead() {
  return (
    <div className="flex h-[60px] items-center border-b px-6">
      <Link className="flex items-center gap-2 font-semibold" href="#">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
    </div>
  );
}
