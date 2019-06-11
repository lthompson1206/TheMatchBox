var mysql = require("mysql");
var inquirer = require("inquirer");
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
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayItems();
});

function displayItems() {
    console.log("Selecting all items...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
    
      // Log all results of the SELECT statement
      console.table(res);
      buyOrSell();
       //
    });
  }

  function buyOrSell() {
    inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "Would you like to [Buy] an item?",
      choices: ["BUY", "SELL", "EXIT"]
    })
    .then(function(answer) {
      // based on their answer, either call the buy the product
      if (answer.options === "BUY") {
        shop();
      }
      else if(answer.options === "SELL") {
          console.log("option not available")
        buyOrSell();
      } else{
        connection.end();
      }
  
    });
}

var shop = function() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "item_id",
                message: "what would you like to buy?",
            },
            {
                type: "input",
                name: "quantity",
                message: "how many do you want?"

            }
        ]
    ).then(function(answers) {
        //set = change 
        //? is a variable
        //withing the query is a math deduction of quantity/inventory for cust
        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", 
        [answers.quantity, answers.item_id])
    })

}
//get the product number
//get the how many units of the product the user would like to buy.

