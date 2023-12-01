const express = require('express');
const app =express()
const bodyParser = require('body-parser');
const cors = require("cors");
const env = require('dotenv');
env.config();
const dbconnect = require('./config/dbconfig');
dbconnect();
const videoRouter = require('./routes/videodataRoute');
const authRouter = require('./routes/authRoute');
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/video',videoRouter);
app.use('/authlogin',authRouter);
const Port = process.env.PORT||4000
app.listen(Port,()=>{
    console.log(`server is running at${Port}`);
})