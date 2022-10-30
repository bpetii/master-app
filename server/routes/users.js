const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {email, doctorid, password, name, isSecretary} = req.body;
    console.log(req.body);
    const existingUser = await pool.query(
        "SELECT id from users WHERE email=$1",
        [email]
    );

    if(existingUser.rowCount === 0) {
			const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds) 
      const hashedPass = await bcrypt.hash(password, salt)
      const newUser = await pool.query(
        "INSERT INTO users(name, doctorid, email, passhash, issecretary) VALUES($1,$2,$3,$4,$5) RETURNING id, name, doctorid, email, issecretary",
        [name, doctorid, email, hashedPass, isSecretary]);
			const access_token = jwtGenerator(newUser.rows[0].id);
      res.header('x-auth-token', access_token).send({access_token, user: newUser.rows[0]})
    } else {
      res.status(401).json({ status: 'User already registered', username : null})
    }
});

router.get('/', async (req, res) => {
  const {date} = req.query;
  const user = await pool.query(
  `SELECT u.id, u.name, d.name as doctorname, ap.datetime::TIMESTAMP, u.doctorid, email, issecretary FROM users as u
  JOIN appointments as ap on ap.userid = u.id
  JOIN doctors as d on ap.doctorid = d.id
   WHERE issecretary=false AND ap.datetime::TIMESTAMP::DATE = $1::TIMESTAMP::DATE;`, [date]);
  res.json(user.rows);
});

router.get('/patients', async (req, res) => {
  const patients = await pool.query(
  "SELECT id, name, email FROM users WHERE issecretary=false");
  res.json(patients.rows);
});

router.get('/history', async (req, res) => {
  const {userid} = req.query;
  const userHistory = await pool.query(
  `SELECT u.id, u.name as username, u.email, d.name as doctorname, ap.datetime FROM users u
    JOIN appointments as ap on ap.userid=u.id
    JOIN doctors as d on d.id = ap.doctorid
    WHERE issecretary=false and u.id = $1`, [userid]);
  res.json(userHistory.rows);
});

module.exports = router;
