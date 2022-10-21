const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {email, password, name, isSecretary} = req.body;
    const existingUser = await pool.query(
        "SELECT id from users WHERE email=$1",
        [email]
    );

    if(existingUser.rowCount === 0) {
			const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds) 
      const hashedPass = await bcrypt.hash(password, salt)
      const newUser = await pool.query(
        "INSERT INTO users(name, email, passhash, issecretary) VALUES($1,$2,$3,$4) RETURNING id, name, email, issecretary",
        [name, email, hashedPass, isSecretary]);
			const access_token = jwtGenerator(newUser.rows[0].id);
      res.header('x-auth-token', access_token).send({access_token, user: newUser.rows[0]})
    } else {
      res.status(401).json({ status: 'User already registered', username : null})
    }
});

module.exports = router;