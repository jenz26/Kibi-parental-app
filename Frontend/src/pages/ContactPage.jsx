import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-dark p-6 md:p-8 rounded-lg shadow-lg"
      >
        <h1 className="page-title mb-6 !text-left">Contatti</h1>

        <div className="space-y-4 text-neutral-dark dark:text-neutral-light text-base leading-relaxed">
          <p>Siamo felici di sentirti! Se hai domande (che non riguardino consulenze mediche), feedback su questa versione demo di Kibi, suggerimenti per futuri sviluppi o necessiti di supporto tecnico limitato al funzionamento di questa demo, non esitare a contattarci.</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Come Contattarci</h2>

          <div className="space-y-3">
              <p>
                  <strong className="text-primary dark:text-primary-light">Email:</strong><br />
                  Puoi scriverci all'indirizzo email fittizio: <a href="mailto:info@kibi.app-demo.it" className="text-secondary dark:text-secondary-light hover:underline">info@kibi.app-demo.it</a><br />
                  <span className="text-sm text-neutral-default dark:text-gray-400">Cercheremo di rispondere il prima possibile, tenendo presente che Kibi è un progetto dimostrativo gestito nel tempo libero. Apprezziamo la tua pazienza!</span>
              </p>

              <p>
                <strong className="text-primary dark:text-primary-light">Modulo di Contatto (Ipotetico):</strong><br />
                In una versione completa dell'applicazione, potresti trovare un comodo modulo di contatto direttamente qui, simile a questo:
                <div className="mt-2 p-4 border border-dashed border-neutral-default/50 dark:border-neutral-dark/70 rounded-md bg-neutral-light/30 dark:bg-neutral-dark/30 space-y-3 opacity-70">
                     <div>
                        <label className="block text-sm font-medium">Nome:</label>
                        <input type="text" disabled className="w-full p-2 border rounded bg-neutral-light dark:bg-neutral-dark/50 cursor-not-allowed" placeholder="Il tuo nome" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Email:</label>
                        <input type="email" disabled className="w-full p-2 border rounded bg-neutral-light dark:bg-neutral-dark/50 cursor-not-allowed" placeholder="La tua email" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Messaggio:</label>
                        <textarea rows="3" disabled className="w-full p-2 border rounded bg-neutral-light dark:bg-neutral-dark/50 cursor-not-allowed" placeholder="Il tuo messaggio"></textarea>
                    </div>
                     <button disabled className="px-4 py-2 bg-neutral text-white rounded cursor-not-allowed">Invia Messaggio (Disabilitato)</button>
                </div>
              </p>

               <p>
                <strong className="text-primary dark:text-primary-light">Link Social (Placeholder):</strong><br />
                In futuro, potresti trovarci anche sui social media! Per ora, immagina qui i link alle nostre ipotetiche pagine (questi link non portano da nessuna parte):<br />
                <a href="#" className="text-secondary dark:text-secondary-light hover:underline mr-4">Kibi su Facebook</a>
                <a href="#" className="text-secondary dark:text-secondary-light hover:underline">Kibi su Instagram</a>
               </p>
          </div>


          <div className="mt-8 pt-6 border-t border-neutral-light dark:border-neutral-dark/50">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Importante: Disclaimer Medico</h2>
            <p className="mt-2 text-red-700 dark:text-red-300">Ti ricordiamo che Kibi è una piattaforma informativa ed educativa. **NON forniamo consulenza medica.** Per qualsiasi emergenza, dubbio o necessità di carattere sanitario riguardante te o il tuo bambino/a, ti preghiamo di rivolgerti SEMPRE e IMMEDIATAMENTE al tuo medico, pediatra, ostetrica/o o a un altro professionista sanitario qualificato. Non utilizzare Kibi per richieste di soccorso o per diagnosi mediche.</p>
          </div>

           <p className="mt-8 font-semibold">Grazie per il tuo interesse verso "Kibi – Primi passi da genitore!". Il tuo contributo è prezioso per noi!</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;