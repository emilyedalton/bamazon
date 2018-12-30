var mysql = require("mysql");
var inquirer = require("inquirer");
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
//first display all of the items available for sale. Include the ids, names, and prices of products for sale.
var buyitem = () =>{
    
     // query the database for all items being auctioned
const query = "SELECT * FROM products";
     connection.query(query,function(err, res){
         console.log(res);
        
        for(let i=0; i<res.length; i++){
            const products = res[i]; 
            console.log(products.product_name);
        // for (var i = 0; i < results.length; i++) {
        //     var item_id = results[i].item_id,
        //     product_name = results[i].product_name,

        //       department_name = results[i].department_name,
        //       price = results[i].price,
        //        stock_quantity = results[i].stock_quantity;

  
  

        }  
});
}  
        // once you have the items, prompt the user for which they'd like to bid on
    //     inquirer
    //       .prompt([
    //         {
    //           name: 'choice',
    //           type: 'rawlist',
    //           choices: function() {
    //             var choiceArray = [];
    //             for (var i = 0; i < results.length; i++) {
    //               choiceArray.push(results[i].item_name);
    //             }
    //             return choiceArray;
    //           },
    //           message: "What item would you like to bid on?"
    //         },
    //       ])
    //     });
    // }
    buyitem();