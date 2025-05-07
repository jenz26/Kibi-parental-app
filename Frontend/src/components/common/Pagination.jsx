import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Button from './Button'; // Assicurati che Button sia importato

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxPageButtons = 5; // Numero massimo di bottoni di pagina da mostrare

  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const fromItem = (currentPage - 1) * itemsPerPage + 1;
  const toItem = Math.min(currentPage * itemsPerPage, totalItems);


  return (
    <div className="flex items-center justify-between border-t border-neutral-light dark:border-neutral-dark/50 bg-background-light dark:bg-background-dark px-4 py-3 sm:px-6 mt-8">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
        >
          Precedente
        </Button>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
        >
          Successiva
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-default dark:text-gray-400">
            Mostrando <span className="font-medium">{fromItem}</span> - <span className="font-medium">{toItem}</span> di{' '}
            <span className="font-medium">{totalItems}</span> risultati
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="ghost"
              size="sm"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-neutral-default/30 dark:ring-neutral-dark/70 hover:bg-neutral-light dark:hover:bg-neutral-dark/50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Precedente</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Button>

            {startPage > 1 && (
                <>
                    <Button onClick={() => onPageChange(1)} variant="ghost" size="sm" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-neutral-default/30 dark:ring-neutral-dark/70 hover:bg-neutral-light dark:hover:bg-neutral-dark/50 focus:z-20 focus:outline-offset-0">
                        1
                    </Button>
                    {startPage > 2 && <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-default dark:text-gray-400 ring-1 ring-inset ring-neutral-default/30 dark:ring-neutral-dark/70">...</span>}
                </>
            )}

            {pageNumbers.map(number => (
              <Button
                key={number}
                onClick={() => onPageChange(number)}
                variant={currentPage === number ? 'primary' : 'ghost'}
                size="sm"
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-neutral-default/30 dark:ring-neutral-dark/70 focus:z-20 focus:outline-offset-0 ${currentPage === number ? '' : 'hover:bg-neutral-light dark:hover:bg-neutral-dark/50'}`}
                aria-current={currentPage === number ? 'page' : undefined}
              >
                {number}
              </Button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages -1 &&  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-default dark:text-gray-400 ring-1 ring-inset ring-neutral-default/30 dark:ring-neutral-dark/70">...</span>}
                    <Button onClick={() => onPageChange(totalPages)} variant="ghost" size="sm" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-neutral-default/30 dark:ring-neutral-dark/70 hover:bg-neutral-light dark:hover:bg-neutral-dark/50 focus:z-20 focus:outline-offset-0">
                        {totalPages}
                    </Button>
                </>
            )}

            <Button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="ghost"
              size="sm"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-neutral-default/30 dark:ring-neutral-dark/70 hover:bg-neutral-light dark:hover:bg-neutral-dark/50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Successiva</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;