var mongoose = require("mongoose");
var schoolyearSchema = new mongoose.Schema({
    year:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        enum: [1, 2],
        required:true
    },
    nid:{
        type:String,
        required:true,
        unique:true
    }
});

var SchoolYear = mongoose.model("Schoolyear", schoolyearSchema);

module.exports = SchoolYear