import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../blog/blogSlice'; // Corretto path importazione slice
import ArticleForm from './ArticleForm'; // Assicurati che il path sia corretto
import Button from '../../../components/common/Button'; // Assicurati che il path sia corretto
import Modal from '../../../components/common/Modal'; // Assicurati che il path sia corretto
import Pagination from '../../../components/common/Pagination'; // Assicurati che il path sia corretto
import LoadingSpinner from '../../../components/common/LoadingSpinner'; // Assicurati che il path sia corretto
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { ADMIN_ARTICLES_PER_PAGE } from '../../../constants'; // Assicurati che il path sia corretto

const ArticleManagement = () => {
  const dispatch = useDispatch();
  // Seleziona i dati corretti dallo stato del blog
  const { articles, isLoading, error, totalCount: totalArticles } = useSelector((state) => state.blog); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Stato di loading specifico per le operazioni di submit (create/update)
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Carica gli articoli al montaggio e quando cambiano pagina o termine di ricerca
  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, limit: ADMIN_ARTICLES_PER_PAGE, searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  // Apre la modale per creare o modificare
  const handleOpenModal = (article = null) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  // Chiude la modale e resetta lo stato
  const handleCloseModal = () => {
    setEditingArticle(null);
    setIsModalOpen(false);
  };

  // Gestisce il submit del form articolo
  const handleSubmitArticle = async (data) => {
    setIsSubmitting(true); // Attiva loading specifico del form
    try {
      if (editingArticle) {
        await dispatch(updateArticle({ articleId: editingArticle.id, articleData: data })).unwrap();
        toast.success('Articolo aggiornato con successo!');
      } else {
        await dispatch(createArticle(data)).unwrap();
        toast.success('Articolo creato con successo!');
        // Se è una creazione, potremmo voler tornare alla prima pagina per vedere il nuovo articolo
        if(currentPage !== 1) setCurrentPage(1); 
      }
      handleCloseModal();
      // Ricarica gli articoli (verrà fatto dall'useEffect se currentPage cambia, altrimenti forza)
       if(currentPage === 1 || !editingArticle) {
         dispatch(fetchArticles({ page: 1, limit: ADMIN_ARTICLES_PER_PAGE, searchTerm }));
       }
    } catch (err) {
      const message = err.message || `Errore ${editingArticle ? 'nell\'aggiornamento' : 'nella creazione'} dell'articolo.`;
      toast.error(message);
    } finally {
        setIsSubmitting(false); // Disattiva loading specifico del form
    }
  };

  // Apre la conferma di eliminazione
  const handleDeleteConfirmation = (article) => {
    setArticleToDelete(article);
    setIsDeleteDialogOpen(true);
  };

  // Esegue l'eliminazione
  const handleDeleteArticle = async () => {
    if (!articleToDelete) return;
    // Usa lo stato isLoading generale per l'eliminazione
    // Potresti creare un isDeleting se preferisci granularità
    // setIsLoading(true);
    try {
      await dispatch(deleteArticle(articleToDelete.id)).unwrap();
      toast.success('Articolo eliminato con successo!');
      setIsDeleteDialogOpen(false);
      setArticleToDelete(null);
      // Aggiorna la lista, controllando se l'eliminazione svuota la pagina corrente
      const newTotalPages = Math.ceil((totalArticles - 1) / ADMIN_ARTICLES_PER_PAGE);
      const newCurrentPage = (articles.length === 1 && currentPage > 1) ? currentPage - 1 : currentPage;
       setCurrentPage(newCurrentPage); // Imposta prima la nuova pagina
       if (newCurrentPage === currentPage) { // Se la pagina non cambia, forza il fetch
           dispatch(fetchArticles({ page: newCurrentPage, limit: ADMIN_ARTICLES_PER_PAGE, searchTerm }));
       }
      // Se la pagina cambia, l'useEffect la ricaricherà
    } catch (err) {
      toast.error(err.message || 'Errore durante l\'eliminazione dell\'articolo.');
      setIsDeleteDialogOpen(false);
    } finally {
        // setIsLoading(false);
    }
  };

  // Gestione cambio pagina
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Gestione input ricerca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Torna alla prima pagina
  };

  // Mostra errore solo se non ci sono articoli caricati e non sta caricando
  if (error && !isLoading && articles.length === 0) {
      return <p className="text-center text-red-500 dark:text-red-400 mt-10">Errore nel caricamento degli articoli: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

      {/* --- MODIFICA TABELLA --- */}
      {isLoading && articles.length === 0 ? ( // Mostra spinner solo al caricamento iniziale senza dati
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
         // Wrapper per lo scroll orizzontale
        <div className="overflow-x-auto shadow-md rounded-lg mt-4 border border-neutral-light dark:border-neutral-dark/50">
          <table className="min-w-full divide-y divide-neutral-light dark:divide-neutral-dark/50">
            <thead className="bg-neutral-light/50 dark:bg-neutral-dark/30">
              <tr>
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Titolo</th>
                {/* Nascondi categoria e autore su schermi molto piccoli? */}
                <th scope="col" className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Categoria</th>
                <th scope="col" className="hidden md:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Autore</th>
                <th scope="col" className="hidden lg:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Data Pubblicazione</th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-neutral-default dark:text-gray-300 uppercase tracking-wider">Azioni</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-dark divide-y divide-neutral-light dark:divide-neutral-dark/50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-neutral-light/30 dark:hover:bg-neutral-dark/40 transition-colors">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-dark dark:text-neutral-light">{article.title}</td>
                  <td className="hidden sm:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-300">{article.category || '-'}</td>
                  <td className="hidden md:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-300">{article.authorName || 'Admin'}</td>
                  <td className="hidden lg:table-cell px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-default dark:text-gray-300">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('it-IT') : '-'}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(article)} title="Modifica" className="p-1">
                      <PencilIcon className="h-4 w-4 text-primary dark:text-primary-light" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteConfirmation(article)} title="Elimina" className="p-1">
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* --- FINE MODIFICA TABELLA --- */}

      {articles.length === 0 && !isLoading && (
        <p className="text-center text-neutral-default dark:text-gray-400 py-8">Nessun articolo trovato.</p>
      )}

      {/* Mostra paginazione solo se ci sono più pagine */}
      {totalArticles > ADMIN_ARTICLES_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalArticles / ADMIN_ARTICLES_PER_PAGE)}
            onPageChange={handlePageChange}
            itemsPerPage={ADMIN_ARTICLES_PER_PAGE}
            totalItems={totalArticles}
          />
      )}

      {/* Modale per Nuovo/Modifica Articolo */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingArticle ? 'Modifica Articolo' : 'Nuovo Articolo'}
      >
        {isModalOpen && (
            <ArticleForm
              onSubmit={handleSubmitArticle}
              initialData={editingArticle}
              isLoading={isSubmitting} // Usa lo stato specifico per il submit
            />
        )}
      </Modal>

      {/* Modale Conferma Eliminazione */}
      <Modal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Conferma Eliminazione Articolo"
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