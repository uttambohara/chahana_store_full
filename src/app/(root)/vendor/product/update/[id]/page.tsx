import Container from "@/components/Layout/Container";
import { getIndividualRowFromProduct } from "@/utils/query/supabase-database";
import Link from "next/link";
import Product from "../../_components/Product";
import { VENDOR_PARAM_WITH_LIST } from "../../list/columns";
import { ArrowLeft } from "lucide-react";

export default async function UpdateProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { product: productBasedOnParamId, error } =
    await getIndividualRowFromProduct(Number(id));

  return (
    <Container screen={"lg"}>
      <div className="grid gap-6 py-12">
        <Link
          href={VENDOR_PARAM_WITH_LIST}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-fit"
        >
          Go to List
          <ArrowLeft />
        </Link>
        <Product productBasedOnParamId={productBasedOnParamId} />
      </div>
    </Container>
  );
}
