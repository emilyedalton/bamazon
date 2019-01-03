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

var displayitem = () =>{
    const query = "SELECT item_id, product_name, price FROM products";
    connection.query(query,function(err, results){
       //  console.log(res);
       
       for(let i=0; i<results.length; i++){
           const products = results[i]; 
         
           console.log(Table.print(products));
       //     console.log(products.product_name);
    //    console.log(`Product ID: ${products.item_id} | Product Name: ${products.product_name} | Price (USD) ${products.price} `);
    //    var t = new Table
 
    //    forEach(function(products) {
    //      t.cell('Product Id', products.item_id)
    //      t.cell('Description', products.product_name)
    //      t.cell('Price, USD',products.price, Table.number(2))
    //      t.newRow()
    //    })
        
    //    console.log(t.toString())
    }

})
}
//first display all of the items available for sale. Include the ids, names, and prices of products for sale.
var buyitem = () =>{
    
     // query the database for all items being auctioned
const query = "SELECT * FROM products";
     connection.query(query,function(err, results){
        //  console.log(res);
        
        // for(let i=0; i<res.length; i++){
        //     const products = res[i]; 
        //     console.log(products.product_name);
     

  
  

  
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt([
            {
              name: 'choice',
              type: 'rawlist',
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                const products = results[i];
                  choiceArray.push(products.product_name);
                }
                return choiceArray;
              },
              message: "What item would you like to buy?"
            },
            {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
          }
        ])
        .then(function(answer) {
            // get the information of the chosen item
            var chosenItem;
            for(let i=0; i<results.length; i++){
            // var chosenItem;
            // for (var i = 0; i < results.length; i++) {
              if (results[i].product_name === answer.choice) {
                chosenItem = results[i];
              }
            }
    
            // determine if number of products was greater than the quantity requsted  
            if (chosenItem.stock_quantity > parseInt(answer.quantity)) {

            console.log ( `There are ${chosenItem.stock_quantity} ${answer.choice}'s left in the store you can have it!!!!!`)
            // displaying total puchase ammount 
            let total = answer.quantity * chosenItem.price;
            console.log ( `Your total is: ${total}`)
            let quantUpdate = chosenItem.stock_quantity - answer.quantity
            console.log (`i am the new quantity ${quantUpdate}`)
              //bid was high enough, so update db, let the user know, and start over
            //   connection.query(
            //     "UPDATE products SET ? WHERE ?",
            //     [
            //       {
            //        stock_quantity: quantUpdate
            //       },
            //     //   {
            //     //     item_id: chosenItem.item_id
            //     //   }
            //     ],
            //     function(error) {
            //       if (error) throw err;
            //       console.log("Bid placed successfully!");
            //       console.log("new stock" + stock_quantity)

            //       start();
            //     }
            //   );
            }
            else {
              // bid wasn't high enough, so apologize and start over
              console.log("Your bid was too low. Try again...");
            //   start();
            }
          });
            
        });
    }

    displayitem();
    buyitem();