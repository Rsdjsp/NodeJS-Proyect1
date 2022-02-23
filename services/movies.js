const MovieModel = require("../models/movieModel");

class Movies {
  async get(id) {
    const movie = await MovieModel.findById(id);
    return movie;
  }

  async getAll() {
    // find devuelve varios elementos
    const movies = await MovieModel.find();
    return movies;
  }

  async create(data) {
    try {
      const movie = await MovieModel.create(data);
      return movie;
    } catch (error) {
      const details = error.errors.rating;
      return {
        created: false,
        message: `El valor '${details.value}' es invalido en ${details.path}`,
      };
    }
  }

  async update(id, data, userId) {
    const film = await MovieModel.findById(id);
    console.log(film);
    if (film.creator === userId) {
      const movie = await MovieModel.findByIdAndUpdate(id, data, { new: true });
      return { status: "succsess", message: "movie updated successfully" };
    } else {
      return {
        status: "error",
        message: "You aren't the movie creator",
      };
    }
  }

  async delete(id, userId) {
    const film = await MovieModel.findById(id);
    if (film.creator === userId) {
      const movie = await MovieModel.findByIdAndDelete(id);
      return { status: "succsess", message: "movie deleted successfully" };
    } else {
      return {
        status: "error",
        message: "You aren't the movie creator",
      };
    }
  }
}

module.exports = Movies;
