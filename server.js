const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "products_h1",
  password: "root", 
});

app.get("/get/show-products", async (req, res) => {
  connection.query("SELECT * FROM products", function (err, results, fields) {
    console.log(err);
    console.log(results);
    console.log(fields);
    return res.json(results);
  });
});

app.get("/get/products", (req, res) => {
  const { name, price, currency,category,description } = req.query;

  if(!req.query) {
    return res.send(`Please fill query`);
  }

  connection.query(
    `INSERT INTO products (name,price,currency,category,description) 
      VALUES ('${name}',${price},'${currency}','${category}','${description}')`,
    (err, result, fields) => {
      if(err) {
        return res.send(err);
      }

      return res.send("Success");
    }
  );
});

app.get('/delete/:id', (req,res) => {
  const {id} = req.params;

  console.log(id);

  connection.query(`DELETE from products where id=${id}`, (err, result, fields) => {
    if(err) {
      return res.send(err);
    }

    return res.send(`Success. Element ${id} was deleted`);
  });
});



app.get("/get/products/filter", (req, res) => {
  const { name } = req.query;

  connection.query(
    `SELECT * FROM products WHERE name = '${name}'`,
    (err, result, fields) => {
      if(err) {
        return res.send(err);
      }

      return res.send(result);
    }
  );
});




app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
  connection.connect(function (err) {
    if (err) {
      return console.error("Ошибка: " + err.message);
    } else {
      console.log("Подключение к серверу MySQL успешно установлено");
    }
  });
});
