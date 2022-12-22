var mongoose = require("mongoose");
var gradeSchema = new mongoose.Schema({

});

var Grade = mongoose.model("grade", gradeSchema);

module.exports = Grade