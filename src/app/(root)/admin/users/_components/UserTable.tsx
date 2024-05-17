import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUser } from "@/utils/query/supabase-database";
import UserTableRow from "./UserTableRow";

export default async function UserTable() {
  const { users, error } = await getAllUser();
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          User Management
        </h2>
      </div>
      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
              Name
            </TableHead>
            <TableHead className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
              Contact
            </TableHead>
            <TableHead className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
              Role
            </TableHead>
            <TableHead className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
              Change role
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <UserTableRow user={user} key={user.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
