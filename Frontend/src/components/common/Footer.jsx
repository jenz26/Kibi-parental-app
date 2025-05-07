import { Link } from 'react-router-dom';
import KibiLogo from '../../assets/images/kibi-logo.png'; // Assicurati che il path sia corretto

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-light dark:bg-neutral-dark/30 border-t border-neutral-default/20 dark:border-neutral-dark/50 text-neutral-dark dark:text-neutral-light">
      <div className="main-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e descrizione */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img src={KibiLogo} alt="Kibi Logo" className="h-10 w-auto mr-3" />
              <span className="text-2xl font-semibold text-primary dark:text-primary-light">{import.meta.env.VITE_APP_NAME || "Kibi"}</span>
            </Link>
            <p className="text-sm text-neutral-default dark:text-gray-400">
              Accompagniamo i neo genitori nel meraviglioso viaggio della crescita.
            </p>
          </div>

          {/* Link utili */}
          <div>
            <h5 className="font-semibold mb-3 text-lg">Link Utili</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-primary dark:hover:text-primary-light transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-primary dark:hover:text-primary-light transition-colors">FAQ (Placeholder)</Link></li>
              <li><Link to="/about" className="hover:text-primary dark:hover:text-primary-light transition-colors">Chi Siamo (Placeholder)</Link></li>
              <li><Link to="/contact" className="hover:text-primary dark:hover:text-primary-light transition-colors">Contatti (Placeholder)</Link></li>
            </ul>
          </div>

          {/* Social e Newsletter (Placeholder) */}
          <div>
            <h5 className="font-semibold mb-3 text-lg">Seguici</h5>
            <div className="flex space-x-4 mb-4">
              {/* Aggiungi icone social qui */}
              <a href="#" className="text-neutral-default hover:text-primary dark:hover:text-primary-light transition-colors">FB</a>
              <a href="#" className="text-neutral-default hover:text-primary dark:hover:text-primary-light transition-colors">IG</a>
              <a href="#" className="text-neutral-default hover:text-primary dark:hover:text-primary-light transition-colors">TW</a>
            </div>
            <h5 className="font-semibold mb-2 text-lg">Newsletter</h5>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input type="email" placeholder="La tua email" className="input-field flex-grow rounded-r-none dark:bg-neutral-dark dark:text-neutral-light !py-2 !px-3" /> {/* Aggiustamento classe per padding */}
                <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-r-md transition-colors">Iscriviti</button> {/* Usato un button standard per semplicità */}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-default/20 dark:border-neutral-dark/50 text-center text-sm text-neutral-default dark:text-gray-400">
          <p>© {currentYear} {import.meta.env.VITE_APP_NAME || "Kibi"}. Tutti i diritti riservati.</p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-primary dark:hover:text-primary-light transition-colors">Privacy Policy (Placeholder)</Link> |
            <Link to="/terms" className="hover:text-primary dark:hover:text-primary-light transition-colors ml-1">Termini di Servizio (Placeholder)</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;