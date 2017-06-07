/**
 * Created by USER on 14/04/2017.
 */


var invoiceService = require("../services/InvoiceService");


exports.createInvoice = function (req, res) {

    invoiceService.createInvoice(req, res);
};
