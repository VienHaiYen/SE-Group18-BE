var mongoose = require("mongoose");
var ruleSchema = new mongoose.Schema({
    
});

var Rule = mongoose.model("rule", ruleSchema);

module.exports = Rule;