import { getInvoicesWithAdvancedFiltering } from "@/actions/supabase/supabaseDatabase";
import SectionHeading from "@/components/Global/SectionHeading";
import Container from "@/components/Layout/Container";
import PaginationControl from "@/components/Table/PaginationControl";
import PaginationInput from "@/components/Table/PaginationInput";
import { DataTable } from "@/components/Table/data-table";
import { PER_PAGE } from "@/constant";
import getUser from "@/utils/query/get-user";
import {
  getAllInvoices,
  getAllInvoicesByVendorId,
} from "@/utils/query/supabase-database";
import { notFound, redirect } from "next/navigation";
import { VENDOR_INVOICE_PARAM, columns } from "./columns";
import { VENDOR_ORDER_PARAM } from "../order/columns";

export default async function InvoicePage({
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
  const sort = searchParams["sort"] ?? "id"; // Different from list
  const order = searchParams["order"] ?? "asc";
  const status = searchParams["status"] ?? "ALL";

  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit) - 1;

  let Invoices;
  const { invoices, error } = await getInvoicesWithAdvancedFiltering({
    sort,
    order,
    userId,
    limit,
    search,
    start,
    end,
    status,
  });

  if (error) throw new Error(JSON.stringify(error));

  // VENDOR
  Invoices = invoices;
  // ADMIN
  if (user.role === "ADMIN") {
    const { invoices: adminInvoices, error } = await getAllInvoices();
    Invoices = adminInvoices;
  }

  // Guard clause
  if (!InvoicePage) return notFound();

  // ...
  const { allInvoicesByVendor: TotalInvoices, error: OrdersByVendorIdError } =
    await getAllInvoicesByVendorId(user.id);

  if (error) throw new Error(JSON.stringify(error));
  const totalInvoices = TotalInvoices?.length;

  if (!Invoices) return <div>No invoice can be found!</div>;

  return (
    <Container screen="lg">
      <div className="space-y-6">
        <SectionHeading title="Manage invoices" description={""} />
        <PaginationInput
          filterBy="name"
          urlPathParam={VENDOR_INVOICE_PARAM}
          className="pl-8 w-[20rem]"
        />
        <DataTable columns={columns} data={Invoices} />
        <PaginationControl
          urlPathParam={VENDOR_ORDER_PARAM}
          totalLength={totalInvoices!}
          hasPreviousPage={start > 0}
          hasNextPage={end < totalInvoices!}
        />
      </div>
    </Container>
  );
}