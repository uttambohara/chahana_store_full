import PaginationControlChangePage from "./PaginationControlChangePage";
import PaginationControlLimitPage from "./PaginationControlLimitPage";

interface PaginationControlProps {
  totalLength: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  urlPathParam: string;
}

export default function PaginationControl({
  totalLength,
  hasPreviousPage,
  hasNextPage,
  urlPathParam,
}: PaginationControlProps) {
  return (
    <div className="flex items-center">
      <PaginationControlLimitPage urlPathParam={urlPathParam} />
      <PaginationControlChangePage
        totalLength={totalLength}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        urlPathParam={urlPathParam}
      />
    </div>
  );
}
