const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwtGenerator = require('../utils/jwtGenerator');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {firstName, lastName, city, zip, address, email, password, isSecretary, doctorid} = req.body;
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
        `INSERT INTO users(firstname, lastname, city, zip, address, email, passhash, issecretary, doctorid) 
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) 
        RETURNING id, firstname, lastname, city, zip, address, email, issecretary, doctorid`,
        [firstName, lastName, city, zip, address, email, hashedPass, isSecretary, doctorid]);
			const access_token = jwtGenerator(newUser.rows[0].id);
      res.header('x-auth-token', access_token).send({access_token, user: newUser.rows[0]})
    } else {
      res.status(401).json({ status: 'User already registered', username : null})
    }
});

router.get('/', async (req, res) => {
  const {date} = req.query;
  const user = await pool.query(
  `SELECT u.id, CONCAT(firstname , ' ', lastname) as name, d.name as doctorname, ap.datetime::TIMESTAMP, u.doctorid, email, issecretary FROM users as u
  JOIN appointments as ap on ap.userid = u.id
  JOIN doctors as d on ap.doctorid = d.id
   WHERE issecretary=false AND ap.datetime::TIMESTAMP::DATE = $1::TIMESTAMP::DATE;`, [date]);
  res.json(user.rows);
});

router.get('/patients', async (req, res) => {
  const patients = await pool.query(
  "SELECT id, CONCAT(firstname , ' ', lastname) as name, email, address, zip, city FROM users WHERE issecretary=false");
  console.log(patients.rows)
  res.json(patients.rows);
});

router.get('/history', async (req, res) => {
  const {userid} = req.query;
  const userHistory = await pool.query(
  `SELECT u.id, CONCAT(firstname , ' ', lastname) as name, u.email, d.name as doctorname, ap.datetime FROM users u
    JOIN appointments as ap on ap.userid=u.id
    JOIN doctors as d on d.id = ap.doctorid
    WHERE issecretary=false and u.id = $1`, [userid]);
  res.json(userHistory.rows);
});

router.get('/financial', async (req, res) => {
  console.log(req.query);
  const {doctorid, isMultiple, datetime, from, to} = req.query;
  if (isMultiple==="true") {
    const patients = await pool.query(
      `SELECT u.id, CONCAT(firstname , ' ', lastname) as name, app.datetime, money FROM doctors as d
      JOIN appointments as app on app.doctorid = d.id
      JOIN users as u on u.id= app.userid
      WHERE d.id=$1 AND app.datetime::TIMESTAMP::DATE BETWEEN $2::TIMESTAMP::DATE 
	  	AND $3::TIMESTAMP::DATE`, [doctorid, from, to]);
    
    res.json(patients.rows);
  } else {
    const patients = await pool.query(
      `SELECT u.id, CONCAT(firstname , ' ', lastname) as name, app.datetime, money FROM doctors as d
      JOIN appointments as app on app.doctorid = d.id
      JOIN users as u on u.id= app.userid
      WHERE d.id=$1 AND app.datetime::TIMESTAMP::DATE = $2::TIMESTAMP::DATE`, [doctorid, datetime]);
    console.log(patients.rows)
    res.json(patients.rows);
  }
});

module.exports = router;
