var mysql = require("mysql");
var inquirer = require("inquirer")
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "emilyedalton",

  // Your password
  password: "681262catZ",
  database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});