// --- START OF FILE src/api/articleService.js ---
import axiosInstance from './axiosInstance';
// Non c'è bisogno di BLOG_ARTICLES_PER_PAGE qui se viene passato come 'limit' dai thunks

export const getArticlesAPI = async (params = {}) => {
  const { page = 1, limit = 6, category = '', searchTerm = '' } = params; // Default limit a 6 come nel tuo BlogPage
  
  let query = `/articles?_page=${page}&_limit=${limit}&_sort=publishedAt&_order=desc`;

  if (category) {
    // Usiamo category_like per un match più flessibile se le categorie nei dati possono avere variazioni
    // o se vuoi che "Sviluppo" prenda anche "Sviluppo Bambino". 
    // Se le categorie sono esatte e fisse, puoi usare &category=${encodeURIComponent(category)}
    query += `&category_like=${encodeURIComponent(category)}`;
  }
  if (searchTerm) {
    query += `&q=${encodeURIComponent(searchTerm)}`; // 'q' per full-text search in json-server
  }

  try {
    const response = await axiosInstance.get(query);
    const totalCount = response.headers['x-total-count'];
    return {
      articles: response.data,
      totalCount: parseInt(totalCount, 10) || 0,
    };
  } catch (error) {
    console.error("API Error in getArticlesAPI:", error.response?.data || error.message);
    // Rilancia l'errore in modo che il thunk possa gestirlo con rejectWithValue
    throw error.response?.data || new Error(error.message || 'Errore nel recupero degli articoli');
  }
};

export const getArticleBySlugAPI = async (slug) => {
  try {
    const response = await axiosInstance.get(`/articles?slug=${encodeURIComponent(slug)}`);
    if (response.data && response.data.length > 0) {
      return response.data[0]; // json-server restituisce un array anche per query su campi unici
    }
    // Se l'array è vuoto, l'articolo non è stato trovato
    const err = new Error('Articolo non trovato');
    // err.status = 404; // Puoi aggiungere uno status se vuoi gestirlo specificamente
    throw err;
  } catch (error) {
    console.error(`API Error in getArticleBySlugAPI for slug ${slug}:`, error.response?.data || error.message);
    throw error.response?.data || new Error(error.message || 'Errore nel recupero dell\'articolo');
  }
};

export const createArticleAPI = async (articleData) => {
  try {
    const response = await axiosInstance.post('/articles', articleData);
    return response.data;
  } catch (error) {
    console.error("API Error in createArticleAPI:", error.response?.data || error.message);
    throw error.response?.data || new Error(error.message || 'Errore nella creazione dell\'articolo');
  }
};

export const updateArticleAPI = async (articleId, articleData) => {
  try {
    // Usare PATCH per aggiornamenti parziali, PUT per sostituzione completa.
    // JSON Server di solito gestisce bene PATCH per aggiornare solo i campi inviati.
    const response = await axiosInstance.patch(`/articles/${articleId}`, articleData);
    return response.data;
  } catch (error) {
    console.error(`API Error in updateArticleAPI for ID ${articleId}:`, error.response?.data || error.message);
    throw error.response?.data || new Error(error.message || 'Errore nell\'aggiornamento dell\'articolo');
  }
};

export const deleteArticleAPI = async (articleId) => {
  try {
    await axiosInstance.delete(`/articles/${articleId}`);
    // Per DELETE, json-server di solito restituisce un oggetto vuoto {} o status 200/204.
    // Non c'è un vero "dato" da restituire, se non l'ID per la gestione nello store.
    return articleId; // Restituire l'ID è utile per il reducer.
  } catch (error) {
    console.error(`API Error in deleteArticleAPI for ID ${articleId}:`, error.response?.data || error.message);
    throw error.response?.data || new Error(error.message || 'Errore nell\'eliminazione dell\'articolo');
  }
};
// --- END OF FILE src/api/articleService.js ---