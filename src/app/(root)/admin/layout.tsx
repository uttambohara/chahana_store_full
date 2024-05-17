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
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      {/*  */}
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 h-full">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <SidebarHead />
          <SidebarContent NavList={AdminNavList} />
        </div>
      </div>

      <div>
        <Header />
        <main className="h-[calc(100svh-4rem)] overflow-scroll">
          <div className="px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
