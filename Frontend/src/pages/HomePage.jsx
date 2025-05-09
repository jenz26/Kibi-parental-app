import React from 'react'; // <<<<<<<<<< AGGIUNGI QUESTA RIGA
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import HeroBg from '../assets/images/hero-bg.webp';
import { ArrowRightIcon, BookOpenIcon, LightBulbIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';
import ArticleCard from '../components/common/ArticleCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'; // useEffect è già importato, React.useEffect non sarebbe necessario
import { fetchArticles } from '../features/blog/blogSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Componente FeatureCard aggiornato
const FeatureCard = ({ icon, title, description, itemVariants }) => (
  <motion.div
    className="bg-white dark:bg-neutral-dark p-6 md:p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1.5" // Ombra più pronunciata e card più grande
    variants={itemVariants}
  >
    <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 mb-5"> {/* Sfondo per icona */}
      {React.cloneElement(icon, { className: "w-8 h-8 md:w-10 md:w-10 text-primary dark:text-primary-light" })} {/* Clona e applica classi */}
    </div>
    <h3 className="text-xl md:text-2xl font-semibold text-neutral-dark dark:text-neutral-light mb-3">{title}</h3>
    <p className="text-text-muted-light dark:text-gray-300 text-sm md:text-base leading-relaxed">{description}</p>
  </motion.div>
);


const HomePage = () => {
  const dispatch = useDispatch();
  const { articles, isLoading: articlesLoading, error: articlesError } = useSelector(state => state.blog);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  useEffect(() => {
      if (articles.length === 0 && !articlesLoading && !articlesError) {
        dispatch(fetchArticles({ page: 1, limit: 3 }));
      }
  }, [dispatch, articles.length, articlesLoading, articlesError]);

  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="bg-background-light dark:bg-background-dark">
      {/* Sezione Hero (invariata) */}
      <motion.section
        className="relative bg-cover bg-center text-white py-20 md:py-32"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${HeroBg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="main-container relative z-10 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Diventare genitori è un viaggio meraviglioso.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white dark:text-neutral-light"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Kibi è qui per accompagnarti in ogni passo, dalla gravidanza ai primi anni del tuo bambino, con consigli, risorse e supporto personalizzato.
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button
              as={Link}
              to="/register"
              variant="primary"
              size="lg"
              className="!px-8 !py-3.5 w-full sm:w-auto"
              iconRight={<ArrowRightIcon className="w-5 h-5 ml-2" />}
            >
              Inizia Ora Gratuitamente
            </Button>
            <Button
              as={Link}
              to="/blog"
              variant="outline"
              size="lg"
              className="!text-white !border-white hover:!bg-white/20 !px-8 !py-3.5 w-full sm:w-auto bg-black/10"
            >
              Esplora il Blog
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Sezione "Cosa Troverai su Kibi" - MODIFICATA */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-neutral-darker"> {/* Sfondo più definito */}
        <div className="main-container">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-neutral-dark dark:text-neutral-light mb-4 md:mb-6"
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Cosa Troverai su Kibi
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-center text-text-muted-light dark:text-text-muted-dark mb-12 md:mb-16 max-w-3xl mx-auto" // Aumentato max-w
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.1 }}
          >
            Risorse pensate per te, facili da consultare e sempre aggiornate, per accompagnarti con fiducia in ogni fase del meraviglioso percorso della genitorialità.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" // Aumentato gap
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FeatureCard
              icon={<BookOpenIcon />} // Rimosse classi colore da qui, gestite in FeatureCard
              title="Articoli Informativi"
              description="Guide complete su sonno, alimentazione, sviluppo e tanto altro, scritte (simulatamente) da esperti."
              itemVariants={fadeIn}
            />
            <FeatureCard
              icon={<PresentationChartLineIcon />} // Rimosse classi colore da qui
              title="Monitora i Tuoi Progressi"
              description="Visualizza gli aggiornamenti settimanali (o mensili) sullo sviluppo del tuo bambino, le tappe fondamentali e cosa aspettarti."
              itemVariants={fadeIn}
            />
            <FeatureCard
              icon={<LightBulbIcon />} // Rimosse classi colore da qui
              title="Consigli Personalizzati"
              description="Ricevi suggerimenti (simulati) basati sulla fase della tua gravidanza o l'età del tuo bambino, pensati apposta per te."
              itemVariants={fadeIn}
            />
          </motion.div>
        </div>
      </section>

      {/* Sezione Ultimi Articoli (invariata, ma beneficia delle modifiche a db.json) */}
      <section className="py-16 md:py-24">
           <div className="main-container">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center text-neutral-dark dark:text-neutral-light mb-12 md:mb-16" // Coerenza con altro titolo
                    variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                >
                    Ultimi Articoli dal Blog
                </motion.h2>
                {articlesLoading && featuredArticles.length === 0 ? (
                    <div className="flex justify-center"><LoadingSpinner /></div>
                ) : articlesError && featuredArticles.length === 0 ? (
                    <p className="text-center text-red-500">Errore nel caricamento degli articoli.</p>
                ) : !articlesLoading && featuredArticles.length === 0 ? (
                    <p className="text-center text-text-muted-light dark:text-text-muted-dark">Nessun articolo da mostrare al momento.</p>
                ) : (
                    <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" // Coerenza gap
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    >
                    {featuredArticles.map((article) => (
                        <motion.div key={article.id} variants={fadeIn}>
                            <ArticleCard article={article} />
                        </motion.div>
                    ))}
                    </motion.div>
                )}
                {featuredArticles.length > 0 && (
                    <motion.div
                        className="text-center mt-12 md:mt-16"
                        variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <Button as={Link} to="/blog" variant="primary" size="lg">
                            Vedi Tutti gli Articoli
                        </Button>
                    </motion.div>
                )}
            </div>
      </section>

      {/* Sezione CTA (Call to Action) - MODIFICATA */}
      <section className="py-16 md:py-24 bg-primary dark:bg-primary-dark text-white"> {/* Usato colore primary definito nel config */}
        <div className="main-container text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6" // Coerenza font
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Pronto/a ad iniziare il tuo viaggio con Kibi?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 md:mb-10 max-w-xl mx-auto text-primary-light dark:text-neutral-light" // Colore testo più leggibile su sfondo primary
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, delay:0.1 }}
          >
            Registrati gratuitamente e accedi a tutte le nostre risorse. La genitorialità è più semplice quando si è insieme.
          </motion.p>
          <motion.div
             variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, delay:0.2 }}
          >
            <Button as={Link} to="/register" variant="secondary" size="lg" className="!px-10 !py-4">
              Unisciti a Kibi Oggi
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
// --- END OF FILE src/pages/HomePage.jsx ---