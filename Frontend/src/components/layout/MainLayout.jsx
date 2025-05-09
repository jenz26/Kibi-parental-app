// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BottomNavigation from '../common/BottomNavigation';
import ScrollToTop from '../common/ScrollToTop';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <ScrollToTop />
      <Header />
      <main className="flex-grow"> {/* Rimuovi pb-16 da qui se non necessario per altri motivi */}
        <Outlet />
      </main>
      <Footer />
      {/* Questo div serve a creare lo spazio per la BottomNavigation */}
      <div className="md:hidden h-16" /> {/* Spaziatore solo per mobile, alto come la BottomNav */}
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;