// --- START OF FILE src/pages/NotFoundPage.jsx ---
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="main-container flex flex-col items-center justify-center text-center px-4 py-12 min-h-[calc(100vh-16rem)]"> {/* 16rem ~ 256px per header+footer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }} // Ajustata stiffness
      >
        <ExclamationTriangleIcon className="h-20 w-20 sm:h-24 sm:w-24 text-secondary dark:text-secondary-light mx-auto mb-6" />
        <h1 className="text-5xl sm:text-6xl font-bold text-neutral-dark dark:text-neutral-light mb-3 sm:mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-dark dark:text-neutral-light mb-6">Pagina Non Trovata</h2>
        <p className="text-base sm:text-lg text-text-muted-light dark:text-text-muted-dark mb-10 max-w-md mx-auto">
          Oops! Sembra che la pagina che stai cercando non esista più o sia stata spostata.
        </p>
        <Button as={Link} to="/" variant="primary" size="lg">
          Torna alla Homepage
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
// --- END OF FILE src/pages/NotFoundPage.jsx ---