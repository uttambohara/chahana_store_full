import getUser from "@/utils/query/get-user";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const { data: user } = await getUser();
  console.log(user?.role);

  if (user?.role === "VENDOR") redirect("/vendor");
  if (user?.role === "ADMIN") redirect("/admin");
  return null;
}
