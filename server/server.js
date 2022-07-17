const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
require("dotenv").config();


app.use(helmet());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());

app.use("/auth", authRouter)
app.use("/dashboard", dashboardRouter)


const port = 4000

app.listen(port, ()=> console.log(`App listening on port ${port}!`))