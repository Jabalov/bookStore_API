const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const User = mongoose.model(
  "Admin",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  })
);

function validation(body) {
  const Schema = {
    user_id: Joi.objectId().required()
  };
  return Joi.validate(body, Schema);
}

module.exports.User = User;
module.exports.validate = validation;
