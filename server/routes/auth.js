const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const {omit} = require('lodash')
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {email, password} = req.body;
  
    const user = await pool.query(
      "SELECT id, name, passhash, email, issecretary FROM users u WHERE u.email=$1",
      [email])
  
      if (!user.rowCount) return res.status(400).json({loggedIn: false, status: "Invalid email or password", username: null});
        
      const isValidPassword = await bcrypt.compare(password, user.rows[0].passhash);
      if(!isValidPassword) return res.status(400).json({loggedIn: false, status: "Invalid email or password", ema: null})

      const access_token = jwtGenerator(user.rows[0].id);
      res.header('x-auth-token', access_token).send({access_token, loggedIn: true, user: omit(user.rows[0], ['passhash'])}) 
  });

  module.exports = router;
  