import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRouter } from './routes/AppRouter';
import { loadUserFromStorage } from './features/auth/authSlice';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const dispatch = useDispatch();
  const [isDarkMode] = useDarkMode(); // Hook per gestire il dark mode

  useEffect(() => {
    // Carica l'utente dal localStorage all'avvio dell'app
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    // Applica la classe dark/light all'elemento html
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <AppRouter />;
}

export default App;