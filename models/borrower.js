const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const Borrower = mongoose.model(
  "Borrower",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    city: string,

    phone: {
      type: String,
      required: true,
      minlength: 12,
      maxlength: 12
    }
  })
);

function validation(borrower) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(10)
      .required(),
    city: Joi.string(),
    phone: Joi.string
      .min(12)
      .max(12)
      .required()
  };
  return Joi.validate(borrower, schema);
}

exports.Borrower = Borrower;
exports.validate = validation;
