const mongoose =require('mongoose');

const videoSchema = new mongoose.Schema({
    collegename:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    subjectname:{
        type:String,
        required:true
    },
    coursedata:[{type:mongoose.Schema.Types.ObjectId,ref:"courses"}]
})
module.exports = mongoose.model('videos',videoSchema);