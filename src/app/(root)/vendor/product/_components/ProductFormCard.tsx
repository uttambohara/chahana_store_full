import { Tables } from "@/types/supabase";
import getUser from "@/utils/query/get-user";
import { ProductForm } from "./ProductForm";
import { redirect } from "next/navigation";
import { TProductWithCategorySubCategoryWithColorWithSizes } from "@/types";

interface ProductDisplayCardProps {
  productBasedOnParamId?: TProductWithCategorySubCategoryWithColorWithSizes;
  categories: Tables<"category">[] | null;
  subCategories: Tables<"sub_category">[] | null;
  sizes: Tables<"sizes">[] | null;
  colors: Tables<"color">[] | null;
}

export default async function ProductFormCard({
  categories,
  subCategories,
  sizes,
  colors,
  productBasedOnParamId,
}: ProductDisplayCardProps) {
  const { data: user } = await getUser();

  if (!user) return redirect("/auth/login");

  return (
    <ProductForm
      productBasedOnParamId={productBasedOnParamId}
      user_id={user.id}
      categories={categories}
      subCategories={subCategories}
      sizes={sizes}
      colors={colors}
    />
  );
}
