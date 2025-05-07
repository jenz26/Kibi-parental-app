import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    // Mostra uno spinner di caricamento mentre lo stato di autenticazione viene verificato
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Se non autenticato, reindirizza alla pagina di login
    // Salva la posizione corrente per reindirizzare l'utente dopo il login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Se l'utente è autenticato ma non ha il ruolo richiesto,
    // reindirizza a una pagina di "non autorizzato" o alla dashboard
    // Per semplicità, reindirizziamo alla dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Se l'utente è autenticato e (se specificato) ha il ruolo corretto, mostra il contenuto
  return children;
};

export default ProtectedRoute;