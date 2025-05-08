// src/features/auth/pages/AuthPage.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm'; // Assicurati che questi path siano corretti
import RegisterForm from '../components/RegisterForm'; // Assicurati che questi path siano corretti
import { clearError } from '../authSlice'; // Assicurati che authSlice e clearError esistano e siano corretti
import { motion, AnimatePresence } from 'framer-motion';
// KibiLogo non è più necessario qui, perché AuthLayout lo mostra già in una posizione più prominente.

const AuthPage = () => {
  // La prop 'mode' non è più necessaria se gestiamo il toggle internamente.
  // Ma se vuoi ancora che l'URL /login o /register imposti lo stato iniziale, puoi ripristinarla.
  // Per ora, assumiamo che parta sempre con Login.
  const [isLoginView, setIsLoginView] = useState(true);
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth); // Aggiunto isLoading per feedback

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, isLoginView]);

  const toggleView = (e) => {
    e.preventDefault(); // Previene il comportamento di default se il button fosse in un form
    setIsLoginView(!isLoginView);
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLoginView ? -50 : 50 }, // Ridotta la distanza per un'animazione più sottile
    visible: { opacity: 1, x: 0, transition: { type: 'spring', duration: 0.4, bounce: 0.3 } },
    exit: { opacity: 0, x: isLoginView ? 50 : -50, transition: { duration: 0.2 } }
  };

  return (
    // Questo div è la "card" che AuthLayout centrerà.
    // Rimuoviamo min-h-screen, flex, items-center, justify-center, bg-neutral-light, py-12, px-4 ecc.
    // perché AuthLayout se ne occupa.
    <div className="w-full space-y-6 p-6 sm:p-8 bg-white dark:bg-neutral-dark shadow-xl rounded-lg">
      <div>
        {/* Il logo principale è ora in AuthLayout. Possiamo omettere il logo qui
             o mettere una versione più piccola se lo desideri, ma potrebbe essere ridondante.
             Per ora lo ometto per pulizia. */}
        {/* <img className="mx-auto h-12 w-auto" src={KibiLogo} alt="Kibi Logo" /> */}
        <h2 className="mt-1 text-center text-2xl sm:text-3xl font-bold tracking-tight text-neutral-dark dark:text-neutral-light">
          {isLoginView ? 'Accedi al tuo account' : 'Crea un nuovo account'}
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-default dark:text-gray-400">
          {isLoginView ? 'Non hai un account? ' : 'Hai già un account? '}
          <button
            onClick={toggleView}
            type="button" // Importante per evitare submit se dentro un form per errore
            className="font-medium text-primary hover:underline dark:text-primary-light focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
          >
            {isLoginView ? 'Creane uno gratuitamente' : 'Accedi qui'}
          </button>
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
            key={isLoginView ? 'login' : 'register'}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden" // Aggiunto per contenere meglio le animazioni x
        >
            {isLoginView ? <LoginForm switchToRegister={toggleView} /> : <RegisterForm switchToLogin={toggleView} />}
            {/* Passiamo la funzione toggleView ai componenti form se vuoi che il link "Crea account/Accedi"
                all'interno dei form stessi usi la stessa logica di toggle di AuthPage.
                Altrimenti, se LoginForm/RegisterForm usano <Link to="/register"> o <Link to="/login">,
                allora la prop 'mode' inviata dal router a AuthPage diventerebbe di nuovo utile per
                impostare lo stato iniziale di isLoginView.
            */}
        </motion.div>
      </AnimatePresence>

      {/* Mostra un messaggio di errore globale per l'autenticazione, se presente */}
      {/* Potrebbe essere più utile mostrare gli errori specifici dei field direttamente nei form */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 text-xs text-red-500 dark:text-red-400 text-center"
          >
            {typeof error === 'string' ? error : 'Si è verificato un errore.'}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Feedback di caricamento, se lo gestisci qui */}
      {isLoading && (
        <p className="mt-3 text-xs text-neutral-default dark:text-gray-400 text-center">
          Verifica in corso...
        </p>
      )}
    </div>
  );
};

export default AuthPage;