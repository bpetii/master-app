const express = require('express');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth');
const users = require('./routes/users');
const doctors= require('./routes/doctors');
const appointments = require('./routes/appointments');
const workplan = require('./routes/workplan');
require("dotenv").config();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/doctors', doctors)
app.use('/api/appointments', appointments)
app.use('/api/workplan', workplan)

const port = process.env.PORT || 4000

app.listen(port, ()=> console.log(`App listening on port ${port}!`))