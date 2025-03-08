import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const isMobile = window.innerWidth <= 640; // Mobile breakpoint
  const pages: React.ReactNode[] = [];

  const createPageLink = (page: number, label?: string, isArrow = false) => (
    <Link
      key={`page-${page}`}
      href={`?page=${page}`}
      className={`px-3 py-1 rounded-md transition ${
        currentPage === page
          ? "bg-blue-600 text-white"
          : isArrow
          ? "bg-gray-600 hover:bg-gray-500 flex items-center justify-center rounded-full"
          : "bg-gray-700 hover:bg-gray-600"
      }`}
    >
      {label || page}
    </Link>
  );

  // Previous Button
  if (currentPage > 1) {
    pages.push(createPageLink(currentPage - 1, "←", true));
  }

  if (!isMobile) {
    // Desktop View Pagination Numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pages.push(createPageLink(1));
      if (startPage > 2) {
        pages.push(
          <span key="start-dots" className="text-gray-400">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(createPageLink(i));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-dots" className="text-gray-400">
            ...
          </span>
        );
      }
      pages.push(createPageLink(totalPages));
    }
  } else {
    // Mobile View Dropdown
    pages.push(
      <select
        key="page-select"
        value={currentPage}
        onChange={(e) => (window.location.href = `?page=${e.target.value}`)}
        className="bg-gray-700 :text-white px-3 py-1 rounded-md cursor-pointer items-center justify-center"
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    );
  }

  // Next Button
  if (currentPage < totalPages) {
    pages.push(createPageLink(currentPage + 1, "→", true));
  }

  return (
    <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
      {pages.map((page, index) => (
        <div key={`page-container-${index}`} className="flex items-center">
          {page}
        </div>
      ))}
    </div>
  );
}