import { useSelector } from 'react-redux';

/**
 * Hook personalizzato per accedere facilmente allo stato di autenticazione.
 * @returns {{
 *  user: Object | null,
 *  token: string | null,
 *  isAuthenticated: boolean,
 *  isLoading: boolean, // Indica se un'operazione di login/register è in corso
 *  isInitialLoading: boolean, // Indica se l'app sta ancora verificando il token iniziale
 *  error: string | null,
 *  isAdmin: boolean
 * }}
 */
export const useAuth = () => {
  // Seleziona tutti gli stati rilevanti dallo slice 'auth'
  const { 
    user, 
    token, 
    isAuthenticated, 
    isLoading, 
    isInitialLoading, // Assicurati che questo nome corrisponda a quello nello slice
    error 
  } = useSelector((state) => state.auth);

  // Determina se l'utente è admin
  const isAdmin = isAuthenticated && user?.role === 'admin';

  // Restituisce un oggetto con tutti gli stati utili
  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isInitialLoading, // Restituisci il nuovo stato
    error,
    isAdmin
  };
};