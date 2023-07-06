const payload = require("../utility/globalFunction");
const productModel = require("../models/products");
const globalMessage = require("../utility/globalMessage");


const { check, body, query, oneOf, header, validationResult } = require('express-validator');

function validation(req, res, next) {
    var errorValidation = validationResult(req);
    if (errorValidation.errors.length > 0) {
        return payload.resPayloadMessage(400, true, errorValidation.errors[0].msg, res);
    }
    next()
}

const createProduct = [
    // productName:data.productName,
    //         barcode: data.barcode,
    //         description: data.description,
    //         price: data.price,
    //         quantity: data.quantity,
    //         category: data.category,
    //         brand: data.brand,
    body('productName').exists().withMessage('productName required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('barcode').exists().withMessage('barcode required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('description').exists().withMessage('description required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('price').exists().withMessage('price required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('quantity').exists().withMessage('quantity required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('category').exists().withMessage('category required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('brand').exists().withMessage('brand required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
]

module.exports = {
    createProduct,
}