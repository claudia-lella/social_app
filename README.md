
# SocialApp
Questa è la parte Front End di un esercizio complesso. Per la parte Back End e DB:  https://github.com/claudia-lella/social-service

## Server di sviluppo

Esegui `ng serve` per avviare l'applicazione su un server di sviluppo. Passare a `http://localhost:4200/`. L'applicazione si ricaricherà automaticamente se modifichi uno qualsiasi dei file sorgente.

## TRACCIA ESERCIZIO

**DESCRIZIONE INCARICO**

Viene commissionata al team, la realizzazione di una piattaforma di interazione  sociale (su modello Facebook) attraverso la quale, Utenti registrati, possano stringere rapporti di amicizia, pubblicare i propri post ed interagire con altri Utenti.

**FUNZIONALITA' PRIMARIE RICHIESTE**

**Registrazione e Login Utente:**
Per poter accedere alla piattaforma, un Utente dovrà registrare il proprio profilo iniziale indicando nome e cognome, indirizzo mail, nickname e password. I dati dovranno essere soggetti a validazione generale e, i nickname, dovranno essere univoci. L'accesso alla piattaforma sarà soggetto a login e dovrà essere implementato un sistema di protezione Front-Back basato su token autorizzativo.

**Gestione Profilo Utente**
Ciascun Utente dovrà avere la possibilità di caricare un'immagine per il proprio profilo e potrà modificare i suoi dati personali ad eccezione del nickname scelto in fase di registrazione; l'immagine profilo, opzionalmente caricata, potrà essere modificata ma non rimossa.

**Pubblicazione Post Utente** 
Ciascun Utente potrà pubblicare post comprensivi di contenuto testuale e di un'eventuale immagine; una volta pubblicato, non sarà facoltà dell'Utente, modificare o eliminare il suo post.

**Likes e Commenti Post**
Ciascun Utente potrà apporre un solo “like” ad un post pubblicato da altri o da se stesso e potrà commentare (senza limiti) un post proprio o di altri Utenti; like e commenti dovranno essere riconducibili all'Utente che li ha apposti.

**Interazione tra Utenti**
Ciascun Utente, ricercando tra i “registrati” alla piattaforma, potrà inviare “richieste di amicizia” ad altri Utenti; ogni richiesta potrà essere accettata o rifiutata dall'Utente ricevente e, colui che l'ha inviata, potrà ritirarla sino a quando non ancora accettata. Ciascun Utente, nell'apposita “sezione notizie”, potrà visualizzare i suoi post oltre ai post di altri Utenti con cui ha “rapporti di amicizia” confermati.

**Logout e Disiscrizione**
Ciascun Utente dovrà poter effettuare il logout dalla piattaforma e dovrà poter cancellare il proprio profilo. La cancellazione del profilo di un Utente, comporterà la cancellazione di tutte le attività riconducibili allo stesso nell'ambito della piattaforma.

**Upgrade a Profilo Business**
Dovrà essere data facoltà, a ciascun Utente registrato, di passare dall'originario profilo “Private” ad un profilo “Business”. Tale upgrade, offrirà all'Utente una seconda area riservata attraverso la quale poter sottoscrivere delle campagne promozionali mirate alla maggior diffusione dei suoi post.

**Area Utente Business**
In tale sezione, ciascun Utente con profilo “Business” potrà visualizzare un riepilogo dei suoi post pubblicati. Selezionando uno specifico post, egli potrà scegliere tra una delle tipologie di campagne promozionali proposte, impostarne data di inizio e fine oltrechè un budget giornaliero. Sottoscrivendo la campagna, otterrà un riepilogo della stessa ed un “risultato prestazionale stimato della campagna”. Nella medesima sezione, l'Utente potrà visualizzare l'elenco delle campagne sottoscritte e lo stato di
ciascuna (Attiva, Programmata, Terminata).

**Gestione Campagne**
Il progetto non richiede implementazione di una “dashboard amministratore” e pertanto, le tipologie di campagne pubblicitarie opzionabili dagli “Utenti Business”, verranno gestite direttamente a livello di database MySql (inserimenti diretti in tabella dedicata).

## Team
**Front End:**
Claudia Lella, Felice Lafiandra
**Back End**
Claudia Lella, Felice Lafiandra, Serena Fedeli, Emmanuele Di Franco, Leonardo Ruta, Eleonora Pica, Anisa Baruti, Filippo Dentale, Stefano Giovannelli
**Database**
Claudia Lella, Felice Lafiandra, Serena Fedeli, Emmanuele Di Franco, Leonardo Ruta, Eleonora Pica, Anisa Baruti, Filippo Dentale, Stefano Giovannelli

_Questo esercizio è stato eseguito all'interno del corso di Generation Italy con l'affiancamento di Accademia del Levante. Ogni diritto è riservato._

