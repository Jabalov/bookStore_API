const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Branch = mongoose.model(
  "Branches",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  })
);

function validation(body) {
  const Schema = {
    name: Joi.string().required()
  };
  return Joi.validate(body, Schema);
}

module.exports.validate = validation;
module.exports.Branch = Branch;
