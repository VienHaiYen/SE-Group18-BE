var mongoose = require("mongoose");
var teacherScheduleSchema = new mongoose.Schema({
    nid:{
        type:String,
        required:true,
        unique:true
    },
    schedule:[{
        id:{type:String, required:true,unique:true},
        _class:[{type:String,required:true,unique:true}]
    }]
});

var Teacher_schedule = mongoose.model("teacher-schedule", teacherScheduleSchema);

module.exports = Teacher_schedule;