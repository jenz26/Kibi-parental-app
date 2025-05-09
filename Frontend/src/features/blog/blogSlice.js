// --- START OF FILE src/features/blog/blogSlice.js ---
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getArticlesAPI,
  getArticleBySlugAPI,
  createArticleAPI,
  updateArticleAPI,
  deleteArticleAPI,
  getSuggestedArticlesAPI, // Importa la nuova funzione
} from '../../api/articleService'; // Adatta il path se necessario

// Thunk Esistenti
export const fetchArticles = createAsyncThunk(
  'blog/fetchArticles',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await getArticlesAPI(params);
      return data;
    } catch (error) {
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
      return rejectWithValue(error.message || 'Failed to fetch article');
    }
  }
);

export const createArticle = createAsyncThunk( /* ... codice invariato ... */ );
export const updateArticle = createAsyncThunk( /* ... codice invariato ... */ );
export const deleteArticle = createAsyncThunk( /* ... codice invariato ... */ );


// NUOVO THUNK PER ARTICOLI SUGGERITI
export const fetchSuggestedArticles = createAsyncThunk(
  'blog/fetchSuggestedArticles',
  async ({ interests, limit = 3, excludeSlug = null }, { rejectWithValue }) => {
    try {
      const data = await getSuggestedArticlesAPI(interests, limit, excludeSlug);
      return data.articles;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch suggested articles');
    }
  }
);

const initialState = {
  articles: [],
  currentArticle: null,
  suggestedArticles: [],        // NUOVO
  isLoading: false,
  isLoadingSuggestions: false,  // NUOVO
  error: null,
  errorSuggestions: null,       // NUOVO
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
        state.currentPage = 1;
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
      state.error = null;
    },
    clearSuggestedArticles: (state) => { // NUOVO REDUCER
        state.suggestedArticles = [];
        state.isLoadingSuggestions = false; // Resetta anche il loading
        state.errorSuggestions = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Casi per fetchArticles (invariati)
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true; state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false; state.articles = action.payload.articles; state.totalArticles = action.payload.totalCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false; state.error = action.payload; state.articles = []; state.totalArticles = 0;
      })
      // Casi per fetchArticleBySlug (invariati)
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.isLoading = true; state.error = null; state.currentArticle = null;
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.isLoading = false; state.currentArticle = action.payload;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.isLoading = false; state.error = action.payload; state.currentArticle = null;
      })
      // Casi Admin (create, update, delete - invariati)
      // ...

      // Casi per fetchSuggestedArticles (NUOVI)
      .addCase(fetchSuggestedArticles.pending, (state) => {
        state.isLoadingSuggestions = true;
        state.errorSuggestions = null;
      })
      .addCase(fetchSuggestedArticles.fulfilled, (state, action) => {
        state.isLoadingSuggestions = false;
        state.suggestedArticles = action.payload;
      })
      .addCase(fetchSuggestedArticles.rejected, (state, action) => {
        state.isLoadingSuggestions = false;
        state.errorSuggestions = action.payload;
        state.suggestedArticles = [];
      });
  },
});

export const { setCurrentPage, setFilters, clearCurrentArticle, clearSuggestedArticles } = blogSlice.actions;
export default blogSlice.reducer;
// --- END OF FILE src/features/blog/blogSlice.js ---