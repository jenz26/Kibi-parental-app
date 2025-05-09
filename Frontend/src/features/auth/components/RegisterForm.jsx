// --- START OF FILE src/features/auth/components/RegisterForm.jsx (Completo e Aggiornato) ---
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../../schemas/authSchemas'; // VERIFICA QUESTO PATH E NOME FILE
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../authSlice'; // VERIFICA QUESTO PATH
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/common/InputField'; // VERIFICA QUESTO PATH
import Button from '../../../components/common/Button'; // VERIFICA QUESTO PATH
import Modal from '../../../components/common/Modal'; // VERIFICA QUESTO PATH
import toast from 'react-hot-toast';

// Contenuti Legali
const termsContent = `
Termini di Servizio di Kibi
==============================
Ultimo aggiornamento: 7 maggio 2025 (Data Fittizia Demo)

Benvenuto/a su "Kibi – Primi passi da genitore!" (di seguito "Kibi" o il "Servizio"). Questi Termini di Servizio ("Termini") regolano l'utilizzo della nostra applicazione web demo. Ti preghiamo di leggerli attentamente.

1. Accettazione dei Termini
---------------------------
Utilizzando Kibi, accetti di essere vincolato/a da questi Termini. Se non sei d'accordo con una qualsiasi parte dei Termini, non sei autorizzato/a ad utilizzare il Servizio.

2. Descrizione del Servizio
---------------------------
Kibi è una piattaforma informativa ed educativa progettata per supportare i neo-genitori e i futuri genitori durante le prime fasi di questa straordinaria avventura. Offriamo articoli, guide e strumenti (in questa versione demo, principalmente contenuti testuali e una dashboard personalizzata) per aiutarti a navigare le sfide e le gioie della genitorialità.

Importante: Kibi NON sostituisce in alcun modo il parere medico professionale. Le informazioni fornite hanno scopo puramente educativo e informativo. Per qualsiasi dubbio o problema di salute riguardante te o il tuo bambino/a, consulta sempre un medico, un pediatra o un altro professionista sanitario qualificato.

3. Account Utente
-----------------
  • Per accedere ad alcune funzionalità di Kibi, potrebbe essere necessario creare un account.
  • Sei responsabile della veridicità e dell'accuratezza dei dati forniti durante la registrazione e l'aggiornamento del tuo profilo.
  • Sei responsabile della custodia della tua password e di tutte le attività che avvengono sotto il tuo account. Notificaci immediatamente qualsiasi uso non autorizzato del tuo account.
  • Data la natura demo dell'applicazione, ti consigliamo di utilizzare password uniche e non reali per questo servizio.

4. Uso Consentito del Servizio
------------------------------
Kibi è destinato ad un uso personale e non commerciale. Accetti di:
  • Non utilizzare il Servizio per scopi illegali o non autorizzati.
  • Non tentare di accedere in modo illecito ai sistemi di Kibi o di interferire con il suo funzionamento.
  • Rispettare gli altri utenti (qualora in futuro venissero implementate funzionalità di community).
  • Non riprodurre, duplicare, copiare, vendere, rivendere o sfruttare alcuna porzione del Servizio senza l'espresso consenso scritto da parte nostra (considerando che i contenuti testuali sono creati per questa demo).

5. Proprietà Intellettuale
--------------------------
Tutti i contenuti presenti su Kibi, inclusi testi, grafiche, loghi, icone, immagini (placeholder o create ad hoc per la demo), e il software stesso (per quanto riguarda il design e la struttura concettuale), sono di proprietà di "Kibi – Primi passi da genitore!" (in quanto progetto demo) o dei suoi creatori e sono protetti dalle leggi sul diritto d'autore e sulla proprietà intellettuale. Il logo "Kibi" e il nome sono marchi identificativi del progetto.

6. Limitazioni di Responsabilità
--------------------------------
  • Kibi è fornito "così com'è" e "come disponibile". Essendo una versione demo, non offriamo garanzie assolute sull'accuratezza, completezza o tempestività delle informazioni presentate. I contenuti sono creati a scopo illustrativo.
  • Non saremo responsabili per qualsiasi decisione presa basandosi esclusivamente sulle informazioni trovate su Kibi. Ribadiamo che Kibi non fornisce consulenza medica né si sostituisce al parere di un professionista sanitario.
  • Non garantiamo che il Servizio sarà ininterrotto, privo di errori o sicuro, data la sua natura di progetto dimostrativo con un backend mock.

7. Modifiche al Servizio e ai Termini
-------------------------------------
Ci riserviamo il diritto di modificare o interrompere, temporaneamente o permanentemente, il Servizio (o qualsiasi sua parte) con o senza preavviso, data la sua natura di progetto in evoluzione e dimostrativo.
Potremmo anche modificare questi Termini di volta in volta. La versione più recente sarà sempre disponibile su questa pagina. L'uso continuato del Servizio dopo tali modifiche costituirà la tua accettazione dei nuovi Termini.

8. Risoluzione
--------------
Ci riserviamo il diritto di sospendere o chiudere il tuo account e negare qualsiasi utilizzo attuale o futuro del Servizio per qualsiasi violazione di questi Termini, tenendo presente il contesto informale di una demo.

9. Legge Applicabile
--------------------
Questi Termini sono redatti in riferimento al contesto di un progetto dimostrativo. In un'applicazione reale, sarebbero regolati e interpretati in conformità con le leggi di una giurisdizione specifica (es. legge italiana). Per questa demo, considerali come linee guida per un uso corretto.

10. Contatti
------------
Per qualsiasi domanda relativa a questi Termini di Servizio, puoi contattarci all'indirizzo email fittizio: info@kibi.app-demo.it.

Grazie per utilizzare Kibi!
`;

const privacyContent = `
Informativa sulla Privacy di Kibi
==================================
Ultimo aggiornamento: 7 maggio 2025 (Data Fittizia Demo)

Benvenuto/a su Kibi – Primi passi da genitore! (di seguito "Kibi"). La tua privacy è importante per noi, soprattutto in un percorso delicato e personale come quello della genitorialità. Questa Privacy Policy spiega come Kibi, in quanto applicazione web dimostrativa, gestisce le tue informazioni.

1. Scopo di questa Policy
-------------------------
Questa policy ha lo scopo di informarti in modo trasparente su quali dati raccogliamo, come li utilizziamo e proteggiamo nell'ambito della versione demo di Kibi. Essendo un progetto dimostrativo (realizzato per un contesto d'esame/portfolio), la gestione dei dati è simulata.

2. Dati Raccolti
----------------
Per offrirti un'esperienza personalizzata, Kibi raccoglie alcune informazioni:
  • Dati di Registrazione: Al momento della creazione del tuo account, ti chiediamo di fornire il tuo Nome e la tua Email.
  • Dati del Profilo: Per personalizzare i contenuti, potresti fornirci: Nome del genitore e/o del bambino/a; Date importanti (es. data presunta del parto, data di nascita del bambino/a); I tuoi interessi specifici relativi alla genitorialità (es. alimentazione, sonno, sviluppo).
  • Dati Tecnici:
    • Backend Mock: In questa versione demo, tutti i dati forniti (registrazione e profilo) sono salvati su un backend simulato (db.json) gestito tramite json-server. Questo significa che i dati risiedono localmente nell'ambiente di sviluppo/test di questa demo.
    • LocalStorage: Utilizziamo il localStorage del tuo browser per conservare un token di autenticazione. Questo token è essenziale per permetterti di rimanere connesso/a all'applicazione e navigare tra le sezioni protette senza dover effettuare nuovamente il login ad ogni visita.

3. Come Utilizziamo i Dati
--------------------------
I dati raccolti vengono utilizzati esclusivamente per:
  • Login: Permetterti di accedere al tuo account Kibi.
  • Personalizzazione dei Contenuti: Mostrarti articoli del blog, suggerimenti e informazioni sulla Dashboard che siano il più possibile pertinenti ai tuoi interessi e alla fase della genitorialità che stai vivendo.
  • Comunicazioni Ipotetiche Future: In una versione non demo dell'applicazione, potremmo utilizzare la tua email per inviarti newsletter, aggiornamenti sull'app o informazioni rilevanti. In questa versione demo, tale funzionalità non è attiva.
Enfasi: I tuoi dati personali NON vengono venduti, ceduti o condivisi con terze parti. La loro gestione è limitata al funzionamento di questa applicazione demo.

4. Sicurezza dei Dati
---------------------
Comprendiamo l'importanza della sicurezza dei dati. Sebbene Kibi sia un'applicazione demo, abbiamo implementato misure concettuali di sicurezza:
  • Password Hashate (Concetto): In un'applicazione reale, le password verrebbero conservate in formato "hashato" (criptato) per impedirne la lettura diretta. Per questa demo, tale processo è simulato.
  • Accesso Protetto: L'accesso ai dati del profilo è possibile solo previa autenticazione.
Importante: Data la natura DEMO dell'applicazione, ti sconsigliamo vivamente di inserire dati personali reali estremamente sensibili. Utilizza Kibi con la consapevolezza che si tratta di un ambiente di test e portfolio.

5. I Tuoi Diritti
-----------------
Anche in questa versione demo, riconosciamo i tuoi diritti sui dati:
  • Accesso e Modifica: Puoi visualizzare e modificare i dati del tuo profilo (nome, nome bambino/a, date, interessi) direttamente dalla pagina Profilo all'interno dell'applicazione.
  • Cancellazione dell'Account: Se desideri cancellare il tuo account e i relativi dati da questa demo, puoi inviare una richiesta all'indirizzo email fittizio: privacy@kibi.app-demo.it. Trattandosi di una demo, la rimozione sarà effettuata manually dal gestore della demo.

6. Cookie e LocalStorage
------------------------
Come menzionato, Kibi utilizza localStorage per memorizzare il token di autenticazione. Questo è uno strumento tecnico essenziale per il funzionamento della sessione utente e non viene utilizzato per tracciare la tua attività al di fuori dell'applicazione. Non utilizziamo cookie di profilazione di terze parti.

7. Modifiche a questa Privacy Policy
------------------------------------
Potremmo aggiornare questa Privacy Policy di tanto in tanto. Qualsiasi modifica sarà pubblicata su questa pagina con l'indicazione della data di "Ultimo aggiornamento". Ti invitiamo a consultarla periodicamente.

8. Contatti
-----------
Per qualsiasi domanda o dubbio riguardo questa Privacy Policy o la gestione dei tuoi dati in Kibi (versione demo), puoi contattarci all'indirizzo email fittizio: privacy@kibi.app-demo.it.

Grazie per aver scelto Kibi!
`;


const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('Registrazione completata! Benvenuto/a!');
      navigate('/dashboard');
    } catch (err) {
      // Errore gestito da AuthPage
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="Nome Completo"
          name="name"
          register={register}
          error={errors.name}
          placeholder="Mario Rossi"
          autoComplete="name"
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="tuamail@esempio.com"
          autoComplete="email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="Min. 6 caratteri"
          autoComplete="new-password"
          isPassword={true}
          showPassword={isPasswordVisible}
          onTogglePasswordVisibility={togglePasswordVisibility}
        />
        <InputField
          label="Conferma Password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword}
          placeholder="Ripeti la password"
          autoComplete="new-password"
          isPassword={true}
          showPassword={isConfirmPasswordVisible}
          onTogglePasswordVisibility={toggleConfirmPasswordVisibility}
        />

        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="consent"
              aria-describedby="consent-description"
              type="checkbox"
              {...register("consent")}
              className={`h-4 w-4 rounded border-neutral-default/50 text-primary focus:ring-primary dark:bg-neutral-dark/30 dark:border-neutral-dark/70 ${errors.consent ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}`}
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="consent" className="font-medium text-neutral-dark dark:text-neutral-light">
              Consenso
            </label>
            <p id="consent-description" className="text-text-muted-light dark:text-text-muted-dark text-xs">
              Dichiaro di aver letto e accettato i{' '}
              <button
                type="button"
                className="font-medium text-primary dark:text-primary-light hover:underline focus:outline-none"
                onClick={() => setIsTermsModalOpen(true)}
              >
                Termini di Servizio
              </button>
              {' '}e la{' '}
              <button
                type="button"
                className="font-medium text-primary dark:text-primary-light hover:underline focus:outline-none"
                onClick={() => setIsPrivacyModalOpen(true)}
              >
                Privacy Policy
              </button>.
            </p>
            {errors.consent && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.consent.message}</p>}
          </div>
        </div>

        <div>
          <Button type="submit" variant="primary" fullWidth isLoading={isLoading} disabled={isLoading}>
            Registrati
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="Termini di Servizio"
      >
        <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto p-1">
          <div style={{ whiteSpace: 'pre-wrap' }} className="text-text-light dark:text-text-dark">
            {termsContent}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Informativa sulla Privacy"
      >
        <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto p-1">
           <div style={{ whiteSpace: 'pre-wrap' }} className="text-text-light dark:text-text-dark">
            {privacyContent}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
// --- END OF FILE src/features/auth/components/RegisterForm.jsx ---