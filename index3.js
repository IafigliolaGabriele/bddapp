var express = require('express');
var app = express();
var mysql      = require('mysql');
var catalogRouter = require('./routes/catalog');
var config = require('./config/config');
const bodyParser = require('body-parser')
const passport    = require('passport');
const auth = require('./routes/auth');
require('./passport');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "pug");
//app.set("views", path.join(__dirname, "views"));

var connection = mysql.createConnection({
  host     : config.host,
  port     : config.sql_port,
  user     : config.username,
  password : config.password
});

connection.connect();

let timeMiddleware = function (req, res, next) {
  console.log('Time:', Date.now());
  next();
}

app.use('/auth', auth);

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use('/catalog', passport.authenticate('jwt', {session: false}), catalogRouter);
//app.use('/catalog', timeMiddleware, catalogRouter);  // Add catalog routes to middleware chain.

//connection.end();



app.listen(config.port, function () {
  console.log('Example app listening on port 3000!');
});