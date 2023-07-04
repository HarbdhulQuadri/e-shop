const globalFunction = require("../utility/globalFunction")
const globalMessage = require("../utility/globalMessage");
const productModel = require("../models/products");
let randomstring = require("randomstring");

const createProduct = async (data) => {
    try {
        let result = await productModel.createProduct(data);
        return ({
            error: false,
            message: "createProduct Sucessfull",
            result:result.data,
            code: 200
        })
    } catch (error) {
        return ({ error: true, message: error.message, code: 403 })
    }
}
const editProduct = async (data) => {
    try {
        let result = await productModel.editProduct(data);
        return ({
            error: false,
            message: "editProduct Sucessfull",
            data: result,
            code: 200
        })
    } catch (error) {
        return ({ error: true, message: error.message, code: 403 })
    }
}
const getAllProducts = async (data) => {
    try {
        let result = await productModel.getAllProducts(data);
        return ({
            error: false,
            message: "getAllProducts Sucessfull",
            data: result,
            code: 200
        })
    } catch (error) {
        return ({ error: true, message: error.message, code: 403 })
    }
}
const getOneProduct = async (data) => {
    try {
        let result = await productModel.getOneProduct(data);
        return ({
            error: false,
            message: "getOneProduct Sucessfull",
            data: result,
            code: 200
        })
    } catch (error) {
        return ({ error: true, message: error.message, code: 403 })
    }
}

const deleteProduct = async (data) => {
    try {
        let result = await productModel.deleteProduct(data);
        return ({
            error: false,
            message: "getOneProduct Sucessfull",
            data: result,
            code: 200
        })
    } catch (error) {
        return ({ error: true, message: error.message, code: 403 })
    }
}

module.exports = {
    createProduct,
    editProduct,
    getAllProducts,
    getOneProduct,
    deleteProduct
}

