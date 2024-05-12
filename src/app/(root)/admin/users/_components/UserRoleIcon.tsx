import clsx from "clsx";

interface UserRoleIconProps {
  role: string;
}

export default function UserRoleIcon({ role }: UserRoleIconProps) {
  return (
    <div
      className={clsx("whitespace-nowrap", {
        "text-yellow-500 dark:text-yellow-400": role === "CUSTOMER",
        "text-green-500 dark:text-green-400": role === "VENDOR",
        "text-red-500 dark:text-red-400": role === "ADMIN",
      })}
    >
      {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
    </div>
  );
}
