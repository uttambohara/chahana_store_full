"use client";

import { updateUserRole } from "@/actions/supabase/supabaseDatabase";
import LoaderEl from "@/components/Global/LoaderEl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import UserRoleIcon from "./UserRoleIcon";
import { Button } from "@/components/ui/button";
const UserRole = ["ADMIN", "VENDOR", "CUSTOMER"];

interface ChangeRoleSelectProps {
  userId: string;
}

export default function UserTableChangeRoleSelect({
  userId,
}: ChangeRoleSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRoleChange(role: string) {
    startTransition(async () => {
      const response = await updateUserRole(role.toUpperCase(), userId);
      const { _, error } = JSON.parse(response);
      if (error) {
        toast.error(JSON.stringify(error));
      } else {
        toast.success("User role has been changed.");
      }
      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isPending ? (
          <Button size="icon" variant="outline">
            <LoaderEl />
          </Button>
        ) : (
          <Button size="icon" variant="outline">
            <ChevronDown />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>User role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {UserRole.map((role) => (
          <DropdownMenuItem onClick={() => handleRoleChange(role)} key={role}>
            <UserRoleIcon role={role} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
