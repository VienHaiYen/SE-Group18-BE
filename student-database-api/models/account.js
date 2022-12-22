var mongoose = require("mongoose");
var accountSchema = new mongoose.Schema({
    
});

var Account = mongoose.model("account", accountSchema);

module.exports = Account