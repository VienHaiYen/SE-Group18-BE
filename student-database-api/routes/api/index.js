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
        res.status(401).send({
            "message" : "You are not logged in"
        })
    }
})



router.get("/grade", (req, res) => {
    userSession = auth.ensureAuthenticated(req);
    if(!userSession) {    
        return res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
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

                point = result.point[0].result[`${subject}`];
                return res.status(200).send({
                    point
                })
            })
        }
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
            {nid : nid},
            {id : id}
        ]}, "_class",(err, ts) => {
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
                return res.status(404).send({
                    _classes,
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
                        "message" : "record not found"
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
    if(!auth.ensureAuthenticated(req)) {    
        return res.status(401).send({
            "message" : "You are not logged in"
        })
    }
    else {
        // DEFINE FUNCTION HERE
    }
})

module.exports = router;