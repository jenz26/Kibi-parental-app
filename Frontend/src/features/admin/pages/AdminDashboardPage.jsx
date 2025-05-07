import { Link } from 'react-router-dom'; // Rimossa Routes, Route, useLocation perché non servono qui
import { DocumentTextIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import Button from '../../../components/common/Button';

const AdminDashboardPage = () => {
  // Questa pagina è il contenuto per il path base /admin.
  // Le sotto-rotte /admin/articles e /admin/users sono gestite
  // direttamente da AppRouter e renderizzano i loro componenti
  // dentro AdminLayout (che ha l'Outlet).

  return (
    <div className="space-y-8">
        <h1 className="page-title">Dashboard Amministratore</h1>
        <p className="text-lg text-neutral-default dark:text-gray-300">
            Benvenuto nell'area di amministrazione di Kibi. Da qui puoi gestire i contenuti e gli utenti del sito.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdminDashboardCard
                title="Gestione Articoli"
                description="Crea, modifica ed elimina articoli del blog."
                linkTo="/admin/articles"
                icon={<DocumentTextIcon className="h-12 w-12 text-primary dark:text-primary-light" />}
            />
            <AdminDashboardCard
                title="Gestione Utenti"
                description="Visualizza, modifica ruoli ed elimina utenti."
                linkTo="/admin/users"
                icon={<UsersIcon className="h-12 w-12 text-secondary dark:text-secondary-light" />}
            />
            <AdminDashboardCard
                title="Statistiche (Placeholder)"
                description="Visualizza statistiche di utilizzo del sito."
                linkTo="#" // Link a una futura pagina di statistiche
                icon={<ChartBarIcon className="h-12 w-12 text-green-500" />}
                disabled
            />
        </div>
    </div>
  );
};

const AdminDashboardCard = ({ title, description, linkTo, icon, disabled }) => (
    <div className={`p-6 rounded-lg shadow-lg bg-white dark:bg-neutral-dark ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl transition-shadow'}`}>
        <div className="flex items-center space-x-4 mb-4">
            {icon}
            <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral-light">{title}</h2>
        </div>
        <p className="text-neutral-default dark:text-gray-400 mb-6">{description}</p>
        {!disabled && (
            <Button as={Link} to={linkTo} variant="primary" fullWidth>
                Vai a {title}
            </Button>
        )}
        {disabled && (
            <Button variant="primary" fullWidth disabled>
                Prossimamente
            </Button>
        )}
    </div>
);

export default AdminDashboardPage;