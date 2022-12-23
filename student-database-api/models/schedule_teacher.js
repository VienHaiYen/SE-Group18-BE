var mongoose = require("mongoose");
var teacherScheduleSchema = new mongoose.Schema({
    
});

var Teacher_schedule = mongoose.model("scheduleTeacher", teacherScheduleSchema);

module.exports = Teacher_schedule;