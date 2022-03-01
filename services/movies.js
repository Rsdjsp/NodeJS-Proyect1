const MovieModel = require("../models/movieModel");

class Movies {
  validate(movie) {
    const error = movie.validateSync();
    if (error) {
      const errorMessages = Object.keys(error.errors).map((e) => {
        const errorDetails = error.errors[e];
        if (errorDetails.name === "CastError") {
          return `El campo "${errorDetails.path}" debe ser: "${errorDetails.kind}"`;
        }

        return error.errors[e].message;
      });
      return { error: true, errorMessages };
    }
    return { error: false };
  }

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
    const movie = new MovieModel(data);
    const validation = this.validate(movie);

    if (validation.error) {
      return { created: false, errors: validation.errorMessages };
    }

    return await movie.save();
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
