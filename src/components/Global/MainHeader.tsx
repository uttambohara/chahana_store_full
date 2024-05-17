import getUser from "@/utils/query/get-user";
import { MountainIcon } from "lucide-react";
import Link from "next/link";
import SignOut from "../Auth/SignOutButton";
import NavBarSheet from "../Layout/NavBarSheet";
import RoleBasedNavigateButton from "./RoleBasedNavigateButton";

export default async function Header() {
  const { data: user } = await getUser();

  return (
    <header className="flex h-[6rem] lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <NavBarSheet />
      <Link className="lg:hidden" href="#">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="w-full flex-1"></div>
      <RoleBasedNavigateButton role={user?.role} />
      <SignOut />
    </header>
  );
}
