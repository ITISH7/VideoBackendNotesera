const mongoose = require('mongoose');
const topicdataSchema= mongoose.Schema(
    {
        topicname:{type:String},
        uri:{type:String}
    }
)
module.exports = mongoose.model("topics",topicdataSchema)