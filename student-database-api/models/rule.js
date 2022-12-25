var mongoose = require("mongoose");
var ruleSchema = new mongoose.Schema({
    nid:{type:String, required:true,unique:true},
    numberOfStudent:{
        min:{type:Number},
        max:{type:Number, default:40}
    },
    numberOfClass:{
        _10:{type:Number, default:4},
        _11:{type:Number, default:3},
        _12:{type:Number, default:2}
    },
    age:{
        min:{type:Number, default:15},
        max:{type:Number, default:20}
    }
});

var Rule = mongoose.model("rule", ruleSchema);

module.exports = Rule;