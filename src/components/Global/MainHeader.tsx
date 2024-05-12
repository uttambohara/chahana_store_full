import { MountainIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import SignOut from "../Auth/SignOutButton";
import NavBarSheet from "../Layout/NavBarSheet";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <NavBarSheet />
      <Link className="lg:hidden" href="#">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
      </div>
      <SignOut />
    </header>
  );
}
