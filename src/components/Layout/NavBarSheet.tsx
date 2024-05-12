import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdminNavList } from "@/constant/NavBarConstant";
import { MenuIcon, MountainIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function NavBarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden" size="icon" variant="outline">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav>
              {AdminNavList.map((listItem) => (
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href={listItem.link}
                  key={listItem.id}
                >
                  {listItem.icon}
                  {listItem.item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
