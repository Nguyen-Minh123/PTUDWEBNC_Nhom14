type PaginationProps = {
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (pageNumber: number) => void;
};

export function Pagination({
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  // Trang cha sở hữu state; component chỉ phát yêu cầu đổi trang qua callback.
  const changePage = (nextPage: number) => {
    if (nextPage >= 1 && nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  };

  return (
    <nav
      aria-label="Điều hướng phân trang"
      className="flex items-center justify-center gap-2 mt-8"
    >
      <button
        type="button"
        aria-label="Trang trước"
        disabled={!hasPreviousPage}
        onClick={() => changePage(pageNumber - 1)}
        className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
      >
        ← Trang trước
      </button>

      <span aria-live="polite" className="text-xs font-medium text-gray-600 px-3">
        Trang {pageNumber} / {totalPages}
      </span>

      <button
        type="button"
        aria-label="Trang sau"
        disabled={!hasNextPage}
        onClick={() => changePage(pageNumber + 1)}
        className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
      >
        Trang sau →
      </button>
    </nav>
  );
}
