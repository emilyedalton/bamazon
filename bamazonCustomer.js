var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')
const cTable = require('console.table');
const chalk = require('chalk');
const log = console.log;

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "emilyedalton",

    // Your password
    password: "awesomepassword",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log(chalk.blue("Connected!"));
});

var displayitem = () => {
    const query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, results) {
        console.table(results);

});
}
//start function not working

var start = () => {
    inquirer
      .prompt([
          {
            type: "confirm",
            message: "Do you want to purchase another item?",
            name: "confirm",
            default: true
          }
        ])
        .then(function(inquirerResponse) {
          // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
          if (inquirerResponse.confirm ) {
         buyitem();
          }
          else {
            log(chalk.black.bgYellowBright.bold("\nThank you for shopping with us!!!!!!!!!.\n"));
            return false; 
        }
        });

}
//first display all of the items available for sale. Include the ids, names, and prices of products for sale.

    
    var buyitem = () => {

        // query the database for all items being auctioned
        const query = "SELECT * FROM products";
        connection.query(query, function (err, results) {

            // once you have the items, prompt the user for which they'd like to bid on
            inquirer
                .prompt([
                    {
                        name: 'choice',
                        type: 'rawlist',
                        choices: function () {
                            var choiceArray = [];
                            for (var i = 0; i < results.length; i++) {
                                const products = results[i];
                                choiceArray.push(products.product_name);
                            }
                            return choiceArray;
                        },
                        message: "What is the ID number of the product you would like to buy?"
                    },
                    {
                        name: "quantity",
                        type: "input",
                        message: "How many units of the product would you like to buy?"
                    }
                ])
                .then(function (answer) {
                    // get the information of the chosen item
                    var chosenItem;
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].product_name === answer.choice) {
                            chosenItem = results[i];
                        }
                    }

                    // determine if number of products was greater than the quantity requsted  
                    if (chosenItem.stock_quantity > parseInt(answer.quantity)) {

                        console.log(`There are ${chosenItem.stock_quantity} ${answer.choice}'s left in the store you can have it!!!!!`)
                        // displaying total puchase ammount 

                        let total = answer.quantity * chosenItem.price;

                        console.log(`Your total is: ${total}`)

                        let quantUpdate = chosenItem.stock_quantity - answer.quantity
                        
                        //bid was high enough, so update db, let the user know, and start over
                          connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                              {
                               stock_quantity: quantUpdate
                              },
                              {
                                item_id: chosenItem.item_id
                              }
                            ],
                            // this error function was causing a problem because I had the console.log inside of it
                            function(error) {
                              if (error) throw err;
                            //   console.log("new stock" + stock_quantity)

                            }

                          );

                         return start();

                    }
                    else {
                        // bid wasn't high enough, so apologize and start over
                        console.log("Insufficient quantity! Please try again...");
                        // start();
                    }
                });

        });
    }

    displayitem();
    buyitem();

//start function not working
// start();