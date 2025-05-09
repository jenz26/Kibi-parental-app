// --- START OF FILE BottomNavigation.jsx ---
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HomeIcon, Squares2X2Icon, NewspaperIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'; // Rimosso ArrowRightOnRectangleIcon se non usato
import { logout } from '../../features/auth/authSlice';

const BottomNavigation = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleLogout = () => { // Commentato se non si usa il bottone logout qui
    //     dispatch(logout());
    //     navigate('/');
    // };

    let baseItems = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Blog', href: '/blog', icon: NewspaperIcon },
    ];

    let authenticatedUserItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon },
        { name: 'Profilo', href: '/profile', icon: UserCircleIcon },
    ];

    let authActionItem;
    if (!isAuthenticated) {
        authActionItem = { name: 'Accedi', href: '/login', icon: ArrowLeftOnRectangleIcon };
    }

    const adminItem = { name: 'Admin', href: '/admin', icon: Cog8ToothIcon };

    let visibleItems = [...baseItems];

    if (isAuthenticated) {
        visibleItems.push(...authenticatedUserItems);
        if (user?.role === 'admin') {
            visibleItems.push(adminItem);
        }
    } else {
        if (authActionItem) {
            if (visibleItems.length < 4) {
                 visibleItems.push(authActionItem);
            } else {
                visibleItems.push(authActionItem); // Semplificato, aggiunge sempre se non auth
            }
        }
    }

    const finalItemsToShow = visibleItems.slice(0, 5);


    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-dark border-t border-neutral-light/50 dark:border-neutral-darker shadow-[0_-2px_5px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_5px_rgba(0,0,0,0.15)] z-40">
            <div className="flex justify-around items-stretch h-16 max-w-screen-sm mx-auto">
                {finalItemsToShow.map((item) => (
                    item.action ? ( // Per ora non ci sono items con 'action'
                        <button
                            key={item.name}
                            onClick={item.action}
                            className="flex flex-col items-center justify-center text-center px-2 py-1 flex-grow basis-0 rounded-none text-xs font-medium transition-colors text-text-muted-light dark:text-neutral-light hover:text-primary dark:hover:text-primary-light"
                        >
                            <item.icon className="h-5 w-5 mb-0.5 shrink-0" aria-hidden="true" />
                            <span className="truncate w-full">{item.name}</span>
                        </button>
                    ) : (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center text-center px-2 py-1 flex-grow basis-0 rounded-none text-xs font-medium transition-colors
                                ${
                                    isActive
                                        ? 'text-primary dark:text-primary-light'
                                        : 'text-text-muted-light dark:text-neutral-light hover:text-primary dark:hover:text-primary-light'
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
// --- END OF FILE BottomNavigation.jsx ---