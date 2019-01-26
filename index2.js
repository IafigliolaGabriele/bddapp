var express = require('express');
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port: 3307,
  user     : 'Gabo',
  password : 'mypassword'
});

connection.connect();


//connection.end();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/disconect', function (req, res) {
    connection.end();
    res.send('Connection ended');
});

app.get('/query', function (req, res) {
    let response;
    connection.query('SELECT * FROM sakila.customer', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0]);
        response = rows[0]
      });
    res.send(JSON.stringify(response));
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});