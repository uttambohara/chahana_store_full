import { TableCell, TableRow } from "@/components/ui/table";
import { Tables } from "@/types/supabase";
import UserRoleIcon from "./UserRoleIcon";
import UserTableChangeRoleSelect from "./UserTableChangeRoleSelect";
import TableDeleteButton from "@/components/Table/TableDeleteButton";

interface UserRoleProps {
  user: Tables<"users">;
}

export default function UserTableRow({ user }: UserRoleProps) {
  return (
    <TableRow>
      <TableCell className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
        {user.first_name} {user.last_name}
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-3 text-gray-700 dark:text-gray-400">
        {user.email}
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-3 text-gray-700 dark:text-gray-400">
        {user.phone}
      </TableCell>
      <TableCell className="whitespace-nowrap px-4 py-3 text-gray-700 dark:text-gray-400">
        {user.address}
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
