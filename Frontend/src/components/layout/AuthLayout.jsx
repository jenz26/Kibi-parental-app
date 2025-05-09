// --- START OF FILE src/components/layout/AuthLayout.jsx ---
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import KibiLogo from '../../assets/images/kibi-logo.webp'; // Assicurati che questo path sia corretto
import ScrollToTop from '../common/ScrollToTop'; // <<<<<<<<<< IMPORTA QUI

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background-light to-secondary/10 dark:from-primary-dark/10 dark:via-background-dark dark:to-secondary-dark/10 px-4 py-12 sm:px-6 lg:px-8">
      <ScrollToTop /> {/* <<<<<<<<<< AGGIUNGI QUI */}
      <div className="mb-8 text-center">
        <Link to="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background-dark rounded-md">
          <img src={KibiLogo} alt="Kibi Logo" className="h-12 w-auto mx-auto" />
          <h1 className="text-3xl font-bold text-primary dark:text-primary-light mt-3">
            {import.meta.env.VITE_APP_NAME || "Kibi"}
          </h1>
        </Link>
      </div>
      <div className="w-full max-w-md">
        {/* L'Outlet renderizzerà AuthPage, che a sua volta renderizzerà LoginForm o RegisterForm */}
        <Outlet />
      </div>
      {/* Potresti voler aggiungere un piccolo footer qui se lo desideri, 
          altrimenti la pagina Login/Register sarà molto minimale */}
      <p className="mt-10 text-center text-xs text-neutral-default dark:text-gray-400">
        © {new Date().getFullYear()} Kibi. Tutti i diritti riservati.
      </p>
    </div>
  );
};

export default AuthLayout;
// --- END OF FILE src/components/layout/AuthLayout.jsx ---