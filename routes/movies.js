const express = require("express");
const { isEditor } = require("../middleware/auth");
const Movies = require("../services/movies");
const Reviews = require("../services/reviews");

function movies(app) {
  const router = express.Router();
  const moviesService = new Movies();
  const reviewService = new Reviews();
  app.use("/movies", router);

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const movie = await moviesService.get(id);
    return res.status(200).json(movie);
  });
  router.get("/", async (req, res) => {
    const movies = await moviesService.getAll();
    return res.status(200).json(movies);
  });
  router.post("/", isEditor, async (req, res) => {
    const { userId } = req.cookies;
    req.body.creator = userId;
    const movie = await moviesService.create(req.body);
    return res.status(201).json(movie);
  });

  router.put("/:id", isEditor, async (req, res) => {
    const { userId } = req.cookies;
    const { id } = req.params;
    const movie = await moviesService.update(id, req.body, userId);
    // put: 200 o 204
    return res.status(200).json(movie);
  });
  router.delete("/:id", isEditor, async (req, res) => {
    const { userId } = req.cookies;
    const { id } = req.params;
    const movie = await moviesService.delete(id, userId);
    // delete: 200 o 202
    return res.status(200).json(movie);
  });

  router.post("/:id/reviews", async (req, res) => {
    const { userId } = req.cookies;
    const { id } = req.params;
    req.body.creator = userId;
    req.body.date = new Date();
    req.body.movieId = id;
    const review = await reviewService.create(req.body);
    return res.status(201).json(review);
  });

  router.get("/:id/reviews/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    const review = await reviewService.getOne(reviewId);
    return res.status(200).json(review);
  });

  router.put("/:id/reviews/:reviewId", async (req, res) => {
    const { id, reviewId } = req.params;
    const { userId } = req.cookies;
    const review = await reviewService.update(reviewId, userId, id, req.body);
    return res.status(200).json(review);
  });

  router.delete("/:id/reviews/:reviewId", async (req, res) => {
    const { id, reviewId } = req.params;
    const { userId } = req.cookies;
    const review = await reviewService.delete(reviewId, userId, id);
    return res.status(200).json(review);
  });
}

module.exports = movies;
