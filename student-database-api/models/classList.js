var mongoose = require("mongoose");
var classListSchema = new mongoose.Schema({
    
});

var ClassList = mongoose.model("classList", classListSchema);

module.exports = ClassList;