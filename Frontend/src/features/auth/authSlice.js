import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI } from '../../api/authService'; // Assicurati che il path sia corretto
import { LOCAL_STORAGE_TOKEN_KEY } from '../../constants'; // Assicurati che il path sia corretto
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

// Helper per estrarre il messaggio di errore
const getErrorMessage = (error) => {
    // Controlla errori specifici dell'API (se il tuo backend li manda così)
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    // Messaggio generico dell'errore JS
    if (error.message) {
      return error.message;
    }
    // Fallback
    return 'Si è verificato un errore sconosciuto';
};

// --- Async Thunks ---
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginAPI(credentials);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
      return data; // Payload sarà { user, token }
    } catch (error) {
      const message = getErrorMessage(error);
      console.error("Login Fallito:", message); // Log per debug
      return rejectWithValue(message); // Passa solo il messaggio di errore allo stato
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerAPI(userData);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
      return data; // Payload sarà { user, token }
    } catch (error) {
      const message = getErrorMessage(error);
      console.error("Registrazione Fallita:", message); // Log per debug
      return rejectWithValue(message); // Passa solo il messaggio di errore allo stato
    }
  }
);

// --- Stato Iniziale ---
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,        // Stato di loading per login/register in corso
  isInitialLoading: true, // Stato per il controllo iniziale del token all'avvio
  error: null,
};

// --- Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Azione per il Logout
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isInitialLoading = false; // Anche l'iniziale è finito
      state.error = null;
      toast.success('Logout effettuato.');
    },
    // Azione per caricare l'utente da localStorage all'avvio
    loadUserFromStorage: (state) => {
      state.isInitialLoading = true; // Inizia il caricamento iniziale
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

      // Resetta lo stato prima di controllare
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          // Controlla la scadenza del token
          if (decodedToken.exp * 1000 > Date.now()) {
            // Token valido
            state.token = token;
            state.user = {
                id: decodedToken.sub || null,
                email: decodedToken.email || null,
                role: decodedToken.role || 'user',
                name: decodedToken.name || 'Utente'
            };
            state.isAuthenticated = true;
          } else {
            // Token scaduto
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
          }
        } catch (error) {
          // Token non valido o errore di decodifica
          console.error("Errore nel caricare utente da storage:", error);
          localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        }
      }
      state.isInitialLoading = false; // Fine del caricamento iniziale
      state.isLoading = false; // Resetta anche l'altro loading per sicurezza
    },
    // Azione per pulire manualmente lo stato di errore (es. al cambio vista nel form)
    clearError: (state) => {
      state.error = null;
    },
    // Azione per aggiornare i dati dell'utente (es. dopo modifica profilo)
    updateAuthUser: (state, action) => {
        if (state.user && action.payload) {
            state.user = { ...state.user, ...action.payload };
            // Se il token viene aggiornato (es. refresh token), salva il nuovo
            if (action.payload.token) {
                state.token = action.payload.token;
                localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.payload.token);
            }
        }
    }
  },
  // Gestione degli stati dei Thunk asincroni
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // Usa isLoading per le operazioni in corso
        state.isInitialLoading = false; // Assicura che il loading iniziale sia false
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Imposta l'errore con il messaggio dal rejectWithValue
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Usa isLoading per le operazioni in corso
        state.isInitialLoading = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Imposta l'errore con il messaggio dal rejectWithValue
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

// Esporta azioni e reducer
export const { logout, loadUserFromStorage, clearError, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;