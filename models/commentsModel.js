const { mongoose } = require('../database/conection')

const { Schema } = mongoose

const commentSchema = new Schema({
    comment: String,
    creator: String,
    date: Date,
    movieId: String
})

const CommentModel = mongoose.model("comment", commentSchema)

module.exports = CommentModel
