const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization')

router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const user = await pool.query(
    "SELECT id, username, passhash FROM users u WHERE u.username=$1",
    [username])

		console.log(user);
	if (user.rowCount>0){
		const isValidPassword = await bcrypt.compare(
			password, 
			user.rows[0].passhash
		);
		if (isValidPassword) {
			const token = jwtGenerator(user.rows[0].id);
			res.json({token})
		} else {
			res.status(401).json({loggedIn: false, status: "Wrong username or password", username: null})
		}
	} else {
		res.status(401).json({loggedIn: false, status: "Wrong username or password", username: null})
	}
});

router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    const existingUser = await pool.query(
        "SELECT username from users WHERE username=$1",
        [username]
    );

    if(existingUser.rowCount === 0) {
			const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds) 
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = await pool.query(
          "INSERT INTO users(username, passhash) VALUES($1,$2) RETURNING id",
          [username, hashedPass]);
			const token = jwtGenerator(newUser.rows[0].id);
      res.json({token})
    } else {
        res.status(401).json({loggedIn: false, status: 'Username taken', username : null})
    }
});

router.post('/is-verify', authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.log(err.message);
		res.send(500).json("Server Error");
	}
});

module.exports = router;