const express = require("express");
const Reviews = require("../services/reviews");
const { isRegular} = require("../middleware/auth");


function reviews(app) {
    const router = express.Router();
    const reviewService = new Reviews();
    
    app.use("/reviews", router);

    router.get("/", async (req, res) => {
        const review = await reviewService.getAll();
        return res.status(200).json(review);
    });


    router.put("/:reviewId", async (req, res) => {
        const { id, reviewId } = req.params;
        const { userId } = req.cookies;
        const review = await reviewService.update(reviewId, userId, id, req.body);
        return res.status(200).json(review);
    });

    router.delete("/:reviewId", async (req, res) => {
        const { id, reviewId } = req.params;
        const { userId } = req.cookies;
        const review = await reviewService.delete(reviewId, userId, id);
        return res.status(200).json(review);
    });

}

module.exports = reviews;
