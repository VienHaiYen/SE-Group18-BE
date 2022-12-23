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


// Create new account function
function createAccount(ID, PASSWORD, ROLE) {
    const acc = mongoose.model("account", Account.schema);

    var check = getter.getAccount(ID);
    if (check instanceof Error) {
        msg = "error"
        return msg;
    }

    if (check != null) {
        msg = "dupplicate ID"
        return msg;
    }

    var newAcc = new acc({
        id : ID,
        password : PASSWORD,
        role:ROLE
    });

    newAcc.save();
    msg = "success"
    return msg;
}

// Update account function
// MISSING
function updateAccount(ID, PASSWORD, ROLE) {

}

// Create new Profile for account function
function createProfile(id, role, name, birthday, address, gender, mail, phone, subject) {

    if (!id) {
        // req.flash("error", "Please fill in an ID");
        msg = "Please fill in an ID";
        return msg;
    }
    if (!mail) {
        // req.flash("error", "Please fill in an email");
        msg = "Please fill in an email";
        return msg;
    }
    if (!name) {
        // req.flash("error", "Please fill in a name");
        msg = "Please fill in a name";
        return msg;
    }
    if(!birthday) {
        // req.flash("error", "Please fill in a birthday");
        msg = "Please fill in a birthday";
        return msg;
    }
    if (!phone ) {
        // req.flash("error", "Please fill in a phone number");
        msg = "Please fill in a phone number";
        return msg;
    }
    if (!gender) {
        // req.flash("error", "Please fill in a gender");
        msg = "Please fill in a gender";
        return msg;
    }
    var info = mongoose.model("info", Info.schema);

    msg = info.findOne({"id":id}, function(err, result) {
        if (err) {return err;}
        if (result) {
            // req.flash("error", "ID's already existed");
            return "Dupplicate student ID";
        }

        info.findOne({"mail":mail}, function(err, result) {
            if (err) {return err;}
            if (result) {
                // req.flash("error", "There's already an account with this email");
                return "Dupplicate email";
            }

            info.findOne({"phone":phone}, function(err, result) {
                if (err) {return err;}
                if (result) {
                    // req.flash("error", "There's already an account with this phone number");
                    return "Dupplicate phone number";
                }
            });    
        });
        return "success";
    })

    if (msg instanceof Error) {
        return msg;
    }

    if (msg != "success") {
        return msg;
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
    msg = "success";
    return msg;
}

// Update profile function
// MISSING
function updateProfile(id, role, name, birthday, address, gender, mail, phone, subject) {

}

// Create Teacher Schedule function
function createTeacherSchedule(id, tkb) {
    const teacher_schedule = mongoose.model("scheduleTeacher", Teacher_schedule.schema);

    var check = getter.getTeacherSchedule(id);
    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        msg = "Dupplicate ID"
        return msg;
    } else {
        var newSchedule = new teacher_schedule({
            id : id,
            tkb : tkb
        })

        newSchedule.save();
        msg = "success"
        return msg;
    }   
}

// Update teacher Schedule Function
function updateTeacherSchedule(id, result) {

}

// Create Class function
function createClass(id, className, member) {
    const _class = mongoose.model("class", Class.schema);

    var check = _class.findOne({"id" : id}, (err, result) => {
        if (err) return err;
        if (result) return true;
        else return false;
    })

    if (check instanceof Error) {
        return check;
    }

    if (check) {
        msg = "Dupplicate class ID"
        return msg;
    }

    var newClass = new _class({
        id : id,
        className : className,
        member : member
    })

    newClass.save();
    msg = "success";
    return msg;
}

// Update Class Function
// MISSING
function updateClass(id, className, member) {

}

// create Grade function
function createGrade(id, result) {
    const grade = mongoose.model("grade", Grade.schema);

    var check = getter.getGrade(id);
    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        msg = "Dupplicate ID"
        return msg;
    } else {
        var newGrade = new grade({
            id : id,
            result : result
        })

        newGrade.save();
        msg = "success"
        return msg;
    }   
}


// Update Greade Function
function updateGrade(id, result) {
    const grade = mongoose.model("grade", Grade.schema);

    var check = getter.getGrade(id);
    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        grade.updateOne({"id" : id}, {"result" : result});
        msg = "success"
        return msg;
    } else {
        return null;
    }
}


// Create Rule Function
function createRule(numberOfStudent, numberOfClass, age) {
    const rule = mongoose.model("rule", Rule.schema);
    
    var check = rule.deleteMany({}, (err) => {
        if (err) return err;
    })

    if (check instanceof Error) {
        return check;
    }

    var newRule = new rule({
        numberOfStudent : numberOfStudent,
        numberOfClass : numberOfClass,
        age: age
    })

    newRule.save();
    msg = "success"
    return msg;
}

// Update Rule Function
// MISSING
function updateRule(numberOfStudent, numberOfClass, age) {

}


// Create Schoolyear Function
function createSchoolYear(YEAR, semester, nid) {
    const year = mongoose.model("Schoolyear", SchoolYear.schema);

    var check = getter.getSchoolYear(nid);

    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        msg = "Dupplicate year ID"
        return msg;
    } else {
        var newYear = new year({
            year : YEAR,
            semester : semester,
            nid : nid
        })

        newYear.save();
        msg = "success";
        return msg;
    }
}

// Update Schoolyear Function
// MISSING
function updateSchoolYear(YEAR, semester, nid) {

}

module.exports = {
    controller: {createAccount, updateAccount, createProfile, updateProfile, createTeacherSchedule,
         updateTeacherSchedule, createClass, updateClass, createGrade, updateGrade,
          createRule, updateRule, createSchoolYear, updateSchoolYear}
}
