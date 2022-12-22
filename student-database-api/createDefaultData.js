const express = require("express");
const mongoose = require("mongoose");
const param = require("./params/params");
const Account = require("./models/account");
const Class = require("./models/class");
const ClassList = require("./models/classList");
const Grade = require("./models/grade");
const Info = require("./models/info");
const Rule = require("./models/rule");
const Schoolyear = require("./models/schoolyear");

var router = express();

main().catch((err) => {
    console.log(err);
})


// define Function to create an account
function createAccount(ID, PASSWORD, ROLE) {

    // define that "acc" is a schema of "Account"
    const acc = mongoose.model("account", Account.schema);

    // create a new object with the parameters provide to the function
    var newAcc = new acc({
        id : ID,
        password : PASSWORD,
        role:ROLE
    });

    // save the object to MongoDB
    newAcc.save();
}

async function main() {

    // connect to mongoDB
    await mongoose.connect(param.DATABASE);

    // call the function
    createAccount("123", "123", "student");

    return 0;
}






