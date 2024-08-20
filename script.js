// Set your OMDB API key here
const API_KEY = '641f4a2f';

// Function to fetch movies based on search query
async function findMovies() {
    const searchBox = document.getElementById('movie-search-box');
    const searchList = document.getElementById('search-list');
    const query = searchBox.value.trim();

    if (query.length > 0) {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === "True") {
            displaySearchResults(data.Search);
        } else {
            searchList.innerHTML = `<p>No movies found for "${query}".</p>`;
            searchList.style.display = 'block';
        }
    } else {
        searchList.innerHTML = '';
        searchList.style.display = 'none';
    }
}

// Function to display the search results
function displaySearchResults(movies) {
    const searchList = document.getElementById('search-list');
    searchList.innerHTML = '';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('search-list-item');
        movieItem.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <div class="details">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `;
        movieItem.addEventListener('click', () => {
            loadMovieDetails(movie.imdbID);
            searchList.style.display = 'none'; // Hide the search list when a movie is selected
            document.getElementById('movie-search-box').value = ''; // Clear the search box
        });
        searchList.appendChild(movieItem);
    });

    searchList.style.display = 'block';
}

// Function to fetch and display detailed movie information
async function loadMovieDetails(movieID) {
    const response = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=${API_KEY}`);
    const movieDetails = await response.json();

    const moviesPart = document.getElementById('moviesPart');
    moviesPart.innerHTML = `
        <div class="movieLeft">
            <img src="${movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'placeholder.jpg'}" alt="${movieDetails.Title}">
        </div>
        <div class="movieRight">
            <h1>${movieDetails.Title} (${movieDetails.Year})</h1>
            <div class="year">
                <h5><b>Year:</b> ${movieDetails.Year}</h5>
                <button><b>Rating:</b> ${movieDetails.Rated}</button>
                <p><b>Released:</b> ${movieDetails.Released}</p>
            </div>
            <button><b>Genre:</b> ${movieDetails.Genre}</button>
            <h1><b>Writer:</b> ${movieDetails.Writer}</h1>
            <p><b>Plot:</b> ${movieDetails.Plot}</p>
            <p class="lang"><b>Language:</b> ${movieDetails.Language}</p>
        </div>
    `;
}