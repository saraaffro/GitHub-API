
let searchInput = document.getElementById('search-input');
let searchTypeSelect = document.getElementById('searchType');

async function search() {
    let searchType = searchTypeSelect.value;

    try {
        let data;
        if (searchType === 'repositories') {
            data = await searchRepositories();
        } else if (searchType === 'users') {
            data = await searchUsers();
        }

        displayResults(data, searchType);
    } catch (error) {
        console.error('Errore durante la richiesta:', error);
    }
}

async function searchRepositories() {
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
            let data = await response.json();
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

async function searchUsers() {
    const response = await fetch(`https://api.github.com/search/users?q=${searchInput.value}`, {
        headers: {
            "Authorization": `Bearer ${window.config.token}`,
            "X-GitHub-Api-Version": "2022-11-28"
        }
    });

    if (response.ok) {
        let data = await response.json();
        console.log(data);
        displayResults(data);
    } else {
        throw new Error(`Errore nella richiesta: ${response.status}`);
    }
}

function displayResults(data, searchType) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    data.items.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');
        card.classList.add('mb-4');

        let cardContent = '';

        if (searchType === 'repositories') {
            cardContent = `
                <h5 class="card-title">${result.name}</h5>
                <p class="card-text">${result.description}</p>
            `;
        } else if (searchType === 'users') {
            cardContent = `
                <h5 class="card-title">${result.login}</h5>
                <p class="card-text">Type: ${result.type}</p>
            `;
        }

        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    ${cardContent}
                    <a href="${result.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
                </div>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
}
