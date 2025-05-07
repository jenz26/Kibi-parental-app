import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../blog/blogSlice';
import ArticleForm from './ArticleForm';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Pagination from '../../../components/common/Pagination';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { ADMIN_ARTICLES_PER_PAGE } from '../../../constants';

const ArticleManagement = () => {
  const dispatch = useDispatch();
  const { articles, isLoading, error, totalArticles } = useSelector((state) => state.blog);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, limit: ADMIN_ARTICLES_PER_PAGE, searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handleOpenModal = (article = null) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingArticle(null);
    setIsModalOpen(false);
  };

  const handleSubmitArticle = async (data) => {
    try {
      if (editingArticle) {
        await dispatch(updateArticle({ articleId: editingArticle.id, articleData: data })).unwrap();
        toast.success('Articolo aggiornato con successo!');
      } else {
        await dispatch(createArticle(data)).unwrap();
        toast.success('Articolo creato con successo!');
      }
      handleCloseModal();
      // Ricarica gli articoli per vedere le modifiche
      dispatch(fetchArticles({ page: currentPage, limit: ADMIN_ARTICLES_PER_PAGE, searchTerm }));
    } catch (err) {
      toast.error(err.message || `Errore ${editingArticle ? 'nell\'aggiornamento' : 'nella creazione'} dell'articolo.`);
    }
  };

  const handleDeleteConfirmation = (article) => {
    setArticleToDelete(article);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteArticle = async () => {
    if (!articleToDelete) return;
    try {
      await dispatch(deleteArticle(articleToDelete.id)).unwrap();
      toast.success('Articolo eliminato con successo!');
      setIsDeleteDialogOpen(false);
      setArticleToDelete(null);
      // Ricarica gli articoli
      dispatch(fetchArticles({ page: currentPage, limit: ADMIN_ARTICLES_PER_PAGE, searchTerm }));
       // Se l'ultima pagina diventa vuota dopo la cancellazione, torna alla pagina precedente
      if (articles.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      toast.error(err.message || 'Errore durante l\'eliminazione dell\'articolo.');
      setIsDeleteDialogOpen(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };


  if (error) return <p className="text-red-500">Errore nel caricamento degli articoli: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="page-title !text-2xl !mb-0">Gestione Articoli</h1>
        <Button onClick={() => handleOpenModal()} variant="primary" iconLeft={<PlusIcon className="h-5 w-5" />}>
          Nuovo Articolo
        </Button>
      </div>

      <input
        type="text"
        placeholder="Cerca articoli per titolo o contenuto..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-neutral-default/50 dark:border-neutral-dark/70 rounded-md focus:ring-primary focus:border-primary dark:bg-neutral-dark/30 dark:text-neutral-light"
      />

      {isLoading && !articles.length ? (
        <LoadingSpinner size="lg" className="my-10" />
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-neutral-dark shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-neutral-light dark:divide-neutral-dark/50">
            <thead className="bg-neutral-light/50 dark:bg-neutral-dark/30">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Titolo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Categoria</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Autore</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Data Pubblicazione</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-dark divide-y divide-neutral-light dark:divide-neutral-dark/50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-neutral-light/30 dark:hover:bg-neutral-dark/40 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-dark dark:text-neutral-light">{article.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-300">{article.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-300">{article.authorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-300">
                    {new Date(article.publishedAt).toLocaleDateString('it-IT')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(article)} title="Modifica">
                      <PencilIcon className="h-5 w-5 text-primary dark:text-primary-light" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteConfirmation(article)} title="Elimina">
                      <TrashIcon className="h-5 w-5 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {articles.length === 0 && !isLoading && (
        <p className="text-center text-neutral-default dark:text-gray-400 py-8">Nessun articolo trovato.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalArticles / ADMIN_ARTICLES_PER_PAGE)}
        onPageChange={handlePageChange}
        itemsPerPage={ADMIN_ARTICLES_PER_PAGE}
        totalItems={totalArticles}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingArticle ? 'Modifica Articolo' : 'Nuovo Articolo'}
      >
        {/* Il form viene renderizzato solo se la modale è aperta, per resettare lo stato */}
        {isModalOpen && (
            <ArticleForm
            onSubmit={handleSubmitArticle}
            initialData={editingArticle}
            isLoading={isLoading} // Potrebbe essere uno stato di loading specifico per il form
            />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Conferma Eliminazione"
        primaryAction={handleDeleteArticle}
        primaryActionLabel="Elimina"
        primaryActionVariant="danger"
        secondaryAction={() => setIsDeleteDialogOpen(false)}
        secondaryActionLabel="Annulla"
      >
        <p>Sei sicuro di voler eliminare l'articolo "<strong>{articleToDelete?.title}</strong>"? Questa azione è irreversibile.</p>
      </Modal>
    </div>
  );
};

export default ArticleManagement;