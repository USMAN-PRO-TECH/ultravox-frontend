import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: TablePaginationProps) {
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm whitespace-nowrap">Rows per page:</p>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => onRowsPerPageChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={rowsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {currentPage !== 1 ? (
                <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
              ) : (
                <PaginationPrevious className="pointer-events-none opacity-50" />
              )}
            </PaginationItem>
            
            {/* Show first page */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis if needed */}
            {currentPage > 3 && <PaginationEllipsis />}

            {/* Show current page and adjacent pages */}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange(currentPage - 1)}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange(currentPage + 1)}>
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis if needed */}
            {currentPage < totalPages - 2 && <PaginationEllipsis />}

            {/* Show last page */}
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              {currentPage !== totalPages ? (
                <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
              ) : (
                <PaginationNext className="pointer-events-none opacity-50" />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
} 