// --- START OF FILE Footer.jsx ---
import { Link } from 'react-router-dom';
import KibiLogo from '../../assets/images/kibi-logo.webp';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-light dark:bg-neutral-dark/30 border-t border-neutral-default/20 dark:border-neutral-dark/50">
      <div className="main-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e descrizione */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={KibiLogo} alt="Kibi Logo" className="h-10 w-auto mr-3" />
              <span className="text-2xl font-semibold text-primary dark:text-primary-light">{import.meta.env.VITE_APP_NAME || "Kibi"}</span>
            </Link>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Accompagniamo i neo genitori nel meraviglioso viaggio della crescita.
            </p>
          </div>

          {/* Link utili */}
          <div>
            <h3 className="font-semibold mb-3 text-lg text-neutral-dark dark:text-neutral-light">Link Utili</h3>
            <ul className="space-y-2 text-sm text-text-muted-light dark:text-text-muted-dark">
              <li><Link to="/blog" className="hover:text-primary dark:hover:text-primary-light transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-primary dark:hover:text-primary-light transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-primary dark:hover:text-primary-light transition-colors">Chi Siamo</Link></li>
              <li><Link to="/contact" className="hover:text-primary dark:hover:text-primary-light transition-colors">Contatti</Link></li>
            </ul>
          </div>

          {/* Social e Newsletter (Placeholder) */}
          <div>
            <h3 className="font-semibold mb-3 text-lg text-neutral-dark dark:text-neutral-light">Seguici</h3>
            <div className="flex space-x-4 mb-4 text-text-muted-light dark:text-text-muted-dark">
              <a href="#" className="hover:text-primary dark:hover:text-primary-light transition-colors">FB</a>
              <a href="#" className="hover:text-primary dark:hover:text-primary-light transition-colors">IG</a>
              <a href="#" className="hover:text-primary dark:hover:text-primary-light transition-colors">TW</a>
            </div>
            <h3 className="font-semibold mb-2 text-lg text-neutral-dark dark:text-neutral-light">Newsletter</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input type="email" placeholder="La tua email" className="input-field flex-grow rounded-r-none dark:bg-neutral-dark dark:text-neutral-light !py-2 !px-3" />
                <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-r-md transition-colors">Iscriviti</button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-default/20 dark:border-neutral-dark/50 text-center text-sm text-text-muted-light dark:text-text-muted-dark">
          <p>© {currentYear} {import.meta.env.VITE_APP_NAME || "Kibi"}. Tutti i diritti riservati.</p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-primary dark:hover:text-primary-light transition-colors">Privacy Policy</Link> |
            <Link to="/terms" className="hover:text-primary dark:hover:text-primary-light transition-colors ml-1">Termini di Servizio</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// --- END OF FILE Footer.jsx ---