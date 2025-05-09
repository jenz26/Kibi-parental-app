# Kibi - Primi Passi da Genitore

## 📝 Descrizione del Progetto

**Kibi - Primi Passi da Genitore** è una web application sviluppata come progetto finale per il corso Frontend Programming di Epicode. L'obiettivo è fornire una piattaforma di supporto completa e intuitiva per neo-genitori e futuri genitori, offrendo informazioni personalizzate, articoli educativi, e strumenti per monitorare i progressi durante la gravidanza e i primi mesi di vita del bambino.

Il progetto si focalizza sull'utilizzo di React, Redux per la gestione dello stato globale, React Router per la navigazione, e interagisce con un backend mock realizzato tramite JSON Server.

## ✨ Funzionalità Implementate

*   **Autenticazione & Ruoli Utente:**
    *   Registrazione e Login utenti con gestione della sessione (token in `localStorage`).
    *   Autenticazione simulata via `json-server`.
    *   Due ruoli utente: `user` (utente standard) e `admin` (amministratore).
*   **Routing Avanzato e Protetto:**
    *   Navigazione fluida con React Router DOM v6 (oltre 6 pagine navigabili).
    *   Route dinamica per il dettaglio degli articoli del blog (es. `/blog/:slug`).
    *   Route protette (`<ProtectedRoute />`) per utenti autenticati e route specifiche per il ruolo "admin".
    *   Gestione delle route per ospiti (es. login/registrazione non accessibili se già loggati).
*   **Dashboard Personalizzata:**
    *   Pagina di benvenuto dinamica.
    *   Widget "Progressi" che mostra informazioni rilevanti in base alla data presunta del parto o alla data di nascita del bambino inserita nel profilo utente.
    *   Sezione "Articoli per Te" con suggerimenti di lettura basati dinamicamente sugli interessi specificati dall'utente nel proprio profilo.
*   **Gestione Profilo Utente:**
    *   Stepper guidato in 3 passaggi per la creazione e la modifica del profilo.
    *   Raccolta di informazioni anagrafiche, dettagli sulla gravidanza/bambino, e preferenze utente (interessi, lingua).
    *   Salvataggio dei dati del profilo sul backend mock.
*   **Blog Interattivo:**
    *   Visualizzazione di una lista di articoli con paginazione lato client/server.
    *   Pagina di dettaglio per ogni articolo.
    *   Filtri per categoria e ricerca testuale full-text sugli articoli.
*   **Pannello di Amministrazione (Admin):**
    *   Interfaccia dedicata e protetta per gli amministratori.
    *   **Gestione Articoli (CRUD):** Creazione, lettura, modifica ed eliminazione degli articoli del blog tramite form dedicati e validati.
    *   **Gestione Utenti (CRUD):** Visualizzazione, creazione, modifica (ruolo, password opzionale) ed eliminazione degli utenti del sistema.
*   **Interfaccia Utente e UX:**
    *   **Dark Mode:** Tema scuro implementato e persistente tra le sessioni.
    *   **Responsive Design:** L'applicazione è navigabile e utilizzabile su diverse dimensioni di schermo (desktop, tablet, mobile).
    *   Navigazione mobile dedicata tramite `BottomNavigation`.
    *   Notifiche utente (toast) per feedback su azioni importanti (login, salvataggi, errori).
    *   Pulsanti "Mostra/Nascondi Password" nei form di autenticazione.
    *   Link "Password Dimenticata?" (placeholder).
    *   Modali per Termini di Servizio e Privacy Policy durante la registrazione.
    *   Scroll automatico all'inizio della pagina al cambio di rotta.
*   **Form Controllati e Validazione:**
    *   Utilizzo di React Hook Form per la gestione di tutti i form principali (login, registrazione, profilo, form articoli e utenti admin).
    *   Validazione client-side robusta tramite Yup e `yupResolver`.
    *   Gestione e visualizzazione chiara degli errori di validazione.
*   **Pagine Statiche:** Include pagine informative come Chi Siamo, Contatti, FAQ, Termini di Servizio, Privacy Policy e pagina 404 personalizzata.
*   **Internazionalizzazione (i18n):** Struttura base predisposta, ma la funzionalità non è attiva.

## 📐 Best Practices e Stack Tecnologico

Il progetto è stato sviluppato seguendo diverse best practices per garantire un codice pulito, manutenibile e scalabile:

*   **Feature-based structure:** Organizzazione modulare del codice per funzionalità.
*   **React 18+** con Componenti Funzionali e Hooks.
*   **Vite** come build tool per un'esperienza di sviluppo rapida.
*   **React Router DOM v6** (`createBrowserRouter`) per il routing.
*   **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`) per uno state management efficiente e thunk middleware per la logica asincrona e le chiamate API.
*   **Axios** per le chiamate HTTP, con un'istanza preconfigurata.
*   **React Hook Form** e **Yup** (`yupResolver`) per form robusti e validazione dichiarativa.
*   **Tailwind CSS** per l'utility-first styling, con un minimo di **SCSS** per stili globali.
*   **`clsx`** per la gestione condizionale delle classi CSS.
*   **Framer Motion** per animazioni fluide e moderne.
*   **Heroicons (`@heroicons/react`)** per un set di icone SVG di alta qualità.
*   **Headless UI (`@headlessui/react`)** per componenti UI accessibili come Modali e Transizioni.
*   **React Hot Toast** per notifiche utente non intrusive.
*   **JSON Server** come backend mock per simulare un'API RESTful.
*   **ESLint/Prettier** (configurazione base di Vite) per la qualità e la formattazione del codice.

## 🚀 Setup e Avvio del Progetto

**Prerequisiti:**
*   Node.js (v18.x o LTS raccomandata)
*   npm (v8.x o superiore) o yarn (v1.22.x o superiore)

**Installazione:**

1.  Clona il repository:
    git clone https://github.com/jenz26/Kibi-parental-app.git
    cd Kibi-parental-app

2.  Installa le dipendenze:
    npm install

**Avvio dell'Applicazione:**

1.  **Avvia JSON Server (Backend Mock):**
    In una finestra del terminale, esegui:
    npm run server
    Il server mock sarà disponibile su `http://localhost:3001`.

2.  **Avvia l'Applicazione React (Frontend):**
    In una seconda finestra del terminale, esegui:
    npm run dev
    L'applicazione React sarà disponibile su `http://localhost:3000` (o un'altra porta se la 3000 è occupata).

## 🔑 Credenziali Utente Demo

Per testare l'applicazione, puoi utilizzare le seguenti credenziali predefinite:

*   **Ruolo Amministratore:**
    *   Email: `admin@kibi.it`
    *   Password: `admin123`
*   **Ruolo Utente Standard:**
    *   Email: `laura.bianchi@example.com`
    *   Password: `password456`

È anche possibile registrare nuovi utenti tramite il form di registrazione.

## 📂 Struttura del Progetto (src/)

Il codice sorgente è organizzato per promuovere la modularità e la manutenibilità:

*   `src/`
    *   `api/`: Contiene i servizi per le chiamate API (Axios, istanze configurate).
    *   `app/`: Configurazione dello store Redux (`store.js`).
    *   `assets/`: Risorse statiche come immagini.
    *   `components/`:
        *   `common/`: Componenti UI generici e riutilizzabili (Button, Modal, InputField, ecc.).
        *   `layout/`: Componenti che definiscono la struttura principale delle pagine (MainLayout, AdminLayout, AuthLayout).
    *   `constants/`: Costanti globali usate nell'applicazione (es. `ARTICLE_CATEGORIES`, `PROFILE_STEPPER_STEPS`).
    *   `data/`: Dati statici utilizzati dall'applicazione (es. `pregnancyData.js`, `childDevelopmentData.js`).
    *   `features/`: Directory principale per l'organizzazione feature-based. Ogni feature (es. `auth`, `admin`, `blog`, `profile`) contiene i propri:
        *   `components/`: Componenti specifici della feature.
        *   `pages/`: Pagine specifiche della feature.
        *   `[featureName]Slice.js`: Slice Redux per la gestione dello stato della feature.
    *   `hooks/`: Custom Hooks riutilizzabili (es. `useAuth.js`, `useDarkMode.js`).
    *   `pages/`: Componenti di pagina che non rientrano strettamente in una "feature" o sono pagine statiche (es. `HomePage.jsx`, `AboutPage.jsx`).
    *   `routes/`: Configurazione centrale del routing dell'applicazione (`AppRouter.jsx` con `createBrowserRouter`).
    *   `schemas/`: Schemi di validazione Yup per i form.
    *   `App.jsx`: Componente radice dell'applicazione.
    *   `main.jsx`: Entry point dell'applicazione React, dove l'app viene montata nel DOM.
    *   `index.css`: Stili globali e importazioni di Tailwind CSS.

*(Per una visualizzazione dettagliata, fare riferimento all'albero delle directory fornito o esplorare il codice sorgente.)*

## 🧑‍💻 Autore

*   **Marco Contin**
*   GitHub: [@jenz26](https://github.com/jenz26)
*   LinkedIn: `[@Marco-Contin (https://www.linkedin.com/in/contin-marco-padova/)]`