const Express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { createConnection } = require('./dbpath/db');

const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.use(session({
  secret: 'dsdsffdcdahjhjdshxjbbjkhhhjddgxgu',
  resave: false,
  saveUninitialized: true,
}));

// Import routes
const userRoutes = require('./apiRoutes/userRoute');
const loginRoutes = require('./apiRoutes/loginRoute');

// Use routes
app.use(userRoutes);
app.use(loginRoutes);

const PORT = process.env.PORT || 5001; // Change the port number if needed

// Wrap your code in an immediately invoked async function
(async () => {
  try {
    // Initialize the connection
    const connection = await createConnection();

    app.listen(PORT, () => {
      console.log(`Node server listening on ${PORT}!`);

      connection.connect((err) => {
        if (err) throw err;
        console.log(`Connected To ${connection.config.database}`);
      });
    });
  } catch (error) {
    console.error('Error in setup:', error);
  }
})();
