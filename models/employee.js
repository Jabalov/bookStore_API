const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { Branch } = require("./branch");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    }
  })
);

function validation(body) {
  const Schema = {
    user_id: Joi.objectId().required(),
    branch_id: Joi.objectId().required()
  };
  return Joi.validate(body, Schema);
}

async function branchValidation(body) {
  const isBranch = await Branch.findOne({ _id: body.branch_id });
  if (!isBranch) return "Branch does not exist.";
  return undefined;
}

module.exports.User = Employee;
module.exports.validate = validation;
