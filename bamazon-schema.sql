CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  stock_quantity INT,
  price DECIMAL (5, 2) NOT NULL
  PRIMARY KEY (id)
);