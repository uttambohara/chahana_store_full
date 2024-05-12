import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryContainer from "./CategoriesContainer";
import SubCategoriesContainer from "./SubCategoriesContainer";

export default function CategoriesTabs() {
  return (
    <Tabs
      defaultValue="categories"
      className="border border-slate-200 rounded-md p-4"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="subcategories">SubCategories</TabsTrigger>
      </TabsList>
      <TabsContent value="categories">
        <CategoryContainer />
      </TabsContent>
      <TabsContent value="subcategories">
        <SubCategoriesContainer />
      </TabsContent>
    </Tabs>
  );
}
