import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const AdminNavItem = ({
  to,
  icon: Icon,
  children,
  onClick, // Nuova prop per gestire il click (es. chiudere la sidebar mobile)
  exact = false // Nuova prop per il match esatto, default a false
}) => {
  return (
    <NavLink
      to={to}
      end={exact} // Usa la prop 'exact' per la prop 'end' di NavLink
      onClick={onClick} // Esegui la funzione onClick se fornita
      className={({ isActive }) =>
        clsx(
          'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 w-full text-left', // Aggiunto w-full e text-left per coerenza
          isActive
            ? 'bg-primary text-white dark:bg-primary-dark shadow-sm' // Aggiunto shadow per lo stato attivo
            : 'text-neutral-dark hover:bg-neutral-light dark:text-neutral-light dark:hover:bg-neutral-dark/50 dark:hover:text-white'
        )
      }
    >
      {Icon && <Icon className="w-5 h-5 mr-3 flex-shrink-0" aria-hidden="true" />} {/* Aggiunto flex-shrink-0 */}
      <span className="truncate">{children}</span> {/* Aggiunto truncate per testi lunghi */}
    </NavLink>
  );
};

export default AdminNavItem;