// --- START OF FILE src/pages/TermsOfServicePage.jsx ---
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom'; // Importa Link solo se hai link interni nel testo

const TermsOfServicePage = () => {
  // Stili comuni per i titoli di sezione, per coerenza (copiati da PrivacyPolicyPage)
  const sectionTitleClass = "text-2xl font-semibold text-primary dark:text-primary-light mt-8 mb-3";
  const paragraphClass = "text-text-light dark:text-text-dark leading-relaxed mb-4";
  const listClass = "list-disc list-inside space-y-2 ml-4 text-text-light dark:text-text-dark";
  const importantDisclaimerClass = "font-semibold text-red-600 dark:text-red-400"; // Classe specifica per il disclaimer

  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-dark p-6 md:p-10 rounded-lg shadow-xl"
      >
        <h1 className="page-title mb-4 !text-left !text-3xl md:!text-4xl text-primary dark:text-primary-light">
          Termini di Servizio
        </h1>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-8">
          Ultimo aggiornamento: 7 maggio 2025 (Data Fittizia Demo)
        </p>

        <div className="space-y-4">
          <p className={paragraphClass}>Benvenuto/a su "Kibi – Primi passi da genitore!" (di seguito "Kibi" o il "Servizio"). Questi Termini di Servizio ("Termini") regolano l'utilizzo della nostra applicazione web demo. Ti preghiamo di leggerli attentamente.</p>

          <h2 className={sectionTitleClass}>1. Accettazione dei Termini</h2>
          <p className={paragraphClass}>Utilizzando Kibi, accetti di essere vincolato/a da questi Termini. Se non sei d'accordo con una qualsiasi parte dei Termini, non sei autorizzato/a ad utilizzare il Servizio.</p>

          <h2 className={sectionTitleClass}>2. Descrizione del Servizio</h2>
          <p className={paragraphClass}>Kibi è una piattaforma <strong>informativa ed educativa</strong> progettata per supportare i neo-genitori e i futuri genitori durante le prime fasi di questa straordinaria avventura. Offriamo articoli, guide e strumenti (in questa versione demo, principalmente contenuti testuali e una dashboard personalizzata) per aiutarti a navigare le sfide e le gioie della genitorialità.</p>
          <p className={paragraphClass}>
            <span className={importantDisclaimerClass}>Importante:</span> Kibi NON sostituisce in alcun modo il parere medico professionale. Le informazioni fornite hanno scopo puramente educativo e informativo. Per qualsiasi dubbio o problema di salute riguardante te o il tuo bambino/a, consulta sempre un medico, un pediatra o un altro professionista sanitario qualificato.
          </p>

          <h2 className={sectionTitleClass}>3. Account Utente</h2>
           <ul className={listClass}>
              <li>Per accedere ad alcune funzionalità di Kibi, potrebbe essere necessario creare un account.</li>
              <li>Sei responsabile della veridicità e dell'accuratezza dei dati forniti durante la registrazione e l'aggiornamento del tuo profilo.</li>
              <li>Sei responsabile della custodia della tua password e di tutte le attività che avvengono sotto il tuo account. Notificaci immediatamente qualsiasi uso non autorizzato del tuo account.</li>
              <li>Data la natura demo dell'applicazione, ti consigliamo di utilizzare password uniche e non reali per questo servizio.</li>
           </ul>

          <h2 className={sectionTitleClass}>4. Uso Consentito del Servizio</h2>
          <p className={paragraphClass}>Kibi è destinato ad un uso personale e non commerciale. Accetti di:</p>
           <ul className={listClass}>
              <li>Non utilizzare il Servizio per scopi illegali o non autorizzati.</li>
              <li>Non tentare di accedere in modo illecito ai sistemi di Kibi o di interferire con il suo funzionamento.</li>
              <li>Rispettare gli altri utenti (qualora in futuro venissero implementate funzionalità di community).</li>
              <li>Non riprodurre, duplicare, copiare, vendere, rivendere o sfruttare alcuna porzione del Servizio senza l'espresso consenso scritto da parte nostra (considerando che i contenuti testuali sono creati per questa demo).</li>
           </ul>

          <h2 className={sectionTitleClass}>5. Proprietà Intellettuale</h2>
          <p className={paragraphClass}>Tutti i contenuti presenti su Kibi, inclusi testi, grafiche, loghi, icone, immagini (placeholder o create ad hoc per la demo), e il software stesso (per quanto riguarda il design e la struttura concettuale), sono di proprietà di "Kibi – Primi passi da genitore!" (in quanto progetto demo) o dei suoi creatori e sono protetti dalle leggi sul diritto d'autore e sulla proprietà intellettuale. Il logo "Kibi" e il nome sono marchi identificativi del progetto.</p>

          <h2 className={sectionTitleClass}>6. Limitazioni di Responsabilità</h2>
           <ul className={listClass}>
                <li>Kibi è fornito "così com'è" e "come disponibile". Essendo una versione demo, non offriamo garanzie assolute sull'accuratezza, completezza o tempestività delle informazioni presentate. I contenuti sono creati a scopo illustrativo.</li>
                <li>Non saremo responsabili per qualsiasi decisione presa basandosi esclusivamente sulle informazioni trovate su Kibi. Ribadiamo che <strong>Kibi non fornisce consulenza medica né si sostituisce al parere di un professionista sanitario.</strong></li>
                <li>Non garantiamo che il Servizio sarà ininterrotto, privo di errori o sicuro, data la sua natura di progetto dimostrativo con un backend mock.</li>
           </ul>

          <h2 className={sectionTitleClass}>7. Modifiche al Servizio e ai Termini</h2>
          <p className={paragraphClass}>Ci riserviamo il diritto di modificare o interrompere, temporaneamente o permanentemente, il Servizio (o qualsiasi sua parte) con o senza preavviso, data la sua natura di progetto in evoluzione e dimostrativo.</p>
          <p className={paragraphClass}>Potremmo anche modificare questi Termini di volta in volta. La versione più recente sarà sempre disponibile su questa pagina. L'uso continuato del Servizio dopo tali modifiche costituirà la tua accettazione dei nuovi Termini.</p>

          <h2 className={sectionTitleClass}>8. Risoluzione</h2>
          <p className={paragraphClass}>Ci riserviamo il diritto di sospendere o chiudere il tuo account e negare qualsiasi utilizzo attuale o futuro del Servizio per qualsiasi violazione di questi Termini, tenendo presente il contesto informale di una demo.</p>

          <h2 className={sectionTitleClass}>9. Legge Applicabile</h2>
          <p className={paragraphClass}>Questi Termini sono redatti in riferimento al contesto di un progetto dimostrativo. In un'applicazione reale, sarebbero regolati e interpretati in conformità con le leggi di una giurisdizione specifica (es. legge italiana). Per questa demo, considerali come linee guida per un uso corretto.</p>

          <h2 className={sectionTitleClass}>10. Contatti</h2>
          <p className={paragraphClass}>Per qualsiasi domanda relativa a questi Termini di Servizio, puoi contattarci all'indirizzo email fittizio: <code className="text-sm bg-neutral-light dark:bg-neutral-dark/50 px-1 py-0.5 rounded">info@kibi.app-demo.it</code>.</p>

          <p className={`${paragraphClass} mt-8`}>Grazie per utilizzare Kibi!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfServicePage;
// --- END OF FILE src/pages/TermsOfServicePage.jsx ---