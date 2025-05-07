import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleBySlug, clearCurrentArticle } from '../blogSlice';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { ArrowLeftIcon, CalendarDaysIcon, UserCircleIcon, TagIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import NotFoundPage from '../../../pages/NotFoundPage'; // Per mostrare un 404 se l'articolo non esiste

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentArticle, isLoading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticleBySlug(slug));
    }
    // Cleanup function
    return () => {
      dispatch(clearCurrentArticle());
    };
  }, [dispatch, slug]);

  if (isLoading && !currentArticle) {
    return (
      <div className="main-container py-10 flex justify-center min-h-[calc(100vh-200px)] items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Se c'è un errore e l'articolo non è stato trovato (es. 404 dal backend simulato)
  if (error && !currentArticle) {
     // Potrebbe essere un errore di rete o un articolo non trovato
     // Per un vero 404, currentArticle sarebbe null e error potrebbe contenere "Articolo non trovato"
    if (error.toLowerCase().includes("not found") || error.toLowerCase().includes("non trovato")) {
        return <NotFoundPage />;
    }
    return (
      <div className="main-container py-10 text-center min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg mb-4">Si è verificato un errore:</p>
        <p className="text-neutral-default dark:text-gray-400 mb-6">{error}</p>
        <Link to="/blog" className="text-primary hover:underline">
          Torna al Blog
        </Link>
      </div>
    );
  }
  
  // Se l'articolo è esplicitamente null dopo il caricamento e non c'è errore, significa che non è stato trovato
  if (!isLoading && !currentArticle && !error) {
      return <NotFoundPage />;
  }
  
  // Se currentArticle non è ancora definito (ma non c'è errore o loading forte)
  if (!currentArticle) return null; // Evita render se i dati non sono pronti ma non è un errore fatale


  const formattedDate = new Date(currentArticle.publishedAt).toLocaleDateString('it-IT', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="main-container py-8 md:py-12"
    >
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-primary dark:text-primary-light hover:underline mb-6 group">
          <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Torna al Blog
        </Link>

        <article className="bg-white dark:bg-neutral-dark shadow-lg rounded-lg overflow-hidden">
          {currentArticle.imageUrl && (
            <motion.img
              src={currentArticle.imageUrl}
              alt={currentArticle.title}
              className="w-full h-64 md:h-96 object-cover"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          )}
          <div className="p-6 md:p-10">
            {currentArticle.category && (
                <span className="inline-block bg-secondary-light text-secondary-dark dark:bg-secondary-dark dark:text-secondary-light text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4">
                    {currentArticle.category}
                </span>
            )}
            <motion.h1
                className="text-3xl md:text-4xl font-bold text-neutral-dark dark:text-neutral-light mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
              {currentArticle.title}
            </motion.h1>

            <div className="flex flex-wrap items-center space-x-4 text-sm text-neutral-default dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <UserCircleIcon className="w-5 h-5 mr-1.5 text-primary dark:text-primary-light" />
                <span>{currentArticle.authorName || 'Team Kibi'}</span>
              </div>
              <div className="flex items-center">
                <CalendarDaysIcon className="w-5 h-5 mr-1.5 text-primary dark:text-primary-light" />
                <span>Pubblicato il {formattedDate}</span>
              </div>
            </div>

            <motion.div
                className="prose prose-lg dark:prose-invert max-w-none text-neutral-dark dark:text-neutral-light leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                dangerouslySetInnerHTML={{ __html: currentArticle.content.replace(/\n/g, '<br />') }}
            />

            {currentArticle.tags && currentArticle.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-neutral-light dark:border-neutral-dark/50">
                <h3 className="text-sm font-semibold text-neutral-dark dark:text-neutral-light mb-2 flex items-center">
                    <TagIcon className="w-4 h-4 mr-2 text-primary dark:text-primary-light" />
                    Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentArticle.tags.map((tag) => (
                    <span key={tag} className="bg-neutral-light dark:bg-neutral-dark/50 text-primary dark:text-primary-light text-xs font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </motion.div>
  );
};

export default ArticleDetailPage;