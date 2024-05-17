import { TableCell, TableRow } from "@/components/ui/table";
import { Tables } from "@/types/supabase";
import UserRoleIcon from "./UserRoleIcon";
import UserTableChangeRoleSelect from "./UserTableChangeRoleSelect";
import TableDeleteButton from "@/components/Table/TableDeleteButton";
import Image from "next/image";

interface UserRoleProps {
  user: Tables<"users">;
}

export default function UserTableRow({ user }: UserRoleProps) {
  return (
    <TableRow>
      <TableCell className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 flex items-center">
        <div className="relative h-12 w-12">
          <Image
            src={user.avatar_url as string}
            alt={user.first_name}
            fill
            priority
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <div>
            {user.first_name} {user.last_name}
          </div>
          <div className="text-muted-foreground">{user.email}</div>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-3 text-gray-700 dark:text-gray-400">
        <div className="flex flex-col">
          <div>{user.phone}</div>
          <p> {user.address}</p>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-3 ">
        <UserRoleIcon role={user.role} />
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-3">
        <div className="flex items-center space-x-2">
          <UserTableChangeRoleSelect userId={user.id} />
          <TableDeleteButton deleteBy={"users"} id={user.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}
