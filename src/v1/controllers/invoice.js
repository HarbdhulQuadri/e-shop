const invoiceService = require("../services/invoice");

const createInvoice = async (req, res) => {
  try {
    const body = req.body;
    const result = await invoiceService.createInvoice(body);
    res.status(201).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const getAllInvoices = async (req, res) => {
  try {
    const result = await invoiceService.getAllInvoices();
    res.json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const getOneInvoice = async (req, res) => {
  try {
    const body = req.body;
    body.invoiceID = req.params.invoiceID;
    const result = await invoiceService.getOneInvoice(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const body = req.body;
    body.invoiceID = req.params.invoiceID;
    const result = await invoiceService.deleteInvoice(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error: true, message: error.message });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getOneInvoice,
  deleteInvoice
};
