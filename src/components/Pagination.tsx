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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];

    const maxButtons = isMobile ? 5 : 9;
    const pages: (number | string)[] = [];

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (isMobile) {
      if (currentPage <= 3) {
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 2; i <= 7; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push('...');
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, isMobile]);

  if (pageNumbers.length <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-1 sm:gap-2 mt-4 px-2 w-full" aria-label="Pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 sm:px-3 py-2 rounded-md flex-shrink-0 ${
          darkMode
            ? 'bg-gray-800 text-blue-400 hover:bg-gray-700 disabled:text-gray-600'
            : 'bg-white text-blue-600 hover:bg-blue-50 disabled:text-gray-400'
        } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
      </button>

      <div className="flex items-center gap-1 sm:gap-2 justify-center">
        {pageNumbers.map((number, index) => (
          <button
            key={`page-${number}-${index}`}
            onClick={() => typeof number === 'number' ? paginate(number) : undefined}
            disabled={typeof number !== 'number'}
            className={`px-2 sm:px-4 py-2 rounded-md flex-shrink-0 min-w-[36px] sm:min-w-[44px] text-xs sm:text-base font-medium ${
              currentPage === number
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkMode
                  ? 'bg-gray-800 text-blue-400 hover:bg-gray-700'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
            } ${typeof number !== 'number' ? 'cursor-default hover:bg-transparent pointer-events-none' : 'transition-colors'}`}
            aria-current={currentPage === number ? 'page' : undefined}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 sm:px-3 py-2 rounded-md flex-shrink-0 ${
          darkMode
            ? 'bg-gray-800 text-blue-400 hover:bg-gray-700 disabled:text-gray-600'
            : 'bg-white text-blue-600 hover:bg-blue-50 disabled:text-gray-400'
        } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        aria-label="Next page"
      >
        <ChevronRight size={18} className="sm:w-5 sm:h-5" />
      </button>
    </nav>
  );
};

export default Pagination;
