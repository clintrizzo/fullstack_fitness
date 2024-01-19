const express = require('express');
const router = express.Router();
const { createConnection } = require('../dbpath/db');

// Initialize the connection
let connection;

// Wrap your code in an immediately invoked async function
(async () => {
  try {
    connection = await createConnection();

    router.post('/api/users', async (req, res) => {
      // Check if email or username already exists
      const checkQuery = 'SELECT COUNT(*) as count FROM pl_test_schemas.Users WHERE email = ? OR username = ?';
      const checkValues = [req.body['email'], req.body['username']];

      try {
        const [rows] = await connection.execute(checkQuery, checkValues);
        const count = rows[0].count;

        if (count > 0) {
          // Email or username already exists
          return res.status(409).json('Email or username already exists');
        }

        // Format the date
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        // Proceed with registration if email and username are unique
        const insertQuery = `INSERT INTO pl_test_schemas.Users
          (username, firstname, lastname, email, password, creationdate)
          VALUES (?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s'))`;

        const insertValues = [
          req.body['username'],
          req.body['firstname'],
          req.body['lastname'],
          req.body['email'],
          req.body['password'],
          formattedDate,
        ];

        const [insertResult] = await connection.execute(insertQuery, insertValues);

        console.log('Registration Successful');
        res.json({ message: 'Registration Successful', userid: insertResult.insertId });
      } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json('Registration Failed');
      }
    });

    router.get('/api/users/:id', (req, res) => {
      const userId = req.params.id;
      const query = `SELECT * FROM pl_test_schemas.Users WHERE userid = ?`;

      connection.query(query, [userId], function (err, rows, fields) {
        if (err) {
          console.error(err); // Log the error for debugging
          res.send('Failed');
          return; // Ensure to exit the function on error
        }

        console.log('Rows:', rows); // Log rows to check its value

        if (rows && rows.length > 0) {
          res.json(rows[0]); // Assuming you want to send the first matching user
        } else {
          res.send('User not found');
        }
      });
    });

    router.delete('/api/users/:id', (req, res) => {
      var query = `DELETE from pl_test_schemas.Users
       where userid=?`;
      var values = [
        parseInt(req.params.id)
      ];

      connection.query(query, values, function (err, rows, fields) {
        if (err) {
          res.send('Failed');
        }
        res.json('Deleted Successfully');
      });
    });
  } catch (error) {
    console.error('Error in setup:', error);
  }
})();

module.exports = router;
