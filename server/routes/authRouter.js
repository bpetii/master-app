const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {

});

router.post('/signup', (req, res) => {
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
        res.json({loggedIn: true, username, statues:'Registered'})
    } else {
        res.json({loggedIn: false, status: 'Username taken', username : null})
    }
});

module.exports = router;