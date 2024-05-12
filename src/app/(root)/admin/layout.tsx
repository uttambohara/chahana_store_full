import Header from "@/components/Global/MainHeader";
import SidebarContent from "@/components/Layout/SidebarContent";
import SidebarHead from "@/components/Layout/SidebarHead";
import { AdminNavList } from "@/constant/NavBarConstant";
import getUser from "@/utils/query/get-user";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = await getUser();
  const isAdmin = user?.role === "ADMIN";

  if (!user) {
    return redirect("/auth/login");
  }

  if (!isAdmin) {
    return redirect("/");
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] overflow-auto">
      {/*  */}
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <SidebarHead />
          <SidebarContent NavList={AdminNavList} />
        </div>
      </div>

      <div className="flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
