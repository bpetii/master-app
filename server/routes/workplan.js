const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization')

router.post("/", authorization, async (req, res) => {
  const {secretaryid, from, to, number, comments, datetime} = req.body;
  try {
    const appointments = await pool.query(
      `INSERT INTO workplan (secretaryid, "from", "to", number, comments, datetime)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [secretaryid, from, to, number, comments, datetime]);
	res.json(appointments.rows[0]);
  } catch (err){
    console.error(err.message);
    res.status(500).json("Server Error");
  }
})

router.get("/", authorization, async (req, res) => {
    const {secretaryid, datetime} = req.query;
    try {
      const appointments = await pool.query(
        `SELECT "from", "to", number, comments, datetime::TIMESTAMP FROM workplan
        WHERE secretaryid=$1 AND datetime::TIMESTAMP::DATE=$2::TIMESTAMP::DATE`, [secretaryid, datetime])
      res.json(appointments.rows[0] || null);
    } catch (err){
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  })

module.exports = router;
