require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

function display() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i=0; i < res.length; i++) {
      console.log("Id: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
    };
  });
};

function buyProduct() {
  inquirer.prompt([
    {
      type: "input",
      name: "item",
      message: "Please enter product ID",
    },
    {
      type: "input",
      name: "quantity",
      message: "Please enter quantity",
    },
    

  
}