// API CALLS FUNCTION TO HANDLE REQUEST MADE BY ADMINS

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
const { getYear } = require("../package/defineSyntax");
const poster = require("../package/postFunctions").controller;
const MSG = require("../package/defineMessage").msg;
const session = require("../../session").session;
const auth = require("../../session").auth;
const thisYear = require("../package/defineSyntax").getYear;
const genZero = require("../package/defineSyntax").genZero;
const cookies = require("../../session").cookie;

router.use(express.json());

// GET
router.get("/rule", function(req, res) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        var nid = req.query.nid;
        var nid = req.query.nid;

        Rule.findOne({nid : nid}, (err, rule) => {
            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }
    
            if (!rule) {
                return res.status(404).send({
                    "message" : "record not found"
                })
            }
    
            return res.status(200).send(
                rule
            )    
        })
    }
})

router.get("/teacher-list", function(req, res) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        const info = mongoose.model("info", Info.schema);
        info.find({role : "teacher"}, (err, data) => {
            if (err) {
                return res.status(500).send({
                    "message" : "Unexpected Error"
                })
            }
            return res.status(200).send(
                data
            )
        })
    }
})

router.get("/about/:id", (req, res) => {
    if (!auth.ensureAdmin(req) && !auth.ensureTeacher(req)) {
        return res.status(401).send({
            "message" : "You are not an admin or a teacher"
        });
    }
    else {
        var {id} = req.params;
        console.log(id);
        const query = mongoose.model("info", Info.schema);
        query.findOne({id : id}, (err, info) => {
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

            return res.status(200).send(info)
        })
    }
})

// POST
router.post("/input-student", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    }
    else {
        var query = mongoose.model("account", Account.schema);
        query.countDocuments({role : "student"}, (err, count) => {

            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }
            var role = "student";
            var id = thisYear() + genZero(count + 1, role) + String(count + 1);
            var name = req.body.name;
            var birthday = req.body.birthday;
            var address = req.body.address;
            var gender = req.body.gender;
            var mail = req.body.mail;
            var phone = req.body.phone;
            var _class = req.body._class;
            var subject = null;
            var msg;
            if (!mail) {
                // req.flash("error", "Please fill in an email");
                msg = "Please fill in an email";
                return res.status(418).send({
                    "message" : msg
                });;
            }
            if (!name) {
                // req.flash("error", "Please fill in a name");
                msg = "Please fill in a name";
                return res.status(418).send({
                    "message" : msg
                });;
            }
            if(!birthday) {
                // req.flash("error", "Please fill in a birthday");
                msg = "Please fill in a birthday";
                return res.status(418).send({
                    "message" : msg
                });;
            }
            if (!phone ) {
                // req.flash("error", "Please fill in a phone number");
                msg = "Please fill in a phone number";
                return res.status(418).send({
                    "message" : msg
                });;
            }
            if (!gender) {
                // req.flash("error", "Please fill in a gender");
                msg = "Please fill in a gender";
                return res.status(418).send({
                    "message" : msg
                });;
            }

            msg = poster.createAccount(id, id, role);
            if (msg == MSG.ERROR_MESSAGE) {
                return res.status(500).send({
                    "message" : "Unexpected Error"
                })
            }

            if (msg == MSG.SUCCESS_MESSAGE) {
                poster.createProfile(id, role, name, birthday, address, gender, mail, phone, _class, subject, res);
                var subjectPoint = {
                    "mieng" :null,
                    "_15" : null,
                    "_45" :null,
                    "_gk"  : null,
                    "_ck": null
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
                poster.createGrade(getYear() + '1', id, data)
            }

            Class.findOneAndUpdate({$and : [
                {"id" : _class},
                {"nid" : getYear() + '1'}
            ]}, {
                $push : {
                    members : [id]
                }
            }, (err, check) => {
                if (err) {
                    console.log(err);    
                }
                if (!check) {
                    console.log("class not found");             
                }
                console.log(check);
            })
            
        })
        
    }
})

router.post("/input-teacher", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    }
    else {    
        var query = mongoose.model("account", Account.schema);
        query.countDocuments({role : "teacher"}, (err, count) => {

            if (err) {
                return res.status(500).send({
                    "message" : "unexpected error"
                })
            }

            var role = "teacher";
            var id = "t" + genZero(count + 1, role) + String(count + 1);
            var name = req.body.name;
            var birthday = req.body.birthday;
            var address = req.body.address;
            var gender = req.body.gender;
            var mail = req.body.mail;
            var phone = req.body.phone;
            var _class = null;
            var subject = req.body.subject;

            var msg;
            if (!mail) {
                // req.flash("error", "Please fill in an email");
                msg = "Please fill in an email";
                return res.status(418).send({
                    "message" : msg
                });;
            }
            if (!name) {
                // req.flash("error", "Please fill in a name");
                msg = "Please fill in a name";
                return res.status(418).send({
                    "message" : msg
                });;
            }
            if(!birthday) {
                // req.flash("error", "Please fill in a birthday");
                msg = "Please fill in a birthday";
                return res.status(418).send({
                    "message" : msg
                });;
            }
            if (!phone ) {
                // req.flash("error", "Please fill in a phone number");
                msg = "Please fill in a phone number";
                return res.status(418).send({
                    "message" : msg
                });;
            }
            if (!gender) {
                // req.flash("error", "Please fill in a gender");
                msg = "Please fill in a gender";
                return res.status(418).send({
                    "message" : msg
                });;
            }

            msg = poster.createAccount(id, id, role);
            if (msg == MSG.ERROR_MESSAGE) {
                return res.status(500).send({
                    "message" : "Unexpected Error"
                })
            }

            msg = poster.createProfile(id, role, name, birthday, address, gender, mail, phone, _class, subject, res);
        })
    }
})

router.post("/rule", function(req, res, next) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        });
    } else {
        var nid = req.body.nid;
        var numberOfClass = {
            _10 : req.body.numberOfClass._10,
            _11 : req.body.numberOfClass._11,
            _12 : req.body.numberOfClass._12
        }
        var numberOfStudent = {
            min : req.body.numberOfStudent.min,
            max : req.body.numberOfStudent.max,
        }
        var age = {
            min : req.body.age.min,
            max : req.body.age.max,
        }
        var rule = {
            nid,
            numberOfClass,
            numberOfStudent,
            age
        }
        console.log(rule)

        var msg = poster.updateRule(nid, numberOfStudent.min, numberOfStudent.max, 
            numberOfClass._10, numberOfClass._11, numberOfClass._12, 
            age.min, age.max, res)
    }
})

// router.post("/class-list", function(req, res, next) {
//     if (!auth.ensureAdmin(req)) {
//         return res.status(401).send({
//             "message" : "You are not an admin"
//         });
//     } else {
//         // DEFINE FUNCTION HERE
//     }
// })

// router.post("/teacher-schedule", function(req,res) {
//     if (!auth.ensureAdmin(req)) {
//         return res.status(401).send({
//             "message" : "You are not an admin"
//         })
//     } else {
//         // DEFINE FUNCTION HERE
//     }
// }) 

router.post("/add-student-to-class", (req, res) => {
    userSession = auth.ensureAdmin(req);
    if(!userSession) {    
        return res.status(401).send({
            "message" : "You are not an admin"
        })  
    } else {
        var studentId = req.body.id;
        var classId = req.body.classId;
        var nid = req.body.nid;

        Info.findOne({$and:[
            {id : studentId},
            {role : "student"}
        ]}, "_class" , (err, info) => {
            if (err) {
                return res.status(500).send({
                    "message" : "Unexpected Error"
                })
            }
            if (!info) {
                return res.status(404).send({
                    "message" : "student not found"
                })              
            }
            Class.findOneAndUpdate({ "id" : info._class}, {
                $pullAll : {
                    "members" : [studentId]
                }
            }, (err, check) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }
    
                if (!check) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }

                Info.findOneAndUpdate({$and:[
                    {id : studentId},
                    {role : "student"}
                ]}, {"_class" : classId}, (err, info) => {
                    if (err) {
                        return res.status(500).send({
                            "message" : "Unexpected Error"
                        })
                    }
                    if (!info) {
                        return res.status(404).send({
                            "message" : "student not found"
                        })              
                    }
    
                    Class.findOneAndUpdate({$and : [
                        {"id" : classId},
                        {"nid" : nid}
                    ]}, {
                        $push : {
                            members : [studentId]
                        }
                    }, (err, check) => {
                        if (err) {
                            return res.status(500).send({
                                "message" : "Unexpected Error"
                            })
                        }
                        if (!check) {
                            return res.status(404).send({
                                "message" : "class not found"
                            })              
                        }
                        console.log(check);
                    })
                })
            })
            
        })
    }

    
})

router.post("/about/:id", (req, res) => {
    userSession = auth.ensureAdmin(req);
    if(!userSession) {    
        return res.status(401).send({
            "message" : "You are not ad admin"
        })
    }
    else {
        var {id} = req.params;
        var info = req.body;
        Info.findOneAndUpdate({id : id}, {
            "name" : info.name,
            "birthday" : info.birthday,
            "gender" : info.gender,
            "mail" : info.mail,
            "phone" : info.phone,
            "_class" : info._class,
            "subject" : info.subject    
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
            
            if (info._class != null) {
                Class.findOneAndUpdate({$and : [
                    {"id" : info._class},
                    {
                        $or : [
                            {"nid" : getYear() + '1'},
                            {"nid" : getYear() + '2'}
                        ]
                    }
                ]}, {
                    $push : {
                        members : [id]
                    }
                }, (err, check) => {
                    if (err) {
                        return res.status(500).send({
                            "message" : "Unexpected Error"
                        })
                    }
                    if (!check) {
                        return res.status(404).send({
                            "message" : "class not found"
                        })              
                    }
                    console.log(check);
                })
            }

            return res.status(200).send({
                "message" : "profile updated successfully"
            })
        })
    }
})

// DELETE

router.delete("/delete/:id", function(req, res) {
    if (!auth.ensureAdmin(req)) {
        return res.status(401).send({
            "message" : "You are not an admin"
        })
    } else {
        var {id} = req.params;
        Info.findOneAndDelete({id : id}, (err, result) => {
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

            var _class = result._class;
            console.log("removed from " + _class);
            Class.findOneAndUpdate({ "id" : _class}, {
                $pullAll : {
                    "members" : [id]
                }
            }, (err, check) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send({
                        "message" : "unexpected error"
                    })
                }
    
                if (!check) {
                    return res.status(404).send({
                        "message" : "record not found"
                    })
                }
                console.log("removed from " + check.members);
                return res.status(200).send({
                    "message" : `${id} successfully deleted`
                })
            })
        })
    }
})




module.exports = router;