import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAllCategories,
  getAllSubCategories,
} from "@/utils/query/supabase-database";
import SubCategoryForm from "./SubCategoriesForm";
import SubCategoryTable from "./SubCategoriesTable";

export default async function SubCategoriesContainer() {
  const [responseCategories, responseSubCategoires] = await Promise.all([
    getAllCategories(),
    getAllSubCategories(),
  ]);

  const { categories, error: categoriesError } = responseCategories;
  const { subCategories, error: subCategoriesError } = responseSubCategoires;

  return (
    <Card className="border-none">
      <CardHeader className="space-y-2">
        <CardTitle>Product Subcategories</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <SubCategoryForm categories={categories} />
        <SubCategoryTable subCategories={subCategories} />
      </CardContent>
    </Card>
  );
}
