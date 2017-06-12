/**
 * Created by USER on 13/04/2017.
 */



var dbFunctions = require("../persistence/functions");
var con = require("../persistence/config/db");

module.exports.createInvoice = function (req, res) {
    var data =  req.body;
    console.log("Body " + data);

    //TODO send the data of the invoice as answer
    switch (req.url) {
      case '/api/getProducts':
        //Service for getting all the products from the data base
        getProductsDB(function (result){res.status(200).jsonp(result)});
        break;
      case '/api/invoice':
        //Servie to insert a new purchase
        insertPurchage(data, function(result){res.status(200).jsonp(result);});
      break;
      default:
        res.status(200).jsonp("NO TRAIGO NADA");
    }
};



/*
* Funtion for gettin all the products from the data base
*/
function getProductsDB(cbResult) {
  var query = "SELECT p.* FROM product p INNER JOIN currency c WHERE p.currency_id = c.id;";
  con.query(query, function (err, result) {
    if (err) throw err;
    cbResult(result);
  });
}
/*
* Function for insert a new purchage
*/
function insertPurchage(data, cbResult){
  var query = "INSERT INTO db_store.purchase (date_purchage,total) VALUE(NOW(),?);";
  con.query(query,[data.total], function (err, result) {
    if (err) throw err;
    var purchageId = result.insertId;
    //Inserting each product
    data.products.forEach(function (obj, index) {
      insertPurcharseProductRelation(obj.product.id, purchageId, obj.quantity, obj.value);
    });

    console.log("Se inserto purchage con la key: " + result.insertId);
    cbResult(result);
  });
}
/**
* Function for inserting a relation between product and purchage
*/
function insertPurcharseProductRelation(productId, purchageId, quantity, pruchageProductValue) {
  var query = "INSERT INTO db_store.product_by_purchage (product_id,purchase_id,quantity, purchage_product_value) VALUES(?,?,?,?);";
  con.query(query,[productId, purchageId, quantity, pruchageProductValue], function (err, result) {
    if (err) throw err;
    console.log("SE INSERTO CORRECTAMENTE product_by_purchage ");
  });
}
