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

// `//define Fucntion to create an student
// function createStudent(ID){
//     //define "grade" is a schema of " Grade"
//     const grade= mongoose.model("grade",Grade.schema);
//     var newGrade=new grade({
//         id: ID,
//         result: {
//             Toan:{


//             }
//         }

        
//     })   ; 

// }

function createInfo(USERNAME, ID, ROLE, NAME, BIRTHDAY, ADDRESS, GENDER, MAIL, PHONE, SUBJECT)
{
    const info=mongoose.model("info",Info.schema);
    if(ROLE=="student")
    {var newInfo=new info({
        username: USERNAME,
        id:ID,
        role:ROLE,
        name:NAME,
        birthday:BIRTHDAY,
        address:ADDRESS,
        gender:GENDER,
        mail:MAIL,
        phone:PHONE,
     

    });}
    if (ROLE=="teacher")
    {
        var newInfo=new info({
            username: USERNAME,
            id:ID,
            role:ROLE,
            name:NAME,
            birthday:BIRTHDAY,
            address:ADDRESS,
            gender:GENDER,
            mail:MAIL,
            phone:PHONE,
         
    
        });
    }
    newInfo.save();
}

function createRule(numStuent,numClass,Age)
{
    
}

async function main() {

    // connect to mongoDB
    await mongoose.connect(param.DATABASE);

    // call the function
    createAccount("123", "123", "student"); 
    createInfo("thinh","123","thinh","04/05/2002","HO CHI MINH","male","thinhngo04052002@gmail.com",null);
    return 0;
}