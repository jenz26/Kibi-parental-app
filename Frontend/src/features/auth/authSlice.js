import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI } from '../../api/authService';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../constants';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import toast from 'react-hot-toast';

// Thunk per il login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginAPI(credentials);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
      return data; // { user, token }
    } catch (error) {
      // toast.error(error.message || 'Login fallito. Controlla le tue credenziali.'); // Rimosso perché gestito da AuthPage
      return rejectWithValue(error.message || 'Credenziali non valide');
    }
  }
);

// Thunk per la registrazione
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerAPI(userData);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
      return data; // { user, token }
    } catch (error) {
      // toast.error(error.message || 'Registrazione fallita. Riprova.'); // Rimosso
      return rejectWithValue(error.message || 'Errore durante la registrazione');
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || null,
  isAuthenticated: false,
  isLoading: true, // Inizia come true per permettere a loadUserFromStorage di completare
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      toast.success('Logout effettuato.');
    },
    loadUserFromStorage: (state) => {
      state.isLoading = true; // Inizia il caricamento
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 > Date.now()) {
            state.token = token;
            state.user = {
                id: decodedToken.sub,
                email: decodedToken.email,
                role: decodedToken.role,
                name: decodedToken.name
            };
            state.isAuthenticated = true;
          } else {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
            // state.user = null; // Già null per initialState
            // state.token = null;
            // state.isAuthenticated = false;
          }
        } catch (error) {
          console.error("Errore nel decodificare il token:", error);
          localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
          // state.user = null;
          // state.token = null;
          // state.isAuthenticated = false;
        }
      }
      state.isLoading = false; // Fine caricamento
    },
    clearError: (state) => {
      state.error = null;
    },
    updateAuthUser: (state, action) => {
        if (state.user && action.payload) {
            state.user = { ...state.user, ...action.payload };
        }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
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
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
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
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, loadUserFromStorage, clearError, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;