DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL
);

SELECT * FROM products

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chubbs Wooden Hand", "Memorabilia", 149.99, 01),
("Infinity Gauntlet", "Universal Weapons", 499.99, 03),
("Captain Crunch's Wooden Leg", "Memorabilia", 149.99, 02),
("Silver Surfers Silver Surfboard" , "Universal Weapons", 299.99, 01),
("Water Bottle", "Supplies", 4.99, 97),
("Salt Shaker", "Home Goods", 1.99, 457);

DELETE * FROM products

