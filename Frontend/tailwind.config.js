// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A5F3FC',    // Ciano molto chiaro (per testo scuro sopra, es. dark:text-primary-light)
          DEFAULT: '#008299',  // Ciano scuro - per bg con testo bianco (Contrasto con bianco: 4.54:1)
          dark: '#083344',     // Ciano molto scuro - per bg con testo bianco o come testo su bg chiaro (Contrasto con bianco: 10.7:1)
        },
        secondary: {
          light: '#FBCFE8',    // Rosa molto chiaro (per testo scuro sopra)
          DEFAULT: '#BE185D',  // Rosa/Fucsia scuro - per bg con testo bianco (Contrasto con bianco: 5.03:1)
          dark: '#831843',     // Rosa/Fucsia molto scuro (Contrasto con bianco: 9.1:1)
        },
        neutral: {
          light: '#f3f4f6',      // Grigio molto chiaro per sfondi
          DEFAULT: '#9ca3af',    // Grigio medio (USO: come TESTO su sfondi chiari/scuri, NON come BG per testo normale)
          dark: '#374151',       // Grigio scuro (USO: come BG scuro o TESTO su sfondi chiari)
          darker: '#1f2937',     // Grigio ancora più scuro (es. per sfondi principali in dark mode)
        },
        background: {
          light: '#ffffff',
          dark: '#111827',       // Scurito per aumentare contrasto con grigi medi usati come testo
        },
        text: {
          light: '#111827',      // Grigio quasi nero per testo in light mode
          dark: '#f3f4f6',       // Grigio chiaro (quasi bianco) per testo principale in dark mode
          'muted-light': '#6b7280', // Grigio scuro per testo secondario/muted in light mode
          'muted-dark': '#a1a1aa',  // Grigio più chiaro per testo secondario/muted in dark mode (su bg-background-dark)
        },
        // Aggiungi questi se li usi letteralmente in ArticleCard e non sono già definiti altrove
        // pink: {
        //   100: '#FCE7F3',
        //   800: '#9D174D',
        // },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
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