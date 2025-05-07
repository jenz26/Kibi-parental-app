import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { clearError } from '../authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import KibiLogo from '../../../assets/images/kibi-logo.png';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Pulisci gli errori quando il componente si monta o la vista cambia
    dispatch(clearError());
  }, [dispatch, isLoginView]);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLoginView ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', duration: 0.5 } },
    exit: { opacity: 0, x: isLoginView ? 100 : -100, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-light dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-white dark:bg-neutral-dark shadow-xl rounded-lg"
      >
        <div>
          <img className="mx-auto h-16 w-auto" src={KibiLogo} alt="Kibi Logo" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-dark dark:text-neutral-light">
            {isLoginView ? 'Accedi al tuo account' : 'Crea un nuovo account'}
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-default dark:text-gray-400">
            {isLoginView ? 'Oppure ' : 'Hai già un account? '}
            <button
              onClick={toggleView}
              className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary focus:outline-none"
            >
              {isLoginView ? 'crea un account gratuito' : 'accedi qui'}
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
            >
                {isLoginView ? <LoginForm /> : <RegisterForm />}
            </motion.div>
        </AnimatePresence>

        {error && (
          <p className="mt-4 text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
        )}

      </motion.div>
    </div>
  );
};

export default AuthPage;