const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization')

router.get("/", authorization, async (req, res) => {
  try {
    const doctors = await pool.query(`SELECT id, name, expertise, city, "from", "to" FROM doctors`,
		[]);
		res.json(doctors.rows);
  } catch (err){
    console.error(err.message);
    res.status(500).json("Server Error");
  }
})

module.exports = router;