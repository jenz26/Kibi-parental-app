Kibi – Primi Passi da Genitore
Una piattaforma React dedicata a supportare i neogenitori nel viaggio della genitorialità, offrendo articoli, risorse personalizzate, consigli e una community in crescita.

Tecnologie Utilizzate

React 18 + Vite

Redux Toolkit + Redux Thunk

React Router v6

json-server

TailwindCSS

Framer Motion

Yup + React Hook Form

Axios

Struttura del Progetto
Organizzazione modularizzata secondo la Feature-Based Architecture:

src/

api/ → Gestione chiamate API

app/ → Redux store

assets/ → Immagini e risorse

components/ → UI riutilizzabili

constants/ → Costanti globali

data/ → Dati fissi

features/ → auth, admin, blog, profilo

hooks/ → Custom hook

pages/ → Pagine pubbliche

routes/ → Routing centrale

schemas/ → Validazione Yup

main.jsx → Entry point


Autenticazione & Ruoli

Login simulato via json-server

Rotte protette con <ProtectedRoute />

Ruoli supportati: user e admin


Funzionalità Implementate

Almeno 6 pagine (Home, Blog, Profilo, ecc.)

Rotta dinamica: /blog/:id

Login + Registrazione

Stepper Profilo in 3 step

Filtri Blog

Form CRUD articoli (admin)

Stato globale con Redux + fetch asincrono

📐 Best Practices Implementate
✔ Feature-based structure – organizzazione scalabile
✔ Redux Toolkit – meno boilerplate, maggiore leggibilità
✔ Thunk middleware – async logic elegante
✔ Componenti riutilizzabili – UI consistente
✔ Validazione con Yup – sicurezza e modularità nei form
✔ Routing protetto – sicurezza e UX migliorata
✔ Tailwind + Framer Motion – UI moderna e animata
✔ Naming chiaro – leggibilità elevata

▶️ Come Avviare il Progetto

npm install

npm run server → json-server su http://localhost:3001

npm run dev → Vite su http://localhost:3000

🔮 Estensioni Future

Autenticazione reale con Firebase/Auth0

Modalità scura persistente

Notifiche push intelligenti

Area community/forum

🧠 Autore
Marco Contin
Corso Front-end Programming – A.A. 2024/2025
Epicode