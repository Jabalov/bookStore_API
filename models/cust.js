const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const User = mongoose.model(
  "Customer",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    borrow_list: [{ type: mongoose.Schema.Types.ObjectId, ref: "BroRecord" }],
    ebooks_list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    bought: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
  })
);

function validation(body) {
  const Schema = {
    user_id: Joi.objectId().required(),
    borrow_list: Joi.array().items(Joi.string()),
    ebooks_list: Joi.array().items(Joi.objectId()),
    bought: Joi.array().items(Joi.objectId())
  };
  return Joi.validate(body, Schema);
}

exports.Borrower = User;
exports.validate = validation;
