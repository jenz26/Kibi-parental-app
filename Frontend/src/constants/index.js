export const APP_NAME = import.meta.env.VITE_APP_NAME || "Kibi";

export const LOCAL_STORAGE_TOKEN_KEY = 'kibi_token';
export const LOCAL_STORAGE_DARK_MODE_KEY = 'kibi_dark_mode';

export const BLOG_ARTICLES_PER_PAGE = 6;
export const ADMIN_USERS_PER_PAGE = 10;
export const ADMIN_ARTICLES_PER_PAGE = 10;

export const PROFILE_STEPPER_STEPS = [
  { id: 'step1', name: 'Dati Genitore' },
  { id: 'step2', name: 'Info Gravidanza/Bambino' },
  { id: 'step3', name: 'Interessi' },
];

export const INTEREST_OPTIONS = [
    { value: 'sonno', label: 'Sonno del bambino' },
    { value: 'svezzamento', label: 'Svezzamento e Alimentazione' },
    { value: 'sviluppo_motorio', label: 'Sviluppo Motorio' },
    { value: 'sviluppo_cognitivo', label: 'Sviluppo Cognitivo' },
    { value: 'giochi_attivita', label: 'Giochi e Attività' },
    { value: 'salute_benessere', label: 'Salute e Benessere del bambino' },
    { value: 'allattamento', label: 'Allattamento' },
    { value: 'cura_neonato', label: 'Cura del Neonato' },
    { value: 'sicurezza_bambino', label: 'Sicurezza del Bambino' },
    { value: 'post_partum', label: 'Post-Partum per la mamma' },
    { value: 'relazione_coppia', label: 'Relazione di Coppia post-nascita' },
    { value: 'viaggi_famiglia', label: 'Viaggi in Famiglia' },
];

export const ARTICLE_CATEGORIES = [
    { value: 'Sonno', label: 'Sonno' },
    { value: 'Alimentazione', label: 'Alimentazione' },
    { value: 'Sviluppo', label: 'Sviluppo' },
    { value: 'Benessere', label: 'Benessere' },
    { value: 'Giochi', label: 'Giochi' },
    { value: 'Viaggi', label: 'Viaggi' },
    { value: 'Salute', label: 'Salute' },
    { value: 'Genitorialità', label: 'Genitorialità' },
    { value: 'Notizie', label: 'Notizie e Aggiornamenti' }
];