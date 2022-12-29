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
    className : {
        type:String,
        required:true
    },
    headteacher:{
        type:String,
        required:true,
    },
    members: [String]
});

classSchema.index({nid : 1, id : 1}, {unique: true})

var Class = mongoose.model("_class", classSchema);

module.exports = Class;