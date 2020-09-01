let apiKey = 'HA1QUsOyWBIqFer1D3LFuejw7FecBUn9EfmpCbyA';
let endpoint = 'https://developer.nps.gov/api/v1/parks';

function watchForm() {
    $('form').submit((event) => {
        event.preventDefault();
        const searchTerm = $('.state-input').val().replace(/\s+/g, '');
        const maxResults = $('#js-max-results').val();
        getResults(searchTerm, maxResults);
    });
}

function getResults(searchTerm, maxResults) {
    $('.results-wrapper').empty();

    const params = {
        stateCode: searchTerm,
        limit: maxResults,
        api_key: apiKey,
    };

    const queryString = $.param(params);
    const url = endpoint + '?' + queryString;

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then((responseJson) => displayResults(responseJson))
        .catch((err) => console.log(err.message));
}

function displayResults(responseJson) {
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results-wrapper').append(`
            <li class="park">
                <h3 class="park-name">${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <a href="http://">${responseJson.data[i].url}</a>
            </li>`);
    }
}

$(watchForm);
