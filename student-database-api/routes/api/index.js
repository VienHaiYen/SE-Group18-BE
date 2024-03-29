// API INDEX FILE

const e = require("connect-flash");
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Account = require("../../models/account");
const Class = require("../../models/class");
const Grade = require("../../models/grade");
const Info = require("../../models/info");
const Rule = require("../../models/rule");
const Schoolyear = require("../../models/schoolyear");
const teacher_schedule = require("../../models/schedule_teacher");
const Teacher_schedule = require("../../models/schedule_teacher");
const poster = require("../package/postFunctions").controller;
const session = require("../../session").session;
const auth = require("../../session").auth;
const MSG = require("../package/defineMessage").msg;
const thisYear = require("../package/defineSyntax");
const cookies = require("../../session").cookie;

router.use(express.json());
// Link to other routers here

router.use(require("./admin"));
router.use(require("./teacher"));
router.use(require("./student"));

// GET
router.get("/viewDev", function(req, res) {
    userSession = auth.ensureAuthenticated(req);
    if(userSession) {    
        return res.status(200).send({
            "Vien Hai Hien" : "20120633",
            "Trinh Le Nguyen Vu": "20120630",
            "Tran Thi Phuong Linh":"20120521",
            "Le Minh Tri":"20120634",
            "Thinh Ngo":"20120586",
        })
    }
    else {
        return res.status(401).send({
            "message" : "You are not logged in"
        })
    }
})

router.get("/validate", function(req, res) {
    var userSessionAdmin = auth.ensureAdmin(req);
    if (!userSessionAdmin) {
        return res.status(401).send({
            "message" : "You are not an admin"
        })
    }
    else {
        var birthyear = req.query.byear;

        var currentTime = new Date();
        var age = currentTime.getFullYear() - birthyear;
        
        var numberOfStudent = req.query.snum;
        var numberOfClass10 = req.query.cnum10;
        var numberOfClass11 = req.query.cnum11;
        var numberOfClass12 = req.query.cnum12;

        var nid = req.query.nid;
        if (nid == undefined) {
            nid = thisYear.getYear() + '1';
        }
        
        Rule.findOne({"nid" : nid}, (err, rule) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (!rule) {
                return res.status(404).send({
                    "message" : "rule not set for this nid"
                })
            }

            var checkAge = (((age <= rule.age.max) && (age >= rule.age.min)) || age == undefined);
            var checkNumberOfStudent = (((numberOfStudent <= rule.numberOfStudent.max) && (numberOfStudent >= rule.numberOfStudent.min)) || numberOfStudent == undefined);
            var checkNumberOfClass10 = (numberOfClass10 == rule.numberOfClass._10 || numberOfClass10 == undefined);
            var checkNumberOfClass11 = (numberOfClass11 == rule.numberOfClass._11 || numberOfClass11 == undefined);
            var checkNumberOfClass12 = (numberOfClass12 == rule.numberOfClass._12 || numberOfClass12 == undefined);

            var result = {
                age : checkAge,
                snum : checkNumberOfStudent,
                cnum10 : checkNumberOfClass10,
                cnum11 : checkNumberOfClass11,
                cnum12 : checkNumberOfClass12
            }

            return res.status(200).send(
                result
            )
        })
    }
})


router.get("/grade", (req, res) => {
    userSessionTeacher = auth.ensureTeacher(req);
    userSessionAdmin = auth.ensureAdmin(req);
    userSessionStudent = auth.ensureStudent(req);
    if(userSessionTeacher) {   // teacher
        var id = req.query.id;
        var nid = req.query.nid;

        Info.findOne({$and : [
            {id : userSessionTeacher.id},
            {role : "teacher"}
        ]}, "subject", (err, info) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (!info) {
                return res.status(404).send({
                    "message" : "teacher info not found"
                })
            }
            
            var subject = info.subject;
            Grade.findOne({ $and: [
                {"point.id" : id},
                {"nid" : nid}
            ]}, "point.result", (err, result) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!result) {
                    return res.status(404).send({
                        "message" : "score not found for this subject and student"
                    })
                }

                console.log(userSessionTeacher.id, subject);
                point = result.point.result[`${subject}`];
                return res.status(200).send({
                    // "subject" : subject,
                    point
                })
            })
        })
    }
    else if (userSessionAdmin) { // admin
        // DEFINE FUNCTION HERE
        var id = req.query.id;
        var subject = req.query.subject;
        var nid = req.query.nid;

        console.log(id, subject, nid);
        if (subject == undefined) { // Grade by student
            console.log('la null');
            Grade.findOne({ $and : [
                {"nid" : nid},
                {"point.id" : id}
            ]}, (err, grade) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!grade) {
                    return res.status(404).send({
                        "message" : "record not found 1"
                    })
                }
                console.log(456789,grade);
                Info.findOne({"id" : id}, "name _class", (err, info) => {
                    console.log(id);
                    if (err) {
                        return res.status(500).send({
                            "message" : "unexpected error"
                        })
                    }
    
                    if (!info) {
                        return res.status(404).send({
                            "message" : "record not found 2"
                        })
                    }

                    return res.status(200).send({
                        "nid" : nid,
                        "name" : info.name,
                        "class" : info._class,
                        "result" : grade
                    })
                })

            })
        }
        else if (subject != undefined) { // Grade by student and subject
            Grade.findOne({ $and: [
                {"point.id" : id},
                {"nid" : nid}
            ]}, "point.result", (err, result) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }

                if (!result) {
                    return res.status(404).send({
                        "message" : "record not found 3"
                    })
                }

                point = result.point.result[`${subject}`];
                return res.status(200).send({
                    "subject" : subject,
                    point
                })
            })
        }
    } else if (userSessionStudent) {
        var id = userSessionStudent.id;
        var nid = req.query.nid;

        if (nid == undefined) {
            nid = getYear() + '1';
        }

        Grade.findOne({$and: [
            {"point.id" : id},
            {"nid" : nid}
        ]}, (err, grade) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (!grade) {
                var defaultValue = null;
                var subjectPoint = {
                    "mieng" :defaultValue,
                    "_15" : defaultValue,
                    "_45" : defaultValue,
                    "_gk"  : defaultValue,
                    "_ck": defaultValue,
                }
                var data = {
                    "Toan": subjectPoint,
                    "Van" : subjectPoint,
                    "Anh" : subjectPoint,
                    "Li" : subjectPoint,
                    "Hoa" : subjectPoint,
                    "Sinh" : subjectPoint,
                    "Su" : subjectPoint,
                    "Dia" : subjectPoint,
                    "GDCD" : subjectPoint,
                }

                msg = poster.createGrade(nid, id, data);
                return res.status(404).send({
                    "message" : "grade not found"
                })
            }

            return res.status(200).send(
                grade
            )
        })
    }
}) 

// REDACTED
// router.get("/schedule", (req, res) => {
//     if(!auth.ensureAuthenticated(req)) {    
//         res.status(401).send({
//             "message" : "You are not logged in"
//         })
//     }
//     else {
//    
//     }
// })

router.get("/about", (req, res) => {
    userSession = auth.ensureAuthenticated(req);
    if(!userSession) {    
        return res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
        var id = userSession.id;
        Info.findOne({id : id}, (err, info) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }
    
            if (!info) {  
                return res.status(404).send({
                    "message" : "record not found"
                })
            }
            return res.status(200).send(
                info
            )
        })

        
    }
})

router.get("/teacher-schedule", function(req,res) {
    if (!auth.ensureTeacher(req) && !auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not a teacher or an admin"
        })
    } else {
        var id = req.query.id;
        var nid = req.query.nid;
        const ts = mongoose.model("teacher-schedule", Teacher_schedule.schema);
        ts.findOne({$and: [
            {nid : nid}
        ]},(err, ts) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (!ts) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }
            var schedule = ts.schedule;

            Info.findOne({id : id} , "name subject" , (err, info) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }
    
                if (!info) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }

                var _class;
                for (let i = 0; i < schedule.length; i++) {
                    const thisTeacher = schedule[i];
                    if (thisTeacher.id == id) {
                        _class = thisTeacher._class;
                    }
                }

                return res.status(200).send({
                    _class,
                    "name" : info.name,
                    "subject" : info.subject
                })

            })
        })
        
    }
}) 

router.get("/class-list", (req, res) => {
    var userSessionAdmin = auth.ensureAdmin(req);
    var userSessionTeacher = auth.ensureTeacher(req);
    if ((!userSessionAdmin) && (!userSessionTeacher)) {
        return res.status(401).send({
            "message" : "You are not a teacher or an admin"
        })
    } else if (userSessionAdmin) {// Admin
        var id = req.query.id;
        var nid = req.query.nid;
        if (id == undefined) {
            Class.find({ $and : [
                {nid : nid}
            ]}, "id className headteacher members", (err, _class) => {

                if (err) {
                    return res.status(500).send({
                        "message" : "Unexpected Error"
                    })
                }

                if (!_class) {
                    return res.status(404).send({
                        "message" : "Record not found"
                    })
                }

                return res.status(200).send(
                    _class
                )
            })


        } else { 

            const _class = mongoose.model("_class", Class.schema);
            _class.findOne({ $and : [
                {nid : nid},
                {id : id}
            ]}, "id className headteacher members", (err, _class) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "Unexpected Error"
                    })
                }
    
                if (!_class) {
                    return res.status(404).send({
                        "message" : "Record not found"
                    })
                }
    
                return res.status(200).send(
                    _class
                )
            });
        }
    } else { // Teacher
        var id = req.query.id;
        var nid = req.query.nid;
        var teacherId = userSessionTeacher.id;

        if (id == undefined) {
            Teacher_schedule.findOne({$and: [
                {"nid" : nid}
            ]}, "schedule", (err, result) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }
                if (!result) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }

                data = null;
                for (let i = 0; i < result.schedule.length; i++) {
                    console.log(i);
                    if (result.schedule[i].id == teacherId) {
                        data = result.schedule[i]._class;
                        break;
                    }
                }

                if (!data) {
                    return res.status(404).send({
                        "message" : `${teacherId} does not teach any class`
                    })
                }
                return res.status(200).send(
                    data
                )
            })
        } else {
            Teacher_schedule.findOne({$and: [
                {"nid" : nid}
            ]}, "schedule", (err, result) => {
                if (err) {
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }
                if (!result) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }

                data = null;
                for (let i = 0; i < result.schedule.length; i++) {
                    console.log(i);
                    if (result.schedule[i].id == teacherId) {
                        data = result.schedule[i]._class;
                        for (let j = 0; j < data.length; j++) {
                            if (id == data[j]) {
                                Class.findOne({"id" : id}, "id className headteacher members", (err, result) => {
                                    if (err) {
                                        return res.status(500).send({
                                            "message" : "unexpected error"
                                        })
                                    }

                                    if (!result) {
                                        return res.status(404).send({
                                            "message" : "Class id exists in teacher's schedule but not in database"
                                        })
                                    }

                                    return res.status(200).send(
                                        result
                                    )
                                })
                                break;
                            }
                            if (j == data.length - 1) {
                                return res.status(404).send({
                                    "message" : `${teacherId} does not teach class ${id}`
                                })
                            }
                        }
                        break;
                    }
                }

                if (!data) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }
            })
        }
    }
})

// POST

router.post("/about", (req, res) => {
    userSession = auth.ensureAuthenticated(req);
    if(!userSession) {    
        return res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
        var id = userSession.id;
        var info = req.body;
        Info.findOneAndUpdate({id : id}, {
            "birthday" : info.birthday,
            "address" : info.address,
            "gender" : info.gender,
            "mail" : info.mail,
            "phone" : info.phone
        }, (err, result) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (!result) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }

            return res.status(200).send({
                "message" : "profile updated successfully"
            })

        })
    }
})

router.post("/change-password", (req, res) => {
    userSession = auth.ensureAuthenticated(req);
    if (!userSession) {
        return res.status(401).send({
            "message" : "You are not logged in"
        })
    }

    var newPassword = req.body.newPassword;
    var currentPassword = req.body.currentPassword;
    var id = userSession.id;

    Account.findOne({id : id}, (err, account) => {
        if (err) {
            return res.status(500).send({
                "message" : "unexpected error"
            })
        }

        if (!account) {
            return res.status(404).send({
                "message" : "account not found"
            })
        }
        account.checkPassword(currentPassword, (err, isMatch) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            if (isMatch) {
                Account.findOne({id : id},
                    (err, account) => {
                        if (err) {
                            return res.status(500).send({
                                "message" : "unexpected error"
                            })
                        }
                
                        if (!account) {
                            return res.status(404).send({
                                "message" : "record not found"
                            })
                        }

                        account.password = newPassword;
                        account.save();
                        

                        return res.status(200).send({
                            "message" : "password changed successfully"
                        })

                    })                
            }
            else {
                return res.status(418).send({
                    "message" : "password does not match"
                })
            }
        })
        
    })
})

router.post("/alt-change-password", (req, res) => {
    userSession = auth.ensureAuthenticated(req);
    if (!userSession) {
        return res.status(401).send({
            "message" : "You are not logged in"
        })
    }

    var newPassword = req.body.newPassword;
    var currentPassword = req.body.currentPassword;
    var id = userSession.id;

    Account.findOne({$and: [
        {id : id},
        {password : currentPassword}
    ]}, (err, account) => {
        if (err) {
            return res.status(500).send({
                "message" : "unexpected error"
            })
        }

        if (!account) {
            return res.status(404).send({
                "message" : "account not found"
            })
        }

        if (account) {
            account.password = newPassword;
            account.save();      
            return res.status(200).send({
                "message" : "password changed successfully"
            })        
        }
        else {
            return res.status(418).send({
                "message" : "password does not match"
            })
        }
        
    })
})

module.exports = router;