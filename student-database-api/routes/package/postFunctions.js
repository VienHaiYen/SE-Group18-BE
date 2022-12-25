const express = require("express");
const mongoose = require("mongoose");
const param = require("../../params/params");
const Account = require("../../models/account");
const Class = require("../../models/class");
const Grade = require("../../models/grade");
const Info = require("../../models/info");
const Rule = require("../../models/rule");
const SchoolYear = require("../../models/schoolyear");
const Teacher_schedule = require("../../models/schedule_teacher");
const getter = require("./getFunctions").controller;
const MSG = require("./defineMessage").msg;


// Create new account function
function createAccount(ID, PASSWORD, ROLE) {
    const acc = mongoose.model("account", Account.schema);

    var check = getter.getAccount(ID);
    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        return MSG.DUPPLICATE_MESSAGE;
    }

    var newAcc = new acc({
        id : ID,
        password : PASSWORD,
        role:ROLE
    });

    newAcc.save();
    return MSG.SUCCESS_MESSAGE;
}

// Update account function
function updateAccount(ID, PASSWORD, ROLE) {
    const acc = mongoose.model("account", Account.schema);
    var check = getter.getAccount(ID);

    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        acc.updateOne({"id" : ID}, {$set : {
            "password" : PASSWORD,
            "role" : ROLE
        }});
        return MSG.SUCCESS_MESSAGE;
    } else {
        return MSG.EMPTY_MESSAGE;
    }
}

// Create new Profile for account function
function createProfile(id, role, name, birthday, address, gender, mail, phone, subject) {

    var info = mongoose.model("info", Info.schema);

    var check = info.findOne({"id":id}, function(err, result) {
        if (err) {return MSG.ERROR_MESSAGE;}
        if (result) {
            // req.flash("error", "ID's already existed");
            return MSG.DUPPLICATE_MESSAGE;
        }

        info.findOne({"mail":mail}, function(err, result) {
            if (err) {return MSG.ERROR_MESSAGE;}
            if (result) {
                // req.flash("error", "There's already an account with this email");
                return MSG.DUPPLICATE_MESSAGE;
            }

            info.findOne({"phone":phone}, function(err, result) {
                if (err) {return MSG.ERROR_MESSAGE;}
                if (result) {
                    // req.flash("error", "There's already an account with this phone number");
                    return MSG.DUPPLICATE_MESSAGE;
                }
            });    
        });
        return MSG.SUCCESS_MESSAGE;
    })

    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.SUCCESS_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    const profile = mongoose.model("info", Info.schema);
    var newProfile = new profile({
        id:id,
        role:role,
        name: name,
        birthday:birthday,
        address:address,
        gender:gender,
        mail:mail,
        phone:phone,
        subject:subject
    })
    newProfile.save();
    return MSG.SUCCESS_MESSAGE;
}

// Update profile function
function updateProfile(id, role, name, birthday, address, gender, mail, phone, subject) {
    const info = mongoose.model("info", Info.schema);

    var check = getter.getInfo(id);
    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        info.updateOne({"id" : id}, {$set : {
            "role" : role,
            "name" : name,
            "birthday" : birthday,
            "address" : address,
            "gender" : gender,
            "mail" : mail,
            "phone" : phone,
            "subject" : subject
        }});
        return MSG.SUCCESS_MESSAGE;
    } else {
        return MSG.EMPTY_MESSAGE;
    }
}

// Create Teacher Schedule function
function createTeacherSchedule(nid, id, tkb) {
    const teacher_schedule = mongoose.model("teacher-schedule", Teacher_schedule.schema);

    var check = getter.getTeacherSchedule(nid,id);
    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        return MSG.DUPPLICATE_MESSAGE;
    } else {
        var newSchedule = new teacher_schedule({
            nid : nid,
            schedule : {
                id : id,
                _class : _class
            }
        })

        newSchedule.save();
        return MSG.SUCCESS_MESSAGE;
    }   
}

// Update teacher Schedule Function
function updateTeacherSchedule(nid, id, _class) {
    const teacher_schedule = mongoose.model("teacher-schedule", Teacher_schedule.schema);

    var check = getter.getTeacherSchedule(nid, id);
    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        teacher_schedule.findOneAndUpdate({
            "nid" : nid,
            "schedule.id" : id
        }, { $set : {
            "schedule._class" : _class
        }})
    } else {
        return MSG.EMPTY_MESSAGE;
    }
}


// NEED FIXING (PENDING)
// Create Class function
function createClass(id, className, member) {
    const _class = mongoose.model("class", Class.schema);

    var check = getter.getClass(id);
    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }
    
    if (check != MSG.EMPTY_MESSAGE) {
        return MSG.DUPPLICATE_MESSAGE;
    }

    var newClass = new _class({
        id : id,
        className : className,
        member : member
    })

    newClass.save();
    return MSG.SUCCESS_MESSAGE;
}

// Update Class Function (PENDING)
function updateClass(id, className, member) {
    const _class = mongoose.model("class", Class.schema);
    var check = getter.getClass(id);

    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        _class.updateOne({
            //"nid" : nid,
            "classlist.id" : id 
        }, {
            "className" : className,
            "member" : member
        });
        return MSG.SUCCESS_MESSAGE;
    } else {
        return MSG.DUPPLICATE_MESSAGE;
    }
}
// NEED FIXING (DONE)
// create Grade function
function createGrade(nid, id, result) {
    const grade = mongoose.model("grade", Grade.schema);

    var check = getter.getGrade(nid, id);
    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        return MSG.DUPPLICATE_MESSAGE;
    } else {
        var newGrade = new grade({
            id : id,
            result : result
        })

        newGrade.save();
        return MSG.SUCCESS_MESSAGE;
    }   
}

// NEED FIXING (DONE)
// Update Greade Function
function updateGrade(nid, id, result) {
    const grade = mongoose.model("grade", Grade.schema);

    var check = getter.getGrade(nid, id);
    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        grade.updateOne({"id" : id}, {"result" : result});
        return MSG.SUCCESS_MESSAGE;
    } else {
        return MSG.DUPPLICATE_MESSAGE;
    }
}

// NEED FIXING (DONE)
// Create Rule Function
function createRule(nid, numStudent,numStudent_max,numClass10,numClass11,numClass12,ageMax,ageMin) {
    const rule = mongoose.model("rule", Rule.schema);
    
    var check = getter.getRule(nid);

    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        return MSG.DUPPLICATE_MESSAGE;
    }

    var newRule=new rule({
        nid : nid,
        numberOfStudent: {
            min:numStudent,
            max:numStudent_max
        },
        numberOfClass:{

            _10:numClass10,
            _11:numClass11,
            _12:numClass12

        },
        age:{
            min:ageMin,
            max:ageMax
        }
    });
    newRule.save();
}

// Update Rule Function
// MISSING
function updateRule(nid, numStudent,numStudent_max,numClass10,numClass11,numClass12,ageMax,ageMin) {
    const rule = mongoose.model("rule", Rule.schema);
    
    var check = getter.getRule(nid);

    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        rule.updateOne({
            nid : nid
        },{$set: {
            numberOfStudent: {
                min:numStudent,
                max:numStudent_max
            },
            numberOfClass:{
    
                _10:numClass10,
                _11:numClass11,
                _12:numClass12
    
            },
            age:{
                min:ageMin,
                max:ageMax
            }
        }})
    } else {
        return MSG.EMPTY_MESSAGE;
    }
}


// Create Schoolyear Function
function createSchoolYear(YEAR, semester, nid) {
    const year = mongoose.model("Schoolyear", SchoolYear.schema);

    var check = getter.getSchoolYear(nid);

    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        return MSG.DUPPLICATE_MESSAGE;
    } else {
        var newYear = new year({
            year : YEAR,
            semester : semester,
            nid : nid
        })

        newYear.save();
        return MSG.SUCCESS_MESSAGE;
    }
}

// Update Schoolyear Function
function updateSchoolYear(YEAR, semester, nid) {
    const year = mongoose.model("Schoolyear", SchoolYear.schema);
    
    var check = getter.getRule(nid);

    if (check == MSG.ERROR_MESSAGE) {
        return MSG.ERROR_MESSAGE;
    }

    if (check != MSG.EMPTY_MESSAGE) {
        year.updateOne({nid : nid}, {$set: {
            "year" : YEAR,
            "semester" : semester
        }})
    } else {
        return MSG.EMPTY_MESSAGE;
    }
}

module.exports = {
    controller: {createAccount, updateAccount, createProfile, updateProfile, createTeacherSchedule,
         updateTeacherSchedule, createClass, updateClass, createGrade, updateGrade,
          createRule, updateRule, createSchoolYear, updateSchoolYear}
}
