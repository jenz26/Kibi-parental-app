// src/components/common/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SunIcon, MoonIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; // UserCircleIcon potrebbe servire per mobile
import { logout } from '../../features/auth/authSlice';
import KibiLogo from '../../assets/images/kibi-logo.webp';
import Button from './Button';
import { useDarkMode } from '../../hooks/useDarkMode';

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

  const NavItemDesktop = ({ path, label }) => ( // Rinomino per chiarezza
    <NavLink
      to={path}
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
    // L'header ora è sempre visibile, le classi hidden/md:flex saranno sugli elementi interni
    <header className="bg-white dark:bg-neutral-dark shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="main-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Sempre visibile */}
          <Link to="/" className="flex items-center">
            <img src={KibiLogo} alt="Kibi Logo" className="h-8 w-auto mr-2" />
            <span className="font-semibold text-xl text-primary dark:text-primary-light">
              {import.meta.env.VITE_APP_NAME || "Kibi"}
            </span>
          </Link>

          {/* Navigazione Desktop - Nascosta su mobile, visibile su desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavItemDesktop key={link.path} path={link.path} label={link.label} />
            ))}
            {isAuthenticated && authenticatedLinks.map((link) => (
              <NavItemDesktop key={link.path} path={link.path} label={link.label} />
            ))}
          </nav>

          {/* Azioni a destra: Dark Mode Toggle (sempre visibile) e Login/Profilo (condizionale per desktop) */}
          <div className="flex items-center space-x-2 sm:space-x-3"> {/* Aggiustato space-x per coerenza */}
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
                <MoonIcon className="h-5 w-5 text-neutral-dark dark:text-neutral-light" />
              )}
            </Button>

            {/* Azioni Utente specifiche per Desktop (nascoste su mobile) */}
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

            {/* Su mobile, potremmo mostrare un'icona utente semplice se loggato,
                oppure nulla dato che "Profilo" e "Login" sono nella BottomNav.
                Per ora, manteniamo semplice e non aggiungiamo altre icone qui per mobile.
                L'importante è che il burger menu e la nav mobile dropdown siano rimossi.
            */}

          </div>
        </div>
      </div>
      {/* NESSUN MENU MOBILE DROPDOWN QUI */}
    </header>
  );
};

export default Header;