const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn } = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//Post review Route
router.post("/", validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;
