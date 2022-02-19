const Movies = require("./movies");

class Filter {
  constructor() {
    this.movie = new Movies();
  }
  async rating(films) {
    const popularFilms = await films.filter((movies) => movies.rating >= 7.5);
    popularFilms.sort((a, b) => b.rating - a.rating);

    if (popularFilms.length >= 10) {
      const filterFilm = popularFilms.slice(0, 9);
      return filterFilm;
    } else {
      return popularFilms;
    }
  }
  async unpopular(films) {
    const unpopularFilms = await films.filter((movies) => movies.rating <= 6);
    unpopularFilms.sort((a, b) => a.rating - b.rating);

    if (unpopularFilms.length >= 10) {
      const filterFilm = unpopularFilms.slice(0, 9);
      return filterFilm;
    } else {
      return unpopularFilms;
    }
  }

  async premier(films) {
    const recentFilms = await films.sort((a, b) => b.date - a.date);
    if (recentFilms.length >= 10) {
      const filterFilm = recentFilms.slice(0, 9);
      return filterFilm;
    } else {
      return recentFilms;
    }
  }
}

module.exports = Filter;
