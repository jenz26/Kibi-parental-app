import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparklesIcon, UserIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { fetchProfile } from '../features/profile/profileSlice'; // Assicurati che questo path sia corretto

// Importa i dati di progresso
import { pregnancyData } from '../data/pregnancyData.js';
import { childDevelopmentData } from '../data/childDevelopmentData.js';

// Importa il nuovo ProgressWidget
import ProgressWidget from '../features/profile/components/ProgressWidget'; // Verifica questo path!

// Componenti comuni (se ancora necessari qui, altrimenti rimuovi)
import Button from '../components/common/Button'; // Potrebbe non essere più necessario direttamente qui

// Funzione helper per calcolare la settimana di gravidanza dalla DPP
const getPregnancyWeek = (dueDate) => {
  if (!dueDate) return null;
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  const estimatedLMP = new Date(dueDateObj.getTime() - (280 * 24 * 60 * 60 * 1000));
  const diffDaysFromLMP = Math.floor((today - estimatedLMP) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.floor(diffDaysFromLMP / 7);
  return Math.min(Math.max(4, currentWeek + 1), 41);
};

// Funzione helper per calcolare i mesi del bambino dalla data di nascita
const getChildMonths = (birthDate) => {
  if (!birthDate) return null;
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let months = (today.getFullYear() - birthDateObj.getFullYear()) * 12;
  months -= birthDateObj.getMonth();
  months += today.getMonth();
  if (today.getDate() < birthDateObj.getDate()) {
    months--;
  }
  return Math.min(Math.max(0, months), 12);
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profileData, isLoading: profileIsLoading, error: profileError } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user?.id && !profileData && !profileIsLoading && !profileError) {
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user, profileData, profileIsLoading, profileError]);

  // Trova i dati di progresso
  let progressDataToDisplay = null;
  let isPregnancy = false;
  let currentWeekOrMonth = null;

  if (profileData) {
    if (profileData.childBirthDate) {
      const months = getChildMonths(profileData.childBirthDate);
      if (months !== null) {
        currentWeekOrMonth = months;
        isPregnancy = false;
        progressDataToDisplay = childDevelopmentData.find(d => d.month === months);
      }
    } else if (profileData.dueDate) {
       const week = getPregnancyWeek(profileData.dueDate);
       if (week !== null) {
           currentWeekOrMonth = week;
           isPregnancy = true;
           progressDataToDisplay = pregnancyData.find(d => d.week === week);
       }
    }
  }

  // Definisci i messaggi di fallback per ProgressWidget
  const fallbackTitle = "Il Tuo Percorso";
  let fallbackDescription;

  if (!profileIsLoading && !profileError && profileData && !progressDataToDisplay) {
      fallbackDescription = "Sembra che manchino date nel tuo profilo o siano fuori dal range che copriamo (0-12 mesi bimbo, 4-41 settimane gravidanza). Aggiorna il profilo!";
  } else if (!profileIsLoading && !profileError && !profileData) {
      fallbackDescription = "Completa il tuo profilo per visualizzare informazioni personalizzate.";
  } else {
      // Per i casi di loading o error, ProgressWidget ha i suoi messaggi interni,
      // ma potremmo comunque passare una descrizione di base se necessario.
      // In questo caso, li lasciamo gestire dal widget.
      fallbackDescription = "Caricamento o errore gestito nel widget.";
  }


  const cardVariants = { // Questo è ancora usato per le altre card
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title text-center sm:text-left">Bentornato/a, {user?.name || 'Genitore'}!</h1>
        <p className="text-center sm:text-left text-lg text-neutral-default dark:text-gray-400 mb-8">
          La tua bacheca personalizzata con aggiornamenti e consigli utili.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget Progresso Utilizza il nuovo componente */}
        <ProgressWidget
            profileIsLoading={profileIsLoading}
            profileError={profileError}
            profileData={profileData}
            progressData={progressDataToDisplay}
            isPregnancy={isPregnancy}
            currentWeekOrMonth={currentWeekOrMonth}
            fallbackTitle={fallbackTitle}
            fallbackDescription={fallbackDescription}
        />

        {/* Card Articoli Suggeriti (come prima) */}
        <motion.div
            className="p-6 bg-white dark:bg-neutral-dark rounded-lg shadow-lg"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
        >
          <div className="flex items-center mb-3">
            <SparklesIcon className="w-7 h-7 mr-2 text-yellow-500" />
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Articoli per Te</h2>
          </div>
          <p className="text-neutral-default dark:text-gray-400 mb-4">
            Basandoci sui tuoi interessi, ecco alcuni articoli che potrebbero piacerti.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-primary dark:hover:text-primary-light transition-colors"><Link to="/blog/il-sonno-del-neonato-guida-completa">Il sonno del neonato</Link></li>
            <li className="hover:text-primary dark:hover:text-primary-light transition-colors"><Link to="/blog/svezzamento-quando-e-come-iniziare">Guida allo svezzamento</Link></li>
            <li className="hover:text-primary dark:hover:text-primary-light transition-colors"><Link to="/blog/primi-giochi-stimolare-sviluppo">Giochi e sviluppo</Link></li>
          </ul>
          <Button as={Link} to="/blog" variant="primary" className="mt-6 w-full">
            Esplora il Blog
          </Button>
        </motion.div>
      </div>

      {/* Accesso Rapido (come prima) */}
      <motion.div
        className="mt-10 p-6 bg-white dark:bg-neutral-dark rounded-lg shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center mb-3">
          <UserIcon className="w-7 h-7 mr-2 text-primary dark:text-primary-light" />
          <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Accesso Rapido</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button as={Link} to="/profile" variant="outline" fullWidth>Il Mio Profilo</Button>
            {user?.role === 'admin' && (
                <Button as={Link} to="/admin" variant="secondary" fullWidth>Pannello Admin</Button>
            )}
            <Button as={Link} to="/blog" variant="outline" fullWidth>Leggi gli Articoli</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;