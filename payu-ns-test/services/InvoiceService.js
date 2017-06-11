/**
 * Created by USER on 13/04/2017.
 */



var invoices = [];
var dbFunctions = require("../persistence/functions");

module.exports.createInvoice = function (req, res) {
    var data =  req.body.products;
    invoices.push(data);
    console.log("Body " + req.body);
    console.log("Invoices" + invoices);

    //TODO send the data of the invoice as answer
    switch (req.url) {
      case '/api/getProducts':
        var con = require("../persistence/config/db");

        con.query("SELECT p.* FROM product p INNER JOIN currency c WHERE p.currency_id = c.id;", function (err, result) {
          if (err) throw err;
          //console.log(result);
          res.status(200).jsonp(result);
        });
        break;
      default:
        res.status(200).jsonp("NO TRAIGO NADA");
    }
};
