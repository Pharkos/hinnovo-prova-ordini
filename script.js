// Prova pratica comune (30–40 minuti, linguaggio a scelta):
//  crea una funzione che riceva ordini con ID, importo e stato e RESTITUISCA
// la somma degli importi validi degli ordini “pagato” e il numero degli ordini conteggiati.
// Escludi “annullato” e “in_attesa”; gestisci importi decimali, ID/stati mancanti e valori invalidi
// senza errori. Includi almeno due test con input, esito atteso e reale e una breve spiegazione.
//È ammessa la documentazione, ma NON l’uso di assistenti AI per questa specifica prova.
// Inviaci repository/ZIP con istruzioni.

// ------------------------------------------------------------------------------------------

// Passo 1 Creiamo tre array contenenti oggetti sui quali lavoreremo e faremo i test

const ordiniValidi = [
  { id: 101, amount: 50.5, status: "pagato" },
  { id: 102, amount: 30.25, status: "pagato" },
  { id: 103, amount: 20, status: "pagato" },
];

const ordiniMisti = [
  { id: 201, amount: 100, status: "pagato" },
  { id: 202, amount: 50, status: "annullato" },
  { id: 203, amount: 75.5, status: "in_attesa" },
  { id: 204, amount: 25.25, status: "pagato" },
  { id: 205, amount: 10, status: "annullato" },
];

const ordiniProblematici = [
  { id: 301, amount: 40.5, status: "pagato" },
  { id: 302, amount: "50", status: "pagato" },
  { id: 303, amount: 30, status: "annullato" },
  { amount: 25, status: "pagato" },
  { id: 305, status: "pagato" },
  { id: 306, amount: 15, status: "in_attesa" },
  { id: 307, amount: NaN, status: "pagato" },
  null,
  "Ordine non valido",
  123,
  { id: 311, amount: 0, status: "pagato" },
  { id: 312, amount: 20.75 },
];

// Passo 2 Creiamo una funzione che riceve un array come parametro .
// Funzione principale per calcolare il totale degli ordini pagati e il loro numero .

const calculatePaidOrders = function (orders) {
  // prima di tutto verificiamo se input e' un array

  if (Array.isArray(orders)) {
    let totalAmount = 0;
    let ordiniTotale = 0;

    // uttiliziamo il loop For a ciclare ed a capire se gli ellementi in questo array sono gli Ogetti

    for (let i = 0; i < orders.length; i++) {
      if (
        typeof orders[i] === "object" &&
        orders[i] !== null &&
        !Array.isArray(orders[i])
      ) {
        // qui controlliamo se nel nostro ogetto orders[i] << abbiamo lo status Pagato possiamo
        // verificare gli altri dati ID / Amount

        if (orders[i].status === "pagato") {
          if (
            orders[i].id === undefined ||
            orders[i].id === null ||
            orders[i].id === "" ||
            // con questo methodo Javacript Riusciamo a verificare il dato e un numero oppure no
            // methodo lavora anche con i decimali
            Number.isFinite(orders[i].amount) === false
          ) {
            // nel caso troviamo Undefiened oppure Null il programma va comunque avanti
            // utilizziamo Continue ;
            continue;
          }
          {
            // atrimenti iniziamo a fare il calcolo degli ordini con lo status "Pagato"
            // fuori dal For pero dentro nel if abbiamo creato due variabili
            // totalAmount , Count --- ed ora faremo il calcolo

            totalAmount += orders[i].amount;
            ordiniTotale++;
          }
        }
      }
    }

    return {
      totalAmount: totalAmount,
      count: ordiniTotale,
    };
  } else {
    return "L'input non e' valido";
  }
};

// Test 1 passiamo alla nostra funzione Array Con I dati validi
// L'output Previsto sarebbe -- Totale : 100.75 , Totale Ordini: 3

console.log(calculatePaidOrders(ordiniValidi)); // L'output Come Previsto  Totale : 100.75 , Totale Ordini: 3

// Test 2 passiamo alla nostra funzione Array Con I dati misti //
// vediamo se il nostro controllo funziona e la funzione fa il calcolo solo sui prodotti con lo status "pagato"
// L'output Previsto sarebbe -- Totale : 125.25 , Totale Ordini: 2

console.log(calculatePaidOrders(ordiniMisti)); // L'output Come Previsto  Totale : 125.25 , Totale Ordini: 2

// Test 3 passiamo alla nostra funzione Array Con I dati Problematici //
// vediamo se il nostro controllo funziona non si blocca e fa passare solo i dati validi con lo status "pagato"
// L'output Previsto sarebbe -- Totale : 40.5 , Totale Ordini: 2
//  viene Contato anche { id: 311, amount: 0, status: "pagato" }, Amount 0 ...

console.log(calculatePaidOrders(ordiniProblematici)); // L'output Come Previsto  Totale : 40.5 , Totale Ordini: 2
