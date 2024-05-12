import Link from "next/link";
import CollapsibleNav from "./CollapsibleNav";

interface SidebarContentProps {
  NavList: {
    id: number;
    item: string;
    link: string;
    icon: JSX.Element;
    subList: {
      id: number;
      item: string;
      link: string;
    }[];
  }[];
}

export default async function SidebarContent({ NavList }: SidebarContentProps) {
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-4 text-sm font-medium">
        {NavList.map((listItem) => {
          //...
          // If sublist has items
          if (listItem.subList.length > 0) {
            return <CollapsibleNav listItem={listItem} key={listItem.id} />;
          }
          // otherwise,
          return (
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href={listItem.link}
              key={listItem.id}
            >
              {listItem.icon}
              {listItem.item}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
