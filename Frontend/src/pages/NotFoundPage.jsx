import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center text-center px-4 main-container">
      {/* 128px è un'altezza approssimativa per header+footer, da aggiustare se serve */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <ExclamationTriangleIcon className="h-24 w-24 text-secondary dark:text-secondary-light mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-neutral-dark dark:text-neutral-light mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-neutral-dark dark:text-neutral-light mb-6">Pagina Non Trovata</h2>
        <p className="text-lg text-neutral-default dark:text-gray-400 mb-10 max-w-md mx-auto">
          Oops! Sembra che la pagina che stai cercando non esista o sia stata spostata.
        </p>
        <Button as={Link} to="/" variant="primary" size="lg">
          Torna alla Homepage
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;