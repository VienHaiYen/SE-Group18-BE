

var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Basically a factor that play a part in the HASH
// or encrypt function
const SALT_FACTOR = 10;
var accountSchema = new mongoose.Schema({
    id : {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    role : {
        type: String,
        required: true
    }
});


// Encrypt the password, or HASH the password
accountSchema.pre("save", function(done) {
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

accountSchema.methods.checkPassword = function(guess, done) {
    // If a password is provided, then check
    if (this.password != null) {
        bcrypt.compare(guess, this.password, function(err, isMatch){
            done(err, isMatch);
        });
    }
}

accountSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["id"]});

var Account = mongoose.model("account", accountSchema);

module.exports = Account