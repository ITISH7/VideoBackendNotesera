const { createuser, getuser } = require('../controller/authcontroller');

const route = require('express').Router();

route.post('/addadmin',createuser);
route.post('/admin',getuser)
module.exports = route;