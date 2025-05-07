import { Link } from 'react-router-dom';
import { CalendarDaysIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const ArticleCard = ({ article }) => {
  if (!article) return null;

  const { slug, title, summary, imageUrl, publishedAt, authorName, category } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="card card-hover flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <Link to={`/blog/${slug}`} className="block">
        <img
          className="w-full h-48 object-cover"
          src={imageUrl || 'https://via.placeholder.com/400x200.png?text=Kibi+Articolo'}
          alt={title}
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        {category && (
          <span className="inline-block bg-secondary-light text-secondary-dark dark:bg-secondary-dark dark:text-secondary-light text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 self-start">
            {category}
          </span>
        )}
        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light hover:text-primary dark:hover:text-primary-light mb-2 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-neutral-default dark:text-gray-400 text-sm mb-4 flex-grow">
          {summary}
        </p>
        <div className="mt-auto border-t border-neutral-light dark:border-neutral-dark/30 pt-4">
          <div className="flex items-center text-xs text-neutral-default dark:text-gray-500 mb-1">
            <UserCircleIcon className="w-4 h-4 mr-1.5 text-primary dark:text-primary-light" />
            <span>{authorName || 'Team Kibi'}</span>
          </div>
          <div className="flex items-center text-xs text-neutral-default dark:text-gray-500">
            <CalendarDaysIcon className="w-4 h-4 mr-1.5 text-primary dark:text-primary-light" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;