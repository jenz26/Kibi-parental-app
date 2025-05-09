// --- START OF FILE src/api/articleService.js ---
import axiosInstance from './axiosInstance';

export const getArticlesAPI = async (params = {}) => {
  const { page = 1, limit = 6, category = '', searchTerm = '' } = params;
  
  let query = `/articles?_page=${page}&_limit=${limit}&_sort=publishedAt&_order=desc`;

  if (category) {
    query += `&category_like=${encodeURIComponent(category)}`;
  }
  if (searchTerm) {
    query += `&q=${encodeURIComponent(searchTerm)}`;
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
    throw error.response?.data || new Error(error.message || 'Errore nel recupero degli articoli');
  }
};

export const getArticleBySlugAPI = async (slug) => {
  try {
    const response = await axiosInstance.get(`/articles?slug=${encodeURIComponent(slug)}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    const err = new Error('Articolo non trovato');
    // err.status = 404; 
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
    return articleId;
  } catch (error) {
    console.error(`API Error in deleteArticleAPI for ID ${articleId}:`, error.response?.data || error.message);
    throw error.response?.data || new Error(error.message || 'Errore nell\'eliminazione dell\'articolo');
  }
};

// NUOVA FUNZIONE PER ARTICOLI SUGGERITI
export const getSuggestedArticlesAPI = async (interests = [], limit = 3, excludeSlug = null) => {
  if (!interests || interests.length === 0) {
    return { articles: [], totalCount: 0 };
  }

  let suggestedArticles = [];
  const fetchedSlugs = new Set();
  if (excludeSlug) {
    fetchedSlugs.add(excludeSlug); // Escludi subito l'articolo principale
  }

  // Strategia: per ogni interesse, prova a trovare articoli pertinenti
  // Diamo priorità alle categorie, poi ai tag (simulato con 'q' per json-server)
  const searchPriorities = ['category_like', 'q']; 

  for (const priority of searchPriorities) {
    for (const interest of interests) {
      if (suggestedArticles.length >= limit) break;
      try {
        let queryParams = `_limit=${limit * 2}&_sort=publishedAt&_order=desc`; // Fetch un po' di più per avere scelta
        if (priority === 'category_like') {
          queryParams += `&category_like=${encodeURIComponent(interest)}`;
        } else { // 'q'
          queryParams += `&q=${encodeURIComponent(interest)}`;
        }
        
        const response = await axiosInstance.get(`/articles?${queryParams}`);
        
        response.data.forEach(article => {
          if (!fetchedSlugs.has(article.slug) && suggestedArticles.length < limit) {
            // Se la priorità è 'q', potremmo voler verificare ulteriormente se l'interesse è nei tag
            let matchesInterest = true;
            if (priority === 'q' && Array.isArray(article.tags)) {
                matchesInterest = article.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()));
            }

            if(matchesInterest){
                suggestedArticles.push(article);
                fetchedSlugs.add(article.slug);
            }
          }
        });
      } catch (error) {
        console.warn(`Errore nel recuperare articoli per interesse "${interest}" con priorità "${priority}":`, error);
      }
    }
    if (suggestedArticles.length >= limit) break;
  }
  
  // Fallback: se ancora non bastano, prendi gli ultimi articoli generici
  if (suggestedArticles.length < limit) {
      try {
          const response = await axiosInstance.get(`/articles?_limit=${limit}&_sort=publishedAt&_order=desc`);
          response.data.forEach(article => {
              if (!fetchedSlugs.has(article.slug) && suggestedArticles.length < limit) {
                  suggestedArticles.push(article);
                  fetchedSlugs.add(article.slug);
              }
          });
      } catch (error) {
          console.warn(`Errore nel recuperare gli ultimi articoli generici:`, error);
      }
  }

  return {
    articles: suggestedArticles.slice(0, limit),
    totalCount: suggestedArticles.length 
  };
};
// --- END OF FILE src/api/articleService.js ---