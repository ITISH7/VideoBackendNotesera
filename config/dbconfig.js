const mongoose = require('mongoose')
const dbconnect=()=>{
    mongoose.
mongoose.connect(process.env.CONNECTION_URI).then(()=>{
    console.log('database connected successfully');

}).catch((err)=>{
    console.log(err);
})
}
module.exports =dbconnect;