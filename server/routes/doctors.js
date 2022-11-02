const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization')

router.get("/", authorization, async (req, res) => {
  try {
    const doctors = await pool.query(`
    SELECT d.id, d.name, expertise, city, "from", "to", ARRAY_AGG(app.datetime::TIMESTAMP) as appointments FROM doctors as d
    LEFT JOIN appointments as app on app.doctorid = d.id
    GROUP BY d.id, d.name, d.expertise, d.city, d.from, d.to`,
		[]);
		res.json(doctors.rows);
  } catch (err){
    console.error(err.message);
    res.status(500).json("Server Error");
  }
})

module.exports = router;
