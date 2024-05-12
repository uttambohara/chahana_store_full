import { CreateProductProvider } from "@/providers/create-product-provider";
import { UploadImageProvider } from "@/providers/upload-image-provider";
import { TProductWithCategorySubCategoryWithColorWithSizes } from "@/types";
import {
  getAllCategories,
  getAllColors,
  getAllSizes,
  getAllSubCategories,
} from "@/utils/query/supabase-database";
import ProductFormCard from "./ProductFormCard";

interface ProductProps {
  productBasedOnParamId?: TProductWithCategorySubCategoryWithColorWithSizes;
}

export default async function Product({ productBasedOnParamId }: ProductProps) {
  const sizesPromise = getAllSizes();
  const colorPromsie = getAllColors();
  const categoriesPromise = getAllCategories();
  const subCategoriesPromise = getAllSubCategories();

  const [
    categoriesResponse,
    subCategoriesResponse,
    sizesPromiseResponse,
    colorPromiseResponse,
  ] = await Promise.all([
    categoriesPromise,
    subCategoriesPromise,
    sizesPromise,
    colorPromsie,
  ]);

  const { categories } = categoriesResponse;
  const { subCategories } = subCategoriesResponse;
  const { sizes } = sizesPromiseResponse;
  const { colors } = colorPromiseResponse;

  return (
    <CreateProductProvider>
      <UploadImageProvider>
        <ProductFormCard
          categories={categories}
          subCategories={subCategories}
          productBasedOnParamId={productBasedOnParamId}
          sizes={sizes}
          colors={colors}
        />
      </UploadImageProvider>
    </CreateProductProvider>
  );
}
