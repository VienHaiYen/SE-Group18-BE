var mongoose = require("mongoose");
var classSchema = new mongoose.Schema({
    nid : {
        type:String,
        required: true
    },
    id : {
        type:String,
        required: true
    },
    classname : {
        type:String,
        required:true
    },
    member: [String]
});

classSchema.index({nid : 1, id : 1}, {unique: true})

var Class = mongoose.model("class", classSchema);

module.exports = Class;