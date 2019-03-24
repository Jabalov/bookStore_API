const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");
Joi.objectId = require("joi-objectid")(Joi);

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    author: String,
    description: String,
    pages_num: {
      type: Number,
      required: true
    },
    ebook_price: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  })
);

function validation(body) {
  const Schema = {
    name: Joi.string()
      .min(3)
      .max(20)
      .required(),
    author: Joi.string()
      .min(5)
      .max(20),
    description: Joi.string()
      .min(40)
      .max(200),
    pages_num: Joi.number().required(),
    ebook_price: Joi.number().required(),
    price: Joi.number().required()
  };

  return Joi.validate(body, Schema);
}

async function showBooks(query) {
  const filter = qryHandle(query);
  const books = await Book.find()
    .and(filter.find)
    .sort(filter.sort)
    .limit(filter.limit)
    .skip(filter.skip);

  return books;
}

exports.Book = Book;
exports.validate = validation;
module.exports.getBooks = showBooks;
