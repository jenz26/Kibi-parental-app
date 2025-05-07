import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getArticlesAPI,
  getArticleBySlugAPI,
  createArticleAPI,
  updateArticleAPI,
  deleteArticleAPI,
} from '../../api/articleService';
import toast from 'react-hot-toast';

// Thunks
export const fetchArticles = createAsyncThunk(
  'blog/fetchArticles',
  async (params = {}, { rejectWithValue }) => { // params = { page, limit, category, searchTerm }
    try {
      const data = await getArticlesAPI(params); // data = { articles, totalCount }
      return data;
    } catch (error) {
      // toast.error(error.message || 'Errore nel caricamento degli articoli.'); // Rimosso, gestito dal componente
      return rejectWithValue(error.message || 'Failed to fetch articles');
    }
  }
);

export const fetchArticleBySlug = createAsyncThunk(
  'blog/fetchArticleBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const article = await getArticleBySlugAPI(slug);
      return article;
    } catch (error) {
      // toast.error(error.message || 'Errore nel caricamento dell\'articolo.'); // Rimosso
      return rejectWithValue(error.message || 'Failed to fetch article');
    }
  }
);

// Admin Thunks
export const createArticle = createAsyncThunk(
  'blog/createArticle',
  async (articleData, { rejectWithValue }) => { // Rimosso getState non utilizzato
    try {
      const newArticle = await createArticleAPI(articleData);
      return newArticle;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create article');
    }
  }
);

export const updateArticle = createAsyncThunk(
  'blog/updateArticle',
  async ({ articleId, articleData }, { rejectWithValue }) => {
    try {
      const updatedArticle = await updateArticleAPI(articleId, articleData);
      return updatedArticle;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update article');
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'blog/deleteArticle',
  async (articleId, { rejectWithValue }) => {
    try {
      await deleteArticleAPI(articleId);
      return articleId; // Restituisce l'ID dell'articolo eliminato per rimuoverlo dallo stato
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete article');
    }
  }
);


const initialState = {
  articles: [],
  currentArticle: null,
  isLoading: false,
  error: null,
  totalArticles: 0,
  currentPage: 1,
  filters: {
    category: '',
    searchTerm: '',
  }
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
        state.filters = { ...state.filters, ...action.payload };
        state.currentPage = 1; // Reset page when filters change
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
      state.error = null; // Pulisce anche l'errore relativo al singolo articolo
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchArticles
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
        state.totalArticles = action.payload.totalCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.articles = []; // Pulisce gli articoli in caso di errore
        state.totalArticles = 0;
      })
      // fetchArticleBySlug
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentArticle = null;
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentArticle = null;
      })
      // createArticle (Admin)
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true; // Usare un loading specifico per admin ops se necessario
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        // Non si aggiorna articles qui, il refresh è gestito dal componente ArticleManagement
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // toast.error(action.payload || "Errore nella creazione dell'articolo"); // Rimosso, gestito dal componente
      })
      // updateArticle (Admin)
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        // Non si aggiorna articles qui
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // toast.error(action.payload || "Errore nell'aggiornamento dell'articolo"); // Rimosso
      })
      // deleteArticle (Admin)
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        // Non si aggiorna articles qui
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // toast.error(action.payload || "Errore nell'eliminazione dell'articolo"); // Rimosso
      });
  },
});

export const { setCurrentPage, setFilters, clearCurrentArticle } = blogSlice.actions;
export default blogSlice.reducer;