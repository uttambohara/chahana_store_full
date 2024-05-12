import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { type Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  urlPathParameterExcludingBaseUrl: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  urlPathParameterExcludingBaseUrl,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams().toString();

  const handleSortClick = (
    urlPathParameterExcludingBaseUrl: string,
    newSort: string,
    order: string
  ) => {
    const params = new URLSearchParams(searchParams);
    // Check if a "sort" parameter already exists in the parameters object
    if (params.has("sort")) {
      // If it exists, update the value of the "sort" parameter with the new sort criteria (newSort)
      params.set("sort", newSort);
    } else {
      // If "sort" parameter doesn't exist, create a new parameter named "sort" with the value of newSort
      params.append("sort", newSort);
    }

    if (params.has("order")) {
      params.set("order", order);
    } else {
      params.append("order", order);
    }
    router.push(`${urlPathParameterExcludingBaseUrl}/?${params.toString()}`);
  };

  //
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === "desc"
                ? "Sorted descending. Click to sort ascending."
                : column.getIsSorted() === "asc"
                ? "Sorted ascending. Click to sort descending."
                : "Not sorted. Click to sort ascending."
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getCanSort() && column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 size-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 size-4" aria-hidden="true" />
            ) : (
              <CaretSortIcon className="ml-2 size-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem
                aria-label="Sort ascending"
                onClick={() =>
                  handleSortClick(
                    urlPathParameterExcludingBaseUrl,
                    column.id,
                    "asc"
                  )
                }
              >
                <ArrowUpIcon
                  className="mr-2 size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                aria-label="Sort descending"
                onClick={() =>
                  handleSortClick(
                    urlPathParameterExcludingBaseUrl,
                    column.id,
                    "desc"
                  )
                }
              >
                <ArrowDownIcon
                  className="mr-2 size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Desc
              </DropdownMenuItem>
            </>
          )}
          {column.getCanSort() && column.getCanHide() && (
            <DropdownMenuSeparator />
          )}
          {column.getCanHide() && (
            <DropdownMenuItem
              aria-label="Hide column"
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeNoneIcon
                className="mr-2 size-3.5 text-muted-foreground/70"
                aria-hidden="true"
              />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
