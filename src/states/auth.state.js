import { defineStore } from 'pinia'
import {
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    signOut,
    signInWithPopup
} from 'firebase/auth'

import { 
    useFirebaseAuth,
    useCurrentUser 
} from 'vuefire'

/**
 * @module stores/auth
 */

/**
 * Gestisce lo stato e le azioni di autenticazione dell'utente utilizzando Firebase.
 * @exports useAuthState
 * @type {import('pinia').StoreDefinition<'auth', {user: import('firebase/auth').User | null, auth: import('firebase/auth').Auth, provider: typeof GoogleAuthProvider, loading: {[key: string]: boolean}, error: {[key: string]: any}}, {}, {redirectSign(): Promise<void>, getRedirectSign(): Promise<void>, logout(): Promise<void>}>}
 */
export const useAuthState = defineStore('auth', {
    /**
    * Lo stato dello store di autenticazione.
    * @returns {{
    * user: import('firebase/auth').User | null,
    * auth: import('firebase/auth').Auth,
    * provider: typeof GoogleAuthProvider,
    * loading: {[key: string]: boolean},
    * error: {[key: string]: any}
    * }}
    */
    state: () => ({
        /**
        * L'oggetto utente di Firebase se l'utente è autenticato, altrimenti null.
        * @type {import('firebase/auth').User | null}
        */
        user: null,
        /**
        * L'istanza del servizio di autenticazione di Firebase.
        * @type {import('firebase/auth').Auth}
        */
        auth: useFirebaseAuth(),
        /**
        * Il provider di autenticazione di Google.
        * @type {typeof GoogleAuthProvider}
        */
        provider: new GoogleAuthProvider(),
        /**
        * Oggetto per tracciare lo stato di caricamento delle azioni asincrone.
        * La chiave è il nome dell'azione.
        * @type {{[key: string]: boolean}}
        */
        loading: {

        },
        /**
        * Oggetto per memorizzare gli errori che si verificano durante le azioni asincrone.
        * La chiave è il nome dell'azione.
        * @type {{[key: string]: any}}
        */
        error: {

        },
    }),

    getters: {
        /**
        * Inizializza il listener per i cambiamenti dello stato di autenticazione.
        * Da chiamare all'avvio dell'applicazione (es. in App.vue).
        */
        isLoggedIn(state) {
            return state.user;
        },
    },
    actions: {
        /**
        * Inizia il processo di autenticazione reindirizzando l'utente alla pagina di login di Google.
        * @async
        * @returns {Promise<void>} Una promessa che si risolve quando il reindirizzamento è stato avviato.
        */
        async signIn() {
            this.loading['signIn'] = true;
            try {
                const result = await signInWithPopup(this.auth, this.provider)
                this.user = result?.user;
            } catch (e) {
                this.error['signIn'] = e;
            } finally {
                this.loading['signIn'] = false;
            }
        },
        /**
         * Gestisce il risultato del reindirizzamento dopo che l'utente è tornato dall'autenticazione con Google.
         * Estrae le credenziali dell'utente e aggiorna lo stato dello store.
         * @async
         * @returns {Promise<void>} Una promessa che si risolve quando i dati dell'utente sono stati recuperati e lo stato aggiornato.
         */
        async getRedirectSign() {
            this.loading['getRedirectSign'] = true;
            try {
                const result = await getRedirectResult(this.auth)
                this.user = result?.user;
            } catch (e) {
                console.log(e)
                this.error['getRedirectSign'] = e;
            } finally {
                this.loading['getRedirectSign'] = false;
            }
        },

        /**
         * Esegue il logout dell'utente corrente.
         * Cancella i dati dell'utente dallo stato dello store.
         * @async
         * @returns {Promise<void>} Una promessa che si risolve quando il logout è stato completato.
         */
        async logout() {
            this.loading['logout'] = true;
            try {
                await signOut(this.auth);
                this.user = null;
            } catch (e) {
                this.error['logout'] = e;
            } finally {
                this.loading['logout'] = false;
            }
        }

    }
})