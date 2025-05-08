import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importa Link

const PrivacyPolicyPage = () => {
  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-dark p-6 md:p-8 rounded-lg shadow-lg"
      >
        <h1 className="page-title mb-6 !text-left">Privacy Policy</h1>
        <p className="text-sm text-neutral-default dark:text-gray-400 mb-6">
          Ultimo aggiornamento: 7 maggio 2025 (Data Fittizia Demo)
        </p>

        <div className="space-y-4 text-neutral-dark dark:text-neutral-light text-base leading-relaxed">
          <p>Benvenuto/a su Kibi – Primi passi da genitore! (di seguito "Kibi"). La tua privacy è importante per noi, soprattutto in un percorso delicato e personale come quello della genitorialità. Questa Privacy Policy spiega come Kibi, in quanto applicazione web dimostrativa, gestisce le tue informazioni.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Scopo di questa Policy</h2>
          <p>Questa policy ha lo scopo di informarti in modo trasparente su quali dati raccogliamo, come li utilizziamo e proteggiamo nell'ambito della versione demo di Kibi. Essendo un progetto dimostrativo (realizzato per un contesto d'esame/portfolio), la gestione dei dati è simulata.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. Dati Raccolti</h2>
          <p>Per offrirti un'esperienza personalizzata, Kibi raccoglie alcune informazioni:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>**Dati di Registrazione:** Al momento della creazione del tuo account, ti chiediamo di fornire il tuo **Nome** e la tua **Email**.</li>
            <li>**Dati del Profilo:** Per personalizzare i contenuti, potresti fornirci: Nome del genitore e/o del bambino/a; Date importanti (es. data presunta del parto, data di nascita del bambino/a); I tuoi interessi specifici relativi alla genitorialità (es. alimentazione, sonno, sviluppo).</li>
            <li>**Dati Tecnici:**
                <ul className="list-disc list-inside space-y-1 ml-6 mt-1">
                    <li>**Backend Mock:** In questa versione demo, tutti i dati forniti (registrazione e profilo) sono salvati su un backend simulato (`db.json`) gestito tramite `json-server`. Questo significa che i dati risiedono localmente nell'ambiente di sviluppo/test di questa demo.</li>
                    <li>**LocalStorage:** Utilizziamo il `localStorage` del tuo browser per conservare un token di autenticazione. Questo token è essenziale per permetterti di rimanere connesso/a all'applicazione e navigare tra le sezioni protette senza dover effettuare nuovamente il login ad ogni visita.</li>
                </ul>
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Come Utilizziamo i Dati</h2>
          <p>I dati raccolti vengono utilizzati esclusivamente per:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>**Login:** Permetterti di accedere al tuo account Kibi.</li>
            <li>**Personalizzazione dei Contenuti:** Mostrarti articoli del blog, suggerimenti e informazioni sulla Dashboard che siano il più possibile pertinenti ai tuoi interessi e alla fase della genitorialità che stai vivendo.</li>
            <li>**Comunicazioni Ipotetiche Future:** In una versione non demo dell'applicazione, potremmo utilizzare la tua email per inviarti newsletter, aggiornamenti sull'app o informazioni rilevanti. In questa versione demo, tale funzionalità non è attiva.</li>
          </ul>
          <p className="font-semibold mt-2">Enfasi: I tuoi dati personali NON vengono venduti, ceduti o condivisi con terze parti. La loro gestione è limitata al funzionamento di questa applicazione demo.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Sicurezza dei Dati</h2>
          <p>Comprendiamo l'importanza della sicurezza dei dati. Sebbene Kibi sia un'applicazione demo, abbiamo implementato misure concettuali di sicurezza:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
             <li>**Password Hashate (Concetto):** In un'applicazione reale, le password verrebbero conservate in formato "hashato" (criptato) per impedirne la lettura diretta. Per questa demo, tale processo è simulato.</li>
             <li>**Accesso Protetto:** L'accesso ai dati del profilo è possibile solo previa autenticazione.</li>
          </ul>
          <p className="mt-2 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200">**Importante:** Data la natura DEMO dell'applicazione, ti sconsigliamo vivamente di inserire dati personali reali estremamente sensibili. Utilizza Kibi con la consapevolezza che si tratta di un ambiente di test e portfolio.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. I Tuoi Diritti</h2>
          <p>Anche in questa versione demo, riconosciamo i tuoi diritti sui dati:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>**Accesso e Modifica:** Puoi visualizzare e modificare i dati del tuo profilo (nome, nome bambino/a, date, interessi) direttamente dalla pagina <Link to="/profile" className="text-primary dark:text-primary-light hover:underline">Profilo</Link> all'interno dell'applicazione.</li>
            <li>**Cancellazione dell'Account:** Se desideri cancellare il tuo account e i relativi dati da questa demo, puoi inviare una richiesta all'indirizzo email fittizio: `privacy@kibi.app-demo.it`. Trattandosi di una demo, la rimozione sarà effettuata manually dal gestore della demo.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookie e LocalStorage</h2>
          <p>Come menzionato, Kibi utilizza `localStorage` per memorizzare il token di autenticazione. Questo è uno strumento tecnico essenziale per il funzionamento della sessione utente e non viene utilizzato per tracciare la tua attività al di fuori dell'applicazione. Non utilizziamo cookie di profilazione di terze parti.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">7. Modifiche a questa Privacy Policy</h2>
          <p>Potremmo aggiornare questa Privacy Policy di tanto in tanto. Qualsiasi modifica sarà pubblicata su questa pagina con l'indicazione della data di "Ultimo aggiornamento". Ti invitiamo a consultarla periodicamente.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">8. Contatti</h2>
          <p>Per qualsiasi domanda o dubbio riguardo questa Privacy Policy o la gestione dei tuoi dati in Kibi (versione demo), puoi contattarci all'indirizzo email fittizio: `privacy@kibi.app-demo.it`.</p>

          <p className="mt-6">Grazie per aver scelto Kibi!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;