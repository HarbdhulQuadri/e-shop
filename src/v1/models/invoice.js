const DbConnection = require("../../database/connection");
const moment = require("moment-timezone");
const Dbname = require("../../database/name");
const { v4: uuidv4 } = require("uuid");

const productCollection = Dbname.productCollection;
const salesCollection = Dbname.salesCollection;

const createInvoice = async (data) => {
  let invoiceID = uuidv4();
  let date = moment.tz(Date.now(), "Africa/Lagos");
  let myquery = { invoiceID: invoiceID };
  let newvalues = {
    $set: {
      invoiceID: invoiceID,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerAddress: data.customerAddress,
      invoiceDate: date._d,
      lineItems: data.lineItems,
      total: data.total,
    },
  };
  let upsert = { upsert: true };
  try {
    await DbConnection.updateData(salesCollection, myquery, newvalues, upsert);
    return { error: false, message: "Invoice created successfully" };
  } catch (error) {
    return { error: true, message: error.message };
  }
};
const getAllInvoices = async () => {
  let query = {};
  let select = {
    projection: {
      _id: 0,
      invoiceID: 1,
      customerName: 1,
      customerEmail: 1,
      customerAddress: 1,
      invoiceDate: 1,
      lineItems: 1,
      total: 1,
    },
  };
  try {
    const result = await DbConnection.findAndSelectData(
      salesCollection,
      query,
      select
    );
    return { error: false, data: result.data };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

const getOneInvoice = async (data) => {
  let query = { invoiceID: invoiceID };
  let select = {
    projection: {
      _id: 0,
      invoiceID: 1,
      customerName: 1,
      customerEmail: 1,
      customerAddress: 1,
      invoiceDate: 1,
      lineItems: 1,
      total: 1,
    },
  };
  try {
    const result = await DbConnection.findAndSelectData(
      salesCollection,
      query,
      select
    );
    return { error: false, data: result.data };
  } catch (error) {
    return { error: true, message: error.message };
  }
};
const deleteInvoice = async (data) => {
  try {
    const result = await invoiceModel.deleteInvoice(data);
    if (result) {
      return {
        success: true,
        message: "Invoice deleted successfully",
        status: 200,
      };
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
