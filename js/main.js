const arrows = document.querySelectorAll(".movie_list_arrow");
const movieLists = document.querySelectorAll(".movie_list");

arrows.forEach((movie_list_arrow,i)=>{
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    movie_list_arrow.addEventListener("click", function() {
        const ratio = Math.floor(window.innerWidth / 290);
        clickCounter++;
        if(itemNumber - (4 + clickCounter) + (4 - ratio)  >= 0) {
            movieLists[i].style.transform = `translate(${
                movieLists[i].computedStyleMap().get("transform")[0].x.value
            -290}px)`;           
        }
        else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
        
    })

})

function clearSearch() {
    document.getElementById('searchInput').value = '';
}


document.addEventListener('DOMContentLoaded', () => {
    const movieTitleElement = document.getElementById('movie-title');
    const moviePosterElement = document.getElementById('movie-poster');
    const movieDescriptionElement = document.getElementById('movie-description');

    const apiKey = 'd58c0f73'; 

    function fetchMovieData(movieName) {
        axios.get(`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`)
            .then(response => {
                const movieData = response.data;
                if (movieData.Response === 'True') {
                    movieTitleElement.textContent = movieData.Title;
                    moviePosterElement.src = movieData.Poster;
                    movieDescriptionElement.textContent = movieData.Plot;
                } 
                else {
                    movieTitleElement.textContent = 'Movie not found';
                    moviePosterElement.src = ''; 
                    movieDescriptionElement.textContent = '';
                }
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
                movieTitleElement.textContent = 'Error fetching movie data';
            });
    }

    window.searchMovie = function() {
        const searchInput = document.getElementById('searchInput').value;
        if (searchInput) {
            fetchMovieData(searchInput);
            clearSearch();
        } else {
            alert('Please enter a movie name');
        }
    };
    
});

function paymentAlert() {
    alert('Pay to Watch');
}
