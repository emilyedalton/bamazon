var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');
const cTable = require('console.table');


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
    console.log("Connected!");
});
//list a set of menu options for the manager

var managerActions = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "manage",


        }
        //switch case for calling the functions for the manager action choices
    ]).then(function (answers) {

        switch (answers.manage) {
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
// a table of all the products 

var prodAll = () => {
    const query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function (err, results) {

    
            console.table(results);
    })
}
//view products for sale
var viewProd = () => {
    const query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, results) {

    
            console.table(results);

        managerActions();

    })
}
//view low inventory
//showing quantity for items with greater than 100 units of inventory

var viewLow = () => {
    
    query = "SELECT item_id, product_name,stock_quantity FROM bamazon.products WHERE stock_quantity < 100";
    connection.query(query, function (err, results) {
        if (err) throw err;

                console.table(results);
                managerActions();

            });
          

            }
        

    


// add to inventory
var addStock = () => {
prodAll();
  const query = "SELECT * FROM products";
    connection.query(query, function (err, results) {
     
        inquirer.prompt([
            {
                name: "stock_needed",
                type: 'rawlist',
                choices: function () {
                    var stockArray = [];
                    for (var i = 0; i < results.length; i++) {
                        const products = results[i];
                        stockArray.push(products.product_name);
                    }
                    return stockArray;
                },
                message: "What item would you like to add stock to?",

            },
            {
                name: "add_stock",
                type: 'input',
                message: "How much stock would you like to add?",
            }

        ])
            .then(function (answer) {
                for (let i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.stock_needed) {
               
                let newQuant = parseFloat(results[i].stock_quantity) + parseFloat(answer.add_stock)
                console.log (`i am the new quantity ${newQuant}`)
                //wont update the database

                console.log("Adding Stock...\n");
                connection.query(

                    "UPDATE products SET? WHERE?", 
                        [
                            {
                        stock_quantity: newQuant
                    },

                    {
                        item_id:  results[i].item_id
                    }
                ],   
                        function(err, res) {
                            if(err){
                                console.log(err);
                            }
                    
                            console.log(res);
                    });



       
                                console.log("did it update?");

   

}
                }
            });
        });
    }


//add new product
var addProd = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: "What item would you like to add?",
            name: "new_item",
        },
        {
            type: 'list',
            message: "What department would you like to place the item in?",
            choices: ['Kitchen & Appliances', 'Electronics', 'Footwear', 'Home Decor', 'Kids', 'Womenswear'],
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
        .then(function (answers) {

            console.log("Inserting a new product...\n");
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answers.new_item,
                    department_name: answers.department,
                    stock_quantity: answers.how_many,
                    price: answers.item_price

                },



                function (err, res) {
                    if (err) {
                        console.log(err);
                    }

                    console.log(res);
                });
        });
}

managerActions();