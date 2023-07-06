const productService = require("../services/products");

const createInvoice = async (req, res) => {
  try {
    const body = req.body;
    const result = await productService.createInvoice(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const editInvoice = async (req, res) => {
  try {
    const body = req.body;
    body.productID= req.params.productID;
    const result = await productService.editInvoice(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const result = await productService.getAllInvoices();
    res.json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};



const getOneInvoice = async (req, res) => {
  try {
    const body = req.body;
    body.invoiceID= req.params.invoiceID;
    const result = await productService.getOneInvoice(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};


const deleteInvoice = async (req, res) => {
  try {
    const body = req.body;
    body.productID= req.params.productID;
    const result = await productService.deleteInvoice(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

module.exports = {
  createInvoice,
  editInvoice,
  getAllInvoices,
  getOneInvoice,
  deleteInvoice
};
