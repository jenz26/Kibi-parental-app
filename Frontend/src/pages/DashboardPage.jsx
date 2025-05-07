import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, SparklesIcon, UserIcon, ArrowPathIcon } from '@heroicons/react/24/outline'; // Aggiunto ArrowPathIcon
import { useEffect } from 'react'; // Aggiunto useEffect
import { useDispatch } from 'react-redux'; // Aggiunto useDispatch
import { fetchProfile } from '../features/profile/profileSlice'; // Aggiunto fetchProfile

const DashboardPage = () => {
  const dispatch = useDispatch(); // Hook dispatch
  const { user } = useSelector((state) => state.auth);
  const { profileData, isLoading: profileIsLoading, error: profileError } = useSelector((state) => state.profile);

  // Carica il profilo se non è già presente
  useEffect(() => {
    if (user?.id && !profileData && !profileIsLoading && !profileError) {
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user, profileData, profileIsLoading, profileError]);


  let progressMessage = "Completa il tuo profilo per visualizzare informazioni personalizzate.";
  let childInfo = "";

  if (profileData) {
    if (profileData.childBirthDate) {
      const birthDate = new Date(profileData.childBirthDate);
      const today = new Date();
      const ageInMilliseconds = today.getTime() - birthDate.getTime(); // Usa getTime() per i timestamp
      const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
      const ageInMonths = Math.floor(ageInDays / 30.4375); // Media giorni in un mese
      const ageInYears = Math.floor(ageInMonths / 12);

      let ageString = "";
      if (ageInYears > 0) {
        ageString += `${ageInYears} ${ageInYears === 1 ? 'anno' : 'anni'}`;
        const remainingMonths = ageInMonths % 12;
        if (remainingMonths > 0) {
            ageString += ` e ${remainingMonths} ${remainingMonths === 1 ? 'mese' : 'mesi'}`;
        }
      } else if (ageInMonths > 0) {
        ageString = `${ageInMonths} ${ageInMonths === 1 ? 'mese' : 'mesi'}`;
      } else {
        ageString = `${ageInDays} ${ageInDays === 1 ? 'giorno' : 'giorni'}`;
      }


      childInfo = profileData.childName
        ? `Ciao ${profileData.childName}! (${ageString})`
        : `Il tuo bambino ha ${ageString}`;
      progressMessage = "Ecco alcuni aggiornamenti e consigli per questa fase:";
    } else if (profileData.dueDate) {
      const dueDate = new Date(profileData.dueDate);
      const today = new Date();
      today.setHours(0,0,0,0); // Normalizza 'today' per confronto date
      dueDate.setHours(0,0,0,0); // Normalizza 'dueDate'

      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round((dueDate - today) / oneDay);


      if (diffDays < 0) {
        progressMessage = "Congratulazioni per l'arrivo! Aggiorna il profilo con la data di nascita.";
        childInfo = "Benvenuto al mondo!";
      } else if (diffDays === 0) {
        progressMessage = "Oggi potrebbe essere il gran giorno! In bocca al lupo!";
        childInfo = "Quasi arrivato/a!";
      } else {
        const weeksRemaining = Math.floor(diffDays / 7);
        const daysInWeekRemaining = diffDays % 7;
        progressMessage = `Mancano circa ${weeksRemaining} settiman${weeksRemaining === 1 ? 'a' : 'e'}${daysInWeekRemaining > 0 ? ` e ${daysInWeekRemaining} giorn${daysInWeekRemaining === 1 ? 'o' : 'i'}` : ''} alla data presunta!`;
        childInfo = "Preparativi in corso...";
      }
    }
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
        <motion.div
            className="md:col-span-2 p-6 bg-gradient-to-br from-primary to-secondary dark:from-primary-dark dark:to-secondary-dark text-white rounded-lg shadow-xl flex flex-col justify-between min-h-[200px]"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
        >
          <div>
            <div className="flex items-center mb-3">
                <CalendarDaysIcon className="w-8 h-8 mr-3 shrink-0" />
                <h2 className="text-2xl font-semibold">{childInfo || "Il Tuo Percorso"}</h2>
            </div>
            <p className="text-lg mb-6">{progressMessage}</p>
            {profileIsLoading && <p className="text-sm opacity-80 flex items-center"><ArrowPathIcon className="w-4 h-4 mr-1 animate-spin" /> Caricamento info profilo...</p>}
            {profileError && <p className="text-sm bg-red-700/50 p-2 rounded">Errore caricamento profilo: {profileError}</p>}
          </div>
          <Button as={Link} to="/profile" variant="outline" className="mt-auto !text-white !border-white hover:!bg-white/20 self-start">
            {profileData ? 'Modifica Profilo' : 'Completa Profilo'}
          </Button>
        </motion.div>

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