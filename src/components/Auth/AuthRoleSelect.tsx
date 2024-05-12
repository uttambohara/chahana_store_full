import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRole } from "@/data/constant";
import { UserRole } from "@/types/formTypes";

import { ControllerRenderProps } from "react-hook-form";
import AuthRoleSelectItem from "./AuthRoleSelectItem";

interface AuthRoleSelectProps {
  field: ControllerRenderProps<
    {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      phone: string;
      address: string;
      role: UserRole;
    },
    "role"
  >;
}

export default function AuthRoleSelect({ field }: AuthRoleSelectProps) {
  return (
    <Select onValueChange={field.onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        {userRole.map((role) => (
          <AuthRoleSelectItem key={role} role={role} />
        ))}
      </SelectContent>
    </Select>
  );
}
