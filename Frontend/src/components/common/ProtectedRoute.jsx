import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Importa il custom hook aggiornato
import LoadingSpinner from './LoadingSpinner'; // Assicurati che il path sia corretto

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Usa il custom hook per ottenere lo stato di autenticazione
  const { isAuthenticated, user, isInitialLoading } = useAuth(); 
  const location = useLocation();

  // Mostra lo spinner SOLO durante il controllo iniziale del token all'avvio dell'app
  if (isInitialLoading) { 
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Se il caricamento iniziale è finito e l'utente NON è autenticato, reindirizza al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se la route richiede ruoli specifici e l'utente non li ha, reindirizza
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Reindirizza alla dashboard o idealmente a una pagina /unauthorized
    return <Navigate to="/dashboard" replace />; 
  }

  // Se autenticato e con i ruoli corretti (o se non sono richiesti ruoli), mostra il componente figlio
  return children;
};

export default ProtectedRoute;