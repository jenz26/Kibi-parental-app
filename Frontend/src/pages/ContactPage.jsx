// --- START OF FILE src/pages/ContactPage.jsx (Corretto) ---
import { motion } from 'framer-motion';

const ContactPage = () => {
  // Stili comuni per i titoli di sezione, per coerenza
  const sectionTitleClass = "text-2xl font-semibold text-primary dark:text-primary-light mt-8 mb-3";
  const paragraphClass = "text-text-light dark:text-text-dark leading-relaxed mb-4"; // mb-4 per default
  const sectionSubtitleClass = "font-semibold text-primary dark:text-primary-light block mb-1"; // Per sottotitoli/label forti

  return (
    <div className="main-container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-neutral-dark p-6 md:p-10 rounded-lg shadow-xl"
      >
        <h1 className="page-title mb-4 !text-left !text-3xl md:!text-4xl text-primary dark:text-primary-light">
          Contatti
        </h1>
        <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
          Siamo felici di sentirti! Se hai domande (che non riguardino consulenze mediche), feedback su questa versione demo di Kibi o suggerimenti, non esitare a contattarci.
        </p>

        <div className="space-y-6"> {/* Aumentato space-y per più respiro */}
          <h2 className={sectionTitleClass}>Come Contattarci</h2>

          <div className="space-y-5"> {/* Aumentato space-y interno */}
              <div> {/* Contenitore per Email */}
                <strong className={sectionSubtitleClass}>Email (per feedback sulla demo):</strong>
                <p className={paragraphClass}>
                    Puoi scriverci all'indirizzo fittizio: <a href="mailto:info@kibi.app-demo.it" className="text-secondary dark:text-secondary-light hover:underline">info@kibi.app-demo.it</a>.<br />
                    <span className="text-xs text-text-muted-light dark:text-text-muted-dark">Apprezziamo la tua pazienza nella risposta, essendo questo un progetto dimostrativo.</span>
                </p>
              </div>

              <div> {/* Contenitore per Modulo di Contatto */}
                <strong className={sectionSubtitleClass}>Modulo di Contatto (Simulato):</strong>
                <p className={`${paragraphClass} !mb-2`}> {/* Paragrafo introduttivo, ridotto mb */}
                  In una versione completa, potresti trovare un modulo simile a questo per inviarci un messaggio direttamente:
                </p>
                {/* Il div del modulo è ora FRATELLO del <p>, non figlio */}
                <div className="mt-3 p-4 border border-dashed border-neutral-default/50 dark:border-neutral-dark/70 rounded-md bg-neutral-light/30 dark:bg-neutral-dark/30 space-y-3 opacity-70">
                     <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark">Nome:</label>
                        <input type="text" disabled className="input-field w-full cursor-not-allowed !bg-neutral-light/50 dark:!bg-neutral-dark/50" placeholder="Il tuo nome" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark">Email:</label>
                        <input type="email" disabled className="input-field w-full cursor-not-allowed !bg-neutral-light/50 dark:!bg-neutral-dark/50" placeholder="La tua email" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark">Messaggio:</label>
                        <textarea rows="3" disabled className="input-field w-full cursor-not-allowed !bg-neutral-light/50 dark:!bg-neutral-dark/50" placeholder="Il tuo messaggio"></textarea>
                    </div>
                     <button disabled className="btn btn-disabled text-sm">Invia Messaggio (Funzione Disabilitata)</button>
                </div>
              </div>

               <div> {/* Contenitore per Link Social */}
                <strong className={sectionSubtitleClass}>Link Social (Placeholder):</strong>
                <p className={paragraphClass}>
                  In futuro, potresti trovarci anche sui social media! Per ora, immagina qui i link alle nostre ipotetiche pagine (questi link non portano da nessuna parte):<br />
                  <a href="#" className="text-secondary dark:text-secondary-light hover:underline mr-4">Kibi su Facebook</a>
                  <a href="#" className="text-secondary dark:text-secondary-light hover:underline">Kibi su Instagram</a>
                </p>
               </div>
          </div>


          <div className="!mt-10 pt-6 border-t border-neutral-light dark:border-neutral-dark/50"> {/* Aumentato !mt-10 */}
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Importante: Disclaimer Medico</h2>
            <p className={`${paragraphClass} mt-2 text-red-700 dark:text-red-300`}>
              Ti ricordiamo che Kibi è una piattaforma informativa ed educativa. <strong>NON forniamo consulenza medica.</strong> Per qualsiasi emergenza, dubbio o necessità di carattere sanitario riguardante te o il tuo bambino/a, ti preghiamo di rivolgerti SEMPRE e IMMEDIATAMENTE al tuo medico, pediatra, ostetrica/o o a un altro professionista sanitario qualificato.
            </p>
          </div>

           <p className={`${paragraphClass} !mt-10 font-semibold`}> {/* Aumentato !mt-10 */}
             Grazie per il tuo interesse verso "Kibi – Primi passi da genitore!"
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
// --- END OF FILE src/pages/ContactPage.jsx (Corretto) ---