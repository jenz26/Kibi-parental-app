import ProfileFormStepper from '../components/ProfileFormStepper';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="page-title mb-2">Il Tuo Profilo Kibi</h1>
        <p className="text-center text-neutral-default dark:text-gray-400 mb-8">
          Mantieni aggiornate le tue informazioni per ricevere i contenuti più adatti a te e al tuo percorso da genitore.
        </p>

        <ProfileFormStepper />

      </motion.div>
    </div>
  );
};

export default ProfilePage;