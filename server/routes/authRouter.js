const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const {username, password} = req.body;

 
  const loginQuery = await pool.query(
    "SELECT id, username, passhash FROM users u WHERE u.username=$1",
    [username])

	if (loginQuery.rowCount>0){
		const isSamePass = await bcrypt.compare(
			password, 
			loginQuery.rows[0].passhash
		);
		if (isSamePass) {
			req.session.user ={
				username,
				id: loginQuery.rows[0].id
			}
		} else {
			res.json({loggedIn: false, status: "Wrong username or password", username: null})
		}
	} else {
		res.json({loggedIn: false, status: "Wrong username or password", username: null})
	}
});

router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    const existingUser = await pool.query(
        "SELECT username from users WHERE username=$1",
        [username]
    );

    if(existingUser.rowCount === 0) {
        const hashedPass = await bcrypt.hash(password, 10)
        const insertUserQuery = await pool.query(
            "INSERT INTO users(username, passhash) VALUES($1,$2) RETURNING id",
            [username, hashedPass]);
        req.session.user = {
          username,
          id: insertUserQuery.rows[0].id
        }
        res.json({loggedIn: true, username, status:'Registered'})
    } else {
        res.json({loggedIn: false, status: 'Username taken', username : null})
    }
});

module.exports = router;