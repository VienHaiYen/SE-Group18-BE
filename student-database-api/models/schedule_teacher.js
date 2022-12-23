var mongoose = require("mongoose");
var teacherScheduleSchema = new mongoose.Schema({
    nid:{
        type:String,
        required:true,
        unique:true
    },
    schedule:[{
        id:{type:String, required:true,unique:true},
        class:[{type:String,required:true,unique:true}]
    }]
});

var Teacher_schedule = mongoose.model("scheduleTeacher", teacherScheduleSchema);

module.exports = Teacher_schedule;