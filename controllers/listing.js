const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
//index is a asyncronous function whose works is to render all the listings
module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  res.render("listing/index.ejs", { listings });
};
module.exports.renderNewForm = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing You Requested for does not edist!");
    res.redirect("/listings");
  }

  res.render("listing/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing you requested for does not exist !");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_50,w_250");
  res.render("listing/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  //let listing = await Listing.findById(id) ;

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
