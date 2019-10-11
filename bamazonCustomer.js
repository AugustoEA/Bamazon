require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});
y

var displayItems = function(){
  var query = "Select * FROM products";
  connection.query(query, function(err, res){
    if(err) throw err;
    var displayTable = new Table ({
      head: ["Item ID", "Product", "Department", "Price", "Quantity"],
    });
    for(var i = 0; i < res.length; i++){
      displayTable.push(
        [res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
    }
    console.log(displayTable.toString());
    buyProduct();
  });
}
displayItems();

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
  ])

  .then(function (answers) {
    var itemRequested = answers.item;
    var quantityRequested = answers.quantity;
    orderItems(itemRequested, quantityRequested);
    
  });
};

function orderItems(item, quantity) {
  connection.query("SELECT * FROM products WHERE ?" , [{item_id: item}], function (err,res) {
    console.log(res);
  
    var update = res[0]
    console.log(quantity);
    console.log(update.stock_quantity);
    if(err){console.log(err)};

    if(quantity <= update.stock_quantity){
      var total = update.price * quantity;
        console.log("Product available!");
        console.log("Total for " + quantity + " " + update.product_name + " is " + total);
      var newQuantity = update.stock_quantity - quantity;

      connection.query("UPDATE products SET ? WHERE ?" , [{stock_quantity: newQuantity}, {item_id: item}], function(err){
        if(err){console.log(err)};
        console.log("Thank you for buying with us!")
        displayItems();
      });
    } 
    else{
      console.log("Oops! out of stock!");
      displayItems();
    };
  });
};
