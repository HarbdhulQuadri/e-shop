const invoiceModel = require("../models/invoice");

const createInvoice = async (data) => {
  try {
    const result = await invoiceModel.createInvoice(data);
    return { success: true, data: result, message: "Invoice created successfully", status: 201 };
  } catch (error) {
    throw new Error("Failed to create invoice");
  }
};

const getAllInvoices = async () => {
  try {
    const result = await invoiceModel.getAllInvoices();
    return { success: true, data: result, message: "All invoices retrieved successfully", status: 200 };
  } catch (error) {
    throw new Error("Failed to retrieve invoices");
  }
};

const getOneInvoice = async (data) => {
  try {
    const result = await invoiceModel.getOneInvoice(data);
    if (result) {
      return { success: true, data: result, message: "Invoice retrieved successfully", status: 200 };
    } else {
      throw new Error("Invoice not found");
    }
  } catch (error) {
    throw new Error("Failed to retrieve invoice");
  }
};

const deleteInvoice = async (data) => {
  try {
    const result = await invoiceModel.deleteInvoice(data);
    if (result) {
      return { success: true, message: "Invoice deleted successfully", status: 200 };
    } else {
      throw new Error("Invoice not found");
    }
  } catch (error) {
    throw new Error("Failed to delete invoice");
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getOneInvoice,
  deleteInvoice,
};
