# Presenze Giornaliere

> Un'applicazione per la gestione e il monitoraggio delle presenze e delle attività lavorative giornaliere.

## 📜 Descrizione Generale

Questo progetto è un'applicazione web costruita con Vue.js che permette agli utenti di tracciare le proprie attività lavorative. Dopo essersi autenticati tramite Google, gli utenti possono registrare diverse tipologie di eventi (come ore di lavoro, ferie, malattia) su un calendario interattivo. L'applicazione mostra un riepilogo delle attività del giorno selezionato e calcola il totale delle ore lavorate nel mese, offrendo un'interfaccia semplice e reattiva per la gestione delle presenze.

## ✨ Funzionalità Principali

  * **Autenticazione Sicura:** Login rapido e sicuro tramite account Google, gestito con Firebase Authentication.
  * **Calendario Interattivo:** Visualizzazione mensile delle attività registrate, con indicatori colorati per ogni categoria di evento.
  * **Registrazione Attività:** Un pratico modulo permette di inserire nuove attività, specificando categoria (lavoro, ferie, malattia, ecc.), ora di inizio e fine.
  * **Riepilogo Mensile:** Calcolo automatico e visualizzazione del totale delle ore lavorate nel mese corrente.
  * **Gestione Attività:** Visualizzazione, modifica e cancellazione delle attività inserite per ogni giornata.

## 🚀 Prerequisiti

  * **Linguaggio di programmazione:** Node.js
  * **Package Manager:** npm
  * **Firebase:** È necessario un progetto Firebase configurato per utilizzare l'autenticazione e il database Firestore.
  * **Variabili d'ambiente:** È richiesto un file `firebase.js` (o una configurazione equivalente) per le credenziali di Firebase. Basandosi sul file `.gitignore` e l'uso di Firebase in tutto il codice, questo file è fondamentale.
      * Crea un file in `src/assets/firebase.js` con la configurazione del tuo progetto Firebase. Il contenuto dovrebbe essere simile a questo:
        ```javascript
        // Importa le funzioni necessarie
        import { initializeApp } from "firebase/app";
        // TODO: Aggiungi qui la configurazione del tuo progetto Firebase
        const firebaseConfig = {
          apiKey: "LA_TUA_API_KEY",
          authDomain: "IL_TUO_AUTH_DOMAIN",
          projectId: "IL_TUO_PROJECT_ID",
          storageBucket: "IL_TUO_STORAGE_BUCKET",
          messagingSenderId: "IL_TUO_MESSAGING_SENDER_ID",
          appId: "IL_TUO_APP_ID"
        };

        // Inizializza Firebase
        const firebaseApp = initializeApp(firebaseConfig);

        export default firebaseApp;
        ```

## ⚙️ Installazione

Fornisci una sequenza di comandi numerata e chiara che un utente deve eseguire per mettere in funzione il progetto.

1.  **Clona il repository:**
    ```bash
    git clone https://github.com/federicoferrulli/presenza-giornaliere.git
    cd presenza-giornaliere
    ```
2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```
3.  **Configurazione dell'ambiente:**
    Crea il file `src/assets/firebase.js` come descritto nella sezione "Prerequisiti" e inserisci le credenziali del tuo progetto Firebase.

## ▶️ Esecuzione e Utilizzo

  * **Avviare l'applicazione in modalità sviluppo:**
    Il seguente comando avvierà un server di sviluppo con hot-reload.
    ```bash
    npm run dev
    ```
  * **Esempi di utilizzo:**
    Una volta avviata l'applicazione, apri il browser all'indirizzo `http://localhost:5173` (o quello indicato nel terminale).
    1.  Effettua il login cliccando su "Continua con Google".
    2.  Verrai reindirizzato alla homepage, dove vedrai un calendario.
    3.  Clicca su un giorno e poi sul pulsante `+` per aggiungere una nuova attività.
    4.  Compila il form specificando la categoria e, se necessario, l'orario di inizio e fine.
    5.  Le attività verranno visualizzate nella lista a destra e come indicatori nel calendario.

## 📂 Struttura del Progetto

```
presenza-giornaliere/
├── public/           # File statici
├── src/              # Codice sorgente principale
│   ├── assets/       # Asset come CSS e il file di configurazione di Firebase
│   ├── components/   # Componenti Vue riutilizzabili (es. addEvent.vue)
│   ├── router/       # Configurazione del routing dell'applicazione
│   ├── states/       # Gestione dello stato con Pinia (es. responsive.state.js)
│   ├── views/        # Componenti Vue che rappresentano le pagine (login, homepage)
│   ├── App.vue       # Componente radice dell'applicazione
│   └── main.js       # File di entrypoint dell'applicazione
├── .gitignore        # File ignorati da Git
├── index.html        # Template HTML principale
├── package.json      # Dipendenze e script del progetto
└── README.md         # Questo file
```

