# Bamazon
Bamazon is a MySQL Amazon-like storefront with two different views

## Customer View

Customer view querries the Bamazon database and selects the item ID, product name and price from the products table and displays them using the formatting provided by the console.table npm package. 

Customer view then takes the results of the object array from mySQL and prompts users to enter:

**The ID of the product they would like to purchase**

And 

**How many units of the product they would like to buy**


After the information is entered into the inquirer promts, the user is shown **whether or not there is sufficient stock in the warehouse to make the transaction** and the **total ammont of their purchase:** 



If there is insufficent quantity to fill the order the Customer view will log "Insufficient Quantity" and the transaction will not go through. 

In the following example, there are 190 Candles shaped like a dog in the warehouse. 

If the user tries to purchase more than 190 the "Insufficent Quantity" message displays: 


## Manager View