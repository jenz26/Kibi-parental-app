import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cog6ToothIcon, DocumentTextIcon, UsersIcon, HomeIcon } from '@heroicons/react/24/outline';
import AdminNavItem from '../common/AdminNavItem';
import KibiLogo from '../../assets/images/kibi-logo.png';

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  // Questa verifica è già gestita da ProtectedRoute, ma una doppia sicurezza non fa male.
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const navigation = [
    { name: 'Dashboard Admin', href: '/admin', icon: HomeIcon },
    { name: 'Gestione Articoli', href: '/admin/articles', icon: DocumentTextIcon },
    { name: 'Gestione Utenti', href: '/admin/users', icon: UsersIcon },
    // { name: 'Impostazioni Sito', href: '/admin/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex h-screen bg-neutral-light dark:bg-background-dark">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-neutral-dark p-4 border-r border-neutral-default/20 dark:border-neutral-dark/50 flex flex-col">
        <div className="flex items-center mb-8">
          <img src={KibiLogo} alt="Kibi Logo" className="h-8 w-auto mr-2" />
          <span className="text-xl font-semibold text-primary dark:text-primary-light">Admin Kibi</span>
        </div>
        <nav className="flex-grow space-y-1">
          {navigation.map((item) => (
            <AdminNavItem key={item.name} to={item.href} icon={item.icon}>
              {item.name}
            </AdminNavItem>
          ))}
        </nav>
         <div className="mt-auto">
            <AdminNavItem to="/" icon={Cog6ToothIcon}> {/* Modificato per tornare alla Home Page del sito */}
              Torna al sito
            </AdminNavItem>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;