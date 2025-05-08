import { Link } from 'react-router-dom';
import Button from '../components/common/Button'; // Assicurati che Button sia importato
import { motion } from 'framer-motion';
import HeroBg from '../assets/images/hero-bg.webp';
import { ArrowRightIcon, BookOpenIcon, UsersIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import ArticleCard from '../components/common/ArticleCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchArticles } from '../features/blog/blogSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { articles, isLoading: articlesLoading, error: articlesError } = useSelector(state => state.blog);

  // Definizioni delle varianti di animazione a livello del componente HomePage
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
        delayChildren: 0.3, // Opzionale, se vuoi un ritardo prima che i figli inizino ad animarsi
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
      <motion.section
        className="relative bg-cover bg-center text-white py-20 md:py-32"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${HeroBg})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="main-container relative z-10 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            variants={fadeIn} // Usa la variante definita sopra
            initial="hidden"
            animate="visible"
          >
            Diventare genitori è un <span className="text-primary-light">viaggio</span> meraviglioso.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-neutral-light"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Kibi è qui per accompagnarti in ogni passo, dalla gravidanza ai primi anni del tuo bambino, con consigli, risorse e una comunità di supporto.
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button
              as={Link} // Usiamo Link di react-router-dom
              to="/register"
              variant="primary"
              size="lg"
              className="!px-8 !py-3.5 w-full sm:w-auto"
              iconRight={<ArrowRightIcon className="w-5 h-5 ml-2" />}
              // whileHover e whileTap rimosse da qui, gestite internamente da Button se non è un Link
            >
              Inizia Ora Gratuitamente
            </Button>
            <Button
              as={Link} // Usiamo Link
              to="/blog"
              variant="outline"
              size="lg"
              className="!text-white !border-white hover:!bg-white/10 !px-8 !py-3.5 w-full sm:w-auto"
            >
              Esplora il Blog
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-16 md:py-24 bg-neutral-light/30 dark:bg-neutral-dark/30">
        <div className="main-container">
          <motion.h2
            className="text-3xl font-bold text-center text-neutral-dark dark:text-neutral-light mb-4"
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Cosa Troverai su Kibi
          </motion.h2>
          <motion.p
            className="text-center text-neutral-default dark:text-gray-400 mb-12 max-w-xl mx-auto"
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, delay:0.1 }}
          >
            Risorse pensate per te, facili da consultare e sempre aggiornate.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer} // Applica stagger al contenitore
            initial="hidden"
            whileInView="visible" // Animazione quando entra nel viewport
            viewport={{ once: true }} // Anima solo una volta
          >
            <FeatureCard
              icon={<BookOpenIcon className="w-10 h-10 text-primary dark:text-primary-light mb-4" />}
              title="Articoli Informativi"
              description="Guide complete su sonno, alimentazione, sviluppo e tanto altro, scritte da esperti."
              itemVariants={fadeIn} // Passa la variante per il singolo item
            />
            <FeatureCard
              icon={<UsersIcon className="w-10 h-10 text-secondary dark:text-secondary-light mb-4" />}
              title="Comunità di Supporto"
              description="Connettiti con altri genitori, condividi esperienze e trova supporto. (Prossimamente)"
              itemVariants={fadeIn}
            />
            <FeatureCard
              icon={<LightBulbIcon className="w-10 h-10 text-yellow-500 mb-4" />}
              title="Consigli Personalizzati"
              description="Ricevi suggerimenti basati sulla fase della tua gravidanza o l'età del tuo bambino."
              itemVariants={fadeIn}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="main-container">
          <motion.h2
            className="text-3xl font-bold text-center text-neutral-dark dark:text-neutral-light mb-12"
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Ultimi Articoli dal Blog
          </motion.h2>
          {articlesLoading && featuredArticles.length === 0 ? (
             <div className="flex justify-center"><LoadingSpinner /></div>
          ) : articlesError && featuredArticles.length === 0 ? (
            <p className="text-center text-red-500">Errore nel caricamento degli articoli.</p>
          ) : !articlesLoading && featuredArticles.length === 0 ? (
            <p className="text-center text-neutral-default dark:text-gray-400">Nessun articolo da mostrare al momento.</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredArticles.map((article) => (
                <motion.div key={article.id} variants={fadeIn}> {/* Usa fadeIn qui per ogni card */}
                    <ArticleCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          )}
          {featuredArticles.length > 0 && (
            <motion.div
                className="text-center mt-12"
                variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
                <Button as={Link} to="/blog" variant="primary" size="lg">
                Vedi Tutti gli Articoli
                </Button>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary dark:bg-primary-dark text-white">
        <div className="main-container text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Pronto/a ad iniziare il tuo viaggio con Kibi?
          </motion.h2>
          <motion.p
            className="text-lg mb-8 max-w-xl mx-auto text-primary-light dark:text-neutral-light"
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

// FeatureCard ora accetta itemVariants
const FeatureCard = ({ icon, title, description, itemVariants }) => (
  <motion.div
    className="bg-white dark:bg-neutral-dark p-8 rounded-lg shadow-lg text-center"
    variants={itemVariants} // Usa la prop passata per le varianti del singolo item
    // initial, animate, viewport sono gestiti dal contenitore <motion.div> con staggerChildren
  >
    {icon}
    <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light mb-3">{title}</h3>
    <p className="text-neutral-default dark:text-gray-400">{description}</p>
  </motion.div>
);

export default HomePage;