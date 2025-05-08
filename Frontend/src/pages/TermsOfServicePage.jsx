import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importa Link

const TermsOfServicePage = () => {
  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-dark p-6 md:p-8 rounded-lg shadow-lg"
      >
        <h1 className="page-title mb-6 !text-left">Termini di Servizio</h1>
         <p className="text-sm text-neutral-default dark:text-gray-400 mb-6">
          Ultimo aggiornamento: 7 maggio 2025 (Data Fittizia Demo)
        </p>

        <div className="space-y-4 text-neutral-dark dark:text-neutral-light text-base leading-relaxed">
          <p>Benvenuto/a su "Kibi – Primi passi da genitore!" (di seguito "Kibi" o il "Servizio"). Questi Termini di Servizio ("Termini") regolano l'utilizzo della nostra applicazione web demo. Ti preghiamo di leggerli attentamente.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Accettazione dei Termini</h2>
          <p>Utilizzando Kibi, accetti di essere vincolato/a da questi Termini. Se non sei d'accordo con una qualsiasi parte dei Termini, non sei autorizzato/a ad utilizzare il Servizio.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. Descrizione del Servizio</h2>
          <p>Kibi è una piattaforma **informativa ed educativa** progettata per supportare i neo-genitori e i futuri genitori durante le prime fasi di questa straordinaria avventura. Offriamo articoli, guide e strumenti (in questa versione demo, principalmente contenuti testuali e una dashboard personalizzata) per aiutarti a navigare le sfide e le gioie della genitorialità.</p>
          <p className="font-semibold text-red-600 dark:text-red-400">Importante: Kibi NON sostituisce in alcun modo il parere medico professionale. Le informazioni fornite hanno scopo puramente educativo e informativo. Per qualsiasi dubbio o problema di salute riguardante te o il tuo bambino/a, consulta sempre un medico, un pediatra o un altro professionista sanitario qualificato.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Account Utente</h2>
           <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Per accedere ad alcune funzionalità di Kibi, potrebbe essere necessario creare un account.</li>
              <li>Sei responsabile della veridicità e dell'accuratezza dei dati forniti durante la registrazione e l'aggiornamento del tuo profilo.</li>
              <li>Sei responsabile della custodia della tua password e di tutte le attività che avvengono sotto il tuo account. Notificaci immediatamente qualsiasi uso non autorizzato del tuo account.</li>
              <li>Data la natura demo dell'applicazione, ti consigliamo di utilizzare password uniche e non reali per questo servizio.</li>
           </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Uso Consentito del Servizio</h2>
          <p>Kibi è destinato ad un uso personale e non commerciale. Accetti di:</p>
           <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Non utilizzare il Servizio per scopi illegali o non autorizzati.</li>
              <li>Non tentare di accedere in modo illecito ai sistemi di Kibi o di interferire con il suo funzionamento.</li>
              <li>Rispettare gli altri utenti (qualora in futuro venissero implementate funzionalità di community).</li>
              <li>Non riprodurre, duplicare, copiare, vendere, rivendere o sfruttare alcuna porzione del Servizio senza l'espresso consenso scritto da parte nostra (considerando che i contenuti testuali sono creati per questa demo).</li>
           </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Proprietà Intellettuale</h2>
          <p>Tutti i contenuti presenti su Kibi, inclusi testi, grafiche, loghi, icone, immagini (placeholder o create ad hoc per la demo), e il software stesso (per quanto riguarda il design e la struttura concettuale), sono di proprietà di "Kibi – Primi passi da genitore\!" (in quanto progetto demo) o dei suoi creatori e sono protetti dalle leggi sul diritto d'autore e sulla proprietà intellettuale. Il logo "Kibi" e il nome sono marchi identificativi del progetto.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitazioni di Responsabilità</h2>
           <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Kibi è fornito "così com'è" e "come disponibile". Essendo una versione demo, non offriamo garanzie assolute sull'accuratezza, completezza o tempestività delle informazioni presentate. I contenuti sono creati a scopo illustrativo.</li>
                <li>Non saremo responsabili per qualsiasi decisione presa basandosi esclusivamente sulle informazioni trovate su Kibi. Ribadiamo che **Kibi non fornisce consulenza medica né si sostituisce al parere di un professionista sanitario.**</li>
                <li>Non garantiamo che il Servizio sarà ininterrotto, privo di errori o sicuro, data la sua natura di progetto dimostrativo con un backend mock.</li>
           </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">7. Modifiche al Servizio e ai Termini</h2>
          <p>Ci riserviamo il diritto di modificare o interrompere, temporaneamente o permanentemente, il Servizio (o qualsiasi sua parte) con o senza preavviso, data la sua natura di progetto in evoluzione e dimostrativo.</p>
          <p>Potremmo anche modificare questi Termini di volta in volta. La versione più recente sarà sempre disponibile su questa pagina. L'uso continuato del Servizio dopo tali modifiche costituirà la tua accettazione dei nuovi Termini.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">8. Risoluzione</h2>
          <p>Ci riserviamo il diritto di sospendere o chiudere il tuo account e negare qualsiasi utilizzo attuale o futuro del Servizio per qualsiasi violazione di questi Termini, tenendo presente il contesto informale di una demo.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">9. Legge Applicabile</h2>
          <p>Questi Termini sono redatti in riferimento al contesto di un progetto dimostrativo. In un'applicazione reale, sarebbero regolati e interpretati in conformità con le leggi di una giurisdizione specifica (es. legge italiana). Per questa demo, considerali come linee guida per un uso corretto.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">10. Contatti</h2>
          <p>Per qualsiasi domanda relativa a questi Termini di Servizio, puoi contattarci all'indirizzo email fittizio: `info@kibi.app-demo.it`.</p>

          <p className="mt-6">Grazie per utilizzare Kibi!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfServicePage;