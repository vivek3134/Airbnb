const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudeConfig.js");
const upload = multer({ storage });

router
  .route("/")
  //index route
  .get(wrapAsync(listingController.index))
  //create route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  //update route
  .put(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  //show route
  .get(wrapAsync(listingController.showListing))
  //delete route
  .delete(isLoggedIn, wrapAsync(listingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
