import React from "react";
import { SelectItem } from "../ui/select";
import { UserRole } from "@/types/formTypes";

interface AuthRoleSelectItemProps {
  role: UserRole;
}

export default function AuthRoleSelectItem({ role }: AuthRoleSelectItemProps) {
  return (
    <SelectItem value={role} key={role}>
      <div className="flex items-center gap-2">
        <span>
          {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
        </span>
      </div>
    </SelectItem>
  );
}
