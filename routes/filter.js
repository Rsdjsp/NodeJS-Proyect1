const express = require("express");
const { route } = require("express/lib/application");
const Filter = require("../services/filter");
const Movies = require("../services/movies");

function filter(app) {
  const router = express.Router();
  const filterService = new Filter();
  const moviesService = new Movies();
  app.use("/filter", router);

  router.get("/popular", async (req, res) => {
    const films = await moviesService.getAll();
    const movies = await filterService.rating(films);
    return res.status(200).json(movies);
  });
  router.get("/unpopular", async (req, res) => {
    const films = await moviesService.getAll();
    const movies = await filterService.unpopular(films);
    return res.status(200).json(movies);
  });

  router.get("/recent", async (req, res) => {
    const films = await moviesService.getAll();
    const movies = await filterService.premier(films);
    return res.status(200).json(movies);
  });
}

module.exports = filter;
