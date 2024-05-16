import { getProductsWithAdvancedFiltering } from "@/actions/supabase/supabaseDatabase";
import Container from "@/components/Layout/Container";
import { DataTable } from "@/components/Table/data-table";
import { PER_PAGE } from "@/constant";

import SectionHeading from "@/components/Global/SectionHeading";
import PaginationControl from "@/components/Table/PaginationControl";
import TableSearchInput from "@/components/Table/TableSearchInput";
import getUser from "@/utils/query/get-user";
import {
  getAllProductsByVendorId,
  getAllProductsWithAdvancedFiltering,
} from "@/utils/query/supabase-database";
import { notFound, redirect } from "next/navigation";
import { VENDOR_PARAM_WITH_LIST, columns } from "./columns";

export default async function ProductList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data: user } = await getUser();
  if (!user?.id) redirect("/auth/login");
  const userId = user.id;

  const search = searchParams["search"];
  const page = searchParams["page"] ?? 1;
  const limit = searchParams["limit"] ?? PER_PAGE;
  const sort = searchParams["sort"] ?? "name";
  const order = searchParams["order"] ?? "asc";

  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit) - 1;

  let Products;
  const { products, error } = await getProductsWithAdvancedFiltering({
    sort,
    order,
    userId,
    limit,
    search,
    start,
    end,
  });

  // VENDOR
  Products = products;
  // ADMIN
  if (user.role === "ADMIN") {
    const { products: adminProducts, error } =
      await getAllProductsWithAdvancedFiltering({
        sort,
        order,
        limit,
        search,
        start,
        end,
      });
    Products = adminProducts;
  }

  // Guard clause
  if (!Products) return notFound();

  // ...
  const { allProductsByVendor: TotalProducts } = await getAllProductsByVendorId(
    user.id
  );
  const totalProducts = TotalProducts?.length;

  return (
    <Container screen={"lg"}>
      <div className="space-y-6">
        <SectionHeading title={"Manage products"} description={""} />
        <TableSearchInput
          filterBy={"name"}
          urlPathParam={VENDOR_PARAM_WITH_LIST}
          className="pl-8 w-[20rem]"
        />
        <DataTable columns={columns} data={Products} />
        <PaginationControl
          urlPathParam={VENDOR_PARAM_WITH_LIST}
          totalLength={totalProducts!}
          hasPreviousPage={start > 0}
          hasNextPage={end < totalProducts!}
        />
      </div>
    </Container>
  );
}
