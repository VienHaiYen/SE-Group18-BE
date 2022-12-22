// info schema

var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Basically a factor that play a part in the HASH
// or encrypt function
const SALT_FACTOR = 10;

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
    },
    fullname:{
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

// Encrypt the password, or HASH the password
infoSchema.pre("save", function(done) {
    var user = this;

    if (!user.isModified("password")) {
        return done(); 
        // If there is not any change in the password field, 
        // while bother encrypt it again?
    }

    bcrypt.genSalt(SALT_FACTOR, function(err,salt){
        if (err) {return done(err);}
        bcrypt.hash(user.password, salt, function(err, hasedPassword) {
            if (err) {return done(err);}

            user.password = hasedPassword;

            done();
        });
    });
});

infoSchema.methods.checkPassword = function(guess, done) {
    // If a password is provided, then check
    if (this.password != null) {
        bcrypt.compare(guess, this.password, function(err, isMatch){
            done(err, isMatch);
        });
    }
}

infoSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["email"]});

var Admin = mongoose.model("admin", infoSchema);

module.exports = Admin;