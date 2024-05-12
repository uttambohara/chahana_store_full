"use client";

import { PER_PAGE } from "@/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationControlChangePageProps {
  urlPathParam: string;
  totalLength: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export default function PaginationControlChangePage({
  urlPathParam,
  totalLength,
  hasNextPage,
  hasPreviousPage,
}: PaginationControlChangePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? PER_PAGE;

  function handlePreviousPage() {
    router.push(
      `${urlPathParam}/?page=${Number(page) - 1}&limit=${Number(limit)}`
    );
  }
  function handleNextPage() {
    router.push(
      `${urlPathParam}/?page=${Number(page) + 1}&limit=${Number(limit)}`
    );
  }
  return (
    <div className="ml-auto flex items-center gap-2">
      <Button
        disabled={!hasPreviousPage}
        variant={"outline"}
        size={"sm"}
        onClick={handlePreviousPage}
      >
        <ChevronLeft />
      </Button>

      <div className="text-muted-foreground text-sm">
        Page {page} of {Math.ceil(totalLength / Number(limit))}
      </div>

      <Button
        disabled={!hasNextPage}
        variant={"outline"}
        size={"sm"}
        onClick={handleNextPage}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
