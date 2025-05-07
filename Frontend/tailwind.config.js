/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Abilita il dark mode basato su una classe sull'elemento html
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#67e8f9', // Un ciano più chiaro per il tema light
          DEFAULT: '#06b6d4', // Ciano standard
          dark: '#0e7490',  // Un ciano più scuro per accenti
        },
        secondary: {
          light: '#f9a8d4', // Un rosa più chiaro
          DEFAULT: '#f472b6', // Rosa standard
          dark: '#db2777',   // Un rosa più scuro
        },
        neutral: {
          light: '#f3f4f6', // Grigio molto chiaro per sfondi
          DEFAULT: '#9ca3af', // Grigio medio
          dark: '#374151',   // Grigio scuro per testo o sfondi in dark mode
        },
        background: {
          light: '#ffffff',
          dark: '#1f2937', // Grigio scuro per lo sfondo in dark mode
        },
        text: {
          light: '#111827', // Grigio quasi nero per testo in light mode
          dark: '#f3f4f6',   // Grigio chiaro per testo in dark mode
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Puoi aggiungere un font personalizzato qui
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}