const express = require('express');
const router = express.Router();
const { createConnection } = require('../dbpath/db');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);

let connection;

(async () => {
  try {
    connection = await createConnection();
  } catch (error) {
    console.error('Error creating connection:', error);
    return;
  }
})();

// New route for user login
const jwt = require('jsonwebtoken');

router.post('/api/users/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const [rows] = await connection.query(
      'SELECT * FROM pl_test_schemas.Users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows && rows.length > 0) {
      const user = {
        userId: rows[0].userid,
        username: rows[0].username,
        firstname: rows[0].firstname,
        lastname: rows[0].lastname,
        creationdate: rows[0].creationdate,
        // Include other fields you need
      };

      const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });

      res.json({
        status: 'Login Successful',
        user: user,
        token: token,
      });
    } else {
      res.status(401).json('Login Failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json('Failed');
  }
});


router.post('/api/users/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json('Failed to logout');
      } else {
        res.json('Logout Successful');
      }
    });
  } else {
    res.status(401).json('No active session to logout');
  }
});

module.exports = router;
