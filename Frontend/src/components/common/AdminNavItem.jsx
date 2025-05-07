import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const AdminNavItem = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      end // 'end' prop per NavLink per match esatto
      className={({ isActive }) =>
        clsx(
          'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150',
          isActive
            ? 'bg-primary text-white dark:bg-primary-dark'
            : 'text-neutral-dark hover:bg-neutral-light dark:text-neutral-light dark:hover:bg-neutral-dark/50'
        )
      }
    >
      {Icon && <Icon className="w-5 h-5 mr-3" />}
      {children}
    </NavLink>
  );
};

export default AdminNavItem;