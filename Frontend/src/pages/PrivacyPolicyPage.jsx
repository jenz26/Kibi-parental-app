// --- START OF FILE src/pages/PrivacyPolicyPage.jsx ---
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importa Link per i link interni

const PrivacyPolicyPage = () => {
  // Stili comuni per i titoli di sezione, per coerenza
  const sectionTitleClass = "text-2xl font-semibold text-primary dark:text-primary-light mt-8 mb-3"; // Aumentato a 2xl e aggiunto più margine
  const paragraphClass = "text-text-light dark:text-text-dark leading-relaxed mb-4"; // Colore di testo base e interlinea
  const listClass = "list-disc list-inside space-y-2 ml-4 text-text-light dark:text-text-dark"; // Stile per le liste
  const importantTextClass = "font-semibold text-red-600 dark:text-red-400"; // Per testo importante/disclaimer

  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-dark p-6 md:p-10 rounded-lg shadow-xl"
      >
        <h1 className="page-title mb-4 !text-left !text-3xl md:!text-4xl text-primary dark:text-primary-light"> {/* Stile titolo pagina */}
          Informativa sulla Privacy
        </h1>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-8">
          Ultimo aggiornamento: 7 maggio 2025 (Data Fittizia Demo)
        </p>

        <div className="space-y-4"> {/* Rimosso prose, text-neutral-dark, ecc. dal div principale */}
          <p className={paragraphClass}>Benvenuto/a su Kibi – Primi passi da genitore! (di seguito "Kibi"). La tua privacy è importante per noi, soprattutto in un percorso delicato e personale come quello della genitorialità. Questa Privacy Policy spiega come Kibi, in quanto applicazione web dimostrativa, gestisce le tue informazioni.</p>

          <h2 className={sectionTitleClass}>1. Scopo di questa Policy</h2>
          <p className={paragraphClass}>Questa policy ha lo scopo di informarti in modo trasparente su quali dati raccogliamo, come li utilizziamo e proteggiamo nell'ambito della versione demo di Kibi. Essendo un progetto dimostrativo (realizzato per un contesto d'esame/portfolio), la gestione dei dati è simulata.</p>

          <h2 className={sectionTitleClass}>2. Dati Raccolti</h2>
          <p className={paragraphClass}>Per offrirti un'esperienza personalizzata, Kibi raccoglie alcune informazioni:</p>
          <ul className={listClass}>
            <li><strong>Dati di Registrazione:</strong> Al momento della creazione del tuo account, ti chiediamo di fornire il tuo <strong>Nome</strong> e la tua <strong>Email</strong>.</li>
            <li><strong>Dati del Profilo:</strong> Per personalizzare i contenuti, potresti fornirci: Nome del genitore e/o del bambino/a; Date importanti (es. data presunta del parto, data di nascita del bambino/a); I tuoi interessi specifici relativi alla genitorialità (es. alimentazione, sonno, sviluppo).</li>
            <li><strong>Dati Tecnici:</strong>
                <ul className={`${listClass} !ml-8 mt-2`}> {/* Lista annidata con più indentazione */}
                    <li><strong>Backend Mock:</strong> In questa versione demo, tutti i dati forniti (registrazione e profilo) sono salvati su un backend simulato (\`db.json\`) gestito tramite \`json-server\`. Questo significa che i dati risiedono localmente nell'ambiente di sviluppo/test di questa demo.</li>
                    <li><strong>LocalStorage:</strong> Utilizziamo il \`localStorage\` del tuo browser per conservare un token di autenticazione. Questo token è essenziale per permetterti di rimanere connesso/a all'applicazione e navigare tra le sezioni protette senza dover effettuare nuovamente il login ad ogni visita.</li>
                </ul>
            </li>
          </ul>

          <h2 className={sectionTitleClass}>3. Come Utilizziamo i Dati</h2>
          <p className={paragraphClass}>I dati raccolti vengono utilizzati esclusivamente per:</p>
          <ul className={listClass}>
            <li><strong>Login:</strong> Permetterti di accedere al tuo account Kibi.</li>
            <li><strong>Personalizzazione dei Contenuti:</strong> Mostrarti articoli del blog, suggerimenti e informazioni sulla Dashboard che siano il più possibile pertinenti ai tuoi interessi e alla fase della genitorialità che stai vivendo.</li>
            <li><strong>Comunicazioni Ipotetiche Future:</strong> In una versione non demo dell'applicazione, potremmo utilizzare la tua email per inviarti newsletter, aggiornamenti sull'app o informazioni rilevanti. In questa versione demo, tale funzionalità non è attiva.</li>
          </ul>
          <p className={`${paragraphClass} font-semibold`}>Enfasi: I tuoi dati personali NON vengono venduti, ceduti o condivisi con terze parti. La loro gestione è limitata al funzionamento di questa applicazione demo.</p>

          <h2 className={sectionTitleClass}>4. Sicurezza dei Dati</h2>
          <p className={paragraphClass}>Comprendiamo l'importanza della sicurezza dei dati. Sebbene Kibi sia un'applicazione demo, abbiamo implementato misure concettuali di sicurezza:</p>
          <ul className={listClass}>
             <li><strong>Password Hashate (Concetto):</strong> In un'applicazione reale, le password verrebbero conservate in formato "hashato" (criptato) per impedirne la lettura diretta. Per questa demo, tale processo è simulato.</li>
             <li><strong>Accesso Protetto:</strong> L'accesso ai dati del profilo è possibile solo previa autenticazione.</li>
          </ul>
          <p className={`${paragraphClass} mt-3 p-4 bg-yellow-100 dark:bg-yellow-800/30 border border-yellow-400 dark:border-yellow-600 rounded-md text-yellow-700 dark:text-yellow-200`}> {/* Stile per il box di avviso */}
            <strong>Importante:</strong> Data la natura DEMO dell'applicazione, ti sconsigliamo vivamente di inserire dati personali reali estremamente sensibili. Utilizza Kibi con la consapevolezza che si tratta di un ambiente di test e portfolio.
          </p>

          <h2 className={sectionTitleClass}>5. I Tuoi Diritti</h2>
          <p className={paragraphClass}>Anche in questa versione demo, riconosciamo i tuoi diritti sui dati:</p>
          <ul className={listClass}>
            <li><strong>Accesso e Modifica:</strong> Puoi visualizzare e modificare i dati del tuo profilo (nome, nome bambino/a, date, interessi) direttamente dalla pagina <Link to="/profile" className="text-primary dark:text-primary-light hover:underline font-medium">Profilo</Link> all'interno dell'applicazione.</li>
            <li><strong>Cancellazione dell'Account:</strong> Se desideri cancellare il tuo account e i relativi dati da questa demo, puoi inviare una richiesta all'indirizzo email fittizio: <code className="text-sm bg-neutral-light dark:bg-neutral-dark/50 px-1 py-0.5 rounded">privacy@kibi.app-demo.it</code>. Trattandosi di una demo, la rimozione sarà effettuata manualmente dal gestore della demo.</li>
          </ul>

          <h2 className={sectionTitleClass}>6. Cookie e LocalStorage</h2>
          <p className={paragraphClass}>Come menzionato, Kibi utilizza \`localStorage\` per memorizzare il token di autenticazione. Questo è uno strumento tecnico essenziale per il funzionamento della sessione utente e non viene utilizzato per tracciare la tua attività al di fuori dell'applicazione. Non utilizziamo cookie di profilazione di terze parti.</p>

          <h2 className={sectionTitleClass}>7. Modifiche a questa Privacy Policy</h2>
          <p className={paragraphClass}>Potremmo aggiornare questa Privacy Policy di tanto in tanto. Qualsiasi modifica sarà pubblicata su questa pagina con l'indicazione della data di "Ultimo aggiornamento". Ti invitiamo a consultarla periodicamente.</p>

          <h2 className={sectionTitleClass}>8. Contatti</h2>
          <p className={paragraphClass}>Per qualsiasi domanda o dubbio riguardo questa Privacy Policy o la gestione dei tuoi dati in Kibi (versione demo), puoi contattarci all'indirizzo email fittizio: <code className="text-sm bg-neutral-light dark:bg-neutral-dark/50 px-1 py-0.5 rounded">privacy@kibi.app-demo.it</code>.</p>

          <p className={`${paragraphClass} mt-8`}>Grazie per aver scelto Kibi!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
// --- END OF FILE src/pages/PrivacyPolicyPage.jsx ---