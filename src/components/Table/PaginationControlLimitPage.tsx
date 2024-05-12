"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PER_PAGE } from "@/constant";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlLimitPageProps {
  urlPathParam: string;
}

export default function PaginationControlLimitPage({
  urlPathParam,
}: PaginationControlLimitPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const limit = searchParams.get("limit") ?? PER_PAGE;
  function handleLimitSelection(e: string) {
    router.push(`${urlPathParam}/?limit=${Number(e)}`);
  }
  return (
    <div className="w-[8rem] grid grid-cols-2 gap-2">
      <p className="text-muted-foreground text-sm">Rows per page</p>
      <Select
        onValueChange={handleLimitSelection}
        defaultValue={String(PER_PAGE)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a verified email to display" />
        </SelectTrigger>

        <SelectContent className="w-12">
          {Array.from({ length: 5 })
            .map((_, i) => String(i * 3))
            .map((item) => {
              if (item === "0") return;
              return (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
}
