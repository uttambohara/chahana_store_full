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
import Image from "next/image";
import NotFoundContainer from "./NotFoundContainer";

interface SubCategoriesTableProps {
  subCategories:
    | (Tables<"sub_category"> & { category: Tables<"category"> | null })[]
    | null;
}

export default function SubCategoryTable({
  subCategories,
}: SubCategoriesTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Sub-category</TableHead>
            <TableHead>Parent category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!!subCategories?.length && (
            <NotFoundContainer message="No sub-categories found!" />
          )}

          {subCategories?.map((subCategory) => {
            const selectTheFirstImageFromImageUrlStringLikeArray = JSON.parse(
              subCategory.image_url!
            )?.[0].image;

            return (
              <TableRow key={subCategory.id}>
                <TableCell>
                  <div className="h-12 w-12 relative">
                    <Image
                      src={selectTheFirstImageFromImageUrlStringLikeArray}
                      alt={subCategory.name as string}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {subCategory.name}
                </TableCell>
                <TableCell className="font-medium">
                  {subCategory.category?.name}
                </TableCell>
                <TableCell className="text-right">
                  <TableDeleteButton
                    deleteBy={"sub_category"}
                    id={subCategory.id}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
