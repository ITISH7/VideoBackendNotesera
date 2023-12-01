const mongoose = require('mongoose');
const coursedataSchema= mongoose.Schema(
    {
        unitname:String,
        combinedname:String,
        topics:[{type: mongoose.Schema.Types.ObjectId, ref: "topics" }]
    }
)
module.exports= mongoose.model("courses",coursedataSchema);