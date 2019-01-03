var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')

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
//list a set of menu options for the manager
var managerActions = ()=>{
    inquirer.prompt([
        { type: "list",
          message: "What would you like to do?",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
          name: "manage",


}
//switch case for calling the functions for the manager action choices
]).then(function(answers) {

    switch (answers.manage){
    case "View Products for Sale": 
    viewProd();
    break;
    case "View Low Inventory": 
    viewLow();
    break;
    case "Add to Inventory": 
    addStock();
    break;
    case "Add New Product": 
    addProd();
    break;
    }
})
}

var count = 0;
//view products for sale
var viewProd = ()=>{
    const query = "SELECT item_id, product_name, price FROM products";
    connection.query(query,function(err, results){
       //  console.log(res);
       
       for(let i=0; i<results.length; i++){
           const products = results[i]; 
         
           console.log(Table.print(products));
       
    
    console.log("I am the product list")
       
}

})
}
//view low inventory
var viewLow = ()=>{
     query = "SELECT item_id, product_name,stock_quantity FROM products";
     connection.query(query,function(err, results){
        for(let i=0; i<results.length; i++){
            const inventory = results[i]
         if (inventory.stock_quantity <= 100){
          console.log(Table.print(inventory));
          }
          else
          //this is console.logging the phrase for every item in the database
          console.log("You have enough of everything")

        }
    });
}

        
// add to inventory
var addStock = ()=>{
    console.log("I am the added stock")

}
//add new product
var addProd = ()=>{
    console.log("I am the added product")


}
managerActions();