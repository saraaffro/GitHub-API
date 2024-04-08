
let searchInput = document.getElementById('search-input');

async function searchRepository() {
    try {
        // effettua una richiesta GET all'endpoint di ricerca
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchInput.value}`, {
            // aggiungo il token di autorizzazione
            headers: {
                "Authorization": `Bearer ${window.config.token}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        });

        // controllo se la richiesta è andata a buon fine
        if (response.ok) {
            // se la risposta è ok, ottiengo i dati in formato JSON
            const data = await response.json();
            console.log(data);
        } else {
            // se la richiesta non è andata a buon fine, stampo un messaggio di errore sulla console con lo status code della risposta
            console.error('Errore nella richiesta:', response.status);
        }
    } catch (error) {
        // se c'è un errore durante la richiesta lo stampo in console
        console.error('Errore durante la richiesta:', error);
    }
}
