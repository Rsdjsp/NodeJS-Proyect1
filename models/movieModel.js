const { mongoose } = require("../database/conection");

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es requerido"],
    // unique:true,
    trim: true,
  },
  poster: String,
  background: String,
  review: String,
  date: Date,
  rating: {
    type: Number,
    default: 0,
    min: [0, "El rating mínimo es 0, se ingresó: {VALUE}"],
    max: [5, "El rating máximo es 5, se ingresó: {VALUE}"],
  },
  movie_id: Number,
  language: String,
  creator: String,
});

const MovieModel = mongoose.model("movies&series", movieSchema);

module.exports = MovieModel;
