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
            var inventory = results[i]
         if (inventory.stock_quantity <= 100){
          console.log(Table.print(inventory));
          }
          //this is console.logging the phrase for every item in the database
          //console.log("You have enough of everything")

        }
    });
}

        
// add to inventory
var addStock = ()=>{
    var stockArray = [];
    query = "SELECT * FROM products";
     connection.query(query,function(err, results){
        for(let i=0; i<results.length; i++){
            // var lowInventory = results[i];
            // if (lowInventory.stock_quantity <= 100){
            stockArray.push(`${results[i].product_name}  ${results[i].stock_quantity}`)
          
        //   console.log(stockArray)
        }
    inquirer.prompt([
        {  
            type: 'list',
            message: "What item would you like to add stock to?",
            choices: stockArray,
            name: "what_item",
          }

        ])
    //     .then(function(answers) {
           
    //             console.log("Inserting a new product...\n");
    //           var query = connection.query(
    //               "INSERT INTO products SET ?",{
    //                 stock_quantity: answers.add_stock,

    //               }
                  
    // console.log("I am the added stock")
    //           )
    
    });
        }
    

        //     });
        // }

//add new product
var addProd = ()=>{
    inquirer.prompt([
        { 
          type: 'input',
          message: "What item would you like to add?",
          name: "new_item",
        },
        { 
            type: 'list',
            message: "What department would you like to place the item in?",
            choices: ['Kitchen & Appliances','Electronics','Footwear', 'Home Decor', 'Kids', 'Womenswear'],
            name: "department",
          },
          { 
            type: 'input',
            message: "How much stock?",
            name: "how_many",
          },
          { 
            type: 'input',
            message: "What is the price?",
            name: "item_price",
          },


        ])
        .then(function(answers) {
           
                console.log("Inserting a new product...\n");
              var query = connection.query(
                  "INSERT INTO products SET ?",
                  {
                    product_name: answers.new_item,
                    department_name: answers.department,
                    stock_quantity: answers.how_many,
                    price:answers.item_price

                  },
        
                
        
            function(err, res) {
                if(err){
                    console.log(err);
                }
        
                console.log(res);
            });
        });

        }


managerActions();