'user strict';

const mysql = require('mysql');

//server mysql db connection
const dbConn = mysql.createConnection({
  host     : 'mysql.ideabd.co', 
  user     : 'ideabdco1',
  password : '@Pass0918',
  database : 'ideabdco_database' 
}); 

//local mysql db connection
// const dbConn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'cms_database'
// });
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;