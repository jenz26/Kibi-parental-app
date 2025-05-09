// --- START OF FILE src/pages/FaqPage.jsx ---
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FaqItem = ({ question, answer }) => (
  <div className="py-5 border-b border-neutral-light dark:border-neutral-dark/50 last:border-b-0">
    {/* Titoli delle FAQ non dovrebbero essere affetti da 'prose' se h3 è fuori dal div con 'prose' */}
    <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light mb-2">{question}</h3>
    {/* Applicare prose qui se answer contiene HTML complesso, altrimenti stilizzare manualmente */}
    <div className="prose prose-sm dark:prose-invert max-w-none text-text-muted-light dark:text-text-muted-dark space-y-2">{answer}</div>
  </div>
);

const FaqPage = () => {
  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="page-title mb-6">FAQ (Domande Frequenti)</h1>
        <p className="text-center text-text-muted-light dark:text-text-muted-dark mb-8 max-w-2xl mx-auto">
          Trova risposte rapide alle domande più comuni su Kibi e sul suo funzionamento come progetto dimostrativo.
        </p>

        <div className="bg-white dark:bg-neutral-dark p-6 md:p-8 rounded-lg shadow-xl">
          <FaqItem
            question="Cos'è esattamente Kibi – Primi passi da genitore!?"
            answer={<p>Kibi è un'applicazione web dimostrativa sviluppata come progetto d'esame, progettata per offrire supporto informativo ed educativo ai neo-genitori e ai futuri genitori. L'obiettivo è fornire contenuti chiari e utili attraverso articoli e una dashboard personalizzabile.</p>}
          />
          <FaqItem
            question="Kibi è un servizio a pagamento?"
            answer={<p>No, Kibi è completamente gratuito. Essendo un'applicazione demo, non ci sono costi associati al suo utilizzo.</p>}
          />
           <FaqItem
            question="Come vengono utilizzati i miei dati personali?"
            answer={<p>Raccogliamo solo i dati per la registrazione (nome, email) e per personalizzare la tua esperienza (dati del profilo). In questa demo, i dati sono su un backend simulato (`db.json`) e usiamo il `localStorage` per l'autenticazione. Non vendiamo né condividiamo dati. Consulta la nostra <Link to="/privacy" className="text-primary dark:text-primary-light hover:underline">Privacy Policy</Link>. Consigliamo di non inserire dati reali sensibili.</p>}
          />
           <FaqItem
            question="Le informazioni su Kibi possono sostituire un parere medico?"
            answer={<p>Assolutamente no. Le informazioni su Kibi hanno scopo puramente educativo. **NON sostituiscono il parere di un medico o altro professionista sanitario qualificato.** Per questioni di salute, rivolgiti sempre a un esperto.</p>}
          />
           <FaqItem
            question="Come posso modificare le informazioni del mio profilo?"
            answer={<p>Puoi aggiornare i tuoi dati (nome, date, interessi) accedendo alla pagina <Link to="/profile" className="text-primary dark:text-primary-light hover:underline">Profilo</Link> dopo il login.</p>}
          />
          <FaqItem
            question="Come funziona la personalizzazione dei contenuti?"
            answer={<p>La personalizzazione si basa sui dati del tuo profilo. In base a questi, la Dashboard e il Blog cercano di proporti contenuti pertinenti. Questa funzionalità è simulata nella demo.</p>}
          />
          <FaqItem
            question="Ho dimenticato la password. Come posso resettarla?"
            answer={<p>Attualmente, essendo una demo, la funzionalità di reset password non è implementata. In un'applicazione reale, sarebbe prioritaria.</p>}
          />
          <FaqItem
            question="Posso suggerire argomenti o funzionalità per Kibi?"
            answer={<p>Certamente! Il feedback è prezioso. Puoi inviare suggerimenti tramite la pagina <Link to="/contact" className="text-primary dark:text-primary-light hover:underline">Contatti</Link>.</p>}
          />
          <FaqItem
            question="È prevista una community o un forum?"
            answer={<p>Una community sarebbe una bella aggiunta per una versione futura completa. Per questa demo, non è disponibile.</p>}
          />
          <FaqItem
            question="Come posso cancellare il mio account?"
            answer={<p>Puoi richiedere la cancellazione del tuo account (per questa demo) inviando un'email a `privacy@kibi.app-demo.it`, come indicato nella <Link to="/privacy" className="text-primary dark:text-primary-light hover:underline">Privacy Policy</Link>.</p>}
          />
          <FaqItem
            question="Esiste un'app mobile di Kibi?"
            answer={<p>Al momento, Kibi è un'applicazione web accessibile da browser. È progettata per essere responsiva, ma non esiste un'app mobile dedicata.</p>}
          />

          <p className="mt-8 text-center text-text-muted-light dark:text-text-muted-dark">
            Non hai trovato la risposta che cercavi? <Link to="/contact" className="text-primary dark:text-primary-light hover:underline">Contattaci direttamente!</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FaqPage;
// --- END OF FILE src/pages/FaqPage.jsx ---