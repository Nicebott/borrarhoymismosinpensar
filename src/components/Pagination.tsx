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
  
  // Estado para detectar cambios de tamaño de pantalla en tiempo real
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];

    // Lógica adaptativa: Celular (delta 1) vs PC (delta 2)
    const isMobile = windowWidth < 640;
    const delta = isMobile ? 1 : 2;

    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    // Siempre mostrar la página 1
    range.push(1);

    // Calcular el rango alrededor de la página actual
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Siempre mostrar la última página
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Rellenar con puntos suspensivos (...) donde haya huecos
    let previousPage: number | undefined;

    for (const page of range) {
      if (previousPage !== undefined) {
        if (page - previousPage === 2) {
          // Si el hueco es de solo 1 número, mostramos ese número (ej: 1, [2], 3)
          rangeWithDots.push(previousPage + 1);
        } else if (page - previousPage > 2) {
          // Si el hueco es grande, mostramos ...
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(page);
      previousPage = page;
    }

    return rangeWithDots;
  }, [currentPage, totalPages, windowWidth]);

  if (pageNumbers.length <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 mt-4 px-2 w-full" aria-label="Pagination">
      {/* Botón Anterior */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 sm:px-3 py-2 rounded-md flex-shrink-0 transition-colors ${
          darkMode
            ? 'bg-gray-800 text-blue-400 hover:bg-gray-700 disabled:text-gray-600'
            : 'bg-white text-blue-600 hover:bg-blue-50 disabled:text-gray-400'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Página anterior"
      >
        <ChevronLeft size={20} className="sm:w-5 sm:h-5" />
      </button>

      {/* Números de Página */}
      <div className="flex items-center gap-1 sm:gap-2 justify-center overflow-x-auto scrollbar-hide">
        {pageNumbers.map((number, index) => {
          const isCurrent = currentPage === number;
          
          return (
            <button
              key={`${number}-${index}`}
              // CORRECCIÓN CLAVE AQUÍ ABAJO: Validación de tipo explícita
              onClick={() => typeof number === 'number' && paginate(number)}
              disabled={typeof number !== 'number'}
              className={`px-3 sm:px-4 py-2 rounded-md flex-shrink-0 min-w-[40px] sm:min-w-[44px] text-sm sm:text-base font-medium ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-md'
                  : typeof number === 'number'
                    ? darkMode
                      ? 'bg-gray-800 text-blue-400 hover:bg-gray-700'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-transparent cursor-default ' + (darkMode ? 'text-gray-500' : 'text-gray-400')
              } ${typeof number === 'number' ? 'transition-colors' : ''}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {number}
            </button>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 sm:px-3 py-2 rounded-md flex-shrink-0 transition-colors ${
          darkMode
            ? 'bg-gray-800 text-blue-400 hover:bg-gray-700 disabled:text-gray-600'
            : 'bg-white text-blue-600 hover:bg-blue-50 disabled:text-gray-400'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label="Página siguiente"
      >
        <ChevronRight size={20} className="sm:w-5 sm:h-5" />
      </button>
    </nav>
  );
};

export default Pagination;
