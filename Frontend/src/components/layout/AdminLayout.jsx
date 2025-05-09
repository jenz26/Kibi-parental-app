// --- START OF FILE src/components/layout/AdminLayout.jsx (con overflow rivisto) ---
import { useState, Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Cog6ToothIcon, DocumentTextIcon, UsersIcon, HomeIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import AdminNavItem from '../common/AdminNavItem';
import KibiLogo from '../../assets/images/kibi-logo.webp';
import { Dialog, Transition } from '@headlessui/react';
import ScrollToTop from '../common/ScrollToTop';

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
      <nav className="flex-1 space-y-1 px-2 overflow-y-auto"> {/* Overflow per la nav se i link sono troppi */}
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
    <>
      <ScrollToTop />
      {/* Contenitore principale dell'AdminLayout */}
      <div className="flex h-screen bg-neutral-light dark:bg-background-dark overflow-hidden"> {/* overflow-hidden qui previene scroll dell'intera pagina */}
        
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex md:flex-col md:w-64 md:flex-shrink-0 bg-white dark:bg-neutral-dark border-r border-neutral-default/20 dark:border-neutral-dark/50 overflow-y-auto"> {/* Aggiunto overflow-y-auto alla sidebar fissa */}
          <SidebarContent />
        </aside>

        {/* Sidebar Mobile (Dialogo) */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
           <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as="div"
                className="fixed inset-0 bg-black/60 dark:bg-black/80"
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              />
              <div className="fixed inset-0 flex">
                <Transition.Child
                  as="div"
                  className="relative flex w-full max-w-xs flex-1"
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  {/* Dialog.Panel gestisce il suo overflow se SidebarContent diventa troppo lungo */}
                  <Dialog.Panel as="div" className="flex flex-grow flex-col bg-white dark:bg-neutral-dark pb-4 w-full">
                    <SidebarContent /> {/* SidebarContent ha già overflow-y-auto sulla nav */}
                  </Dialog.Panel>
                  <Transition.Child
                    as="div"
                    className="absolute left-full top-0 flex w-16 justify-center pt-5"
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Chiudi sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </Transition.Child>
                </Transition.Child>
              </div>
            </Dialog>
        </Transition.Root>

        {/* Contenitore per il contenuto principale (header mobile + main scrollabile) */}
        {/* NON mettere overflow-hidden qui se l'header mobile è sticky e dentro questo div */}
        <div className="flex flex-col flex-1 min-w-0"> 
            <header className="md:hidden sticky top-0 z-30 flex h-16 items-center justify-between gap-x-6 border-b border-neutral-default/20 dark:border-neutral-dark/50 bg-white dark:bg-neutral-dark px-4 sm:px-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-neutral-dark dark:text-neutral-light md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Apri sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex items-center justify-center md:hidden">
                 <img src={KibiLogo} alt="Kibi Logo" className="h-7 w-auto mr-1.5" />
                 <span className="text-lg font-semibold text-primary dark:text-primary-light">Admin</span>
              </div>
              <div className="w-6 md:hidden"></div> {/* Spacer per bilanciare il bottone burger */}
            </header>

            {/* Contenuto principale scrollabile */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 pt-[64px] md:pt-6"> {/* pt-[64px] (o pt-16) per spazio header mobile */}
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