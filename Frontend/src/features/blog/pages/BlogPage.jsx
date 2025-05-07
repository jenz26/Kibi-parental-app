import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, setCurrentPage as setReduxCurrentPage, setFilters as setReduxFilters } from '../blogSlice';
import ArticleCard from '../../../components/common/ArticleCard';
import Pagination from '../../../components/common/Pagination';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { FunnelIcon, MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline'; // Aggiunto XCircleIcon
import { BLOG_ARTICLES_PER_PAGE, ARTICLE_CATEGORIES } from '../../../constants';
import { motion } from 'framer-motion';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { articles, isLoading, error, totalArticles, currentPage, filters } = useSelector((state) => state.blog);

  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);
  const [localCategory, setLocalCategory] = useState(filters.category);

  useEffect(() => {
    dispatch(fetchArticles({
      page: currentPage,
      limit: BLOG_ARTICLES_PER_PAGE,
      category: filters.category,
      searchTerm: filters.searchTerm
    }));
  }, [dispatch, currentPage, filters]);

  const handlePageChange = (page) => {
    dispatch(setReduxCurrentPage(page));
    window.scrollTo(0, 0);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault(); // Previene il submit del form se fosse un form
    dispatch(setReduxFilters({ category: localCategory, searchTerm: localSearchTerm }));
  };

  const handleResetFilters = () => {
    setLocalCategory('');
    setLocalSearchTerm('');
    dispatch(setReduxFilters({ category: '', searchTerm: '' }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">Il Nostro Blog</h1>
        <p className="text-center text-lg text-neutral-default dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Consigli, guide e riflessioni per accompagnarti nel viaggio della genitorialità.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleFilterSubmit}
        className="mb-8 p-4 sm:p-6 bg-neutral-light/50 dark:bg-neutral-dark/30 rounded-lg shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4">
            <label htmlFor="category-filter" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">
              Categoria
            </label>
            <select
              id="category-filter"
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
              className="w-full p-2.5 border border-neutral-default/50 dark:border-neutral-dark/70 rounded-md focus:ring-primary focus:border-primary dark:bg-neutral-dark/50 dark:text-neutral-light"
            >
              <option value="">Tutte le categorie</option>
              {ARTICLE_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-5">
             <label htmlFor="search-filter" className="block text-sm font-medium text-neutral-dark dark:text-neutral-light mb-1">
              Cerca
            </label>
            <div className="relative">
                <input
                id="search-filter"
                type="text"
                placeholder="Parola chiave..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full p-2.5 pl-10 border border-neutral-default/50 dark:border-neutral-dark/70 rounded-md focus:ring-primary focus:border-primary dark:bg-neutral-dark/50 dark:text-neutral-light"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-neutral-default dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"/>
            </div>
          </div>
          <div className="md:col-span-3 flex space-x-2">
            <button
              type="submit" // Cambiato a submit per il form
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-md flex items-center justify-center transition-colors"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filtra
            </button>
             <button
              type="button" // Type button per non fare submit
              onClick={handleResetFilters}
              className="w-auto bg-neutral-default/30 hover:bg-neutral-default/50 dark:bg-neutral-dark/60 dark:hover:bg-neutral-dark/80 text-neutral-dark dark:text-neutral-light font-medium py-2.5 px-3 rounded-md transition-colors"
              title="Resetta filtri"
            >
              <XCircleIcon className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </motion.form>

      {isLoading && articles.length === 0 && (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg py-10">Errore durante il caricamento degli articoli: {error}</p>
      )}

      {!isLoading && !error && articles.length === 0 && (
        <p className="text-center text-xl text-neutral-default dark:text-gray-400 py-10">
          Nessun articolo trovato. Prova a modificare i filtri di ricerca.
        </p>
      )}

      {articles.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
                 <ArticleCard article={article} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {totalArticles > BLOG_ARTICLES_PER_PAGE && !error && articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalArticles / BLOG_ARTICLES_PER_PAGE)}
          onPageChange={handlePageChange}
          itemsPerPage={BLOG_ARTICLES_PER_PAGE}
          totalItems={totalArticles}
        />
      )}
    </div>
  );
};

export default BlogPage;