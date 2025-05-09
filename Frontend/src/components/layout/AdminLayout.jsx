// --- START OF FILE src/components/layout/AdminLayout.jsx ---
import { useState, Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cog6ToothIcon, DocumentTextIcon, UsersIcon, HomeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import AdminNavItem from '../common/AdminNavItem';
import KibiLogo from '../../assets/images/kibi-logo.webp';
import { Dialog, Transition } from '@headlessui/react';
import ScrollToTop from '../common/ScrollToTop'; // <<<<<<<<<< ASSICURATI SIA IMPORTATO

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const navigation = [
    { name: 'Dashboard Admin', href: '/admin', icon: HomeIcon, exact: true },
    { name: 'Gestione Articoli', href: '/admin/articles', icon: DocumentTextIcon },
    { name: 'Gestione Utenti', href: '/admin/users', icon: UsersIcon },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center mb-6 px-4 pt-5 shrink-0">
        <img src={KibiLogo} alt="Kibi Logo" className="h-8 w-auto mr-2" />
        <span className="text-xl font-semibold text-primary dark:text-primary-light">Admin Kibi</span>
      </div>
      <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
        {navigation.map((item) => (
          <AdminNavItem
            key={item.name}
            to={item.href}
            icon={item.icon}
            onClick={() => setSidebarOpen(false)}
            exact={item.exact}
          >
            {item.name}
          </AdminNavItem>
        ))}
      </nav>
      <div className="mt-auto p-2 border-t border-neutral-default/10 dark:border-neutral-dark/30 shrink-0">
        <AdminNavItem 
            to="/" 
            icon={Cog6ToothIcon} 
            onClick={() => setSidebarOpen(false)}
        >
          Torna al sito
        </AdminNavItem>
      </div>
    </>
  );

  return (
    <> {/* <<<<<<<<<< AVVOLGI IN UN FRAGMENT PER ScrollToTop */}
      <ScrollToTop /> {/* <<<<<<<<<< AGGIUNGI/DECOMMENTA QUI */}
      <div className="flex h-screen bg-neutral-light dark:bg-background-dark overflow-hidden">
        <aside className="hidden md:flex md:flex-col md:w-64 md:flex-shrink-0 bg-white dark:bg-neutral-dark border-r border-neutral-default/20 dark:border-neutral-dark/50">
          <SidebarContent />
        </aside>

        {/* ... resto del codice della sidebar mobile e del contenuto principale ... */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
            {/* ... */}
        </Transition.Root>

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            {/* ... header mobile ... */}
            <header className="md:hidden sticky top-0 z-30 flex h-16 items-center justify-between gap-x-6 border-b border-neutral-default/20 dark:border-neutral-dark/50 bg-white dark:bg-neutral-dark px-4 sm:px-6">
            {/* ... (contenuto header mobile) ... */}
            </header>

            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-full mx-auto">
                <Outlet />
            </div>
            </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
// --- END OF FILE src/components/layout/AdminLayout.jsx ---