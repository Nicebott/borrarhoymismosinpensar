import React, { useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  darkMode: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  darkMode
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];

    const isMobile = windowWidth < 640;
    const maxPageButtons = isMobile ? 5 : 9;

    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    range.push(1);

    const delta = Math.floor((maxPageButtons - 3) / 2);
    const startPage = Math.max(2, currentPage - delta);
    const endPage = Math.min(totalPages - 1, currentPage + delta);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    let previousPage: number | undefined;

    for (let i = 0; i < range.length; i++) {
      const currentPageNum = range[i];

      if (previousPage !== undefined) {
        const gap = currentPageNum - previousPage;
        if (gap === 2) {
          rangeWithDots.push(previousPage + 1);
        } else if (gap > 2) {
          rangeWithDots.push('...');
        }
      }

      rangeWithDots.push(currentPageNum);
      previousPage = currentPageNum;
    }

    return rangeWithDots;
  }, [currentPage, totalPages, windowWidth]);

  if (pageNumbers.length <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 mt-4 px-2 w-full" aria-label="Pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 sm:px-3 py-2 rounded-md flex-shrink-0 transition-colors ${
          darkMode
            ? 'bg-gray-800 text-blue-400 hover:bg-gray-700 disabled:text-gray-600'
            : 'bg-white text-blue-600 hover:bg-blue-50 disabled:text-gray-400'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Pagina anterior"
      >
        <ChevronLeft size={20} className="sm:w-5 sm:h-5" />
      </button>

      <div className="flex items-center gap-1 sm:gap-2 justify-center overflow-x-auto scrollbar-hide">
        {pageNumbers.map((number, index) => {
          const isNumber = typeof number === 'number';
          const isActive = currentPage === number;

          return (
            <button
              key={`${number}-${index}`}
              onClick={() => isNumber ? paginate(number) : undefined}
              disabled={!isNumber}
              className={`px-2 sm:px-4 py-2 rounded-md flex-shrink-0 min-w-[40px] sm:min-w-[44px] text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : isNumber
                    ? darkMode
                      ? 'bg-gray-800 text-blue-400 hover:bg-gray-700'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                    : darkMode
                      ? 'bg-transparent text-gray-500 cursor-default'
                      : 'bg-transparent text-gray-400 cursor-default'
              } ${isNumber ? 'transition-colors' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={isNumber ? `Ir a la pagina ${number}` : undefined}
            >
              {number}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 sm:px-3 py-2 rounded-md flex-shrink-0 transition-colors ${
          darkMode
            ? 'bg-gray-800 text-blue-400 hover:bg-gray-700 disabled:text-gray-600'
            : 'bg-white text-blue-600 hover:bg-blue-50 disabled:text-gray-400'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Pagina siguiente"
      >
        <ChevronRight size={20} className="sm:w-5 sm:h-5" />
      </button>
    </nav>
  );
};

export default Pagination;
