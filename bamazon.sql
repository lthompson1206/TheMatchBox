create database bamazon_db;

use bamazon_db;

create table products (
    item_id integer not null AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price integer,
    stock_quantity integer,
    PRIMARY KEY (item_id)
);

INSERT INTO 
products
(product_name, department_name, price, stock_quantity)

VALUES 
(laptop, electronics, 800, 5),
(iphone, electronics, 1000, 10),
(castor oil, cosmetics, 5, 20),
(shampoo, cosmetics, 6, 10),
(Polo shirts, clothing, 20, 5),
(dockers, clothing, 20, 5)
(cashews, food, 4, 20),
(brownies, food, 3, 10),
(ajax, cleaning, 5, 10),
(fabuloso, cleaning, 8, 5)
