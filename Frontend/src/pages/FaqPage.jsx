import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importa Link

const FaqItem = ({ question, answer }) => (
  <div className="py-4 border-b border-neutral-light dark:border-neutral-dark/50 last:border-b-0">
    <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light mb-2">{question}</h3>
    <div className="text-neutral-default dark:text-gray-300 space-y-2">{answer}</div>
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
        <h1 className="page-title mb-8">FAQ (Domande Frequenti)</h1>

        <div className="bg-white dark:bg-neutral-dark p-6 md:p-8 rounded-lg shadow-lg">
          <p className="mb-6 text-neutral-default dark:text-gray-300">Benvenuto/a nella sezione FAQ di Kibi! Qui trovi le risposte alle domande più comuni sulla nostra applicazione demo.</p>

          <FaqItem
            question="Cos'è esattamente Kibi – Primi passi da genitore!?"
            answer={<p>Kibi è un'applicazione web dimostrativa progettata per offrire supporto informativo ed educativo ai neo-genitori e ai futuri genitori. Il nostro obiettivo è fornire contenuti chiari, rassicuranti e utili per accompagnarti nelle prime fasi della genitorialità, attraverso articoli e una dashboard personalizzabile. Ricorda, è un progetto portfolio, quindi molte funzionalità sono simulate.</p>}
          />
          <FaqItem
            question="Kibi è un servizio a pagamento?"
            answer={<p>No, Kibi è completamente gratuito. Essendo un'applicazione demo sviluppata per un contesto d'esame/portfolio, non ci sono costi associati al suo utilizzo.</p>}
          />
           <FaqItem
            question="Come vengono utilizzati i miei dati personali? È sicuro inserirli?"
            answer={<p>La tua privacy è importante. Raccogliamo solo i dati necessari per la registrazione (nome, email) e per personalizzare la tua esperienza (nome bambino/a, date importanti, interessi). In questa versione demo, i dati sono salvati su un backend simulato (`db.json`) e usiamo il `localStorage` per l'autenticazione. **Non vendiamo né condividiamo i tuoi dati con terzi.** Per maggiori dettagli, consulta la nostra <Link to="/privacy" className="text-primary dark:text-primary-light hover:underline">Privacy Policy</Link>. Data la natura demo, ti consigliamo di non inserire dati reali estremamente sensibili.</p>}
          />
           <FaqItem
            question="Quanto sono affidabili le informazioni presenti su Kibi? Posso considerarle un parere medico?"
            answer={<p>Le informazioni su Kibi hanno uno **scopo puramente educativo e informativo**. Sono create per essere di supporto, ma **NON sostituiscono in alcun modo il parere di un medico, pediatra o altro professionista sanitario qualificato.** Per qualsiasi questione di salute, rivolgiti sempre a un esperto.</p>}
          />
           <FaqItem
            question="Come posso modificare le informazioni del mio profilo?"
            answer={<p>Puoi easily aggiornare i tuoi dati (come nome, nome del bambino/a, date importanti e interessi) accedendo alla pagina <Link to="/profile" className="text-primary dark:text-primary-light hover:underline">Profilo</Link> una volta effettuato il login.</p>}
          />
          <FaqItem
            question="Come funziona la personalizzazione dei contenuti?"
            answer={<p>La personalizzazione si basa sulle informazioni che fornisci nel tuo profilo, come la data presunta del parto o la data di nascita di tuo figlio/a, e gli interessi che selezioni (es. sonno, alimentazione, sviluppo). In base a questi dati, la Dashboard e la sezione Blog cercheranno di proporti gli articoli e i consigli più pertinenti per la tua specifica situazione. Questa funzionalità è simulata nella demo per illustrarne il potenziale.</p>}
          />
          <FaqItem
            question="Ho dimenticato la mia password. Come posso resettarla?"
            answer={<p>Attualmente, Kibi è un'applicazione demo e **la funzionalità di reset automatico della password non è implementata.** Essendo un progetto con backend simulato, la gestione delle password è semplificata. In un'applicazione reale, questa sarebbe una funzionalità prioritaria.</p>}
          />
          <FaqItem
            question="Posso suggerire argomenti o funzionalità per Kibi?"
            answer={<p>Assolutamente sì! Anche se Kibi è una demo, il feedback è prezioso. Puoi inviare i tuoi suggerimenti o idee tramite la nostra pagina <Link to="/contact" className="text-primary dark:text-primary-light hover:underline">Contatti</Link> o all'indirizzo `info@kibi.app-demo.it`.</p>}
          />
          <FaqItem
            question="È prevista una community o un forum per confrontarsi con altri genitori?"
            answer={<p>L'idea di una community è molto interessante e sarebbe una bellissima aggiunta per una versione futura e completa di Kibi. Per questa versione demo, tale funzionalità non è disponibile, ma è sicuramente qualcosa che considereremmo per uno sviluppo futuro.</p>}
          />
          <FaqItem
            question="Come posso cancellare il mio account?"
            answer={<p>Se desideri cancellare il tuo account e i dati associati da questa demo, puoi inviare una richiesta all'indirizzo email fittizio `privacy@kibi.app-demo.it`, come indicato nella nostra <Link to="/privacy" className="text-primary dark:text-primary-light hover:underline">Privacy Policy</Link>.</p>}
          />
          <FaqItem
            question="Esiste un'app mobile di Kibi per smartphone o tablet?"
            answer={<p>Al momento, Kibi è disponibile solo come applicazione web, accessibile tramite browser. Non esiste un'app mobile dedicata per iOS o Android, ma il sito è progettato per essere responsivo e quindi utilizzabile anche da dispositivi mobili.</p>}
          />

          <p className="mt-6 text-neutral-default dark:text-gray-300">Se hai altre domande, non esitare a <Link to="/contact" className="text-primary dark:text-primary-light hover:underline">contattarci</Link>!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FaqPage;