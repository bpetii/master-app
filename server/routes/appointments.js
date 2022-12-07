const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization')

router.get("/", authorization, async (req, res) => {
  const {userid } = req.query;
  try {
    const appointments = await pool.query("SELECT id, doctorid, datetime, created FROM appointments WHERE userid = $1",
		[userid]);
		res.json(appointments.rows);
  } catch (err){
    console.error(err.message);
    res.status(500).json("Server Error");
  }
})

router.post("/", authorization, async (req, res) => {
  const {datetime, userid, doctorid} = req.body;
  try {
    const appointments = await pool.query(
      `INSERT INTO appointments (userid, doctorid, datetime, created)
      VALUES($1, $2, $3, now()::timestamp) RETURNING *`,
		[userid, doctorid, datetime]);
		res.json(appointments.rows[0]);
  } catch (err){
    console.error(err.message);
    res.status(500).json("Server Error");
  }
})

module.exports = router;
