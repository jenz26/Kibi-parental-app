// --- START OF FILE src/pages/AboutPage.jsx ---
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-dark p-6 md:p-10 rounded-lg shadow-xl" // Aumentato padding e shadow
      >
        <h1 className="page-title mb-4 !text-left">Chi Siamo</h1>
        <p className="text-lg italic text-text-muted-light dark:text-text-muted-dark mb-8">
          Benvenuti nel cuore di Kibi! Siamo felici di condividere con voi la nostra visione e la passione che anima questo progetto dimostrativo.
        </p>

        {/* Applicare classi prose al div genitore dei contenuti testuali */}
        <div className="prose prose-base dark:prose-invert max-w-none space-y-6 text-neutral-dark dark:text-neutral-light leading-relaxed">
          <h2 className="text-2xl font-semibold text-primary dark:text-primary-light !mt-0">La Nostra Missione: Essere al Vostro Fianco, Passo Dopo Passo</h2>
          <p>La genitorialità è un viaggio straordinario, ricco di emozioni, scoperte e, a volte, anche di piccole e grandi sfide. La missione di "Kibi – Primi passi da genitore!" è quella di offrire uno spazio digitale accogliente, informativo e rassicurante per tutti i neo-genitori e futuri genitori. L'obiettivo di questo progetto è fornire strumenti e conoscenze per affrontare con maggiore serenità e consapevolezza questa meravigliosa avventura, sentendovi meno soli e più preparati.</p>

          <h2 className="text-2xl font-semibold text-primary dark:text-primary-light">La Storia di Kibi (Concept per un Progetto d'Esame)</h2>
          <p>Kibi nasce da un'idea semplice, ma profondamente sentita: il desiderio di creare un punto di riferimento amichevole e affidabile per chi si appresta a diventare genitore o lo è da poco. Questo progetto è stato sviluppato come dimostrazione per un esame, immaginando un team composto da sviluppatori, designer e neo-genitori.</p>
          <p>Confrontandoci su esperienze (reali o simulate), abbiamo compreso quanto sarebbe prezioso avere un "compagno digitale" capace di offrire risposte chiare e supporto empatico. Così, abbiamo unito competenze e passione per dare vita a Kibi, in questa sua forma dimostrativa.</p>

          <h2 className="text-2xl font-semibold text-primary dark:text-primary-light">Il Team Kibi (Fittizio)</h2>
          <p>Dietro Kibi c'è il "Team Kibi", un gruppo eterogeneo (per ora concettuale, per le finalità di questo progetto) di figure che credono nel potere della condivisione e del supporto:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
              <li>**Sviluppatori & Designer:** Appassionati di tecnologia e design, impegnati a creare una piattaforma intuitiva e tecnicamente solida, nei limiti di una demo.</li>
              <li>**Genitori Esperti (Consulenti Immaginari):** Figure che, con la loro esperienza, ispirano i contenuti, assicurando che Kibi parli il linguaggio dei genitori.</li>
              <li>**Esperti di Contenuti (Simulati):** Professionisti (immaginari) del settore che, in un progetto reale, garantirebbero l'accuratezza delle informazioni.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary dark:text-primary-light">I Nostri Valori Fondamentali</h2>
          <p>Tre semplici parole guidano ogni aspetto di Kibi:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
              <li>**Empatia:** Comprendere le emozioni, i dubbi e le gioie dei genitori.</li>
              <li>**Affidabilità (Contesto Demo):** Impegno a fornire informazioni accurate (simulate in questa demo), ricordando l'importanza del consulto medico.</li>
              <li>**Semplicità:** Kibi è pensato per essere facile da usare, chiaro nei contenuti e diretto.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary dark:text-primary-light">Unisciti a Noi in Questo Viaggio (Dimostrativo)!</h2>
          <p>Kibi è più di un'applicazione: è un'idea di supporto. Anche se questa è una versione demo, speriamo possa trasmettere l'intenzione che ci ha mosso. Esplora i contenuti e immagina le potenzialità.</p>
          <p className="mt-6 font-semibold">Grazie per aver scelto di conoscere meglio "Kibi – Primi passi da genitore!"</p>

           <div className="text-center mt-10 pt-6 border-t border-neutral-light dark:border-neutral-dark/50 !no-underline"> {/* !no-underline per prose */}
               <Button as={Link} to="/register" variant="primary" size="lg">
                  Crea un account gratuito
               </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
// --- END OF FILE src/pages/AboutPage.jsx ---