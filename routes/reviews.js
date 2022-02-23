const express = require("express");
const Reviews = require("../services/reviews");


function reviews(app) {
    const router = express.Router();
    const reviewService = new Reviews();
    
    app.use("/reviews", router);

    router.get("/", async (req, res) => {
        const review = await reviewService.getAll();
        return res.status(200).json(review);
    });
}

module.exports = reviews;
