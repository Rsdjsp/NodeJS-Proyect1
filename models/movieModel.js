const { mongoose } = require("../database/conection")

const { Schema } = mongoose

const movieSchema = new Schema({
    title: String,
    poster: String,
    background: String,
    review: String,
    date: Date,
    rating: Number,
    movie_id: Number,
    language: String,
    creator: String
})


const MovieModel = mongoose.model("movies&series", movieSchema)

module.exports = MovieModel