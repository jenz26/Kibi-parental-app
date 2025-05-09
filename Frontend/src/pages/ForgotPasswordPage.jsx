// --- START OF FILE src/pages/ForgotPasswordPage.jsx ---
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button'; // Assicurati che il path sia corretto
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const ForgotPasswordPage = () => {
  // Simulazione di un invio (non invia realmente nulla)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('In una versione reale, un\'email di reset password sarebbe stata inviata.');
  };

  return (
    // AuthLayout gestirà lo sfondo e il centraggio generale
    // Questo componente è ciò che va dentro l'Outlet di AuthLayout
    <div className="w-full space-y-5 p-6 sm:p-8 bg-white dark:bg-neutral-dark shadow-xl rounded-lg">
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EnvelopeIcon className="mx-auto h-12 w-auto text-primary dark:text-primary-light" />
          <h2 className="mt-4 text-center text-2xl sm:text-3xl font-bold tracking-tight text-neutral-dark dark:text-neutral-light">
            Password Dimenticata?
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted-light dark:text-text-muted-dark">
            Nessun problema! Inserisci la tua email e ti invieremo le istruzioni per resettare la password.
          </p>
          <p className="mt-1 text-center text-xs text-yellow-600 dark:text-yellow-400">
            (Questa è una funzionalità dimostrativa)
          </p>
        </motion.div>
      </div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <label htmlFor="email-forgot" className="block text-sm font-medium leading-6 text-neutral-dark dark:text-neutral-light mb-1">
            Indirizzo Email
          </label>
          <input
            id="email-forgot"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="latuaemail@esempio.com"
            className="block w-full rounded-md border-0 py-2.5 px-3 shadow-sm ring-1 ring-inset ring-neutral-default/50 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-neutral-dark/30 dark:text-neutral-light dark:placeholder-neutral-default/70 dark:focus:ring-primary-light sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <Button type="submit" variant="primary" fullWidth>
            Invia Istruzioni
          </Button>
        </div>
      </motion.form>

      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="font-medium text-primary hover:underline dark:text-primary-light">
          Torna al Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
// --- END OF FILE src/pages/ForgotPasswordPage.jsx ---