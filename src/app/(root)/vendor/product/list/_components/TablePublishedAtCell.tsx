import { Tables } from "@/types/supabase";
import { Check } from "lucide-react";
import React from "react";

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
        <span className="font-bold inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
          <Check size={16} />
          Published
        </span>
      )}
    </div>
  );
}
