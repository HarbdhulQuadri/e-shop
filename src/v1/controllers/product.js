const productService = require("../services/products")

const createProduct = async (req, res) => {
    try {
        let body = req.body;
        let result = await productService.createProduct(body)
        console.log(result)
        let statucode = result.code
        delete result.code
        res.status(statucode).json(result);
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
};

const editProduct = async (req, res) => {
    try {
        let body = req.body;
        let result = await productService.editProduct(body)
        let statucode = result.status
        delete result.status
        res.status(statucode).json(result);
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
};

const getAllProducts = async (req, res) => {
    try {
        let body = req.body;
        let result = await productService.getAllProducts(body)
        res.json(result);
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
};

const getOneProduct = async (req, res) => {
    try {
        let body = req.body;
        body.courseID= req.params.courseID;
        const result = await productService.getOneProduct(body)
        let code = result.code;
        delete result.code;
        res.status(code).json(result)
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        let body = req.body;
        let result = await productService.deleteProduct(body)
        res.json(result);
    } catch (error) {
        let code = error.code;
        delete error.code;
        res.status(code).json(error)
    }
};

module.exports = {
    createProduct,
    editProduct,
    getAllProducts,
    getOneProduct,
    deleteProduct
}
