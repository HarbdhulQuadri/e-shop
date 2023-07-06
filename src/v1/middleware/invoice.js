const payload = require("../utility/globalFunction");
const productModel = require("../models/products");
const globalMessage = require("../utility/globalMessage");

const {
  check,
  body,
  query,
  oneOf,
  header,
  validationResult,
} = require("express-validator");

function validation(req, res, next) {
  var errorValidation = validationResult(req);
  if (errorValidation.errors.length > 0) {
    return payload.resPayloadMessage(
      400,
      true,
      errorValidation.errors[0].msg,
      res
    );
  }
  next();
}

const AddItem = [
  body("type").exists().withMessage("type required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
  body("content").exists().withMessage("content required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

const AddItemLike = [
  body("ItemID").exists().withMessage("ItemID required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
  body("type").exists().withMessage("type required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

const AddItemComment = [
  body("ItemID").exists().withMessage("ItemID required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
  body("content").exists().withMessage("content required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

const deleteItemComment = [
  body("ItemID").exists().withMessage("ItemID required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
  body("commentID").exists().withMessage("commentID required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

const deleteItemLike = [
  body("ItemID").exists().withMessage("ItemID required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

const deleteItem = [
  body("ItemID").exists().withMessage("ItemID required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

const getOneItem = [
  query("ItemID").exists().withMessage("ItemID required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

const getItem = [
  query("limit").exists().withMessage("limit required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
  query("page").exists().withMessage("page required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

const getOtherItem = [
  query("user_id").exists().withMessage("user_id required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
  query("limit").exists().withMessage("limit required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
  query("page").exists().withMessage("page required").trim(),
  (req, res, next) => {
    validation(req, res, next);
  },
];

module.exports = {
  AddItem,
  AddItemLike,
  AddItemComment,
  getItem,
  getOneItem,
  getOtherItem,
  deleteItem,
  deleteItemLike,
  deleteItemComment,
};
