
## Setup e Installazione

1.  **Clonare il Repository:**
    ```bash
    git clone [Link al tuo repository]
    cd Kibi-parental-app/Frontend
    ```

2.  **Installare le Dipendenze:**
    Assicurati di avere Node.js (consigliata versione LTS) e npm/yarn installati.
    ```bash
    npm install
    # oppure
    yarn install
    ```

3.  **Configurare Variabili d'Ambiente:**
    Crea un file `.env` nella root della cartella `Frontend/` basandoti su `.env.example` (se esiste) o definendo le variabili necessarie. Principalmente l'URL base dell'API:
    ```env
    VITE_API_BASE_URL=http://localhost:3001
    VITE_APP_NAME="Kibi"
    ```

4.  **Preparare il Backend (JSON Server):**
    *   Assicurati che il file `db.json` (o come lo hai chiamato) sia presente nella root del progetto (o dove `json-server` lo cerca). Questo file contiene i dati mock per utenti, articoli, profili, ecc.
    *   *Nota: `db.json` solitamente non viene committato se contiene dati sensibili o è molto grande. Potrebbe essere necessario crearlo o popolarlo inizialmente.*

## Esecuzione dell'Applicazione

Per eseguire l'applicazione in modalità sviluppo, è necessario avviare **sia** il server di sviluppo frontend (Vite) **sia** il backend mock (JSON Server) **in terminali separati**.

1.  **Avviare JSON Server:**
    Apri un terminale nella root del progetto (dove si trova `db.json`) ed esegui:
    ```bash
    json-server --watch db.json --port 3001
    ```
    *   `--watch db.json`: Monitora il file `db.json` per cambiamenti.
    *   `--port 3001`: Esegue il server sulla porta 3001 (assicurati che corrisponda a `VITE_API_BASE_URL`).

2.  **Avviare il Server di Sviluppo Frontend (Vite):**
    Apri un **secondo** terminale nella cartella `Frontend/` ed esegui:
    ```bash
    npm run dev
    # oppure
    yarn dev
    ```
    L'applicazione sarà accessibile all'indirizzo indicato nel terminale (solitamente `http://localhost:3000` o `http://localhost:5173`).

## Build di Produzione

Per creare una build ottimizzata per la produzione:

1.  **Eseguire il Build:**
    ```bash
    npm run build
    # oppure
    yarn build
    ```
    Questo creerà una cartella `dist` con i file statici ottimizzati.

2.  **Preview della Build (Opzionale):**
    Per testare localmente la build di produzione:
    ```bash
    npm run preview
    # oppure
    yarn preview
    ```
    Questo avvierà un server locale che serve la cartella `dist`.

## Note Aggiuntive

*   **State Management:** Lo stato globale è gestito con Redux Toolkit. Ogni "feature" ha il suo slice (`features/*/authSlice.js`, `features/*/blogSlice.js`, ecc.) che definisce reducer e azioni (incluse quelle asincrone con `createAsyncThunk`). Lo store è configurato in `app/store.js`.
*   **API Calls:** Le chiamate API sono centralizzate nei file di servizio dentro `src/api/` (es. `authService.js`, `articleService.js`) che utilizzano un'istanza Axios preconfigurata (`src/api/axiosInstance.js`) che probabilmente imposta il `baseURL` da `.env`.
*   **Styling:** Principalmente Tailwind CSS per utility classes. Potrebbero esserci stili SCSS/CSS globali o specifici per componenti in `index.css` o `App.css`.
*   **Routing:** Utilizza React Router v6 con `createBrowserRouter` in `src/routes/AppRouter.jsx`. Definisce layout diversi (`MainLayout`, `AuthLayout`, `AdminLayout`) per diverse sezioni dell'app e usa componenti `ProtectedRoute` e `GuestRoute` per la protezione delle route basata sull'autenticazione e sui ruoli.

---

Spero questo README sia un buon punto di partenza! Puoi aggiungere dettagli specifici (es. struttura esatta del `db.json`, esempi di API endpoint usati, librerie minori che potrei aver dimenticato) o sezioni che ritieni utili. In bocca al lupo per l'esame!