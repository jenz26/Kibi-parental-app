import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm'; // Assicurati che questi path siano corretti
import RegisterForm from '../components/RegisterForm'; // Assicurati che questi path siano corretti
import { clearError } from '../authSlice'; // Assicurati che authSlice e clearError esistano e siano corretti
import { motion, AnimatePresence } from 'framer-motion';
// KibiLogo non è più necessario qui, perché AuthLayout lo mostra già

// Riceve 'login' o 'register' dal router per impostare la vista iniziale
const AuthPage = ({ initialView = 'login' }) => { 
  const [isLoginView, setIsLoginView] = useState(initialView === 'login');
  const dispatch = useDispatch();
  // Leggiamo l'errore e isLoading dallo stato Redux di auth
  const { error, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Pulisce l'errore quando la vista (login/register) cambia o il componente si monta
    // Così l'errore del login non persiste se passo a registrazione, e viceversa.
    dispatch(clearError());
  }, [dispatch, isLoginView]);

  // Funzione per cambiare tra vista Login e Registrazione
  const toggleView = (e) => {
    e.preventDefault(); // Previene submit accidentali se il bottone è in un form
    setIsLoginView(!isLoginView);
  };

  // Varianti per l'animazione slide e fade dei form
  const formVariants = {
    hidden: (isLogin) => ({ 
      opacity: 0, 
      x: isLogin ? -50 : 50, // Entra da sinistra per Login, da destra per Register
      transition: { duration: 0.2 } 
    }),
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { type: 'spring', duration: 0.4, bounce: 0.3 } 
    },
    exit: (isLogin) => ({ 
      opacity: 0, 
      x: isLogin ? 50 : -50, // Esce a destra per Login, a sinistra per Register
      transition: { duration: 0.2 } 
    })
  };

  return (
    // Questa è la "card" bianca che viene centrata da AuthLayout.jsx
    <div className="w-full space-y-5 p-6 sm:p-8 bg-white dark:bg-neutral-dark shadow-xl rounded-lg">
      {/* Sezione Titolo e Link Toggle */}
      <div>
        <h2 className="mt-1 text-center text-2xl sm:text-3xl font-bold tracking-tight text-neutral-dark dark:text-neutral-light">
          {isLoginView ? 'Accedi al tuo account' : 'Crea un nuovo account'}
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-default dark:text-gray-400">
          {isLoginView ? 'Non hai un account? ' : 'Hai già un account? '}
          <button
            onClick={toggleView}
            type="button"
            className="font-medium text-primary hover:underline dark:text-primary-light focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            aria-live="polite" // Annuncia il cambio ai lettori schermo
          >
            {isLoginView ? 'Creane uno gratuitamente' : 'Accedi qui'}
          </button>
        </p>
      </div>

      {/* Sezione per mostrare l'Errore (se presente) */}
      <div className="h-10"> {/* Spazio riservato per il messaggio di errore per evitare salti di layout */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="auth-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-100 border border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300 px-3 py-2 rounded-md text-sm text-center"
              role="alert"
            >
              {typeof error === 'string' ? error : 'Si è verificato un errore.'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contenitore per i Form con animazione */}
      <div className="relative overflow-hidden min-h-[280px] sm:min-h-[300px]"> {/* Altezza minima per contenere i form */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
              // La chiave cambia per far scattare l'animazione exit/enter
              key={isLoginView ? 'loginForm' : 'registerForm'} 
              custom={isLoginView} // Passa lo stato corrente alle varianti
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full" // Rimosso absolute per un layout più semplice
          >
              {isLoginView ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback di caricamento globale (mostrato sotto i form) */}
      {isLoading && (
        <p className="text-xs text-neutral-default dark:text-gray-400 text-center">
          Verifica in corso...
        </p>
      )}
    </div>
  );
};

export default AuthPage;