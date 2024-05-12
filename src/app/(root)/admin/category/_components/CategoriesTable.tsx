import TableDeleteButton from "@/components/Table/TableDeleteButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tables } from "@/types/supabase";
import { getAllCategories } from "@/utils/query/supabase-database";
import Image from "next/image";
import { toast } from "sonner";
import NotFoundContainer from "./NotFoundContainer";

export default async function CategoryTable() {
  const { categories, error } = await getAllCategories();

  if (error) {
    toast.error(JSON.stringify(error.message));
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!!!categories?.length && (
          <NotFoundContainer message="No categories found!" />
        )}
        {categories?.map((category: Tables<"category">) => {
          const selectTheFirstImageFromImageUrlStringLikeArray = JSON.parse(
            category.image_url
          )[0].image;
          return (
            <TableRow key={category.id}>
              <TableCell>
                <div className="h-12 w-12 relative">
                  <Image
                    src={selectTheFirstImageFromImageUrlStringLikeArray}
                    alt={category.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-right">
                <TableDeleteButton deleteBy="category" id={category.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
