// src/components/common/BottomNavigation.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useSelector, useDispatch } from 'react-redux'; // Importa useDispatch
import { HomeIcon, Squares2X2Icon, NewspaperIcon, UserCircleIcon, ArrowRightOnRectangleIcon, Cog8ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout } from '../../features/auth/authSlice'; // Importa l'azione di logout

const BottomNavigation = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        // Opzionale: reindirizza alla home page o alla pagina di login dopo il logout
        navigate('/');
    };

    // Definiamo gli item di base
    let baseItems = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Blog', href: '/blog', icon: NewspaperIcon },
    ];

    // Definiamo gli item per utente autenticato
    let authenticatedUserItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon },
        // Il link "Profilo" ora può gestire anche il logout se non si vuole una voce separata
        { name: 'Profilo', href: '/profile', icon: UserCircleIcon },
    ];

    // Item per l'accesso/logout
    let authActionItem;
    if (isAuthenticated) {
        // Potremmo avere un item "Logout" separato o integrarlo nella pagina Profilo.
        // Se lo vogliamo qui:
        // authActionItem = { name: 'Logout', action: handleLogout, icon: ArrowRightOnRectangleIcon };
        // Per ora, assumiamo che il logout sia nella pagina Profilo, quindi l'item Profilo è sufficiente.
        // Se si vuole un accesso diretto al Logout qui, scommentare la riga sopra e aggiungerlo a `visibleItems`.
    } else {
        authActionItem = { name: 'Accedi', href: '/login', icon: ArrowLeftOnRectangleIcon };
    }

    // Link Admin (se applicabile)
    const adminItem = { name: 'Admin', href: '/admin', icon: Cog8ToothIcon };

    // Costruiamo la lista finale degli item da visualizzare
    let visibleItems = [...baseItems];

    if (isAuthenticated) {
        visibleItems.push(...authenticatedUserItems);
        if (user?.role === 'admin') {
            visibleItems.push(adminItem);
        }
        // Se si vuole il pulsante Logout direttamente nella bottom nav:
        // if (authActionItem) visibleItems.push(authActionItem);
    } else {
        if (authActionItem) {
            // Se non autenticato, e abbiamo più di 3 item base, potremmo voler
            // sostituire l'ultimo item base con "Accedi" per non superare i 4/5 items totali.
            // O semplicemente aggiungerlo. Per ora lo aggiungiamo.
            if (visibleItems.length < 4) { // Limita a 4 o 5 items totali
                 visibleItems.push(authActionItem);
            } else { // Se ci sono già 4 item, sostituisci l'ultimo (es. se ne vuoi solo 4)
                // Questo è un esempio, potresti voler decidere diversamente quale rimpiazzare
                // visibleItems[visibleItems.length - 1] = authActionItem;
                // O più semplicemente, lo aggiungiamo e poi facciamo slice
                visibleItems.push(authActionItem);
            }
        }
    }

    // Assicurati di non avere troppi items, taglia se necessario (es. max 5)
    // Dai priorità agli items più importanti
    const finalItemsToShow = visibleItems.slice(0, 5);


    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-dark border-t border-gray-200 dark:border-neutral-hover shadow-[0_-2px_5px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_5px_rgba(0,0,0,0.15)] z-40">
            <div className="flex justify-around items-stretch h-16 max-w-screen-sm mx-auto">
                {finalItemsToShow.map((item) => (
                    item.action ? ( // Se è un'azione (es. Logout)
                        <button
                            key={item.name}
                            onClick={item.action}
                            className="flex flex-col items-center justify-center text-center px-2 py-1 flex-grow basis-0 rounded-none text-xs font-medium transition-colors text-neutral-default dark:text-neutral-light hover:text-primary dark:hover:text-primary-light"
                        >
                            <item.icon className="h-5 w-5 mb-0.5 shrink-0" aria-hidden="true" />
                            <span className="truncate w-full">{item.name}</span>
                        </button>
                    ) : ( // Se è un NavLink
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center text-center px-2 py-1 flex-grow basis-0 rounded-none text-xs font-medium transition-colors
                                ${
                                    isActive
                                        ? 'text-primary dark:text-primary-light'
                                        : 'text-neutral-default dark:text-neutral-light hover:text-primary dark:hover:text-primary-light'
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5 mb-0.5 shrink-0" aria-hidden="true" />
                            <span className="truncate w-full">{item.name}</span>
                        </NavLink>
                    )
                ))}
            </div>
        </nav>
    );
};

export default BottomNavigation;