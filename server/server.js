const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const authRouter = require('./routes/authRouter');
const session = require('express-session');
require("dotenv").config();


app.use(helmet());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());

app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials:true,
    name: 'sid',
    resave: false,
    saveUnititialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    } 
}))

app.use("/auth", authRouter)

const port = 4000

app.listen(port, ()=> console.log(`App listening on port ${port}!`))