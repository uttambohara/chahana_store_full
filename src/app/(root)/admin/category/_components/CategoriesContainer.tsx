import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryForm from "./CategoriesForm";
import CategoryTable from "./CategoriesTable";

export default function CategoryContainer() {
  return (
    <Card className="border-none">
      <CardHeader className="space-y-2">
        <CardTitle>Product Categories</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CategoryForm />
        <div className="border rounded-lg overflow-hidden">
          <CategoryTable />
        </div>
      </CardContent>
    </Card>
  );
}
