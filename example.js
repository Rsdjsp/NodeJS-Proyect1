const movies = require("./modelmovies");

const newMovies = [];
const img_url = "https://image.tmdb.org/t/p/original/";

const results = movies.map((movie) => {
  return {
    title: movie.title,
    poster: img_url + movie.poster_path,
    background: img_url + movie.backdrop_path,
    review: movie.overview,
    date: movie.release_date,
    rating: movie.vote_average,
    movie_id: movie.id,
    language: movie.original_language,
  };
});

newMovies.push(...results);

console.log(newMovies);
