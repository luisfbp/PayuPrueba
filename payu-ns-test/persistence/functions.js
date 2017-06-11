var con = require("./config/db");

function getProducts() {
  console.log("ENTRER A FUNCTIONS");
  con.query("SELECT * FROM product", function (err, result) {
    if (err) throw err;
    console.log(result);
    return result;
  });
  return null;
}

module.exports = getProducts;
