// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../common/Header'; // Il tuo Header.jsx
import Footer from '../common/Footer';
import BottomNavigation from '../common/BottomNavigation'; // O il path corretto se l'hai messo altrove

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      {/* Rimosso pt-16 da <main>. L'header sticky "fluttuerà" sopra il contenuto.
          Le singole pagine dovranno gestire il proprio padding-top se necessario.
          Il padding-bottom per la BottomNav su mobile rimane. */}
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;