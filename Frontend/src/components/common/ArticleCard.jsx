// --- START OF FILE ArticleCard.jsx ---
import { Link } from 'react-router-dom';
import { CalendarDaysIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ArticleCard = ({ article }) => {
  if (!article) return null;

  const { slug, title, summary, imageUrl, publishedAt, authorName, category } = article;

  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Data non disponibile';

  // Assumendo che pink-100 e pink-800 siano definiti nel tuo tailwind.config.js o siano colori di base di Tailwind
  const categoryTagClass = `inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 self-start 
                           bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100`;

  return (
    <motion.div
      className="card card-hover flex flex-col h-full bg-white dark:bg-neutral-dark shadow-lg rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <Link to={`/blog/${slug}`} className="block shrink-0">
        <img
          className="w-full h-48 object-cover"
          src={imageUrl || 'https://via.placeholder.com/400x200.png?text=Kibi+Articolo'}
          alt={title || 'Immagine articolo'}
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        {category && (
          <span className={categoryTagClass}>
            {category}
          </span>
        )}
        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light hover:text-primary dark:hover:text-primary-light mb-2 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-text-muted-light dark:text-gray-300 text-sm mb-4 flex-grow"> {/* dark:text-gray-300 su bg-neutral-dark è OK */}
          {summary}
        </p>
        <div className="mt-auto border-t border-neutral-light dark:border-neutral-dark/50 pt-4 text-xs text-text-muted-light dark:text-gray-300"> {/* dark:text-gray-300 per meta info */}
          <div className="flex items-center mb-1">
            <UserCircleIcon className="w-4 h-4 mr-1.5 text-primary dark:text-primary-light shrink-0" />
            <span className="truncate">{authorName || 'Team Kibi'}</span>
          </div>
          <div className="flex items-center">
            <CalendarDaysIcon className="w-4 h-4 mr-1.5 text-primary dark:text-primary-light shrink-0" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
// --- END OF FILE ArticleCard.jsx ---