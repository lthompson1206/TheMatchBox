var mysql = require("mysql");
var inquirer = require("inquirer");
//module.import = require("./bamazonCustomer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View all product that are low in inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function (answer) {
      console.log(answer.action);
      switch (answer.action) {
        case "View Products for Sale":
          readProduct();
          break;

        case "View all product that are low in inventory":
          lowInventorySearch();
          break;

        case "Add to Inventory":
          addToInventory();
          break;

        case "Add New Product":
          addNewProduct();
          break;
      }
    });
}

function readProduct() {
  console.log("View Products for Sale...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    //log all results of the SELECT statement 
    console.table(res);
    //then process a buy operation using inquirer to select the product id then process the buy
  });
}

function lowInventorySearch() {
  console.log("View all product that are low in inventory...\n");

  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
    if (err) throw err;
    //log all results of the SELECT statement
    console.table(res);
  });
}

function addToInventory() {
  console.log("Add Qte of products that are low in inventory...\n");

  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
    if (err) throw err;
    //log all results of the SELECT statement
    console.table(res);
    //ask what product to update
    inquirer.prompt([{
      name: "product",
      type: "list",
      message: "What product would you like to update?",  
      // res as result is a big ass object
      // use .map (from es6) to reduce the object to one column which product_name making easier to read
      choices: res.map(res => res.product_name)
    },
    {
      name: "quantity",
      type: "number",
      message: "How many would you like to add?",
    }])
      .then(function (answer) {

        //console.log(answer.product);
        console.log(answer.quantity);

        //write code to show and select the specific product
        //withing this big ass object result or res, find the product name that the user SELECTED 

        // result.find(productFound => product.name===dockers)
        var toUpdate = res.find(product => product.product_name === answer.product);

        // the variable toUpdate = dockers. (item_id, name, department, price, qte in stock)
      
       // console.log(toUpdate.stock_quantity);
        var newQuantity = toUpdate.stock_quantity + answer.quantity;
        //console.log(newQuantity);
      

        //UPDATE products SET stock_quantity =4 where item_id =2 below
        connection.query("UPDATE products SET stock_quantity =? where item_id =?", [newQuantity, toUpdate.item_id],
          function (err, res) {
            if (err) throw err;
            //success message 
            console.log("Quantity updated successfully!!!");
          });
      });
  });
}

function addNewProduct() {
  inquirer
    .prompt([{
      name: "product_name",
      message: "Enter your product name: "
    },
    {
      name: "department_name",
      message: "Enter the department name: "
    },
    {
      name: "price",
      type:"number",
      message: "Enter the price: "
    },
    {
      name: "stock_quantity",
      type:"number",
      message: "Enter the stock_quantity: "
    }])
    .then(function (newProduct) {
   console.table(newProduct); //=> newProduct{cookies, Food, 50, 10}
                              //newProduct{cookies, Food, BB, 10}
      //insert into the database
      connection.query("INSERT INTO products SET ?",newProduct, function(err, res){ // INSERT INTO products SET newProduct{"cookies", "Food", 50, 10}
        if (err) throw err;
        //successfully inserted
        console.log("Product added successfully!!!");
        //call fucntion to display products again
        readProduct();
      });
    });
}