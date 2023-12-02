const {createvideodata,getvideodata, getsubjectname, get_coursedetails_from_a_subject, getyeardata, getsubjectdata, getalldata, getdepartmentdata, deletetopic, edittopic,} = require('../controller/videosdatacontroller');

const route = require('express').Router()
route.post('/add',createvideodata);

route.get('/see',getvideodata);
route.get('/see/:collegename',getyeardata);
route.get('/see/:collegename/:year',getdepartmentdata);
route.get('/see/:collegename/:year/:department',getsubjectdata)
route.get('/see/:id',getsubjectname);
route.get('/:id/units',get_coursedetails_from_a_subject);
route.get('/all',getalldata)
route.delete('/deletetopic/:topicid/:courseid',deletetopic)
route.put('/edittopic/:id',edittopic)
module.exports =route;