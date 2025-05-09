// src/components/common/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SunIcon, MoonIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout } from '../../features/auth/authSlice'; // Verifica path
import KibiLogo from '../../assets/images/kibi-logo.webp'; // Verifica path
import Button from './Button';
import { useDarkMode } from '../../hooks/useDarkMode'; // Verifica path

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
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
  };

  // Stile per link desktop
  const navItemDesktopClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        // Stato attivo: testo più scuro (primary-dark o simile), NO sfondo chiaro
        ? 'font-semibold text-cyan-700 dark:text-primary-light dark:bg-primary-dark/30' 
        : 'text-neutral-dark hover:bg-neutral-light/50 dark:text-neutral-light dark:hover:bg-neutral-dark/50'
    }`;
  
  // Stile per bottone Logout outline
  const logoutButtonClass = `!border-cyan-700 !text-cyan-700 hover:!bg-cyan-700/10 dark:!border-primary-light dark:!text-primary-light dark:hover:!bg-primary-light/10`;

  return (
    <header className="bg-white dark:bg-neutral-dark shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="main-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={KibiLogo} alt="Kibi Logo" className="h-8 w-auto mr-2" />
            {/* Usato colore più scuro per primary in light mode */}
            <span className="font-semibold text-xl text-cyan-800 dark:text-primary-light"> 
              {import.meta.env.VITE_APP_NAME || "Kibi"}
            </span>
          </Link>

          {/* Navigazione Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={navItemDesktopClass}>
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated && authenticatedLinks.map((link) => (
               <NavLink key={link.path} to={link.path} className={navItemDesktopClass}>
                 {link.label}
               </NavLink>
            ))}
          </nav>

          {/* Azioni a destra */}
          <div className="flex items-center space-x-2 sm:space-x-3">
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
                // Assicurati che il colore in light mode sia visibile (dark text)
                <MoonIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-light" /> 
              )}
            </Button>

            {/* Azioni Utente specifiche per Desktop */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-neutral-dark dark:text-neutral-light">Ciao, {user?.name || 'Utente'}</span>
                 {/* Applicato stile custom per contrasto */}
                <Button variant="outline" size="sm" onClick={handleLogout} className={logoutButtonClass} iconLeft={<ArrowRightOnRectangleIcon className="h-4 w-4" />}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:block">
                 {/* Assumiamo che variant="primary" usi sfondo più scuro ora */}
                <Button as={Link} to="/login" variant="primary" size="sm" iconLeft={<UserCircleIcon className="h-4 w-4" />}>
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;