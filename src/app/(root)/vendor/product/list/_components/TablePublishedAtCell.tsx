import { Tables } from "@/types/supabase";
import { Check } from "lucide-react";

interface TablePublishedAtCellProps {
  rowDataWhichIsProduct: Tables<"product"> & {
    category: Tables<"category"> | null;
  };
}

export default function TablePublishedAtCell({
  rowDataWhichIsProduct,
}: TablePublishedAtCellProps) {
  return (
    <div>
      {rowDataWhichIsProduct.created_at && (
        <div className="font-bold inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
          <Check size={16} />
          Published
        </div>
      )}
    </div>
  );
}
