import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_DARK_MODE_KEY } from '../constants';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem(LOCAL_STORAGE_DARK_MODE_KEY);
    if (storedPreference !== null) {
      return JSON.parse(storedPreference);
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem(LOCAL_STORAGE_DARK_MODE_KEY, JSON.stringify(true));
    } else {
      root.classList.remove('dark');
      localStorage.setItem(LOCAL_STORAGE_DARK_MODE_KEY, JSON.stringify(false));
    }
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem(LOCAL_STORAGE_DARK_MODE_KEY) === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return [isDarkMode, toggleDarkMode];
};