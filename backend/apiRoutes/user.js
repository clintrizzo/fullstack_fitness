const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '0.0.0.0',
  user: 'root',
  password: 'root',
  database: 'pl_test_schemas',
});


router.put('/api/users', (req, res) => {
  var query = `UPDATE pl_test_schemas.Users
    SET username=?, firstname=?, lastname=?, email=?, password=?, creationdate=?
    WHERE userid=?`;

  var values = [
    req.body['username'],
    req.body['firstname'],
    req.body['lastname'],
    req.body['email'],
    req.body['password'],
    req.body['creationdate'],
    req.body['userid']
  ];

  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json('Failed'); // Send an error response
      return; // Ensure to exit the function on error
    }

    console.log('Updated Successfully');
    res.json('Updated Successfully'); // Send the success response
  });
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

router.post('/api/users', (req, res) => {
  var query = `INSERT INTO pl_test_schemas.Users (
    username,
    firstname,
    lastname,
    email,
    password,
    creationdate
  ) VALUES (?, ?, ?, ?, ?, ?)`;

  var values = [
    req.body['username'],
    req.body['firstname'],
    req.body['lastname'],
    req.body['email'],
    req.body['password'],
    req.body['creationdate']
  ];

  connection.query(query, values, function (err, rows, fields) {
    if (err) {
      res.send('Failed');
    }
    res.json('Inserted Successfully');
  });
});

// New route for user login
router.post('/api/users/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = `
    SELECT * FROM pl_test_schemas.Users
    WHERE email = ? AND password = ?`;

  connection.query(query, [email, password], function (err, rows, fields) {
    if (err) {
      console.error(err);
      res.status(500).json('Failed');
      return;
    }

    if (rows && rows.length > 0) {
      const user = {
        userId: rows[0].userid,
        username: rows[0].username,
        firstname: rows[0].firstname,
        lastname: rows[0].lastname,
        // Include other fields you need
      };

      res.json({
        status: 'Login Successful',
        user: user,
      });
    } else {
      res.status(401).json('Login Failed');
    }
  });
});



router.delete('/api/users/:id',(req,res)=>{

  var query= `DELETE from pl_test_schemas.Users
   where userid=?`;
  var values = [
      parseInt(req.params.id)
  ];

  connection.query(query,values,function(err,rows,fields){
      if(err){
          res.send('Failed');
      }
      res.json('Deleted Successfully');
  })
})

//need this line for middle ware don't delete
module.exports = router;
