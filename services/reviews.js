const CommentModel = require("../models/commentsModel");

class Reviews {
  async create(review) {
    const comments = await CommentModel.create(review);
    return comments;
  }

  async getAll() {
    const comments = await CommentModel.find();
    return comments;
  }

  async getOne(reviewId) {
    const comments = await CommentModel.findById(reviewId);
    return comments;
  }

  async update(reviewId, userId, id, data) {
    const comments = await CommentModel.findById(reviewId);

    if (comments.creator === userId && id === comments.movieId) {
      const review = CommentModel.findByIdAndUpdate(reviewId, data, {
        new: true,
      });
      return review;
    } else {
      return {
        status: "error",
        message: "You aren't the creator of this review",
      };
    }
  }
  async delete(reviewId, userId, id) {
    const comments =  await CommentModel.findById(reviewId);

    if (comments.creator === userId && id === comments.movieId) {
      const review = CommentModel.findByIdAndDelete(reviewId);
      return review;
    } else {
      return {
        status: "error",
        message: "You aren't the creator of this review",
      };
    }
  }
}

module.exports = Reviews;
