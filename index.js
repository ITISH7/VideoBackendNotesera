const express = require('express');
const app =express()
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require("cors");
const env = require('dotenv');
env.config();
const {notfound,errorhandler} =require('./middleware/errorhandler')
const dbconnect = require('./config/dbconfig');
//database connectivity
dbconnect();
//routing  variables
const video = require('./routes/videodataRoute');
const auth = require('./routes/authRoute');
//configures
app.use(bodyParser.json())
app.use(cors({
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieparser())
app.use(bodyParser.urlencoded({ extended: false }));
//routing
app.use('/video',video);
app.use('/authlogin',auth);

// middleware error handlings
app.use(notfound);
app.use(errorhandler);
const Port = process.env.PORT||4000
app.listen(Port,()=>{
    console.log(`server is running at${Port}`);
})