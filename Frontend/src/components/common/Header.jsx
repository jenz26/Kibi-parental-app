import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../features/auth/authSlice';
import KibiLogo from '../../assets/images/kibi-logo.png'; // Assicurati che il path sia corretto
import Button from './Button';
import { useDarkMode } from '../../hooks/useDarkMode'; // Importa l'hook

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    // Aggiungi altri link pubblici qui se necessario
  ];

  const authenticatedLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/profile', label: 'Profilo' },
  ];

  if (user?.role === 'admin') {
    authenticatedLinks.push({ path: '/admin', label: 'Admin' });
  }

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false); // Chiudi il menu mobile al logout
  };

  const NavItem = ({ path, label, onClick }) => (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? 'bg-primary/20 text-primary dark:bg-primary-dark/30 dark:text-primary-light'
            : 'text-neutral-dark hover:bg-neutral-light/50 dark:text-neutral-light dark:hover:bg-neutral-dark/50'
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="bg-white dark:bg-neutral-dark shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="main-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={KibiLogo} alt="Kibi Logo" className="h-8 w-auto mr-2" />
            <span className="font-semibold text-xl text-primary dark:text-primary-light">
              {import.meta.env.VITE_APP_NAME || "Kibi"}
            </span>
          </Link>

          {/* Navigazione Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavItem key={link.path} path={link.path} label={link.label} />
            ))}
            {isAuthenticated && authenticatedLinks.map((link) => (
              <NavItem key={link.path} path={link.path} label={link.label} />
            ))}
          </nav>

          {/* Azioni Utente e Dark Mode Toggle */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="sm"
              className="p-2"
              aria-label={isDarkMode ? "Attiva Light Mode" : "Attiva Dark Mode"}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-neutral-dark" />
              )}
            </Button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-neutral-dark dark:text-neutral-light">Ciao, {user?.name || 'Utente'}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} iconLeft={<ArrowRightOnRectangleIcon className="h-4 w-4" />}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:block">
                <Button as={Link} to="/login" variant="primary" size="sm" iconLeft={<UserCircleIcon className="h-4 w-4" />}>
                  Login
                </Button>
              </div>
            )}

            {/* Hamburger Menu Icon */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Apri menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-neutral-dark dark:text-neutral-light" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-neutral-dark dark:text-neutral-light" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-neutral-dark border-t border-neutral-light dark:border-neutral-dark/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavItem key={link.path} path={link.path} label={link.label} onClick={() => setIsMobileMenuOpen(false)} />
              ))}
              {isAuthenticated && authenticatedLinks.map((link) => (
                <NavItem key={link.path} path={link.path} label={link.label} onClick={() => setIsMobileMenuOpen(false)} />
              ))}
              {isAuthenticated ? (
                <Button fullWidth variant="outline" size="sm" onClick={handleLogout} className="mt-2">
                  Logout
                </Button>
              ) : (
                 <Button as={Link} to="/login" fullWidth variant="primary" size="sm" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
                  Login / Registrati
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;