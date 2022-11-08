const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const {omit} = require('lodash')
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {email, password, isSecretary} = req.body;
  
    const user = await pool.query(
      "SELECT id, CONCAT(firstname , ' ', lastname) as name, city, zip, address, doctorid, passhash, email, issecretary FROM users u WHERE u.email=$1 AND u.issecretary=$2",
      [email, isSecretary])
  
      if (!user.rowCount) return res.status(400).json({ status: "Invalid email or password"});
        
      const isValidPassword = await bcrypt.compare(password, user.rows[0].passhash);
      if(!isValidPassword) return res.status(400).json({ status: "Invalid email or password"})

      const access_token = jwtGenerator(user.rows[0].id);
      res.header('x-auth-token', access_token).send({ access_token, user: omit(user.rows[0], ['passhash']) }) 
  });

  module.exports = router;
  