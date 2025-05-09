// --- START OF FILE src/pages/DashboardPage.jsx ---
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparklesIcon, UserIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { fetchProfile } from '../features/profile/profileSlice';
import { fetchSuggestedArticles, clearSuggestedArticles } from '../features/blog/blogSlice';
import { pregnancyData } from '../data/pregnancyData.js';
import { childDevelopmentData } from '../data/childDevelopmentData.js';
import ProgressWidget from '../features/profile/components/ProgressWidget';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
// ArticleCard non serve più qui se usiamo link semplici per i suggeriti
// Se vuoi usare ArticleCard per i suggeriti, decommenta l'import e adatta il map sotto.

const getPregnancyWeek = (dueDate) => {
  if (!dueDate) return null;
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  const estimatedLMP = new Date(dueDateObj.getTime() - (280 * 24 * 60 * 60 * 1000));
  const diffDaysFromLMP = Math.floor((today - estimatedLMP) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.floor(diffDaysFromLMP / 7);
  return Math.min(Math.max(4, currentWeek + 1), 41);
};

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
  const { 
    suggestedArticles, 
    isLoadingSuggestions, 
    errorSuggestions 
  } = useSelector((state) => state.blog);

  useEffect(() => {
    if (user?.id && !profileData && !profileIsLoading && !profileError) {
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user, profileData, profileIsLoading, profileError]);

  let progressDataToDisplay = null; // Dichiarato prima per usarlo nell'effetto sotto
  if (profileData) {
    if (profileData.childBirthDate) {
      const months = getChildMonths(profileData.childBirthDate);
      if (months !== null) progressDataToDisplay = childDevelopmentData.find(d => d.month === months);
    } else if (profileData.dueDate) {
       const week = getPregnancyWeek(profileData.dueDate);
       if (week !== null) progressDataToDisplay = pregnancyData.find(d => d.week === week);
    }
  }
  
  useEffect(() => {
    if (profileData?.interests && profileData.interests.length > 0) {
      const slugToExclude = progressDataToDisplay?.articleSlug || null;
      dispatch(fetchSuggestedArticles({ interests: profileData.interests, limit: 3, excludeSlug: slugToExclude }));
    }
    return () => {
      dispatch(clearSuggestedArticles()); // Pulisce i suggerimenti quando si lascia la dashboard
    };
  }, [dispatch, profileData, progressDataToDisplay]); // Aggiunto progressDataToDisplay alle dipendenze

  // Calcolo di isPregnancy e currentWeekOrMonth spostato qui per coerenza con progressDataToDisplay
  let isPregnancy = false;
  let currentWeekOrMonth = null;
  if (profileData) {
    if (profileData.childBirthDate) {
      currentWeekOrMonth = getChildMonths(profileData.childBirthDate);
      isPregnancy = false;
    } else if (profileData.dueDate) {
       currentWeekOrMonth = getPregnancyWeek(profileData.dueDate);
       isPregnancy = true;
    }
  }

  const fallbackTitle = "Il Tuo Percorso";
  let fallbackDescription = "Caricamento informazioni...";
  if (!profileIsLoading && !profileError && profileData && !progressDataToDisplay) {
      fallbackDescription = "Sembra che manchino date nel tuo profilo o siano fuori dal range che copriamo. Aggiorna il profilo!";
  } else if (!profileIsLoading && !profileError && !profileData) {
      fallbackDescription = "Completa il tuo profilo per visualizzare informazioni personalizzate.";
  }

  const cardVariants = {
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
        <p className="text-center sm:text-left text-lg text-text-muted-light dark:text-text-muted-dark mb-8">
          La tua bacheca personalizzata con aggiornamenti e consigli utili.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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

        <motion.div
            className="p-6 bg-white dark:bg-neutral-dark rounded-lg shadow-xl flex flex-col"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
        >
          <div className="flex items-center mb-4"> {/* Aumentato mb */}
            <SparklesIcon className="w-7 h-7 mr-2 text-yellow-500" />
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">Articoli per Te</h2>
          </div>
          
          <div className="flex-grow space-y-2 overflow-y-auto custom-scrollbar pr-1"> {/* Wrapper per contenuto scrollabile */}
            {isLoadingSuggestions && (
              <div className="flex items-center justify-center h-full py-5">
                <LoadingSpinner size="md" />
              </div>
            )}
            {errorSuggestions && !isLoadingSuggestions && (
              <p className="text-sm text-red-500 dark:text-red-400 text-center py-5">
                Errore nel caricare i suggerimenti.
              </p>
            )}
            {!isLoadingSuggestions && !errorSuggestions && suggestedArticles.length === 0 && (
               <p className="text-sm text-text-muted-light dark:text-text-muted-dark text-center py-5">
                {profileData?.interests && profileData.interests.length > 0 
                  ? "Non abbiamo trovato articoli specifici per i tuoi interessi al momento."
                  : "Completa i tuoi interessi nel profilo per ricevere suggerimenti!"}
              </p>
            )}
            {!isLoadingSuggestions && !errorSuggestions && suggestedArticles.length > 0 && (
                suggestedArticles.map(article => (
                  <Link 
                    key={article.id} 
                    to={`/blog/${article.slug}`} 
                    className="block p-3 rounded-md hover:bg-neutral-light/60 dark:hover:bg-neutral-dark/60 transition-colors group border border-transparent hover:border-neutral-default/30 dark:hover:border-neutral-dark/70"
                  >
                    <h4 className="font-semibold text-sm text-primary dark:text-primary-light group-hover:underline truncate">{article.title}</h4>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark line-clamp-2">{article.summary}</p> {/* Usa line-clamp-2 o truncate */}
                  </Link>
                ))
            )}
          </div>
          
          <Button as={Link} to="/blog" variant="primary" className="mt-auto w-full shrink-0 pt-3"> {/* mt-auto per spingere in basso, pt-3 per staccare */}
            Esplora il Blog
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 p-6 bg-white dark:bg-neutral-dark rounded-lg shadow-xl" // Aumentato shadow
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
// --- END OF FILE src/pages/DashboardPage.jsx ---