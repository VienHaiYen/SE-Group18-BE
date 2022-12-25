const express = require("express");
const mongoose = require("mongoose");
const param = require("./params/params");
const Account = require("./models/account");
const Class = require("./models/class");
const Grade = require("./models/grade");
const Info = require("./models/info");
const Rule = require("./models/rule");
const Schoolyear = require("./models/schoolyear");
const Teacher_schedule = require("./models/schedule_teacher");

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

//define Fucntion to create an student
// function createStudent(ID,t1,t2,t3,t4,t5,v1,v2,v3,v4,v5,l1,l2,l3,l4,l5,h1,h2,h3,h4,h5,s1,s2,s3,s4,s5,ls1,ls2,ls3,ls4,ls5,d1,d2,d3,d4,d5,dd1,dd2,dd3,dd4,dd5,td1,td2,td3,td4,td5){

//     //define "grade" is a schema of " Grade"
//     const grade= mongoose.model("grade",Grade.schema);
//     var newGrade=new grade({
//         id: ID,
//         result: {
//             Toan:{
//                 mieng: t1,
//                 _15:t2,
//                 _45:t3,
//                 _gk:t4,
//                 _ck:t5


//             },
//            Van:{
//                 mieng:v1,
//                 _15:v2,
//                 _45:v3,
//                 _gk:v4,
//                 _ck:v5


//             },
//             Li:{
//                 mieng:l1,
//                 _15:l2,
//                 _45:l3,
//                 _gk:l4,
//                 _ck:l5

//             },
//             Hoa:{
//                 mieng: h1,
//                 _15:h2,
//                 _45:h3,
//                 _gk:h4,
//                 _ck:h5


//             },
//             Sinh:{
//                 mieng:s1,
//                 _15:s2,
//                 _45:s3,
//                 _gk:s4,
//                 _ck:s5


//             },
//             Su:{
//                 mieng:ls1,
//                 _15:ls2,
//                 _45:ls3,
//                 _gk:ls4,
//                 _ck:ls5


//             },
//             Dia:{
//                 mieng:d1,
//                 _15:d2,
//                 _45:d3,
//                 _gk:d4,
//                 _ck:d5
    


//             },
//             DaoDuc:{
//                 mieng:dd1,
//                 _15:dd2,
//                 _45:dd3,
//                 _gk:dd4,
//                 _ck:dd5


//             },
//             TD:{
//                 mieng:td1,
//                 _15:td2,
//                 _45:td3,
//                 _gk:d4,
//                 _ck:d5


//             },
//         }
        
        
        

        

        
//     })   ; 

// }

function createInfo(ID, ROLE, NAME, BIRTHDAY, ADDRESS, GENDER, MAIL, PHONE, _CLASS, SUBJECT)
{
    const info=mongoose.model("info",Info.schema);
    var newInfo=new info({
        id:ID,
        role:ROLE,
        name:NAME,
        birthday:BIRTHDAY,
        address:ADDRESS,
        gender:GENDER,
        mail:MAIL,
        phone:PHONE,
        _class: _CLASS,
        subject: SUBJECT
    });
    newInfo.save();
}

// function createRule(numStudent,numStudent_max,numClass10,numClass11,numClass12,ageMax,ageMin)
// {
//     const rule=mongoose.model("rule",Rule.schema);
//     var newRule=new rule({
//         numberOfStudent: {
//             min:numStudent,
//             max:numStudent_max
//         },
//         numberOfClass:{

//             _10:numClass10,
//             _11:numClass11,
//             _12:numClass12

//         },
//         age:{
//             min:ageMin,
//             max:ageMax
//         }
//     });
//     newRule.save();
// }
// function createTeacherSchedule(n_id,ID,Class)
// {
//     const teacherSchedule=mongoose.model("scheduleTeacher",teacherSchedule.schema);
//     var newteaderSchedule=new teacherSchedule({
//         nid:n_id,
//         schedule: [
//             {
//                 id: ID,
//                 _class:CLASS
            

//             }  

//         ]
        

        
//     })
// }
// function createSchoolyear(y,smt,n_id){
//     const schoolyear=mongoose.model("Schoolyear",SchoolYear.schema);
//     var newSchoolYear=new schoolyear({
//         year:y,
//         semester:smt,
//         nid:n_id
//     });
//     newSchoolYear.save();

// }

function createSchedule(NID, ID, _CLASS) {

    // define that "acc" is a schema of "Account"
    const schedule = mongoose.model("scheduleTeacher", Teacher_schedule.schema);

    // create a new object with the parameters provide to the function
    var newSchedule = new schedule({
        nid: NID,
        schedule:{
            id: ID,
            _class: _CLASS
        }
    });

    // save the object to MongoDB
    newSchedule.save();
}

function updateSchedule(NID, ID, _CLASS){
    const schedule = mongoose.model("scheduleTeacher", Teacher_schedule.schema);
    var newObject = {
        id: ID,
        _class: _CLASS
    };
    schedule.updateOne({nid:NID},{$push:{schedule:newObject}});
}

async function main() {

    // connect to mongoDB
    await mongoose.connect(param.DATABASE);

    // call the function
    // createAccount("19200001", "123", "student");
    // createInfo("19200001","student","test1","04/05/2002","HO CHI MINH","male","19200001@gmail.com","0123456789","c101",null);
    // createSchedule("19201","t001",["c101","c102","c103"]);
    // createSchedule("19201","t002",["c111","c112","c121"]);
    // createSchedule("19201","t003",["c104","c113","c122"]);
    // createSchedule("19201","t004",["c101","c104","c112","c113"]);
    // createSchedule("19201","t005",["c102","c111"]);
    // createSchedule("19201","t006",["c103","c121","c122"]);
    // createSchedule("19201","t007",["c101","c104","c111"]);
    // createSchedule("19201","t008",["c102","c103","c112","c113","c121","c122"]);
    // createSchedule("19201","t009",["c101","c102","c104","c112","c122"]);
    // createSchedule("19201","t010",["c103","c111","c113","121"]);
    // createSchedule("19201","t011",["c101","c104","c111","c113","c121"]);
    // createSchedule("19201","t012",["c102","c103","c112","c122"]);
    // createSchedule("19201","t013",["c101","c103","c111","c113","c122"]);
    // createSchedule("19201","t014",["c102","c104","c112","c121"]);
    // createSchedule("19201","t015",["c101","c103","c112","c121"]);
    // createSchedule("19201","t016",["c102","c104","c111","c113","c122"]);
    // createSchedule("19201","t017",["c101","c102","c103","c104", "c121"]);
    // createSchedule("19201","t018",["c111","c112","c113", "c122"]);
    // createSchedule("19201","t019",["c101","c102","c103", "c111","c112","c122"]);
    // createSchedule("19201","t020",["c104","c113", "c121"]);

    return 0;
}