/**
 * Created by USER on 13/04/2017.
 */
var con = null;
try {
  var mysql = require('mysql');

  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_store"
  });

  con.connect(function(err) {
      if (err) throw err;
  });
} catch (e) {
  console.log("ERROR DE PERSISTENCIA: " + e)
} finally {

}


module.exports = con;
