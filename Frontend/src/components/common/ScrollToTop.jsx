// src/components/common/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // o 'auto'
      });
    }, 0); 

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;