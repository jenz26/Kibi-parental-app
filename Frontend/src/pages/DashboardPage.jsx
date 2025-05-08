import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, SparklesIcon, UserIcon, ArrowPathIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // Aggiunto InformationCircleIcon
import { useEffect } from 'react';
import { fetchProfile } from '../features/profile/profileSlice';

// Importa i dati di progresso
import { pregnancyData } from '../data/pregnancyData.js';
import { childDevelopmentData } from '../data/childDevelopmentData.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx'; // Importa LoadingSpinner

// Funzione helper per calcolare la settimana di gravidanza dalla DPP
const getPregnancyWeek = (dueDate) => {
  if (!dueDate) return null;
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  // La gravidanza dura circa 40 settimane (280 giorni)
  // Calcoliamo la data di inizio presunta (LMP) sottraendo 280 giorni dalla DPP
  const estimatedLMP = new Date(dueDateObj.getTime() - (280 * 24 * 60 * 60 * 1000));
  // Calcoliamo i giorni passati dalla LMP
  const diffDaysFromLMP = Math.floor((today - estimatedLMP) / (24 * 60 * 60 * 1000));
  // Calcoliamo la settimana (1 settimana = 7 giorni, la prima settimana è la 0)
  const currentWeek = Math.floor(diffDaysFromLMP / 7);
  // Kibi conta dalla settimana 1, quindi aggiungiamo 1 (e limitiamo a 41)
  // Partiamo dalla settimana 4 nei dati, quindi il minimo è 4
  return Math.min(Math.max(4, currentWeek + 1), 41); // Limita tra 4 e 41
};

// Funzione helper per calcolare i mesi del bambino dalla data di nascita
const getChildMonths = (birthDate) => {
  if (!birthDate) return null;
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let months = (today.getFullYear() - birthDateObj.getFullYear()) * 12;
  months -= birthDateObj.getMonth();
  months += today.getMonth();
  // Se il giorno corrente è prima del giorno di nascita nel mese corrente, togli un mese
  if (today.getDate() < birthDateObj.getDate()) {
    months--;
  }
  // Limitiamo a 12 mesi per i nostri dati (0-12)
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
  let progressData = null;
  let isPregnancy = false;
  let currentWeekOrMonth = null;

  if (profileData) {
    if (profileData.childBirthDate) {
      const months = getChildMonths(profileData.childBirthDate);
      if (months !== null) {
        currentWeekOrMonth = months;
        isPregnancy = false;
        progressData = childDevelopmentData.find(d => d.month === months);
      }
    } else if (profileData.dueDate) {
       const week = getPregnancyWeek(profileData.dueDate);
       if (week !== null) {
           currentWeekOrMonth = week;
           isPregnancy = true;
           progressData = pregnancyData.find(d => d.week === week);
       }
    }
  }

  // Messaggi di fallback
  let progressTitle = "Il Tuo Percorso";
  let progressDescription = "Completa il tuo profilo per visualizzare informazioni personalizzate.";
  if (profileIsLoading) {
      progressDescription = "Caricamento profilo...";
  } else if (profileError){
      progressDescription = "Errore nel caricamento del profilo.";
  } else if (profileData && !progressData) {
      progressDescription = "Sembra che manchino date nel tuo profilo o siano fuori dal range che copriamo (0-12 mesi bimbo, 4-41 settimane gravidanza). Aggiorna il profilo!"
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
        <p className="text-center sm:text-left text-lg text-neutral-default dark:text-gray-400 mb-8">
          La tua bacheca personalizzata con aggiornamenti e consigli utili.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Widget Progresso */}
        <motion.div
            className="md:col-span-2 p-6 bg-gradient-to-br from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark text-white rounded-lg shadow-xl flex flex-col justify-between min-h-[300px]" // Aumentata altezza min
            variants={cardVariants}
            initial="hidden"
            animate="visible"
        >
          {profileIsLoading ? (
             <div className="flex flex-col items-center justify-center h-full">
                <LoadingSpinner color="white" size="md" />
                <p className="mt-2 text-sm opacity-80">{progressDescription}</p>
             </div>
          ) : profileError ? (
             <div className="flex flex-col items-center justify-center h-full text-center">
                 <InformationCircleIcon className="w-10 h-10 text-yellow-300 mb-2"/>
                 <p className="font-semibold">Errore Profilo</p>
                 <p className="text-sm opacity-90 mb-4">{progressError}</p>
                 <Button as={Link} to="/profile" variant="outline" size="sm" className="!text-white !border-white hover:!bg-white/20 self-center">
                    Vai al Profilo
                </Button>
             </div>
          ) : progressData ? (
            // Visualizzazione dati progresso
            <div className="flex flex-col h-full">
              <div className="flex items-start mb-3 space-x-3">
                  <CalendarDaysIcon className="w-7 h-7 mt-1 shrink-0" />
                  <div>
                      <h2 className="text-2xl font-semibold">
                          {isPregnancy
                              ? `Settimana ${currentWeekOrMonth} (${progressData.trimester}° Trimestre)`
                              : `${progressData.ageText} (${profileData.childName ? profileData.childName : 'il tuo bimbo'})`
                          }
                      </h2>
                       {isPregnancy && (
                          <p className="text-lg opacity-90 mt-1">{progressData.sizeComparisonText}</p>
                       )}
                  </div>
              </div>

              {/* Tabs per separare le informazioni? O lista? Per ora lista. */}
              <div className="space-y-3 text-sm overflow-y-auto pr-2 flex-grow"> {/* Aggiunto overflow */}
                  {isPregnancy ? (
                      <>
                          <div>
                              <h3 className="font-semibold opacity-80 mb-1">Sviluppo del bambino:</h3>
                              <ul className="list-disc list-inside space-y-0.5 pl-2">
                                  {progressData.fetusDev?.map((item, index) => <li key={`fetus-${index}`}>{item}</li>)}
                              </ul>
                          </div>
                           <div>
                              <h3 className="font-semibold opacity-80 mb-1">Cambiamenti per te:</h3>
                              <ul className="list-disc list-inside space-y-0.5 pl-2">
                                  {progressData.momChanges?.map((item, index) => <li key={`mom-${index}`}>{item}</li>)}
                              </ul>
                          </div>
                           <div>
                              <h3 className="font-semibold opacity-80 mb-1">Cose da fare/Ricorda:</h3>
                              <ul className="list-disc list-inside space-y-0.5 pl-2">
                                  {progressData.todos?.map((item, index) => <li key={`todo-${index}`}>{item}</li>)}
                              </ul>
                          </div>
                      </>
                  ) : (
                       <>
                           {/* Sviluppo Bambino */}
                          <div>
                              <h3 className="font-semibold opacity-80 mb-1">Tappe dello Sviluppo:</h3>
                              <ul className="list-disc list-inside space-y-0.5 pl-2">
                                  {progressData.motor?.map((item, index) => <li key={`motor-${index}`}>Motorio: {item}</li>)}
                                  {progressData.cognitive?.map((item, index) => <li key={`cog-${index}`}>Cognitivo/Linguistico: {item}</li>)}
                                  {progressData.social?.map((item, index) => <li key={`soc-${index}`}>Sociale/Emotivo: {item}</li>)}
                              </ul>
                          </div>
                          <div>
                              <h3 className="font-semibold opacity-80 mb-1">Consigli per te:</h3>
                              <ul className="list-disc list-inside space-y-0.5 pl-2">
                                  {progressData.tips?.map((item, index) => <li key={`tip-${index}`}>{item}</li>)}
                              </ul>
                          </div>
                          {progressData.alerts && progressData.alerts.length > 0 && (
                              <div>
                                  <h3 className="font-semibold text-yellow-300 mb-1">Da osservare:</h3>
                                  <ul className="list-disc list-inside space-y-0.5 pl-2 text-yellow-100/90">
                                      {progressData.alerts?.map((item, index) => <li key={`alert-${index}`}>{item}</li>)}
                                  </ul>
                              </div>
                          )}
                       </>
                  )}
              </div>
              {/* Link a articolo (se definito nel data) */}
               {(progressData.articleSlug) && (
                  <div className="mt-4 pt-3 border-t border-white/30">
                      <Link to={`/blog/${progressData.articleSlug}`} className="text-sm font-medium hover:underline opacity-90">
                          Leggi l'articolo correlato →
                      </Link>
                  </div>
               )}

            </div> // Fine blocco visualizzazione dati

          ) : (
             // Messaggio di fallback se profilo caricato ma dati non trovati/applicabili
             <div className="flex flex-col items-center justify-center h-full text-center">
                 <InformationCircleIcon className="w-10 h-10 text-yellow-300 mb-2"/>
                 <p className="font-semibold">{progressTitle}</p>
                 <p className="text-sm opacity-90 mb-4">{progressDescription}</p>
                 <Button as={Link} to="/profile" variant="outline" size="sm" className="!text-white !border-white hover:!bg-white/20 self-center">
                    Vai al Profilo
                </Button>
             </div>
          )}

          {/* Bottone Profilo sempre visibile in fondo, tranne se errore grave */}
           {!profileError && !profileIsLoading && (
                 <Button as={Link} to="/profile" variant="outline" size="sm" className="!text-white !border-white hover:!bg-white/20 self-start mt-4 shrink-0">
                    {profileData ? 'Modifica Profilo' : 'Completa Profilo'}
                </Button>
           )}

        </motion.div> {/* Fine Widget Progresso */}

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
          {/* Placeholder - La logica di selezione andrebbe implementata */}
          <ul className="space-y-2 text-sm">
             {/* Qui potremmo filtrare blog.articles in base a profileData.interests */}
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