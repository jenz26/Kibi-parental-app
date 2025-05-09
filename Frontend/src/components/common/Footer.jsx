// --- START OF FILE src/components/common/Footer.jsx (Corretto) ---
import React from 'react';
import { Link } from 'react-router-dom';
import KibiLogo from '../../assets/images/kibi-logo.webp';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Button from './Button'; // <<<<<<<<<< AGGIUNGI O DECOMMENTA QUESTA RIGA

// Importa le tue nuove icone SVG custom
import GitHubBrandIcon from './icons/GitHubBrandIcon'; 
import LinkedInBrandIcon from './icons/LinkedInBrandIcon'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() === '') {
      toast.error("Per favore, inserisci un'email valida.");
      return;
    }
    console.log('Tentativo di iscrizione newsletter per:', newsletterEmail);
    toast.success(`Grazie per l'interesse! ${newsletterEmail})`);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-neutral-light dark:bg-neutral-dark/30 border-t border-neutral-default/20 dark:border-neutral-dark/50 text-neutral-dark dark:text-neutral-light">
      <div className="main-container py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={KibiLogo} alt="Kibi Logo" className="h-10 w-auto mr-3" />
              <span className="text-2xl font-semibold text-primary dark:text-primary-light">{import.meta.env.VITE_APP_NAME || "Kibi"}</span>
            </Link>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Accompagniamo i neo genitori nel meraviglioso viaggio della crescita, con supporto e informazioni pensate per te.
            </p>
          </div>

          <div className="md:col-span-1 space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-lg text-neutral-dark dark:text-neutral-light">Link Utili</h3>
              <ul className="space-y-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                <li><Link to="/blog" className="hover:text-primary dark:hover:text-primary-light transition-colors">Blog</Link></li>
                <li><Link to="/faq" className="hover:text-primary dark:hover:text-primary-light transition-colors">FAQ</Link></li>
                <li><Link to="/about" className="hover:text-primary dark:hover:text-primary-light transition-colors">Chi Siamo</Link></li>
                <li><Link to="/contact" className="hover:text-primary dark:hover:text-primary-light transition-colors">Contatti</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-lg text-neutral-dark dark:text-neutral-light">Seguici</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/jenz26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted-light hover:text-primary dark:text-text-muted-dark dark:hover:text-primary-light transition-colors"
                  aria-label="Profilo GitHub"
                >
                  <GitHubBrandIcon className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/contin-marco-padova/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted-light hover:text-primary dark:text-text-muted-dark dark:hover:text-primary-light transition-colors"
                  aria-label="Profilo LinkedIn"
                >
                  <LinkedInBrandIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-3 text-lg text-neutral-dark dark:text-neutral-light">Newsletter Kibi</h3>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-3">
              Iscriviti per ricevere consigli e aggiornamenti.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center">
              <input
                type="email"
                placeholder="La tua email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="input-field flex-grow rounded-r-none !py-2.5 !px-3 text-sm"
                required
              />
              {/* La riga 90 (o giù di lì) si riferisce a questo Button */}
              <Button 
                type="submit"
                variant="primary"
                className="!rounded-l-none !py-2.5 text-sm"
              >
                Iscriviti
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-default/20 dark:border-neutral-dark/50 text-center text-xs text-text-muted-light dark:text-text-muted-dark">
          <p>© {currentYear} {import.meta.env.VITE_APP_NAME || "Kibi"}. Tutti i diritti riservati.</p>
          <p className="mt-1 space-x-1">
            <Link to="/privacy" className="hover:text-primary dark:hover:text-primary-light transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-primary dark:hover:text-primary-light transition-colors">Termini di Servizio</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// --- END OF FILE src/components/common/Footer.jsx ---