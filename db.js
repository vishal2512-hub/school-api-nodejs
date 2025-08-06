const mysql = require("mysql2");

const db = mysql.createConnection({
  host:"sql12.freesqldatabase.com",
  user: "sql12792322",
  password: "AF2cgBb2xj",
  database:"sql12792322",
});


db.connect((err) => {
  if(err) {
console.error("DB failed", err.message);
return;
  }
  console.log("connected sucess");
})

module.exports = db;