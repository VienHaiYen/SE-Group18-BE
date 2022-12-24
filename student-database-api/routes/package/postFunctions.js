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
function updateAccount(ID, PASSWORD, ROLE) {
    const acc = mongoose.model("account", Account.schema);
    var check = getter.getAccount(ID);

    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        acc.updateOne({"id" : ID}, {$set : {
            "password" : PASSWORD,
            "role" : ROLE
        }});
        msg = "success"
        return msg;
    } else {
        return null;
    }
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
function updateProfile(id, role, name, birthday, address, gender, mail, phone, subject) {
    const info = mongoose.model("info", Info.schema);

    var check = getter.getInfo(id);
    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
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
        msg = "success"
        return msg;
    } else {
        return null;
    }
}

// Create Teacher Schedule function
function createTeacherSchedule(nid, id, tkb) {
    const teacher_schedule = mongoose.model("teacher-schedule", Teacher_schedule.schema);

    var check = getter.getTeacherSchedule(nid,id);
    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        msg = "Dupplicate ID"
        return msg;
    } else {
        var newSchedule = new teacher_schedule({
            nid : nid,
            schedule : {
                id : id,
                _class : _class
            }
        })

        newSchedule.save();
        msg = "success"
        return msg;
    }   
}

// Update teacher Schedule Function
function updateTeacherSchedule(nid, id, _class) {
    const teacher_schedule = mongoose.model("teacher-schedule", Teacher_schedule.schema);

    var check = getter.getTeacherSchedule(nid, id);
    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        teacher_schedule.findOneAndUpdate({
            "nid" : nid,
            "schedule.id" : id
        }, { $set : {
            "schedule._class" : _class
        }})
    } else {
        return null;
    }
}


// NEED FIXING (PENDING)
// Create Class function
function createClass(id, className, member) {
    const _class = mongoose.model("class", Class.schema);

    var check = getter.getClass(id);
    if (check instanceof Error) {
        return check;
    }
    
    if (check != null) {
        msg = "dupplicate class ID";
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

// Update Class Function (PENDING)
function updateClass(id, className, member) {
    const _class = mongoose.model("class", Class.schema);
    var check = getter.getClass(id);

    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        _class.updateOne({
            //"nid" : nid,
            "classlist.id" : id 
        }, {
            "className" : className,
            "member" : member
        });
        msg = "success"
        return msg;
    } else {
        return null;
    }
}
// NEED FIXING (DONE)
// create Grade function
function createGrade(nid, id, result) {
    const grade = mongoose.model("grade", Grade.schema);

    var check = getter.getGrade(nid, id);
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

// NEED FIXING (DONE)
// Update Greade Function
function updateGrade(nid, id, result) {
    const grade = mongoose.model("grade", Grade.schema);

    var check = getter.getGrade(nid, id);
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

// NEED FIXING (DONE)
// Create Rule Function
function createRule(nid, numStudent,numStudent_max,numClass10,numClass11,numClass12,ageMax,ageMin) {
    const rule = mongoose.model("rule", Rule.schema);
    
    var check = getter.getRule(nid);

    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        msg = "dupplicate rule ID";
        return msg;
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

    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
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
        return null;
    }
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
function updateSchoolYear(YEAR, semester, nid) {
    const year = mongoose.model("Schoolyear", SchoolYear.schema);
    
    var check = getter.getRule(nid);

    if (check instanceof Error) {
        return check;
    }

    if (check != null) {
        year.updateOne({nid : nid}, {$set: {
            "year" : YEAR,
            "semester" : semester
        }})
    } else {
        return null;
    }
}

module.exports = {
    controller: {createAccount, updateAccount, createProfile, updateProfile, createTeacherSchedule,
         updateTeacherSchedule, createClass, updateClass, createGrade, updateGrade,
          createRule, updateRule, createSchoolYear, updateSchoolYear}
}
