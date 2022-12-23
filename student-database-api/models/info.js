// info schema

var mongoose = require("mongoose");

// The schema of the account info
var infoSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    id:{
        type:String, required:true, unique:true
    },
    role:{
        type:String,
        enum:["student","teacher","admin"],
        require:true
    },
    name:{
        type: String,
        required: true

    },
    birthday: {
        type:String,
        required: true
    },
    address: {
        type:String
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required:true
    },
    mail:{type:String, required:true, unique:true},
    phone:{
        type:String,
        required:true
    },
    subject: {
        type:String,
        default:null
    }
});

var info = mongoose.model("info", infoSchema);

module.exports = info;