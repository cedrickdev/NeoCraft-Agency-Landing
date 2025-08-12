import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const constructPath = ({
  basePath,
  page,
  query,
}: {
  basePath: string;
  page?: string;
  query?: string;
}) => {
  const searchParams = new URLSearchParams();
  if (page) searchParams.append("page", page);
  if (query) searchParams.append("query", query);
  return `${basePath}?${searchParams.toString()}`;
};

export const PostPagination = ({
  pagination,
  basePath = "/",
  query,
  numSiblingPages = 2,
  className,
}: {
  className?: string;
  basePath?: string;
  query?: string;
  numSiblingPages?: number;
  pagination: {
    page: number;
    limit: number | "all";
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}) => {
  const buildPath = (page: number) =>
    constructPath({ basePath, page: page.toString(), query });
  return (
    <Pagination className={cn("overflow-x-auto", className)}>
      <PaginationContent>
        {pagination.prevPage && (
          <PaginationItem>
            <PaginationPrevious href={buildPath(pagination.prevPage)} />
          </PaginationItem>
        )}
        {pagination.page > 3 && (
          <>
            <PaginationItem>
              <PaginationLink href={buildPath(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </>
        )}
        {Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
          .filter(
            (pageNumber) =>
              Math.abs(pagination.page - pageNumber) <= numSiblingPages
          )
          .map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={buildPath(pageNumber)}
                isActive={pageNumber === pagination.page}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
        {pagination.page < pagination.totalPages - 2 && (
          <>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink href={buildPath(pagination.totalPages)}>
                {pagination.totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {pagination.nextPage && (
          <PaginationItem>
            <PaginationNext href={buildPath(pagination.nextPage)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
