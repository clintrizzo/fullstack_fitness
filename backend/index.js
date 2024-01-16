var Express = require('express')
var bodyParser = require('body-parser')

var app = Express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var cors = require('cors')
app.use(cors())

var mysql = require('mysql')
var connection = mysql.createConnection({
  host:'0.0.0.0',
  user:'root',
  password:'root',
  database:'pl_test_schemas',
})

//source for routes
var userRoutes = require('./apiRoutes/user');

//calling the app routes to be used
app.use(userRoutes);

const PORT = process.env.PORT || 49146;

app.listen(PORT, () => {
  console.log(`Node server listening on ${PORT}!`);
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected To ${connection.config.database}`);
  });
});

app.get('/', (req, res) => {
  res.send('Hello World this is a second test')
})