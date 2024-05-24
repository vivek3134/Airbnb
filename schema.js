//what if someone send the request form hoppotich and just sended title and rest
// skip our server will crash. to prevent form this we are using joi. offcoss the
//webpage is validating the schema but not from hoppscotch

const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required()   
  }).required(),
});
