import { useSelector } from 'react-redux';

/**
 * Hook personalizzato per accedere facilmente allo stato di autenticazione.
 * @returns {{
 *  user: Object | null,
 *  token: string | null,
 *  isAuthenticated: boolean,
 *  isLoading: boolean,
 *  error: string | null,
 *  isAdmin: boolean
 * }}
 */
export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const isAdmin = isAuthenticated && user?.role === 'admin';

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    isAdmin
  };
};