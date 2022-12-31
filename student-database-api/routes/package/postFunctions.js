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
const MSG = require("./defineMessage").msg;


// Create new account function
function createAccount(ID, PASSWORD, ROLE) {
    const acc = mongoose.model("account", Account.schema);
    acc.findOne({"id" : ID}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
    
        if (check != null) {
            return MSG.DUPPLICATE_MESSAGE;
        }

        var newAcc = new acc({
            id : ID,
            password : PASSWORD,
            role:ROLE
        });
        newAcc.save();

    })
    return MSG.SUCCESS_MESSAGE;
}

// Update account function
function updateAccount(ID, PASSWORD, ROLE) {
    const acc = mongoose.model("account", Account.schema);
    acc.findOne({"id" : ID}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
    
        if (!check) {
            return MSG.EMPTY_MESSAGE;
        }
        acc.updateOne({"id" : ID}, {$set : {
            "password" : PASSWORD,
            "role" : ROLE
        }});
        return MSG.SUCCESS_MESSAGE;
    })
}

// Create new Profile for account function
function createProfile(id, role, name, birthday, address, gender, mail, phone, _class, subject, res) {

    var info = mongoose.model("info", Info.schema);

    info.findOne({"id":id}, function(err, result) {
        if (err) {
            return res.status(500).send({
                "message" : MSG.ERROR_MESSAGE
            })
        }
        if (result) {
            // req.flash("error", "ID's already existed");
            return res.status(418).send({
                "message" : MSG.DUPPLICATE_MESSAGE
            })
        }

        info.findOne({"mail":mail}, function(err, result) {
            if (err) {
                return res.status(500).send({
                    "message" : MSG.ERROR_MESSAGE
                })
            }
            if (result) {
                // req.flash("error", "There's already an account with this email");
                return res.status(418).send({
                    "message" : MSG.DUPPLICATE_MESSAGE
                })
            }

            info.findOne({"phone":phone}, function(err, result) {
                if (err) {
                    return res.status(500).send({
                        "message" : MSG.ERROR_MESSAGE
                    })
                }
                if (result) {
                    // req.flash("error", "There's already an account with this phone number");
                    return res.status(418).send({
                        "message" : MSG.DUPPLICATE_MESSAGE
                    })
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
                    _class:_class,
                    subject:subject
                })
                newProfile.save();
                return res.status(200).send({
                    "message" : `${id}'s profile created successfully`
                })
            });    
        });
    })

    
}

// Update profile function
function updateProfile(id, role, name, birthday, address, gender, mail, phone, _class, subject) {
    const info = mongoose.model("info", Info.schema);
    info.findOne({"id" : id}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
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
                "_class" : _class,
                "subject" : subject
            }});
            return MSG.SUCCESS_MESSAGE;
        } else {
            return MSG.EMPTY_MESSAGE;
        }
    })
}

// Create Teacher Schedule function
function createTeacherSchedule(nid, id, _class) {
    const teacher_schedule = mongoose.model("teacher-schedule", Teacher_schedule.schema);

    teacher_schedule.findOne({ $and: [
        {nid : nid},
        {id : id}
    ]}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
    
        if (check) {
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
    })

 
}

// Update teacher Schedule Function
function updateTeacherSchedule(nid, id, _class) {
    const teacher_schedule = mongoose.model("teacher-schedule", Teacher_schedule.schema);

    teacher_schedule.findOne({ $and: [
        {nid : nid},
        {id : id}
    ]}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
    
        if (check != null) {
            teacher_schedule.findOneAndUpdate({
                "nid" : nid,
                "schedule.id" : id
            }, { $set : {
                "schedule._class" : _class
            }})
            return MSG.SUCCESS_MESSAGE;
        } else {
            return MSG.EMPTY_MESSAGE;
        }
    })

}


// NEED FIXING (DONE)
// Create Class function
function createClass(nid, id, className, member) {
    const _class = mongoose.model("class", Class.schema);

    _class.findOne({ $and: [
        {nid : nid},
        {id : id}
    ]}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
        if (check != null) {
            return MSG.DUPPLICATE_MESSAGE;
        }
    
        var newClass = new _class({
            id : id,
            className : className,
            member : member
        })
    
        newClass.save();
        return MSG.SUCCESS_MESSAGE;

    })
}

// Update Class Function (PENDING)
function updateClass(nid, id, className, member) {
    const _class = mongoose.model("class", Class.schema);

    _class.findOne({ $and: [
        {nid : nid},
        {id : id}
    ]}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
        if (check != null) {
            _class.updateOne({
                //"nid" : nid,
                "classlist.id" : id 
            }, {
                "className" : className,
                "member" : member
            });
            return MSG.SUCCESS_MESSAGE;
        }
        else {
            return MSG.EMPTY_MESSAGE;
        }
    

    })
}
// NEED FIXING (DONE)
// create Grade function
function createGrade(nid, id, result) {
    const grade = mongoose.model("grade", Grade.schema);
    grade.findOne({ $and: [
        {nid : nid},
        {"point.id" : id}
    ]}, async (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
        if (check != null) {
            return MSG.DUPPLICATE_MESSAGE;
        }
        
        console.log(result);
        var newGrade = new grade({
            "nid"   : nid,
            "point" : {
                "id" : id,
                "result" : result
            }
        })

        await newGrade.save();
        return MSG.SUCCESS_MESSAGE;
    })
}

// NEED FIXING (DONE)
// Update Greade Function
function updateGrade(nid, id, result) {
    const grade = mongoose.model("grade", Grade.schema);
    grade.findOne({ $and: [
        {nid : nid},
        {id : id}
    ]}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
        if (check != null) {
            grade.updateOne({"nid" : nid, "id" : id}, {"result" : result});
            return MSG.SUCCESS_MESSAGE;
        } else {
            return MSG.DUPPLICATE_MESSAGE;
        }
    })

}

// NEED FIXING (DONE)
// Create Rule Function
function createRule(nid, numStudent,numStudent_max,numClass10,numClass11,numClass12,ageMax,ageMin) {
    const rule = mongoose.model("rule", Rule.schema);
    
    rule.findOne({nid : nid}, (err, check) => {
        
        if (err) {
            return MSG.ERROR_MESSAGE;
        }

        if (check != null) {
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
        return MSG.SUCCESS_MESSAGE;
    })

}

// Update Rule Function
function updateRule(nid, numStudent_min,numStudent_max,numClass10,numClass11,numClass12,age_min,age_max) {
    const rule = mongoose.model("rule", Rule.schema);
    rule.findOne({nid : nid}, (err, check) => {
        
        if (err) {
            return MSG.ERROR_MESSAGE;
        }

        if (check == MSG.ERROR_MESSAGE) {
            return MSG.ERROR_MESSAGE;
        }
    
        if (check != null) {
            rule.updateOne({
                nid : nid
            },{$set: {
                numberOfStudent: {
                    min:numStudent_min,
                    max:numStudent_max
                },
                numberOfClass:{
        
                    _10:numClass10,
                    _11:numClass11,
                    _12:numClass12
        
                },
                age:{
                    min:age_min,
                    max:age_max
                }
            }})
            return MSG.SUCCESS_MESSAGE;
        } else {
            return MSG.EMPTY_MESSAGE;
        }
    })
}


// Create Schoolyear Function
function createSchoolYear(YEAR, semester, nid) {
    const year = mongoose.model("Schoolyear", SchoolYear.schema);
    year.findOne({nid : nid}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
    
        if (check != null) {
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
    })
}

// Update Schoolyear Function
function updateSchoolYear(YEAR, semester, nid) {
    const year = mongoose.model("Schoolyear", SchoolYear.schema);
    year.findOne({nid : nid}, (err, check) => {
        if (err) {
            return MSG.ERROR_MESSAGE;
        }
   
        if (check != null) {
            year.updateOne({nid : nid}, {$set: {
                "year" : YEAR,
                "semester" : semester
            }})
            return MSG.SUCCESS_MESSAGE;
        } else {
            return MSG.EMPTY_MESSAGE;
        }
    })
}

function updateGradeBySubject(subject, nid, id, result, res) {
    const grade = mongoose.model("grade", Grade.schema);

    grade.findOne({ $and: [
        {nid : nid},
        {"point.id" : id}
    ]}, async (err, check) => {
        if (err) {
            return res.status(500).send({
                "message" : "unexpected error"
            });
        }

        var subjectPoint = {
            "mieng" :[],
            "_15" : [],
            "_45" :[],
            "gk"  : 0,
            "ck": 0,
        }
        var data = {
            "Toan": {subjectPoint},
            "Van" : {subjectPoint},
            "Li" : {subjectPoint},
            "Hoa" : {subjectPoint},
            "Sinh" : {subjectPoint},
            "Su" : {subjectPoint},
            "Dia" : {subjectPoint},
            "DaoDuc" : {subjectPoint},
            "TD" : "KD"
        }


        if (check == null) {
            await createGrade(nid, id, data);
        }
        
        if (subject == "Toan") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.Toan" : result
            }, (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            })
        } else
        if (subject == "Li") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.Li" : result
            }, (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            })
        } else
        if (subject == "Hoa") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.Hoa" : result
            }, (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            })
        } else
        if (subject == "Sinh") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.Sinh" : result
            }, (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            })
        } else
        if (subject == "Van") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.Van" : result
            }, (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            })
        } else
        if (subject == "Su") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.Su" : result
            }, (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            })
        } else
        if (subject == "Dia") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.Dia" : result
            }, (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            })
        } else
        if (subject == "DaoDuc") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.DaoDuc" : result
            }, (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            })
        } else
        if (subject == "TD") {
            grade.findOneAndUpdate({$and: [
                {nid : nid},
                {"point.id" : id}
            ]}, {
                "point.result.TD" : result
            }), (err, check) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!check) {
                    return res.status(404).send({
                        "message" : "grade not created, please try again"
                    })
                }
                return res.status(200).send({
                    "message" : "successfully updated scores"
                });
            }
        } else {
            return res.status(404).send({
                "message" : "subject not found"
            });
        }
    })
}

module.exports = {
    controller: {createAccount, updateAccount, createProfile, updateProfile, createTeacherSchedule,
         updateTeacherSchedule, createClass, updateClass, createGrade, updateGrade,
          createRule, updateRule, createSchoolYear, updateSchoolYear, updateScoreBySubject: updateGradeBySubject}
}
