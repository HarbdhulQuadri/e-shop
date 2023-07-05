
const DbConnection = require("../../database/connection");
const moment = require("moment-timezone");
const Dbname = require("../../database/name")
const { v4: uuidv4 } = require('uuid');

const productCollection = Dbname.productCollection

// name: The name of the product.
// description: A description of the product.
// barcode: The barcode value of the product. It is marked as unique to ensure each product has a unique barcode.
// price: The price of the product.
// quantity: The current quantity of the product in stock.
// category: The category or type of the product.
// brand: The brand or manufacturer of the product.
// imageUrl: An optional field to store the URL of the product's image.
// createdAt: The timestamp of when the product was created.
const createProduct = async (data) => {
    let date = moment.tz(Date.now(), "Africa/Lagos");
    let myquery = { productID: data.productID };
    let newvalues = {
        $set: {
            productID: uuidv4(),
            productName:data.productName,
            barcode: data.barcode,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            category: data.category,
            brand: data.brand,
            createdAt:date._d
        }
    };
    let upsert = { upsert: true }
    try {
        await DbConnection.updateData(productCollection, myquery, newvalues, upsert);
        return ({ error: false, message: "successfully" });
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}
const deleteProduct = async (data) => {
    let query = { productID: data.productID }
    try {
        const results = await DbConnection.deleteData(productCollection, query);
        return ({ error: false, message: results.message })
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}
const editProduct = async (data) => {
    let myquery = { productID: data.productID };
    let update = { 
        $set: {
            productName:data.productName,
            barcode: data.barcode,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            category: data.category,
            brand: data.brand,
    }
};
    let options = { upsert: true }
    try {
        const result = await DbConnection.updateData(productCollection, myquery, update, options);
        return ({ error: false, message: " Updated successfully", status : 200});
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}
const getAllProducts = async () => {
    let query = {};
    let select = {
        projection: {
            _id: 0, 
            productID :1,
            productName:1,
            barcode: 1,
            description: 1,
            price: 1,
            quantity: 1,
            category:1,
            brand: 1,
            createdAt:1
        }
    };
    try {
        const result = await DbConnection.findAndSelectData(productCollection, query, select);
        return ({ error: false, data: result.data });
    } catch (error) {
        return ({ error: true, message: error.message });
    }
}

const getOneProduct = async (data) => {
    let myquery = { productID: data.productID };
    try {
        const result = await DbConnection.findData(productCollection,myquery);
        return ({ result: result, error: false, message: "Data Fetched Successfully",status:200,});
    } catch (error) {
        return ({ error: true, message: error.message,status:400 })
    }
}
// Add Sections here 
// add Instructors here 


module.exports ={
    createProduct,
    getAllProducts,
    getOneProduct,
    editProduct,
    deleteProduct,

}