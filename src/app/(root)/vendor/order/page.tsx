import { getOrdersWithAdvancedFiltering } from "@/actions/supabase/supabaseDatabase";
import SectionHeading from "@/components/Global/SectionHeading";
import Container from "@/components/Layout/Container";
import PaginationControl from "@/components/Table/PaginationControl";
import PaginationInput from "@/components/Table/TableSearchInput";
import { DataTable } from "@/components/Table/data-table";
import { PER_PAGE } from "@/constant";
import getUser from "@/utils/query/get-user";
import {
  getAllOrdersByVendorId,
  getAllOrdersWithAdvancedFiltering,
} from "@/utils/query/supabase-database";
import { notFound, redirect } from "next/navigation";
import { VENDOR_ORDER_PARAM, columns } from "./columns";
import OrderStatusCard from "./_components/table/OrderStatusCard";

export default async function OrderList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data: user } = await getUser();
  if (!user?.id) redirect("/auth/login");
  const userId = user.id;

  const search = searchParams["search"] as string;
  const page = searchParams["page"] ?? 1;
  const limit = searchParams["limit"] ?? PER_PAGE;
  const sort = searchParams["sort"] ?? "id"; // Different from product list
  const order = searchParams["order"] ?? "asc";
  const status = searchParams["status"] ?? "";

  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit) - 1;

  let Orders;
  const { orders, error } = await getOrdersWithAdvancedFiltering({
    sort,
    order,
    userId,
    limit,
    start,
    end,
    status,
  });

  if (error) throw new Error(JSON.stringify(error));

  // VENDOR
  Orders = orders;
  // ADMIN
  if (user.role === "ADMIN") {
    const { orders: adminOrders, error } =
      await getAllOrdersWithAdvancedFiltering({
        sort,
        order,
        limit,
        start,
        end,
        status,
      });
    Orders = adminOrders;
  }

  // Guard clause
  if (!Orders) return notFound();

  // ...
  const { allOrdersByVendor: TotalOrders, error: OrdersByVendorIdError } =
    await getAllOrdersByVendorId(user.id);

  if (error) throw new Error(JSON.stringify(error));
  const totalOrders = TotalOrders?.length;

  // Application logic to filter order from the customer/ child object
  if (search) {
    Orders = Orders.filter(
      (order) =>
        order.customer?.users?.first_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer?.users?.last_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer?.users?.email
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }

  return (
    <Container screen="lg">
      <div className="space-y-6">
        <SectionHeading title="Manage orders" description={""} />
        <OrderStatusCard orders={Orders} />
        <PaginationInput
          filterBy="name"
          urlPathParam={VENDOR_ORDER_PARAM}
          className="pl-8 w-[20rem]"
        />
        <DataTable columns={columns} data={Orders} />
        <PaginationControl
          urlPathParam={VENDOR_ORDER_PARAM}
          totalLength={totalOrders!}
          hasPreviousPage={start > 0}
          hasNextPage={end < totalOrders!}
        />
      </div>
    </Container>
  );
}
