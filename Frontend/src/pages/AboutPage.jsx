import { motion } from 'framer-motion';
import Button from '../components/common/Button'; // Importa Button
import { Link } from 'react-router-dom'; // Importa Link

const AboutPage = () => {
  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-dark p-6 md:p-8 rounded-lg shadow-lg"
      >
        <h1 className="page-title mb-6 !text-left">Chi Siamo</h1>

        <div className="space-y-6 text-neutral-dark dark:text-neutral-light text-base leading-relaxed">
            <p className="text-lg italic text-neutral-default dark:text-gray-300">Benvenuti nel cuore di Kibi! Siamo felici di condividere con voi la nostra visione e la passione che anima questo progetto.</p>

            <h2 className="text-2xl font-semibold text-primary dark:text-primary-light pt-4">La Nostra Missione: Essere al Vostro Fianco, Passo Dopo Passo</h2>
            <p>La genitorialità è un viaggio straordinario, ricco di emozioni, scoperte e, a volte, anche di piccole e grandi sfide. La missione di "Kibi – Primi passi da genitore!" è quella di offrire uno spazio digitale accogliente, informativo e rassicurante per tutti i neo-genitori e futuri genitori. Vogliamo fornirvi strumenti e conoscenze per affrontare con maggiore serenità e consapevolezza questa meravigliosa avventura, sentendovi meno soli e più preparati.</p>

            <h2 className="text-2xl font-semibold text-primary dark:text-primary-light pt-4">La Storia di Kibi (Fittizia)</h2>
            <p>Kibi nasce da un'idea semplice, ma profondamente sentita: il desiderio di creare un punto di riferimento amichevole e affidabile per chi si appresta a diventare genitore o lo è da poco. Immaginate un piccolo gruppo di amici – alcuni sviluppatori con la passione per le tecnologie utili, altri designer attenti all'esperienza utente, e soprattutto, alcuni neo-genitori che hanno vissuto sulla propria pelle la girandola di dubbi e domande dei primi tempi.</p>
            <p>Confrontandoci sulle nostre esperienze, abbiamo capito quanto sarebbe stato prezioso avere un "compagno digitale" capace di offrire risposte chiare, supporto empatico e informazioni verificate, il tutto in un linguaggio semplice e accessibile. Così, abbiamo deciso di unire le nostre competenze e la nostra passione per dare vita a Kibi, anche se per ora solo in questa veste dimostrativa per un progetto d'esame.</p>

            <h2 className="text-2xl font-semibold text-primary dark:text-primary-light pt-4">Il Team Kibi (Fittizio)</h2>
            <p>Dietro Kibi c'è il "Team Kibi", un gruppo eterogeneo (per ora concettuale) di persone che credono nel potere della condivisione e del supporto:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
                <li>**Sviluppatori & Designer:** Appassionati di tecnologia e design, impegnati a creare una piattaforma intuitiva, piacevole da navigare e tecnicamente solida (nei limiti di una demo!).</li>
                <li>**Genitori Esperti (Consulenti Immaginari):** Figure che, con la loro esperienza diretta, ispirano i contenuti e le funzionalità, assicurando che Kibi parli davvero il linguaggio dei genitori.</li>
                <li>**Esperti di Contenuti (Simulati):** Professionisti (immaginari) del settore materno-infantile che, in un progetto reale, contribuirebbero a garantire l'accuratezza e la rilevanza delle informazioni.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary dark:text-primary-light pt-4">I Nostri Valori Fondamentali</h2>
            <p>Tre semplici parole guidano ogni aspetto di Kibi:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
                <li>**Empatia:** Comprendiamo le vostre emozioni, i vostri dubbi e le vostre gioie. Vogliamo che vi sentiate capiti e supportati.</li>
                <li>**Affidabilità (nel Contesto Demo):** Ci impegniamo a fornire informazioni accurate e ben ricercate (simulate in questa demo), pur ricordandovi sempre l'importanza del consulto medico professionale.</li>
                <li>**Semplicità:** La vita con un neonato è già abbastanza complicata! Kibi è pensato per essere facile da usare, chiaro nei contenuti e diretto nelle risposte.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary dark:text-primary-light pt-4">Unisciti a Noi in Questo Viaggio (Dimostrativo)!</h2>
            <p>Kibi è più di un'applicazione: è un'idea di supporto, una mano tesa. Anche se questa è una versione demo, speriamo che possa trasmettervi il calore e l'intenzione che ci hanno mosso. Esplorate i contenuti, immaginate le potenzialità e sentitevi parte di una comunità che sta crescendo, anche solo virtualmente per ora.</p>
            <p className="mt-6 font-semibold">Grazie per aver scelto di conoscere meglio Kibi – Primi passi da genitore!</p>

             <div className="text-center mt-10 pt-6 border-t border-neutral-light dark:border-neutral-dark/50">
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